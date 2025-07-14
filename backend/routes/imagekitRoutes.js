import express from "express";
import { getAuthParams } from "../controllers/imagekitController.js";

const router = express.Router();

router.get("/auth", getAuthParams);

export default router;
