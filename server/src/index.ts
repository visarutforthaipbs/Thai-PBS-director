import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDatabase from "./config/database";
import candidateRoutes from "./routes/candidateRoutes";
import opinionRoutes from "./routes/opinionRoutes";
import questionRoutes from "./routes/questionRoutes";

// Load environment variables
dotenv.config();

// Create Express app
const app = express();
const PORT = process.env.PORT || 8888;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connect to MongoDB
connectDatabase();

// API Routes
app.use("/api/candidates", candidateRoutes);
app.use("/api/opinions", opinionRoutes);
app.use("/api/questions", questionRoutes);

// Root route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to Thai PBS Director Selection API" });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
