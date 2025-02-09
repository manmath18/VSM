import express from "express";
import cookieParser from "cookie-parser";
import connectDB from "./utils/ConnectDB.js";
import cors from "cors";
import userRoute from "./routes/user.routes.js";
import morgan from "morgan";
import dotenv from "dotenv"
import jobRoute from "./routes/job.routes.js"

dotenv.config();
const app = express();

// Middleware setup
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(morgan("dev")); // Log requests

// CORS options
const corsOptions = {
    origin: "http://localhost:5174",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
};
app.use(cors(corsOptions)); // Configure CORS

// Default route
app.get("/", (req, res) => {
    res.send("API is running...");
});

// Routes
app.use("/api", userRoute);
app.use("/jobs",jobRoute);

// Set port
const PORT = process.env.PORT || 3000;

// Connect to database and start server
const startServer = async () => {
    try {
        await connectDB();
        app.listen(PORT, () => {
            console.log(`Server running at http://localhost:${PORT}`);
        });
    } catch (error) {
        console.error("Failed to connect to the database:", error);
        process.exit(1);
    }
};

startServer();
