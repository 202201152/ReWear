import express from "express"
import { connectDB } from "./lib/db.js";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/auth.routes.js"
import corsMiddleware from './middlewares/cors.middleware.js'
import adminRoutes from './routes/admin.routes.js';
import dotenv from "dotenv"

dotenv.config();


const app = express();
app.use(corsMiddleware);
app.use('/api/admin', adminRoutes);
app.use(express.json());
app.use(cookieParser());

app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);


app.listen(process.env.PORT , () => {
    console.log("server is running.");
    connectDB();
});