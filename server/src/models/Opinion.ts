import mongoose from "mongoose";
import {
  usingMockDb,
  mockGetOpinions,
  mockCountOpinions,
  mockSaveOpinion,
} from "../config/database";

export interface OpinionDocument extends mongoose.Document {
  _id: string;
  candidateId: string;
  support: "สนับสนุน" | "ยังไม่แน่ใจ" | "ไม่สนับสนุน";
  comment: string;
  region: string;
  createdAt: Date;
}

const OpinionSchema = new mongoose.Schema(
  {
    candidateId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Candidate",
      required: true,
    },
    support: {
      type: String,
      enum: ["สนับสนุน", "ยังไม่แน่ใจ", "ไม่สนับสนุน"],
      required: true,
    },
    comment: {
      type: String,
      default: "",
    },
    region: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

// Create the real Mongoose model
const OpinionModel = mongoose.model<OpinionDocument>("Opinion", OpinionSchema);

// Create a mock Opinion model
class MockOpinion {
  static find(query?: any) {
    return mockGetOpinions(query);
  }

  static countDocuments(query?: any) {
    return mockCountOpinions(query);
  }

  static populate() {
    return this; // Just for chaining
  }

  constructor(data: any) {
    Object.assign(this, data);
  }

  async save() {
    return mockSaveOpinion(this);
  }
}

// Export the appropriate implementation based on whether we're using the mock DB
export default usingMockDb ? MockOpinion : OpinionModel;
