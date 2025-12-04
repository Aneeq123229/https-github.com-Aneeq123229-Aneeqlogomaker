import React from 'react';
import { GeneratedLogo } from '../types';
import { Download, Share2, Sparkles, RefreshCcw } from 'lucide-react';

interface LogoDisplayProps {
  logo: GeneratedLogo | null;
  isGenerating: boolean;
  onReset: () => void;
}

const LogoDisplay: React.FC<LogoDisplayProps> = ({ logo, isGenerating, onReset }) => {
  const handleDownload = () => {
    if (!logo) return;
    const link = document.createElement('a');
    link.href = logo.imageUrl;
    link.download = `logo-${logo.timestamp}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (!logo && !isGenerating) {
    return (
      <div className="h-full min-h-[400px] flex flex-col items-center justify-center bg-slate-800/30 backdrop-blur-sm border border-slate-700/50 rounded-2xl border-dashed p-8 text-center">
        <div className="w-20 h-20 bg-slate-800 rounded-full flex items-center justify-center mb-4 shadow-inner">
            <Sparkles className="w-8 h-8 text-slate-500" />
        </div>
        <h3 className="text-xl font-medium text-white mb-2">Ready to Design</h3>
        <p className="text-slate-400 max-w-xs mx-auto">
          Fill out the details on the left and hit generate to see your new brand identity come to life using Gemini AI.
        </p>
      </div>
    );
  }

  if (isGenerating) {
    return (
      <div className="h-full min-h-[400px] flex flex-col items-center justify-center bg-slate-800/30 backdrop-blur-sm border border-slate-700 rounded-2xl p-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-tr from-indigo-500/10 to-pink-500/10 animate-pulse"></div>
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-indigo-500 mb-6"></div>
        <h3 className="text-xl font-medium text-white mb-2 animate-pulse">Designing your Logo...</h3>
        <p className="text-slate-400 text-center">
            Thinking about typography, colors, and composition.
        </p>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col">
      <div className="bg-slate-800 border border-slate-700 rounded-2xl p-4 md:p-6 shadow-2xl flex-grow flex flex-col">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-white">Result</h3>
          <span className="text-xs font-mono text-indigo-400 bg-indigo-400/10 px-2 py-1 rounded">1024x1024 PX</span>
        </div>

        {logo && (
          <div className="relative group flex-grow flex items-center justify-center bg-[#f8fafc] rounded-lg overflow-hidden mb-6 border-4 border-slate-900/10 min-h-[300px]">
            {/* Checkerboard background for transparency simulation if needed, though Gemini output is usually opaque */}
            <div 
                className="absolute inset-0 opacity-10"
                style={{
                    backgroundImage: 'radial-gradient(#000 1px, transparent 0)',
                    backgroundSize: '20px 20px'
                }}
            ></div>
            
            <img 
              src={logo.imageUrl} 
              alt="Generated Logo" 
              className="w-full h-full object-contain max-h-[500px] relative z-10 transition-transform duration-500 group-hover:scale-105" 
            />
          </div>
        )}

        <div className="grid grid-cols-2 gap-3 mt-auto">
          <button
            onClick={handleDownload}
            className="flex items-center justify-center gap-2 bg-slate-700 hover:bg-slate-600 text-white py-3 px-4 rounded-lg transition-colors font-medium"
          >
            <Download className="w-5 h-5" /> Download
          </button>
          
          <button
            onClick={onReset}
            className="flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white py-3 px-4 rounded-lg transition-colors font-medium"
          >
            <RefreshCcw className="w-5 h-5" /> New Design
          </button>
        </div>
      </div>
      
      {logo && (
        <div className="mt-4 p-4 bg-slate-800/50 rounded-xl border border-slate-700/50">
           <p className="text-xs text-slate-400 font-mono line-clamp-2">
            AI Prompt: {logo.promptUsed}
           </p>
        </div>
      )}
    </div>
  );
};

export default LogoDisplay;