# 🚀 Quick Deploy Commands - Matthew Backend

## Option 1: Automated Deployment (Recommended)

```powershell
# Run the deployment script
.\deploy-to-render.ps1
```

Then go to https://render.com/dashboard and follow the prompts.

---

## Option 2: Manual Git Commands

```powershell
# 1. Commit your changes
git add .
git commit -m "Deploy to Render"

# 2. Add GitHub remote (first time only)
git remote add origin https://github.com/YOUR_USERNAME/matthew-backend.git

# 3. Push to GitHub
git branch -M main
git push -u origin main
```

---

## Option 3: Deploy via Render CLI

```powershell
# Install Render CLI (first time only)
npm install -g render-cli

# Login to Render
render login

# Deploy
render deploy
```

---

## Environment Variables to Set in Render

When deploying, add these in Render dashboard:

```
NODE_ENV=production
PORT=8000
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_KEY=eyJhbGci...your-anon-key
OPENAI_API_KEY=sk-proj-...your-api-key
SOLANA_RPC=https://api.devnet.solana.com
SOLANA_KEYPAIR_BASE58=(optional-base58-keypair)
```

---

## Test Your Deployed API

Replace `YOUR-SERVICE` with your Render service name:

```powershell
# Health check
Invoke-RestMethod https://YOUR-SERVICE.onrender.com/

# Calculate taxes
$body = @{
    revenue = 10000000
    profit = 3000000
    capitalGains = 500000
    digitalAssets = 200000
    turnover = 10000000
    businessType = "SME"
} | ConvertTo-Json

Invoke-RestMethod -Uri https://YOUR-SERVICE.onrender.com/tax/calculate `
  -Method POST -Body $body -ContentType "application/json"
```

---

## Troubleshooting

**Build fails?**
- Check logs in Render dashboard
- Verify `package.json` has all dependencies

**Service crashes?**
- Check environment variables are set correctly
- View logs: Render Dashboard → Your Service → Logs

**503 errors?**
- Free tier spins down after idle (normal)
- Wait 30 seconds for first request to wake service

---

**Full Guide:** See `RENDER_DEPLOYMENT.md` for detailed instructions
