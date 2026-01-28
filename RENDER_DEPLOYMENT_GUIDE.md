# 🚀 Complete Deployment Guide for TalkFusion

Your backend and frontend are now ready for deployment!

## 📋 Deployment Checklist

- ✅ Backend configured for Render.com
- ✅ Frontend configured for Vercel
- ✅ Environment variables set up
- ✅ All files pushed to GitHub

---

## 🌐 Step-by-Step Deployment

### STEP 1: Deploy Backend to Render.com

**1. Go to Render.com**
- Visit: https://render.com
- Click "Sign Up"
- Choose "Sign up with GitHub"

**2. Create New Web Service**
- Click "New +" button
- Select "Web Service"
- Select your TalkFusion repository
- Click "Connect"

**3. Configure the Service**

Fill in these details:

| Field | Value |
|-------|-------|
| **Name** | talkfusion-backend |
| **Environment** | Node |
| **Build Command** | `npm install` |
| **Start Command** | `node backend/server.js` |
| **Instance Type** | Free |

**4. Add Environment Variables**

Scroll down to "Environment" section and add:

```
MONGO_DB_URI=mongodb+srv://Tushar6394:Hanuman%40108@talkfusion.eanz60l.mongodb.net/?appName=TalkFusion

JWT_SECRET=d783da352cb9c3a90106e87230c05e5d34099eca9a772db315a69af260570137

PORT=5001

NODE_ENV=production
```

**5. Deploy**
- Click "Create Web Service"
- Wait 3-5 minutes for deployment
- Your backend URL will be: `https://talkfusion-backend.onrender.com` (or similar)

---

### STEP 2: Update Frontend to Use Backend URL

Once your backend is deployed on Render, you need to update your frontend API calls.

**Add this file: `frontend/src/config/api.js`**

```javascript
// Determine API URL based on environment
const API_URL = process.env.REACT_APP_API_URL || 
  (typeof window !== 'undefined' && window.location.hostname === 'localhost' 
    ? 'http://localhost:5001'
    : 'https://talkfusion-backend.onrender.com'); // Replace with your Render URL

export default API_URL;
```

**Update your API calls in hooks:**

For example, in `frontend/src/hooks/useLogin.js`:

```javascript
import API_URL from '../config/api';

const res = await fetch(`${API_URL}/api/auth/login`, {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  credentials: "include",
  body: JSON.stringify({ email, password })
});
```

Repeat this for all files in `frontend/src/hooks/`:
- `useGetConversations.js`
- `useGetMessages.js`
- `useLogin.js`
- `useLogout.js`
- `useSendMessage.js`
- `UseSignup.js`

---

### STEP 3: Update Socket.io Connection

Update `frontend/src/context/SocketContext.jsx`:

```javascript
import API_URL from '../config/api';

const BACKEND_URL = API_URL; // Use the same URL

useEffect(() => {
  const socket = io(BACKEND_URL, {
    query: {
      userId: authUser._id,
    },
  });
  
  // ... rest of your code
}, []);
```

---

### STEP 4: Deploy Updated Frontend to Vercel

**1. Commit and push your changes:**
```bash
git add -A
git commit -m "feat: Update API URLs to use Render backend"
git push origin main
```

**2. Vercel will auto-deploy** (if you have GitHub integration)

Or manually redeploy:
- Go to: https://vercel.com/tusharsingh06ts-7726s-projects/talkfusion
- Click "Redeploy"

---

## 🔗 Final URLs

Once everything is deployed:

**Frontend:** https://talkfusion.vercel.app

**Backend:** https://talkfusion-backend.onrender.com (or your Render URL)

---

## ✅ Testing the Deployment

1. Go to: https://talkfusion.vercel.app
2. Click "Sign Up"
3. Create a new account
4. Try sending a message
5. Check console for any errors

If everything works, your app is deployed! 🎉

---

## 🔧 Troubleshooting

### Error: "Failed to execute 'json' on 'Response'"
- ❌ Backend URL is incorrect
- ✅ Solution: Update API_URL in frontend/src/config/api.js

### Error: "Cannot connect to MongoDB"
- ❌ Render doesn't have internet access
- ✅ Solution: Check MONGO_DB_URI is added to Render environment variables

### Error: "Connection refused"
- ❌ Backend not running
- ✅ Solution: Check Render deployment status

---

## 📚 Additional Resources

- **Render Docs:** https://render.com/docs
- **Vercel Docs:** https://vercel.com/docs
- **MongoDB Atlas:** https://www.mongodb.com/cloud/atlas

---

## 🎯 Next Steps

1. Deploy backend to Render ✅
2. Update frontend API URLs ⏳
3. Push to GitHub ⏳
4. Verify Vercel deploys new version ⏳
5. Test the live application ⏳

---

Good luck! Your TalkFusion app is ready for the world! 🚀
