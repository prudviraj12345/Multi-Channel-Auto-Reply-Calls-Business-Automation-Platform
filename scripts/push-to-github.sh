#!/usr/bin/env bash
# Usage: ./push-to-github.sh https://github.com/USER/REPO.git

set -euo pipefail
REMOTE_URL="$1"
BRANCH="main"

if [ -z "$REMOTE_URL" ]; then
  echo "Usage: $0 <git-remote-url>"
  exit 1
fi

# Ensure we're at repo root (script expects to be run from project root)
REPO_ROOT="$(git rev-parse --show-toplevel 2>/dev/null || echo "")"
if [ -z "$REPO_ROOT" ]; then
  echo "Not in a git repository. Initializing one."
  git init
fi

# Add all changes and commit
git add .
if git diff --cached --quiet; then
  echo "No changes to commit."
else
  git commit -m "Prepare project for Vercel deployment (serverless backend + frontend)"
fi

# Set remote
if git remote get-url origin >/dev/null 2>&1; then
  echo "Remote 'origin' exists. Updating URL to $REMOTE_URL"
  git remote set-url origin "$REMOTE_URL"
else
  git remote add origin "$REMOTE_URL"
fi

# Push
git branch -M $BRANCH

echo "Pushing to $REMOTE_URL (branch $BRANCH). You may be prompted for credentials."
git push -u origin $BRANCH

echo "Push complete."
