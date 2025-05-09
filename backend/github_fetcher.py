import requests
import os
from dotenv import load_dotenv

load_dotenv()

GITHUB_API = "https://api.github.com"
GITHUB_TOKEN = os.getenv("GITHUB_TOKEN")

headers = {
    "Accept": "application/vnd.github+json"
}
if GITHUB_TOKEN:
    headers["Authorization"] = f"Bearer {GITHUB_TOKEN}"

def fetch_github_user(username: str):
    res = requests.get(f"{GITHUB_API}/users/{username}", headers=headers)
    if res.status_code != 200:
        raise Exception(f"GitHub user not found: {username}")
    return res.json()

def fetch_github_repos(username: str):
    res = requests.get(f"{GITHUB_API}/users/{username}/repos?per_page=100&sort=updated", headers=headers)
    if res.status_code != 200:
        raise Exception("Error fetching repositories")
    
    repos = res.json()
    # Only top 10 by stars
    sorted_repos = sorted(repos, key=lambda r: r.get("stargazers_count", 0), reverse=True)
    return sorted_repos[:10]

def fetch_repo_languages(repo_url: str):
    res = requests.get(repo_url + "/languages", headers=headers)
    if res.status_code != 200:
        return {}
    return res.json()
