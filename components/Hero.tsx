
import React, { useEffect, useState } from 'react';

const Hero: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleScrollToWork = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const workSection = document.getElementById('work');
    if (workSection) {
      window.scrollTo({
        top: workSection.offsetTop - 100,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section className="relative min-h-[90vh] flex flex-col justify-center items-center text-center px-6 overflow-hidden bg-[var(--bg-color)] transition-theme">
      {/* Cinematic Background Overlay - Optimized with Eager Loading */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=2000&auto=format&fit=crop" 
          alt="Photographer with camera" 
          className={`w-full h-full object-cover scale-105 animate-[slowZoom_30s_infinite_alternate] transition-opacity duration-1000 ${
            imageLoaded ? 'opacity-[0.12] dark:opacity-[0.2]' : 'opacity-0'
          }`}
          loading="eager"
          // Fix: Use camelCase fetchPriority as required by React
          fetchPriority="high"
          onLoad={() => setImageLoaded(true)}
        />
        {/* Soft Vignette and Color Blending */}
        <div className="absolute inset-0 bg-gradient-to-b from-[var(--bg-color)] via-transparent to-[var(--bg-color)]"></div>
        <div className="absolute inset-0 bg-[var(--bg-color)]/20"></div>
      </div>

      <div className={`relative z-10 max-w-5xl mx-auto space-y-8 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
        <div className="space-y-4">
          <p className="text-[9px] md:text-[10px] text-[#7A8F7A] tracking-[0.6em] uppercase font-bold animate-[tracking_2.5s_ease-out] overflow-hidden">
            <span className="inline-block translate-y-full animate-[revealUp_1s_0.2s_ease-out_forwards]">
              Vicky Vibes &bull; Visual Storyteller
            </span>
          </p>
          
          <h1 className="text-3xl md:text-5xl lg:text-6xl leading-[1.3] tracking-tight text-[var(--text-color)] max-w-4xl mx-auto">
            <span className="block overflow-hidden">
              <span className="inline-block translate-y-full animate-[revealUp_1s_0.4s_ease-out_forwards] font-extralight opacity-90">
                I capture moments, emotions,
              </span>
            </span>
            <span className="block overflow-hidden mt-2">
              <span className="inline-block translate-y-full animate-[revealUp_1s_0.6s_ease-out_forwards] font-extralight opacity-90">
                & stories through my lens
              </span>
            </span>
          </h1>
        </div>

        <div className="pt-2 overflow-hidden">
          <div className="translate-y-[200%] animate-[revealUp_1s_1s_ease-out_forwards]">
            <a 
              href="#work"
              onClick={handleScrollToWork}
              className="group relative inline-flex items-center justify-center px-8 py-3.5 text-[9px] uppercase tracking-[0.4em] font-bold transition-all duration-700 border border-[var(--glass-border)] hover:border-[var(--text-color)]/20 rounded-full overflow-hidden text-[var(--text-color)]/60 hover:text-[var(--text-color)]"
            >
              <span className="absolute inset-0 bg-[var(--glass-bg)] opacity-0 group-hover:opacity-100 transition-opacity"></span>
              <span className="relative flex items-center gap-3">
                View Works
                <svg className="w-3.5 h-3.5 transform group-hover:translate-x-1.5 transition-transform duration-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </span>
            </a>
          </div>
        </div>
      </div>

      {/* Subtle Scroll Indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 opacity-20 hidden md:block">
        <div className="w-[1px] h-10 bg-gradient-to-b from-[var(--text-color)] to-transparent"></div>
      </div>

      <style>{`
        @keyframes slowZoom {
          from { transform: scale(1.02); }
          to { transform: scale(1.1); }
        }
        @keyframes revealUp {
          from { transform: translateY(110%); }
          to { transform: translateY(0); }
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