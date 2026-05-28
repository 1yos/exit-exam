import React from "react";
import { 
  LayoutDashboard, 
  GraduationCap, 
  BookOpen, 
  Clock, 
  Zap, 
  MessageSquare, 
  Sun, 
  Moon, 
  Sparkles,
  Bookmark,
  ChevronLeft,
  HelpCircle
} from "lucide-react";

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  darkMode: boolean;
  setDarkMode: (val: boolean) => void;
  studyStreak: number;
  isOpen: boolean;
  onClose: () => void;
  isCollapsed?: boolean;
  onToggleCollapse?: () => void;
}

export default function Sidebar({ 
  activeTab, 
  setActiveTab, 
  darkMode, 
  setDarkMode, 
  studyStreak,
  isOpen,
  onClose,
  isCollapsed = false,
  onToggleCollapse
}: SidebarProps) {
  
  const navItems = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { id: "lessons", label: "Study Topics", icon: BookOpen },
    { id: "studynotes", label: "Study Notes & Quiz", icon: Bookmark },
    { id: "questions", label: "Questions Repository", icon: HelpCircle },
    { id: "practice", label: "Practice Track", icon: GraduationCap },
    { id: "exams", label: "Timed Mock Exams", icon: Clock },
    { id: "flashcards", label: "Flashcards", icon: Zap },
    { id: "tutor", label: "Tutor Assistant", icon: MessageSquare }
  ];

  return (
    <>
      {/* Mobile Drawer Overlay Backdrop */}
      {isOpen && (
        <div 
          onClick={onClose}
          id="sidebar-overlay"
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-40 md:hidden"
        />
      )}

      {/* Sidebar Container */}
      <aside 
        id="sidebar-container" 
        className={`fixed top-0 left-0 h-screen w-64 bg-[#0A0A0A] border-r border-subtle flex flex-col justify-between z-50 p-6 transition-transform duration-300 ${
          isOpen 
            ? "translate-x-0" 
            : isCollapsed 
              ? "-translate-x-full" 
              : "-translate-x-full md:translate-x-0"
        }`}
      >
        {/* Platform Header */}
        <div>
          <div className="mb-10 flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-serif italic font-bold text-[#F27D26] tracking-tight">CS.Exit</h1>
              <p className="text-[10px] uppercase tracking-[0.2em] text-white/50">Exam Prep Engine</p>
            </div>
            <div className="flex items-center space-x-1">
              {/* Desktop collapse button */}
              {onToggleCollapse && (
                <button
                  onClick={onToggleCollapse}
                  className="hidden md:flex p-1.5 rounded-lg hover:bg-white/5 border border-transparent hover:border-white/10 text-white/50 hover:text-white transition-all duration-150 cursor-pointer"
                  title="Collapse Sidebar"
                  aria-label="Collapse Sidebar"
                >
                  <ChevronLeft className="h-4.5 w-4.5" />
                </button>
              )}
              {/* Mobile close button inside the sidebar drawer */}
              <button 
                onClick={onClose}
                className="md:hidden p-1 rounded-lg hover:bg-white/5 text-white/50 hover:text-white"
                aria-label="Close menu"
              >
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>

          {/* Navigation Actions */}
          <nav className="space-y-1.5" id="nav-actions">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  id={`nav-${item.id}`}
                  onClick={() => {
                    setActiveTab(item.id);
                    onClose();
                  }}
                  className={`w-full flex items-center space-x-3 px-3.5 py-3 rounded-xl text-xs font-semibold tracking-wide transition-all duration-150 ${
                    isActive 
                      ? "bg-white/5 border border-white/10 text-white shadow-md shadow-black/40" 
                      : "text-white/60 hover:text-white hover:bg-white/3"
                  }`}
                >
                  <Icon className={`h-4.5 w-4.5 ${isActive ? "text-[#F27D26]" : "text-white/40"}`} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

      {/* Sidebar Footer (Streak + Theme Toggle) */}
      <div className="space-y-4">
        {/* Streak Monitor (styled according to the Sophisticated Dark spec) */}
        <div className="p-4 glass rounded-xl border border-white/5">
          <p className="text-[10px] uppercase tracking-widest text-white/50 mb-1.5">Daily Streak</p>
          <div className="flex items-center justify-between">
            <span className="text-lg font-serif italic text-white font-semibold">{studyStreak} Days</span>
            <span className="text-[#F27D26] filter drop-shadow-[0_0_8px_rgba(242,125,38,0.5)]">🔥</span>
          </div>
        </div>

        {/* Theme Settings Actuator */}
        <div className="flex items-center justify-between pt-2 border-t border-white/5">
          <span className="text-[10px] uppercase tracking-widest text-white/40">Theme</span>
          <button
            id="theme-toggle"
            onClick={() => setDarkMode(!darkMode)}
            className="p-2 rounded-lg bg-white/5 border border-white/10 text-white/60 hover:text-white hover:scale-105 transition-all cursor-pointer"
            aria-label="Toggle theme mode"
          >
            {darkMode ? <Sun className="h-4 w-4 text-amber-550" /> : <Moon className="h-4 w-4 text-white/80" />}
          </button>
        </div>
      </div>
    </aside>
    </>
  );
}
