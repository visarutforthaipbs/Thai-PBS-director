import { Request, Response } from "express";
import Opinion from "../models/Opinion";
import Candidate from "../models/Candidate";
import mongoose from "mongoose";
import { usingMockDb } from "../config/database";

// Submit a new opinion
export const submitOpinion = async (req: Request, res: Response) => {
  try {
    const opinion = new Opinion(req.body);
    const savedOpinion = await opinion.save();
    res.status(201).json(savedOpinion);
  } catch (error) {
    res.status(500).json({ message: "Error submitting opinion", error });
  }
};

// Get all opinions
export const getOpinions = async (req: Request, res: Response) => {
  try {
    // Using different approach for mock vs real database
    let opinions;
    if (usingMockDb) {
      // For mock DB, we just get the opinions directly
      opinions = await Opinion.find();
      console.log("Mock opinions:", opinions);
    } else {
      // For real DB, we can use populate
      opinions = await (Opinion as any).find().populate("candidateId");
    }

    res.status(200).json(opinions);
  } catch (error) {
    console.error("Error fetching opinions:", error);
    res.status(500).json({ message: "Error fetching opinions", error });
  }
};

// Get opinions for a specific candidate
export const getCandidateOpinions = async (req: Request, res: Response) => {
  try {
    const opinions = await Opinion.find({
      candidateId: req.params.candidateId,
    });
    res.status(200).json(opinions);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching candidate opinions", error });
  }
};

// Get aggregated support levels for all candidates
export const getCandidateSupport = async (req: Request, res: Response) => {
  try {
    const candidates = await Candidate.find();

    const supportData = await Promise.all(
      candidates.map(async (candidate: any) => {
        const supportCount = await Opinion.countDocuments({
          candidateId: candidate._id,
          support: "สนับสนุน",
        });

        const neutralCount = await Opinion.countDocuments({
          candidateId: candidate._id,
          support: "ยังไม่แน่ใจ",
        });

        const againstCount = await Opinion.countDocuments({
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
      })
    );

    res.status(200).json(supportData);
  } catch (error) {
    res.status(500).json({ message: "Error fetching support data", error });
  }
};

// Get word cloud data from comments
export const getWordCloudData = async (req: Request, res: Response) => {
  try {
    const opinions = await Opinion.find({ comment: { $ne: "" } });

    // Aggregate words from comments
    let wordCounts: Record<string, number> = {};

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

    opinions.forEach((opinion: any) => {
      if (opinion.comment) {
        // Simple word extraction (can be improved with Thai NLP libraries)
        const words = opinion.comment
          .replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, "")
          .split(/\s+/)
          .filter(
            (word: string) => word.length > 1 && !stopwords.includes(word)
          );

        words.forEach((word: string) => {
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
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error generating word cloud data", error });
  }
};
