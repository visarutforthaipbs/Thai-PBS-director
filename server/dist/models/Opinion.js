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
const OpinionSchema = new mongoose_1.default.Schema({
    candidateId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
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
}, {
    timestamps: true,
});
// Create the real Mongoose model
const OpinionModel = mongoose_1.default.model("Opinion", OpinionSchema);
// Create a mock Opinion model
class MockOpinion {
    static find(query) {
        return (0, database_1.mockGetOpinions)(query);
    }
    static countDocuments(query) {
        return (0, database_1.mockCountOpinions)(query);
    }
    static populate() {
        return this; // Just for chaining
    }
    constructor(data) {
        Object.assign(this, data);
    }
    save() {
        return __awaiter(this, void 0, void 0, function* () {
            return (0, database_1.mockSaveOpinion)(this);
        });
    }
}
// Export the appropriate implementation based on whether we're using the mock DB
exports.default = database_1.usingMockDb ? MockOpinion : OpinionModel;
