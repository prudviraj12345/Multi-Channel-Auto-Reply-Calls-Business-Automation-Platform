# Multi-Channel Auto Reply & Calls — Business Automation Platform

This repository contains a full-stack application that provides an AI-driven business assistant with a React + Vite frontend and a FastAPI Python backend (Gemini / Google Generative AI). The project is configured to deploy on Vercel (frontend + serverless Python API) using the provided `vercel.json`.

Repository
- Source: https://github.com/prudviraj12345/Multi-Channel-Auto-Reply-Calls-Business-Automation-Platform.git

Live Demo
- Frontend (production): https://frontend-amber-pi-34.vercel.app

Contents
- `frontend/` — React + Vite application (TypeScript)
- `backend/` — FastAPI backend (Gemini integration)
- `api/` — Vercel serverless API endpoint(s)
- `vercel.json` — Vercel configuration for builds and routes

Requirements
- Node.js (16+ recommended) and npm or pnpm
- Python 3.10+ for the backend
- A Gemini API key (set as `GEMINI_API_KEY`) to enable the AI backend

Local development

Frontend

1. Install dependencies

```bash
cd frontend
npm install
```

2. Run in development (Vite)

```bash
npm run dev
```

3. Build for production

```bash
npm run build
```

Backend (FastAPI)

1. Create and activate a virtual environment

Windows (PowerShell)

```powershell
cd backend
python -m venv .venv
& .venv\\Scripts\\Activate.ps1
pip install -r requirements.txt
```

Unix / macOS

```bash
cd backend
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
```

2. Configure environment

Copy `.env.example` to `.env` and set your Gemini API key:

```text
GEMINI_API_KEY=your_real_gemini_api_key_here
```

3. Run the backend locally

```bash
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

API

- Chat endpoint (POST): `/chat` — expects JSON `{ "message": "..." }` and returns `{ "reply": "..." }`

Vercel deployment

The project already includes `vercel.json` to build the frontend and run Python serverless functions for API routes.

1. Install and login to Vercel CLI (if you prefer CLI)

```bash
npm i -g vercel
vercel login
```

2. Deploy (from project root)

```bash
vercel deploy --prod --yes
```

3. Add environment variable for the backend in the Vercel project settings

- Key: `GEMINI_API_KEY`
- Value: your Gemini API key

After deployment the frontend will be available at the Vercel production URL (example shown in this README). If the chat backend returns errors, confirm `GEMINI_API_KEY` is present in the project's Environment Variables.

Notes and troubleshooting

- If the frontend cannot reach the API, the app expects serverless API routes to be available at `/api/*` (this is handled by `vercel.json`).
- If you see authentication or token errors, verify the `GEMINI_API_KEY` is valid and not rate-limited.

Contributing

- Open an issue for feature requests or bugs.
- Send pull requests against `main`.

License

- Add a suitable license file if you want to open-source this project.

Contact

- Repository owner: prudviraj12345
