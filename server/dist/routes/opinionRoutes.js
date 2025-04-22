"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const opinionController_1 = require("../controllers/opinionController");
const router = express_1.default.Router();
// Submit an opinion
router.post("/", opinionController_1.submitOpinion);
// Get all opinions
router.get("/", opinionController_1.getOpinions);
// Get opinions for a specific candidate
router.get("/candidate/:candidateId", opinionController_1.getCandidateOpinions);
// Get aggregated support data
router.get("/support", opinionController_1.getCandidateSupport);
// Get word cloud data
router.get("/wordcloud", opinionController_1.getWordCloudData);
exports.default = router;
