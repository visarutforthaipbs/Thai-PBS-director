"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const questionSchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        required: false,
    },
    question: {
        type: String,
        required: true,
    },
    candidateId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "Candidate",
        required: false,
    },
    category: {
        type: String,
        enum: ["content", "management", "neutrality", "technology", "other"],
        required: true,
    },
    province: {
        type: String,
        required: false,
    },
    status: {
        type: String,
        enum: ["pending", "approved", "rejected"],
        default: "pending",
    },
}, {
    timestamps: true,
});
const Question = mongoose_1.default.model("Question", questionSchema);
exports.default = Question;
