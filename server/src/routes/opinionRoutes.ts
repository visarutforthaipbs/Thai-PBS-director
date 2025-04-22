import express from "express";
import {
  submitOpinion,
  getOpinions,
  getCandidateOpinions,
  getCandidateSupport,
  getWordCloudData,
} from "../controllers/opinionController";

const router = express.Router();

// Submit an opinion
router.post("/", submitOpinion);

// Get all opinions
router.get("/", getOpinions);

// Get opinions for a specific candidate
router.get("/candidate/:candidateId", getCandidateOpinions);

// Get aggregated support data
router.get("/support", getCandidateSupport);

// Get word cloud data
router.get("/wordcloud", getWordCloudData);

export default router;
