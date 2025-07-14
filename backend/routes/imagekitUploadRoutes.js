import express from "express";
import { uploadVideo } from "../controllers/imagekitUploadController.js";

const router = express.Router();

router.post("/upload", ...uploadVideo);

export default router;
