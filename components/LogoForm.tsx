import React, { useState } from 'react';
import { LogoFormData, LogoStyle } from '../types';
import { Wand2, Palette, Type, LayoutTemplate, Zap } from 'lucide-react';

interface LogoFormProps {
  onSubmit: (data: LogoFormData) => void;
  isGenerating: boolean;
}

const LogoForm: React.FC<LogoFormProps> = ({ onSubmit, isGenerating }) => {
  const [formData, setFormData] = useState<LogoFormData>({
    brandName: '',
    slogan: '',
    style: LogoStyle.MODERN,
    colors: '',
    iconType: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-2xl p-6 md:p-8 shadow-xl">
      <h2 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
        <LayoutTemplate className="w-5 h-5 text-indigo-400" />
        Logo Details
      </h2>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Brand Name */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-300 flex items-center gap-2">
            <Type className="w-4 h-4" /> Brand Name <span className="text-red-400">*</span>
          </label>
          <input
            type="text"
            name="brandName"
            required
            value={formData.brandName}
            onChange={handleChange}
            placeholder="e.g. Nexus, Galaxy Coffee..."
            className="w-full bg-slate-900 border border-slate-600 text-white rounded-lg px-4 py-3 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all placeholder-slate-500"
          />
        </div>

        {/* Slogan */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-300 flex items-center gap-2">
            <Type className="w-4 h-4" /> Slogan / Tagline (Optional)
          </label>
          <input
            type="text"
            name="slogan"
            value={formData.slogan}
            onChange={handleChange}
            placeholder="e.g. The Future of Tech"
            className="w-full bg-slate-900 border border-slate-600 text-white rounded-lg px-4 py-3 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all placeholder-slate-500"
          />
        </div>

        {/* Style Selection */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-300 flex items-center gap-2">
            <Wand2 className="w-4 h-4" /> Aesthetic Style
          </label>
          <div className="relative">
            <select
              name="style"
              value={formData.style}
              onChange={handleChange}
              className="w-full bg-slate-900 border border-slate-600 text-white rounded-lg px-4 py-3 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none appearance-none cursor-pointer"
            >
              {Object.values(LogoStyle).map((style) => (
                <option key={style} value={style}>{style}</option>
              ))}
            </select>
            <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
              <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
            </div>
          </div>
        </div>

        {/* Colors */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-300 flex items-center gap-2">
            <Palette className="w-4 h-4" /> Color Palette (Optional)
          </label>
          <input
            type="text"
            name="colors"
            value={formData.colors}
            onChange={handleChange}
            placeholder="e.g. Blue and Gold, Neon Green, Black & White"
            className="w-full bg-slate-900 border border-slate-600 text-white rounded-lg px-4 py-3 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all placeholder-slate-500"
          />
        </div>

        {/* Icon Type */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-300 flex items-center gap-2">
            <Zap className="w-4 h-4" /> Symbol / Icon Idea (Optional)
          </label>
          <input
            type="text"
            name="iconType"
            value={formData.iconType}
            onChange={handleChange}
            placeholder="e.g. A rocket, a coffee cup, abstract triangle"
            className="w-full bg-slate-900 border border-slate-600 text-white rounded-lg px-4 py-3 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all placeholder-slate-500"
          />
        </div>

        <button
          type="submit"
          disabled={isGenerating || !formData.brandName.trim()}
          className={`w-full py-4 px-6 rounded-lg text-white font-bold text-lg shadow-lg transition-all transform hover:scale-[1.02] active:scale-[0.98] ${
            isGenerating || !formData.brandName.trim()
              ? 'bg-slate-600 cursor-not-allowed opacity-70'
              : 'bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 hover:shadow-indigo-500/30'
          }`}
        >
          {isGenerating ? (
            <span className="flex items-center justify-center gap-2">
              <span className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></span>
              Creating Magic...
            </span>
          ) : (
            <span className="flex items-center justify-center gap-2">
              Generate Logo <Wand2 className="w-5 h-5" />
            </span>
          )}
        </button>
      </form>
    </div>
  );
};

export default LogoForm;