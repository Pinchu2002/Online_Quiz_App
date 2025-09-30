# 🚀 Deployment Guide - Phase 12

Complete guide to deploy your Quiz Application to production using **FREE** hosting platforms.

---

## 📋 Table of Contents

- [Deployment Strategy](#deployment-strategy)
- [Prerequisites](#prerequisites)
- [Frontend Deployment (Vercel)](#frontend-deployment-vercel)
- [Backend Deployment (Render)](#backend-deployment-render)
- [Environment Configuration](#environment-configuration)
- [Testing Deployment](#testing-deployment)
- [Troubleshooting](#troubleshooting)
- [Alternative Platforms](#alternative-platforms)

---

## 🎯 Deployment Strategy

### Recommended Setup (100% FREE)

```
┌─────────────────────────────────────────┐
│         User's Browser                  │
└─────────────┬───────────────────────────┘
              │
              ▼
┌─────────────────────────────────────────┐
│    Vercel (Frontend - React App)        │
│    https://your-quiz-app.vercel.app     │
└─────────────┬───────────────────────────┘
              │ API Calls
              ▼
┌─────────────────────────────────────────┐
│    Render (Backend - Express API)       │
│    https://your-api.onrender.com        │
│    + SQLite Database                     │
└─────────────────────────────────────────┘
```

### Why This Setup?

- ✅ **100% Free** - No credit card required
- ✅ **Auto-deploy** - Push to GitHub = Auto deploy
- ✅ **SSL/HTTPS** - Free SSL certificates
- ✅ **CDN** - Global content delivery
- ✅ **Easy Setup** - 10-15 minutes total
- ✅ **Great Performance** - Fast load times

---

## 📦 Prerequisites

### 1. GitHub Repository

```bash
# Initialize git (if not done)
git init
git add .
git commit -m "feat: initial commit for deployment"

# Create GitHub repo and push
git remote add origin https://github.com/Pinchu2002/Online_Quiz_App.git
git branch -M main
git push -u origin main
```

### 2. Accounts Needed

- ✅ [GitHub Account](https://github.com/signup) - Free
- ✅ [Vercel Account](https://vercel.com/signup) - Free (sign up with GitHub)
- ✅ [Render Account](https://render.com/register) - Free (sign up with GitHub)

---

## 🎨 Frontend Deployment (Vercel)

### Step 1: Prepare Frontend for Production

#### Update API Base URL

Create `frontend/.env.production`:

```env
REACT_APP_API_URL=https://your-backend-name.onrender.com/api
```

#### Update `frontend/src/services/api.js`:

```javascript
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

export default API_BASE_URL;
```

#### Verify Build Works Locally

```bash
cd frontend
npm run build
# Should create a 'build' folder
```

### Step 2: Deploy to Vercel

#### Option A: Vercel CLI (Recommended)

```bash
# Install Vercel CLI
npm install -g vercel

# Login to Vercel
vercel login

# Deploy from frontend directory
cd frontend
vercel

# Follow prompts:
# - Set up and deploy? Yes
# - Which scope? Your account
# - Link to existing project? No
# - Project name? quiz-app-frontend
# - Directory? ./
# - Override settings? No
```

#### Option B: Vercel Dashboard

1. Go to [vercel.com/new](https://vercel.com/new)
2. Click "Import Git Repository"
3. Select your GitHub repo
4. Configure:
   - **Framework Preset**: Create React App
   - **Root Directory**: `frontend`
   - **Build Command**: `npm run build`
   - **Output Directory**: `build`
5. Add Environment Variable:
   - Key: `REACT_APP_API_URL`
   - Value: `https://your-backend-name.onrender.com/api`
6. Click "Deploy"

### Step 3: Configure Custom Domain (Optional)

1. Go to Project Settings → Domains
2. Add your custom domain
3. Update DNS records as instructed

---

## ⚙️ Backend Deployment (Render)

### Step 1: Prepare Backend for Production

#### Create `backend/.env.production`:

```env
NODE_ENV=production
PORT=10000
DATABASE_PATH=./database.sqlite
CORS_ORIGIN=https://your-quiz-app.vercel.app
```

#### Update `backend/server.js` for CORS:

```javascript
const cors = require('cors');

const corsOptions = {
  origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
  credentials: true
};

app.use(cors(corsOptions));
```

#### Create `backend/render.yaml`:

```yaml
services:
  - type: web
    name: quiz-app-backend
    env: node
    buildCommand: npm install
    startCommand: npm start
    envVars:
      - key: NODE_ENV
        value: production
      - key: PORT
        value: 10000
```

### Step 2: Deploy to Render

#### Via Render Dashboard:

1. Go to [dashboard.render.com](https://dashboard.render.com)
2. Click "New +" → "Web Service"
3. Connect your GitHub repository
4. Configure:
   - **Name**: `quiz-app-backend`
   - **Region**: Choose closest to your users
   - **Branch**: `main`
   - **Root Directory**: `backend`
   - **Runtime**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Instance Type**: `Free`

5. Add Environment Variables:
   ```
   NODE_ENV=production
   PORT=10000
   ```

6. Click "Create Web Service"

### Step 3: Wait for Deployment

- First deploy takes 5-10 minutes
- Render will show build logs
- Once complete, you'll get a URL like: `https://quiz-app-backend.onrender.com`

### Step 4: Test Backend

```bash
# Test health endpoint
curl https://quiz-app-backend.onrender.com/api/health

# Should return: {"status":"OK","timestamp":"..."}
```

---

## 🔧 Environment Configuration

### Frontend Environment Variables

**Vercel Dashboard** → Project → Settings → Environment Variables

```env
# Production
REACT_APP_API_URL=https://quiz-app-backend.onrender.com/api

# Preview (optional)
REACT_APP_API_URL=https://quiz-app-backend-preview.onrender.com/api
```

### Backend Environment Variables

**Render Dashboard** → Service → Environment

```env
NODE_ENV=production
PORT=10000
CORS_ORIGIN=https://quiz-app-frontend.vercel.app
```

---

## 🔄 Update Frontend with Backend URL

After backend is deployed:

1. Copy your Render backend URL
2. Go to Vercel → Project → Settings → Environment Variables
3. Update `REACT_APP_API_URL` with your Render URL
4. Redeploy frontend (Vercel → Deployments → Redeploy)

---

## 🧪 Testing Deployment

### 1. Test Backend API

```bash
# Health check
curl https://your-backend.onrender.com/api/health

# Get quiz
curl https://your-backend.onrender.com/api/quiz/1
```

### 2. Test Frontend

1. Visit your Vercel URL
2. Open browser DevTools → Network tab
3. Start a quiz
4. Verify API calls go to Render backend
5. Complete quiz flow
6. Check for any errors

### 3. Test Full Flow

- ✅ Homepage loads
- ✅ Quiz starts
- ✅ Timer works
- ✅ Questions display
- ✅ Answers save
- ✅ Quiz submits
- ✅ Results show
- ✅ Answer review works

---

## 🐛 Troubleshooting

### Issue: CORS Errors

**Solution**: Update backend CORS origin

```javascript
// backend/server.js
const corsOptions = {
  origin: [
    'https://your-quiz-app.vercel.app',
    'https://your-quiz-app-*.vercel.app', // Preview deployments
    'http://localhost:3000' // Local development
  ],
  credentials: true
};
```

### Issue: API Calls Failing

**Check**:
1. Backend URL is correct in Vercel env vars
2. Backend is running (check Render logs)
3. CORS is configured properly
4. API endpoints are correct

### Issue: Database Not Persisting

**Solution**: Render free tier doesn't persist files. Options:
1. Use Render's PostgreSQL (free tier)
2. Use external database (Supabase, PlanetScale)
3. Accept that data resets on redeploy (fine for demo)

### Issue: Render Service Sleeping

**Note**: Free tier sleeps after 15 min inactivity
- First request takes 30-60 seconds to wake up
- Subsequent requests are fast
- Upgrade to paid tier for always-on

### Issue: Build Failing

**Check**:
1. All dependencies in package.json
2. Build command is correct
3. Node version compatibility
4. Check build logs for errors

---

## 🌐 Alternative Platforms

### If Vercel/Render Don't Work:

#### Frontend Alternatives:
1. **Netlify** - Similar to Vercel
   ```bash
   npm install -g netlify-cli
   cd frontend
   netlify deploy --prod
   ```

2. **GitHub Pages** - Free, but requires configuration
3. **Cloudflare Pages** - Fast, free tier

#### Backend Alternatives:
1. **Railway.app** - $5 free credit/month
   ```bash
   npm install -g @railway/cli
   railway login
   railway init
   railway up
   ```

2. **Fly.io** - Free tier available
3. **Cyclic.sh** - Free tier for Node.js
4. **Glitch** - Free, but limited

---

## 📊 Deployment Checklist

### Pre-Deployment
- [ ] Code pushed to GitHub
- [ ] Frontend builds successfully locally
- [ ] Backend runs without errors
- [ ] Environment variables documented
- [ ] CORS configured
- [ ] API URLs updated

### Frontend (Vercel)
- [ ] Project created on Vercel
- [ ] Connected to GitHub repo
- [ ] Build settings configured
- [ ] Environment variables set
- [ ] Deployment successful
- [ ] Custom domain configured (optional)

### Backend (Render)
- [ ] Service created on Render
- [ ] Connected to GitHub repo
- [ ] Build command configured
- [ ] Start command configured
- [ ] Environment variables set
- [ ] Deployment successful
- [ ] Health check passing

### Post-Deployment
- [ ] Frontend loads correctly
- [ ] API calls work
- [ ] Full quiz flow tested
- [ ] Timer works
- [ ] Results display
- [ ] Answer review works
- [ ] No console errors
- [ ] Mobile responsive
- [ ] Performance acceptable

---

## 🚀 Continuous Deployment

### Auto-Deploy Setup

Both Vercel and Render support auto-deployment:

1. **Push to GitHub** → Automatic deployment
2. **Pull Requests** → Preview deployments
3. **Main Branch** → Production deployment

```bash
# Make changes
git add .
git commit -m "feat: add new feature"
git push origin main

# Vercel and Render will auto-deploy!
```

---

## 📈 Performance Optimization

### Frontend Optimization

```bash
# Analyze bundle size
cd frontend
npm run build
npx source-map-explorer 'build/static/js/*.js'
```

### Backend Optimization

1. Enable compression
2. Add caching headers
3. Optimize database queries
4. Use connection pooling

---

## 💰 Cost Breakdown

### Free Tier Limits

| Platform | Free Tier | Limits |
|----------|-----------|--------|
| **Vercel** | Unlimited | 100GB bandwidth/month |
| **Render** | 750 hours/month | Sleeps after 15 min |
| **Total** | **$0/month** | Perfect for portfolio |

### When to Upgrade

- High traffic (>100k visitors/month)
- Need always-on backend
- Custom domains with SSL
- Team collaboration features

---

## 🎉 Success!

Your Quiz Application is now deployed and accessible worldwide!

**Frontend**: `https://your-quiz-app.vercel.app`  
**Backend**: `https://your-backend.onrender.com`

### Share Your Project

- Add to portfolio
- Share on LinkedIn
- Tweet about it
- Add to resume

---

## 📞 Support

- **Vercel Docs**: [vercel.com/docs](https://vercel.com/docs)
- **Render Docs**: [render.com/docs](https://render.com/docs)
- **Issues**: Open GitHub issue

---

**Deployment Guide Version**: 1.0  
**Last Updated**: October 1, 2025  
**Status**: ✅ Production Ready
