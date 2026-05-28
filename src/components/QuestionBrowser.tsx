import React, { useState, useEffect, useMemo } from "react";
import { 
  Search, 
  Bookmark, 
  HelpCircle, 
  MessageSquare, 
  CheckCircle, 
  XCircle, 
  ChevronLeft, 
  ChevronRight, 
  Filter, 
  RefreshCw,
  Award,
  ChevronDown,
  ChevronUp
} from "lucide-react";
import { Question, StudentProgress, QuestionType, Difficulty } from "../types";
import { SEEDED_QUESTIONS } from "../questionsData";

interface QuestionBrowserProps {
  progress: StudentProgress;
  saveProgress: (progress: StudentProgress) => void;
  onAskTutor: (question: Question) => void;
  setActiveTab: (tab: string) => void;
}

export default function QuestionBrowser({ progress, saveProgress, onAskTutor, setActiveTab }: QuestionBrowserProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedDifficulty, setSelectedDifficulty] = useState("All");
  const [selectedType, setSelectedType] = useState("All");
  const [selectedSource, setSelectedSource] = useState("All");
  const [showBookmarksOnly, setShowBookmarksOnly] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [questionsPerPage] = useState(10);
  const [expandedQuestions, setExpandedQuestions] = useState<{ [qId: string]: boolean }>({});

  // Local state to track correctness of attempted questions inside the session
  const [attempts, setAttempts] = useState<{
    [qId: string]: { selectedOption: string; isSubmitted: boolean; isCorrect: boolean };
  }>(() => {
    try {
      const saved = localStorage.getItem("cs_exit_browser_attempts");
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  useEffect(() => {
    localStorage.setItem("cs_exit_browser_attempts", JSON.stringify(attempts));
  }, [attempts]);

  // Extract unique categories, sources, and types from seeded questions
  const categories = useMemo(() => {
    const list = new Set(SEEDED_QUESTIONS.map(q => q.category));
    return ["All", ...Array.from(list)];
  }, []);

  const sources = useMemo(() => {
    const list = new Set(SEEDED_QUESTIONS.map(q => q.source));
    return ["All", ...Array.from(list)];
  }, []);

  const types = useMemo(() => {
    const list = new Set(SEEDED_QUESTIONS.map(q => q.type));
    return ["All", ...Array.from(list)];
  }, []);

  // Filtered Questions Logic
  const filteredQuestions = useMemo(() => {
    return SEEDED_QUESTIONS.filter(q => {
      const matchesSearch = 
        q.questionText.toLowerCase().includes(searchQuery.toLowerCase()) ||
        q.explanation.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (q.codeSnippet && q.codeSnippet.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (q.relatedConcepts && q.relatedConcepts.some(c => c.toLowerCase().includes(searchQuery.toLowerCase())));

      const matchesCategory = selectedCategory === "All" || q.category === selectedCategory;
      const matchesDifficulty = selectedDifficulty === "All" || q.difficulty === selectedDifficulty;
      const matchesType = selectedType === "All" || q.type === selectedType;
      const matchesSource = selectedSource === "All" || q.source === selectedSource;
      const matchesBookmark = !showBookmarksOnly || (progress.savedQuestions && progress.savedQuestions.includes(q.id));

      return matchesSearch && matchesCategory && matchesDifficulty && matchesType && matchesSource && matchesBookmark;
    });
  }, [searchQuery, selectedCategory, selectedDifficulty, selectedType, selectedSource, showBookmarksOnly, progress.savedQuestions]);

  // Pagination Logic
  useEffect(() => {
    setCurrentPage(1);
    setExpandedQuestions({});
  }, [searchQuery, selectedCategory, selectedDifficulty, selectedType, selectedSource, showBookmarksOnly]);

  const paginatedQuestions = useMemo(() => {
    const startIndex = (currentPage - 1) * questionsPerPage;
    return filteredQuestions.slice(startIndex, startIndex + questionsPerPage);
  }, [filteredQuestions, currentPage, questionsPerPage]);

  const totalPages = Math.ceil(filteredQuestions.length / questionsPerPage);

  // Toggle saving/bookmarking a question
  const toggleBookmark = (qId: string) => {
    const saved = [...(progress.savedQuestions || [])];
    const index = saved.indexOf(qId);
    if (index > -1) {
      saved.splice(index, 1);
    } else {
      saved.push(qId);
    }
    saveProgress({
      ...progress,
      savedQuestions: saved
    });
  };

  const handleSelectOption = (qId: string, optionLetter: string) => {
    if (attempts[qId]?.isSubmitted) return;
    setAttempts(prev => ({
      ...prev,
      [qId]: {
        ...prev[qId],
        selectedOption: optionLetter,
        isSubmitted: false,
        isCorrect: false
      }
    }));
  };

  const handleSubmitAnswer = (question: Question) => {
    const attempt = attempts[question.id];
    if (!attempt || !attempt.selectedOption) return;

    const isCorrect = attempt.selectedOption === question.correctAnswer;
    setAttempts(prev => ({
      ...prev,
      [question.id]: {
        ...prev[question.id],
        isSubmitted: true,
        isCorrect
      }
    }));

    // Reward/deduct mastery score delta conditionally
    const currentCategoryScore = progress.categoryMastery[question.category] || 0;
    const delta = isCorrect ? 5 : -2;
    const newScore = Math.max(0, Math.min(100, currentCategoryScore + delta));

    saveProgress({
      ...progress,
      categoryMastery: {
        ...progress.categoryMastery,
        [question.category]: newScore
      }
    });

    // Automatically expand detailed explanations upon submission
    setExpandedQuestions(prev => ({ ...prev, [question.id]: true }));
  };

  const resetAllAttempts = () => {
    if (window.confirm("Are you sure you want to clear your local answers for this search session?")) {
      setAttempts({});
    }
  };

  const toggleQuestionExpand = (qId: string) => {
    setExpandedQuestions(prev => ({ ...prev, [qId]: !prev[qId] }));
  };

  return (
    <div className="space-y-6" id="comprehensive-question-browser">
      
      {/* Header Block */}
      <section className="glass p-6 sm:p-8 rounded-3xl border border-white/5 bg-gradient-to-br from-[#0A0A0A] to-[#141414]">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="inline-flex items-center space-x-2 bg-[#F27D26]/10 text-[#F27D26] py-1 px-3 border border-[#F27D26]/10 rounded-full text-[10px] font-mono font-semibold tracking-widest">
              <Award className="h-3.5 w-3.5" />
              <span>MoE / AAU COMPLETE COMPILATION</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-serif italic font-bold text-white tracking-tight">
              Curriculum Questions Broker
            </h1>
            <p className="text-xs text-white/50 max-w-2xl">
              Browse, search, filter, and practice with our comprehensive repository containing every single question seeded from standard textbook guides, preps, and past national computer science licensure examinations.
            </p>
          </div>
          <div>
            <button
              onClick={resetAllAttempts}
              className="text-xs flex items-center space-x-2 px-4 py-2 border border-white/10 hover:border-[#F27D26]/30 text-white/70 hover:text-white rounded-xl bg-white/5 transition-all cursor-pointer"
            >
              <RefreshCw className="h-3.5 w-3.5" />
              <span>Reset Practice Answers</span>
            </button>
          </div>
        </div>
      </section>

      {/* Bento Query Filter Dashboard */}
      <section className="p-6 glass rounded-3xl border border-white/5 space-y-4">
        <div className="flex items-center space-x-2 pb-2 border-b border-white/5">
          <Filter className="h-4 w-4 text-[#F27D26]" />
          <h2 className="text-xs font-mono uppercase font-bold text-white tracking-widest">Query and Filter Filters</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
          
          {/* Main Search Input */}
          <div className="md:col-span-6 relative">
            <label className="block text-[9px] uppercase tracking-widest text-[#E0E0E0]/40 font-bold mb-1.5 font-mono">
              Search Question or Key phrase
            </label>
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="Search keywords, concept tags, definitions, code blocks..."
                className="w-full bg-black/40 border border-white/10 text-xs text-white pl-10 pr-4 py-3 rounded-xl focus:outline-none focus:ring-1 focus:ring-[#F27D26] font-semibold"
              />
              <Search className="absolute left-3.5 top-3.5 h-4 w-4 text-white/30" />
            </div>
          </div>

          {/* Category Dropdown */}
          <div className="md:col-span-3">
            <label className="block text-[9px] uppercase tracking-widest text-[#E0E0E0]/40 font-bold mb-1.5 font-mono">
              Curriculum Core Subject
            </label>
            <select
              value={selectedCategory}
              onChange={e => setSelectedCategory(e.target.value)}
              className="w-full bg-black/40 border border-white/10 text-xs text-white p-3 rounded-xl focus:outline-none focus:ring-1 focus:ring-[#F27D26] font-semibold cursor-pointer"
            >
              {categories.map(cat => (
                <option key={cat} value={cat} className="bg-[#0A0A0A] text-white">
                  {cat === "All" ? "All Subjects" : cat}
                </option>
              ))}
            </select>
          </div>

          {/* Difficulty Dropdown */}
          <div className="md:col-span-3">
            <label className="block text-[9px] uppercase tracking-widest text-[#E0E0E0]/40 font-bold mb-1.5 font-mono">
              Difficulty Bracket
            </label>
            <select
              value={selectedDifficulty}
              onChange={e => setSelectedDifficulty(e.target.value)}
              className="w-full bg-black/40 border border-white/10 text-xs text-white p-3 rounded-xl focus:outline-none focus:ring-1 focus:ring-[#F27D26] font-semibold cursor-pointer"
            >
              <option value="All" className="bg-[#0A0A0A] text-white">All Difficulties</option>
              {Object.values(Difficulty).map(diff => (
                <option key={diff} value={diff} className="bg-[#0A0A0A] text-white">{diff}</option>
              ))}
            </select>
          </div>

        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 pt-2">
          
          {/* Question Type Filter selector */}
          <div className="md:col-span-4">
            <label className="block text-[9px] uppercase tracking-widest text-[#E0E0E0]/40 font-bold mb-1.5 font-mono">
              Question Format Type
            </label>
            <select
              value={selectedType}
              onChange={e => setSelectedType(e.target.value)}
              className="w-full bg-black/40 border border-white/10 text-xs text-white p-3 rounded-xl focus:outline-none focus:ring-1 focus:ring-[#F27D26] font-semibold cursor-pointer"
            >
              {types.map(t => (
                <option key={t} value={t} className="bg-[#0A0A0A] text-white">
                  {t === "All" ? "All Formats" : t}
                </option>
              ))}
            </select>
          </div>

          {/* Test Source Filter selector */}
          <div className="md:col-span-4">
            <label className="block text-[9px] uppercase tracking-widest text-[#E0E0E0]/40 font-bold mb-1.5 font-mono">
              Authentic Target Source
            </label>
            <select
              value={selectedSource}
              onChange={e => setSelectedSource(e.target.value)}
              className="w-full bg-black/40 border border-white/10 text-xs text-white p-3 rounded-xl focus:outline-none focus:ring-1 focus:ring-[#F27D26] font-semibold cursor-pointer"
            >
              {sources.map(src => (
                <option key={src} value={src} className="bg-[#0A0A0A] text-white">
                  {src === "All" ? "All Exam Papers" : src}
                </option>
              ))}
            </select>
          </div>

          {/* Bookmark Switcher */}
          <div className="md:col-span-4 flex items-end">
            <button
              onClick={() => setShowBookmarksOnly(prev => !prev)}
              className={`w-full flex items-center justify-between p-3 rounded-xl border text-xs font-semibold cursor-pointer transition-all duration-250 ${
                showBookmarksOnly
                  ? "bg-[#F27D26]/10 border-[#F27D26] text-white"
                  : "bg-black/40 border-white/10 text-white/50 hover:text-white"
              }`}
            >
              <span className="flex items-center space-x-2">
                <Bookmark className={`h-4 w-4 ${showBookmarksOnly ? "text-[#F27D26] fill-[#F27D26]" : ""}`} />
                <span>Show Bookmarked Only</span>
              </span>
              <span className="text-[10px] px-2 py-0.5 rounded-md bg-white/5 font-mono font-bold">
                {progress.savedQuestions?.length || 0} Saved
              </span>
            </button>
          </div>

        </div>
      </section>

      {/* Query stats message */}
      <div className="flex items-center justify-between px-2 text-[11px] font-mono text-white/40">
        <span>Showing {filteredQuestions.length === 0 ? 0 : (currentPage - 1) * questionsPerPage + 1} - {Math.min(currentPage * questionsPerPage, filteredQuestions.length)} of {filteredQuestions.length} queries matched</span>
        {totalPages > 1 && (
          <span>Page {currentPage} of {totalPages}</span>
        )}
      </div>

      {/* Questions Stack Grid */}
      <div className="space-y-4">
        {paginatedQuestions.length > 0 ? (
          paginatedQuestions.map((question, idx) => {
            const qState = attempts[question.id] || { selectedOption: "", isSubmitted: false, isCorrect: false };
            const isSaved = progress.savedQuestions && progress.savedQuestions.includes(question.id);
            const isExpanded = expandedQuestions[question.id] || false;
            const seqIndex = (currentPage - 1) * questionsPerPage + idx + 1;

            return (
              <div 
                key={question.id}
                className={`glass rounded-2xl border transition-all duration-300 ${
                  qState.isSubmitted 
                    ? qState.isCorrect 
                      ? "border-emerald-500/20 bg-emerald-950/2" 
                      : "border-red-500/20 bg-red-950/2"
                    : "border-white/5 hover:border-white/10"
                }`}
              >
                {/* Header Row */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 border-b border-white/5 bg-white/1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-[10px] font-mono font-bold text-white/40">
                      #{seqIndex}
                    </span>
                    <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-white/5 text-white/60 font-mono font-semibold uppercase">
                      {question.category}
                    </span>
                    <span className={`text-[10px] px-2.5 py-0.5 rounded-full font-mono font-semibold uppercase ${
                      question.difficulty === Difficulty.Easy 
                        ? "bg-emerald-950/20 text-emerald-400" 
                        : question.difficulty === Difficulty.Medium 
                          ? "bg-amber-950/20 text-amber-400" 
                          : "bg-red-950/20 text-red-400"
                    }`}>
                      {question.difficulty}
                    </span>
                    <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-white/5 text-white/45 font-serif italic">
                      {question.source}
                    </span>
                  </div>

                  <div className="flex items-center space-x-2 self-end sm:self-auto">
                    {/* Bookmark Toggle Icon */}
                    <button
                      onClick={() => toggleBookmark(question.id)}
                      className={`p-2 rounded-xl transition-all cursor-pointer ${
                        isSaved 
                          ? "bg-[#F27D26]/10 text-[#F27D26] hover:scale-105" 
                          : "hover:bg-white/5 text-white/30 hover:text-white"
                      }`}
                      title={isSaved ? "Remove from Saved Repository" : "Bookmark this question"}
                    >
                      <Bookmark className={`h-4.5 w-4.5 ${isSaved ? "fill-[#F27D26]" : ""}`} />
                    </button>
                    {/* Collapsed/Expanded Toggle */}
                    <button
                      onClick={() => toggleQuestionExpand(question.id)}
                      className="p-2 rounded-xl hover:bg-white/5 text-white/40 hover:text-white"
                    >
                      {isExpanded ? <ChevronUp className="h-4.5 w-4.5" /> : <ChevronDown className="h-4.5 w-4.5" />}
                    </button>
                  </div>
                </div>

                {/* Content Block */}
                {isExpanded ? (
                  <div className="p-6 space-y-6">
                    {/* Main Question Text */}
                    <div className="space-y-2">
                      <p className="text-[13px] sm:text-[14px] font-serif italic text-white/90 leading-relaxed font-semibold">
                        {question.questionText}
                      </p>
                      
                      {/* Optional Code block snippet */}
                      {question.codeSnippet && (
                        <pre className="bg-black/60 p-4 rounded-xl border border-white/5 font-mono text-[11px] overflow-x-auto text-[#ff9e59] leading-relaxed">
                          <code>{question.codeSnippet}</code>
                        </pre>
                      )}
                    </div>

                    {/* Option Choices rendering */}
                    {question.options && question.options.length > 0 ? (
                      <div className="grid grid-cols-1 gap-2.5">
                        {question.options.map((opt, oIdx) => {
                          const letter = String.fromCharCode(65 + oIdx);
                          const isSelected = qState.selectedOption === letter;

                          let style = "border-white/5 bg-white/2 text-white/80 hover:bg-white/5";
                          if (isSelected) {
                            style = "border-[#F27D26] bg-[#F27D26]/5 text-white ring-1 ring-[#F27D26]/20";
                          }

                          if (qState.isSubmitted) {
                            if (letter === question.correctAnswer) {
                              style = "border-emerald-500/40 bg-emerald-950/20 text-emerald-400 font-bold ring-1 ring-emerald-500/20";
                            } else if (isSelected) {
                              style = "border-red-500/40 bg-red-950/15 text-red-400";
                            } else {
                              style = "opacity-40 border-white/5 bg-transparent";
                            }
                          }

                          return (
                            <button
                              key={letter}
                              disabled={qState.isSubmitted}
                              onClick={() => handleSelectOption(question.id, letter)}
                              className={`w-full flex items-start space-x-3 p-3.5 rounded-xl border text-left text-xs font-semibold tracking-wide transition-all min-h-[44px] cursor-pointer ${style}`}
                            >
                              <span className={`w-5.5 h-5.5 rounded flex items-center justify-center font-mono text-[9px] font-extrabold flex-shrink-0 select-none ${
                                isSelected ? "bg-[#F27D26] text-black" : "bg-white/5 text-white/50"
                              }`}>
                                {letter}
                              </span>
                              <span className="flex-1 leading-relaxed">{opt}</span>
                            </button>
                          );
                        })}
                      </div>
                    ) : (
                      // Handle Non-MCQ inputs if any
                      <div className="p-3 bg-white/5 rounded-xl text-xs text-white/50">
                        Solve this Question on standard Timed Mock Exams module.
                      </div>
                    )}

                    {/* Footer query action panels */}
                    {!qState.isSubmitted ? (
                      <div className="flex justify-end pt-2">
                        <button
                          onClick={() => handleSubmitAnswer(question)}
                          disabled={!qState.selectedOption}
                          className="px-6 py-2.5 bg-[#F27D26] hover:bg-[#ff9e59] text-black font-extrabold rounded-full text-xs shadow-md disabled:opacity-40 disabled:pointer-events-none transition-all cursor-pointer"
                        >
                          Verify Practice Choice
                        </button>
                      </div>
                    ) : (
                      // Post Submission explanations
                      <div className="space-y-4 pt-4 border-t border-white/10 transition-all duration-300">
                        
                        <div className="p-4 bg-[#0F0F0F] rounded-2xl border border-white/5 space-y-2">
                          <div className="flex items-center space-x-2">
                            {qState.isCorrect ? (
                              <CheckCircle className="h-4 w-4 text-emerald-400" />
                            ) : (
                              <XCircle className="h-4 w-4 text-red-400" />
                            )}
                            <span className={`text-[10px] font-mono font-bold uppercase tracking-wider ${
                              qState.isCorrect ? "text-emerald-400" : "text-red-400"
                            }`}>
                              {qState.isCorrect ? "Dynamic match passed" : "Incorrect study choice"}
                            </span>
                          </div>
                          
                          <p className="text-[11px] uppercase tracking-widest text-[#F27D26]/70 font-bold font-mono pt-1">
                            Rationale / Theory Unlocked
                          </p>
                          <p className="text-xs text-white/80 leading-relaxed whitespace-pre-line">
                            {question.explanation}
                          </p>
                        </div>

                        {/* Wrong choice mappings */}
                        {question.wrongOptionsExplanation && (
                          <div className="space-y-2">
                            <span className="text-[9px] uppercase font-bold text-white/40 font-mono tracking-widest block pb-1 border-b border-white/5">
                              DISTRACTOR PATTERNS IDENTIFIED
                            </span>
                            <div className="space-y-2">
                              {Object.entries(question.wrongOptionsExplanation).map(([optLetter, desc]) => (
                                <div key={optLetter} className="text-[10px] text-white/60 bg-white/2 p-2.5 rounded-xl border border-white/5 leading-relaxed">
                                  <span className="font-mono font-extrabold text-[#F27D26] mr-1">Option {optLetter}:</span> {desc}
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Ask AI tutor directly for help with the question */}
                        <div className="flex items-center space-x-3 pt-2">
                          <button
                            onClick={() => onAskTutor(question)}
                            className="px-4 py-2 bg-white/5 text-[#F27D26] border border-[#F27D26]/10 hover:bg-white/10 text-xs font-bold rounded-full flex items-center space-x-1.5 cursor-pointer transition-transform hover:scale-103"
                          >
                            <MessageSquare className="h-3.5 w-3.5 animate-pulse" />
                            <span>Clarify with AI Tutor</span>
                          </button>
                          <span className="text-[10px] text-white/45">Bypasses context mapping straight to Tutor Assistant</span>
                        </div>

                      </div>
                    )}
                  </div>
                ) : (
                  // Collapsed card overview
                  <div 
                    onClick={() => toggleQuestionExpand(question.id)}
                    className="p-4 flex items-center justify-between text-xs cursor-pointer select-none hover:bg-white/2"
                  >
                    <p className="font-semibold text-white/80 line-clamp-1 flex-1 pr-6">
                      {question.questionText}
                    </p>
                    {qState.isSubmitted && (
                      <span className={`text-[9px] font-bold uppercase mr-4 flex items-center space-x-1 ${
                        qState.isCorrect ? "text-emerald-400" : "text-red-400"
                      }`}>
                        {qState.isCorrect ? <CheckCircle className="h-3.5 w-3.5 inline mr-1" /> : <XCircle className="h-3.5 w-3.5 inline mr-1" />}
                        {qState.isCorrect ? "Passed" : "Failed"}
                      </span>
                    )}
                    <span className="text-[10px] text-[#F27D26] font-mono hover:underline font-bold">
                      Expand Check
                    </span>
                  </div>
                )}
              </div>
            );
          })
        ) : (
          <div className="py-12 text-center glass rounded-3xl border border-dashed border-white/5">
            <HelpCircle className="h-8 w-8 text-[#F27D26] mx-auto opacity-30 mb-3" />
            <p className="text-sm font-semibold text-white/50">No questions matched your exact filters</p>
            <p className="text-xs text-white/30 max-w-sm mx-auto mt-1 leading-relaxed">
              Clear your active search term, select of all subjects categories, or choose to turn off the Bookmarks criteria to try page queries again.
            </p>
          </div>
        )}
      </div>

      {/* Pagination pill footer */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center space-x-2 pt-6">
          <button
            onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
            disabled={currentPage === 1}
            className="p-2.5 rounded-xl border border-white/5 text-white bg-white/5 hover:bg-white/10 disabled:opacity-30 disabled:pointer-events-none transition-all cursor-pointer"
            title="Previous page"
            aria-label="Previous page"
          >
            <ChevronLeft className="h-4.5 w-4.5" />
          </button>
          
          <div className="flex items-center space-x-1.5" id="pagination-pills">
            {Array.from({ length: Math.min(5, totalPages) }, (_, index) => {
              // Sliding window of page indices
              let pageNumber = index + 1;
              if (currentPage > 3 && totalPages > 5) {
                if (currentPage + 2 <= totalPages) {
                  pageNumber = currentPage - 3 + index + 1;
                } else {
                  pageNumber = totalPages - 5 + index + 1;
                }
              }
              const isSelected = currentPage === pageNumber;

              return (
                <button
                  key={pageNumber}
                  onClick={() => setCurrentPage(pageNumber)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer ${
                    isSelected
                      ? "bg-[#F27D26] text-black"
                      : "bg-white/5 hover:bg-white/10 text-white/60"
                  }`}
                >
                  {pageNumber}
                </button>
              );
            })}
          </div>

          <button
            onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
            disabled={currentPage === totalPages}
            className="p-2.5 rounded-xl border border-white/5 text-white bg-white/5 hover:bg-white/10 disabled:opacity-30 disabled:pointer-events-none transition-all cursor-pointer"
            title="Next page"
            aria-label="Next page"
          >
            <ChevronRight className="h-4.5 w-4.5" />
          </button>
        </div>
      )}

    </div>
  );
}
