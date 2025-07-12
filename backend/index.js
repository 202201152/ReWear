import express from "express"
import { connectDB } from "./src/lib/db.js";
import cookieParser from "cookie-parser";
import authRoutes from "./src/routes/auth.routes.js"
import corsMiddleware from './src/middlewares/cors.middleware.js'
import adminRoutes from './routes/admin.routes.js';


const app = express();
app.use(corsMiddleware);
app.use('/api/admin', adminRoutes);
app.use(express.json());
app.use(cookieParser());

app.use('/api/auth', authRoutes);


app.listen(process.env.PORT , () => {
    console.log("server is running.");
    connectDB();
});