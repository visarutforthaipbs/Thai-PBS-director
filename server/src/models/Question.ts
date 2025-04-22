import mongoose from "mongoose";

const questionSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: false,
    },
    question: {
      type: String,
      required: true,
    },
    candidateId: {
      type: mongoose.Schema.Types.ObjectId,
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
  },
  {
    timestamps: true,
  }
);

const Question = mongoose.model("Question", questionSchema);

export default Question;
