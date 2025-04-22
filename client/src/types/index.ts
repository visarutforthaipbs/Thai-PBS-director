export interface Candidate {
  _id: string;
  name: string;
  education: string[];
  experience: string[];
  achievements: string[];
  image: string;
}

export interface Opinion {
  _id?: string;
  candidateId?: string;
  support: "สนับสนุน" | "ยังไม่แน่ใจ" | "ไม่สนับสนุน";
  comment?: string;
  region?: string;
  createdAt?: Date;
}

export interface CandidateSupport {
  candidateId: string;
  candidateName: string;
  supportCount: number;
  neutralCount: number;
  againstCount: number;
}

export interface WordCloudItem {
  text: string;
  value: number;
}

export interface Question {
  _id: string;
  name?: string;
  question: string;
  candidateId?: string;
  category?: string;
  province?: string;
  status: "pending" | "approved" | "rejected";
  createdAt: string;
}
