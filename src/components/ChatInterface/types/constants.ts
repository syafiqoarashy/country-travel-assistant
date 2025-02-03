import { QuickPrompt } from "./chat";

export const WELCOME_MESSAGE = {
  id: 'welcome',
  text: `👋 Hello! I'm your travel assistant.

Select a country from the list or use the quick prompt buttons above to get started!`,
  isUser: false,
};

export const QUICK_PROMPTS: QuickPrompt[] = [
  {
    id: 'travel-tips',
    text: '✈️ Travel Tips',
    prompt: 'What are the must-visit places and best time to visit'
  },
  {
    id: 'local-customs',
    text: '🎭 Local Customs',
    prompt: 'What are the important local customs and etiquette I should know about'
  },
  {
    id: 'language',
    text: '💬 Basic Phrases',
    prompt: 'What are some essential local phrases I should know'
  },
  {
    id: 'food',
    text: '🍴 Local Food',
    prompt: 'What are the must-try local dishes and food experiences'
  },
  {
    id: 'transport',
    text: '🚌 Transportation',
    prompt: 'How can I get around and what\'s the best way to travel locally'
  },
  {
    id: 'safety',
    text: '🛡️ Safety Tips',
    prompt: 'What should I know about safety and important precautions'
  }
];