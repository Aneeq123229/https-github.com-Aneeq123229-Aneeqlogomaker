import React, { useEffect, useState } from 'react';
import { checkApiKeySelection, promptForKeySelection } from '../services/geminiService';
import { Key, Lock } from 'lucide-react';

interface ApiKeyCheckerProps {
  onKeySelected: () => void;
}

const ApiKeyChecker: React.FC<ApiKeyCheckerProps> = ({ onKeySelected }) => {
  const [hasKey, setHasKey] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  const verifyKey = async () => {
    setLoading(true);
    try {
      const selected = await checkApiKeySelection();
      setHasKey(selected);
      if (selected) {
        onKeySelected();
      }
    } catch (e) {
      console.error("Failed to check API key", e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    verifyKey();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSelectKey = async () => {
    await promptForKeySelection();
    // Assume success and re-verify immediately, or strictly speaking, 
    // we should trust the user completed the flow.
    // In many environments, the prompt halts execution until closed.
    await verifyKey();
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] text-slate-400">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-500 mb-4"></div>
        <p>Verifying API access...</p>
      </div>
    );
  }

  if (hasKey) {
    return null; // Don't render anything if we have the key, just let the parent render the app
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-4">
      <div className="bg-slate-800 p-8 rounded-2xl shadow-2xl border border-slate-700 max-w-md w-full text-center">
        <div className="bg-indigo-500/20 p-4 rounded-full inline-flex mb-6">
          <Lock className="w-8 h-8 text-indigo-400" />
        </div>
        <h2 className="text-2xl font-bold text-white mb-3">API Key Required</h2>
        <p className="text-slate-400 mb-8">
          To generate high-quality logos with Gemini 3 Pro, you need to connect your Google Cloud project with billing enabled.
        </p>
        
        <button
          onClick={handleSelectKey}
          className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 transform hover:scale-[1.02]"
        >
          <Key className="w-5 h-5" />
          Select API Key
        </button>
        
        <p className="mt-6 text-xs text-slate-500">
          Learn more about billing at{' '}
          <a 
            href="https://ai.google.dev/gemini-api/docs/billing" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-indigo-400 hover:text-indigo-300 underline"
          >
            Google Gemini API Pricing
          </a>
        </p>
      </div>
    </div>
  );
};

export default ApiKeyChecker;