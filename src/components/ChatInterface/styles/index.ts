import styled from 'styled-components';

export const ChatContainer = styled.div<{ isMinimized: boolean }>`
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

  @media (max-width: 768px) {
    bottom: 0;
    right: 0;
    width: 100%;
    height: ${props => props.isMinimized ? '60px' : '100%'};
    border-radius: 0;
  }
`;

export const ChatHeader = styled.div<{ isMinimized: boolean }>`
  padding: 12px 16px;
  background: #007bff;
  color: white;
  font-weight: 500;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 14px;
  height: ${props => props.isMinimized ? '60px' : '48px'};
`;

export const HeaderControls = styled.div`
  display: flex;
  align-items: center;
  flex-shrink: 0;
`;

export const MinimizeButton = styled.button`
  background: none;
  border: none;
  color: white;
  font-size: 18px;
  cursor: pointer;
  padding: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  border-radius: 50%;
  transition: background-color 0.2s;
  flex-shrink: 0;

  &:hover {
    background-color: rgba(255, 255, 255, 0.2);
  }
`;

export const HeaderTitle = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  max-width: calc(100% - 40px);
  white-space: nowrap;
  overflow: hidden;

  span {
    overflow: hidden;
    text-overflow: ellipsis;
  }

  span:first-child {
    flex-shrink: 0;
  }

  span:last-child {
    max-width: 150px;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;

export const QuickPrompts = styled.div`
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  padding: 8px 16px;
  border-bottom: 1px solid #eee;
  background: #f8f9fa;
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;

  @media (max-width: 768px) {
    padding: 8px;
    gap: 6px;
  }
`;

export const PromptButton = styled.button`
  background: #f0f7ff;
  border: 1px solid #cce5ff;
  border-radius: 16px;
  padding: 6px 12px;
  font-size: 11px;
  color: #0056b3;
  cursor: pointer;
  transition: all 0.2s;
  white-space: nowrap;
  flex-shrink: 0;

  &:hover {
    background: #cce5ff;
    transform: translateY(-1px);
  }

  @media (max-width: 768px) {
    padding: 4px 10px;
    font-size: 10px;
  }
`;

export const ChatBody = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const Message = styled.div<{ isUser: boolean }>`
  max-width: 90%;
  padding: 10px 14px;
  border-radius: 14px;
  white-space: pre-wrap;
  font-size: 13px;
  line-height: 1.4;
  
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

  @media (max-width: 768px) {
    max-width: 85%;
    padding: 8px 12px;
    font-size: 12px;
  }

  p {
    margin: 0;
    font-size: inherit;
  }

  ul, ol {
    margin: 0;
    padding-left: 20px;
  }

  li {
    margin: 2px 0;
    padding-left: 4px;
  }

  * {
    overflow-wrap: break-word;
    word-wrap: break-word;
    word-break: break-word;
  }
`;

export const ContextMessage = styled.div`
  padding: 8px 16px;
  background: #f8f9fa;
  border-top: 1px solid #eee;
  color: #666;
  font-size: 12px;
  display: flex;
  align-items: center;
  gap: 6px;
`;

export const InputContainer = styled.div`
  padding: 16px;
  display: flex;
  gap: 8px;

  @media (max-width: 768px) {
    padding: 12px;
    padding-bottom: env(safe-area-inset-bottom, 12px); // For iOS devices with home indicator
  }
`;

export const Input = styled.input`
  flex: 1;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 20px;
  outline: none;
  font-size: 13px;

  &:focus {
    border-color: #007bff;
  }

  @media (max-width: 768px) {
    font-size: 16px; // Better for mobile typing
  }
`;

export const SendButton = styled.button`
  background: #007bff;
  color: white;
  border: none;
  border-radius: 20px;
  padding: 0 16px;
  cursor: pointer;
  transition: background 0.2s;
  font-size: 13px;

  &:hover {
    background: #0056b3;
  }

  &:disabled {
    background: #ccc;
    cursor: not-allowed;
  }
`;

export const LoadingSpinner = styled.div`
  width: 12px;
  height: 12px;
  border: 2px solid #666;
  border-bottom-color: transparent;
  border-radius: 50%;
  display: inline-block;
  margin-right: 8px;
  animation: rotation 1s linear infinite;

  @keyframes rotation {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

export const TypingIndicator = styled.div`
  padding: 10px;
  color: #666;
  font-style: italic;
  font-size: 12px;
  display: flex;
  align-items: center;
`;

export const ResetButton = styled.button`
  background: none;
  border: none;
  color: white;
  font-size: 16px;
  cursor: pointer;
  padding: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  border-radius: 50%;
  transition: background-color 0.2s;
  flex-shrink: 0;
  margin-right: 8px;

  &:hover {
    background-color: rgba(255, 255, 255, 0.2);
  }
`;

export const SafeAreaSpacer = styled.div`
  height: env(safe-area-inset-top, 0px);
  background: #007bff;
  
  @media (max-width: 768px) {
    display: block;
  }
  
  display: none;
`;