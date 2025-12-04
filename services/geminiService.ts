import { GoogleGenAI } from "@google/genai";
import { LogoFormData } from "../types";

// Helper to get the AI client. 
// We create a NEW instance every call to ensure we pick up the latest API Key if changed via window.aistudio
const getAiClient = () => {
  // The API key is injected into process.env.API_KEY by the environment after selection
  return new GoogleGenAI({ apiKey: process.env.API_KEY });
};

export const checkApiKeySelection = async (): Promise<boolean> => {
  if (window.aistudio && window.aistudio.hasSelectedApiKey) {
    return await window.aistudio.hasSelectedApiKey();
  }
  return false; // Fallback if not running in the specific environment
};

export const promptForKeySelection = async (): Promise<void> => {
  if (window.aistudio && window.aistudio.openSelectKey) {
    await window.aistudio.openSelectKey();
  } else {
    console.warn("AI Studio key selection not available in this environment.");
  }
};

export const generateLogoImage = async (data: LogoFormData): Promise<string> => {
  const ai = getAiClient();

  // Construct a detailed prompt for the image model
  const prompt = `
    Design a professional high-quality logo for a brand named "${data.brandName}".
    ${data.slogan ? `Include the slogan text: "${data.slogan}" in a smaller font.` : ''}
    
    Style: ${data.style}.
    Color Palette: ${data.colors || 'Brand appropriate colors'}.
    Icon/Symbol preferences: ${data.iconType || 'A unique creative symbol representing the brand'}.
    
    Technical requirements:
    - High contrast, vector-like aesthetic.
    - Centered composition on a clean white background.
    - Clear, legible typography.
    - No realistic photos, stick to graphic design/logo aesthetics.
    - Ensure the text "${data.brandName}" is spelled correctly.
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-pro-image-preview', // High quality model
      contents: {
        parts: [
          { text: prompt }
        ]
      },
      config: {
        imageConfig: {
          aspectRatio: "1:1",
          imageSize: "1K"
        }
      }
    });

    // Extract image from response
    if (response.candidates && response.candidates[0].content.parts) {
      for (const part of response.candidates[0].content.parts) {
        if (part.inlineData && part.inlineData.data) {
          return `data:image/png;base64,${part.inlineData.data}`;
        }
      }
    }

    throw new Error("No image data found in response.");

  } catch (error) {
    console.error("Gemini API Error:", error);
    throw error;
  }
};