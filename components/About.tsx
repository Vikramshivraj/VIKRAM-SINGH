import React, { useEffect, useRef } from 'react';

const About: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) entry.target.classList.add('active');
        });
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const capabilities = [
    'Cinematic Streetwise',
    'Narrative Portraits',
    'Raw Color Grading'
  ];

  const philosophyPoints = [
    "Focus on what's real, blur what's noise.",
    "Capture the emotion, not just the image.",
    "Find beauty in the unscripted chaos."
  ];

  return (
    <section id="about" ref={sectionRef} className="py-32 px-6 lg:px-12 bg-[var(--bg-color)] section-reveal transition-theme">
      <div className="max-w-[1400px] mx-auto bg-[var(--glass-bg)] border border-[var(--glass-border)] rounded-[4rem] p-10 md:p-24 overflow-hidden relative shadow-2xl">
        {/* Subtle Decorative Element */}
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-[#7A8F7A]/10 blur-[100px] rounded-full pointer-events-none"></div>

        <div className="grid lg:grid-cols-2 gap-24 items-center">
          <div className="relative group">
            <div className="aspect-[4/5] overflow-hidden rounded-[3rem] shadow-[0_50px_100px_rgba(0,0,0,0.2)] dark:shadow-[0_50px_100px_rgba(0,0,0,0.8)] border border-[var(--glass-border)]">
              <img 
                src="https://i.pinimg.com/736x/32/f6/02/32f602e681b20d9cc4aa6f9a510a1ac5.jpg" 
                alt="Vicky - Photographer" 
                className="w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-110"
              />
            </div>
          </div>
          
          <div className="space-y-12">
            <div className="space-y-6">
              <span className="text-[#7A8F7A] text-xs uppercase tracking-[0.5em] font-bold">Behind the Lens</span>
              <h2 className="text-5xl md:text-7xl serif leading-[0.9] tracking-tighter text-[var(--text-color)]">Photography is the pause button of life.</h2>
            </div>
            
            <div className="space-y-8 text-[var(--text-muted)] font-light leading-relaxed text-xl">
              <div className="space-y-6">
                <p>
                  I’m Vicky, a travel and photography enthusiast who loves capturing moments and emotions. I explore different places and try to record what I feel through my lens.
                </p>
                <p>
                  My journey started with a simple curiosity, which evolved into a passion for storytelling. I seek out the quiet beauty in everyday life, whether it's a coastal sunset or a busy street corner.
                </p>
              </div>
              
              <div className="grid sm:grid-cols-2 gap-12 pt-6">
                 {/* Capabilities Section */}
                 <div className="space-y-5">
                    <h4 className="text-[var(--text-color)] font-bold uppercase tracking-widest text-[10px] flex items-center gap-2">
                       <span className="w-4 h-[1px] bg-[#7A8F7A]"></span>
                       Capabilities
                    </h4>
                    <ul className="space-y-3">
                       {capabilities.map((cap) => (
                         <li key={cap} className="flex items-center gap-3 group">
                           <div className="w-1.5 h-1.5 rounded-full bg-[#7A8F7A] group-hover:scale-150 transition-transform"></div>
                           <span className="text-[13px] font-semibold tracking-wide text-[var(--text-color)]/80 hover:text-[#7A8F7A] transition-colors">
                             {cap}
                           </span>
                         </li>
                       ))}
                    </ul>
                 </div>

                 {/* Philosophy Section */}
                 <div className="space-y-5">
                    <h4 className="text-[var(--text-color)] font-bold uppercase tracking-widest text-[10px] flex items-center gap-2">
                       <span className="w-4 h-[1px] bg-[#7A8F7A]"></span>
                       Philosophy
                    </h4>
                    <ul className="space-y-3">
                       {philosophyPoints.map((point, index) => (
                         <li key={index} className="relative pl-4 group">
                           <div className="absolute left-0 top-2 w-[2px] h-[calc(100%-8px)] bg-[#7A8F7A]/30 group-hover:bg-[#7A8F7A] transition-colors"></div>
                           <p className="text-[13px] italic font-medium leading-relaxed text-[var(--text-color)]/70 group-hover:text-[var(--text-color)] transition-colors">
                             "{point}"
                           </p>
                         </li>
                       ))}
                    </ul>
                 </div>
              </div>
            </div>

            <div className="pt-8">
               <div className="flex items-center gap-6">
                  <span className="w-16 h-[1px] bg-[#7A8F7A]/40"></span>
                  <span className="text-xl serif italic text-[var(--text-muted)]/40">Vicky Vibes</span>
               </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;