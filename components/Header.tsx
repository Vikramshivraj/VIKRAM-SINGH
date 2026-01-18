
import React, { useState, useEffect } from 'react';

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
      isScrolled ? 'bg-[#F8F8F6]/80 backdrop-blur-md py-4 border-b border-black/5' : 'bg-transparent py-6'
    }`}>
      <div className="container mx-auto px-6 flex justify-between items-center">
        <a href="#" className="text-2xl font-bold serif tracking-tight">Vicky.</a>
        
        <nav className="hidden md:flex space-x-8 text-sm uppercase tracking-widest font-medium">
          <a href="#work" className="hover:text-[#7A8F7A] transition-colors">Work</a>
          <a href="#about" className="hover:text-[#7A8F7A] transition-colors">About</a>
          <a href="#contact" className="hover:text-[#7A8F7A] transition-colors">Contact</a>
        </nav>

        <button className="md:hidden">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
          </svg>
        </button>
      </div>
    </header>
  );
};

export default Header;
