from fastapi import APIRouter
from backend.firestore import db
from backend.github_fetcher import fetch_github_user, fetch_github_repos, fetch_repo_languages

router = APIRouter()

@router.get("/profile/{username}")
async def get_profile(username: str):
    # Check Firestore cache
    doc_ref = db.collection("github_profiles").document(username)
    doc = doc_ref.get()
    
    if doc.exists:
        return {"source": "cache", "data": doc.to_dict()}

    # Fetch from GitHub
    user_data = fetch_github_user(username)
    repos_data = fetch_github_repos(username)

    # Enrich repos with languages
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
            "techStack": list(languages.keys()),  # used in frontend badges
            "aiSummary": ""  # placeholder for later
        })

    # Prepare profile structure for frontend
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
            "aiSummary": ""  # placeholder for AI 
        },
        "topRepositories": enriched_repos,
        "stats": {}  # placeholder for metrics
    }

    # Save to Firestore
    doc_ref.set(profile)

    return {"source": "github", "data": profile}
