import React, { useState, useEffect } from "react";
import { 
  Bookmark, 
  BookOpen, 
  Check, 
  HelpCircle, 
  PlusCircle, 
  MessageSquare,
  Award,
  ChevronDown,
  ChevronUp,
  CheckCircle,
  XCircle,
  PlayCircle,
  ChevronLeft,
  ChevronRight,
  ArrowLeft,
  ArrowRight
} from "lucide-react";
import { SEEDED_QUESTIONS } from "../questionsData";
import { getDetailedNotesForCategory } from "../detailedNotesData";
import { Question, StudentProgress } from "../types";

interface StudyNotesProps {
  progress: StudentProgress;
  saveProgress: (progress: StudentProgress) => void;
  onAskTutor: (question: Question) => void;
}

export default function StudyNotes({ progress, saveProgress, onAskTutor }: StudyNotesProps) {
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

  const [selectedCategory, setSelectedCategory] = useState<string>(() => {
    return localStorage.getItem("cs_exit_study_notes_category") || categories[0];
  });
  const [currentChapterIdx, setCurrentChapterIdx] = useState<number>(() => {
    const saved = localStorage.getItem("cs_exit_study_notes_chapter_idx");
    return saved ? parseInt(saved, 10) : 0;
  });
  const [localNotes, setLocalNotes] = useState<string>("");
  const [isSavedIndicator, setIsSavedIndicator] = useState<boolean>(false);
  const [expandedQuestions, setExpandedQuestions] = useState<{ [key: string]: boolean }>({});
  
  // Track checkpoint questions answers
  const [checkpointAnswers, setCheckpointAnswers] = useState<{
    [qId: string]: { selectedOption: string; isSubmitted: boolean; isCorrect: boolean };
  }>(() => {
    try {
      return JSON.parse(localStorage.getItem("cs_exit_checkpoint_answers") || "{}");
    } catch (e) {
      return {};
    }
  });

  // Local state to keep track of answered questions on the final pool
  const [answersState, setAnswersState] = useState<{
    [qId: string]: { selectedOption: string; isSubmitted: boolean; isCorrect: boolean };
  }>(() => {
    try {
      return JSON.parse(localStorage.getItem("cs_exit_chapter_answers") || "{}");
    } catch (e) {
      return {};
    }
  });

  // Fetch from general progress notes on category switch
  useEffect(() => {
    setLocalNotes(progress.notes[selectedCategory] || "");
  }, [selectedCategory, progress.notes]);

  // Reset chapter step on category switch
  useEffect(() => {
    const savedCat = localStorage.getItem("cs_exit_study_notes_category");
    if (savedCat && savedCat !== selectedCategory) {
      setCurrentChapterIdx(0);
      localStorage.setItem("cs_exit_study_notes_chapter_idx", "0");
    }
    localStorage.setItem("cs_exit_study_notes_category", selectedCategory);
  }, [selectedCategory]);

  useEffect(() => {
    localStorage.setItem("cs_exit_study_notes_chapter_idx", String(currentChapterIdx));
  }, [currentChapterIdx]);

  // Persist answersState locally
  useEffect(() => {
    localStorage.setItem("cs_exit_chapter_answers", JSON.stringify(answersState));
  }, [answersState]);

  // Persist checkpoint answers locally
  useEffect(() => {
    localStorage.setItem("cs_exit_checkpoint_answers", JSON.stringify(checkpointAnswers));
  }, [checkpointAnswers]);

  // Get all detailed chapters for selected category
  const chapters = getDetailedNotesForCategory(selectedCategory);
  const activeChapter = chapters[currentChapterIdx] || chapters[0];

  // Get all seeded questions for this active category
  const chapterQuestions = SEEDED_QUESTIONS.filter(q => q.category === selectedCategory);

  const handleNotesChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setLocalNotes(e.target.value);
  };

  const handleSaveNotes = () => {
    const updatedNotes = { ...progress.notes, [selectedCategory]: localNotes };
    saveProgress({ ...progress, notes: updatedNotes });
    setIsSavedIndicator(true);
    setTimeout(() => {
      setIsSavedIndicator(false);
    }, 2000);
  };

  const toggleQuestionExpand = (qId: string) => {
    setExpandedQuestions(prev => ({ ...prev, [qId]: !prev[qId] }));
  };

  // Checkpoints input handles
  const handleSelectCheckpointOption = (chkId: string, optionLetter: string) => {
    if (checkpointAnswers[chkId]?.isSubmitted) return;
    setCheckpointAnswers(prev => ({
      ...prev,
      [chkId]: {
        ...(prev[chkId] || {}),
        selectedOption: optionLetter,
        isSubmitted: false,
        isCorrect: false
      }
    }));
  };

  const handleSubmitCheckpoint = (chkId: string, correctAnswer: string) => {
    const userAns = checkpointAnswers[chkId]?.selectedOption;
    if (!userAns) return;

    const correct = userAns === correctAnswer;
    setCheckpointAnswers(prev => ({
      ...prev,
      [chkId]: {
        selectedOption: userAns,
        isSubmitted: true,
        isCorrect: correct
      }
    }));

    // Reward points for checkpoint completion
    if (correct) {
      const category = selectedCategory;
      const currentCategoryScore = progress.categoryMastery[category] || 0;
      let newScore = Math.min(100, currentCategoryScore + 4);
      saveProgress({
        ...progress,
        categoryMastery: { ...progress.categoryMastery, [category]: newScore }
      });
    }
  };

  // Final exam pool answers handles
  const handleSelectOption = (qId: string, optionLetter: string) => {
    if (answersState[qId]?.isSubmitted) return;
    setAnswersState(prev => ({
      ...prev,
      [qId]: {
        ...(prev[qId] || {}),
        selectedOption: optionLetter,
        isSubmitted: false,
        isCorrect: false
      }
    }));
  };

  const handleSubmitAnswer = (question: Question) => {
    const userAns = answersState[question.id]?.selectedOption;
    if (!userAns) return;

    const correct = userAns === question.correctAnswer;
    
    setAnswersState(prev => ({
      ...prev,
      [question.id]: {
        selectedOption: userAns,
        isSubmitted: true,
        isCorrect: correct
      }
    }));

    const category = selectedCategory;
    const currentCategoryScore = progress.categoryMastery[category] || 0;
    let scoreDelta = correct ? 8 : -4;
    let newScore = Math.max(0, Math.min(100, currentCategoryScore + scoreDelta));

    saveProgress({
      ...progress,
      categoryMastery: { ...progress.categoryMastery, [category]: newScore }
    });
  };

  const handleResetAnswers = () => {
    const updatedAnswers = { ...answersState };
    chapterQuestions.forEach(q => {
      delete updatedAnswers[q.id];
    });
    setAnswersState(updatedAnswers);
  };

  const handleResetCheckpoints = () => {
    const updatedCheckpoints = { ...checkpointAnswers };
    chapters.forEach(ch => {
      ch.checkpointQuestions.forEach(chk => {
        delete updatedCheckpoints[chk.id];
      });
    });
    setCheckpointAnswers(updatedCheckpoints);
  };

  // Navigation handlers
  const handlePrevChapter = () => {
    if (currentChapterIdx > 0) {
      setCurrentChapterIdx(prev => prev - 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleNextChapter = () => {
    if (currentChapterIdx < chapters.length - 1) {
      setCurrentChapterIdx(prev => prev + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  // Final Pool Stats
  const poolTotal = chapterQuestions.length;
  const poolAnswered = chapterQuestions.filter(q => answersState[q.id]?.isSubmitted);
  const poolCorrect = chapterQuestions.filter(q => answersState[q.id]?.isSubmitted && answersState[q.id]?.isCorrect).length;
  const poolAccuracy = poolAnswered.length > 0 ? Math.round((poolCorrect / poolAnswered.length) * 100) : 0;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-8" id="study-notes-tab">
      
      {/* 1. Left Sidebar Chapter / Course selector */}
      <div className="lg:col-span-4 space-y-4">
        
        {/* Mobile Course Category dropdown selection */}
        <div className="lg:hidden glass p-4 rounded-3xl border border-white/5">
          <label className="block text-[10px] uppercase tracking-widest text-[#E0E0E0]/50 font-bold mb-2">
            Select Course Study Guide
          </label>
          <div className="relative">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full bg-black/40 border border-white/10 text-xs text-white p-3 rounded-xl appearance-none focus:outline-none focus:ring-1 focus:ring-[#F27D26] cursor-pointer font-semibold"
            >
              {categories.map((cat, idx) => {
                const totalQ = SEEDED_QUESTIONS.filter(q => q.category === cat).length;
                const doneQ = SEEDED_QUESTIONS.filter(q => q.category === cat && answersState[q.id]?.isSubmitted).length;
                return (
                  <option key={cat} value={cat} className="bg-[#0A0A0A] text-white">
                    {idx + 1}. {cat} ({doneQ}/{totalQ} prep)
                  </option>
                );
              })}
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-white/50">
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
        </div>

        {/* Desktop Course Listing */}
        <div className="hidden lg:block glass p-5 rounded-3xl border border-white/5">
          <h3 className="text-[10px] font-bold text-white/40 font-mono mb-4 uppercase tracking-widest">Select Subject Guide</h3>
          <div className="space-y-1.5 max-h-[70vh] overflow-y-auto pr-1" id="course-selector-list">
            {categories.map((cat, idx) => {
              const isSelected = selectedCategory === cat;
              const hasCustomNotes = progress.notes[cat]?.trim().length > 0;
              const totalQ = SEEDED_QUESTIONS.filter(q => q.category === cat).length;
              const completedQ = SEEDED_QUESTIONS.filter(q => q.category === cat && answersState[q.id]?.isSubmitted).length;
              
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`w-full flex flex-col p-3 rounded-xl text-left transition-all cursor-pointer ${
                    isSelected 
                      ? "bg-white/5 border border-white/10 text-white shadow-md shadow-black/40 scale-[1.01]" 
                      : "text-white/60 hover:text-white hover:bg-white/2"
                  }`}
                >
                  <div className="flex items-center justify-between w-full mb-1">
                    <span className="text-[11px] font-bold text-white/40 tracking-wider font-mono">SUBJECT {idx + 1}</span>
                    <span className="flex items-center space-x-1.5">
                      {hasCustomNotes && (
                        <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#F27D26]" title="Custom synthesis drafted" />
                      )}
                      <span className="text-[9px] text-white/40 bg-white/5 px-1.5 py-0.5 rounded-md font-mono">
                        {completedQ}/{totalQ} Q
                      </span>
                    </span>
                  </div>
                  <span className="text-xs font-semibold truncate w-full">{cat}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Multi-chapter progress indicator for selected course */}
        <div className="glass p-5 rounded-3xl border border-white/5 space-y-4">
          <span className="text-[10px] uppercase font-mono font-bold text-white/40 tracking-widest">Chapters Navigation</span>
          <div className="grid grid-cols-5 gap-1.5">
            {chapters.map((ch, index) => {
              const isCurrent = currentChapterIdx === index;
              const isCompleted = ch.checkpointQuestions.every(chk => checkpointAnswers[chk.id]?.isSubmitted);
              return (
                <button
                  key={ch.chapterId}
                  onClick={() => {
                    setCurrentChapterIdx(index);
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                  className={`py-2 rounded-lg text-center font-mono text-xs font-bold transition-all cursor-pointer border ${
                    isCurrent 
                      ? "bg-[#F27D26] text-black border-[#F27D26]" 
                      : isCompleted 
                        ? "bg-emerald-950/20 text-emerald-400 border-emerald-500/20" 
                        : "bg-white/3 text-white/60 border-white/5 hover:bg-white/5"
                  }`}
                  title={ch.title}
                >
                  C{index + 1}
                </button>
              );
            })}
          </div>
          <p className="text-[11px] text-white/45 leading-relaxed">
            Click on numbers to jump directly to any sub-chapter. Chapters with green borders have completed checkpoint questions.
          </p>
        </div>
      </div>

      {/* 2. Main Study Content Area */}
      <div className="lg:col-span-8 space-y-6">
        
        {/* Active Sub-Chapter Detail Content Card */}
        <div className="glass p-6 sm:p-8 rounded-3xl border border-white/5 space-y-6 relative overflow-hidden" id="active-chapter-card">
          <div className="absolute top-0 right-0 w-44 h-44 bg-gradient-to-br from-[#F27D26]/5 to-transparent rounded-full blur-3xl pointer-events-none" />

          {/* Stepper Header */}
          <div className="flex justify-between items-center pb-4 border-b border-white/5">
            <div className="flex items-center space-x-2">
              <Bookmark className="h-4 w-4 text-[#F27D26]" />
              <span className="text-[10px] uppercase tracking-widest font-mono font-bold text-[#F27D26]">
                Chapter {currentChapterIdx + 1} of {chapters.length}
              </span>
            </div>
            <span className="text-[9px] px-2.5 py-1 rounded-md bg-white/5 text-white/50 font-mono font-semibold">
              Course: {selectedCategory}
            </span>
          </div>

          {/* Title & Summary */}
          <div className="space-y-2">
            <h2 className="text-xl sm:text-2xl font-serif italic font-bold text-white tracking-tight">
              {activeChapter.title}
            </h2>
            <p className="text-white/60 text-xs sm:text-sm leading-relaxed">{activeChapter.summary}</p>
          </div>

          {/* In-depth content markdown parser */}
          <div className="prose prose-invert max-w-none text-white/80 text-xs sm:text-sm leading-relaxed space-y-4 pt-4 border-t border-white/5">
            {activeChapter.contentMarkdown?.split("\n\n").map((para, idx) => {
              if (para.trim().startsWith("#")) {
                const headerText = para.replace(/#/g, "").trim();
                return (
                  <h3 key={idx} className="text-sm sm:text-base font-serif italic font-bold text-white pt-3 border-b border-white/5 pb-1 flex items-center space-x-1.5">
                    <span className="inline-block w-1.5 h-4 bg-[#F27D26] rounded-sm mr-2" />
                    {headerText}
                  </h3>
                );
              }
              if (para.trim().startsWith("-") || para.trim().startsWith("*")) {
                const bulletList = para.split("\n").map(l => l.replace(/^[-*]\s+/, "").trim());
                return (
                  <ul key={idx} className="space-y-1.5 pl-2 text-white/70">
                    {bulletList.map((bu, bi) => (
                      <li key={bi} className="flex items-start space-x-1.5">
                        <span className="text-[#F27D26] mt-1.5 font-mono text-[8px] flex-shrink-0">•</span>
                        <span>{bu}</span>
                      </li>
                    ))}
                  </ul>
                );
              }
              if (para.trim().startsWith("```")) {
                const rawCode = para.replace(/```[a-z]*/g, "").trim();
                return (
                  <pre key={idx} className="bg-black/60 p-4 rounded-xl overflow-x-auto font-mono text-xs text-[#ff9e59] border border-white/5 leading-relaxed">
                    <code>{rawCode}</code>
                  </pre>
                );
              }
              return <p key={idx} className="leading-relaxed whitespace-pre-line">{para.trim()}</p>;
            })}
          </div>

          {/* Bulleted difficulty goals preview */}
          <div className="p-4 bg-white/2 rounded-2xl border border-white/5 space-y-2">
            <span className="text-[9px] uppercase font-bold text-white/50 font-mono tracking-widest block">Chapter Core Takeaways:</span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-white/70">
              <div className="flex items-center space-x-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#F27D26]" />
                <span>Traceable register side-effects</span>
              </div>
              <div className="flex items-center space-x-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#F27D26]" />
                <span>Distinguishing tricky operators</span>
              </div>
              <div className="flex items-center space-x-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#F27D26]" />
                <span>Memory mapping layouts</span>
              </div>
              <div className="flex items-center space-x-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#F27D26]" />
                <span>Trap distractor resolution</span>
              </div>
            </div>
          </div>
        </div>

        {/* 3. Checkpoint Questions: Displayed direct above Next / Prev chapter buttons */}
        {activeChapter.checkpointQuestions && activeChapter.checkpointQuestions.length > 0 && (
          <div className="glass p-6 sm:p-8 rounded-3xl border border-[#F27D26]/10 space-y-6 bg-gradient-to-b from-black/20 to-[#F27D26]/2">
            <div className="flex justify-between items-center pb-2 border-b border-white/5">
              <div className="flex items-center space-x-2">
                <HelpCircle className="h-4 w-4 text-[#F27D26] animate-pulse" />
                <h4 className="text-xs font-bold uppercase tracking-widest text-white">✨ Chapter Checkpoint challenge</h4>
              </div>
              <button
                onClick={handleResetCheckpoints}
                className="text-[9px] uppercase tracking-widest text-[#F27D26]/70 hover:text-[#F27D26] transition-all bg-transparent border-none cursor-pointer"
              >
                Reset Chapter Checks
              </button>
            </div>

            <p className="text-xs text-white/55 leading-relaxed">
              Verify your comprehension of Chapter {currentChapterIdx + 1} with these quick, targeted checkpoint questions before advancing to the next page of study guide notes.
            </p>

            <div className="space-y-6">
              {activeChapter.checkpointQuestions.map((chk, index) => {
                const chkState = checkpointAnswers[chk.id] || { selectedOption: "", isSubmitted: false, isCorrect: false };
                
                return (
                  <div key={chk.id} className="p-4 bg-black/35 rounded-2xl border border-white/5 space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono text-[#F27D26] font-bold">
                        Checkpoint Question {index + 1}
                      </span>
                      {chkState.isSubmitted && (
                        <span className={`text-[10px] font-bold uppercase tracking-wider ${chkState.isCorrect ? "text-emerald-400" : "text-red-400"}`}>
                          {chkState.isCorrect ? "PASSED MATCH" : "AT_RISK_TRAP"}
                        </span>
                      )}
                    </div>

                    <p className="text-xs font-semibold text-white leading-relaxed">
                      {chk.questionText}
                    </p>

                    <div className="grid grid-cols-1 gap-2">
                      {chk.options.map((opt, oIdx) => {
                        const letter = String.fromCharCode(65 + oIdx);
                        const isSelected = chkState.selectedOption === letter;

                        let style = "border-white/5 bg-white/2 text-white/80 hover:bg-white/5";
                        if (isSelected) {
                          style = "border-[#F27D26] bg-[#F27D26]/5 text-[#F27D26] ring-1 ring-[#F27D26]/20";
                        }

                        if (chkState.isSubmitted) {
                          if (letter === chk.correctAnswer) {
                            style = "border-emerald-500/40 bg-emerald-950/20 text-emerald-400 font-bold";
                          } else if (isSelected && letter !== chk.correctAnswer) {
                            style = "border-red-500/40 bg-red-950/20 text-red-500";
                          } else {
                            style = "opacity-40 border-white/5 bg-white/1";
                          }
                        }

                        return (
                          <button
                            key={letter}
                            disabled={chkState.isSubmitted}
                            onClick={() => handleSelectCheckpointOption(chk.id, letter)}
                            className={`w-full flex items-start space-x-2.5 p-3 rounded-xl border text-left text-xs transition-all cursor-pointer ${style}`}
                          >
                            <span className={`w-5 h-5 rounded flex items-center justify-center font-mono text-[9px] font-bold flex-shrink-0 ${isSelected ? "bg-[#F27D26] text-black" : "bg-white/5 text-white/50"}`}>
                              {letter}
                            </span>
                            <span className="leading-relaxed">{opt}</span>
                          </button>
                        );
                      })}
                    </div>

                    {!chkState.isSubmitted ? (
                      <div className="flex justify-end pt-1">
                        <button
                          onClick={() => handleSubmitCheckpoint(chk.id, chk.correctAnswer)}
                          disabled={!chkState.selectedOption}
                          className="px-4 py-1.5 bg-[#F27D26] hover:bg-[#ff9e59] text-black font-bold rounded-lg text-[10px] uppercase shadow disabled:opacity-40 disabled:pointer-events-none transition-all cursor-pointer"
                        >
                          Submit Verification
                        </button>
                      </div>
                    ) : (
                      <div className="pt-2.5 border-t border-white/5 text-[11px] text-white/60 leading-relaxed bg-[#0F0F0F]/45 p-3 rounded-xl">
                        <span className="font-bold text-[#F27D26] block uppercase tracking-wider text-[8px] mb-1 font-mono">CONGRUENCE JUSTIFICATION</span>
                        {chk.explanation}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* 4. Previous and Next buttons (Walk page-by-page) */}
        <div className="flex items-center justify-between pt-4 pb-2">
          <button
            onClick={handlePrevChapter}
            disabled={currentChapterIdx === 0}
            className="px-4 py-3 bg-white/5 border border-white/10 hover:bg-white/8 text-white rounded-xl text-xs font-bold leading-none flex items-center space-x-2 cursor-pointer disabled:opacity-30 disabled:pointer-events-none transition-all"
          >
            <ChevronLeft className="h-4 w-4" />
            <span>Previous Chapter</span>
          </button>

          <span className="text-xs text-white/40 font-mono">
            {currentChapterIdx + 1} of {chapters.length}
          </span>

          <button
            onClick={handleNextChapter}
            disabled={currentChapterIdx === chapters.length - 1}
            className="px-4 py-3 bg-[#F27D26] hover:bg-[#ff9e59] text-black rounded-xl text-xs font-bold leading-none flex items-center space-x-2 cursor-pointer disabled:opacity-30 disabled:pointer-events-none transition-all"
          >
            <span>Next Chapter</span>
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>

        {/* 5. Custom Study Synthesis notes */}
        <div className="glass p-6 sm:p-8 rounded-3xl border border-white/5 space-y-4">
          <div className="flex justify-between items-center pb-2 border-b border-white/5">
            <div className="flex items-center space-x-2">
              <BookOpen className="h-4 w-4 text-[#F27D26]" />
              <h4 className="text-xs font-bold uppercase tracking-widest text-white">Active Synthesis Annotations</h4>
            </div>
            <span className="text-[8px] uppercase tracking-widest text-[#F27D26] bg-[#F27D26]/5 border border-[#F27D26]/10 px-2.5 py-1 rounded-lg font-bold">Auto-Persisted</span>
          </div>

          <p className="text-xs text-white/50 leading-relaxed">
            Record definitions, acronym keys, pseudocode tracing paths, and personal notes about <strong>{selectedCategory}</strong> below.
          </p>

          <textarea
            value={localNotes}
            onChange={handleNotesChange}
            placeholder={`Synthesize active concepts about ${selectedCategory} (e.g. key equations, tricky compiler terms, or specific questions you got wrong)...`}
            className="w-full h-32 p-4 bg-black/45 text-xs text-white rounded-2xl border border-white/5 focus:outline-none focus:ring-1 focus:ring-[#F27D26] font-mono leading-relaxed"
          />

          <div className="flex justify-end">
            <button
              onClick={handleSaveNotes}
              className={`px-5 py-2 rounded-full text-xs font-bold flex items-center space-x-2 hover:scale-105 transition-all cursor-pointer ${
                isSavedIndicator 
                  ? "bg-emerald-600 text-white" 
                  : "bg-[#F27D26] text-black hover:bg-[#ff9e59]"
              }`}
            >
              {isSavedIndicator ? <Check className="h-4 w-4" /> : <PlusCircle className="h-4 w-4" />}
              <span>{isSavedIndicator ? "Saved Successfully!" : "Save Course Note"}</span>
            </button>
          </div>
        </div>

        {/* 6. End of Course Comprehensive Exam Assessment Pool ("a whole bunch of different questions in that part.") */}
        <div className="space-y-4 pt-4">
          <div className="flex items-center justify-between pb-2 border-b border-white/5">
            <div className="space-y-1">
              <div className="flex items-center space-x-2">
                <Award className="h-5 w-5 text-[#F27D26]" />
                <h3 className="text-base font-serif italic font-bold text-white">Comprehensive End-of-Course assessment pool</h3>
              </div>
              <p className="text-xs text-white/50">Simulate official national exit questions for all covered topics in {selectedCategory}.</p>
            </div>
            
            {poolAnswered.length > 0 && (
              <button 
                onClick={handleResetAnswers}
                className="text-[9px] uppercase tracking-widest font-bold text-[#F27D26] hover:text-[#ff9e59] underline cursor-pointer bg-transparent border-none"
              >
                Reset Assessment
              </button>
            )}
          </div>

          {/* Core Stat Grid */}
          {poolTotal > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 glass rounded-3xl border border-white/5 bg-[#121212]/35">
              <div className="space-y-0.5 text-center sm:text-left">
                <span className="text-[9px] font-mono font-bold text-white/40 uppercase tracking-widest">PROGRESS STATUS</span>
                <p className="text-base font-bold font-serif italic text-white leading-none">
                  {poolAnswered.length} / {poolTotal} <span className="text-[10px] font-sans not-italic text-white/45">Completed</span>
                </p>
              </div>
              <div className="space-y-0.5 text-center sm:text-left">
                <span className="text-[9px] font-mono font-bold text-white/40 uppercase tracking-widest">VERIFIED CORRECT</span>
                <p className="text-base font-bold text-emerald-400 leading-none">
                  {poolCorrect} <span className="text-[10px] font-sans text-white/45">items</span>
                </p>
              </div>
              <div className="space-y-0.5 text-center sm:text-left">
                <span className="text-[9px] font-mono font-bold text-white/40 uppercase tracking-widest">AT RISK ATTEMPTS</span>
                <p className="text-base font-bold text-red-400 leading-none">
                  {poolAnswered.length - poolCorrect} <span className="text-[10px] font-sans text-white/45">items</span>
                </p>
              </div>
              <div className="space-y-0.5 text-center sm:text-left">
                <span className="text-[9px] font-mono font-bold text-white/40 uppercase tracking-widest">POOL ACCURACY</span>
                <p className="text-base font-bold text-[#F27D26] leading-none">
                  {poolAccuracy}%
                </p>
              </div>
            </div>
          ) : (
            <p className="text-xs text-white/45 text-center py-6 glass rounded-2xl border border-dashed border-white/10">
              No specific static pool items mapped to this category. Choose another topic!
            </p>
          )}

          {/* Pool questions lists */}
          <div className="space-y-4" id="chapter-assessment-questions">
            {chapterQuestions.map((question, qIdx) => {
              const qState = answersState[question.id] || { selectedOption: "", isSubmitted: false, isCorrect: false };
              const isQuestionsExpanded = expandedQuestions[question.id] ?? false; // Default collapsed for the grand final pool
              
              return (
                <div 
                  key={question.id}
                  className={`glass rounded-2xl border transition-all ${
                    qState.isSubmitted 
                      ? qState.isCorrect 
                        ? "border-emerald-500/15 bg-emerald-950/2" 
                        : "border-red-500/15 bg-red-950/2"
                      : "border-white/5 hover:border-white/10"
                  }`}
                >
                  {/* Accordion Trigger */}
                  <div 
                    onClick={() => toggleQuestionExpand(question.id)}
                    className="flex justify-between items-center p-4 cursor-pointer select-none"
                  >
                    <div className="flex items-center space-x-3 truncate">
                      <span className="text-[10px] uppercase font-mono font-bold text-white/45">
                        Exam Pool Item {qIdx + 1}
                      </span>
                      <span className="text-[9px] px-2 py-0.5 rounded bg-white/5 text-white/60 font-mono uppercase tracking-wider font-semibold">
                        {question.difficulty}
                      </span>
                      <span className="text-[9px] px-1.5 py-0.5 rounded bg-[#F27D26]/10 text-[#F27D26] font-mono max-w-[120px] truncate">
                        {question.source}
                      </span>
                    </div>

                    <div className="flex items-center space-x-2">
                      {qState.isSubmitted && (
                        <span className={`text-[10px] font-bold uppercase tracking-wider flex items-center space-x-0.5 ${qState.isCorrect ? "text-emerald-400" : "text-red-400"}`}>
                          {qState.isCorrect ? <CheckCircle className="h-3.5 w-3.5 inline mr-1" /> : <XCircle className="h-3.5 w-3.5 inline mr-1" />}
                          {qState.isCorrect ? "Correct" : "Incorrect"}
                        </span>
                      )}
                      
                      {isQuestionsExpanded ? <ChevronUp className="h-4 w-4 text-white/40" /> : <ChevronDown className="h-4 w-4 text-white/40" />}
                    </div>
                  </div>

                  {/* Question parameters card */}
                  {isQuestionsExpanded && (
                    <div className="p-5 sm:p-6 space-y-5 border-t border-white/5">
                      {/* Text */}
                      <p className="text-xs sm:text-sm font-semibold leading-relaxed text-white">
                        {question.questionText}
                      </p>

                      {/* Code block optional */}
                      {question.codeSnippet && (
                        <pre className="bg-black/60 p-4 rounded-xl border border-white/5 font-mono text-[11px] overflow-x-auto text-[#ff9e59] leading-relaxed">
                          <code>{question.codeSnippet}</code>
                        </pre>
                      )}

                      {/* Options selects */}
                      <div className="space-y-2">
                        {question.options?.map((opt, oIdx) => {
                          const optionLetter = String.fromCharCode(65 + oIdx);
                          const isOptionSelected = qState.selectedOption === optionLetter;
                          
                          let optStyle = "border-white/5 bg-white/3 text-white/80 hover:bg-white/5";
                          
                          if (isOptionSelected) {
                            optStyle = "border-[#F27D26] bg-[#F27D26]/5 text-white ring-1 ring-[#F27D26]/30";
                          }

                          if (qState.isSubmitted) {
                            if (optionLetter === question.correctAnswer) {
                              optStyle = "border-emerald-500/40 bg-emerald-950/15 text-emerald-400 font-bold ring-1 ring-emerald-500/20";
                            } else if (isOptionSelected && optionLetter !== question.correctAnswer) {
                              optStyle = "border-red-500/40 bg-red-950/15 text-red-400 ring-1 ring-red-500/20";
                            } else {
                              optStyle = "opacity-45 border-white/5";
                            }
                          }

                          return (
                            <button
                              key={optionLetter}
                              disabled={qState.isSubmitted}
                              onClick={() => handleSelectOption(question.id, optionLetter)}
                              className={`w-full flex items-start space-x-3 p-3.5 rounded-xl border text-left text-xs font-semibold tracking-wide transition-all min-h-[44px] cursor-pointer ${optStyle}`}
                            >
                              <span className={`w-5 h-5 rounded flex items-center justify-center font-mono text-[9px] font-bold flex-shrink-0 select-none ${isOptionSelected ? "bg-[#F27D26] text-black" : "bg-white/5 text-white/60"}`}>
                                {optionLetter}
                              </span>
                              <span className="flex-1 leading-relaxed">{opt}</span>
                            </button>
                          );
                        })}
                      </div>

                      {/* Submission actions & detailed justifications */}
                      {!qState.isSubmitted ? (
                        <div className="flex justify-end pt-2">
                          <button
                            onClick={() => handleSubmitAnswer(question)}
                            disabled={!qState.selectedOption}
                            className="px-5 py-2 bg-[#F27D26] hover:bg-[#ff9e59] text-black font-bold rounded-full text-xs shadow-md disabled:opacity-40 disabled:pointer-events-none transition-all cursor-pointer"
                          >
                            Verify Choice
                          </button>
                        </div>
                      ) : (
                        <div className="space-y-4 pt-4 border-t border-white/5 transition-all">
                          {/* Explanations block */}
                          <div className="space-y-2">
                            <span className="text-[9px] uppercase font-bold text-[#F27D26] font-mono tracking-widest block pb-1 border-b border-white/5">
                              CONCEPT UNPACKED
                            </span>
                            <p className="text-xs text-white/80 leading-relaxed whitespace-pre-line">
                              {question.explanation}
                            </p>
                          </div>

                          {/* Trap Distractor parameters */}
                          {question.wrongOptionsExplanation && (
                            <div className="space-y-2 pt-1">
                              <span className="text-[9px] uppercase font-bold text-white/40 font-mono tracking-widest block pb-1 border-b border-white/5">
                                DISTRACTOR MECHANICS MAPPED
                              </span>
                              <div className="space-y-2">
                                {Object.keys(question.wrongOptionsExplanation).map((optKey) => (
                                  <div key={optKey} className="text-[11px] text-white/70 bg-white/2 p-2.5 rounded-xl border border-white/5 leading-relaxed">
                                    <span className="font-mono font-bold text-[#F27D26] mr-1.5">Option {optKey}:</span>
                                    {question.wrongOptionsExplanation![optKey]}
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}

                          {/* Ask AI tutor directly for deep guidance */}
                          <div className="flex justify-start pt-2">
                            <button
                              onClick={() => onAskTutor(question)}
                              className="px-4 py-2 bg-white/5 text-[#F27D26] border border-[#F27D26]/10 hover:bg-white/8 text-xs font-bold rounded-full flex items-center space-x-1.5 cursor-pointer transition-transform hover:scale-103"
                            >
                              <MessageSquare className="h-3.5 w-3.5 animate-pulse" />
                              <span>Clarify With Tutor</span>
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

      </div>

    </div>
  );
}
