# Quick Deploy to Render - Matthew Backend
# Run this script to prepare and push your code for deployment

Write-Host "🚀 Matthew Backend - Render Deployment Script" -ForegroundColor Cyan
Write-Host "=============================================" -ForegroundColor Cyan
Write-Host ""

# Check if git is initialized
if (-not (Test-Path ".git")) {
    Write-Host "❌ Git not initialized. Initializing now..." -ForegroundColor Yellow
    git init
    Write-Host "✅ Git initialized" -ForegroundColor Green
}

# Check for uncommitted changes
Write-Host "📦 Checking for changes..." -ForegroundColor Cyan
$status = git status --porcelain

if ($status) {
    Write-Host "📝 Adding all changes..." -ForegroundColor Cyan
    git add .
    
    $commitMsg = Read-Host "Enter commit message (or press Enter for default)"
    if ([string]::IsNullOrWhiteSpace($commitMsg)) {
        $commitMsg = "Deploy to Render - $(Get-Date -Format 'yyyy-MM-dd HH:mm')"
    }
    
    git commit -m $commitMsg
    Write-Host "✅ Changes committed" -ForegroundColor Green
} else {
    Write-Host "✅ No changes to commit" -ForegroundColor Green
}

# Check if remote exists
$remotes = git remote
if (-not $remotes -contains "origin") {
    Write-Host ""
    Write-Host "❌ No GitHub remote found" -ForegroundColor Yellow
    Write-Host "Please add your GitHub repository URL:" -ForegroundColor Yellow
    $repoUrl = Read-Host "GitHub repo URL (e.g., https://github.com/username/matthew-backend.git)"
    
    if ($repoUrl) {
        git remote add origin $repoUrl
        Write-Host "✅ Remote added" -ForegroundColor Green
    } else {
        Write-Host "❌ No URL provided. Please add remote manually:" -ForegroundColor Red
        Write-Host "   git remote add origin YOUR_REPO_URL" -ForegroundColor Red
        exit 1
    }
}

# Push to GitHub
Write-Host ""
Write-Host "📤 Pushing to GitHub..." -ForegroundColor Cyan
$branch = git branch --show-current
if ([string]::IsNullOrWhiteSpace($branch)) {
    $branch = "main"
    git branch -M main
}

try {
    git push -u origin $branch
    Write-Host "✅ Successfully pushed to GitHub!" -ForegroundColor Green
} catch {
    Write-Host "❌ Push failed. You may need to force push or resolve conflicts" -ForegroundColor Red
    Write-Host "Try: git push -u origin $branch --force" -ForegroundColor Yellow
}

Write-Host ""
Write-Host "=============================================" -ForegroundColor Cyan
Write-Host "✨ Next Steps:" -ForegroundColor Green
Write-Host ""
Write-Host "1. Go to https://render.com/dashboard" -ForegroundColor White
Write-Host "2. Click 'New +' → 'Blueprint'" -ForegroundColor White
Write-Host "3. Connect your GitHub repository" -ForegroundColor White
Write-Host "4. Render will auto-detect render.yaml" -ForegroundColor White
Write-Host "5. Add environment variables:" -ForegroundColor White
Write-Host "   - SUPABASE_URL" -ForegroundColor Yellow
Write-Host "   - SUPABASE_KEY" -ForegroundColor Yellow
Write-Host "   - OPENAI_API_KEY" -ForegroundColor Yellow
Write-Host "   - SOLANA_KEYPAIR_BASE58 (optional)" -ForegroundColor Yellow
Write-Host "6. Click 'Apply' to deploy!" -ForegroundColor White
Write-Host ""
Write-Host "📚 Full guide: See RENDER_DEPLOYMENT.md" -ForegroundColor Cyan
Write-Host "=============================================" -ForegroundColor Cyan
