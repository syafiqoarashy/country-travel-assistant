import type { Country } from '../../../types/country';

export interface Message {
  id: string;
  text: string;
  isUser: boolean;
}

export interface QuickPrompt {
  id: string;
  text: string;
  prompt: string;
}

export interface ChatInterfaceProps {
  selectedCountry?: Country;
}