param(
  [Parameter(Mandatory=$true)]
  [string]$RemoteUrl
)

# Usage: .\push-to-github.ps1 -RemoteUrl "https://github.com/user/repo.git"

if (-not (Get-Command git -ErrorAction SilentlyContinue)) {
  Write-Error "Git is not installed or not in PATH. Install Git first."
  exit 1
}

# Initialize repo if needed
$gitRoot = git rev-parse --show-toplevel 2>$null
if (-not $gitRoot) {
  Write-Output "Not in a git repository. Initializing one."
  git init
}

# Add and commit
git add .
$hasStaged = git diff --cached --name-only
if (-not $hasStaged) {
  Write-Output "No changes to commit."
} else {
  git commit -m "Prepare project for Vercel deployment (serverless backend + frontend)"
}

# Set remote
try {
  git remote get-url origin >$null 2>&1
  git remote set-url origin $RemoteUrl
  Write-Output "Updated remote 'origin' URL to $RemoteUrl"
} catch {
  git remote add origin $RemoteUrl
  Write-Output "Added remote 'origin' pointing to $RemoteUrl"
}

# Push
$branch = "main"
git branch -M $branch
Write-Output "Pushing to $RemoteUrl (branch $branch)"
git push -u origin $branch
Write-Output "Push complete."
