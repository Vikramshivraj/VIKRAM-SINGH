
import React, { useState, useEffect } from 'react';
import { PHOTOS, CATEGORIES } from '../constants';
import { Category, Photo } from '../types';
import Lightbox from './Lightbox';

const Portfolio: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<Category>('All');
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState<number | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [likedPhotos, setLikedPhotos] = useState<Set<string>>(new Set());

  // Load liked photos from localStorage on mount
  useEffect(() => {
    const savedLikes = localStorage.getItem('vicky_portfolio_likes');
    if (savedLikes) {
      try {
        setLikedPhotos(new Set(JSON.parse(savedLikes)));
      } catch (e) {
        console.error("Failed to parse likes", e);
      }
    }
  }, []);

  // Save likes to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('vicky_portfolio_likes', JSON.stringify(Array.from(likedPhotos)));
  }, [likedPhotos]);

  const filteredPhotos = activeCategory === 'All' 
    ? PHOTOS 
    : PHOTOS.filter(photo => photo.category === activeCategory);

  const handleNext = () => {
    if (selectedPhotoIndex !== null && selectedPhotoIndex < filteredPhotos.length - 1) {
      setSelectedPhotoIndex(selectedPhotoIndex + 1);
    }
  };

  const handlePrev = () => {
    if (selectedPhotoIndex !== null && selectedPhotoIndex > 0) {
      setSelectedPhotoIndex(selectedPhotoIndex - 1);
    }
  };

  const toggleLike = (id: string) => {
    setLikedPhotos(prev => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const handleShare = async (e: React.MouseEvent, photo: Photo) => {
    e.stopPropagation();
    const shareData = {
      title: photo.title,
      text: photo.description,
      url: photo.url,
    };

    if (navigator.share && navigator.canShare && navigator.canShare(shareData)) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        console.error('Error sharing:', err);
      }
    } else {
      try {
        await navigator.clipboard.writeText(photo.url);
        setCopiedId(photo.id);
        setTimeout(() => setCopiedId(null), 2000);
      } catch (err) {
        console.error('Failed to copy:', err);
      }
    }
  };

  return (
    <section id="work" className="py-24 px-6">
      <div className="max-w-7xl mx-auto p-8 md:p-16 border border-black/15 rounded-[3rem] shadow-sm relative bg-white/30 backdrop-blur-sm">
        {/* Decorative corner accent */}
        <div className="absolute top-0 right-0 w-24 h-24 border-t border-r border-black/10 rounded-tr-[3rem] pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-24 h-24 border-b border-l border-black/10 rounded-bl-[3rem] pointer-events-none"></div>

        <div className="flex flex-col items-center mb-16 space-y-8">
          <h2 className="text-4xl md:text-5xl serif tracking-tight">Visual Narratives</h2>
          
          <div className="flex flex-wrap justify-center gap-4 md:gap-8 text-xs uppercase tracking-widest font-medium text-black/40">
            {CATEGORIES.map((category) => (
              <button
                key={category}
                onClick={() => {
                  setActiveCategory(category);
                  setSelectedPhotoIndex(null);
                }}
                className={`pb-1 border-b-2 transition-all duration-300 ${
                  activeCategory === category 
                  ? 'text-[#1C1C1C] border-[#1C1C1C]' 
                  : 'border-transparent hover:text-black hover:border-black/20'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        <div className="masonry-grid">
          {filteredPhotos.map((photo, index) => (
            <div 
              key={photo.id}
              className="masonry-item group cursor-pointer flex flex-col relative"
              onClick={() => setSelectedPhotoIndex(index)}
            >
              <div className="relative overflow-hidden bg-black/5 rounded-2xl shadow-sm hover:shadow-2xl transition-all duration-700">
                <div className="overflow-hidden rounded-2xl">
                  <img 
                    src={photo.url} 
                    alt={photo.title}
                    className="w-full h-auto transition-all duration-1000 ease-in-out group-hover:scale-110 grayscale-[5%] group-hover:grayscale-0 rounded-2xl"
                  />
                </div>

                {/* Persistent Like Indicator (Always visible if liked) */}
                {likedPhotos.has(photo.id) && (
                  <div className="absolute top-4 left-4 z-30 animate-[pop_0.3s_ease-out]">
                    <div className="bg-white/80 backdrop-blur-md w-8 h-8 rounded-full flex items-center justify-center shadow-md">
                      <svg className="w-4 h-4 text-red-500 fill-current" viewBox="0 0 24 24">
                        <path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                      </svg>
                    </div>
                  </div>
                )}
                
                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-700 flex flex-col justify-end p-8 rounded-2xl">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none rounded-2xl"></div>
                  
                  {/* Top Buttons: Share and Like */}
                  <div className="absolute top-4 right-4 z-20 flex gap-2">
                    {/* Share Button */}
                    <button
                      onClick={(e) => handleShare(e, photo)}
                      className={`w-8 h-8 md:w-10 md:h-10 flex items-center justify-center backdrop-blur-md border border-white/20 rounded-full transition-all hover:scale-110 active:scale-95 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 ${
                        copiedId === photo.id 
                          ? 'bg-green-500/90 border-green-400 text-white' 
                          : 'bg-white/10 text-white hover:bg-white hover:text-black'
                      }`}
                      aria-label="Share Image"
                    >
                      {copiedId === photo.id ? (
                        <svg className="w-4 h-4 animate-[pop_0.2s_ease-out]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                        </svg>
                      ) : (
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6a3 3 0 100-2.684m0 2.684l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                        </svg>
                      )}
                    </button>

                    {/* Like Button (Toggle) */}
                    <button
                      onClick={(e) => { e.stopPropagation(); toggleLike(photo.id); }}
                      className={`w-8 h-8 md:w-10 md:h-10 flex items-center justify-center backdrop-blur-md border rounded-full transition-all hover:scale-110 active:scale-95 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 ${
                        likedPhotos.has(photo.id)
                          ? 'bg-red-500 border-red-500 text-white'
                          : 'bg-white/10 border-white/20 text-white hover:bg-white hover:text-red-500'
                      }`}
                      aria-label="Like Image"
                    >
                      <svg className={`w-4 h-4 ${likedPhotos.has(photo.id) ? 'fill-current' : 'fill-none'}`} stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                      </svg>
                    </button>
                  </div>

                  {/* Info Overlay */}
                  <div className="relative z-10 translate-y-4 group-hover:translate-y-0 transition-transform duration-500 ease-out">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-white/70 text-[8px] uppercase tracking-[0.4em] font-bold">
                        {photo.category}
                      </span>
                    </div>
                    <h3 className="text-white text-xl md:text-2xl serif leading-tight">
                      {photo.title}
                    </h3>
                    <div className="w-8 h-[1px] bg-white/30 mt-3 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-left"></div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Lightbox 
        photo={selectedPhotoIndex !== null ? filteredPhotos[selectedPhotoIndex] : null} 
        onClose={() => setSelectedPhotoIndex(null)} 
        onNext={handleNext}
        onPrev={handlePrev}
        hasNext={selectedPhotoIndex !== null && selectedPhotoIndex < filteredPhotos.length - 1}
        hasPrev={selectedPhotoIndex !== null && selectedPhotoIndex > 0}
        likedPhotos={likedPhotos}
        onToggleLike={toggleLike}
      />
      
      <style>{`
        @keyframes pop {
          0% { transform: scale(0.5); opacity: 0; }
          70% { transform: scale(1.1); }
          100% { transform: scale(1); opacity: 1; }
        }
      `}</style>
    </section>
  );
};

export default Portfolio;
