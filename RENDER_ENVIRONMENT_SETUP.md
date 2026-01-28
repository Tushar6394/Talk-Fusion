# Render Environment Variables Setup Instructions

## Current Status
Your Render backend is having issues because the environment variables may not be properly set in the Render dashboard.

## What You Need to Do

### Step 1: Log into Render Dashboard
1. Visit: https://dashboard.render.com
2. Sign in with your Render account

### Step 2: Select Your Backend Service
1. Find and click on your **TalkFusion backend** service
2. You should see your service name and URL: `https://talkfusion-backend.onrender.com`

### Step 3: Go to Environment Variables
1. In the service page, look for the **"Environment"** tab or **"Settings"** section
2. Click on **"Environment Variables"** or scroll to find environment variables section

### Step 4: Add/Update These Environment Variables

Make sure these 4 variables are set EXACTLY as shown:

| Key | Value |
|-----|-------|
| `MONGO_DB_URI` | `mongodb+srv://Tushar6394:Hanuman%40108@talkfusion.eanz60l.mongodb.net/?appName=TalkFusion` |
| `JWT_SECRET` | `d783da352cb9c3a90106e87230c05e5d34099eca9a772db315a69af260570137` |
| `PORT` | `5001` |
| `NODE_ENV` | `production` |

### Step 5: Save and Redeploy
1. After adding/updating each variable, click **"Save"**
2. The service will automatically redeploy (you'll see a status indicator)
3. **Wait 2-5 minutes** for the deployment to complete

### Step 6: Verify
Once deployment is complete:
1. Open browser to: https://talkfusion.vercel.app
2. Click "Sign Up"
3. Try creating an account with:
   - Full Name: `Sahil`
   - Username: `sahil`
   - Password: `Sahil12`
   - Confirm: `Sahil12`
   - Gender: Select one
4. Click Sign Up

## Expected Result
✅ Account created successfully
✅ You're logged in
✅ You can see the chat interface

## If Still Getting Errors

**Check Render Logs:**
1. Go to your service on Render
2. Click on **"Logs"** tab
3. Look for any errors related to MongoDB or JWT

**Common Issues:**
- ❌ Variable names are case-sensitive (use exact names above)
- ❌ Make sure you don't have extra spaces before/after values
- ❌ MongoDB IP whitelist still not updated (must include 0.0.0.0/0)

## Need More Help?
Provide the exact error message from:
1. Render Logs (Logs tab)
2. Browser console (F12 → Console tab)
3. Network tab error response
