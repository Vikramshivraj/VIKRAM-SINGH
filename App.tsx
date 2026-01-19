import React from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Portfolio from './components/Portfolio';
import About from './components/About';
import Social from './components/Social';
import Contact from './components/Contact';
import Footer from './components/Footer';

const App: React.FC = () => {
  return (
    <div className="relative min-h-screen">
      {/* Aesthetic Illustration / Cartoon Element */}
      <div className="fixed top-1/4 right-10 floating-illus animate-[float_10s_infinite_ease-in-out] opacity-20 md:opacity-100">
        <img 
          src="https://cdni.iconscout.com/illustration/premium/thumb/photographer-working-in-studio-illustration-download-in-svg-png-gif-file-formats--camera-photography-professional-lifestyle-pack-people-illustrations-6453676.png" 
          alt="Aesthetic Illustration"
          className="w-48 h-48 md:w-64 md:h-64 object-contain grayscale"
        />
      </div>

      <Header />
      <main className="relative z-10">
        <Hero />
        <Portfolio />
        <About />
        <Contact />
        <Social />
      </main>
      <Footer />

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-30px) rotate(2deg); }
        }
      `}</style>
    </div>
  );
};

export default App;