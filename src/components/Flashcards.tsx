import React, { useState } from "react";
import { SEEDED_FLASHCARDS } from "../flashcardsData";
import { ChevronLeft, ChevronRight, RotateCcw, Zap } from "lucide-react";

export default function Flashcards() {
  const [currentIdx, setCurrentIdx] = useState<number>(0);
  const [flipped, setFlipped] = useState<boolean>(false);

  const activeCard = SEEDED_FLASHCARDS[currentIdx];

  const handleNext = () => {
    setFlipped(false);
    setTimeout(() => {
      setCurrentIdx((prev) => (prev + 1) % SEEDED_FLASHCARDS.length);
    }, 150);
  };

  const handlePrev = () => {
    setFlipped(false);
    setTimeout(() => {
      setCurrentIdx((prev) => (prev - 1 + SEEDED_FLASHCARDS.length) % SEEDED_FLASHCARDS.length);
    }, 150);
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6 sm:space-y-8 py-4 sm:py-6" id="flashcards-tab">
      
      {/* Header Info */}
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-serif italic font-bold text-white tracking-tight">Revision Flashcards</h2>
        <p className="text-white/60 text-xs sm:text-sm leading-relaxed max-w-md mx-auto">
          Quickly review core formulas, terms, and computer science concepts. Click a card to flip it over!
        </p>
      </div>

      {activeCard && (
        <div className="space-y-6">
          
          {/* Card Flapper Container (Flip Animation with Tailwind) */}
          <div 
            onClick={() => setFlipped(!flipped)}
            className="h-80 w-full cursor-pointer select-none perspective-1000"
            id={`flashcard-card-${activeCard.id}`}
          >
            <div className={`relative w-full h-full text-center transition-transform duration-500 transform-style-3d ${flipped ? "rotate-y-180" : ""}`}>
              
               {/* FACE 1: FRONT */}
              <div className="absolute inset-0 glass border border-white/5 rounded-3xl p-6 sm:p-8 flex flex-col justify-between items-center shadow-md backface-hidden">
                <div className="flex justify-between items-center w-full">
                  <span className="text-[9px] bg-[#F27D26]/10 text-[#F27D26] font-bold px-2.5 py-1 rounded-lg uppercase tracking-wider font-mono border border-[#F27D26]/15">
                    {activeCard.category}
                  </span>
                  <Zap className="h-4 w-4 text-[#F27D26] animate-pulse" />
                </div>
                
                <h3 className="text-base sm:text-lg font-bold text-white px-3 leading-relaxed max-w-lg tracking-wide">
                  {activeCard.front}
                </h3>

                <p className="text-[9px] uppercase tracking-widest text-[#E0E0E0]/40 font-mono">
                  Tap card to reveal answer
                </p>
              </div>

              {/* FACE 2: BACK */}
              <div className="absolute inset-0 bg-[#0A0A0A] border border-[#F27D26]/20 rounded-3xl p-6 sm:p-8 flex flex-col justify-between items-center shadow-lg transform rotate-y-180 backface-hidden">
                <div className="flex justify-between items-center w-full">
                  <span className="text-[9px] bg-white/5 text-[#E0E0E0]/60 font-bold px-2.5 py-1 rounded-lg uppercase tracking-wider font-mono border border-white/5">
                    {activeCard.category}
                  </span>
                  <Zap className="h-4 w-4 text-emerald-400 fill-emerald-400" />
                </div>

                <p className="text-xs sm:text-sm font-semibold text-white/90 px-3 leading-relaxed max-w-lg whitespace-pre-line">
                  {activeCard.back}
                </p>

                <p className="text-[9px] uppercase tracking-widest text-[#E0E0E0]/40 font-mono">
                  Tap card to flip back
                </p>
              </div>

            </div>
          </div>

          {/* Carousel Actions */}
          <div className="flex items-center justify-between px-6">
            <button 
              onClick={handlePrev}
              className="p-3 bg-white/5 border border-white/5 hover:border-white/10 rounded-full text-white/75 hover:text-white transition-all flex items-center justify-center cursor-pointer hover:scale-105 active:scale-95"
            >
              <ChevronLeft className="h-4.5 w-4.5" />
            </button>

            <span className="text-[10px] uppercase tracking-widest font-mono font-bold text-white/40">
              Card {currentIdx + 1} of {SEEDED_FLASHCARDS.length}
            </span>

            <button 
              onClick={handleNext}
              className="p-3 bg-white/5 border border-white/5 hover:border-white/10 rounded-full text-white/75 hover:text-white transition-all flex items-center justify-center cursor-pointer hover:scale-105 active:scale-95"
            >
              <ChevronRight className="h-4.5 w-4.5" />
            </button>
          </div>

        </div>
      )}

      {/* Tailwind Utility Helper for 3D Transform perspectives on modern browsers */}
      <style>{`
        .perspective-1000 {
          perspective: 1000px;
        }
        .transform-style-3d {
          transform-style: preserve-3d;
        }
        .backface-hidden {
          backface-visibility: hidden;
        }
        .rotate-y-180 {
          transform: rotateY(180deg);
        }
      `}</style>

    </div>
  );
}
