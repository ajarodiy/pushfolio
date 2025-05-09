from openai import OpenAI
import os
import json
from dotenv import load_dotenv

load_dotenv()

client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

def generate_profile_summary(profile: dict):
    prompt = build_prompt(profile)

    response = client.chat.completions.create(
        model="gpt-3.5-turbo",
        messages=[
            {
                "role": "system",
                "content": (
                    "You are a technical writing assistant. Summarize GitHub profiles and repositories "
                    "for a portfolio website. Respond only in the JSON format provided."
                )
            },
            {
                "role": "user",
                "content": prompt
            }
        ],
        temperature=0.7,
        max_tokens=3000,
    )

    try:
        print("\n🤖 RAW AI RESPONSE:")
        print(response.choices[0].message.content)
        content = response.choices[0].message.content
        return json.loads(content)
    except Exception as e:
        print("AI parsing failed:", e)
        return {
            "aiSummary": "",
            "repositories": []
        }

def build_prompt(profile: dict) -> str:
    user = profile.get("user", {})
    repos = profile.get("topRepositories", [])

    prompt = f"""
You are an AI assistant that summarizes GitHub profiles for a portfolio website.

You must:
- Write a short (2 sentence) **positive** summary about the user's skills and profile.
- Rank the repositories by relevance (1 = most relevant).
- Write 1–2 sentence summaries for each repository.
- Return only valid **pure JSON** — no comments, no extra text, no markdown, nothing else.

Output strictly in this format:
{{
  "aiSummary": "...",
  "repositories": [
    {{
      "name": "...",
      "aiSummary": "...",
      "rank": 1
    }}
  ]
}}

User Info:
Name: {user.get('name')}
Bio: {user.get('bio')}
Followers: {user.get('followers')}
Following: {user.get('following')}

Repositories:
"""

    for repo in repos:
        prompt += f"""
- {repo['name']}: {repo.get('description') or "No description provided."}
  Tech Stack: {', '.join(repo.get('techStack', []))}
  Stars: {repo['stars']}, Forks: {repo['forks']}, Last Updated: {repo['updatedAt']}
"""

    return prompt.strip()

