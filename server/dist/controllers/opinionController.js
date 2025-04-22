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
exports.getWordCloudData = exports.getCandidateSupport = exports.getCandidateOpinions = exports.getOpinions = exports.submitOpinion = void 0;
const Opinion_1 = __importDefault(require("../models/Opinion"));
const Candidate_1 = __importDefault(require("../models/Candidate"));
const database_1 = require("../config/database");
// Submit a new opinion
const submitOpinion = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const opinion = new Opinion_1.default(req.body);
        const savedOpinion = yield opinion.save();
        res.status(201).json(savedOpinion);
    }
    catch (error) {
        res.status(500).json({ message: "Error submitting opinion", error });
    }
});
exports.submitOpinion = submitOpinion;
// Get all opinions
const getOpinions = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Using different approach for mock vs real database
        let opinions;
        if (database_1.usingMockDb) {
            // For mock DB, we just get the opinions directly
            opinions = yield Opinion_1.default.find();
            console.log("Mock opinions:", opinions);
        }
        else {
            // For real DB, we can use populate
            opinions = yield Opinion_1.default.find().populate("candidateId");
        }
        res.status(200).json(opinions);
    }
    catch (error) {
        console.error("Error fetching opinions:", error);
        res.status(500).json({ message: "Error fetching opinions", error });
    }
});
exports.getOpinions = getOpinions;
// Get opinions for a specific candidate
const getCandidateOpinions = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const opinions = yield Opinion_1.default.find({
            candidateId: req.params.candidateId,
        });
        res.status(200).json(opinions);
    }
    catch (error) {
        res
            .status(500)
            .json({ message: "Error fetching candidate opinions", error });
    }
});
exports.getCandidateOpinions = getCandidateOpinions;
// Get aggregated support levels for all candidates
const getCandidateSupport = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const candidates = yield Candidate_1.default.find();
        const supportData = yield Promise.all(candidates.map((candidate) => __awaiter(void 0, void 0, void 0, function* () {
            const supportCount = yield Opinion_1.default.countDocuments({
                candidateId: candidate._id,
                support: "สนับสนุน",
            });
            const neutralCount = yield Opinion_1.default.countDocuments({
                candidateId: candidate._id,
                support: "ยังไม่แน่ใจ",
            });
            const againstCount = yield Opinion_1.default.countDocuments({
                candidateId: candidate._id,
                support: "ไม่สนับสนุน",
            });
            return {
                candidateId: candidate._id,
                candidateName: candidate.name,
                supportCount,
                neutralCount,
                againstCount,
            };
        })));
        res.status(200).json(supportData);
    }
    catch (error) {
        res.status(500).json({ message: "Error fetching support data", error });
    }
});
exports.getCandidateSupport = getCandidateSupport;
// Get word cloud data from comments
const getWordCloudData = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const opinions = yield Opinion_1.default.find({ comment: { $ne: "" } });
        // Aggregate words from comments
        let wordCounts = {};
        // Thai stopwords to filter out
        const stopwords = [
            "การ",
            "ของ",
            "และ",
            "ใน",
            "ที่",
            "มี",
            "ไม่",
            "ให้",
            "ได้",
            "จะ",
            "กับ",
            "เป็น",
            "อยู่",
            "คน",
            "มา",
            "นี้",
            "ไป",
            "แล้ว",
            "มาก",
            "ด้วย",
        ];
        opinions.forEach((opinion) => {
            if (opinion.comment) {
                // Simple word extraction (can be improved with Thai NLP libraries)
                const words = opinion.comment
                    .replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, "")
                    .split(/\s+/)
                    .filter((word) => word.length > 1 && !stopwords.includes(word));
                words.forEach((word) => {
                    wordCounts[word] = (wordCounts[word] || 0) + 1;
                });
            }
        });
        // Convert to array format for word cloud
        const wordCloudData = Object.entries(wordCounts)
            .map(([text, value]) => ({ text, value }))
            .filter((item) => item.value > 1) // Only include words that appear more than once
            .sort((a, b) => b.value - a.value)
            .slice(0, 100); // Limit to top 100 words
        res.status(200).json(wordCloudData);
    }
    catch (error) {
        res
            .status(500)
            .json({ message: "Error generating word cloud data", error });
    }
});
exports.getWordCloudData = getWordCloudData;
