
import React from 'react';
import { Photo } from '../types';

interface LightboxProps {
  photo: Photo | null;
  onClose: () => void;
}

const Lightbox: React.FC<LightboxProps> = ({ photo, onClose }) => {
  if (!photo) return null;

  return (
    <div 
      className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-4 md:p-10 animate-[fadeIn_0.3s_ease-out]"
      onClick={onClose}
    >
      <button 
        className="absolute top-6 right-6 text-white/60 hover:text-white transition-colors"
        onClick={onClose}
      >
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      <div 
        className="max-w-6xl w-full h-full flex flex-col md:flex-row gap-8 items-center"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex-1 h-full flex items-center justify-center">
          <img 
            src={photo.url} 
            alt={photo.title}
            className="max-h-full max-w-full object-contain shadow-2xl"
          />
        </div>
        
        <div className="w-full md:w-80 text-white space-y-4">
          <span className="text-xs uppercase tracking-widest text-[#7A8F7A] font-bold">
            {photo.category}
          </span>
          <h2 className="text-3xl serif">{photo.title}</h2>
          <p className="text-white/60 font-light leading-relaxed">
            {photo.description}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Lightbox;
