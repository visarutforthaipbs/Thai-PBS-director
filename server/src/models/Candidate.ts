import mongoose from "mongoose";
import { usingMockDb } from "../config/database";

export interface CandidateDocument extends mongoose.Document {
  _id: string;
  name: string;
  education: string[];
  experience: string[];
  achievements: string[];
  image: string;
}

const CandidateSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    education: {
      type: [String],
      required: true,
    },
    experience: {
      type: [String],
      required: true,
    },
    achievements: {
      type: [String],
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// Create the real Mongoose model
const CandidateModel = mongoose.model<CandidateDocument>(
  "Candidate",
  CandidateSchema
);

// Mock implementation - simplified since we're now using real data
const MockCandidate = {
  // Basic operations with empty implementations that will be replaced by real MongoDB
  find: async () => [],
  findById: async (id: string) => null,
  findByIdAndUpdate: async (id: string, data: any) => null,
  findByIdAndDelete: async (id: string) => null,

  // Constructor-like functionality
  new: function (data: any) {
    return {
      ...data,
      save: async function () {
        return {
          _id: Date.now().toString(),
          ...data,
        };
      },
    };
  },
};

// Export the appropriate implementation based on whether we're using the mock DB
export default usingMockDb ? MockCandidate : CandidateModel;
