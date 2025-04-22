import express from "express";
import Question from "../models/Question";

// Get all questions with optional filtering
export const getQuestions = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { status, limit = 10 } = req.query;

    const query: any = {};
    if (status) {
      query.status = status;
    }

    const questions = await Question.find(query)
      .sort({ createdAt: -1 })
      .limit(Number(limit));

    res.json(questions);
  } catch (error) {
    console.error("Error fetching questions:", error);
    res.status(500).json({ message: "Server error", error });
  }
};

// Create a new question
export const createQuestion = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { name, question, candidateId, category, province } = req.body;

    if (!question || !category) {
      return res
        .status(400)
        .json({ message: "Question and category are required" });
    }

    const newQuestion = new Question({
      name,
      question,
      candidateId,
      category,
      province,
    });

    const savedQuestion = await newQuestion.save();
    res.status(201).json(savedQuestion);
  } catch (error) {
    console.error("Error creating question:", error);
    res.status(500).json({ message: "Server error", error });
  }
};

// Get a specific question by ID
export const getQuestionById = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const question = await Question.findById(req.params.id);

    if (!question) {
      return res.status(404).json({ message: "Question not found" });
    }

    res.json(question);
  } catch (error) {
    console.error("Error fetching question:", error);
    res.status(500).json({ message: "Server error", error });
  }
};

// Update a question's status
export const updateQuestionStatus = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { status } = req.body;

    if (!status || !["pending", "approved", "rejected"].includes(status)) {
      return res.status(400).json({ message: "Valid status is required" });
    }

    const question = await Question.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    if (!question) {
      return res.status(404).json({ message: "Question not found" });
    }

    res.json(question);
  } catch (error) {
    console.error("Error updating question:", error);
    res.status(500).json({ message: "Server error", error });
  }
};

// Get the total count of questions
export const getQuestionsCount = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const count = await Question.countDocuments();
    res.json({ count });
  } catch (error) {
    console.error("Error counting questions:", error);
    res.status(500).json({ message: "Server error", error });
  }
};
