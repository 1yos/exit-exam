import express from "express";
import path from "path";
import fs from "fs";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

// Body parser
app.use(express.json());

// Initialize Gemini client server-side
// Telemetry require User-Agent set to 'aistudio-build'
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
  httpOptions: {
    headers: {
      "User-Agent": "aistudio-build"
    }
  }
});

// File path for persisting student study progress on disk
const PROGRESS_FILE = path.join(process.cwd(), "progress.json");

// Helper to load student progress
function loadProgress() {
  if (fs.existsSync(PROGRESS_FILE)) {
    try {
      const data = fs.readFileSync(PROGRESS_FILE, "utf-8");
      return JSON.parse(data);
    } catch (e) {
      console.error("Failed to parse progress.json:", e);
    }
  }
  // Return default profile
  return {
    categoryMastery: {
      "Programming Fundamentals": 0,
      "Data Structures & Algorithms": 0,
      "Database Systems": 0,
      "Operating Systems": 0,
      "Computer Networks": 0,
      "Software Engineering": 0,
      "Object-Oriented Programming": 0,
      "Web Development": 0,
      "Computer Architecture": 0,
      "Theory of Computation": 0,
      "Artificial Intelligence": 0,
      "Cybersecurity": 0,
      "Discrete Mathematics": 0,
      "Compiler Design": 0,
      "Distributed Systems": 0
    },
    overallReadiness: 0,
    studyStreak: 1,
    lastActiveDate: new Date().toISOString(),
    completedQuizzes: [],
    completedExams: [],
    savedQuestions: [],
    notes: {},
    unlockedDifficulties: {
      "Programming Fundamentals": "Easy"
    }
  };
}

// ----------------------------------------------------
// API ROUTES
// ----------------------------------------------------

// 1. Get Seeding Database / Questions
app.get("/api/questions", (req, res) => {
  try {
    // We import directly (common layout or relative)
    // To avoid circular import/require and speed up server load, we serve static SEEDED_QUESTIONS
    const { SEEDED_QUESTIONS } = require("./src/questionsData");
    res.json({ questions: SEEDED_QUESTIONS });
  } catch (err: any) {
    res.status(500).json({ error: "Failed to load questions", details: err.message });
  }
});

// 2. Fetch Student Progress
app.get("/api/progress", (req, res) => {
  try {
    const progress = loadProgress();
    res.json(progress);
  } catch (err: any) {
    res.status(500).json({ error: "Failed to load progress state" });
  }
});

// 3. Save Student Progress
app.post("/api/progress/save", (req, res) => {
  try {
    const newProgress = req.body;
    fs.writeFileSync(PROGRESS_FILE, JSON.stringify(newProgress, null, 2), "utf-8");
    res.json({ success: true, progress: newProgress });
  } catch (err: any) {
    res.status(500).json({ error: "Failed to write progress to database file" });
  }
});

// 4. AI Tutor Endpoint
app.post("/api/gemini/tutor", async (req, res) => {
  try {
    const { prompt, chatHistory, questionContext } = req.body;

    if (!process.env.GEMINI_API_KEY) {
      return res.status(400).json({
        error: "Gemini API key is not configured in Secrets"
      });
    }

    const systemInstruction = `You are a highly encouraging, patient, and brilliant Computer Science Professor specializing in preparing students for their CS Exit Exam. 
Exams cover programming, algorithms, networks, databases, architecture, OS, compilers, cybersecurity, automata, and AI.
- Explain concepts using clear structure, bullet points, code analogies, or ASCII diagrams if helpful.
- Keep answers professional, human, educational, yet concise and highly positive.
- When an exam question context is supplied, explain:
  1. The direct core logic of the correct answer first.
  2. The step-by-step execution details or proof context.
  3. Briefly discuss why the other options are wrong or traps to watch out for.
  Don't give any meta-text about prompt wrappers. Focus pure academic tutoring.`;

    let userMessage = "";
    if (questionContext) {
      userMessage += `[CONTEXT EXAM QUESTION]\n`;
      userMessage += `Topic/Category: ${questionContext.category}\n`;
      userMessage += `Question Type: ${questionContext.type}\n`;
      userMessage += `Question: ${questionContext.questionText}\n`;
      if (questionContext.codeSnippet) {
        userMessage += `Code Snippet:\n\`\`\`\n${questionContext.codeSnippet}\n\`\`\`\n`;
      }
      if (questionContext.options) {
        userMessage += `Options:\n`;
        questionContext.options.forEach((opt: string, idx: number) => {
          userMessage += `${String.fromCharCode(65 + idx)}. ${opt}\n`;
        });
      }
      userMessage += `Correct Answer indicates Option: ${questionContext.correctAnswer}\n`;
      userMessage += `Self-Seeded Explanation: ${questionContext.explanation}\n`;
      userMessage += `----------------------------------------------\n\n`;
    }

    userMessage += `Student message: ${prompt}`;

    // Assemble chat histories
    const contents: any[] = [];
    if (chatHistory && Array.isArray(chatHistory)) {
      chatHistory.forEach((msg: any) => {
        contents.push({
          role: msg.sender === "user" ? "user" : "model",
          parts: [{ text: msg.text }]
        });
      });
    }
    // Add current turn
    contents.push({
      role: "user",
      parts: [{ text: userMessage }]
    });

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: contents,
      config: {
        systemInstruction
      }
    });

    res.json({ response: response.text });
  } catch (err: any) {
    console.error("Gemini Error:", err);
    res.status(500).json({ error: "Failed to query AI Tutor", details: err.message });
  }
});

