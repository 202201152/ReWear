import express from "express"
import { connectDB } from "./lib/db";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/auth.routes.js"
const app = express();

app.use(express.json());
app.use(cookieParser());

app.use('/api/auth', authRoutes);

app.listen(process.env.PORT , () => {
    console.log("server is running.");
    connectDB();

})