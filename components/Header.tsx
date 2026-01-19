import React, { useState, useEffect } from 'react';

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

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

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

  // Navigation items simplified to match the current page layout
  const navItems = ['Work', 'About', 'Contact'];

  return (
    <>
      <header className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
        isScrolled ? 'bg-[#F8F8F6]/90 backdrop-blur-md py-4 border-b border-black/5 shadow-sm' : 'bg-transparent py-8'
      }`}>
        <div className="container mx-auto px-6 flex items-center justify-between">
          <div className="flex items-center gap-6">
            {/* Hamburger Icon */}
            <button 
              onClick={toggleSidebar}
              className="p-2 hover:bg-black/5 rounded-full transition-colors group z-50"
              aria-label="Toggle Menu"
            >
              <div className="w-8 h-6 flex flex-col justify-between items-start">
                <span className={`h-[1.5px] bg-black transition-all duration-300 ${isSidebarOpen ? 'w-8 translate-y-[11px] rotate-45' : 'w-8'}`}></span>
                <span className={`h-[1.5px] bg-black transition-all duration-300 ${isSidebarOpen ? 'opacity-0' : 'w-5 group-hover:w-8'}`}></span>
                <span className={`h-[1.5px] bg-black transition-all duration-300 ${isSidebarOpen ? 'w-8 -translate-y-[11px] -rotate-45' : 'w-6 group-hover:w-8'}`}></span>
              </div>
            </button>

            <a 
              href="#" 
              onClick={(e) => handleLinkClick(e, 'top')}
              className="text-2xl font-bold serif tracking-tight hover:opacity-70 transition-opacity"
            >
              Vicky
            </a>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-10">
            {navItems.map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                onClick={(e) => handleLinkClick(e, item.toLowerCase())}
                className="text-[10px] uppercase tracking-[0.4em] font-bold text-black/40 hover:text-[#7A8F7A] transition-all relative group"
              >
                {item}
                <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-[#7A8F7A] transition-all duration-300 group-hover:w-full"></span>
              </a>
            ))}
          </nav>
        </div>
      </header>

      {/* Sidebar Overlay */}
      <div 
        className={`fixed inset-0 bg-black/20 backdrop-blur-sm z-[60] transition-opacity duration-500 ${isSidebarOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
        onClick={toggleSidebar}
      />

      {/* Sliding Sidebar */}
      <aside className={`fixed top-0 left-0 h-full w-[280px] md:w-[380px] bg-[#F8F8F6] z-[70] shadow-2xl transition-transform duration-500 ease-in-out transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="h-full flex flex-col p-10 md:p-12">
          <button 
            onClick={toggleSidebar}
            className="self-start p-3 mb-12 hover:bg-black/5 rounded-full transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          <nav className="flex flex-col space-y-8">
            <span className="text-[9px] uppercase tracking-[0.4em] text-black/30 font-bold mb-2">Explore</span>
            {navItems.map((item) => (
              <a 
                key={item}
                href={`#${item.toLowerCase()}`}
                onClick={(e) => handleLinkClick(e, item.toLowerCase())}
                className="text-2xl md:text-3xl serif hover:text-[#7A8F7A] hover:pl-4 transition-all duration-500"
              >
                {item}
              </a>
            ))}
          </nav>

          <div className="mt-auto pt-10 space-y-6">
            <div className="h-[1px] bg-black/5 w-full"></div>
            <div className="space-y-2">
              <p className="text-[9px] uppercase tracking-[0.2em] font-bold text-black/30">Get in touch</p>
              <a href="mailto:vikramrajshiv2006@gmail.com" className="text-base font-light hover:text-[#7A8F7A] transition-colors block">vikramrajshiv2006@gmail.com</a>
              <p className="text-xs text-black/40 italic">Currently based in India.</p>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Header;