import mongoose from "mongoose";
import dotenv from "dotenv";
import { candidateData } from "./candidates";
import Candidate from "../models/Candidate";
import connectDatabase from "../config/database";

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDatabase();

// Seed the database with candidates
const seedDatabase = async () => {
  try {
    // Clear existing candidates
    await (Candidate as any).deleteMany({});
    console.log("Existing candidates deleted");

    // Insert new candidates
    const insertedCandidates = await (Candidate as any).insertMany(
      candidateData
    );
    console.log(
      `${insertedCandidates.length} candidates inserted successfully`
    );

    // Close the connection
    mongoose.connection.close();
    console.log("Database connection closed");
  } catch (error) {
    console.error("Error seeding database:", error);
    process.exit(1);
  }
};

// Execute the seed function
seedDatabase();
