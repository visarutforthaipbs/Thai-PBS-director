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
const database_1 = require("../config/database");
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
// Create the real Mongoose model
const CandidateModel = mongoose_1.default.model("Candidate", CandidateSchema);
// Mock implementation - simplified since we're now using real data
const MockCandidate = {
    // Basic operations with empty implementations that will be replaced by real MongoDB
    find: () => __awaiter(void 0, void 0, void 0, function* () { return []; }),
    findById: (id) => __awaiter(void 0, void 0, void 0, function* () { return null; }),
    findByIdAndUpdate: (id, data) => __awaiter(void 0, void 0, void 0, function* () { return null; }),
    findByIdAndDelete: (id) => __awaiter(void 0, void 0, void 0, function* () { return null; }),
    // Constructor-like functionality
    new: function (data) {
        return Object.assign(Object.assign({}, data), { save: function () {
                return __awaiter(this, void 0, void 0, function* () {
                    return Object.assign({ _id: Date.now().toString() }, data);
                });
            } });
    },
};
// Export the appropriate implementation based on whether we're using the mock DB
exports.default = database_1.usingMockDb ? MockCandidate : CandidateModel;
