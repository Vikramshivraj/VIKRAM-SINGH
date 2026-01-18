
import React, { useState, useEffect, useRef } from 'react';
import { VIDEOS } from '../constants';

const VideoShowcase: React.FC = () => {
  const [activeVideo, setActiveVideo] = useState(VIDEOS[0]);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section 
      id="reels" 
      ref={sectionRef}
      className={`py-24 px-6 bg-[#F8F8F6] transition-all duration-1000 ease-out transform ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
      }`}
    >
      <div className="max-w-7xl mx-auto space-y-16">
        <div className="flex flex-col md:flex-row justify-between items-end gap-6">
          <div className="space-y-4 max-w-xl">
            <span className="text-[10px] uppercase tracking-[0.5em] font-bold text-[#7A8F7A]">Cinematic Reels</span>
            <h2 className="text-4xl md:text-5xl serif leading-tight">Stories in motion.</h2>
            <p className="text-black/50 font-light leading-relaxed">
              Explore short-form cinematic captures and behind-the-scenes looks at my photography expeditions.
            </p>
          </div>
          <div className="hidden md:block">
            <div className="flex items-center gap-4 text-[10px] uppercase tracking-widest font-bold text-black/20">
              <span className="w-12 h-[1px] bg-black/10"></span>
              Scroll to explore
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-12 gap-10">
          {/* Main Player */}
          <div className="lg:col-span-8 group relative aspect-video overflow-hidden rounded-[2.5rem] bg-black shadow-2xl">
            <video 
              key={activeVideo.id}
              src={activeVideo.url}
              className="w-full h-full object-cover opacity-90 transition-transform duration-[2000ms] group-hover:scale-105"
              autoPlay
              loop
              muted
              playsInline
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60"></div>
            
            <div className="absolute bottom-10 left-10 right-10 flex justify-between items-end animate-[fadeIn_0.8s_ease-out]">
              <div className="space-y-2">
                <h3 className="text-2xl md:text-3xl text-white serif">{activeVideo.title}</h3>
                <p className="text-white/60 text-sm font-light max-w-md">{activeVideo.description}</p>
              </div>
              <div className="hidden md:flex gap-4">
                 <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-white backdrop-blur-sm">
                   <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.333-5.89a1.5 1.5 0 000-2.538L6.3 2.841z"></path></svg>
                 </div>
              </div>
            </div>
          </div>

          {/* Playlist / Sidebar */}
          <div className="lg:col-span-4 flex flex-col gap-6">
            <p className="text-[9px] uppercase tracking-[0.3em] font-bold text-black/30 px-2">More from the series</p>
            <div className="space-y-4">
              {VIDEOS.map((video) => (
                <button
                  key={video.id}
                  onClick={() => setActiveVideo(video)}
                  className={`w-full group flex items-center gap-4 p-4 rounded-3xl transition-all duration-500 text-left border ${
                    activeVideo.id === video.id 
                    ? 'bg-white border-black/5 shadow-md' 
                    : 'bg-transparent border-transparent hover:bg-black/5'
                  }`}
                >
                  <div className="relative w-24 h-16 flex-shrink-0 overflow-hidden rounded-xl bg-black/5">
                    <img 
                      src={video.thumbnail} 
                      alt={video.title} 
                      className={`w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 ${activeVideo.id === video.id ? 'opacity-50' : 'opacity-80'}`}
                    />
                    {activeVideo.id === video.id && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="flex gap-1 items-end h-4">
                          <div className="w-1 bg-[#7A8F7A] animate-[barHeight_0.6s_infinite_alternate]"></div>
                          <div className="w-1 bg-[#7A8F7A] animate-[barHeight_0.8s_infinite_alternate_0.2s]"></div>
                          <div className="w-1 bg-[#7A8F7A] animate-[barHeight_0.5s_infinite_alternate_0.4s]"></div>
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="space-y-1 overflow-hidden">
                    <h4 className={`text-sm font-medium truncate ${activeVideo.id === video.id ? 'text-black' : 'text-black/60 group-hover:text-black'}`}>
                      {video.title}
                    </h4>
                    <p className="text-[10px] uppercase tracking-widest text-black/30 font-bold">Behind the lens</p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes barHeight {
          from { height: 4px; }
          to { height: 16px; }
        }
      `}</style>
    </section>
  );
};

export default VideoShowcase;
