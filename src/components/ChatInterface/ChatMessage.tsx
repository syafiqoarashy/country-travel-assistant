import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Message as MessageType } from './types/chat';
import { Message as StyledMessage } from './styles';

interface ChatMessageProps {
  message: MessageType;
}

export const ChatMessage = ({ message }: ChatMessageProps) => (
  <StyledMessage isUser={message.isUser}>
    <ReactMarkdown remarkPlugins={[remarkGfm]}>
      {message.text}
    </ReactMarkdown>
  </StyledMessage>
);