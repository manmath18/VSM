import express from "express";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import { getAllJobs, postJob } from "../controllers/jobcontroller.js";

const router = express.Router();

router.route("/post").post(isAuthenticated, postJob);
router.route("/get").get(isAuthenticated, getAllJobs);

export default router;