// API Configuration
// This file determines which backend server to connect to

const API_URL = 
  typeof window !== 'undefined' && window.location.hostname === 'localhost' 
    ? 'http://localhost:5001'
    : 'https://talkfusion-backend.onrender.com'; // Update with your actual Render URL

export default API_URL;
