# 🚀 Render Deployment Guide - Matthew Backend

## Prerequisites Checklist ✅

Before deploying, ensure you have:

1. **GitHub Repository** - Your code must be pushed to GitHub
2. **Render Account** - Sign up at https://render.com (free tier available)
3. **Supabase Account** - Get credentials from https://supabase.com
4. **OpenAI API Key** - Get from https://platform.openai.com/api-keys
5. **Solana Keypair** (Optional) - For blockchain features

---

## Step 1: Push Code to GitHub

```powershell
# Initialize git if not already done
git init
git add .
git commit -m "Prepare for Render deployment"

# Create GitHub repo and push
git remote add origin https://github.com/YOUR_USERNAME/matthew-backend.git
git branch -M main
git push -u origin main
```

---

## Step 2: Deploy on Render (Web UI Method)

### Option A: Blueprint Deploy (Recommended - uses render.yaml)

1. Go to https://render.com/dashboard
2. Click **"New +"** → **"Blueprint"**
3. Connect your GitHub repository
4. Select `matthew-backend` repository
5. Render will detect `render.yaml` automatically
6. Click **"Apply"**
7. Add environment variables when prompted:
   - `SUPABASE_URL` = Your Supabase project URL
   - `SUPABASE_KEY` = Your Supabase anon/public key
   - `OPENAI_API_KEY` = Your OpenAI API key
   - `SOLANA_KEYPAIR_BASE58` = (Optional) Your base58 keypair
8. Click **"Create Services"**

### Option B: Manual Deploy

1. Go to https://render.com/dashboard
2. Click **"New +"** → **"Web Service"**
3. Connect your GitHub repository
4. Select `matthew-backend` repository
5. Configure:
   - **Name:** matthew-backend
   - **Environment:** Node
   - **Region:** Oregon (or closest to you)
   - **Branch:** main
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
6. Click **"Advanced"** and add environment variables:
   ```
   NODE_ENV=production
   PORT=8000
   SUPABASE_URL=<your-supabase-url>
   SUPABASE_KEY=<your-supabase-key>
   OPENAI_API_KEY=<your-openai-key>
   SOLANA_RPC=https://api.devnet.solana.com
   SOLANA_KEYPAIR_BASE58=<optional-your-keypair>
   ```
7. Select **Free Plan** (or paid if needed)
8. Click **"Create Web Service"**

---

## Step 3: Configure Supabase Database

Your Render app needs the Supabase `reports` table. Run this SQL in your Supabase SQL Editor:

```sql
CREATE TABLE reports (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  hash TEXT NOT NULL,
  data JSONB NOT NULL,
  blockchain_signature TEXT,
  blockchain_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_reports_hash ON reports(hash);
CREATE INDEX idx_reports_created_at ON reports(created_at DESC);
```

---

## Step 4: Verify Deployment

Once deployed, Render will give you a URL like: `https://matthew-backend.onrender.com`

### Test Health Check:
```powershell
Invoke-RestMethod https://matthew-backend.onrender.com/
```

### Test Tax Calculation:
```powershell
$body = @{
    revenue = 10000000
    profit = 3000000
    capitalGains = 500000
    digitalAssets = 200000
    turnover = 10000000
    businessType = "SME"
} | ConvertTo-Json

Invoke-RestMethod -Uri https://matthew-backend.onrender.com/tax/calculate -Method POST -Body $body -ContentType "application/json"
```

---

## Step 5: Enable Auto-Deploy (Optional)

In Render dashboard:
1. Go to your service → **Settings**
2. Under **Build & Deploy**, enable **"Auto-Deploy"**
3. Now every push to `main` branch will auto-deploy

---

## Environment Variables Reference

| Variable | Required | Example | Notes |
|----------|----------|---------|-------|
| `NODE_ENV` | Yes | `production` | Set to production |
| `PORT` | Yes | `8000` | Auto-set by Render |
| `SUPABASE_URL` | Yes | `https://xxx.supabase.co` | From Supabase dashboard |
| `SUPABASE_KEY` | Yes | `eyJhb...` | Anon/public key |
| `OPENAI_API_KEY` | Yes | `sk-proj-...` | From OpenAI platform |
| `SOLANA_RPC` | No | `https://api.devnet.solana.com` | Devnet for testing |
| `SOLANA_KEYPAIR_BASE58` | No | `5J7Qz...` | Optional blockchain feature |

---

## Troubleshooting

### Build Fails
- Check `package.json` has all dependencies
- Verify Node.js version (Render uses latest LTS by default)

### Service Crashes
- Check Render logs: Dashboard → Your Service → Logs
- Verify all required environment variables are set
- Test Supabase connection credentials

### 503 Errors on First Request
- Render free tier spins down after inactivity
- First request after idle takes ~30 seconds to wake up
- Upgrade to paid tier for always-on service

### API Returns Errors
- Check environment variables are correct
- Verify Supabase table exists and credentials work
- Test OpenAI API key is valid and has credits

---

## Quick Commands Summary

```powershell
# Push to GitHub
git add .
git commit -m "Deploy to Render"
git push origin main

# Test deployed API
Invoke-RestMethod https://YOUR-SERVICE.onrender.com/

# View logs (use Render dashboard)
# https://dashboard.render.com → Your Service → Logs
```

---

## Cost Estimate

- **Render Free Tier:** $0/month (750 hours/month, spins down after 15min idle)
- **Render Starter:** $7/month (always-on, better performance)
- **Supabase Free Tier:** $0/month (500MB database, 50,000 monthly active users)
- **OpenAI API:** Pay-per-use (~$0.002 per request for GPT-3.5-turbo)
- **Solana Transactions:** ~$0.00025 per transaction on devnet (nearly free)

**Total for testing/demo:** FREE (with usage limits)

---

## Next Steps After Deployment

1. ✅ Test all endpoints (see QUICKSTART.md)
2. ✅ Set up custom domain (optional)
3. ✅ Configure monitoring/alerts in Render
4. ✅ Add frontend application
5. ✅ Switch Solana to mainnet for production

---

**Questions?** Check Render docs: https://render.com/docs
