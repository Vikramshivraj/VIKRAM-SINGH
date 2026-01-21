import React, { useState, useEffect, useRef } from 'react';
import { GoogleGenAI } from "@google/genai";

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [aiConfirmation, setAiConfirmation] = useState('');
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) entry.target.classList.add('active');
        });
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');

    try {
      const emailPromise = fetch('https://formspree.io/f/mwvvlzao', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          message: formData.message,
          _subject: `New Portfolio Inquiry from ${formData.name}`,
        })
      });

      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const prompt = `
        You are the AI studio assistant for Vicky, a professional photographer. 
        A client named ${formData.name} sent: "${formData.message}".
        Respond with a warm, professional, ultra-short (1-2 sentences) confirmation.
        Refer to one detail. Say Vicky will reach out shortly.
      `;

      const aiPromise = ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: prompt,
      });

      const [emailResponse, aiResponse] = await Promise.all([emailPromise, aiPromise]);

      if (!emailResponse.ok) throw new Error('Delivery failed');

      setAiConfirmation(aiResponse.text || "Vicky has received your inquiry.");
      setStatus('success');
    } catch (error) {
      console.error("Submission failed:", error);
      setStatus('error');
    }
  };

  if (status === 'success') {
    return (
      <section id="contact" className="py-32 px-6 bg-[var(--bg-color)] flex items-center justify-center transition-theme">
        <div className="max-w-2xl w-full text-center space-y-10 bg-[var(--glass-bg)] p-12 md:p-16 rounded-[3rem] md:rounded-[4rem] border border-[var(--glass-border)] shadow-2xl backdrop-blur-xl animate-[pop_0.6s_ease-out]">
          <div className="w-20 h-20 md:w-24 md:h-24 bg-[#7A8F7A] text-white rounded-3xl flex items-center justify-center mx-auto mb-6 transform rotate-12 shadow-xl">
            <svg className="w-10 h-10 md:w-12 md:h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 13l4 4L19 7"/></svg>
          </div>
          <h2 className="text-3xl md:text-4xl serif text-[var(--text-color)]">Transmitted.</h2>
          <p className="text-[var(--text-muted)] font-light italic text-lg md:text-xl leading-relaxed">
            "{aiConfirmation}"
          </p>
          <button 
            onClick={() => { setStatus('idle'); setFormData({ name: '', email: '', message: '' }); }}
            className="text-[10px] uppercase tracking-[0.4em] font-bold text-[#7A8F7A] hover:text-[var(--text-color)] transition-all pt-4 border-b border-[#7A8F7A]/30 pb-1"
          >
            Send Another?
          </button>
        </div>
      </section>
    );
  }

  return (
    <section id="contact" ref={sectionRef} className="py-24 md:py-40 px-4 md:px-12 bg-[var(--bg-color)] section-reveal relative overflow-hidden transition-theme">
      <div className="max-w-[1400px] mx-auto bg-[var(--glass-bg)] border border-[var(--glass-border)] rounded-[3rem] md:rounded-[5rem] p-8 md:p-24 relative z-10 shadow-2xl backdrop-blur-sm">
        {/* Subtle Decorative Element */}
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-[#7A8F7A]/5 blur-[100px] rounded-full pointer-events-none"></div>

        <div className="max-w-4xl mx-auto space-y-16 md:space-y-20">
          <div className="text-center space-y-6">
            <span className="text-[#7A8F7A] text-[10px] uppercase tracking-[0.6em] font-bold">The Conversation</span>
            <h2 className="text-4xl md:text-7xl lg:text-8xl serif tracking-tighter italic text-[var(--text-color)] leading-[1.1]">Let's create something timeless.</h2>
          </div>

          <form onSubmit={handleSubmit} className="space-y-12 md:space-y-16">
            <div className="grid md:grid-cols-2 gap-12 md:gap-16">
              <div className="relative group">
                <input 
                  type="text" 
                  required
                  disabled={status === 'submitting'}
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="peer w-full bg-transparent border-b border-[var(--glass-border)] py-5 focus:outline-none focus:border-[#7A8F7A] transition-all font-light text-xl md:text-2xl placeholder-transparent disabled:opacity-30 text-[var(--text-color)]"
                  id="name"
                  placeholder="NAME"
                />
                <label 
                  htmlFor="name" 
                  className="absolute left-0 top-0 text-[var(--text-dim)] text-[10px] uppercase tracking-[0.4em] font-bold transition-all peer-placeholder-shown:text-xl md:peer-placeholder-shown:text-2xl peer-placeholder-shown:top-5 peer-placeholder-shown:font-light peer-placeholder-shown:tracking-normal peer-focus:top-0 peer-focus:text-[10px] peer-focus:uppercase peer-focus:tracking-[0.4em] peer-focus:text-[#7A8F7A] pointer-events-none"
                >
                  YOUR NAME
                </label>
              </div>
              
              <div className="relative group">
                <input 
                  type="email" 
                  required
                  disabled={status === 'submitting'}
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="peer w-full bg-transparent border-b border-[var(--glass-border)] py-5 focus:outline-none focus:border-[#7A8F7A] transition-all font-light text-xl md:text-2xl placeholder-transparent disabled:opacity-30 text-[var(--text-color)]"
                  id="email"
                  placeholder="EMAIL"
                />
                <label 
                  htmlFor="email" 
                  className="absolute left-0 top-0 text-[var(--text-dim)] text-[10px] uppercase tracking-[0.4em] font-bold transition-all peer-placeholder-shown:text-xl md:peer-placeholder-shown:text-2xl peer-placeholder-shown:top-5 peer-placeholder-shown:font-light peer-placeholder-shown:tracking-normal peer-focus:top-0 peer-focus:text-[10px] peer-focus:uppercase peer-focus:tracking-[0.4em] peer-focus:text-[#7A8F7A] pointer-events-none"
                >
                  EMAIL ADDRESS
                </label>
              </div>
            </div>
            
            <div className="relative group">
              <textarea 
                rows={3} 
                required
                disabled={status === 'submitting'}
                value={formData.message}
                onChange={(e) => setFormData({...formData, message: e.target.value})}
                className="peer w-full bg-transparent border-b border-[var(--glass-border)] py-5 focus:outline-none focus:border-[#7A8F7A] transition-all font-light text-xl md:text-2xl resize-none placeholder-transparent disabled:opacity-30 text-[var(--text-color)]"
                id="message"
                placeholder="MESSAGE"
              />
              <label 
                htmlFor="message" 
                className="absolute left-0 top-0 text-[var(--text-dim)] text-[10px] uppercase tracking-[0.4em] font-bold transition-all peer-placeholder-shown:text-xl md:peer-placeholder-shown:text-2xl peer-placeholder-shown:top-5 peer-placeholder-shown:font-light peer-placeholder-shown:tracking-normal peer-focus:top-0 peer-focus:text-[10px] peer-focus:uppercase peer-focus:tracking-[0.4em] peer-focus:text-[#7A8F7A] pointer-events-none"
              >
                THE VISION...
              </label>
            </div>

            <div className="flex flex-col items-center pt-10">
              <button 
                type="submit"
                disabled={status === 'submitting'}
                className="group relative bg-[var(--text-color)] text-[var(--bg-color)] w-full md:w-auto md:px-24 py-6 rounded-full text-[10px] uppercase tracking-[0.5em] font-bold transition-all hover:opacity-90 active:scale-95 shadow-2xl disabled:opacity-20 flex items-center justify-center gap-4"
              >
                {status === 'submitting' ? (
                  <div className="flex items-center gap-4">
                     <div className="w-3 h-3 border-2 border-[var(--bg-color)]/20 border-t-[var(--bg-color)] rounded-full animate-spin"></div>
                     Establishing Link...
                  </div>
                ) : (
                  <>
                    Dispatch Message
                    <svg className="w-4 h-4 transform group-hover:translate-x-2 transition-transform duration-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3"/></svg>
                  </>
                )}
              </button>
              
              {status === 'error' && (
                <p className="mt-8 text-red-500 text-[10px] uppercase tracking-widest font-bold animate-pulse">
                  Inquiry Blocked. Check Connection.
                </p>
              )}
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;