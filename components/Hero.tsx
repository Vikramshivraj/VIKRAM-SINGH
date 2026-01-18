
import React from 'react';

const Hero: React.FC = () => {
  return (
    <section className="relative min-h-screen flex flex-col justify-center items-center text-center px-6 overflow-hidden">
      {/* Background Image Container */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1493246507139-91e8bef99c02?auto=format&fit=crop&q=80&w=2000" 
          alt="Hero Background" 
          className="w-full h-full object-cover opacity-40 scale-105 animate-[slowZoom_20s_infinite_alternate]"
        />
        {/* Soft Gradient Overlay to blend with the background color */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#F8F8F6]/20 via-[#F8F8F6]/60 to-[#F8F8F6]"></div>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto space-y-6 animate-[fadeIn_1.2s_ease-out]">
        <h1 className="text-3xl md:text-5xl lg:text-6xl serif leading-tight text-[#1C1C1C]">
          Hi, I’m Vicky — I capture moments, <span className="italic">emotions</span>, and stories through my lens.
        </h1>
        
        <p className="text-sm md:text-base text-black/50 tracking-[0.3em] uppercase font-light">
          Travel • Nature • Street • Emotions
        </p>

        <div className="pt-6">
          <a 
            href="#work"
            className="inline-block bg-[#1C1C1C] text-white px-10 py-4 text-xs uppercase tracking-widest font-medium rounded-full hover:bg-black/80 transition-all duration-300 transform hover:-translate-y-1 shadow-sm"
          >
            View My Work
          </a>
        </div>
      </div>
      
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce opacity-30">
        <svg className="w-5 h-5 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 14l-7 7-7-7" />
        </svg>
      </div>

      <style>{`
        @keyframes slowZoom {
          from { transform: scale(1.0); }
          to { transform: scale(1.1); }
        }
      `}</style>
    </section>
  );
};

export default Hero;
