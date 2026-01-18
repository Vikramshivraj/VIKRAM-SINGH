
import React, { useEffect, useState } from 'react';
import { Photo } from '../types';

interface LightboxProps {
  photo: Photo | null;
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
  hasNext: boolean;
  hasPrev: boolean;
  likedPhotos: Set<string>;
  onToggleLike: (id: string) => void;
}

const Lightbox: React.FC<LightboxProps> = ({ 
  photo, 
  onClose, 
  onNext, 
  onPrev, 
  hasNext, 
  hasPrev,
  likedPhotos,
  onToggleLike 
}) => {
  const [isExiting, setIsExiting] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    if (photo) {
      setIsExiting(false);
      setImageLoaded(false);
    }
  }, [photo]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') handleClose();
      if (e.key === 'ArrowRight' && hasNext) onNext();
      if (e.key === 'ArrowLeft' && hasPrev) onPrev();
    };

    if (photo) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [photo, hasNext, hasPrev, onNext, onPrev]);

  const handleClose = () => {
    setIsExiting(true);
    setTimeout(onClose, 300);
  };

  if (!photo && !isExiting) return null;

  const isLiked = photo ? likedPhotos.has(photo.id) : false;

  return (
    <div 
      className={`fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-4 md:p-10 transition-opacity duration-300 ${
        isExiting ? 'opacity-0' : 'opacity-100 animate-[fadeIn_0.3s_ease-out]'
      }`}
      onClick={handleClose}
    >
      {/* Close Button */}
      <button 
        className="absolute top-6 right-6 z-[110] text-white/60 hover:text-white transition-all transform hover:scale-110 p-2"
        onClick={handleClose}
        aria-label="Close Lightbox"
      >
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      {/* Navigation Arrows */}
      {hasPrev && (
        <button 
          className="absolute left-4 md:left-10 z-[110] text-white/30 hover:text-white transition-all transform hover:scale-110 p-4 bg-white/5 hover:bg-white/10 rounded-full"
          onClick={(e) => { e.stopPropagation(); onPrev(); }}
          aria-label="Previous Photo"
        >
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
      )}

      {hasNext && (
        <button 
          className="absolute right-4 md:right-10 z-[110] text-white/30 hover:text-white transition-all transform hover:scale-110 p-4 bg-white/5 hover:bg-white/10 rounded-full"
          onClick={(e) => { e.stopPropagation(); onNext(); }}
          aria-label="Next Photo"
        >
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      )}

      <div 
        className={`max-w-6xl w-full h-full flex flex-col md:flex-row gap-8 items-center transition-all duration-500 transform ${
          isExiting ? 'scale-95 opacity-0' : 'scale-100 opacity-100'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex-[2] h-full flex items-center justify-center relative">
          {!imageLoaded && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-8 h-8 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
            </div>
          )}
          <img 
            key={photo?.id}
            src={photo?.url} 
            alt={photo?.title}
            onLoad={() => setImageLoaded(true)}
            className={`max-h-full max-w-full object-contain shadow-2xl transition-all duration-700 ${
              imageLoaded ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-4 scale-95'
            }`}
          />
        </div>
        
        <div className="flex-1 w-full md:w-80 text-white space-y-6 md:pr-4 animate-[fadeInUp_0.6s_ease-out]">
          <div className="flex justify-between items-start">
            <div className="space-y-1">
              <span className="text-[10px] uppercase tracking-[0.4em] text-[#7A8F7A] font-bold">
                {photo?.category}
              </span>
              <h2 className="text-3xl md:text-4xl serif leading-tight">{photo?.title}</h2>
            </div>
            
            {/* Like Button in Lightbox */}
            <button
              onClick={() => photo && onToggleLike(photo.id)}
              className={`flex-shrink-0 w-12 h-12 rounded-full border flex items-center justify-center transition-all duration-500 ${
                isLiked 
                ? 'bg-red-500 border-red-500 text-white shadow-[0_0_20px_rgba(239,68,68,0.4)]' 
                : 'border-white/20 text-white/60 hover:border-white hover:text-white hover:bg-white/5'
              }`}
              aria-label={isLiked ? "Unlike photo" : "Like photo"}
            >
              <svg className={`w-5 h-5 transition-transform duration-300 ${isLiked ? 'fill-current scale-110' : 'fill-none scale-100'}`} stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </button>
          </div>
          
          <div className="w-12 h-[1px] bg-[#7A8F7A]/40"></div>
          
          <p className="text-white/60 font-light leading-relaxed text-sm md:text-base">
            {photo?.description}
          </p>

          <div className="pt-8">
            <p className="text-[9px] uppercase tracking-[0.2em] text-white/20 font-bold">
              Captured by Vicky Vibes
            </p>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
};

export default Lightbox;
