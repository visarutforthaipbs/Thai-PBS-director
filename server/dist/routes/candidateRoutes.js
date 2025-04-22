"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const candidateController_1 = require("../controllers/candidateController");
const router = express_1.default.Router();
// Get all candidates
router.get("/", candidateController_1.getCandidates);
// Get a single candidate by ID
router.get("/:id", candidateController_1.getCandidateById);
// Create a new candidate
router.post("/", candidateController_1.createCandidate);
// Update a candidate
router.put("/:id", candidateController_1.updateCandidate);
// Delete a candidate
router.delete("/:id", candidateController_1.deleteCandidate);
exports.default = router;
