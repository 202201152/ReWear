import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import { connectDB } from "./lib/db.js";
import corsMiddleware from "./middlewares/cors.middleware.js";
import authRoutes from "./routes/auth.routes.js";
// import adminRoutes from "./routes/admin.routes.js"; // ✅ Fixed path

dotenv.config(); // ✅ Load .env variables

const app = express();

app.use(corsMiddleware); // Handles CORS
app.use(express.json()); // Parses incoming JSON
app.use(cookieParser()); // Parses cookies

app.use("/api/auth", authRoutes);
// app.use("/api/admin", adminRoutes);

// app.use("*", (req, res) => {
//   res.status(404).json({ message: "API route not found." });
// });

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
  connectDB(); // Connect to MongoDB
});
