import mongoose from "mongoose";
import dotenv from "dotenv";
import { mockCandidates } from "./candidates";

// Import models
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

// Load environment variables
dotenv.config();

// MongoDB connection URI
const MONGO_URI =
  process.env.MONGO_URI ||
  "mongodb+srv://visarutforthaipbs:gXhqa9YbbBK32gKI@thaipbs-director.qmymklz.mongodb.net/?retryWrites=true&w=majority&appName=thaipbs-director";

// Prepare candidates data without _id fields
const candidatesData = mockCandidates.map(({ _id, ...rest }) => rest);

// Seed function
const seedDatabase = async () => {
  try {
    // Connect to MongoDB
    console.log("Connecting to MongoDB...");
    await mongoose.connect(MONGO_URI);
    console.log("Connected to MongoDB");

    // Clear existing data
    const Candidate = mongoose.model("Candidate", CandidateSchema);
    await Candidate.deleteMany({});
    console.log("Cleared existing candidates");

    // Insert seed data
    const candidates = await Candidate.insertMany(candidatesData);
    console.log(`Inserted ${candidates.length} candidates`);

    console.log("Seed data successfully added!");

    // Disconnect from MongoDB
    await mongoose.disconnect();
    console.log("Disconnected from MongoDB");

    process.exit(0);
  } catch (error) {
    console.error("Error seeding database:", error);
    process.exit(1);
  }
};

// Run the seed function
seedDatabase();
