import express from "express";
import { login, logout, register } from "../controllers/usercontroller.js";
import { singleUpload } from "../middlewares/multer.js";// Import the new controller for college prediction

const router = express.Router();

// Existing Routes
router.route("/register").post(singleUpload, register);
router.route("/login").post(login);
router.route("/logout").get(logout);

export default router;
