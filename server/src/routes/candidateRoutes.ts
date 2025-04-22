import express, { Router } from "express";
import {
  getCandidates,
  getCandidateById,
  createCandidate,
  updateCandidate,
  deleteCandidate,
} from "../controllers/candidateController";

const router: Router = express.Router();

// Get all candidates
router.get("/", getCandidates);

// Get a single candidate by ID
router.get("/:id", getCandidateById);

// Create a new candidate
router.post("/", createCandidate);

// Update a candidate
router.put("/:id", updateCandidate);

// Delete a candidate
router.delete("/:id", deleteCandidate);

export default router;
