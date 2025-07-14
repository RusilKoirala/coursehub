// Libraries
import express, { json } from "express"
import dotenv from "dotenv"
import cors from "cors"
import helmet from "helmet"
import cookieParser from "cookie-parser"

// Imported functions or variables
import ConnectDB from "./config/db.js"
import authRoutes from "./routes/authRoutes.js"
import courseRoutes from "./routes/courseRoutes.js"
dotenv.config();
import imagekitRoutes from "./routes/imagekitRoutes.js";
import imagekitUploadRoutes from "./routes/imagekitUploadRoutes.js";

dotenv.config();

const app = express();

app.use(express.json({ verify: (req, res, buf) => { req.rawBody = buf } }));
app.use(cookieParser());
app.use(cors({
  origin: process.env.FRONTEND_URL || "http://localhost:5173",
  credentials: true,
}));
app.use(helmet());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/courses", courseRoutes);
app.use("/api/imagekit-auth", imagekitRoutes);
app.use("/api/imagekit-upload", imagekitUploadRoutes);
// Removed payment/Stripe routes and imports

app.get("/", (req,res) => {
    res.send("Hello")
});

app.listen(process.env.PORT || 5001 , ()=>{
    ConnectDB();
    console.log(`Server is running at http://localhost:${process.env.PORT}`)
});