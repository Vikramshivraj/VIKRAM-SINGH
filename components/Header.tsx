import React, { useState, useEffect, useCallback } from 'react';

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const saved = localStorage.getItem('vicky_theme');
    return saved === 'dark';
  });

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('vicky_theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('vicky_theme', 'light');
    }
  }, [isDarkMode]);

  useEffect(() => {
    if (isSidebarOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }, [isSidebarOpen]);

  const toggleSidebar = useCallback(() => {
    setIsSidebarOpen(prev => !prev);
  }, []);

  const toggleTheme = () => {
    setIsDarkMode(prev => !prev);
  };

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    setIsSidebarOpen(false);
    
    if (id === 'top') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    const element = document.getElementById(id);
    if (element) {
      const headerOffset = 100;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  const navItems = [
    { label: 'Visual Narratives', id: 'work' },
    { label: 'About', id: 'about' },
    { label: 'Inquiry', id: 'contact' },
    { label: 'Connect', id: 'social' }
  ];

  return (
    <>
      <header className={`fixed top-0 left-0 w-full z-[100] transition-all duration-700 ${
        isScrolled ? 'py-4' : 'py-8'
      }`}>
        <div className="container mx-auto px-6 lg:px-12 flex items-center justify-between">
          <div className="flex items-center gap-8">
            <button 
              onClick={toggleSidebar}
              className={`p-3 rounded-full transition-all duration-500 relative z-[110] group ${
                isScrolled ? 'bg-[var(--glass-bg)] backdrop-blur-xl border border-[var(--glass-border)] hover:bg-[var(--glass-border)]' : 'bg-transparent hover:bg-[var(--glass-bg)]'
              }`}
              aria-label="Toggle Menu"
            >
              <div className="w-6 h-4 flex flex-col justify-between items-start overflow-hidden">
                <span className={`h-[1px] bg-[var(--text-color)] transition-all duration-500 ${isSidebarOpen ? 'w-6 translate-y-[7.5px] rotate-45' : 'w-6 group-hover:w-4'}`}></span>
                <span className={`h-[1px] bg-[var(--text-color)] transition-all duration-500 ${isSidebarOpen ? 'opacity-0 translate-x-4' : 'w-4 group-hover:w-6'}`}></span>
                <span className={`h-[1px] bg-[var(--text-color)] transition-all duration-500 ${isSidebarOpen ? 'w-6 -translate-y-[7.5px] -rotate-45' : 'w-5 group-hover:w-3'}`}></span>
              </div>
            </button>

            <a 
              href="#" 
              onClick={(e) => handleLinkClick(e, 'top')}
              className="text-2xl font-bold serif tracking-tighter hover:opacity-70 transition-opacity z-[110] text-[var(--text-color)]"
            >
              Vicky<span className="text-[#7A8F7A]">.</span>
            </a>
          </div>

          <nav className="hidden lg:flex items-center gap-12 bg-[var(--glass-bg)] backdrop-blur-xl border border-[var(--glass-border)] rounded-full px-10 py-3">
            {navItems.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={(e) => handleLinkClick(e, item.id)}
                className="text-[10px] uppercase tracking-[0.4em] font-bold text-[var(--text-muted)] hover:text-[#7A8F7A] transition-all relative group"
              >
                {item.label}
                <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-[#7A8F7A] transition-all duration-500 group-hover:w-full"></span>
              </a>
            ))}
          </nav>

          <div className="hidden lg:block w-[120px]">
             {/* Hire Me option removed as requested */}
          </div>
        </div>
      </header>

      {/* Sidebar Overlay */}
      <div 
        className={`fixed inset-0 bg-black/40 backdrop-blur-md z-[120] transition-opacity duration-700 ${
          isSidebarOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={toggleSidebar}
      />

      {/* Sidebar */}
      <aside className={`fixed top-0 left-0 h-full w-full sm:w-[450px] bg-[var(--bg-color)] z-[130] border-r border-[var(--glass-border)] shadow-[20px_0_100px_rgba(0,0,0,0.2)] dark:shadow-[20px_0_100px_rgba(0,0,0,0.8)] transition-transform duration-700 cubic-bezier(0.16, 1, 0.3, 1) transform ${
        isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        {/* Close Icon inside sidebar */}
        <button 
          onClick={toggleSidebar}
          className="absolute top-8 right-8 p-3.5 rounded-full bg-[var(--glass-bg)] border border-[var(--glass-border)] text-[var(--text-color)] hover:bg-[var(--glass-border)] transition-all duration-300 hover:rotate-90"
          aria-label="Close Sidebar"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="h-full flex flex-col p-12 sm:p-20 pt-32">
          <div className="flex justify-between items-start mb-12">
            <div>
              <img 
                src="https://i.pinimg.com/736x/32/f6/02/32f602e681b20d9cc4aa6f9a510a1ac5.jpg" 
                className="w-20 h-20 rounded-2xl object-cover mb-6 border border-[var(--glass-border)]"
                alt="Profile"
              />
              <h3 className="text-xl serif italic mb-1 text-[var(--text-color)]/90">Vicky Vibes</h3>
              <p className="text-[10px] uppercase tracking-widest text-[#7A8F7A] font-bold">Visual Storyteller</p>
            </div>
            
            {/* Mode Toggle Button */}
            <button 
              onClick={toggleTheme}
              className="p-4 rounded-2xl bg-[var(--glass-bg)] border border-[var(--glass-border)] text-[var(--text-color)] hover:bg-[var(--glass-border)] transition-all duration-300 group mr-12"
              aria-label="Toggle Theme"
            >
              <div className="relative w-6 h-6 overflow-hidden">
                <div className={`transition-transform duration-500 ${isDarkMode ? '-translate-y-8' : 'translate-y-0'}`}>
                   {/* Sun Icon */}
                   <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m12.728 0l-.707-.707M6.343 6.343l-.707-.707M12 8a4 4 0 100 8 4 4 0 000-8z" />
                   </svg>
                </div>
                <div className={`transition-transform duration-500 absolute top-0 left-0 ${isDarkMode ? 'translate-y-0' : 'translate-y-8'}`}>
                   {/* Moon Icon */}
                   <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                   </svg>
                </div>
              </div>
            </button>
          </div>

          <nav className="flex flex-col space-y-8">
            {navItems.map((item, idx) => (
              <a 
                key={item.id}
                href={`#${item.id}`}
                onClick={(e) => handleLinkClick(e, item.id)}
                className="text-2xl sm:text-3xl serif hover:text-[#7A8F7A] hover:pl-6 transition-all duration-500 group flex items-center gap-4 text-[var(--text-color)]"
                style={{ transitionDelay: `${idx * 100}ms` }}
              >
                <span className="text-[10px] text-[#7A8F7A] font-bold opacity-0 group-hover:opacity-100 -ml-4 group-hover:ml-0 transition-all">0{idx + 1}</span>
                {item.label}
              </a>
            ))}
          </nav>

          <div className="mt-auto pt-10 border-t border-[var(--glass-border)] flex flex-col gap-6">
            <div className="space-y-4">
              <p className="text-[9px] uppercase tracking-[0.3em] font-bold text-[var(--text-dim)]">Collaborate</p>
              <a href="mailto:vikramrajshiv2006@gmail.com" className="text-lg font-light hover:text-[#7A8F7A] transition-colors block underline underline-offset-8 decoration-[var(--glass-border)] hover:decoration-[#7A8F7A]/30 text-[var(--text-color)]">vikramrajshiv2006@gmail.com</a>
            </div>
            
            {/* Social links removed as requested */}
          </div>
        </div>
      </aside>
    </>
  );
};

export default Header;