<<<<<<< HEAD:backend/src/index.js
import express from "express"
import { connectDB } from "./lib/db.js";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/auth.routes.js"
import corsMiddleware from './middlewares/cors.middleware.js'
import adminRoutes from './routes/admin.routes.js';
import dotenv from "dotenv"

dotenv.config();
=======
// server.js or index.js
>>>>>>> f5f952a61d420d702d5615234e3684f7ba64fe2f:backend/index.js

import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import { connectDB } from "./src/lib/db.js";
import corsMiddleware from "./src/middlewares/cors.middleware.js";

import authRoutes from "./src/routes/auth.routes.js";
import adminRoutes from "./src/routes/admin.routes.js"; // ✅ Fixed path

dotenv.config(); // ✅ Load .env variables

const app = express();

<<<<<<< HEAD:backend/src/index.js
app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);
=======
app.use(corsMiddleware); // Handles CORS
app.use(express.json()); // Parses incoming JSON
app.use(cookieParser()); // Parses cookies
>>>>>>> f5f952a61d420d702d5615234e3684f7ba64fe2f:backend/index.js

app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);

app.use("*", (req, res) => {
  res.status(404).json({ message: "API route not found." });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
  connectDB(); // Connect to MongoDB
});
