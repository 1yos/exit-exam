export enum QuestionType {
  MCQ = "MCQ",
  TrueFalse = "TrueFalse",
  FillInBlank = "FillInBlank",
  CodeTracing = "CodeTracing",
  ScenarioBased = "ScenarioBased"
}

export enum Difficulty {
  Easy = "Easy",
  Medium = "Medium",
  Hard = "Hard"
}

export interface Question {
  id: string;
  category: string;
  type: QuestionType;
  difficulty: Difficulty;
  questionText: string;
  options?: string[]; // Mandatory for MCQ and optional for others
  correctAnswer: string; // "A", "B", "C", "D" or "True"/"False" or the text string
  explanation: string;
  wrongOptionsExplanation?: {
    [key: string]: string; // For MCQ: explanation of why A, B, C or D are wrong
  };
  source: "Seeded (Aman Nigussu)" | "AAU Exit Model Paper 2023" | "AI Generated" | "User Upload" | "MoE License Prep Blueprint";
  relatedConcepts?: string[];
  codeSnippet?: string; // Optional code snippet to display
  userAnswer?: string; // Optional for active test state
  isFlagged?: boolean; // Optional for mock exam mark-for-review
}

export interface Lesson {
  id: string;
  category: string;
  title: string;
  summary: string;
  contentMarkdown: string;
  difficultyProgression: string[]; // Order of concepts
  keyFormulas?: string[];
  tips: string[];
}

export interface Flashcard {
  id: string;
  category: string;
  front: string;
  back: string;
}

export interface CompletedQuiz {
  id: string;
  date: string;
  category: string;
  questionsCount: number;
  score: number; // Percentage
  timeSpentSeconds: number;
}

export interface CompletedExam {
  id: string;
  date: string;
  examType: "Random" | "Topic-based" | "Previous-year style" | "Adaptive";
  score: number; // Percentage
  timeSpentSeconds: number;
  totalQuestions: number;
  correctCount: number;
  topicBreakdown: { [category: string]: { correct: number; total: number } };
}

export interface StudentProgress {
  categoryMastery: { [category: string]: number }; // Percentage (0-100)
  overallReadiness: number; // Weight calculated readiness
  studyStreak: number;
  lastActiveDate: string; // ISO String
  completedQuizzes: CompletedQuiz[];
  completedExams: CompletedExam[];
  savedQuestions: string[]; // List of question IDs
  notes: { [category: string]: string }; // User's custom study notes
  unlockedDifficulties: { [category: string]: Difficulty }; // Unlocked peak difficulty
}

export interface ChatMessage {
  id: string;
  sender: "user" | "tutor";
  text: string;
  timestamp: string;
  contextQuestionId?: string; // If the conversation is about a specific question
}
