
import React, { useState } from 'react';
import { PHOTOS, CATEGORIES } from '../constants';
import { Category, Photo } from '../types';
import Lightbox from './Lightbox';

const Portfolio: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<Category>('All');
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);

  const filteredPhotos = activeCategory === 'All' 
    ? PHOTOS 
    : PHOTOS.filter(photo => photo.category === activeCategory);

  return (
    <section id="work" className="py-24 px-6 max-w-7xl mx-auto">
      <div className="flex flex-col items-center mb-16 space-y-8">
        <h2 className="text-4xl md:text-5xl serif">Selected Work</h2>
        
        <div className="flex flex-wrap justify-center gap-4 md:gap-8 text-xs uppercase tracking-widest font-medium text-black/40">
          {CATEGORIES.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
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
        {filteredPhotos.map((photo) => (
          <div 
            key={photo.id}
            className="masonry-item group cursor-pointer relative overflow-hidden bg-black/5 rounded-sm"
            onClick={() => setSelectedPhoto(photo)}
          >
            <img 
              src={photo.url} 
              alt={photo.title}
              className="w-full h-auto transition-all duration-700 ease-in-out group-hover:scale-110 grayscale-[30%] group-hover:grayscale-0"
            />
            <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
              <span className="text-white/70 text-[10px] uppercase tracking-[0.2em] font-bold mb-1">
                {photo.category}
              </span>
              <h3 className="text-white text-lg serif translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                {photo.title}
              </h3>
            </div>
          </div>
        ))}
      </div>

      <Lightbox 
        photo={selectedPhoto} 
        onClose={() => setSelectedPhoto(null)} 
      />
    </section>
  );
};

export default Portfolio;
