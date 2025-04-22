import express from "express";
import {
  getQuestions,
  createQuestion,
  getQuestionById,
  updateQuestionStatus,
  getQuestionsCount,
} from "../controllers/questionController";

const router = express.Router();

// GET /api/questions - Get all questions with filtering
router.get("/", getQuestions);

// GET /api/questions/count - Get the total count of questions
router.get("/count", getQuestionsCount);

// POST /api/questions - Create a new question
router.post("/", createQuestion);

// GET /api/questions/:id - Get a question by ID
router.get("/:id", getQuestionById);

// PATCH /api/questions/:id/status - Update question status
router.patch("/:id/status", updateQuestionStatus);

export default router;
