import React, { useState, useEffect, useRef } from "react";
import { Sparkles, MessageSquare, Send, RefreshCw, HelpCircle, GraduationCap } from "lucide-react";
import { ChatMessage, Question } from "../types";

interface AITutorProps {
  chatHistory: ChatMessage[];
  setChatHistory: React.Dispatch<React.SetStateAction<ChatMessage[]>>;
  activeTutorQuestion: Question | null;
  setActiveTutorQuestion: (q: Question | null) => void;
}

export default function AITutor({
  chatHistory,
  setChatHistory,
  activeTutorQuestion,
  setActiveTutorQuestion
}: AITutorProps) {
  
  const [inputText, setInputText] = useState<string>("");
  const [isQuerying, setIsQuerying] = useState<boolean>(false);
  const [queryError, setQueryError] = useState<string>("");
  const chatBottomRef = useRef<HTMLDivElement | null>(null);

  // Auto scroll to bottom of chat logs
  useEffect(() => {
    chatBottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatHistory, isQuerying]);

  const handleSendPrompt = async (forcedText?: string) => {
    const textToSend = forcedText || inputText;
    if (!textToSend.trim() && !activeTutorQuestion) return;

    // Build immediate local user message
    const userMsg: ChatMessage = {
      id: "usr_" + Date.now(),
      sender: "user",
      text: textToSend || `Analyze this question: "${activeTutorQuestion?.questionText}"`,
      timestamp: new Date().toISOString(),
      contextQuestionId: activeTutorQuestion?.id
    };

    const newHistory = [...chatHistory, userMsg];
    setChatHistory(newHistory);
    setInputText("");
    setIsQuerying(true);
    setQueryError("");

    try {
      const response = await fetch("/api/gemini/tutor", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt: textToSend || "Analyze this custom question and break down the code step by step.",
          chatHistory: chatHistory,
          questionContext: activeTutorQuestion
        })
      });

      const data = await response.json();
      if (data.error) {
        throw new Error(data.error);
      }

      const tutorResponse: ChatMessage = {
        id: "tut_" + Date.now(),
        sender: "tutor",
        text: data.response,
        timestamp: new Date().toISOString(),
        contextQuestionId: activeTutorQuestion?.id
      };

      setChatHistory(prev => [...prev, tutorResponse]);
    } catch (err: any) {
      console.error(err);
      setQueryError("Failed to fetch explanation from tutor. Ensure your GEMINI_API_KEY is configured.");
    } finally {
      setIsQuerying(false);
    }
  };

  const handleClearContext = () => {
    setActiveTutorQuestion(null);
  };

  // Helper to parse bold (**text**) and inline code (`code`) within text lines
  const parseInlineTokens = (rawText: string) => {
    // Splits by **...** and `...` preserving tokens for beautiful inline markup
    const tokens = rawText.split(/(\*\*.*?\*\*|`.*?`)/g);

    return tokens.map((token, idx) => {
      if (token.startsWith("**") && token.endsWith("**")) {
        return (
          <strong key={idx} className="font-bold text-white">
            {token.substring(2, token.length - 2)}
          </strong>
        );
      }
      if (token.startsWith("`") && token.endsWith("`")) {
        return (
          <code key={idx} className="font-mono text-[10px] bg-white/5 text-[#F27D26] border border-white/5 px-1.5 py-0.5 rounded-lg inline-block">
            {token.substring(1, token.length - 1)}
          </code>
        );
      }
      return token;
    });
  };

  const renderMessageText = (text: string, isUser: boolean) => {
    if (isUser) {
      return <p className="whitespace-pre-line leading-relaxed">{text}</p>;
    }

    // Split text by codeblocks
    const parts = text.split(/(```[\s\S]*?```)/g);

    return (
      <div className="space-y-3 leading-relaxed text-[#E0E0E0]">
        {parts.map((part, index) => {
          if (part.startsWith("```")) {
            // It's a code block!
            const lines = part.split("\n");
            let language = "";
            let codeLines = lines.slice(1);
            if (lines[0].length > 3) {
              language = lines[0].substring(3).trim();
            }
            if (codeLines[codeLines.length - 1].startsWith("```")) {
              codeLines = codeLines.slice(0, -1);
            }
            const code = codeLines.join("\n").trim();

            return (
              <div key={index} className="my-3 rounded-xl overflow-hidden border border-white/10 bg-black/45 shadow-inner">
                {language && (
                  <div className="bg-white/3 border-b border-white/5 px-4 py-1.5 flex justify-between items-center text-[9px] uppercase font-mono tracking-widest text-white/50">
                    <span>{language}</span>
                    <span className="text-[#F27D26] uppercase text-[8px] font-bold">Syntactically Grounded</span>
                  </div>
                )}
                <pre className="p-4 font-mono text-[11px] overflow-x-auto text-[#ff9e59] leading-6">
                  <code>{code}</code>
                </pre>
              </div>
            );
          } else {
            // It's standard text which might contain headings, list items, bold markers, and inline code!
            const lines = part.split("\n");
            return (
              <div key={index} className="space-y-1.5">
                {lines.map((line, lineIdx) => {
                  const trimmed = line.trim();

                  // 1. Check for headings
                  if (trimmed.startsWith("###")) {
                    return (
                      <h4 key={lineIdx} className="text-xs font-bold text-white uppercase tracking-wider border-b border-white/5 pb-1 mt-3">
                        {trimmed.substring(3).trim()}
                      </h4>
                    );
                  }
                  if (trimmed.startsWith("##")) {
                    return (
                      <h3 key={lineIdx} className="text-xs font-bold text-[#F27D26] tracking-tight mt-4 border-l-2 border-[#F27D26] pl-2 uppercase font-mono">
                        {trimmed.substring(2).trim()}
                      </h3>
                    );
                  }
                  if (trimmed.startsWith("#")) {
                    return (
                      <h2 key={lineIdx} className="text-sm font-serif italic font-bold text-white tracking-tight mt-5">
                        {trimmed.substring(1).trim()}
                      </h2>
                    );
                  }

                  // 2. Check for bullet list items
                  if (trimmed.startsWith("- ") || trimmed.startsWith("* ")) {
                    const content = trimmed.substring(2);
                    return (
                      <div key={lineIdx} className="flex items-start space-x-2 pl-3 my-1">
                        <span className="text-[#F27D26] text-xs font-bold mt-0.5">•</span>
                        <p className="text-white/80 leading-relaxed text-xs font-normal">
                          {parseInlineTokens(content)}
                        </p>
                      </div>
                    );
                  }

                  // Skip empty line or space spacer
                  if (!trimmed) {
                    return <div key={lineIdx} className="h-1.5" />;
                  }

                  // 3. Regular Paragraph with inline formatting
                  return (
                    <p key={lineIdx} className="text-white/80 text-xs leading-relaxed font-normal">
                      {parseInlineTokens(line)}
                    </p>
                  );
                })}
              </div>
            );
          }
        })}
      </div>
    );
  };

  return (
    <div className="flex flex-col lg:grid lg:grid-cols-12 gap-6 lg:h-[calc(100vh-12rem)] md:min-h-[500px]" id="ai-tutor-tab">
      
      {/* Question Context Card (On left if available, taking 4 cols) */}
      <div className={`lg:col-span-4 space-y-4 ${activeTutorQuestion ? "block" : "hidden lg:block lg:opacity-45"}`}>
        <div className="glass p-5 rounded-3xl border border-white/5 h-full flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex justify-between items-center pb-2 border-b border-white/5">
              <span className="text-[10px] font-bold font-mono text-white/50 uppercase tracking-widest">Active Context</span>
              {activeTutorQuestion && (
                <button 
                  onClick={handleClearContext}
                  className="text-[10px] text-[#F27D26] hover:text-[#ff9e59] font-bold uppercase tracking-wider hover:underline cursor-pointer"
                >
                  Clear context
                </button>
              )}
            </div>

            {activeTutorQuestion ? (
              <div className="space-y-4">
                <div className="space-y-1.5">
                  <span className="text-[9px] bg-[#F27D26]/10 text-[#F27D26] font-bold px-2 py-0.5 rounded-lg font-mono uppercase tracking-wider">
                    {activeTutorQuestion.category}
                  </span>
                  <h4 className="text-xs font-semibold text-white leading-relaxed pt-1">
                    {activeTutorQuestion.questionText}
                  </h4>
                </div>

                {activeTutorQuestion.codeSnippet && (
                  <pre className="bg-black/40 p-3 rounded-xl border border-white/5 font-mono text-[10px] overflow-x-auto text-[#ff9e59] leading-relaxed max-h-32">
                    <code>{activeTutorQuestion.codeSnippet}</code>
                  </pre>
                )}

                <div className="space-y-1 text-xs">
                  <p className="text-[10px] uppercase tracking-widest text-[#E0E0E0]/40 font-semibold">Correct Solution</p>
                  <p className="font-mono text-white font-bold bg-white/5 p-2 rounded-xl border border-white/5">
                    {activeTutorQuestion.correctAnswer}
                  </p>
                </div>
              </div>
            ) : (
              <div className="text-center py-10 space-y-3">
                <HelpCircle className="h-8 w-8 text-white/20 mx-auto" />
                <p className="text-[11px] text-white/40 leading-relaxed max-w-xs mx-auto">
                  No active question context. Use the "Explain with Tutor" triggering option inside the Practice Track or Mock Exams page to load contexts automatically!
                </p>
              </div>
            )}
          </div>

          {activeTutorQuestion && (
            <div className="space-y-2 pt-4 border-t border-white/5 mt-4">
              <button
                onClick={() => handleSendPrompt(`Explain how to derive the correct answer for this ${activeTutorQuestion.category} question step by step.`)}
                disabled={isQuerying}
                className="w-full py-2 bg-[#F27D26] text-black text-xs font-extrabold rounded-full hover:scale-[1.02] active:scale-95 transition-transform flex items-center justify-center space-x-2 cursor-pointer"
              >
                <GraduationCap className="h-4 w-4" />
                <span>Explain Step-by-Step</span>
              </button>
              <button
                onClick={() => handleSendPrompt("Simplify the computer science principles or tracing logic under this question.")}
                disabled={isQuerying}
                className="w-full py-2 glass text-white text-xs font-semibold rounded-full hover:bg-white/5 transition-colors flex items-center justify-center space-x-2 cursor-pointer"
              >
                <span>Simplify Concepts</span>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Chat Conversational Terminal (Takes remaining cols) */}
      <div className={`flex flex-col justify-between glass border border-white/5 rounded-3xl overflow-hidden min-h-[450px] lg:h-full ${activeTutorQuestion ? "lg:col-span-8" : "lg:col-span-12"}`}>
        
        {/* Chat Header */}
        <div className="p-4 bg-white/3 border-b border-white/5 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="bg-[#F27D26]/10 text-[#F27D26] p-2 rounded-xl">
              <Sparkles className="h-4.5 w-4.5" />
            </div>
            <div>
              <h4 className="text-xs font-bold uppercase tracking-widest text-white">Active Tutoring session</h4>
              <p className="text-[9px] uppercase tracking-widest text-white/40 font-semibold">AI Assistant • Ready</p>
            </div>
          </div>
        </div>

        {/* Chat Logs Window */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 max-h-[400px] lg:max-h-none">
          
          {chatHistory.length === 0 && (
            <div className="text-center py-16 max-w-sm mx-auto space-y-4">
              <div className="bg-white/5 p-4 rounded-full w-fit mx-auto text-[#F27D26]">
                <MessageSquare className="h-8 w-8 animate-pulse" />
              </div>
              <h4 className="text-xs font-semibold uppercase tracking-widest text-white">Ask your Personal CS Tutor</h4>
              <p className="text-xs text-white/50 leading-relaxed">
                Stuck on a recursion trace, DB relational joins, page directory paging math, or finite state machine transitions? Ask a precise question or select a preset on the left!
              </p>
            </div>
          )}

          {chatHistory.map((msg, index) => {
            const isUser = msg.sender === "user";
            return (
              <div 
                key={msg.id} 
                className={`flex ${isUser ? "justify-end" : "justify-start"}`}
              >
                <div className={`max-w-[85%] rounded-2xl p-4 text-xs font-medium leading-relaxed ${
                  isUser 
                    ? "bg-[#F27D26] text-black font-semibold rounded-br-none" 
                    : "bg-white/5 text-[#E0E0E0] border border-white/5 rounded-bl-none"
                }`}>
                  {renderMessageText(msg.text, isUser)}
                </div>
              </div>
            );
          })}

          {isQuerying && (
            <div className="flex justify-start">
              <div className="bg-white/5 border border-white/5 rounded-2xl rounded-bl-none p-4 text-xs text-white/40 flex items-center space-x-3 select-none">
                <RefreshCw className="h-4 w-4 animate-spin text-[#F27D26]" />
                <span className="font-mono font-semibold uppercase tracking-widest text-[9px]">Tutor is formulating response...</span>
              </div>
            </div>
          )}

          {queryError && (
            <div className="p-4 bg-red-900/10 text-red-400 text-xs font-semibold rounded-xl border border-red-900/20">
              {queryError}
            </div>
          )}

          <div ref={chatBottomRef} />
        </div>

        {/* Chat Inputs Footer bar */}
        <div className="p-3 sm:p-4 border-t border-white/5 bg-white/2 flex gap-2 sm:gap-3">
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && !isQuerying && handleSendPrompt()}
            disabled={isQuerying}
            placeholder={activeTutorQuestion ? "Ask tutor custom question..." : "Ask about traces, complex theories..."}
            className="flex-1 p-3 bg-black/40 border border-white/5 text-xs text-white rounded-xl focus:outline-none focus:ring-1 focus:ring-[#F27D26]"
          />
          <button
            onClick={() => handleSendPrompt()}
            disabled={isQuerying || (!inputText.trim() && !activeTutorQuestion)}
            className="p-3 bg-[#F27D26] hover:bg-[#ff9e59] disabled:opacity-45 text-black rounded-xl cursor-pointer hover:scale-[1.02] active:scale-95 transition-transform flex items-center justify-center font-bold"
          >
            <Send className="h-4 w-4" />
          </button>
        </div>

      </div>

    </div>
  );
}
