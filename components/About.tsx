
import React from 'react';

const About: React.FC = () => {
  return (
    <section id="about" className="py-24 px-6 bg-[#F2F2EF]">
      <div className="max-w-6xl mx-auto p-8 md:p-16 border border-black/15 rounded-[3rem] shadow-sm bg-[#F8F8F6]/50 backdrop-blur-sm relative">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div className="relative aspect-[3/4] overflow-hidden rounded-3xl shadow-2xl group">
            <img 
              src="https://i.pinimg.com/736x/32/f6/02/32f602e681b20d9cc4aa6f9a510a1ac5.jpg" 
              alt="Vicky - Photographer" 
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            {/* Inner frame decoration */}
            <div className="absolute inset-0 border-[15px] border-white/5 pointer-events-none"></div>
            {/* Gradient for depth */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-40 group-hover:opacity-20 transition-opacity duration-500"></div>
          </div>
          
          <div className="space-y-8">
            <div className="space-y-2">
              <span className="text-xs uppercase tracking-[0.3em] font-bold text-[#7A8F7A]">The Lens Behind The Stories</span>
              <h2 className="text-4xl md:text-5xl serif leading-tight">I believe every picture tells a story worth feeling.</h2>
            </div>
            <div className="space-y-4 text-black/70 font-light leading-relaxed text-lg">
              <p>
                I’m Vicky, a travel and photography enthusiast who loves capturing moments and emotions. I explore different places and try to record what I feel through my lens.
              </p>
              <p>
                My journey started with a simple curiosity, which evolved into a passion for storytelling. I seek out the quiet beauty in everyday life, whether it's a coastal sunset or a busy street corner.
              </p>
              <p>
                From calm city streets to wide natural landscapes, my goal is to capture moments that feel real, authentic, and timeless.
              </p>
            </div>
            <div className="pt-4">
               <div className="inline-flex items-center gap-4 text-sm font-medium italic text-black/40">
                  <span className="w-12 h-[1px] bg-black/20"></span>
                  Vicky Vibes
               </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
