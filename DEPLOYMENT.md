# Backend API Configuration
The backend is deployed on Render.com

## Environment Variables Setup

When deploying to Render, add these environment variables:

```
MONGO_DB_URI=mongodb+srv://Tushar6394:Hanuman%40108@talkfusion.eanz60l.mongodb.net/?appName=TalkFusion
JWT_SECRET=d783da352cb9c3a90106e87230c05e5d34099eca9a772db315a69af260570137
PORT=5001
NODE_ENV=production
```

## Deployment Instructions for Render

1. Go to https://render.com
2. Sign up with GitHub account
3. Create new Web Service
4. Select TalkFusion repository
5. Configure:
   - Build Command: `npm install && npm install --prefix frontend`
   - Start Command: `node backend/server.js`
   - Add Environment Variables (see above)
6. Click Deploy

Your backend will be live at: https://your-service-name.onrender.com
