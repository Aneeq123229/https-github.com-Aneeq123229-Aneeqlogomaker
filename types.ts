export interface LogoFormData {
  brandName: string;
  slogan: string;
  style: string;
  colors: string;
  iconType: string;
}

export interface GeneratedLogo {
  imageUrl: string;
  promptUsed: string;
  timestamp: number;
}

export enum LogoStyle {
  MINIMALIST = "Minimalist & Clean",
  MODERN = "Modern & Tech",
  VINTAGE = "Vintage & Retro",
  LUXURY = "Luxury & Elegant",
  PLAYFUL = "Playful & Cartoonish",
  ABSTRACT = "Abstract & Geometric",
  HAND_DRAWN = "Hand Drawn & Artistic",
  CYBERPUNK = "Cyberpunk & Neon"
}

// Window interface for the AI Studio key selection
declare global {
  interface AIStudio {
    hasSelectedApiKey: () => Promise<boolean>;
    openSelectKey: () => Promise<void>;
  }
}