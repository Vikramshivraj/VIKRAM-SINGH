
import React from 'react';

const Hero: React.FC = () => {
  const handleScrollToWork = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const workSection = document.getElementById('work');
    if (workSection) {
      workSection.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  return (
    <section className="relative min-h-[90vh] flex flex-col justify-center items-center text-center px-6 overflow-hidden">
      {/* Background Image Container */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=2000&auto=format&fit=crop" 
          alt="Photographer holding a camera" 
          className="w-full h-full object-cover opacity-[0.35] scale-105 animate-[slowZoom_40s_infinite_alternate]"
        />
        {/* Multilayered Gradient for enhanced contrast and depth */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#F8F8F6]/80 via-transparent to-[#F8F8F6]"></div>
        <div className="absolute inset-0 bg-[#F8F8F6]/20 backdrop-blur-[0.5px]"></div>
      </div>

      <div className="relative z-10 max-w-5xl mx-auto space-y-10 animate-[fadeIn_1.5s_ease-out]">
        <div className="space-y-4">
          <p className="text-[10px] md:text-xs text-[#7A8F7A] tracking-[0.6em] uppercase font-bold animate-[tracking_1.5s_ease-out]">
            Storyteller • Photographer • Explorer
          </p>
          <h1 className="text-4xl md:text-6xl lg:text-8xl serif leading-[1.1] text-[#1C1C1C] drop-shadow-[0_2px_10px_rgba(255,255,255,0.8)]">
            I capture moments, <span className="italic font-normal">emotions</span>, & stories through my lens.
          </h1>
        </div>
        
        <div className="pt-4">
          <a 
            href="#work"
            onClick={handleScrollToWork}
            className="group relative inline-flex items-center justify-center bg-[#1C1C1C] text-white px-12 py-5 text-[10px] uppercase tracking-[0.4em] font-bold rounded-full hover:bg-black transition-all duration-700 shadow-2xl hover:shadow-[#7A8F7A]/30 transform hover:scale-105 active:scale-95"
          >
            View My Work
          </a>
        </div>
      </div>

      <style>{`
        @keyframes slowZoom {
          from { transform: scale(1.0); }
          to { transform: scale(1.2); }
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(40px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes tracking {
          from { letter-spacing: 0.2em; opacity: 0; }
          to { letter-spacing: 0.6em; opacity: 1; }
        }
      `}</style>
    </section>
  );
};

export default Hero;
