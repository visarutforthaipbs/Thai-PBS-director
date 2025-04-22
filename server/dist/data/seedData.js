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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
const database_1 = require("../config/database");
// Import models
const CandidateSchema = new mongoose_1.default.Schema({
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
}, {
    timestamps: true,
});
// Load environment variables
dotenv_1.default.config();
// MongoDB connection URI
const MONGO_URI = process.env.MONGO_URI ||
    "mongodb+srv://visarutforthaipbs:gXhqa9YbbBK32gKI@thaipbs-director.qmymklz.mongodb.net/?retryWrites=true&w=majority&appName=thaipbs-director";
// Prepare candidates data without _id fields
const candidatesData = database_1.mockCandidates.map((_a) => {
    var { _id } = _a, rest = __rest(_a, ["_id"]);
    return rest;
});
// Seed function
const seedDatabase = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Connect to MongoDB
        console.log("Connecting to MongoDB...");
        yield mongoose_1.default.connect(MONGO_URI);
        console.log("Connected to MongoDB");
        // Clear existing data
        const Candidate = mongoose_1.default.model("Candidate", CandidateSchema);
        yield Candidate.deleteMany({});
        console.log("Cleared existing candidates");
        // Insert seed data
        const candidates = yield Candidate.insertMany(candidatesData);
        console.log(`Inserted ${candidates.length} candidates`);
        console.log("Seed data successfully added!");
        // Disconnect from MongoDB
        yield mongoose_1.default.disconnect();
        console.log("Disconnected from MongoDB");
        process.exit(0);
    }
    catch (error) {
        console.error("Error seeding database:", error);
        process.exit(1);
    }
});
// Run the seed function
seedDatabase();
