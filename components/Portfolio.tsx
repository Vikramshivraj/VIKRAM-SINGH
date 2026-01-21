import React, { useState, useEffect, useRef } from 'react';
import { PHOTOS, CATEGORIES } from '../constants';
import { Category, Photo } from '../types';

const PhotoCard: React.FC<{
  photo: Photo;
  isLiked: boolean;
  isCopied: boolean;
  onLike: (e: React.MouseEvent) => void;
  onShare: (e: React.MouseEvent) => void;
}> = ({ photo, isLiked, isCopied, onLike, onShare }) => {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div 
      className="masonry-item group relative transition-all duration-700 cursor-default"
    >
      <div className="relative overflow-hidden rounded-[2rem] bg-[var(--bg-color)] border border-[var(--glass-border)] transition-all duration-700 hover:shadow-[0_30px_60px_rgba(0,0,0,0.1)]">
        {/* Action Buttons: Top Right - These remain interactive */}
        <div className="absolute top-4 right-4 flex flex-col gap-2 z-30 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
           <button 
             onClick={onLike}
             className={`w-10 h-10 rounded-full flex items-center justify-center backdrop-blur-md border transition-all transform active:scale-90 cursor-pointer ${
               isLiked 
               ? 'bg-red-500 border-red-500 text-white' 
               : 'bg-black/20 border-white/20 text-white hover:bg-black/40'
             }`}
             aria-label="Like photo"
           >
             <svg className={`w-4 h-4 ${isLiked ? 'fill-current' : 'fill-none'}`} stroke="currentColor" viewBox="0 0 24 24">
               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
             </svg>
           </button>

           <button 
             onClick={onShare}
             className={`w-10 h-10 rounded-full flex items-center justify-center backdrop-blur-md border transition-all transform active:scale-90 cursor-pointer ${
               isCopied 
               ? 'bg-[#7A8F7A] border-[#7A8F7A] text-white' 
               : 'bg-black/20 border-white/20 text-white hover:bg-black/40'
             }`}
             aria-label="Share photo"
           >
             {isCopied ? (
               <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
               </svg>
             ) : (
               <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6a3 3 0 100-2.684m0 2.684l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
               </svg>
             )}
           </button>
        </div>

        <div className={`overflow-hidden relative min-h-[300px] ${!isLoaded ? 'shimmer-placeholder' : ''}`}>
          <img 
            src={photo.url} 
            alt={photo.title}
            loading="lazy"
            decoding="async"
            onLoad={() => setIsLoaded(true)}
            className={`w-full h-auto transition-all duration-[1.5s] ease-out ${
              isLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-105'
            } group-hover:scale-110 grayscale-[10%] group-hover:grayscale-0`}
          />
          <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-1000 pointer-events-none"></div>
        </div>

        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-700 flex flex-col justify-end p-8 pointer-events-none">
          <div className="space-y-2 translate-y-4 group-hover:translate-y-0 transition-transform duration-700">
            <div className="flex items-center gap-2">
               <span className="text-[#7A8F7A] text-[9px] uppercase tracking-[0.4em] font-bold">{photo.category}</span>
            </div>
            <h3 className="text-white text-xl serif italic leading-tight">{photo.title}</h3>
          </div>
        </div>
      </div>
    </div>
  );
};

const Portfolio: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<Category>('All');
  const [likedPhotos, setLikedPhotos] = useState<Set<string>>(new Set());
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const savedLikes = localStorage.getItem('vicky_likes');
    if (savedLikes) {
      try { setLikedPhotos(new Set(JSON.parse(savedLikes))); } catch (e) {}
    }

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

  useEffect(() => {
    localStorage.setItem('vicky_likes', JSON.stringify(Array.from(likedPhotos)));
  }, [likedPhotos]);

  const toggleLike = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    setLikedPhotos(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const handleShare = async (e: React.MouseEvent, photo: Photo) => {
    e.stopPropagation();
    try {
      await navigator.clipboard.writeText(photo.url);
      setCopiedId(photo.id);
      setTimeout(() => setCopiedId(null), 2000);
    } catch (err) {
      console.error('Failed to copy', err);
    }
  };

  const filteredPhotos = activeCategory === 'All' 
    ? PHOTOS 
    : PHOTOS.filter(photo => photo.category === activeCategory);

  return (
    <section id="work" ref={sectionRef} className="py-24 px-4 md:px-8 lg:px-12 bg-[var(--bg-color)] section-reveal transition-theme">
      <div className="max-w-[1600px] mx-auto bg-[var(--glass-bg)] border border-[var(--glass-border)] rounded-[3rem] md:rounded-[5rem] p-8 md:p-16 lg:p-24 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 left-1/4 w-1/2 h-1 bg-gradient-to-r from-transparent via-[#7A8F7A]/20 to-transparent"></div>
        
        <div className="flex flex-col items-center mb-20 space-y-10">
          <div className="text-center space-y-3">
             <span className="text-[10px] uppercase tracking-[0.4em] text-[#7A8F7A] font-bold">The Archive</span>
             <h2 className="text-4xl md:text-6xl serif tracking-tight text-[var(--text-color)]">Visual Narratives</h2>
          </div>
          
          <div className="flex flex-wrap justify-center gap-6 md:gap-10 text-[11px] uppercase tracking-[0.3em] font-bold text-[var(--text-dim)]">
            {CATEGORIES.map((category) => (
              <button
                key={category}
                onClick={() => {
                  setActiveCategory(category);
                }}
                className={`pb-1 border-b transition-all duration-500 hover:text-[var(--text-color)] cursor-pointer ${
                  activeCategory === category 
                  ? 'text-[var(--text-color)] border-[#7A8F7A]' 
                  : 'border-transparent'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        <div className="masonry-grid">
          {filteredPhotos.map((photo) => (
            <PhotoCard 
              key={photo.id}
              photo={photo}
              isLiked={likedPhotos.has(photo.id)}
              isCopied={copiedId === photo.id}
              onLike={(e) => toggleLike(e, photo.id)}
              onShare={(e) => handleShare(e, photo)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Portfolio;