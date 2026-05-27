import React, { useState, useEffect, useRef } from "react";
import { 
  Clock, 
  HelpCircle, 
  Flag, 
  CheckCircle, 
  AlertTriangle, 
  TrendingUp, 
  ChevronRight, 
  RotateCcw,
  FileCheck
} from "lucide-react";
import { Question, StudentProgress, Difficulty, CompletedExam } from "../types";

interface MockExamProps {
  progress: StudentProgress;
  saveProgress: (progress: StudentProgress) => void;
  seededQuestions: Question[];
  setActiveTab: (tab: string) => void;
}

export default function MockExam({ progress, saveProgress, seededQuestions, setActiveTab }: MockExamProps) {
  
  // Available exam variations
  const [examState, setExamState] = useState<"idle" | "ongoing" | "finished">("idle");
  const [examQuestions, setExamQuestions] = useState<Question[]>([]);
  const [currentIdx, setCurrentIdx] = useState<number>(0);
  const [answers, setAnswers] = useState<{ [id: string]: string }>({});
  const [flagged, setFlagged] = useState<{ [id: string]: boolean }>({});
  
  // Timer setup
  const [timeLeft, setTimeLeft] = useState<number>(0);
  const [durationSeconds, setDurationSeconds] = useState<number>(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Exam summary metrics
  const [completedExamRecord, setCompletedExamRecord] = useState<any | null>(null);

  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  // Set up and start a new mock exam
  const handleStartExam = (type: "mini" | "full") => {
    // Collect random questions matching curriculum
    let shuffled = [...seededQuestions].sort(() => 0.5 - Math.random());
    let size = type === "mini" ? 10 : 30; // 10 limits for fast mini test, 30 for full previous year mockup
    let selected = shuffled.slice(0, Math.min(shuffled.length, size));

    // Reset parameters
    setExamQuestions(selected);
    setCurrentIdx(0);
    setAnswers({});
    setFlagged({});
    setCompletedExamRecord(null);

    // Duration limits
    const durationMins = type === "mini" ? 10 : 45;
    const durSecs = durationMins * 60;
    setDurationSeconds(durSecs);
    setTimeLeft(durSecs);
    setExamState("ongoing");

    // Initialize timer interval
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          handleAutoSubmit();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const handleAutoSubmit = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    submitExam();
  };

  const handleManualSubmit = () => {
    if (window.confirm("Are you sure you want to grade and submit your exam now?")) {
      if (timerRef.current) clearInterval(timerRef.current);
      submitExam();
    }
  };

  // Exam Grading and weakness analysis
  const submitExam = () => {
    let correctCount = 0;
    const categoryStats: { [category: string]: { correct: number; total: number } } = {};

    examQuestions.forEach((q) => {
      const userAnswer = answers[q.id] || "";
      const isCorrect = userAnswer.trim().toLowerCase() === q.correctAnswer.trim().toLowerCase();
      
      if (isCorrect) correctCount++;

      if (!categoryStats[q.category]) {
        categoryStats[q.category] = { correct: 0, total: 0 };
      }
      categoryStats[q.category].total += 1;
      if (isCorrect) {
        categoryStats[q.category].correct += 1;
      }
    });

    const scorePct = Math.round((correctCount / examQuestions.length) * 100);
    const timeSpent = durationSeconds - timeLeft;

    const record: CompletedExam = {
      id: "ex_" + Date.now(),
      date: new Date().toISOString(),
      examType: (examQuestions.length <= 10 ? "Topic-based" : "Previous-year style") as "Topic-based" | "Previous-year style",
      score: scorePct,
      timeSpentSeconds: timeSpent,
      totalQuestions: examQuestions.length,
      correctCount: correctCount,
      topicBreakdown: categoryStats
    };

    setCompletedExamRecord(record);

    // Update overall Student Profile progress context
    const currentExams = [...progress.completedExams, record];
    
    // Update individual mastery scores selectively based on the exam outcomes
    const updatedCategoryMastery = { ...progress.categoryMastery };
    Object.keys(categoryStats).forEach((cat) => {
      const stats = categoryStats[cat];
      const accuracy = Math.round((stats.correct / stats.total) * 100);
      const originalMastery = progress.categoryMastery[cat] || 0;
      
      // Merge scores progressively
      updatedCategoryMastery[cat] = Math.round((originalMastery + accuracy) / 2);
    });

    saveProgress({
      ...progress,
      completedExams: currentExams,
      categoryMastery: updatedCategoryMastery
    });

    setExamState("finished");
  };

  const toggleFlag = (id: string) => {
    setFlagged((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleSelectOption = (letter: string) => {
    if (examState !== "ongoing") return;
    const activeQ = examQuestions[currentIdx];
    setAnswers((prev) => ({ ...prev, [activeQ.id]: letter }));
  };

  const formatTimer = (seconds: number) => {
    const mm = Math.floor(seconds / 60);
    const ss = seconds % 60;
    return `${mm < 10 ? "0" : ""}${mm}:${ss < 10 ? "0" : ""}${ss}`;
  };

  return (
    <div className="space-y-6" id="exams-tab">
      
      {/* CASE 1: IDLE / LAUNCHPAD VIEW */}
      {examState === "idle" && (
        <div className="space-y-6 max-w-4xl mx-auto">
          
          {/* Simulation Header */}
          <div className="text-center p-6 sm:p-8 space-y-3">
            <h2 className="text-2xl sm:text-3xl font-serif italic font-bold text-white tracking-tight">Simulator Exam Center</h2>
            <p className="text-white/60 text-xs sm:text-sm max-w-2xl mx-auto leading-relaxed">
              Test your overall CS exit examination readiness in our computer-based test platform. 
              The configurations map exactly to standard university national licensing styles.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            
            {/* targeted mini evaluation */}
            <div className="glass p-6 rounded-3xl border border-white/5 flex flex-col justify-between space-y-6">
              <div className="space-y-3">
                <div className="bg-[#F27D26]/10 text-[#F27D26] p-3 rounded-2xl w-fit border border-white/5">
                  <Clock className="h-6 w-6" />
                </div>
                <h3 className="text-base sm:text-lg font-bold text-white tracking-tight">Targeted Mini Evaluation</h3>
                <p className="text-white/60 text-xs leading-relaxed">
                  Ideal for quick assessments and focused practice intervals. Spans miscellaneous categories with a tight constraint clock.
                </p>
                <div className="pt-2 flex flex-wrap gap-3.5 text-[10px] font-mono font-medium text-white/50 uppercase tracking-wider">
                  <span>⏱️ 10 Minutes</span>
                  <span>📁 10 Questions</span>
                  <span>🔒 Comprehensive</span>
                </div>
              </div>

              <div className="pt-4">
                <button
                  onClick={() => handleStartExam("mini")}
                  className="w-full py-3 bg-[#F27D26] hover:bg-[#ff9e59] text-black font-extrabold rounded-full text-xs shadow hover:scale-105 active:scale-95 transition-all cursor-pointer"
                >
                  Start Mini Evaluation
                </button>
              </div>
            </div>

            {/* Complete previous year simulation */}
            <div className="glass p-6 rounded-3xl border border-white/5 flex flex-col justify-between relative overflow-hidden space-y-6">
              <div className="absolute right-0 top-0 translate-x-4 -translate-y-4 text-white/3 font-bold font-mono text-8xl select-none">
                30
              </div>
              <div className="space-y-3 z-10 relative">
                <div className="bg-[#F27D26]/10 text-[#F27D26] p-3 rounded-2xl w-fit border border-white/5">
                  <FileCheck className="h-6 w-6" />
                </div>
                <h3 className="text-base sm:text-lg font-bold text-white tracking-tight">Full Exit Mock Simulation</h3>
                <p className="text-white/60 text-xs leading-relaxed">
                   Simulates a realistic past exit examination. Highly recommended to build memory endurance and mock pressure resilience.
                </p>
                <div className="pt-2 flex flex-wrap gap-3.5 text-[10px] font-mono font-medium text-white/50 uppercase tracking-wider">
                  <span>⏱️ 45 Minutes</span>
                  <span>📁 30 Questions</span>
                  <span>🔥 Full Exam Curriculum</span>
                </div>
              </div>

              <div className="pt-4 z-10 relative">
                <button
                  onClick={() => handleStartExam("full")}
                  className="w-full py-3 bg-[#F27D26]/10 border border-[#F27D26]/35 hover:bg-[#F27D26]/15 hover:border-[#F27D26]/60 text-white font-extrabold rounded-full text-xs shadow hover:scale-105 active:scale-95 transition-all cursor-pointer"
                >
                  Start Full Simulation
                </button>
              </div>
            </div>

          </div>

        </div>
      )}

      {/* CASE 2: ONGOING EXAM RUN WEEK */}
      {examState === "ongoing" && examQuestions.length > 0 && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8" id="ongoing-mock-grid">
          
          {/* Right Navigation / Timer widget promoted to TOP on mobile via order classes */}
          <div className="lg:col-span-4 lg:order-2 order-1 space-y-4 sm:space-y-6">
            
            {/* Clock Container */}
            <div className="p-4 sm:p-5 glass rounded-3xl flex items-center justify-between border border-[#F27D26]/20 bg-[#F27D26]/3">
              <div className="flex items-center space-x-3">
                <Clock className="h-5 w-5 text-[#F27D26] animate-pulse" />
                <div>
                  <p className="text-[9px] text-[#E0E0E0]/50 font-mono uppercase tracking-widest">Countdown Timer</p>
                  <p className="text-xl sm:text-2xl font-bold font-mono tracking-tight text-white">{formatTimer(timeLeft)}</p>
                </div>
              </div>
              <button 
                onClick={handleManualSubmit}
                className="px-4 py-2 bg-[#F27D26] text-black font-extrabold rounded-full text-[10px] uppercase tracking-wider transition-colors hover:bg-red-500 hover:text-white cursor-pointer"
              >
                Submit Exam
              </button>
            </div>

            {/* Questions tracker grid dashboard matrix */}
            <div className="glass p-5 rounded-3xl border border-white/5 space-y-4">
              <h4 className="text-[10px] font-bold text-white/40 font-mono uppercase tracking-widest pb-1 border-b border-white/5">Exam Navigation Grid</h4>
              
              <div className="grid grid-cols-5 gap-2 sm:gap-2.5" id="exam-dashboard-matrix">
                {examQuestions.map((q, index) => {
                  const isCurrent = currentIdx === index;
                  const isAnswered = !!answers[q.id];
                  const isFlagged = flagged[q.id];

                  let cellStyle = "bg-white/5 hover:bg-white/8 text-white/60 border border-white/5";
                  if (isAnswered) {
                    cellStyle = "bg-[#F27D26]/20 text-[#F27D26] border border-[#F27D26]/30 shadow";
                  }
                  if (isFlagged) {
                    cellStyle = "bg-red-950/40 text-red-400 border border-red-500/30 shadow";
                  }
                  if (isCurrent) {
                    cellStyle = `${cellStyle} ring-1 ring-[#F27D26]`;
                  }

                  return (
                    <button
                      key={q.id}
                      onClick={() => setCurrentIdx(index)}
                      className={`w-full h-10 font-bold rounded-xl text-xs flex items-center justify-center font-mono cursor-pointer transition-all ${cellStyle}`}
                    >
                      {index + 1}
                    </button>
                  );
                })}
              </div>

              <div className="flex flex-wrap gap-3.5 text-[9px] font-mono uppercase tracking-widest text-[#E0E0E0]/45 pt-3 border-t border-white/5">
                <span className="flex items-center space-x-1.5">
                  <span className="w-2 h-2 bg-white/5 border border-white/5 rounded-full inline-block"></span>
                  <span>Unsaved</span>
                </span>
                <span className="flex items-center space-x-1.5">
                  <span className="w-2 h-2 bg-[#F27D26]/20 rounded-full inline-block"></span>
                  <span>Saved</span>
                </span>
                <span className="flex items-center space-x-1.5">
                  <span className="w-2 h-2 bg-red-950/40 border border-red-500/20 rounded-full inline-block"></span>
                  <span>Flag</span>
                </span>
              </div>
            </div>

          </div>

          {/* central Question card (8 cols) */}
          <div className="lg:col-span-8 lg:order-1 order-2 glass rounded-3xl p-5 sm:p-8 border border-white/5 space-y-6 flex flex-col justify-between">
            <div className="space-y-6">
              
              {/* Question Text & Code Snippet */}
              <div className="flex justify-between items-center gap-4 border-b border-white/5 pb-3">
                <span className="font-mono text-[10px] uppercase font-bold text-white/40 tracking-widest">Question {currentIdx + 1} of {examQuestions.length}</span>
                <button 
                  onClick={() => toggleFlag(examQuestions[currentIdx].id)}
                  className={`flex items-center space-x-1 text-[10px] font-semibold px-2.5 py-1 rounded-lg border transition-all cursor-pointer uppercase font-mono tracking-wider ${
                    flagged[examQuestions[currentIdx].id] 
                      ? "bg-red-950/20 border-red-850 text-red-400" 
                      : "border-white/5 text-white/50 hover:text-white"
                  }`}
                >
                  <Flag className={`h-3 w-3 ${flagged[examQuestions[currentIdx].id] ? "fill-red-500 text-red-400" : ""}`} />
                  <span>{flagged[examQuestions[currentIdx].id] ? "Flagged" : "Flag"}</span>
                </button>
              </div>

              <div className="space-y-4">
                <h3 className="text-sm sm:text-base font-semibold text-white leading-relaxed">
                  {examQuestions[currentIdx].questionText}
                </h3>

                {examQuestions[currentIdx].codeSnippet && (
                  <pre className="bg-black/45 p-4 rounded-xl border border-white/5 font-mono text-[11px] overflow-x-auto text-[#ff9e59] leading-relaxed">
                    <code>{examQuestions[currentIdx].codeSnippet}</code>
                  </pre>
                )}
              </div>

              {/* Options selectors */}
              <div className="space-y-3 pt-2">
                {examQuestions[currentIdx].options?.map((opt, idx) => {
                  const letter = String.fromCharCode(65 + idx);
                  const isSelected = answers[examQuestions[currentIdx].id] === letter;
                  return (
                    <button
                      key={letter}
                      onClick={() => handleSelectOption(letter)}
                      className={`w-full flex items-start space-x-3 p-3.5 sm:p-4 rounded-xl border text-left text-xs font-semibold tracking-wide transition-all min-h-[44px] cursor-pointer ${
                        isSelected 
                          ? "border-[#F27D26] bg-[#F27D26]/5 text-white ring-1 ring-[#F27D26]/35" 
                          : "border-white/5 hover:bg-white/5 text-white/70 hover:text-white bg-white/3"
                      }`}
                    >
                      <span className={`w-6 h-6 rounded-lg flex items-center justify-center font-mono text-[10px] font-bold ${isSelected ? "bg-[#F27D26] text-black" : "bg-white/5 text-white/60"}`}>
                        {letter}
                      </span>
                      <span className="flex-1 pt-0.5 leading-relaxed">{opt}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Exam bottom navigation buttons */}
            <div className="flex justify-between items-center pt-6 border-t border-white/5 mt-8">
              <button
                onClick={() => setCurrentIdx((p) => Math.max(0, p - 1))}
                disabled={currentIdx === 0}
                className="px-4 py-2 bg-white/5 border border-white/5 text-white text-xs font-semibold rounded-full hover:bg-white/8 disabled:opacity-30 disabled:pointer-events-none transition-all cursor-pointer"
              >
                Previous
              </button>

              <button
                onClick={() => setCurrentIdx((p) => Math.min(examQuestions.length - 1, p + 1))}
                disabled={currentIdx === examQuestions.length - 1}
                className="px-5 py-2 bg-[#F27D26]/15 hover:bg-[#F27D26]/20 border border-[#F27D26]/30 text-white text-xs font-semibold rounded-full disabled:opacity-30 disabled:pointer-events-none transition-all cursor-pointer"
              >
                Next Question
              </button>
            </div>

          </div>

        </div>
      )}

      {/* CASE 3: EXAM SUBMISSION SUMMARY REPORT */}
      {examState === "finished" && completedExamRecord && (
        <div className="max-w-4xl mx-auto space-y-6 sm:space-y-8" id="simulation-summary-report">
          
          {/* Score Header */}
          <div className="glass p-6 sm:p-8 rounded-3xl border border-white/5 text-center space-y-6">
            <div className="space-y-1.5">
              <h3 className="text-[10px] font-bold text-[#F27D26] font-mono uppercase tracking-widest">Evaluation Completed Successfully</h3>
              <h2 className="text-2xl sm:text-3xl font-serif italic text-white leading-none">Diagnostic Exam Report</h2>
            </div>

            <div className="max-w-xs mx-auto p-5 bg-black/40 rounded-3xl border border-white/5 space-y-1.5">
              <p className="text-[9px] text-white/40 font-semibold font-mono tracking-widest uppercase">Your Result Score</p>
              <h3 className={`text-5xl sm:text-6xl font-black font-mono leading-none ${completedExamRecord.score >= 70 ? "text-emerald-450" : "text-[#F27D26]"}`}>
                {completedExamRecord.score}%
              </h3>
              <p className="text-xs text-white/60 mt-1 pb-1">
                Answered <strong className="text-white font-bold">{completedExamRecord.correctCount}</strong> of {completedExamRecord.totalQuestions} variables correctly.
              </p>
            </div>

            {/* Time metric indicator */}
            <p className="text-xs text-white/50">
              Exam duration: <strong className="text-white font-mono">{Math.floor(completedExamRecord.timeSpentSeconds / 60)}m {completedExamRecord.timeSpentSeconds % 60}s</strong>
            </p>
          </div>

          {/* Performance category weakness Analysis Grid */}
          <div className="glass p-5 sm:p-8 rounded-3xl border border-white/5 space-y-6">
            <div className="space-y-1 pb-4 border-b border-white/5">
              <h3 className="text-sm sm:text-base font-bold text-white tracking-tight uppercase tracking-wide">Category Performance Gaps</h3>
              <p className="text-xs text-white/50">
                Detailed study diagnostic highlighting potential gaps in your CS Exit Readiness. Update targeted subjects on Practice tab.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {Object.keys(completedExamRecord.topicBreakdown).map((catName) => {
                const stat = completedExamRecord.topicBreakdown[catName];
                const accuracy = Math.round((stat.correct / stat.total) * 100);
                const hasKnowledgeGap = accuracy < 70;

                return (
                  <div 
                    key={catName} 
                    className={`p-4 rounded-2xl border flex items-center justify-between gap-4 ${
                      hasKnowledgeGap 
                        ? "bg-red-950/15 border-red-500/10 text-red-400" 
                        : "bg-emerald-950/15 border-emerald-500/10 text-emerald-400"
                    }`}
                  >
                    <div className="space-y-1 min-w-0">
                      <p className="text-xs font-bold truncate text-white">{catName}</p>
                      <p className={`text-[10px] flex items-center space-x-1 ${hasKnowledgeGap ? "text-red-400" : "text-emerald-400"}`}>
                        {hasKnowledgeGap ? <AlertTriangle className="h-3 w-3 flex-shrink-0" /> : <CheckCircle className="h-3 w-3 flex-shrink-0" />}
                        <span>{hasKnowledgeGap ? "Knowledge Gap Identified" : "Success Criteria Met"}</span>
                      </p>
                    </div>

                    <div className="text-right flex-shrink-0">
                      <p className="text-base sm:text-lg font-extrabold font-mono leading-none">{accuracy}%</p>
                      <p className="text-[9px] text-white/40 font-mono mt-0.5">{stat.correct}/{stat.total} Right</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Action triggers */}
          <div className="flex justify-center flex-wrap gap-4 pt-1">
            <button
              onClick={() => setExamState("idle")}
              className="px-6 py-2.5 bg-[#F27D26] hover:bg-[#ff9e59] text-black font-extrabold rounded-full text-xs hover:scale-105 transition-transform flex items-center space-x-2 cursor-pointer"
            >
              <RotateCcw className="h-4 w-4" />
              <span>Take Another Mock Exam</span>
            </button>

            <button
              onClick={() => setActiveTab("practice")}
              className="px-6 py-2.5 bg-white/5 border border-white/5 text-white font-bold rounded-full text-xs hover:bg-white/8 transition-all cursor-pointer"
            >
              Target Practice Gaps
            </button>
          </div>

        </div>
      )}

    </div>
  );
}
