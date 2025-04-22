"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const database_1 = __importDefault(require("./config/database"));
const candidateRoutes_1 = __importDefault(require("./routes/candidateRoutes"));
const opinionRoutes_1 = __importDefault(require("./routes/opinionRoutes"));
const questionRoutes_1 = __importDefault(require("./routes/questionRoutes"));
// Load environment variables
dotenv_1.default.config();
// Create Express app
const app = (0, express_1.default)();
const PORT = process.env.PORT || 8888;
// Middleware
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
// Connect to MongoDB
(0, database_1.default)();
// API Routes
app.use("/api/candidates", candidateRoutes_1.default);
app.use("/api/opinions", opinionRoutes_1.default);
app.use("/api/questions", questionRoutes_1.default);
// Root route
app.get("/", (req, res) => {
    res.json({ message: "Welcome to Thai PBS Director Selection API" });
});
// Start server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
