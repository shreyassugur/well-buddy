# WellBuddy Deployment Guide

## ✅ Your app is ready for deployment!

### Pre-Deployment Checklist:
- [x] Environment variables are in `.gitignore`
- [x] CORS configured for production
- [x] Security headers (Helmet) enabled
- [x] Rate limiting configured
- [x] Password hashing with bcrypt
- [x] JWT authentication

---

## Environment Variables Setup

### 1. Backend Environment Variables
Copy `backend/.env.example` to `backend/.env` and update:

```env
MONGO_URI=your-mongodb-atlas-connection-string
JWT_SECRET=your-super-secret-random-string
FRONTEND_URL=https://your-frontend-domain.com
NODE_ENV=production
PORT=5000
```

### 2. Frontend Environment Variables
Create `frontend/.env.production`:

```env
VITE_API_URL=https://your-backend-domain.com/api
```

Then update `frontend/src/api/axios.js`:
```javascript
const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000/api"
});
```

---

## Deployment Steps

### Option 1: Deploy to Vercel (Frontend) + Render (Backend)

#### Frontend (Vercel):
1. Push code to GitHub
2. Go to vercel.com
3. Import your repository
4. Build command: `npm run build`
5. Output directory: `dist`
6. Add environment variable: `VITE_API_URL=your-backend-url/api`

#### Backend (Render):
1. Go to render.com
2. Create new Web Service
3. Connect your repository
4. Build command: `npm install`
5. Start command: `npm start`
6. Add environment variables from `.env.example`

### Option 2: Deploy to Railway (Full Stack)
1. Go to railway.app
2. Create new project from GitHub
3. Add both frontend and backend services
4. Set environment variables for each

### Option 3: Deploy to Heroku
1. Install Heroku CLI
2. `heroku create your-backend-name`
3. Set environment variables: `heroku config:set MONGO_URI=...`
4. `git push heroku main`

---

## MongoDB Setup (Production)

### Using MongoDB Atlas (Recommended - Free Tier Available):
1. Go to mongodb.com/cloud/atlas
2. Create free cluster
3. Create database user
4. Whitelist IP: `0.0.0.0/0` (allow from anywhere)
5. Get connection string
6. Update `MONGO_URI` in backend environment variables

---

## Production Checklist

### Before Going Live:
- [ ] Update `FRONTEND_URL` in backend `.env`
- [ ] Update `VITE_API_URL` in frontend `.env.production`
- [ ] Use MongoDB Atlas (not local MongoDB)
- [ ] Generate strong `JWT_SECRET` (32+ characters)
- [ ] Test signup/login on deployed version
- [ ] Test all features (habits, workouts, challenges)
- [ ] Verify leaderboard shows all users
- [ ] Check that challenges are community-wide

### Security Notes:
- ✅ Passwords are hashed with bcrypt
- ✅ JWT tokens expire in 30 days
- ✅ Rate limiting: 100 requests per 15 minutes per IP
- ✅ Helmet security headers enabled
- ✅ CORS restricted to your frontend domain

---

## Testing Deployment

1. **Create test account** on deployed version
2. **Add habits** and log them
3. **Create workout** and log sessions
4. **Create challenge** and verify others can see it
5. **Check leaderboard** to verify ranking
6. **Test from different accounts** to ensure community features work

---

## Troubleshooting

### CORS Errors:
- Make sure `FRONTEND_URL` in backend matches your deployed frontend URL exactly
- Include `https://` in the URL

### Database Connection Failed:
- Check MongoDB Atlas IP whitelist
- Verify connection string format
- Ensure database user has read/write permissions

### 500 Internal Server Errors:
- Check backend logs
- Verify all environment variables are set
- Test endpoints with Postman/Insomnia

---

## Your App is Ready! 🚀

All core features work:
- ✅ User authentication
- ✅ Community challenges (everyone can see and join)
- ✅ Habits with streak tracking
- ✅ Workouts logging
- ✅ Leaderboard rankings
- ✅ Points system
- ✅ Health metrics (age, weight, height, BMI)

Just deploy and share with your users!
