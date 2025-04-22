import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const MONGO_URI =
  process.env.MONGO_URI ||
  "mongodb+srv://visarutforthaipbs:gXhqa9YbbBK32gKI@thaipbs-director.qmymklz.mongodb.net/?retryWrites=true&w=majority&appName=thaipbs-director";

// Mock data for opinions when MongoDB is not available
export const mockOpinions = [
  {
    _id: "1",
    candidateId: "1",
    support: "สนับสนุน",
    comment: "เป็นผู้มีวิสัยทัศน์ที่ดี",
    region: "กรุงเทพและปริมณฑล",
    createdAt: new Date(),
  },
  {
    _id: "2",
    candidateId: "1",
    support: "ยังไม่แน่ใจ",
    comment: "ต้องดูผลงานเพิ่มเติม",
    region: "ภาคเหนือ",
    createdAt: new Date(),
  },
  {
    _id: "3",
    candidateId: "2",
    support: "สนับสนุน",
    comment: "มีประสบการณ์ด้านสื่อโดยตรง",
    region: "ภาคกลาง",
    createdAt: new Date(),
  },
];

// Flag to indicate if we're using mock database
export let usingMockDb = false;

// Function to get opinions
export const mockGetOpinions = async (query: any = {}) => {
  if (query.candidateId) {
    return mockOpinions.filter((o) => o.candidateId === query.candidateId);
  }
  if (query.comment && query.comment.$ne === "") {
    return mockOpinions.filter((o) => o.comment !== "");
  }
  return [...mockOpinions];
};

// Function to count opinions
export const mockCountOpinions = async (query: any = {}) => {
  return mockOpinions.filter(
    (o) =>
      (!query.candidateId || o.candidateId === query.candidateId) &&
      (!query.support || o.support === query.support)
  ).length;
};

// Function to save a new opinion
export const mockSaveOpinion = async (data: any) => {
  const newOpinion = {
    _id: Date.now().toString(),
    candidateId: data.candidateId || "1",
    support: data.support || "ยังไม่แน่ใจ",
    comment: data.comment || "",
    region: data.region || "",
    createdAt: new Date(),
    ...data,
  };
  mockOpinions.push(newOpinion);
  return newOpinion;
};

const connectDatabase = async (): Promise<void> => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("MongoDB connected successfully");
    usingMockDb = false;
  } catch (error) {
    console.error("MongoDB connection error:", error);
    console.log("Using mock database for testing purposes");
    usingMockDb = true;
  }
};

export default connectDatabase;
