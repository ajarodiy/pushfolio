# 🚀 Pushfolio | AI-Powered GitHub Portfolio Generator

Pushfolio is an AI-enhanced portfolio web app that analyzes your GitHub profile and generates an insightful, visually rich, and recruiter-friendly developer portfolio — in just one click.

---

## ✨ Key Features

- 🧠 **AI-Powered Summaries**: Uses GPT-3.5-Turbo to generate a concise overview of your GitHub activity, strengths, and top repositories.
- 📊 **Repo Ranking & Highlights**: Automatically ranks your top repositories and summarizes them for you.
- 🌐 **Live GitHub Integration**: Fetches real-time GitHub user and repo data via the GitHub API.
- 💾 **Caching with Firestore**: Smart caching layer that avoids redundant API/AI calls and stores summaries.
- 🔁 **24hr Auto Refresh Logic**: Refreshes profiles after 24 hours or on manual force-refresh.
- 📱 **Mobile-Responsive Design**: Fully responsive frontend with polished UI components and smooth transitions.

---

## 🧠 Tech Stack

### 🔧 Frontend
- **React.js** + TypeScript
- **Vite** for bundling
- **Tailwind CSS** for styling
- **ShadCN UI** + Lucide Icons for components
- **Framer Motion** for subtle UI animations

### ⚙️ Backend
- **FastAPI** for API endpoints
- **OpenAI GPT-4** for summaries and repo insights
- **Google Firestore (Firebase)** for caching user data
- **GitHub REST API** for profile and repo data

---

## 🗂️ System Workflow

1. User searches for a GitHub username.
2. Backend checks Firestore cache:
   - If fresh (<24hrs), return cached profile.
   - If expired or missing, fetch GitHub data and call OpenAI.
3. OpenAI returns:
   - Profile summary
   - Top repositories + ranked insights
4. Results are saved in Firestore with a `lastUpdated` timestamp.
5. Frontend renders everything beautifully using Tabs and Cards.

---

## 🔐 CORS & Deployment

- CORS restricted to production domain (e.g. `https://ajarodiy.me`)
- Render for backend hosting
- Vercel for frontend deployment (supports subpath routing via `vite.config.ts` base)

---

## ⚙️ Run Locally

### 1. Backend (FastAPI)
```bash
cd backend
pip install -r requirements.txt
uvicorn main:app --reload
```

### 2. Frontend (Vite + React)
```bash
cd frontend
npm install
npm run dev
```

Then go to `http://localhost:5173` and try searching a GitHub username.

---

## 🔥 Example Output

- *"Aditya is a passionate developer with strong experience in ML, backend systems, and problem solving."*
- *"Top repo: `leetcode-advisor` – A smart Chrome Extension using GPT-3.5 to assist LeetCode users."*

---

## 🎯 Future Plans

- Support for GitHub contribution graph parsing
- Add Open Graph tags for rich link previews
- Deploy user-specific public portfolio URLs (e.g., `/ajarodiy`)
- Add contributor avatars and commit stats

---

## 📜 License

MIT

---

## 🤝 Contributions Welcome

Spotted a bug? Have an enhancement idea? PRs and issues are open!