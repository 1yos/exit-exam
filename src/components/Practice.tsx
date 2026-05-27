import React, { useState, useEffect } from "react";
import { 
  CheckCircle, 
  XCircle, 
  HelpCircle, 
  Sparkles, 
  Bookmark, 
  BookmarkCheck,
  ChevronRight, 
  MessageSquare,
  RefreshCw,
  Award
} from "lucide-react";
import { Question, StudentProgress, QuestionType, Difficulty } from "../types";

interface PracticeProps {
  progress: StudentProgress;
  saveProgress: (progress: StudentProgress) => void;
  seededQuestions: Question[];
  selectedCategory: string;
  setSelectedCategory: (cat: string) => void;
  onAskTutor: (question: Question) => void;
}

export default function Practice({
  progress,
  saveProgress,
  seededQuestions,
  selectedCategory,
  setSelectedCategory,
  onAskTutor
}: PracticeProps) {
  
  const categories = [
    "Programming Fundamentals",
    "Data Structures & Algorithms",
    "Database Systems",
    "Operating Systems",
    "Computer Networks",
    "Software Engineering",
    "Object-Oriented Programming",
    "Web Development",
    "Computer Architecture",
    "Theory of Computation",
    "Artificial Intelligence",
    "Cybersecurity",
    "Discrete Mathematics",
    "Compiler Design",
    "Distributed Systems"
  ];

  const [activeQuestions, setActiveQuestions] = useState<Question[]>([]);
  const [currentIdx, setCurrentIdx] = useState<number>(0);
  const [selectedOpt, setSelectedOpt] = useState<string>("");
  const [fillInText, setFillInText] = useState<string>("");
  const [isAnswered, setIsAnswered] = useState<boolean>(false);
  const [answerIsCorrect, setAnswerIsCorrect] = useState<boolean>(false);
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [genError, setGenError] = useState<string>("");

  // Load questions for topic
  useEffect(() => {
    // Filter statically seeded questions matching the category
    let matches = seededQuestions.filter(q => q.category === selectedCategory);
    
    // If none exist, we pre-seed some default standard questions dynamically 
    if (matches.length === 0) {
      matches = [
        {
          id: `def_${selectedCategory}_01`,
          category: selectedCategory,
          type: QuestionType.MCQ,
          difficulty: Difficulty.Easy,
          questionText: `Which of the following describes the absolute core goal or foundation of studies in "${selectedCategory}"?`,
          options: [
            "Theoretical abstract mapping and algorithm complexity reduction",
            "Practical industrial applications, scaling configurations, and design schemas",
            "Establishing physical, software, and procedural standards for systems",
            "All of the above"
          ],
          correctAnswer: "D",
          explanation: `All options represent different direct faces of ${selectedCategory} study frameworks, spanning from scientific computational theory to industry applications.`,
          source: "Seeded (Aman Nigussu)"
        }
      ];
    }
    
    setActiveQuestions(matches);
    setCurrentIdx(0);
    resetAnswerState();
  }, [selectedCategory, seededQuestions]);

  const resetAnswerState = () => {
    setSelectedOpt("");
    setFillInText("");
    setIsAnswered(false);
    setAnswerIsCorrect(false);
  };

  const activeQuestion = activeQuestions[currentIdx];

  // Bookmark / Safe question
  const isBookmarked = activeQuestion ? progress.savedQuestions.includes(activeQuestion.id) : false;

  const handleToggleBookmark = () => {
    if (!activeQuestion) return;
    let saved = [...progress.savedQuestions];
    if (isBookmarked) {
      saved = saved.filter(id => id !== activeQuestion.id);
    } else {
      saved.push(activeQuestion.id);
    }
    saveProgress({ ...progress, savedQuestions: saved });
  };

  // Submit Answer
  const handleSubmitAnswer = () => {
    if (isAnswered || !activeQuestion) return;

    let correct = false;
    if (activeQuestion.type === QuestionType.MCQ || activeQuestion.type === QuestionType.ScenarioBased || activeQuestion.type === QuestionType.TrueFalse || activeQuestion.type === QuestionType.CodeTracing) {
      correct = selectedOpt === activeQuestion.correctAnswer;
    } else if (activeQuestion.type === QuestionType.FillInBlank) {
      correct = fillInText.trim().toLowerCase() === activeQuestion.correctAnswer.trim().toLowerCase();
    }

    setAnswerIsCorrect(correct);
    setIsAnswered(true);

    // Calculate score metrics update
    const category = selectedCategory;
    const currentCategoryScore = progress.categoryMastery[category] || 0;
    
    // Increment mastery score progressively
    let scoreDelta = correct ? 10 : -5;
    let newScore = Math.max(0, Math.min(100, currentCategoryScore + scoreDelta));

    const updatedMastery = { ...progress.categoryMastery, [category]: newScore };
    
    // Save quiz history
    const newQuizRecord = {
      id: "qz_" + Date.now(),
      date: new Date().toISOString(),
      category: category,
      questionsCount: 1,
      score: correct ? 100 : 0,
      timeSpentSeconds: 15
    };

    saveProgress({
      ...progress,
      categoryMastery: updatedMastery,
      completedQuizzes: [...progress.completedQuizzes, newQuizRecord]
    });
  };

  // Generate dynamic AI questions on demand (Requirement 3)
  const handleGenerateAIQuestion = async () => {
    setIsGenerating(true);
    setGenError("");
    try {
      const response = await fetch("/api/gemini/generate-question", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          category: selectedCategory,
          difficulty: [Difficulty.Easy, Difficulty.Medium, Difficulty.Hard][Math.floor(Math.random() * 3)],
          studentWeaknesses: progress.notes[selectedCategory] || ""
        })
      });
      const data = await response.json();
      if (data.error) {
        throw new Error(data.error);
      }
      
      // Inject generated question into list
      setActiveQuestions(prev => [data, ...prev]);
      setCurrentIdx(0);
      resetAnswerState();
    } catch (err: any) {
      console.error(err);
      setGenError(err.message || "Failed to connect to AI Question generator.");
    } finally {
      setIsGenerating(false);
    }
  };

  const handleNext = () => {
    if (currentIdx < activeQuestions.length - 1) {
      setCurrentIdx(prev => prev + 1);
      resetAnswerState();
    }
  };

  const handlePrevious = () => {
    if (currentIdx > 0) {
      setCurrentIdx(prev => prev - 1);
      resetAnswerState();
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-8" id="practice-tab">
      
      {/* 1. Left Topic Selector Sidebar (Dropdown on mobile, checklist list on desktop) */}
      <div className="lg:col-span-3 space-y-4">
        
        {/* Mobile Filter selector */}
        <div className="lg:hidden glass p-4 rounded-3xl border border-white/5">
          <label className="block text-[10px] uppercase tracking-widest text-[#E0E0E0]/50 font-bold mb-2">
            Select Practice Subject
          </label>
          <div className="relative">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full bg-black/40 border border-white/10 text-xs text-white p-3 rounded-xl appearance-none focus:outline-none focus:ring-1 focus:ring-[#F27D26] cursor-pointer font-bold"
            >
              {categories.map((cat) => (
                <option key={cat} value={cat} className="bg-[#0A0A0A] text-white">
                  {cat}
                </option>
              ))}
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-white/50">
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
        </div>

        {/* Desktop checklist list */}
        <div className="hidden lg:block glass p-5 rounded-3xl border border-white/5">
          <h3 className="text-[10px] font-bold text-white/40 font-mono mb-4 uppercase tracking-widest">Select Subject</h3>
          <div className="space-y-1.5 max-h-[60vh] overflow-y-auto pr-1" id="practice-checklist">
            {categories.map((cat) => {
              const isActive = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`w-full text-left px-3.5 py-2.5 rounded-xl text-xs font-semibold tracking-wide transition-all duration-155 cursor-pointer ${
                    isActive 
                      ? "bg-white/5 border border-white/10 text-white shadow" 
                      : "text-white/60 hover:text-white hover:bg-white/3"
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* 2. Central Question Panel (9 cols) */}
      <div className="lg:col-span-9 space-y-6">
        
        {/* practice active view card */}
        {activeQuestion && (
          <div className="glass p-5 sm:p-8 rounded-3xl border border-white/5 space-y-6">
            
            {/* Header / Meta */}
            <div className="flex justify-between items-center pb-4 border-b border-white/5">
              <div className="flex items-center space-x-2">
                <span className="text-[9px] bg-[#F27D26]/10 text-[#F27D26] font-bold px-2 py-0.5 rounded-lg uppercase tracking-wider font-mono border border-white/5">
                  {activeQuestion.difficulty}
                </span>
                <span className="text-[9px] bg-white/5 text-[#E0E0E0]/60 font-semibold px-2 py-0.5 rounded-lg font-mono">
                  {activeQuestion.source}
                </span>
              </div>
              
              {/* Question Navigation Control */}
              <div className="flex items-center space-x-1 sm:space-x-2">
                <button 
                  onClick={handlePrevious} 
                  disabled={currentIdx === 0}
                  className="px-2.5 py-1 text-[10px] uppercase tracking-widest font-bold border border-white/5 text-white/70 hover:text-white rounded-lg bg-white/3 disabled:opacity-30 disabled:pointer-events-none transition-colors cursor-pointer"
                >
                  Prev
                </button>
                <span className="text-[10px] font-mono font-bold text-white/40 px-1 select-none">
                  {currentIdx + 1}/{activeQuestions.length}
                </span>
                <button 
                  onClick={handleNext} 
                  disabled={currentIdx === activeQuestions.length - 1}
                  className="px-2.5 py-1 text-[10px] uppercase tracking-widest font-bold border border-white/5 text-white/70 hover:text-white rounded-lg bg-white/3 disabled:opacity-30 disabled:pointer-events-none transition-colors cursor-pointer"
                >
                  Next
                </button>
                
                {/* Favorites Trigger */}
                <button 
                  onClick={handleToggleBookmark}
                  className="p-1 px-1.5 ml-1 border border-white/5 rounded-lg bg-white/3 hover:bg-white/5 transition-colors cursor-pointer"
                  title="Bookmark question"
                >
                  {isBookmarked 
                    ? <BookmarkCheck className="h-4 w-4 text-[#F27D26] fill-[#F27D26]" /> 
                    : <Bookmark className="h-4 w-4 text-white/50" />
                  }
                </button>
              </div>
            </div>

            {/* Question Text */}
            <div className="space-y-4">
              <h3 className="text-sm sm:text-base font-semibold text-white leading-relaxed">
                {activeQuestion.questionText}
              </h3>
              
              {activeQuestion.codeSnippet && (
                <pre className="bg-black/45 p-4 sm:p-5 rounded-xl border border-white/5 font-mono text-[11px] overflow-x-auto text-[#ff9e59] leading-relaxed">
                  <code>{activeQuestion.codeSnippet}</code>
                </pre>
              )}
            </div>

            {/* Answer Options Inputs */}
            <div className="space-y-2.5 pt-2">
              {activeQuestion.type === QuestionType.FillInBlank ? (
                // Fill in the blank input
                <input
                  type="text"
                  value={fillInText}
                  onChange={(e) => setFillInText(e.target.value)}
                  disabled={isAnswered}
                  placeholder="Type your precise answer here..."
                  className="w-full p-4 bg-black/40 border border-white/5 text-white text-xs rounded-xl focus:outline-none focus:ring-1 focus:ring-[#F27D26]"
                />
              ) : (
                // Multiple choices or true/false options
                activeQuestion.options?.map((opt, idx) => {
                  const letter = String.fromCharCode(65 + idx);
                  const isSelected = selectedOpt === letter;
                  
                  let optionStyle = "border-white/5 bg-white/3 hover:bg-white/5 text-white/80";
                  
                  if (isSelected) {
                    optionStyle = "border-[#F27D26] bg-[#F27D26]/5 text-white ring-1 ring-[#F27D26]/30";
                  }

                  if (isAnswered) {
                    if (letter === activeQuestion.correctAnswer) {
                      optionStyle = "border-emerald-500/40 bg-emerald-950/15 text-emerald-400 ring-1 ring-emerald-500/20";
                    } else if (isSelected && letter !== activeQuestion.correctAnswer) {
                      optionStyle = "border-red-500/40 bg-red-950/15 text-red-400 ring-1 ring-red-500/20";
                    } else {
                      optionStyle = "opacity-30 border-white/5";
                    }
                  }

                  return (
                    <button
                      key={letter}
                      onClick={() => !isAnswered && setSelectedOpt(letter)}
                      disabled={isAnswered}
                      className={`w-full flex items-start space-x-3 p-3.5 sm:p-4 rounded-xl border text-left text-xs font-semibold tracking-wide transition-all min-h-[44px] cursor-pointer ${optionStyle}`}
                    >
                      <span className={`w-6 h-6 rounded-lg flex items-center justify-center font-mono text-[10px] font-bold select-none ${isSelected ? "bg-[#F27D26] text-black" : "bg-white/5 text-white/60"}`}>
                        {letter}
                      </span>
                      <span className="flex-1 pt-0.5 leading-relaxed">{opt}</span>
                    </button>
                  );
                })
              )}
            </div>

            {/* Answer Control Action */}
            {!isAnswered ? (
              <div className="flex justify-end pt-4">
                <button
                  onClick={handleSubmitAnswer}
                  disabled={activeQuestion.type === QuestionType.FillInBlank ? !fillInText : !selectedOpt}
                  className="px-6 py-2.5 bg-[#F27D26] hover:bg-[#ff9e59] text-black font-extrabold rounded-full text-xs shadow-md shadow-[#F27D26]/10 hover:scale-105 transition-transform disabled:opacity-40 disabled:pointer-events-none cursor-pointer"
                >
                  Submit Answer
                </button>
              </div>
            ) : (
              // Score / Explanation Results panel
              <div className="space-y-6 pt-6 border-t border-white/5 transition-all duration-350">
                <div className={`p-4 rounded-2xl flex items-start space-x-3 border ${
                  answerIsCorrect 
                    ? "bg-emerald-950/20 border-emerald-500/25 text-emerald-400" 
                    : "bg-red-950/20 border-red-500/25 text-red-400"
                }`}>
                  {answerIsCorrect ? <CheckCircle className="h-5 w-5 mt-0.5 flex-shrink-0" /> : <XCircle className="h-5 w-5 mt-0.5 flex-shrink-0" />}
                  <div className="space-y-1 text-xs sm:text-sm">
                    <h4 className="font-bold">{answerIsCorrect ? "Correct answer!" : "Incorrect option selected"}</h4>
                    <p className="opacity-85 text-xs">The correct answer is <strong className="font-mono">{activeQuestion.correctAnswer}</strong>.</p>
                  </div>
                </div>

                {/* Question Explanation Stack */}
                <div className="space-y-3">
                  <h4 className="text-[10px] uppercase font-bold text-[#F27D26] font-mono tracking-widest pb-1 border-b border-white/5">Concept Explanation</h4>
                  <p className="text-xs text-white/80 leading-relaxed whitespace-pre-line">
                    {activeQuestion.explanation}
                  </p>
                </div>

                {/* Distractor option traps (Requirement 2) */}
                {activeQuestion.wrongOptionsExplanation && (
                  <div className="space-y-3">
                    <h4 className="text-[10px] uppercase font-bold text-white/50 font-mono tracking-widest pb-1 border-b border-white/5">Trap Distractors Mapped</h4>
                    <div className="grid grid-cols-1 gap-2.5">
                      {Object.keys(activeQuestion.wrongOptionsExplanation).map((key) => (
                        <div key={key} className="text-xs bg-white/2 p-3 rounded-2xl border border-white/5">
                          <p className="text-white/70 leading-relaxed">
                            <span className="font-mono font-bold text-[#F27D26] mr-2">Option {key}:</span>
                            {activeQuestion!.wrongOptionsExplanation![key]}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Inter-active AI tutoring and progression triggers */}
                <div className="flex flex-col sm:flex-row gap-4 justify-between items-center pt-2">
                  <button
                    onClick={() => onAskTutor(activeQuestion)}
                    className="w-full sm:w-auto px-5 py-2.5 bg-white/5 text-[#F27D26] border border-[#F27D26]/10 text-xs font-bold rounded-full hover:bg-white/8 flex items-center justify-center space-x-2 cursor-pointer hover:scale-105 transition-transform"
                  >
                    <MessageSquare className="h-4 w-4" />
                    <span>Explain Options & Code with Tutor</span>
                  </button>

                  <div className="flex w-full sm:w-auto space-x-3 justify-end">
                    {currentIdx < activeQuestions.length - 1 && (
                      <button
                        onClick={handleNext}
                        className="w-full sm:w-auto px-5 py-2.5 bg-[#F27D26]/10 border border-[#F27D26]/20 text-white text-xs font-semibold rounded-full flex items-center justify-center space-x-1 hover:bg-[#F27D26]/15 transition-colors cursor-pointer"
                      >
                        <span>Next Question</span>
                        <ChevronRight className="h-4 w-4 text-[#F27D26]" />
                      </button>
                    )}
                  </div>
                </div>

              </div>
            )}

          </div>
        )}

        {/* Dynamic AI Question generator dashboard widget (Requirement 3) */}
        <div className="glass text-white rounded-3xl p-5 sm:p-6 flex flex-col md:flex-row items-center justify-between border border-[#F27D26]/10 gap-4 bg-[#F27D26]/2">
          <div className="flex items-center space-x-4">
            <div className="bg-[#F27D26]/10 text-[#F27D26] p-3 rounded-2xl border border-white/5 flex-shrink-0">
              <Sparkles className="h-5 w-5" />
            </div>
            <div className="space-y-1">
              <h4 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-white">Generate Additional Practice Questions</h4>
              <p className="text-xs text-white/50 max-w-lg leading-relaxed">
                Explore custom curriculum questions compiled on-demand using Gemini. 
                Our engine ensures matching university computer science exit assessments.
              </p>
            </div>
          </div>

          <button
            onClick={handleGenerateAIQuestion}
            disabled={isGenerating}
            className="w-full md:w-auto px-6 py-2.5 bg-[#F27D26] hover:bg-[#ff9e59] text-black font-extrabold rounded-full text-xs hover:scale-105 active:scale-95 disabled:opacity-45 transition-all flex items-center justify-center space-x-2 flex-shrink-0 cursor-pointer"
          >
            {isGenerating ? <RefreshCw className="h-4 w-4 animate-spin" /> : <RefreshCw className="h-4 w-4" />}
            <span>{isGenerating ? "Compiling..." : "Generate AI Question"}</span>
          </button>
        </div>

        {genError && (
          <div className="p-4 bg-red-900/10 text-red-400 text-xs font-semibold rounded-2xl border border-red-900/15">
            {genError}
          </div>
        )}

      </div>

    </div>
  );
}
