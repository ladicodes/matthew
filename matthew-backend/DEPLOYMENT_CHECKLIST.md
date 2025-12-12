# ✅ Pre-Deployment Checklist

Complete these steps before deploying to Render:

## 1. Prerequisites

- [ ] GitHub account created
- [ ] Render account created (https://render.com)
- [ ] Supabase project created (https://supabase.com)
- [ ] OpenAI API key obtained (https://platform.openai.com/api-keys)
- [ ] Git installed on your machine

## 2. Code Preparation

- [x] `package.json` has correct start script ✅ DONE
- [x] `render.yaml` configuration created ✅ DONE
- [x] Environment config supports NODE_ENV ✅ DONE
- [x] `.gitignore` excludes `.env` and `node_modules` ✅ DONE
- [ ] All dependencies installed locally (`npm install`)
- [ ] Code tested locally (`npm start`)

## 3. Database Setup

- [ ] Supabase `reports` table created (run SQL from RENDER_DEPLOYMENT.md)
- [ ] Supabase URL copied
- [ ] Supabase anon/public key copied

## 4. API Keys Ready

- [ ] SUPABASE_URL
- [ ] SUPABASE_KEY
- [ ] OPENAI_API_KEY
- [ ] SOLANA_KEYPAIR_BASE58 (optional)

## 5. GitHub Repository

- [ ] Create GitHub repository
- [ ] Copy repository URL
- [ ] Push code to GitHub:
  ```powershell
  git init
  git add .
  git commit -m "Initial commit for Render deployment"
  git remote add origin YOUR_REPO_URL
  git branch -M main
  git push -u origin main
  ```

## 6. Render Deployment

- [ ] Login to Render dashboard
- [ ] Click "New +" → "Blueprint" (or "Web Service")
- [ ] Connect GitHub repository
- [ ] Configure environment variables
- [ ] Deploy service
- [ ] Wait for build to complete (~2-5 minutes)

## 7. Post-Deployment Testing

- [ ] Test health endpoint: `GET https://YOUR-SERVICE.onrender.com/`
- [ ] Test tax calculation: `POST /tax/calculate`
- [ ] Test AI explanation: `POST /explain`
- [ ] Check logs for errors
- [ ] Verify Supabase integration
- [ ] Test report creation and retrieval

## 8. Optional Enhancements

- [ ] Configure custom domain in Render
- [ ] Set up monitoring/alerts
- [ ] Enable auto-deploy from GitHub
- [ ] Configure CDN (if needed)
- [ ] Switch to Solana mainnet (production)

---

## Quick Commands

### Test Locally First
```powershell
npm install
npm start
# Test at http://localhost:8000
```

### Deploy to Render
```powershell
.\deploy-to-render.ps1
```

### Test Production
```powershell
Invoke-RestMethod https://YOUR-SERVICE.onrender.com/
```

---

## Need Help?

- **Render Docs:** https://render.com/docs
- **Supabase Docs:** https://supabase.com/docs
- **Project Docs:** See `RENDER_DEPLOYMENT.md`
