import React, { useState } from 'react';
import LogoForm from './components/LogoForm';
import LogoDisplay from './components/LogoDisplay';
import ApiKeyChecker from './components/ApiKeyChecker';
import { generateLogoImage } from './services/geminiService';
import { LogoFormData, GeneratedLogo } from './types';
import { PenTool, Hexagon } from 'lucide-react';

function App() {
  const [isApiKeyValid, setIsApiKeyValid] = useState<boolean>(false);
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [generatedLogo, setGeneratedLogo] = useState<GeneratedLogo | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleLogoGeneration = async (data: LogoFormData) => {
    setIsGenerating(true);
    setError(null);
    setGeneratedLogo(null);

    try {
      const imageUrl = await generateLogoImage(data);
      
      setGeneratedLogo({
        imageUrl,
        promptUsed: `Logo for ${data.brandName}, ${data.style}`,
        timestamp: Date.now()
      });
    } catch (err: any) {
      // Check for specific error message regarding "Requested entity was not found" 
      // which implies the API key selection failed or wasn't found properly
      if (err.message && err.message.includes("Requested entity was not found")) {
        setError("API Key verification failed. Please try selecting the key again.");
        setIsApiKeyValid(false); // Reset to force selection again
      } else {
        setError(err.message || "Something went wrong while generating the logo.");
      }
    } finally {
      setIsGenerating(false);
    }
  };

  const resetApp = () => {
    setGeneratedLogo(null);
    setError(null);
  };

  return (
    <div className="min-h-screen bg-[#0f172a] text-slate-100 selection:bg-indigo-500 selection:text-white">
      {/* Background Decor */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-purple-900/20 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-indigo-900/20 rounded-full blur-[120px]"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 py-8 md:py-12">
        {/* Header */}
        <header className="mb-12 text-center">
          <div className="inline-flex items-center justify-center gap-3 mb-4">
            <div className="bg-gradient-to-br from-indigo-500 to-purple-600 p-3 rounded-xl shadow-lg shadow-indigo-500/20">
              <Hexagon className="w-8 h-8 text-white fill-white/20" strokeWidth={1.5} />
            </div>
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white via-indigo-200 to-indigo-400">
            Aneeq Marketing Wala
          </h1>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto">
            Create professional, unique brand identities in seconds using the power of Google's Gemini 3 Pro AI.
          </p>
        </header>

        {/* API Key Check Section */}
        {!isApiKeyValid ? (
          <ApiKeyChecker onKeySelected={() => setIsApiKeyValid(true)} />
        ) : (
          <main>
             {error && (
              <div className="mb-8 p-4 bg-red-500/10 border border-red-500/20 rounded-lg text-red-200 text-center max-w-3xl mx-auto">
                {error}
              </div>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Left Column: Form */}
              <div className="lg:col-span-5 xl:col-span-4">
                <LogoForm onSubmit={handleLogoGeneration} isGenerating={isGenerating} />
                
                {/* Tips Section */}
                <div className="mt-6 p-5 bg-slate-800/30 rounded-xl border border-slate-700/50 hidden md:block">
                  <h4 className="flex items-center gap-2 font-semibold text-slate-300 mb-2">
                    <PenTool className="w-4 h-4" /> Pro Tips
                  </h4>
                  <ul className="text-sm text-slate-400 space-y-2 list-disc list-inside">
                    <li>Be specific about colors (e.g., "Navy Blue and Gold").</li>
                    <li>Choose a style that matches your industry.</li>
                    <li>Simpler prompts often yield cleaner logos.</li>
                    <li>Try adding an object to the "Symbol Idea" field.</li>
                  </ul>
                </div>
              </div>

              {/* Right Column: Display */}
              <div className="lg:col-span-7 xl:col-span-8 h-full sticky top-8">
                <LogoDisplay 
                  logo={generatedLogo} 
                  isGenerating={isGenerating} 
                  onReset={resetApp}
                />
              </div>
            </div>
          </main>
        )}
      </div>
      
      {/* Footer */}
      <footer className="relative z-10 py-8 text-center text-slate-500 text-sm mt-12 border-t border-slate-800">
        <p>Powered by Google Gemini 3 Pro & React</p>
      </footer>
    </div>
  );
}

export default App;