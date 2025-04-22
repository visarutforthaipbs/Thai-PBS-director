"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getQuestionsCount = exports.updateQuestionStatus = exports.getQuestionById = exports.createQuestion = exports.getQuestions = void 0;
const Question_1 = __importDefault(require("../models/Question"));
// Get all questions with optional filtering
const getQuestions = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { status, limit = 10 } = req.query;
        const query = {};
        if (status) {
            query.status = status;
        }
        const questions = yield Question_1.default.find(query)
            .sort({ createdAt: -1 })
            .limit(Number(limit));
        res.json(questions);
    }
    catch (error) {
        console.error("Error fetching questions:", error);
        res.status(500).json({ message: "Server error", error });
    }
});
exports.getQuestions = getQuestions;
// Create a new question
const createQuestion = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, question, candidateId, category, province } = req.body;
        if (!question || !category) {
            return res
                .status(400)
                .json({ message: "Question and category are required" });
        }
        const newQuestion = new Question_1.default({
            name,
            question,
            candidateId,
            category,
            province,
        });
        const savedQuestion = yield newQuestion.save();
        res.status(201).json(savedQuestion);
    }
    catch (error) {
        console.error("Error creating question:", error);
        res.status(500).json({ message: "Server error", error });
    }
});
exports.createQuestion = createQuestion;
// Get a specific question by ID
const getQuestionById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const question = yield Question_1.default.findById(req.params.id);
        if (!question) {
            return res.status(404).json({ message: "Question not found" });
        }
        res.json(question);
    }
    catch (error) {
        console.error("Error fetching question:", error);
        res.status(500).json({ message: "Server error", error });
    }
});
exports.getQuestionById = getQuestionById;
// Update a question's status
const updateQuestionStatus = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { status } = req.body;
        if (!status || !["pending", "approved", "rejected"].includes(status)) {
            return res.status(400).json({ message: "Valid status is required" });
        }
        const question = yield Question_1.default.findByIdAndUpdate(req.params.id, { status }, { new: true });
        if (!question) {
            return res.status(404).json({ message: "Question not found" });
        }
        res.json(question);
    }
    catch (error) {
        console.error("Error updating question:", error);
        res.status(500).json({ message: "Server error", error });
    }
});
exports.updateQuestionStatus = updateQuestionStatus;
// Get the total count of questions
const getQuestionsCount = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const count = yield Question_1.default.countDocuments();
        res.json({ count });
    }
    catch (error) {
        console.error("Error counting questions:", error);
        res.status(500).json({ message: "Server error", error });
    }
});
exports.getQuestionsCount = getQuestionsCount;
