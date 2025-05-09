from fastapi import APIRouter, Query
from datetime import datetime, timedelta, timezone
from firestore import db
from github_fetcher import fetch_github_user, fetch_github_repos, fetch_repo_languages
from openai_client import generate_profile_summary

router = APIRouter()

@router.get("/profile/{username}")
async def get_profile(username: str, forceRefresh: bool = Query(False)):
    doc_ref = db.collection("github_profiles").document(username)
    doc = doc_ref.get()

    # Check cache
    if doc.exists and not forceRefresh:
        cached_data = doc.to_dict()
        last_updated_str = cached_data.get("lastUpdated")
        
        if last_updated_str:
            last_updated = datetime.fromisoformat(last_updated_str)
            if datetime.now(timezone.utc) - last_updated < timedelta(hours=24):
                return {"source": "cache", "data": cached_data}

    # Fetch from GitHub
    user_data = fetch_github_user(username)
    repos_data = fetch_github_repos(username)

    enriched_repos = []
    for repo in repos_data:
        languages = fetch_repo_languages(repo["url"])
        enriched_repos.append({
            "name": repo["name"],
            "description": repo.get("description", ""),
            "url": repo["html_url"],
            "stars": repo["stargazers_count"],
            "forks": repo["forks_count"],
            "updatedAt": repo["updated_at"],
            "techStack": list(languages.keys()),
            "aiSummary": ""  # Will be filled by AI
        })

    profile = {
        "user": {
            "name": user_data.get("name"),
            "login": user_data.get("login"),
            "avatarUrl": user_data.get("avatar_url"),
            "bio": user_data.get("bio"),
            "location": user_data.get("location"),
            "followers": user_data.get("followers"),
            "following": user_data.get("following"),
            "createdAt": user_data.get("created_at"),
            "aiSummary": ""  # Will be filled by AI
        },
        "topRepositories": enriched_repos,
        "stats": {}
    }

    # Generate AI Summary and Repo Rankings
    ai_data = generate_profile_summary(profile)
    if ai_data:
        profile["user"]["aiSummary"] = ai_data.get("aiSummary", "")
        
        ai_repo_map = {r["name"].lower(): r for r in ai_data.get("repositories", [])}

        for repo in profile["topRepositories"]:
            summary = ai_repo_map.get(repo["name"].lower())
            if summary:
                repo["aiSummary"] = summary.get("aiSummary", "")
                repo["rank"] = summary.get("rank", 999)
            else:
                repo["rank"] = 999

        profile["topRepositories"] = sorted(profile["topRepositories"], key=lambda r: r["rank"])
    
    # Generate stats from topRepositories
    top_repos = profile["topRepositories"]
    total_repos = len(top_repos)
    total_stars = sum(repo["stars"] for repo in top_repos)
    total_contributors = 0

    # Optional: count contributors
    import requests
    for repo in repos_data:
        if "contributors_url" in repo:
            try:
                res = requests.get(repo["contributors_url"])
                if res.status_code == 200:
                    total_contributors += len(res.json())
            except:
                pass

    # Build language distribution
    lang_count = {}
    for repo in top_repos:
        for lang in repo["techStack"]:
            lang_count[lang] = lang_count.get(lang, 0) + 1

    languages = [
        {"name": lang, "percentage": count / total_repos, "linesOfCode": count * 1000}
        for lang, count in lang_count.items()
    ]

    profile["stats"] = {
        "metrics": {
            "totalRepositories": total_repos,
            "totalStars": total_stars,
            "totalContributors": total_contributors
        },
        "languages": languages
    }

    # Save to Firestore
    profile["lastUpdated"] = datetime.now(timezone.utc).isoformat()
    doc_ref.set(profile)

    return {"source": "github+ai", "data": profile}
