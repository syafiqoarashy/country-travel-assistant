import { useState, useRef, useEffect } from 'react';
import { generateResponse } from '../../services/nim';
import { ChatInterfaceProps, Message, QuickPrompt } from './types/chat';
import { WELCOME_MESSAGE, QUICK_PROMPTS } from './types/constants';
import * as S from './styles';
import { QuickPromptsList } from './QuickPromptsList';
import { ChatMessage } from './ChatMessage';

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
      
      setMessages(prev => [...prev, {
        id: (Date.now() + 1).toString(),
        text: response.text,
        isUser: false,
      }]);
    } catch (error) {
      setMessages(prev => [...prev, {
        id: (Date.now() + 1).toString(),
        text: error instanceof Error ? error.message : "Sorry, I encountered an error. Please try again.",
        isUser: false,
      }]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleReset = () => setMessages([WELCOME_MESSAGE]);
  const handleMinimize = () => setIsMinimized(!isMinimized);

  return (
    <S.ChatContainer isMinimized={isMinimized}>
      <S.SafeAreaSpacer />
      <S.ChatHeader isMinimized={isMinimized}>
        <S.HeaderTitle>
          <span>Travel Assistant</span>
          {selectedCountry && (
            <span>{selectedCountry.emoji} {selectedCountry.name}</span>
          )}
        </S.HeaderTitle>
        <S.HeaderControls>
          <S.ResetButton onClick={handleReset} title="Reset chat">↺</S.ResetButton>
          <S.MinimizeButton
            onClick={handleMinimize}
            title={isMinimized ? 'Maximize' : 'Minimize'}
          >
            {isMinimized ? '□' : '−'}
          </S.MinimizeButton>
        </S.HeaderControls>
      </S.ChatHeader>
      
      {!isMinimized && (
        <>
          <QuickPromptsList prompts={QUICK_PROMPTS} onPromptClick={handlePromptClick} />
          <S.ChatBody ref={chatBodyRef}>
            {messages.map(message => (
              <ChatMessage key={message.id} message={message} />
            ))}
            {isTyping && (
              <S.TypingIndicator>
                <S.LoadingSpinner />
                Assistant is typing...
              </S.TypingIndicator>
            )}
          </S.ChatBody>
          
          {selectedCountry && (
            <S.ContextMessage>
              <span>{selectedCountry.emoji}</span>
              <span>Focusing on {selectedCountry.name}</span>
            </S.ContextMessage>
          )}
          
          <S.InputContainer>
            <S.Input
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Ask about countries or travel..."
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            />
            <S.SendButton 
              onClick={handleSend} 
              disabled={!inputText.trim() || isTyping}
            >
              Send
            </S.SendButton>
          </S.InputContainer>
        </>
      )}
    </S.ChatContainer>
  );
};

export default ChatInterface;