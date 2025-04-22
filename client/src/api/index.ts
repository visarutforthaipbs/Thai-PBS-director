import axios from "axios";
import {
  Candidate,
  Opinion,
  CandidateSupport,
  WordCloudItem,
  Question,
} from "../types";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:8888/api";

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const getCandidates = async (): Promise<Candidate[]> => {
  const response = await api.get("/candidates");
  return response.data;
};

export const getCandidate = async (id: string): Promise<Candidate> => {
  const response = await api.get(`/candidates/${id}`);
  return response.data;
};

export const submitOpinion = async (opinion: Opinion): Promise<Opinion> => {
  const response = await api.post("/opinions", opinion);
  return response.data;
};

export const getCandidateSupport = async (): Promise<CandidateSupport[]> => {
  const response = await api.get("/opinions/support");
  return response.data;
};

export const getWordCloudData = async (): Promise<WordCloudItem[]> => {
  const response = await api.get("/opinions/wordcloud");
  return response.data;
};

export const submitQuestion = async (questionData: {
  name?: string;
  question: string;
  candidateId?: string;
  category?: string;
  province?: string;
}): Promise<Question> => {
  const response = await api.post("/questions", questionData);
  return response.data;
};

export const getQuestions = async (params?: {
  limit?: number;
  status?: string;
}): Promise<Question[]> => {
  const response = await api.get("/questions", { params });
  return response.data;
};

// Get the total count of questions
export const getQuestionsCount = async (): Promise<number> => {
  try {
    const response = await api.get("/questions/count");
    return response.data.count;
  } catch (error) {
    console.error("Error fetching question count:", error);
    return 0;
  }
};

export default api;
