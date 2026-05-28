import React from "react";
import { 
  Award, 
  BookMarked, 
  CheckCircle2, 
  HelpCircle, 
  ChevronRight, 
  TrendingUp, 
  AlertTriangle,
  Lightbulb
} from "lucide-react";
import { StudentProgress, Question } from "../types";

interface DashboardProps {
  progress: StudentProgress;
  questions: Question[];
  setActiveTab: (tab: string) => void;
  setSelectedCategoryForPractice?: (cat: string) => void;
}

export default function Dashboard({ 
  progress, 
  questions, 
  setActiveTab,
  setSelectedCategoryForPractice
}: DashboardProps) {
  
  // Calculate category status parameters
  const categories = Object.keys(progress.categoryMastery);
  
  // Sort categories by mastery score to identify strengths and weaknesses
  const categorizedScores = categories.map(cat => ({
    name: cat,
    score: progress.categoryMastery[cat] || 0
  })).sort((a,b) => b.score - a.score);

  const strongestTopics = categorizedScores.slice(0, 3).filter(item => item.score > 0);
  const weakestTopics = [...categorizedScores]
    .reverse()
    .slice(0, 3); // Get lowest three

  // Calculate overall readiness score based on average topic mastery
  const totalMastery = categories.reduce((sum, cat) => sum + (progress.categoryMastery[cat] || 0), 0);
  const averageMastery = Math.round(totalMastery / categories.length);
  
  // Total questions answered in practice history
  const totalQuizzesCount = progress.completedQuizzes.length;
  const totalExamsCount = progress.completedExams.length;

  const handleStudyRecommend = (category: string) => {
    if (setSelectedCategoryForPractice) {
      setSelectedCategoryForPractice(category);
    }
    setActiveTab("practice");
  };

  return (
    <div className="space-y-8" id="dashboard-tab">
      
      {/* Mastery Hero Section */}
      <section className="glass p-8 rounded-3xl relative overflow-hidden">
        <div className="relative z-10 max-w-3xl space-y-4">
          <div className="inline-flex items-center space-x-2 bg-white/5 py-1 px-3 border border-white/10 rounded-full text-[10px] font-mono font-semibold tracking-widest text-[#F27D26]">
            <Award className="h-3.5 w-3.5" />
            <span>AI-POWERED ADAPTIVE PATH</span>
          </div>
          <div>
            <p className="text-[11px] uppercase tracking-[0.2em] mb-1 font-semibold text-white/70">Your Overall Curriculum Readiness</p>
            <h2 className="text-4xl font-serif italic font-bold text-white tracking-tight">Mastery: {averageMastery}%</h2>
          </div>
          
          <div className="w-full h-1.5 bg-white/5 rounded-full mb-6">
            <div className="h-full bg-gradient-to-r from-[#F27D26] to-[#ff9e59] rounded-full" style={{ width: `${averageMastery}%` }}></div>
          </div>

          <div className="flex flex-wrap gap-4 pt-1">
            <button 
              onClick={() => handleStudyRecommend(weakestTopics[0].name)}
              className="px-6 py-2.5 bg-[#F27D26] text-black font-extrabold text-xs rounded-full accent-glow hover:scale-105 transition-transform flex items-center space-x-2 cursor-pointer"
            >
              <span>CONTINUE STUDYING</span>
              <ChevronRight className="h-4 w-4" />
            </button>
            <button 
              onClick={() => setActiveTab("exams")}
              className="px-6 py-2.5 glass text-white font-bold text-xs rounded-full hover:bg-white/5 transition-colors cursor-pointer"
            >
              ENTER EXAM HALL
            </button>
          </div>
        </div>
        <div className="absolute -right-10 -bottom-10 opacity-10">
           <div className="w-64 h-64 rounded-full border-[1px] border-white"></div>
        </div>
      </section>

      {/* Bento Grid Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6" id="bento-stats">
        
        {/* Readiness Meter */}
        <div className="glass p-6 rounded-3xl flex flex-col justify-between">
          <div className="flex justify-between items-start">
            <span className="text-[10px] uppercase tracking-widest text-[#E0E0E0]/50 font-semibold">READINESS SCORE</span>
            <TrendingUp className="h-4 w-4 text-[#F27D26]" />
          </div>
          
          <div className="my-3 flex items-center justify-center relative">
            {/* SVG Doughnut gauge chart */}
            <svg className="w-28 h-28 transform -rotate-90">
              <circle
                cx="56"
                cy="56"
                r="46"
                className="stroke-white/5"
                strokeWidth="8"
                fill="transparent"
              />
              <circle
                cx="56"
                cy="56"
                r="46"
                className="stroke-[#F27D26] transition-all duration-500"
                strokeWidth="8"
                fill="transparent"
                strokeDasharray={2 * Math.PI * 46}
                strokeDashoffset={2 * Math.PI * 46 * (1 - averageMastery / 100)}
                strokeLinecap="round"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-3xl font-serif italic text-white font-bold leading-none">{averageMastery}%</span>
              <span className="text-[8px] text-[#E0E0E0]/40 font-semibold mt-1 uppercase tracking-wider">Target &gt; 80%</span>
            </div>
          </div>

          <p className="text-[10px] text-white/40 text-center leading-relaxed font-semibold uppercase tracking-wider">
            Weighted across subjects
          </p>
        </div>

        {/* Practice Stats Card */}
        <div className="glass p-6 rounded-3xl flex flex-col justify-between">
          <div className="flex justify-between items-start">
            <span className="text-[10px] uppercase tracking-widest text-[#E0E0E0]/50 font-semibold">PRACTICE RUNS</span>
            <CheckCircle2 className="h-4 w-4 text-[#F27D26]" />
          </div>
          <div className="my-6">
            <h3 className="text-4xl font-serif italic text-white font-bold">{totalQuizzesCount}</h3>
            <p className="text-[10px] text-white/40 uppercase tracking-widest mt-1">Modules Completed</p>
          </div>
          <div className="text-[10px] uppercase tracking-widest font-semibold text-white/60 bg-white/5 p-2.5 rounded-xl flex items-center justify-between border border-white/5">
            <span>Accuracy</span>
            <span className="font-mono text-sm font-bold text-white">
              {totalQuizzesCount > 0 
                ? `${Math.round(progress.completedQuizzes.reduce((acc, q) => acc + q.score, 0) / totalQuizzesCount)}%` 
                : "0%"}
            </span>
          </div>
        </div>

        {/* Full Exams taken Card */}
        <div className="glass p-6 rounded-3xl flex flex-col justify-between">
          <div className="flex justify-between items-start">
            <span className="text-[10px] uppercase tracking-widest text-[#E0E0E0]/50 font-semibold">SIMULATORS</span>
            <TrendingUp className="h-4 w-4 text-[#F27D26]" />
          </div>
          <div className="my-6">
            <h3 className="text-4xl font-serif italic text-white font-bold">{totalExamsCount}</h3>
            <p className="text-[10px] text-white/40 uppercase tracking-widest mt-1">Mock Exams Completed</p>
          </div>
          <div className="text-[10px] uppercase tracking-widest font-semibold text-white/60 bg-white/5 p-2.5 rounded-xl flex items-center justify-between border border-white/5">
            <span>Peak Score</span>
            <span className="font-mono text-sm font-bold text-[#F27D26]">
              {totalExamsCount > 0 
                ? `${Math.max(...progress.completedExams.map(ex => ex.score))}%` 
                : "No runs"}
            </span>
          </div>
        </div>

        {/* Bookmarked Questions Card */}
        <div className="glass p-6 rounded-3xl flex flex-col justify-between">
          <div className="flex justify-between items-start">
            <span className="text-[10px] uppercase tracking-widest text-[#E0E0E0]/50 font-semibold">SAVED QUESTION BANK</span>
            <BookMarked className="h-4 w-4 text-[#F27D26]" />
          </div>
          <div className="my-6">
            <h3 className="text-4xl font-serif italic text-white font-bold">{progress.savedQuestions.length}</h3>
            <p className="text-[10px] text-white/40 uppercase tracking-widest mt-1">Items saved for review</p>
          </div>
          <button 
            onClick={() => setActiveTab("questions")}
            className="text-[10px] uppercase tracking-widest font-bold text-[#F27D26] hover:underline text-left cursor-pointer flex items-center space-x-1"
          >
            <span>BROWSE ALL QUESTIONS</span>
            <ChevronRight className="h-3 w-3" />
          </button>
        </div>

      </div>

      {/* Dynamic Recommendation Alert */}
      <div className="glass p-5 rounded-3xl border border-[#F27D26]/20 flex items-start space-x-4 bg-[#F27D26]/5">
        <div className="bg-[#F27D26]/10 text-[#F27D26] p-2.5 rounded-xl">
          <Lightbulb className="h-5 w-5" />
        </div>
        <div className="flex-1 space-y-1">
          <h4 className="text-xs font-bold uppercase tracking-widest text-[#F27D26]">Suggested STUDY DIRECTION</h4>
          <p className="text-xs text-white/70 leading-relaxed">
            Your lowest calculated score is in <strong className="text-white font-semibold">{weakestTopics[0].name} ({weakestTopics[0].score}% mastery)</strong>. 
            We recommend trying 10 practice questions on this topic. You can also generate random AI questions or consult with the Tutor.
          </p>
          <div className="pt-1.5">
            <button 
              onClick={() => handleStudyRecommend(weakestTopics[0].name)}
              className="text-xs font-bold text-[#F27D26] hover:text-[#ff9e59] flex items-center space-x-1 cursor-pointer"
            >
              <span>Practice now</span>
              <ChevronRight className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Strengths and Weaknesses Dashboard */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Core Topics Mastery Breakdown Stack */}
        <div className="glass p-6 rounded-3xl space-y-6">
          <div className="flex justify-between items-center pb-2 border-b border-white/5">
            <h4 className="text-xs font-bold uppercase tracking-widest text-white/50">Curriculum Subject Mastery</h4>
            <span className="text-[10px] bg-white/5 px-2 py-0.5 rounded-md font-mono text-white/40 font-semibold uppercase tracking-wider">15 Subjects</span>
          </div>

          <div className="h-96 overflow-y-auto space-y-4 pr-1">
            {categorizedScores.map((item) => (
              <div key={item.name} className="space-y-1.5" id={`subject-mastery-${item.name.replace(/\s+/g, '-').toLowerCase()}`}>
                <div className="flex justify-between text-xs font-medium">
                  <span className="text-white/80">{item.name}</span>
                  <span className="font-mono text-white font-bold">{item.score}%</span>
                </div>
                <div className="w-full bg-white/5 h-1.5 rounded-full overflow-hidden">
                  <div 
                    className={`h-full transition-all duration-500 ${
                      item.score >= 80 
                        ? "bg-[#F27D26]" 
                        : item.score >= 50 
                          ? "bg-white/40" 
                          : item.score > 0 
                            ? "bg-white/15" 
                            : "bg-white/5"
                    }`}
                    style={{ width: `${Math.max(item.score, 3)}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Strengths & Weaknesses Panel */}
        <div className="space-y-8">
          
          {/* Strengths List */}
          <div className="glass p-6 rounded-3xl space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-widest text-[#F27D26] pb-2 border-b border-white/5 flex items-center space-x-2">
              <TrendingUp className="h-4 w-4" />
              <span>Your Strongest Categories</span>
            </h4>
            
            {strongestTopics.length === 0 ? (
              <p className="text-xs text-white/40 italic text-center py-4">No practice data recorded yet. Take practice quizzes to track strengths!</p>
            ) : (
              <div className="space-y-3">
                {strongestTopics.map((topic, i) => (
                  <div key={topic.name} className="flex justify-between items-center p-3 bg-white/5 rounded-xl border border-white/5">
                    <span className="text-xs font-semibold text-white/90">
                      <span className="font-mono text-[9px] uppercase tracking-widest bg-[#F27D26]/10 text-[#F27D26] px-1.5 py-0.5 rounded-lg mr-2 font-bold select-none">{i+1}</span>
                      {topic.name}
                    </span>
                    <span className="font-mono text-xs font-bold text-[#F27D26]">{topic.score}%</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Weaknesses List */}
          <div className="glass p-6 rounded-3xl space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-widest text-white/50 pb-2 border-b border-white/5 flex items-center space-x-2">
              <AlertTriangle className="h-4 w-4 text-[#F27D26]" />
              <span>Areas for Revision / Target Weaknesses</span>
            </h4>
            
            <div className="space-y-3">
              {weakestTopics.map((topic, i) => (
                <div key={topic.name} className="flex justify-between items-center p-3 bg-white/5 rounded-xl border border-white/5">
                  <span className="text-xs font-semibold text-white/80">
                    <span className="font-mono text-[9px] uppercase tracking-widest bg-white/10 text-white/60 px-1.5 py-0.5 rounded-lg mr-2 font-bold select-none">{i+1}</span>
                    {topic.name}
                  </span>
                  <span className="flex items-center space-x-2">
                    <span className="font-mono text-xs font-bold text-white/60">{topic.score}%</span>
                    <button 
                      onClick={() => handleStudyRecommend(topic.name)}
                      className="p-1 text-[#F27D26] hover:text-[#ff9e59] hover:bg-white/5 rounded-lg transition-colors cursor-pointer"
                      title="Practice this topic"
                    >
                      <ChevronRight className="h-4 w-4" />
                    </button>
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Recent History Overview */}
          <div className="glass p-6 rounded-3xl space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-widest text-white/50 pb-2 border-b border-white/5">
              Recent Activity logs
            </h4>
            {progress.completedQuizzes.length === 0 && progress.completedExams.length === 0 ? (
              <p className="text-xs text-white/40 italic text-center py-4">No recent activity detected. Completed reviews appear here.</p>
            ) : (
              <div className="space-y-3 max-h-48 overflow-y-auto pr-1">
                {[...progress.completedExams].reverse().map(ex => (
                  <div key={ex.id} className="text-xs flex items-center justify-between p-2.5 bg-white/3 border border-white/5 hover:bg-white/5 rounded-xl transition-colors">
                    <div className="space-y-0.5">
                      <p className="font-semibold text-white/80">Simulation Mock Exam</p>
                      <p className="text-[10px] text-white/40 font-mono">{ex.date.split("T")[0]} • {ex.examType}</p>
                    </div>
                    <span className="font-mono font-bold px-2 py-0.5 rounded-lg text-[10px] bg-[#F27D26]/10 text-[#F27D26]">
                      {ex.score}%
                    </span>
                  </div>
                ))}
                {[...progress.completedQuizzes].reverse().map(qz => (
                  <div key={qz.id} className="text-xs flex items-center justify-between p-2.5 bg-white/3 border border-white/5 hover:bg-white/5 rounded-xl transition-colors">
                    <div className="space-y-0.5">
                      <p className="font-semibold text-white/80">Topic Quiz ({qz.category})</p>
                      <p className="text-[10px] text-white/40 font-mono">{qz.date.split("T")[0]}</p>
                    </div>
                    <span className="font-mono font-bold px-2 py-0.5 rounded-lg text-[10px] bg-white/10 text-white/80">
                      {qz.score}%
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>

      </div>

    </div>
  );
}
