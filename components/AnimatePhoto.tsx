
import React, { useState, useRef } from 'react';
import { GoogleGenAI } from "@google/genai";

const AnimatePhoto: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedVideoUrl, setGeneratedVideoUrl] = useState<string | null>(null);
  const [aspectRatio, setAspectRatio] = useState<'16:9' | '9:16'>('9:16');
  const [statusMessage, setStatusMessage] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result as string);
        setGeneratedVideoUrl(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const generateVideo = async () => {
    if (!selectedImage) return;

    // Check for API key as per Veo requirements. Using non-null assertion as aistudio is assumed to be accessible per requirements.
    if (!(await window.aistudio!.hasSelectedApiKey())) {
      await window.aistudio!.openSelectKey();
      // Proceed assuming success as per race condition instructions
    }

    setIsGenerating(true);
    setGeneratedVideoUrl(null);
    setStatusMessage('Analyzing your vision...');

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const base64Data = selectedImage.split(',')[1];

      setStatusMessage('Preparing the canvas...');
      let operation = await ai.models.generateVideos({
        model: 'veo-3.1-fast-generate-preview',
        prompt: 'Cinematic slow motion, subtle movement, professional color grade, high detail',
        image: {
          imageBytes: base64Data,
          mimeType: 'image/png',
        },
        config: {
          numberOfVideos: 1,
          resolution: '720p',
          aspectRatio: aspectRatio
        }
      });

      const loadingMessages = [
        'Brushing life into the frame...',
        'Capturing the flow of time...',
        'Rendering emotional depth...',
        'Polishing the final motion...'
      ];
      let msgIndex = 0;

      while (!operation.done) {
        setStatusMessage(loadingMessages[msgIndex % loadingMessages.length]);
        msgIndex++;
        await new Promise(resolve => setTimeout(resolve, 10000));
        operation = await ai.operations.getVideosOperation({ operation: operation });
      }

      const downloadLink = operation.response?.generatedVideos?.[0]?.video?.uri;
      if (downloadLink) {
        const response = await fetch(`${downloadLink}&key=${process.env.API_KEY}`);
        const blob = await response.blob();
        const url = URL.createObjectURL(blob);
        setGeneratedVideoUrl(url);
        setStatusMessage('Generation complete.');
      }
    } catch (error: any) {
      console.error('Generation failed:', error);
      if (error.message?.includes("Requested entity was not found")) {
        setStatusMessage('API Key issue. Please re-select your key.');
        // Using non-null assertion as aistudio is assumed to be accessible per environment documentation.
        await window.aistudio!.openSelectKey();
      } else {
        setStatusMessage('Something went wrong. Please try again.');
      }
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <section id="animate" className="py-24 px-6 bg-white">
      <div className="max-w-5xl mx-auto p-8 md:p-16 border border-black/15 rounded-[3rem] shadow-sm relative bg-[#F8F8F6]/50 backdrop-blur-sm">
        <div className="text-center space-y-4 mb-12">
          <span className="text-[10px] uppercase tracking-[0.5em] font-bold text-[#7A8F7A]">Motion Memories</span>
          <h2 className="text-4xl md:text-5xl serif">Animate Your Vision</h2>
          <p className="text-black/60 font-light italic max-w-xl mx-auto">
            Transform a single moment into a cinematic experience using advanced AI.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-start">
          <div className="space-y-8">
            <div 
              className={`aspect-[3/4] rounded-3xl border-2 border-dashed border-black/10 flex flex-col items-center justify-center p-4 transition-all hover:border-[#7A8F7A]/40 cursor-pointer overflow-hidden relative group ${selectedImage ? 'border-solid' : ''}`}
              onClick={() => fileInputRef.current?.click()}
            >
              {selectedImage ? (
                <img src={selectedImage} alt="Selected" className="w-full h-full object-cover rounded-2xl" />
              ) : (
                <div className="text-center space-y-4">
                  <div className="w-12 h-12 bg-black/5 rounded-full flex items-center justify-center mx-auto">
                    <svg className="w-6 h-6 text-black/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <p className="text-sm font-medium text-black/40 tracking-wider">Upload a Photo</p>
                </div>
              )}
              <input 
                type="file" 
                ref={fileInputRef} 
                onChange={handleFileChange} 
                className="hidden" 
                accept="image/*" 
              />
            </div>

            <div className="flex items-center justify-center gap-8">
              <button 
                onClick={() => setAspectRatio('9:16')}
                className={`text-[10px] uppercase tracking-widest font-bold pb-1 border-b-2 transition-all ${aspectRatio === '9:16' ? 'border-[#7A8F7A] text-black' : 'border-transparent text-black/20'}`}
              >
                Portrait (9:16)
              </button>
              <button 
                onClick={() => setAspectRatio('16:9')}
                className={`text-[10px] uppercase tracking-widest font-bold pb-1 border-b-2 transition-all ${aspectRatio === '16:9' ? 'border-[#7A8F7A] text-black' : 'border-transparent text-black/20'}`}
              >
                Landscape (16:9)
              </button>
            </div>
          </div>

          <div className="space-y-8 flex flex-col justify-center min-h-[400px]">
            {isGenerating ? (
              <div className="text-center space-y-8 animate-pulse">
                <div className="w-20 h-20 border-4 border-[#7A8F7A]/20 border-t-[#7A8F7A] rounded-full animate-spin mx-auto"></div>
                <div className="space-y-2">
                  <p className="text-xl serif italic text-black/80">{statusMessage}</p>
                  <p className="text-[10px] uppercase tracking-widest text-black/30">Generation typically takes 1-2 minutes</p>
                </div>
              </div>
            ) : generatedVideoUrl ? (
              <div className="space-y-6 animate-[fadeIn_1s_ease-out]">
                <video 
                  src={generatedVideoUrl} 
                  controls 
                  autoPlay 
                  loop 
                  className={`w-full rounded-3xl shadow-2xl border border-black/5 ${aspectRatio === '9:16' ? 'aspect-[9/16]' : 'aspect-[16:9]'}`}
                />
                <button 
                  onClick={generateVideo}
                  className="w-full py-5 bg-black text-white rounded-full text-[10px] uppercase tracking-[0.4em] font-bold hover:bg-[#1C1C1C] transition-all"
                >
                  Regenerate Motion
                </button>
              </div>
            ) : (
              <div className="text-center space-y-8">
                <div className="space-y-4">
                  <h3 className="text-2xl serif">Ready to breathe life?</h3>
                  <p className="text-black/40 text-sm font-light leading-relaxed">
                    Our AI model will analyze your photo and create a subtle, cinematic motion sequence. Please ensure you have a paid API key selected for Veo generations.
                  </p>
                </div>
                <button 
                  onClick={generateVideo}
                  disabled={!selectedImage}
                  className="w-full py-6 bg-[#1C1C1C] text-white rounded-full text-[10px] uppercase tracking-[0.5em] font-bold hover:bg-black transition-all shadow-xl disabled:opacity-20 disabled:cursor-not-allowed group"
                >
                  Generate Cinematic Video
                  <span className="ml-4 inline-block transform group-hover:translate-x-2 transition-transform">→</span>
                </button>
                <a 
                  href="https://ai.google.dev/gemini-api/docs/billing" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="block text-[9px] uppercase tracking-widest text-[#7A8F7A] font-bold hover:underline"
                >
                  Billing Documentation
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AnimatePhoto;
