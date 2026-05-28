import React, { useState, useEffect } from "react";
import Sidebar from "./components/Sidebar";
import Dashboard from "./components/Dashboard";
import Lessons from "./components/Lessons";
import StudyNotes from "./components/StudyNotes";
import QuestionBrowser from "./components/QuestionBrowser";
import Practice from "./components/Practice";
import MockExam from "./components/MockExam";
import Flashcards from "./components/Flashcards";
import AITutor from "./components/AITutor";
import { Menu } from "lucide-react";

import { StudentProgress, Question, ChatMessage } from "./types";
import { SEEDED_QUESTIONS } from "./questionsData";

export default function App() {
  const [activeTab, setActiveTab] = useState<string>(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("cs_exit_active_tab") || "dashboard";
    }
    return "dashboard";
  });
  const [darkMode, setDarkMode] = useState<boolean>(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState<boolean>(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("cs_exit_sidebar_collapsed") === "true";
    }
    return false;
  });

  const toggleSidebarCollapsed = () => {
    setIsSidebarCollapsed(prev => {
      const next = !prev;
      localStorage.setItem("cs_exit_sidebar_collapsed", String(next));
      return next;
    });
  };
  
  // Sync tab navigation state to resume on correct screen
  useEffect(() => {
    localStorage.setItem("cs_exit_active_tab", activeTab);
  }, [activeTab]);

  // Question context for AI tutor
  const [activeTutorQuestion, setActiveTutorQuestion] = useState<Question | null>(() => {
    try {
      const saved = localStorage.getItem("cs_exit_active_tutor_question");
      return saved ? JSON.parse(saved) : null;
    } catch (e) {
      return null;
    }
  });
  
  // AI Tutor message histories
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>(() => {
    try {
      const saved = localStorage.getItem("cs_exit_chat_history");
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem("cs_exit_chat_history", JSON.stringify(chatHistory));
  }, [chatHistory]);

  useEffect(() => {
    if (activeTutorQuestion) {
      localStorage.setItem("cs_exit_active_tutor_question", JSON.stringify(activeTutorQuestion));
    } else {
      localStorage.removeItem("cs_exit_active_tutor_question");
    }
  }, [activeTutorQuestion]);

  const [questions, setQuestions] = useState<Question[]>(SEEDED_QUESTIONS);
  const [selectedCategoryForPractice, setSelectedCategoryForPractice] = useState<string>(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("cs_exit_selected_practice_category") || "Programming Fundamentals";
    }
    return "Programming Fundamentals";
  });

  useEffect(() => {
    localStorage.setItem("cs_exit_selected_practice_category", selectedCategoryForPractice);
  }, [selectedCategoryForPractice]);

  // Core Progress State
  const [progress, setProgress] = useState<StudentProgress>(() => {
    try {
      const saved = localStorage.getItem("cs_exit_student_progress");
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.error("Failed to restore progress from localStorage", e);
    }
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
  });

  // Fetch initial state from the server database
  useEffect(() => {
    async function loadInitialData() {
      try {
        const res = await fetch("/api/progress");
        if (res.ok) {
          const data = await res.json();
          // Synthesize server data only if there's no local progress or if the user cleared storage
          const localSaved = localStorage.getItem("cs_exit_student_progress");
          if (!localSaved && data) {
            setProgress(data);
            localStorage.setItem("cs_exit_student_progress", JSON.stringify(data));
          }
        }
      } catch (e) {
        console.error("Failed to load initial progress from server", e);
      }
    }
    loadInitialData();
  }, []);

  // Sync progress state back to server and localStorage
  const saveProgress = async (newProgress: StudentProgress) => {
    setProgress(newProgress);
    try {
      localStorage.setItem("cs_exit_student_progress", JSON.stringify(newProgress));
    } catch (e) {
      console.warn("Storage write limit or exception on local save", e);
    }
    try {
      await fetch("/api/progress/save", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newProgress)
      });
    } catch (e) {
      console.error("Failed to sync progress on server", e);
    }
  };

  // HTML class manipulation for dark mode syncing
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  // Launch Personal AI Tutor with a specific question context (Fulfills requirement 7)
  const handleAskTutor = (question: Question) => {
    setActiveTutorQuestion(question);
    
    // Seed an initial greeting with context
    const firstTutorSeed: ChatMessage = {
      id: "tut_seed_" + Date.now(),
      sender: "tutor",
      text: `Hello! I've loaded your context question regarding "${question.category}". I see the correct key is Option "${question.correctAnswer}". Let me know if you would like me to compile or trace the execution, simplify the underlying theorem, or generate a matching variant example!`,
      timestamp: new Date().toISOString(),
      contextQuestionId: question.id
    };

    setChatHistory([firstTutorSeed]);
    setActiveTab("tutor");
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-[#E0E0E0] flex font-sans">
      
      {/* Sidebar Controller */}
      <Sidebar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        darkMode={darkMode} 
        setDarkMode={setDarkMode}
        studyStreak={progress.studyStreak}
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        isCollapsed={isSidebarCollapsed}
        onToggleCollapse={toggleSidebarCollapsed}
      />

      {/* Main Viewport Container */}
      <main className={`flex-1 ${isSidebarCollapsed ? "pl-0" : "pl-0 md:pl-64"} min-h-screen relative flex flex-col justify-between transition-all duration-300`}>
        
        {/* Header Ribbon bar */}
        <header className="sticky top-0 right-0 h-16 border-b border-subtle bg-[#0A0A0A]/85 backdrop-blur-md z-20 flex items-center justify-between px-4 sm:px-8">
          <div className="flex items-center space-x-2">
            {/* Menu trigger button (desktop toggles collapse, mobile toggles drawer) */}
            <button
              onClick={() => {
                if (window.innerWidth >= 768) {
                  toggleSidebarCollapsed();
                } else {
                  setIsSidebarOpen(true);
                }
              }}
              className={`${
                isSidebarCollapsed ? "flex" : "flex md:hidden"
              } p-2 -ml-1 mr-1 rounded-lg hover:bg-white/5 text-white/80 transition-colors cursor-pointer`}
              aria-label="Toggle menu"
            >
              <Menu className="h-5 w-5" />
            </button>
            <div className="flex items-center space-x-2 text-xs font-mono font-bold tracking-widest text-[#F27D26]">
              <span className="font-serif italic text-base">CS.Exit</span>
              <span className="text-white/30">/</span>
              <span className="text-white/60 uppercase">{activeTab}</span>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <span className="text-[10px] uppercase font-mono tracking-widest text-white/50 font-medium hidden xs:inline sm:inline">Ready for Simulation</span>
            <div className="h-2 w-2 bg-[#F27D26] rounded-full shadow-[0_0_8px_rgba(242,125,38,0.8)] animate-pulse" />
          </div>
        </header>

        {/* Tab Selection Area */}
        <div className="p-4 sm:p-8 flex-1 max-w-7xl w-full mx-auto">
          {activeTab === "dashboard" && (
            <Dashboard 
              progress={progress} 
              questions={questions} 
              setActiveTab={setActiveTab}
              setSelectedCategoryForPractice={setSelectedCategoryForPractice}
            />
          )}

          {activeTab === "lessons" && (
            <Lessons 
              progress={progress} 
              saveProgress={saveProgress} 
            />
          )}

          {activeTab === "studynotes" && (
            <StudyNotes 
              progress={progress} 
              saveProgress={saveProgress} 
              onAskTutor={handleAskTutor}
            />
          )}

          {activeTab === "questions" && (
            <QuestionBrowser 
              progress={progress} 
              saveProgress={saveProgress} 
              onAskTutor={handleAskTutor}
              setActiveTab={setActiveTab}
            />
          )}

          {activeTab === "practice" && (
            <Practice 
              progress={progress} 
              saveProgress={saveProgress} 
              seededQuestions={questions}
              selectedCategory={selectedCategoryForPractice}
              setSelectedCategory={setSelectedCategoryForPractice}
              onAskTutor={handleAskTutor}
            />
          )}

          {activeTab === "exams" && (
            <MockExam 
              progress={progress} 
              saveProgress={saveProgress} 
              seededQuestions={questions}
              setActiveTab={setActiveTab}
            />
          )}

          {activeTab === "flashcards" && (
            <Flashcards />
          )}

          {activeTab === "tutor" && (
            <AITutor 
              chatHistory={chatHistory}
              setChatHistory={setChatHistory}
              activeTutorQuestion={activeTutorQuestion}
              setActiveTutorQuestion={setActiveTutorQuestion}
            />
          )}
        </div>

        {/* Humbler Academic Footer */}
        <footer className="text-center py-6 text-[10px] text-white/30 border-t border-white/5 mt-12 bg-[#0A0A0A]">
          <p>© 2026 Academic Exit Evaluator. Strictly configured for student preparation trials. Done completely server-side via Gemini models.</p>
        </footer>

      </main>

    </div>
  );
}
