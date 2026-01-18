
import React, { useState } from 'react';
import { GoogleGenAI } from "@google/genai";

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [aiConfirmation, setAiConfirmation] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');

    try {
      // 1. Send actual email to vikramrajshiv2006@gmail.com
      // We use a form submission service (like Formspree or Web3Forms)
      // Replace 'YOUR_FORM_ID' with your actual Formspree ID or use a service like Web3Forms
      const emailPromise = fetch('https://formspree.io/f/mwvvlzao', { // Example: Replace with your actual ID
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

      // 2. Generate AI Confirmation for the user experience
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const prompt = `
        You are the AI studio assistant for Vicky, a high-end travel and lifestyle photographer. 
        A client named ${formData.name} (${formData.email}) has sent a message: "${formData.message}".
        
        Generate a professional, warm, and concise response (max 3 sentences) confirming Vicky received their message. 
        Refer to one specific detail from their message to make it feel personal. 
        End by saying Vicky will reach out personally soon.
      `;

      const aiPromise = ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: prompt,
      });

      // Wait for both to finish (or at least attempt)
      const [emailResponse, aiResponse] = await Promise.all([emailPromise, aiPromise]);

      if (!emailResponse.ok) {
        throw new Error('Email delivery service failed');
      }

      const text = aiResponse.text || "Thank you so much! Vicky has received your inquiry and will get back to you shortly.";
      setAiConfirmation(text);
      setStatus('success');
    } catch (error) {
      console.error("Submission failed:", error);
      setStatus('error');
    }
  };

  if (status === 'success') {
    return (
      <section id="contact" className="py-32 px-6 animate-[fadeIn_0.6s_ease-out]">
        <div className="max-w-2xl mx-auto text-center space-y-8 bg-white p-12 rounded-[3rem] border border-black/20 shadow-sm">
          <div className="w-16 h-16 bg-[#7A8F7A]/10 text-[#7A8F7A] rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-3xl serif">Message Received</h2>
          <div className="space-y-4">
            <p className="text-black/70 font-light leading-relaxed italic px-4">
              "{aiConfirmation}"
            </p>
            <p className="text-[10px] uppercase tracking-widest text-[#7A8F7A] font-bold">
              An email has been sent to Vicky's inbox.
            </p>
          </div>
          <button 
            onClick={() => { setStatus('idle'); setFormData({ name: '', email: '', message: '' }); }}
            className="text-[10px] uppercase tracking-[0.3em] font-bold text-black/30 hover:text-black transition-colors pt-4"
          >
            ← Send another inquiry
          </button>
        </div>
      </section>
    );
  }

  return (
    <section id="contact" className="py-24 px-6">
      <div className="max-w-3xl mx-auto p-8 md:p-16 border border-black/20 rounded-[3rem] shadow-sm bg-white/50 backdrop-blur-sm relative">
        <div className="text-center space-y-4 mb-12">
          <h2 className="text-4xl md:text-5xl serif">Get in Touch</h2>
          <p className="text-black/60 font-light italic">Your message will be delivered directly to Vicky's Gmail.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-2">
              <label className="text-xs uppercase tracking-widest font-bold text-black/40">Name</label>
              <input 
                type="text" 
                name="name"
                required
                disabled={status === 'submitting'}
                value={formData.name}
                className="w-full bg-transparent border-b border-black/10 py-3 focus:outline-none focus:border-black transition-colors font-light disabled:opacity-50"
                placeholder="Your Name"
                onChange={(e) => setFormData({...formData, name: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs uppercase tracking-widest font-bold text-black/40">Email</label>
              <input 
                type="email" 
                name="email"
                required
                disabled={status === 'submitting'}
                value={formData.email}
                className="w-full bg-transparent border-b border-black/10 py-3 focus:outline-none focus:border-black transition-colors font-light disabled:opacity-50"
                placeholder="Email Address"
                onChange={(e) => setFormData({...formData, email: e.target.value})}
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <label className="text-xs uppercase tracking-widest font-bold text-black/40">Message</label>
            <textarea 
              name="message"
              rows={4} 
              required
              disabled={status === 'submitting'}
              value={formData.message}
              className="w-full bg-transparent border-b border-black/10 py-3 focus:outline-none focus:border-black transition-colors font-light resize-none disabled:opacity-50"
              placeholder="Tell me about your vision..."
              onChange={(e) => setFormData({...formData, message: e.target.value})}
            />
          </div>

          <div className="flex flex-col items-center gap-6 pt-8">
            <button 
              type="submit"
              disabled={status === 'submitting'}
              className="bg-[#1C1C1C] text-white px-12 py-4 rounded-full text-sm uppercase tracking-widest font-medium hover:bg-black transition-all transform hover:scale-105 active:scale-95 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed min-w-[220px]"
            >
              {status === 'submitting' ? (
                <span className="flex items-center justify-center gap-3">
                  <svg className="animate-spin h-4 w-4 text-white" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Sending to Vicky...
                </span>
              ) : 'Send Message'}
            </button>
            
            {status === 'error' && (
              <p className="text-red-400 text-[10px] uppercase tracking-widest font-bold">
                Connection failed. Please check your network and try again.
              </p>
            )}
          </div>
        </form>
      </div>
    </section>
  );
};

export default Contact;
