import express from "express";
import Candidate from "../models/Candidate";
import { usingMockDb } from "../config/database";
import { candidateData } from "../data/candidates"; // Import the real candidate data

// Get all candidates
export const getCandidates = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    console.log("Getting all candidates");
    const candidates = await Candidate.find();
    console.log(`Found ${candidates.length} candidates`);
    res.status(200).json(candidates);
  } catch (error) {
    console.error("Error in getCandidates:", error);
    res.status(500).json({ message: "Error fetching candidates", error });
  }
};

// Get a single candidate by ID
export const getCandidateById = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const candidate = await Candidate.findById(req.params.id);

    if (!candidate) {
      return res.status(404).json({ message: "Candidate not found" });
    }

    res.status(200).json(candidate);
  } catch (error) {
    res.status(500).json({ message: "Error fetching candidate", error });
  }
};

// Create a new candidate
export const createCandidate = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const candidate = new (Candidate as any)(req.body);
    const savedCandidate = await candidate.save();
    res.status(201).json(savedCandidate);
  } catch (error) {
    console.error("Error creating candidate:", error);
    res.status(500).json({ message: "Error creating candidate", error });
  }
};

// Update a candidate
export const updateCandidate = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const updatedCandidate = await Candidate.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!updatedCandidate) {
      return res.status(404).json({ message: "Candidate not found" });
    }

    res.status(200).json(updatedCandidate);
  } catch (error) {
    res.status(500).json({ message: "Error updating candidate", error });
  }
};

// Delete a candidate
export const deleteCandidate = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const deletedCandidate = await Candidate.findByIdAndDelete(req.params.id);

    if (!deletedCandidate) {
      return res.status(404).json({ message: "Candidate not found" });
    }

    res.status(200).json({ message: "Candidate deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting candidate", error });
  }
};
