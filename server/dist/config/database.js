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
exports.mockSaveOpinion = exports.mockCountOpinions = exports.mockGetOpinions = exports.usingMockDb = exports.mockOpinions = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const MONGO_URI = process.env.MONGO_URI ||
    "mongodb+srv://visarutforthaipbs:gXhqa9YbbBK32gKI@thaipbs-director.qmymklz.mongodb.net/?retryWrites=true&w=majority&appName=thaipbs-director";
// Mock data for opinions when MongoDB is not available
exports.mockOpinions = [
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
exports.usingMockDb = false;
// Function to get opinions
const mockGetOpinions = (query = {}) => __awaiter(void 0, void 0, void 0, function* () {
    if (query.candidateId) {
        return exports.mockOpinions.filter((o) => o.candidateId === query.candidateId);
    }
    if (query.comment && query.comment.$ne === "") {
        return exports.mockOpinions.filter((o) => o.comment !== "");
    }
    return [...exports.mockOpinions];
});
exports.mockGetOpinions = mockGetOpinions;
// Function to count opinions
const mockCountOpinions = (query = {}) => __awaiter(void 0, void 0, void 0, function* () {
    return exports.mockOpinions.filter((o) => (!query.candidateId || o.candidateId === query.candidateId) &&
        (!query.support || o.support === query.support)).length;
});
exports.mockCountOpinions = mockCountOpinions;
// Function to save a new opinion
const mockSaveOpinion = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const newOpinion = Object.assign({ _id: Date.now().toString(), candidateId: data.candidateId || "1", support: data.support || "ยังไม่แน่ใจ", comment: data.comment || "", region: data.region || "", createdAt: new Date() }, data);
    exports.mockOpinions.push(newOpinion);
    return newOpinion;
});
exports.mockSaveOpinion = mockSaveOpinion;
const connectDatabase = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield mongoose_1.default.connect(MONGO_URI);
        console.log("MongoDB connected successfully");
        exports.usingMockDb = false;
    }
    catch (error) {
        console.error("MongoDB connection error:", error);
        console.log("Using mock database for testing purposes");
        exports.usingMockDb = true;
    }
});
exports.default = connectDatabase;
