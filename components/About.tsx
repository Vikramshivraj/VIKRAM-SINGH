
import React from 'react';

const About: React.FC = () => {
  return (
    <section id="about" className="py-32 px-6 bg-[#F2F2EF]">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center">
        <div className="relative aspect-[4/5] overflow-hidden rounded-sm shadow-xl">
          <img 
            src="https://images.unsplash.com/photo-1554080353-a576cf803bda?auto=format&fit=crop&q=80&w=800" 
            alt="Vicky - Photographer" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 border-[20px] border-white/5 pointer-events-none"></div>
        </div>
        
        <div className="space-y-8">
          <span className="text-xs uppercase tracking-[0.3em] font-bold text-[#7A8F7A]">The Lens Behind The Stories</span>
          <h2 className="text-4xl md:text-5xl serif leading-tight">I believe every picture tells a story worth feeling.</h2>
          <div className="space-y-4 text-black/70 font-light leading-relaxed text-lg">
            <p>
              I’m Vicky, a travel and photography enthusiast who believes every picture tells a story. I explore places, capture moods, and turn everyday moments into visual memories.
            </p>
            <p>
              My journey started with a dusty film camera and a curiosity for how light shapes our world. Today, my work spans across continents, focusing on the raw connection between nature and the human spirit.
            </p>
            <p>
              Whether it's the quiet streets of a sleeping city or the vast echoes of a desert landscape, my goal is to freeze time in a way that feels eternal.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
