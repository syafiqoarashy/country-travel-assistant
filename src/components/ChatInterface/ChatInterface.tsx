import { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import type { Country } from '../../types/country';
import { generateResponse } from '../../services/nim';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

const ChatContainer = styled.div<{ isMinimized: boolean }>`
  position: fixed;
  bottom: 20px;
  right: 20px;
  width: ${props => props.isMinimized ? '300px' : '300px'};
  height: ${props => props.isMinimized ? '60px' : '600px'};
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  display: flex;
  flex-direction: column;
  overflow: hidden;
  z-index: 1000;
  transition: all 0.3s ease-in-out;
`;

const ChatHeader = styled.div`
  padding: 16px;
  background: #007bff;
  color: white;
  font-weight: 500;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const HeaderControls = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const MinimizeButton = styled.button`
  background: none;
  border: none;
  color: white;
  font-size: 20px;
  cursor: pointer;
  padding: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  transition: background-color 0.2s;

  &:hover {
    background-color: rgba(255, 255, 255, 0.2);
  }
`;

const HeaderTitle = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const QuickPrompts = styled.div`
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  padding: 8px 16px;
  border-bottom: 1px solid #eee;
  background: #f8f9fa;
`;

const PromptButton = styled.button`
  background: #f0f7ff;
  border: 1px solid #cce5ff;
  border-radius: 16px;
  padding: 6px 12px;
  font-size: 12px;
  color: #0056b3;
  cursor: pointer;
  transition: all 0.2s;
  white-space: nowrap;

  &:hover {
    background: #cce5ff;
    transform: translateY(-1px);
  }
`;

const ChatBody = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const Message = styled.div<{ isUser: boolean }>`
  max-width: 90%;
  padding: 10px 14px;
  border-radius: 14px;
  white-space: pre-wrap;
  ${({ isUser }) => isUser ? `
    background: #007bff;
    color: white;
    align-self: flex-end;
    border-bottom-right-radius: 4px;
  ` : `
    background: #f0f0f0;
    color: #333;
    align-self: flex-start;
    border-bottom-left-radius: 4px;
  `}
`;

const InputContainer = styled.div`
  padding: 16px;
  border-top: 1px solid #eee;
  display: flex;
  gap: 8px;
`;

const Input = styled.input`
  flex: 1;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 20px;
  outline: none;
  font-size: 14px;

  &:focus {
    border-color: #007bff;
  }
`;

const SendButton = styled.button`
  background: #007bff;
  color: white;
  border: none;
  border-radius: 20px;
  padding: 0 16px;
  cursor: pointer;
  transition: background 0.2s;

  &:hover {
    background: #0056b3;
  }

  &:disabled {
    background: #ccc;
    cursor: not-allowed;
  }
`;

const TypingIndicator = styled.div`
  padding: 10px;
  color: #666;
  font-style: italic;
`;

interface Message {
  id: string;
  text: string;
  isUser: boolean;
}

interface QuickPrompt {
  id: string;
  text: string;
  prompt: string;
}

interface ChatInterfaceProps {
  selectedCountry?: Country;
}

const WELCOME_MESSAGE = {
  id: 'welcome',
  text: `👋 Hello! I'm your travel assistant.

Select a country from the list or use the quick prompt buttons above to get started!`,
  isUser: false,
};

const QUICK_PROMPTS: QuickPrompt[] = [
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

const ChatInterface = ({ selectedCountry }: ChatInterfaceProps) => {
    const [messages, setMessages] = useState<Message[]>([WELCOME_MESSAGE]);
    const [inputText, setInputText] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const [isMinimized, setIsMinimized] = useState(false);
    const chatBodyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chatBodyRef.current) {
      chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight;
    }
  }, [messages]);

  useEffect(() => {
    if (selectedCountry) {
      setMessages(prev => [...prev, {
        id: `country-select-${Date.now()}`,
        text: `📍 Now focusing on ${selectedCountry.name}. How can I help you learn more about it?`,
        isUser: false,
      }]);
    }
  }, [selectedCountry?.code, selectedCountry]);

  const handlePromptClick = (prompt: QuickPrompt) => {
    const promptText = selectedCountry 
      ? `${prompt.prompt} in ${selectedCountry.name}?`
      : `${prompt.prompt}?`;
    setInputText(promptText);
  };

  const handleSend = async () => {
    if (!inputText.trim()) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      text: inputText,
      isUser: true,
    };

    setMessages(prev => [...prev, newMessage]);
    setInputText('');
    setIsTyping(true);

    try {
      const response = await generateResponse(
        inputText,
        selectedCountry ? `${selectedCountry.name} (${selectedCountry.code})` : undefined
      );
      
      if (response.error) {
        throw new Error(response.error);
      }

      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: response.text,
        isUser: false,
      };
      setMessages(prev => [...prev, aiResponse]);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Sorry, I encountered an error. Please try again.";
      setMessages(prev => [...prev, {
        id: (Date.now() + 1).toString(),
        text: errorMessage,
        isUser: false,
      }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <ChatContainer isMinimized={isMinimized}>
      <ChatHeader>
        <HeaderTitle>
          <span>Travel Assistant</span>
          {selectedCountry && <span>{selectedCountry.emoji} {selectedCountry.name}</span>}
        </HeaderTitle>
        <HeaderControls>
          <MinimizeButton
            onClick={() => setIsMinimized(!isMinimized)}
            title={isMinimized ? 'Maximize' : 'Minimize'}
          >
            {isMinimized ? '□' : '−'}
          </MinimizeButton>
        </HeaderControls>
      </ChatHeader>
      {!isMinimized && (
        <>
          <QuickPrompts>
            {QUICK_PROMPTS.map((prompt) => (
              <PromptButton
                key={prompt.id}
                onClick={() => handlePromptClick(prompt)}
              >
                {prompt.text}
              </PromptButton>
            ))}
          </QuickPrompts>
          <ChatBody ref={chatBodyRef}>
            {messages.map(message => (
              <Message key={message.id} isUser={message.isUser}>
                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                    {message.text}
                </ReactMarkdown>
              </Message>
            ))}
            {isTyping && (
              <TypingIndicator>Assistant is typing...</TypingIndicator>
            )}
          </ChatBody>
          <InputContainer>
            <Input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Ask about countries or travel..."
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            />
            <SendButton onClick={handleSend} disabled={!inputText.trim() || isTyping}>
              Send
            </SendButton>
          </InputContainer>
        </>
      )}
    </ChatContainer>
  );
};

export default ChatInterface;