// 5. AI Custom Question Generator (Satisfies requirement 3)
app.post("/api/gemini/generate-question", async (req, res) => {
  try {
    const { category, difficulty, studentWeaknesses } = req.body;

    if (!process.env.GEMINI_API_KEY) {
      return res.status(400).json({
        error: "Gemini API key is not configured in Secrets"
      });
    }

    const currentTopicPrompt = `Generate a high-quality Computer Science Exit Exam question for the category: "${category}". 
Difficulty level: "${difficulty}".
${studentWeaknesses ? `Focus on target weak area or concept: "${studentWeaknesses}".` : ""}
The output must reflect rigorous academic standards such as graduate exit assessments (like GRE Subject Test in CS or national licensing examinations).
Return the question as JSON containing exactly:
- type: Must be one of ["MCQ", "TrueFalse", "FillInBlank", "CodeTracing", "ScenarioBased"]
- questionText: rigorous core question text
- codeSnippet: (optional) C++, Java, Python, SQL, or pseudocode matching the question
- options: If MCQ or ScenarioBased, exactly 4 options. If TrueFalse, exactly ["True", "False"]. Otherwise empty or omitted.
- correctAnswer: The exact answer text. For MCQ/ScenarioBased, use options list index identifier: "A", "B", "C", or "D". For TrueFalse use "True" or "False".
- explanation: Detailed trace logic why the key is correct.
- wrongOptionsExplanation: Object mapping options "A", "B", "C", "D" (excluding the correct one) to details why they are invalid distractors/wrong.
`;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: currentTopicPrompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          required: ["type", "questionText", "correctAnswer", "explanation"],
          properties: {
            type: {
              type: Type.STRING,
              description: "Question type: MCQ, TrueFalse, FillInBlank, CodeTracing, ScenarioBased"
            },
            questionText: { type: Type.STRING },
            codeSnippet: { type: Type.STRING },
            options: {
              type: Type.ARRAY,
              items: { type: Type.STRING }
            },
            correctAnswer: { type: Type.STRING },
            explanation: { type: Type.STRING },
            wrongOptionsExplanation: {
              type: Type.OBJECT,
              properties: {
                A: { type: Type.STRING },
                B: { type: Type.STRING },
                C: { type: Type.STRING },
                D: { type: Type.STRING }
              }
            }
          }
        }
      }
    });

    let qObj = JSON.parse(response.text.trim());
    // Auto populate ID and category
    qObj.id = "gen_" + Date.now();
    qObj.category = category;
    qObj.difficulty = difficulty;
    qObj.source = "AI Generated";

    res.json(qObj);
  } catch (err: any) {
    console.error("AI Question Generator Failure:", err);
    res.status(500).json({ error: "Failed to generate dynamic question", details: err.message });
  }
});

// ----------------------------------------------------
// VITE OR STATIC FILE MIDDLEWARES
// ----------------------------------------------------

async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    // Mounting Vite in Dev mode
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa"
    });
    app.use(vite.middlewares);
  } else {
    // Serve static compiled assets in production
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`CS Exit Exam Prep Server running on port ${PORT}`);
  });
}

startServer();
