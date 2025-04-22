"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const questionController_1 = require("../controllers/questionController");
const router = express_1.default.Router();
// GET /api/questions - Get all questions with filtering
router.get("/", questionController_1.getQuestions);
// GET /api/questions/count - Get the total count of questions
router.get("/count", questionController_1.getQuestionsCount);
// POST /api/questions - Create a new question
router.post("/", questionController_1.createQuestion);
// GET /api/questions/:id - Get a question by ID
router.get("/:id", questionController_1.getQuestionById);
// PATCH /api/questions/:id/status - Update question status
router.patch("/:id/status", questionController_1.updateQuestionStatus);
exports.default = router;
