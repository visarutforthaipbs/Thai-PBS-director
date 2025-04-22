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
exports.deleteCandidate = exports.updateCandidate = exports.createCandidate = exports.getCandidateById = exports.getCandidates = void 0;
const Candidate_1 = __importDefault(require("../models/Candidate"));
// Get all candidates
const getCandidates = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log("Getting all candidates");
        const candidates = yield Candidate_1.default.find();
        console.log(`Found ${candidates.length} candidates`);
        res.status(200).json(candidates);
    }
    catch (error) {
        console.error("Error in getCandidates:", error);
        res.status(500).json({ message: "Error fetching candidates", error });
    }
});
exports.getCandidates = getCandidates;
// Get a single candidate by ID
const getCandidateById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const candidate = yield Candidate_1.default.findById(req.params.id);
        if (!candidate) {
            return res.status(404).json({ message: "Candidate not found" });
        }
        res.status(200).json(candidate);
    }
    catch (error) {
        res.status(500).json({ message: "Error fetching candidate", error });
    }
});
exports.getCandidateById = getCandidateById;
// Create a new candidate
const createCandidate = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const candidate = new Candidate_1.default(req.body);
        const savedCandidate = yield candidate.save();
        res.status(201).json(savedCandidate);
    }
    catch (error) {
        console.error("Error creating candidate:", error);
        res.status(500).json({ message: "Error creating candidate", error });
    }
});
exports.createCandidate = createCandidate;
// Update a candidate
const updateCandidate = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const updatedCandidate = yield Candidate_1.default.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!updatedCandidate) {
            return res.status(404).json({ message: "Candidate not found" });
        }
        res.status(200).json(updatedCandidate);
    }
    catch (error) {
        res.status(500).json({ message: "Error updating candidate", error });
    }
});
exports.updateCandidate = updateCandidate;
// Delete a candidate
const deleteCandidate = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const deletedCandidate = yield Candidate_1.default.findByIdAndDelete(req.params.id);
        if (!deletedCandidate) {
            return res.status(404).json({ message: "Candidate not found" });
        }
        res.status(200).json({ message: "Candidate deleted successfully" });
    }
    catch (error) {
        res.status(500).json({ message: "Error deleting candidate", error });
    }
});
exports.deleteCandidate = deleteCandidate;
