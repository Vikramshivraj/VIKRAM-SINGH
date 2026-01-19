import React, { useState, useEffect, useCallback } from 'react';

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when sidebar is open
  useEffect(() => {
    if (isSidebarOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isSidebarOpen]);

  const toggleSidebar = useCallback(() => {
    setIsSidebarOpen(prev => !prev);
  }, []);

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    setIsSidebarOpen(false);
    
    if (id === 'top') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    const element = document.getElementById(id);
    if (element) {
      const headerOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  const navItems = [
    { label: 'Work', id: 'work' },
    { label: 'About', id: 'about' },
    { label: 'Contact', id: 'contact' }
  ];

  return (
    <>
      <header className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
        isScrolled ? 'bg-[#F8F8F6]/95 backdrop-blur-md py-4 border-b border-black/5 shadow-sm' : 'bg-transparent py-8'
      }`}>
        <div className="container mx-auto px-6 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <button 
              onClick={toggleSidebar}
              className="p-2 hover:bg-black/5 rounded-full transition-colors group relative z-[100]"
              aria-label="Toggle Menu"
            >
              <div className="w-8 h-5 flex flex-col justify-between items-start">
                <span className={`h-[1.5px] bg-black transition-all duration-300 ${isSidebarOpen ? 'w-8 translate-y-[9px] rotate-45' : 'w-8'}`}></span>
                <span className={`h-[1.5px] bg-black transition-all duration-300 ${isSidebarOpen ? 'opacity-0' : 'w-5 group-hover:w-8'}`}></span>
                <span className={`h-[1.5px] bg-black transition-all duration-300 ${isSidebarOpen ? 'w-8 -translate-y-[9px] -rotate-45' : 'w-6 group-hover:w-8'}`}></span>
              </div>
            </button>

            <a 
              href="#" 
              onClick={(e) => handleLinkClick(e, 'top')}
              className="text-2xl font-bold serif tracking-tight hover:opacity-70 transition-opacity z-[100]"
            >
              Vicky
            </a>
          </div>

          <nav className="hidden lg:flex items-center gap-10">
            {navItems.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={(e) => handleLinkClick(e, item.id)}
                className="text-[10px] uppercase tracking-[0.4em] font-bold text-black/40 hover:text-[#7A8F7A] transition-all relative group"
              >
                {item.label}
                <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-[#7A8F7A] transition-all duration-300 group-hover:w-full"></span>
              </a>
            ))}
          </nav>
        </div>
      </header>

      {/* Sidebar Overlay - explicitly using pointer-events-none when hidden */}
      <div 
        className={`fixed inset-0 bg-black/30 backdrop-blur-sm z-[60] transition-opacity duration-500 ${
          isSidebarOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={toggleSidebar}
      />

      {/* Sliding Sidebar */}
      <aside className={`fixed top-0 left-0 h-full w-[300px] md:w-[400px] bg-[#F8F8F6] z-[70] shadow-2xl transition-transform duration-500 ease-in-out transform ${
        isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        <div className="h-full flex flex-col p-12 pt-24">
          <nav className="flex flex-col space-y-8">
            <span className="text-[9px] uppercase tracking-[0.5em] text-black/30 font-bold mb-4">Navigation</span>
            {navItems.map((item) => (
              <a 
                key={item.id}
                href={`#${item.id}`}
                onClick={(e) => handleLinkClick(e, item.id)}
                className="text-3xl serif hover:text-[#7A8F7A] hover:pl-4 transition-all duration-500"
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="mt-auto pt-10 border-t border-black/5">
            <div className="space-y-4">
              <p className="text-[9px] uppercase tracking-[0.3em] font-bold text-black/30">Connect</p>
              <a href="mailto:vikramrajshiv2006@gmail.com" className="text-sm font-light hover:text-[#7A8F7A] transition-colors block">vikramrajshiv2006@gmail.com</a>
              <div className="flex gap-4 pt-4">
                <span className="text-[10px] uppercase tracking-widest text-black/20 italic">Vicky Vibes © 2026</span>
              </div>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Header;