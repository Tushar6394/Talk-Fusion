import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, "..");

// Load .env file if it exists (local development)
const envPath = path.resolve(__dirname, ".env");
if (fs.existsSync(envPath)) {
  dotenv.config({ path: envPath });
}

// Log environment setup for debugging
console.log("📦 Environment Setup:");
console.log(`   NODE_ENV: ${process.env.NODE_ENV || "development"}`);
console.log(`   PORT: ${process.env.PORT || 5001}`);
console.log(`   JWT_SECRET: ${process.env.JWT_SECRET ? "✅ Set" : "❌ NOT SET"}`);
console.log(`   MONGO_DB_URI: ${process.env.MONGO_DB_URI ? "✅ Set" : "❌ NOT SET"}`);

import express from "express";
import authRoutes from "./routes/auth.routes.js";
import establishMongoConnection from "./db/establishMongoConnection.js";
import messageRoutes from "./routes/message.routes.js";
import cookieParser from "cookie-parser";
import userRoute from "./routes/user.routes.js";
import { app, server } from "./socket/socket.js";

const PORT = process.env.PORT || 5001; // Changed port to 5001

app.use(cookieParser());
app.use(express.json());

// Health check endpoint (before static files)
app.get("/health", (req, res) => {
  res.status(200).json({
    status: "✅ Backend is running",
    timestamp: new Date().toISOString(),
    environment: {
      NODE_ENV: process.env.NODE_ENV || "development",
      PORT: process.env.PORT || 5001,
      JWT_SECRET: process.env.JWT_SECRET ? "✅ Set" : "❌ NOT SET",
      MONGO_DB_URI: process.env.MONGO_DB_URI ? "✅ Set" : "❌ NOT SET",
    },
  });
});

// API routes
app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/users", userRoute);

// Serve static files from frontend build
app.use(express.static(path.join(rootDir, "/frontend/dist")));

// Catch-all route for React SPA
app.get("*", (req, res) => {
  res.sendFile(path.join(rootDir, "frontend", "dist", "index.html"));
});

server.listen(PORT, () => {
  establishMongoConnection();
  console.log(`Listening on port ${PORT}`);
});
