import express from "express"

import { RegisterUser, LoginUser , LogoutUser } from "../controllers/authController.js";


const router = express.Router();

router.post("/login", LoginUser);
router.post("/logout", LogoutUser);
router.post("/register",RegisterUser);


import protect from "../middlewares/authMiddleware.js";

router.get("/me", protect, (req, res) => {
  res.status(200).json({ message: "Welcome back!", user: req.user });
});


export default router;