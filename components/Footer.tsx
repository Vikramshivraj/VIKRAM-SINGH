
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="py-16 px-6 border-t border-black/5 bg-[#F8F8F6]">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
        <div className="text-2xl font-bold serif tracking-tight">Vicky.</div>
        
        <div className="text-center md:text-right space-y-2">
          <p className="text-sm text-black/40 font-light uppercase tracking-widest">
            © 2026 Vicky. Capturing vibes, not just photos.
          </p>
          <p className="text-xs text-[#7A8F7A] font-medium tracking-tight">
            Based in Lisbon, working worldwide.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
