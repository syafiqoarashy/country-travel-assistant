import { QuickPrompts, PromptButton } from "./styles";
import { QuickPrompt } from "./types/chat";

interface QuickPromptsListProps {
  prompts: QuickPrompt[];
  onPromptClick: (prompt: QuickPrompt) => void;
}

export const QuickPromptsList = ({ prompts, onPromptClick }: QuickPromptsListProps) => (
  <QuickPrompts>
    {prompts.map((prompt) => (
      <PromptButton
        key={prompt.id}
        onClick={() => onPromptClick(prompt)}
      >
        {prompt.text}
      </PromptButton>
    ))}
  </QuickPrompts>
);