import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, "..");

dotenv.config({ path: path.resolve(__dirname, ".env") });

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
app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/users", userRoute);
app.use(express.static(path.join(rootDir, "/frontend/dist")));

app.get("*", (req, res) => {
  res.sendFile(path.join(rootDir, "frontend", "dist", "index.html"));
});

server.listen(PORT, () => {
  establishMongoConnection();
  console.log(`Listening on port ${PORT}`);
});
