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
  FileCheck,
  ChevronDown,
  Award,
  BookOpen,
  Check,
  X,
  ShieldCheck
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
  
  // Custom dialog state to prevent sandboxed window.confirm iframe blocks
  const [showSubmitConfirm, setShowSubmitConfirm] = useState<boolean>(false);

  // Timer setup
  const [timeLeft, setTimeLeft] = useState<number>(0);
  const [durationSeconds, setDurationSeconds] = useState<number>(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Exam summary metrics
  const [completedExamRecord, setCompletedExamRecord] = useState<any | null>(null);

  // State for diagnostic summary review filter and toggle collapse
  const [reviewFilter, setReviewFilter] = useState<"all" | "incorrect" | "correct">("all");
  const [expandedExplanation, setExpandedExplanation] = useState<{ [qId: string]: boolean }>({});

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
    setShowSubmitConfirm(false);

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
    setShowSubmitConfirm(false);
    submitExam();
  };

  const handleManualSubmit = () => {
    // Open high fidelity in-app confirmation modal
    setShowSubmitConfirm(true);
  };

  const handleConfirmSubmit = () => {
    setShowSubmitConfirm(false);
    if (timerRef.current) clearInterval(timerRef.current);
    submitExam();
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
      {examState === "finished" && completedExamRecord && (() => {
        // Calculate Domain-Level Stats dynamically
        const domainStats: {
          [domainId: string]: {
            title: string;
            description: string;
            correct: number;
            total: number;
            categories: string[];
          }
        } = {
          domain_prog: {
            title: "Domain I: Program Development & Software Construction",
            description: "Covers C++/Java compiler operations, dynamic dispatch resolving, pointer safety, operator weights, and Web framework routes.",
            correct: 0,
            total: 0,
            categories: ["Programming Fundamentals", "Object-Oriented Programming", "Web Development"]
          },
          domain_systems: {
            title: "Domain II: Systems & Core Infrastructure Administration",
            description: "Covers CPU scheduling metrics, virtual memory page offset translations, Coffman deadlock states, and CIDR subnet math.",
            correct: 0,
            total: 0,
            categories: ["Operating Systems", "Computer Networks", "Computer Architecture", "Cybersecurity", "System Administration"]
          },
          domain_design: {
            title: "Domain III: Databases & Systems Engineering Processes",
            description: "Covers table normalization (1NF-BCNF), foreign relational integrity, SDLC patterns (Waterfall vs Agile), and UML modeling.",
            correct: 0,
            total: 0,
            categories: ["Database Systems", "Software Engineering"]
          },
          domain_theory: {
            title: "Domain IV: Computational Theory, Algorithms & AI Agents",
            description: "Covers Big-O runtime bounds, Binary Tree preorder/inorder traversals, Minimum Spanning Trees, regular DFAs, and AI searches.",
            correct: 0,
            total: 0,
            categories: ["Theory of Computation", "Data Structures & Algorithms", "Artificial Intelligence"]
          }
        };

        // Run mapping cascade
        examQuestions.forEach((q) => {
          const userAnswer = answers[q.id] || "";
          const isCorrect = userAnswer.trim().toLowerCase() === q.correctAnswer.trim().toLowerCase();
          
          let matched = false;
          Object.keys(domainStats).forEach((domainKey) => {
            if (domainStats[domainKey].categories.includes(q.category)) {
              domainStats[domainKey].total += 1;
              if (isCorrect) domainStats[domainKey].correct += 1;
              matched = true;
            }
          });
          if (!matched) {
            // Default fallback
            domainStats.domain_prog.total += 1;
            if (isCorrect) domainStats.domain_prog.correct += 1;
          }
        });

        const passThreshold = 50; // MoE threshold is 50%
        const isPassed = completedExamRecord.score >= passThreshold;

        // Categorize categories as strengths or weaknesses
        const strengthsList: string[] = [];
        const gapsList: string[] = [];
        
        Object.keys(completedExamRecord.topicBreakdown).forEach((catName) => {
          const stat = completedExamRecord.topicBreakdown[catName];
          const accuracy = Math.round((stat.correct / stat.total) * 100);
          if (accuracy >= 70) {
            strengthsList.push(catName);
          } else {
            gapsList.push(catName);
          }
        });

        // Map weaknesses into recommended lessons dynamically
        const lessonRecsMap: { [cat: string]: { id: string; title: string } } = {
          "Programming Fundamentals": { id: "les_prog", title: "Variables, Scopes, and Logical Short-Circuiting" },
          "Object-Oriented Programming": { id: "les_oop", title: "Inheritance, Abstract Classes, and Dynamic Dispatch" },
          "Database Systems": { id: "les_db", title: "Relational Model, Joins, and Normalization Forms" },
          "Operating Systems": { id: "les_os", title: "Virtual Memory, Paging, and Deadlock Coffman Rules" },
          "Computer Networks": { id: "les_net", title: "OSI Reference Layers, TCP/IP, and IPv4 Subnetting" },
          "Data Structures & Algorithms": { id: "les_dsa", title: "Algorithmic Complexity, Tree Traversals, and Graphs" },
          "Theory of Computation": { id: "les_toc", title: "Chomsky Hierarchy, Automata, and Decidability" },
          "Software Engineering": { id: "les_se", title: "SDLC Process Models, UML Blueprints, and Testing Strategies" }
        };

        // Filtered list of tested questions for mistake diagnostics
        const filteredReviewQuestions = examQuestions.filter((q) => {
          const userAnswer = answers[q.id] || "";
          const isCorrect = userAnswer.trim().toLowerCase() === q.correctAnswer.trim().toLowerCase();
          if (reviewFilter === "incorrect") return !isCorrect;
          if (reviewFilter === "correct") return isCorrect;
          return true;
        });

        return (
          <div className="max-w-4xl mx-auto space-y-8 animate-fade-in" id="simulation-summary-report">
            
            {/* National Exit Examination Alignment Callout */}
            <div className="flex flex-col sm:flex-row items-center justify-between border border-white/5 bg-white/2 pb-4 pt-4 px-6 rounded-2xl gap-4">
              <div className="flex items-center space-x-3">
                <div className="p-2.5 bg-[#F27D26]/10 text-[#F27D26] rounded-xl border border-[#F27D26]/15">
                  <ShieldCheck className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="text-white text-xs font-bold tracking-wide">Federal CS Exam Diagnostic System</h4>
                  <p className="text-[10px] text-white/50">Aligned directly with the 2026 Ethiopian Ministry of Education (MoE) Syllabus standards.</p>
                </div>
              </div>
              <span className="text-[9px] font-mono text-white/40 bg-white/3 border border-white/5 px-3 py-1 rounded-full">
                ID Reference: #CS-MOE-2026-61E
              </span>
            </div>

            {/* Score Certifications Banner */}
            {isPassed ? (
              <div className="bg-gradient-to-br from-emerald-950/25 to-black/80 border border-emerald-500/20 p-6 sm:p-8 rounded-3xl space-y-6 relative overflow-hidden text-center shadow-lg" id="passing-certificate">
                {/* Visual Background Stamp */}
                <div className="absolute right-0 bottom-0 translate-x-12 translate-y-6 text-emerald-500/3 font-black text-[120px] pointer-events-none select-none">
                  PASS
                </div>
                
                <div className="space-y-4">
                  <div className="bg-emerald-500/10 text-emerald-400 p-4 rounded-full w-fit mx-auto border border-emerald-500/15">
                    <Award className="h-10 w-10 text-emerald-405 animate-bounce" />
                  </div>
                  <div className="space-y-1">
                    <span className="text-[9px] uppercase tracking-widest font-mono text-emerald-400 font-bold bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/10">Accreditation Threshold Achieved</span>
                    <h2 className="text-xl sm:text-2xl font-serif italic text-white font-bold leading-relaxed">
                      Congratulations! You Passed standard benchmarks.
                    </h2>
                    <p className="text-white/60 text-xs max-w-xl mx-auto leading-relaxed">
                      Your diagnostic performance scores <strong className="text-emerald-400 font-bold">{completedExamRecord.score}%</strong>. This surpasses the official MoE 50% minimum threshold requirement for computing degree certification.
                    </p>
                  </div>
                </div>

                {/* Simulated Certificate Block */}
                <div className="max-w-md mx-auto p-5 rounded-2xl border border-white/5 bg-black/60 shadow-inner text-left font-serif space-y-4">
                  <div className="flex justify-between items-center pb-2 border-b border-white/5 font-mono text-[9px] uppercase tracking-wider text-white/40">
                    <span>Accredited Trial Cert</span>
                    <span>Status: SUCCESS</span>
                  </div>
                  <div className="space-y-1.5 p-1">
                    <p className="text-[10px] text-white/50 not-italic font-sans uppercase tracking-wider">Candidate Identifier:</p>
                    <p className="text-white font-semibold text-sm truncate font-sans">yosephabebem@gmail.com</p>
                    <p className="text-[10px] text-white/50 not-italic font-sans uppercase tracking-wider mt-2.5">Degree Accolade Indicator:</p>
                    <p className="text-[#F27D26] text-xs font-bold font-mono">Ethiopian MoE Practice Standard - CS Major Verification</p>
                  </div>
                  <div className="flex justify-between items-end pt-2 border-t border-white/5 text-[9px] font-mono text-white/40">
                    <span>Date: {new Date(completedExamRecord.date).toLocaleDateString()}</span>
                    <span>Grade Stamp ID: P-{completedExamRecord.id.substring(3, 9)}</span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-gradient-to-br from-red-950/20 to-black/80 border border-red-500/20 p-6 sm:p-8 rounded-3xl space-y-4 text-center shadow-lg" id="needs-improvement-alert">
                <div className="bg-red-500/10 text-red-400 p-4 rounded-full w-fit mx-auto border border-red-500/15">
                  <AlertTriangle className="h-10 w-10 text-red-403" />
                </div>
                <div className="space-y-1.5">
                  <span className="text-[9px] uppercase tracking-widest font-mono text-red-400 font-bold bg-red-500/10 px-3 py-1 rounded-full border border-red-500/10">Deficiency Alert</span>
                  <h2 className="text-xl sm:text-2xl font-serif italic text-white font-bold leading-relaxed">
                    Passing Threshold Not Met
                  </h2>
                  <p className="text-white/60 text-xs max-w-xl mx-auto leading-relaxed">
                    You answered <strong className="text-white font-bold">{completedExamRecord.correctCount}</strong> questions correctly out of {completedExamRecord.totalQuestions}, obtaining a diagnostic score of <strong className="text-red-400 font-bold">{completedExamRecord.score}%</strong>. The minimum licensing hurdle is <strong className="text-emerald-400 font-bold">50%</strong>. We recommend targeting practice gaps below.
                  </p>
                </div>
              </div>
            )}

            {/* General Metrics Bar */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="glass p-4 rounded-2xl border border-white/5 text-center space-y-1">
                <span className="text-[9px] uppercase font-mono tracking-wider text-white/45 block">Accuracy Score</span>
                <h3 className={`text-2xl font-black font-mono leading-none ${isPassed ? "text-emerald-400" : "text-[#F27D26]"}`}>
                  {completedExamRecord.score}%
                </h3>
              </div>
              <div className="glass p-4 rounded-2xl border border-white/5 text-center space-y-1">
                <span className="text-[9px] uppercase font-mono tracking-wider text-white/45 block">Correct Count</span>
                <h3 className="text-2xl font-black font-mono leading-none text-white">
                  {completedExamRecord.correctCount} / {completedExamRecord.totalQuestions}
                </h3>
              </div>
              <div className="glass p-4 rounded-2xl border border-white/5 text-center space-y-1">
                <span className="text-[9px] uppercase font-mono tracking-wider text-white/45 block">Hurdle Score</span>
                <h3 className="text-2xl font-black font-mono leading-none text-emerald-450">
                  50%
                </h3>
              </div>
              <div className="glass p-4 rounded-2xl border border-white/5 text-center space-y-1">
                <span className="text-[9px] uppercase font-mono tracking-wider text-white/45 block">Duration</span>
                <h3 className="text-2xl font-black font-mono leading-none text-white">
                  {Math.floor(completedExamRecord.timeSpentSeconds / 60)}m {completedExamRecord.timeSpentSeconds % 60}s
                </h3>
              </div>
            </div>

            {/* CURRICULUM DOMAIN-LEVEL ANALYSIS */}
            <div className="glass p-6 rounded-3xl border border-white/5 space-y-6">
              <div className="pb-4 border-b border-white/5">
                <h3 className="text-sm sm:text-base font-bold text-white tracking-wide uppercase font-sans">MoE Curriculum Domain Masteries</h3>
                <p className="text-xs text-white/50 leading-relaxed mt-1">
                  National licensing checks are aggregated under 4 independent thematic domains. Trace your focus clusters.
                </p>
              </div>

              <div className="space-y-6">
                {Object.keys(domainStats).map((domainId) => {
                  const stat = domainStats[domainId];
                  const hasQuestions = stat.total > 0;
                  const pct = hasQuestions ? Math.round((stat.correct / stat.total) * 100) : 0;
                  const isDomainPass = pct >= 50;

                  return (
                    <div key={domainId} className="space-y-2 p-4 bg-white/2 rounded-2xl border border-white/5">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                        <div className="space-y-0.5">
                          <h4 className="text-xs sm:text-sm font-bold text-white tracking-wide">{stat.title}</h4>
                          <p className="text-[10px] text-white/45 leading-relaxed max-w-xl">{stat.description}</p>
                        </div>
                        <div className="text-right flex-shrink-0">
                          <span className={`text-sm font-bold font-mono tracking-wide ${isDomainPass ? "text-emerald-400" : "text-[#F27D26]"}`}>
                            {pct}% {hasQuestions ? `(${stat.correct}/${stat.total})` : "(No questions evaluated)"}
                          </span>
                        </div>
                      </div>

                      {hasQuestions && (
                        <div className="space-y-1 pt-1">
                          {/* Colored Progress Bar */}
                          <div className="w-full h-1.5 rounded-full bg-white/5 overflow-hidden">
                            <div 
                              className={`h-full rounded-full transition-all duration-1000 ${
                                isDomainPass ? "bg-emerald-500" : "bg-[#F27D26]"
                              }`}
                              style={{ width: `${pct}%` }}
                            />
                          </div>
                          <div className="flex justify-between text-[8px] font-mono uppercase tracking-widest text-white/30">
                            <span>0% Minimum</span>
                            <span>Licensing Goal 50%</span>
                            <span>Mastery 100%</span>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* STRENGTHS AND WEAKNESS RETRIEVAL MATRIX */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Strengths Card */}
              <div className="glass p-5 sm:p-6 rounded-3xl border border-white/5 space-y-4">
                <div className="flex items-center space-x-2 text-emerald-400 pb-2 border-b border-emerald-505/10">
                  <CheckCircle className="h-5 w-5" />
                  <h4 className="text-xs sm:text-sm font-bold text-white uppercase tracking-wider">Your Domain Strengths</h4>
                </div>

                {strengthsList.length > 0 ? (
                  <ul className="space-y-3">
                    {strengthsList.map((str) => (
                      <li key={str} className="p-3 bg-emerald-950/10 border border-emerald-500/10 rounded-xl space-y-1">
                        <span className="text-white text-xs font-bold font-sans flex items-center space-x-1.5">
                          <span className="w-2 h-2 rounded-full bg-emerald-400" />
                          <span>{str}</span>
                        </span>
                        <p className="text-[10px] text-emerald-400/80 leading-relaxed pl-3.5">
                          Accuracy exceeded 70%! Shows excellent cognitive safety and reliable retention of essential definitions.
                        </p>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-xs text-white/50 leading-relaxed italic p-3">
                    No individual subject scored above the 70% threshold in this session. Don't worry, keep practicing under mini evaluations!
                  </p>
                )}
              </div>

              {/* Weaknesses Card with Dynamic Remedial Links */}
              <div className="glass p-5 sm:p-6 rounded-3xl border border-white/5 space-y-4">
                <div className="flex items-center space-x-2 text-[#F27D26] pb-2 border-b border-[#F27D26]/10">
                  <AlertTriangle className="h-5 w-5" />
                  <h4 className="text-xs sm:text-sm font-bold text-white uppercase tracking-wider">Focus Gaps & Study plan</h4>
                </div>

                {gapsList.length > 0 ? (
                  <div className="space-y-4">
                    <ul className="space-y-3">
                      {gapsList.map((gP) => {
                        const recLesson = lessonRecsMap[gP];
                        return (
                          <li key={gP} className="p-3 bg-[#F27D26]/5 border border-[#F27D26]/10 rounded-xl space-y-1 relative">
                            <span className="text-white text-xs font-bold font-sans flex items-center space-x-1.5">
                              <span className="w-2 h-2 rounded-full bg-[#F27D26]" />
                              <span>{gP} Assessment</span>
                            </span>
                            <p className="text-[10px] text-white/50 leading-relaxed pl-3.5 pb-2">
                              Identified vulnerability score in testing limits. Highly advise reviewing primary theory guidelines.
                            </p>
                            {recLesson && (
                              <button
                                onClick={() => setActiveTab("practice")}
                                className="block w-full text-left py-1.5 px-2 bg-[#F27D26]/10 hover:bg-[#F27D26]/20 border border-[#F27D26]/20 rounded-lg text-[9px] font-semibold text-[#ff9e59] transition-all cursor-pointer"
                              >
                                📖 Go to Lecture: {recLesson.title}
                              </button>
                            )}
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                ) : (
                  <p className="text-xs text-emerald-400 leading-relaxed italic p-3">
                    Incredible work! Zero curriculum areas fell below the success criterion threshold in this mock session! You are exceptionally prepared.
                  </p>
                )}
              </div>

            </div>

            {/* MISTAKES QUESTION-BY-QUESTION REVIEW PANEL */}
            <div className="glass p-5 sm:p-6 rounded-3xl border border-white/5 space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-white/5 pb-4 gap-4">
                <div className="space-y-0.5">
                  <h3 className="text-sm sm:text-base font-bold text-white uppercase tracking-wide">Error & Answer Key Review Matrix</h3>
                  <p className="text-xs text-white/50 leading-relaxed">
                    Verify every variable question with comprehensive textbook explanations.
                  </p>
                </div>

                {/* Switch Controls */}
                <div className="flex bg-black/60 p-1 rounded-full border border-white/5 items-center self-start sm:self-center">
                  <button
                    onClick={() => {
                      setReviewFilter("all");
                      setExpandedExplanation({});
                    }}
                    className={`px-3 py-1.5 rounded-full text-[9px] font-bold uppercase transition-all whitespace-nowrap cursor-pointer ${
                      reviewFilter === "all" ? "bg-[#F27D26] text-black" : "text-white/60 hover:text-white"
                    }`}
                  >
                    All ({examQuestions.length})
                  </button>
                  <button
                    onClick={() => {
                      setReviewFilter("incorrect");
                      setExpandedExplanation({});
                    }}
                    className={`px-3 py-1.5 rounded-full text-[9px] font-bold uppercase transition-all whitespace-nowrap cursor-pointer ${
                      reviewFilter === "incorrect" ? "bg-red-550 bg-[#F27D26]/10 text-[#F27D26]" : "text-white/60 hover:text-white"
                    }`}
                  >
                    Errors ({completedExamRecord.totalQuestions - completedExamRecord.correctCount})
                  </button>
                  <button
                    onClick={() => {
                      setReviewFilter("correct");
                      setExpandedExplanation({});
                    }}
                    className={`px-3 py-1.5 rounded-full text-[9px] font-bold uppercase transition-all whitespace-nowrap cursor-pointer ${
                      reviewFilter === "correct" ? "bg-emerald-550/20 text-emerald-450" : "text-white/60 hover:text-white"
                    }`}
                  >
                    Correct ({completedExamRecord.correctCount})
                  </button>
                </div>
              </div>

              {filteredReviewQuestions.length > 0 ? (
                <div className="space-y-6">
                  {filteredReviewQuestions.map((q, idx) => {
                    const idxInExam = examQuestions.findIndex((item) => item.id === q.id) + 1;
                    const choice = answers[q.id] || "None/Skipped";
                    const isCorrect = choice.trim().toLowerCase() === q.correctAnswer.trim().toLowerCase();
                    const isExpanded = !!expandedExplanation[q.id];

                    return (
                      <div 
                        key={q.id} 
                        className={`p-5 rounded-2xl border text-left space-y-4 transition-all ${
                          isCorrect 
                            ? "bg-emerald-950/5 border-emerald-500/10" 
                            : "bg-red-950/5 border-red-500/10"
                        }`}
                      >
                        {/* Status Label Row */}
                        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/5 pb-2">
                          <span className="text-[9px] font-mono uppercase tracking-widest text-[#F27D26] bg-[#F27D26]/5 px-2 py-0.5 rounded-md border border-white/5">
                            Q{idxInExam}. {q.category}
                          </span>
                          <span className={`text-[9px] font-bold uppercase px-2.5 py-0.5 rounded-full ${
                            isCorrect 
                              ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/15" 
                              : "bg-red-500/10 text-red-400 border border-red-500/15"
                          }`}>
                            {isCorrect ? "Correct answer" : `Incorrect choice (Marked: ${choice})`}
                          </span>
                        </div>

                        {/* Question Text */}
                        <h4 className="text-white text-xs sm:text-sm font-semibold leading-relaxed">
                          {q.questionText}
                        </h4>

                        {/* Code snippet optionally */}
                        {q.codeSnippet && (
                          <pre className="bg-black/55 p-3.5 rounded-xl border border-white/5 font-mono text-[10px] overflow-x-auto text-[#ff9e59] leading-relaxed">
                            <code>{q.codeSnippet}</code>
                          </pre>
                        )}

                        {/* Options mapping details */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                          {q.options.map((optionStr, optionIdx) => {
                            const optionLetter = String.fromCharCode(65 + optionIdx);
                            const wasSelected = choice === optionLetter;
                            const isCorrectLetter = q.correctAnswer.trim().toUpperCase() === optionLetter;

                            let borderStyle = "border-white/5 bg-white/2 text-white/70";
                            if (isCorrectLetter) {
                              borderStyle = "border-emerald-500/35 bg-emerald-500/10 text-white ring-1 ring-emerald-500/25";
                            } else if (wasSelected && !isCorrectLetter) {
                              borderStyle = "border-red-500/35 bg-red-500/10 text-white ring-1 ring-red-500/25";
                            }

                            return (
                              <div 
                                key={optionLetter} 
                                className={`flex items-start space-x-2.5 p-3 rounded-xl border text-[11px] font-medium leading-relaxed ${borderStyle}`}
                              >
                                <span className={`w-5 h-5 rounded-md flex-shrink-0 flex items-center justify-center font-mono text-[9px] font-bold ${
                                  isCorrectLetter 
                                    ? "bg-emerald-500 text-black" 
                                    : wasSelected 
                                      ? "bg-red-500 text-white" 
                                      : "bg-white/5 text-white/50"
                                }`}>
                                  {optionLetter}
                                </span>
                                <span className="flex-1">{optionStr}</span>
                              </div>
                            );
                          })}
                        </div>

                        {/* Expandable Explanation with dynamic helper */}
                        <div className="pt-2">
                          <button
                            onClick={() => {
                              setExpandedExplanation((prev) => ({ ...prev, [q.id]: !prev[q.id] }));
                            }}
                            className="flex items-center space-x-1.5 text-[10px] sm:text-xs font-semibold text-[#ff9e59] hover:text-white transition-all cursor-pointer bg-white/3 hover:bg-white/5 px-3.5 py-1.5 rounded-full border border-white/5"
                          >
                            <BookOpen className="h-3 w-3" />
                            <span>{isExpanded ? "Collapse Review Diagnostics" : "Reveal Review & Logic Diagnostics"}</span>
                            <ChevronDown className={`h-3 w-3 transition-transform ${isExpanded ? "rotate-180" : ""}`} />
                          </button>

                          {isExpanded && (
                            <div className="mt-3.5 bg-black/40 border border-white/5 p-4 rounded-xl space-y-3 animate-fade-in text-xs leading-relaxed text-[#E0E0E0]">
                              <p className="font-bold text-white uppercase text-[9px] tracking-wider text-[#F27D26]">Correct Decision Criteria:</p>
                              <p className="text-white/80">{q.explanation}</p>
                              
                              {q.wrongOptionsExplanation && Object.keys(q.wrongOptionsExplanation).length > 0 && (
                                <>
                                  <p className="font-bold text-white uppercase text-[9px] tracking-wider text-[#F27D26] pt-1.5">Distractor Option Deconstruct:</p>
                                  <ul className="space-y-1.5 list-disc pl-4 text-white/60 text-[11px]">
                                    {Object.entries(q.wrongOptionsExplanation).map(([opt, text]) => (
                                      <li key={opt}>
                                        <strong className="text-white">{opt}:</strong> {text}
                                      </li>
                                    ))}
                                  </ul>
                                </>
                              )}
                            </div>
                          )}
                        </div>

                      </div>
                    );
                  })}
                </div>
              ) : (
                <p className="text-xs text-white/45 italic py-6 text-center bg-white/2 rounded-2xl border border-white/5">
                  No evaluated questions matched the current filter.
                </p>
              )}
            </div>

            {/* Action footer triggers */}
            <div className="flex justify-center flex-wrap gap-4 pt-1">
              <button
                onClick={() => {
                  setExamState("idle");
                  setReviewFilter("all");
                  setExpandedExplanation({});
                }}
                className="px-6 py-2.5 bg-[#F27D26] hover:bg-[#ff9e59] text-black font-extrabold rounded-full text-xs hover:scale-105 transition-transform flex items-center space-x-2 cursor-pointer shadow-lg"
              >
                <RotateCcw className="h-4 w-4" />
                <span>Take Another Mock Simulation</span>
              </button>

              <button
                onClick={() => {
                  setReviewFilter("all");
                  setExpandedExplanation({});
                  setActiveTab("practice");
                }}
                className="px-6 py-2.5 bg-white/5 border border-white/5 text-white font-bold rounded-full text-xs hover:bg-white/8 transition-all cursor-pointer"
              >
                Go Target Practice Lectures
              </button>
            </div>

          </div>
        );
      })()}

      {/* Immersive Custom Confirmation Modal for exam submission to avoid iframe blocks */}
      {showSubmitConfirm && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in" id="submit-confirm-overlay">
          <div className="glass max-w-md w-full p-6 sm:p-8 rounded-3xl border border-[#F27D26]/20 space-y-6 shadow-2xl relative" id="submit-confirm-modal">
            <div className="text-center space-y-4">
              <div className="bg-[#F27D26]/10 text-[#F27D26] p-4 rounded-full w-fit mx-auto border border-[#F27D26]/15">
                <FileCheck className="h-8 w-8 text-[#F27D26] animate-pulse" />
              </div>
              <h3 className="text-lg sm:text-xl font-serif italic font-bold text-white">Ready to grade your exam?</h3>
              <p className="text-white/60 text-xs sm:text-sm leading-relaxed">
                You have answered <strong className="text-white font-bold">{Object.keys(answers).length}</strong> of {examQuestions.length} questions. 
                Once submitted, your results will be logged and your subject mastery parameters updated.
              </p>
            </div>

            {/* Questions Answered breakdown */}
            <div className="bg-white/2 border border-white/5 p-4 rounded-2xl flex items-center justify-between text-xs font-semibold">
              <span className="text-white/50 uppercase tracking-wider text-[10px]">Unanswered Gaps:</span>
              <span className="font-mono text-[#F27D26] bg-[#F27D26]/10 px-2.5 py-1 rounded-lg">
                {examQuestions.length - Object.keys(answers).length} questions left
              </span>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <button
                onClick={() => setShowSubmitConfirm(false)}
                className="w-full sm:w-1/2 py-2.5 bg-white/5 hover:bg-white/10 border border-white/10 text-white text-xs font-bold rounded-full transition-all cursor-pointer"
              >
                No, Keep Reviewing
              </button>
              <button
                onClick={handleConfirmSubmit}
                className="w-full sm:w-1/2 py-2.5 bg-[#F27D26] hover:bg-[#ff9e59] text-black text-xs font-extrabold rounded-full transition-all cursor-pointer accent-glow"
              >
                Yes, Submit and Grade
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
