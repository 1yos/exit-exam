import React, { useState } from "react";
import { BookOpen, Award, FileEdit, PlusCircle, Check } from "lucide-react";
import { SEEDED_LESSONS } from "../lessonsData";
import { Lesson, StudentProgress } from "../types";

interface LessonsProps {
  progress: StudentProgress;
  saveProgress: (progress: StudentProgress) => void;
}

export default function Lessons({ progress, saveProgress }: LessonsProps) {
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

  const [selectedCategory, setSelectedCategory] = useState<string>(categories[0]);
  const [localNotes, setLocalNotes] = useState<string>(progress.notes[selectedCategory] || "");
  const [isSavedIndicator, setIsSavedIndicator] = useState<boolean>(false);

  // Find curated lesson summary if pre-seeded, otherwise generate dynamic default
  const activeLesson: Lesson = SEEDED_LESSONS.find(les => les.category === selectedCategory) || {
    id: `les_${selectedCategory.toLowerCase().replace(/\s+/g, "_")}`,
    category: selectedCategory,
    title: `Comprehensive Guide to ${selectedCategory}`,
    summary: `Structured concept breakdown, core definitions, and preparatory advice for ${selectedCategory} sub-areas.`,
    contentMarkdown: `
# Study Notes: ${selectedCategory}

This topic forms a crucial segment of the national CS Exit Exam curriculum. When studying this module, emphasize:
- Core scientific definitions, vocabulary, and acronym standards.
- Classic mathematical complexity proofs, system schemas, or design layouts.
- Dynamic traps like logical parsing rules, memory pagination structures, or networking frame packet encapsulations.

### Exam Core Pillars to Master:
1. **Fundamental Concepts:** The essential primitives and baseline mechanics.
2. **Analysis Principles:** Quantifying resource complexity, scalability, and system overheads.
3. **Common Traps:** Tricky edge cases often featured as multiple-choice questions.

Use the practice tab next to try questions on this exact topic.
`,
    difficultyProgression: ["Introductory Standards", "Intermediate Contexts", "Advanced Exam Frameworks"],
    keyFormulas: [] as string[],
    tips: [
      "Review official past paper questions on this topic before simulation exams.",
      "Write out key structures or logic cascades recursively to lock core principles down."
    ]
  } as Lesson;

  const handleNotesChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setLocalNotes(e.target.value);
  };

  const handleSaveNotes = () => {
    const updatedNotes = { ...progress.notes, [selectedCategory]: localNotes };
    const updatedProgress = { ...progress, notes: updatedNotes };
    saveProgress(updatedProgress);
    setIsSavedIndicator(true);
    setTimeout(() => {
      setIsSavedIndicator(false);
    }, 2000);
  };

  const handleCategorySwitch = (cat: string) => {
    setSelectedCategory(cat);
    setLocalNotes(progress.notes[cat] || "");
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-8" id="lessons-tab">
      
      {/* 1. Sidebar Topics Selector (3 cols on desktop, dropdown on mobile) */}
      <div className="lg:col-span-4 space-y-4">
        
        {/* Mobile Filter select */}
        <div className="lg:hidden glass p-4 rounded-3xl border border-white/5">
          <label className="block text-[10px] uppercase tracking-widest text-[#E0E0E0]/50 font-bold mb-2">
            Select Study Topic
          </label>
          <div className="relative">
            <select
              value={selectedCategory}
              onChange={(e) => handleCategorySwitch(e.target.value)}
              className="w-full bg-black/40 border border-white/10 text-xs text-white p-3 rounded-xl appearance-none focus:outline-none focus:ring-1 focus:ring-[#F27D26] cursor-pointer font-semibold"
            >
              {categories.map((cat) => (
                <option key={cat} value={cat} className="bg-[#0A0A0A] text-white">
                  {cat} ({progress.categoryMastery[cat] || 0}% mastery)
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

        {/* Desktop Sidebar Lists */}
        <div className="hidden lg:block glass p-5 rounded-3xl border border-white/5">
          <h3 className="text-[10px] font-bold text-white/40 font-mono mb-4 uppercase tracking-widest">Exam Topic Checklist</h3>
          <div className="space-y-1.5 max-h-[60vh] overflow-y-auto pr-1" id="topic-notes-checklist">
            {categories.map((cat) => {
              const isSelected = selectedCategory === cat;
              const mastery = progress.categoryMastery[cat] || 0;
              return (
                <button
                  key={cat}
                  onClick={() => handleCategorySwitch(cat)}
                  className={`w-full flex items-center justify-between p-3 rounded-xl text-left text-xs font-semibold tracking-wide transition-all ${
                    isSelected 
                      ? "bg-white/5 border border-white/10 text-white shadow-md shadow-black/40 scale-[1.01]" 
                      : "text-white/60 hover:text-white hover:bg-white/3"
                  }`}
                >
                  <span className="truncate pr-2">{cat}</span>
                  <span className={`font-mono text-[9px] px-1.5 py-0.5 rounded-lg border border-white/5 ${isSelected ? "bg-[#F27D26]/10 text-[#F27D26] font-bold" : "bg-white/5 text-white/45"}`}>
                    {mastery}%
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* 2. active lesson reader (8 cols) */}
      <div className="lg:col-span-8 space-y-6">
        
        {/* Curated Lesson Summary */}
        <div className="glass p-6 sm:p-8 rounded-3xl border border-white/5 space-y-6">
          <div className="space-y-2">
            <h2 className="text-2xl font-serif italic font-bold text-white tracking-tight">{activeLesson.title}</h2>
            <p className="text-white/60 text-xs sm:text-sm leading-relaxed">{activeLesson.summary}</p>
          </div>

          {/* Curriculum Progression Guide */}
          <div className="flex flex-wrap gap-2 items-center text-[10px] border-y border-white/5 py-3">
            <span className="text-white/40 font-mono uppercase tracking-widest">Recommended:</span>
            {activeLesson.difficultyProgression.map((lvl, index) => (
              <React.Fragment key={lvl}>
                <span className="px-2 py-0.5 bg-white/5 text-white/80 font-semibold rounded-lg border border-white/5 text-[9px] uppercase tracking-wider">
                  {lvl}
                </span>
                {index < activeLesson.difficultyProgression.length - 1 && <span className="text-white/20">→</span>}
              </React.Fragment>
            ))}
          </div>

          {/* Lesson Content Rendering */}
          <div className="prose prose-invert max-w-none text-white/80 text-xs sm:text-sm leading-relaxed space-y-4 pt-4">
            {activeLesson.contentMarkdown.split("\n\n").map((para, idx) => {
              if (para.trim().startsWith("#")) {
                const headerText = para.replace(/#/g, "").trim();
                return <h3 key={idx} className="text-base sm:text-lg font-bold text-white pt-2 border-b border-white/5 pb-1">{headerText}</h3>;
              }
              if (para.trim().startsWith("-")) {
                const bulletList = para.split("\n").map(l => l.replace("-", "").trim());
                return (
                  <ul key={idx} className="list-disc pl-5 space-y-1.5 text-white/70">
                    {bulletList.map((bu, bi) => <li key={bi}>{bu}</li>)}
                  </ul>
                );
              }
              if (para.trim().startsWith("```")) {
                const rawCode = para.replace(/```[a-z]*/g, "").trim();
                return (
                  <pre key={idx} className="bg-black/45 p-4 rounded-xl overflow-x-auto font-mono text-xs text-[#ff9e59] border border-white/5">
                    <code>{rawCode}</code>
                  </pre>
                );
              }
              return <p key={idx}>{para.trim()}</p>;
            })}
          </div>

          {/* Key Formulas */}
          {activeLesson.keyFormulas && activeLesson.keyFormulas.length > 0 && (
            <div className="glass p-5 rounded-3xl border border-[#F27D26]/10 space-y-2 bg-[#F27D26]/3">
              <h4 className="text-[9px] font-bold text-[#F27D26] uppercase tracking-widest font-mono">Key Formula / Cheat sheet</h4>
              <ul className="text-xs text-white/80 space-y-1.5 font-mono">
                {activeLesson.keyFormulas.map((f, i) => (
                  <li key={i} className="flex items-start space-x-2">
                    <span className="text-[#F27D26]">•</span>
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Study Tips */}
          <div className="space-y-2.5">
            <h4 className="text-[9px] font-bold text-white/40 uppercase tracking-widest font-mono">Prep Tips</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {activeLesson.tips.map((tip, i) => (
                <div key={i} className="p-3 bg-white/3 border border-white/5 rounded-2xl text-[11px] text-white/70 leading-relaxed">
                  {tip}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Personalized Student Notes Section */}
        <div className="glass p-6 sm:p-8 rounded-3xl border border-white/5 space-y-4">
          <div className="flex justify-between items-center pb-2 border-b border-white/5">
            <div className="flex items-center space-x-2">
              <BookOpen className="h-4 w-4 text-[#F27D26]" />
              <h4 className="text-xs font-bold uppercase tracking-widest text-white">Active Study Notes</h4>
            </div>
            <span className="text-[8px] uppercase tracking-widest text-white/40 bg-white/5 px-2.5 py-1 rounded-lg font-bold">Auto-Persisted</span>
          </div>

          <p className="text-xs text-white/50 leading-relaxed">
            Draft key schemas, definitions, or custom reminders here. Your notes sync directly to your progress database profile.
          </p>

          <textarea
            value={localNotes}
            onChange={handleNotesChange}
            placeholder={`Jot down custom details about ${selectedCategory} (e.g. key concepts, personal weak items, code shortcuts...)`}
            className="w-full h-32 p-4 bg-black/40 text-xs text-white rounded-2xl border border-white/5 focus:outline-none focus:ring-1 focus:ring-[#F27D26] font-sans"
          />

          <div className="flex justify-end">
            <button
              onClick={handleSaveNotes}
              className={`px-5 py-2 rounded-full text-xs font-bold flex items-center space-x-2 transition-transform cursor-pointer hover:scale-105 ${
                isSavedIndicator 
                  ? "bg-emerald-600 text-white" 
                  : "bg-[#F27D26] text-black accent-glow"
              }`}
            >
              {isSavedIndicator ? <Check className="h-4 w-4" /> : <PlusCircle className="h-4 w-4" />}
              <span>{isSavedIndicator ? "Notes Saved!" : "Save Topic Notes"}</span>
            </button>
          </div>
        </div>

      </div>

    </div>
  );
}
