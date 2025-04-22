"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
const candidates_1 = require("./candidates");
const Candidate_1 = __importDefault(require("../models/Candidate"));
const database_1 = __importDefault(require("../config/database"));
// Load environment variables
dotenv_1.default.config();
// Connect to MongoDB
(0, database_1.default)();
// Seed the database with candidates
const seedDatabase = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Clear existing candidates
        yield Candidate_1.default.deleteMany({});
        console.log("Existing candidates deleted");
        // Insert new candidates
        const insertedCandidates = yield Candidate_1.default.insertMany(candidates_1.candidateData);
        console.log(`${insertedCandidates.length} candidates inserted successfully`);
        // Close the connection
        mongoose_1.default.connection.close();
        console.log("Database connection closed");
    }
    catch (error) {
        console.error("Error seeding database:", error);
        process.exit(1);
    }
});
// Execute the seed function
seedDatabase();
