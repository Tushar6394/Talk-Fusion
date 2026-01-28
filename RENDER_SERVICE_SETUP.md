# Your Render Service Environment Setup

**Your Service ID:** `srv-d5stlivfte5s73cknfbg`

## Direct Link to Your Service
Go directly to your service settings:
https://dashboard.render.com/srv-d5stlivfte5s73cknfbg

## Steps to Add Environment Variables

### 1. Click on "Environment" in the Left Menu
Once you're on your service page, look for the **Environment** section in the left sidebar or top tabs.

### 2. Add These 4 Variables

Copy and paste each exactly as shown:

**Variable 1: MONGO_DB_URI**
```
mongodb+srv://Tushar6394:Hanuman%40108@talkfusion.eanz60l.mongodb.net/?appName=TalkFusion
```

**Variable 2: JWT_SECRET**
```
d783da352cb9c3a90106e87230c05e5d34099eca9a772db315a69af260570137
```

**Variable 3: PORT**
```
5001
```

**Variable 4: NODE_ENV**
```
production
```

### 3. Save Each Variable
- After typing each value, click **Save** or **Add Variable**
- You should see a green checkmark or notification

### 4. Wait for Redeploy
- Render will automatically restart your service
- Look for the **Deployed** status in green
- This usually takes 2-5 minutes

### 5. Test in Browser
Once deployment is complete:
1. Go to: https://talkfusion.vercel.app
2. Click **Sign Up**
3. Fill in:
   - Full Name: `Test User`
   - Username: `testuser123`
   - Password: `Test123`
   - Confirm Password: `Test123`
   - Gender: Male
4. Click **Sign Up**

## What Should Happen
✅ Account created
✅ Logged in automatically  
✅ See chat interface with user list

## Troubleshooting

**If Still Getting Error:**

1. **Verify Variables Are Saved**
   - Go to Environment section again
   - Make sure all 4 variables show in the list

2. **Check Deployment Status**
   - Look at the top of your service page
   - Should say "Deployed" in green
   - NOT "Building" or "Failed"

3. **Check Render Logs**
   - Click on **"Logs"** tab on your service page
   - Look for "Listening on port" message
   - Should show all environment variables loaded

4. **Look for Error Messages**
   - In logs, search for "Error" or "JWT" or "MongoDB"
   - Copy the error and send it

## Quick Verification Command

Once deployed, run this in terminal to test:
```bash
curl -s https://talkfusion-backend.onrender.com/api/auth/signup \
  -X POST \
  -H "Content-Type: application/json" \
  -d '{"fullName":"Test","username":"testuser999","password":"Test123","confirmPassword":"Test123","gender":"male"}' \
  | jq .
```

If successful, you should see a JSON response with `_id`, `fullName`, `username`, and `profilePic`.

## Need Help?
Share:
1. Screenshot of your Environment Variables section
2. Last 50 lines from Render Logs tab
3. The exact error you see
