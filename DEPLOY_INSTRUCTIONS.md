# Deploy instructions (automated)

This repository includes two GitHub Actions that can automatically deploy your backend to Render and your frontend to Vercel when you push to `main`.

What you must do before the workflows will work:

- Push this repository to GitHub (set remote and push `main`).
- Add the following repository secrets in GitHub Settings -> Secrets -> Actions:
  - `RENDER_API_KEY` — a Render personal API key (can be created in Render dashboard -> Account -> API Keys).
  - `RENDER_SERVICE_ID` — the Render service ID for the backend service (you get this when creating a Web Service on Render).
  - `VERCEL_TOKEN` — a Vercel personal token (from Vercel dashboard -> Tokens).
  - `VERCEL_ORG_ID` — your Vercel organization ID.
  - `VERCEL_PROJECT_ID` — your Vercel project ID for the frontend.

How to get the Render Service ID (quick):
1. Create a Web Service on Render and set the "Root Directory" to `backend`.
2. After creating the service, go to the service's settings URL. The ID is in the URL or available via the Render dashboard/API.

How to get Vercel IDs (quick):
1. Create a new project in Vercel and import the repo, choosing `frontend` as the Root Directory.
2. The Vercel Project ID and Org ID are available in the project settings or via the Vercel dashboard.

Once the secrets are set, push a commit to `main` and the workflows will run. After they complete:

- Render will provide a backend URL (example `https://your-backend.onrender.com`).
- Vercel will provide a frontend URL (example `https://your-frontend.vercel.app`).

Post-deploy steps:
1. In the Vercel project settings, set the environment variable `VITE_API_BASE_URL` to your Render backend URL, then redeploy if necessary.
2. Visit the Vercel frontend URL and confirm features (chat) work.

If you prefer I can instead walk you through the Render and Vercel web UIs step-by-step in your terminal/browser.
