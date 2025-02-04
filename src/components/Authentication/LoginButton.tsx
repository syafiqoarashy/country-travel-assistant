import styled from 'styled-components';
import { useAuth } from '../../context/AuthContext';

const Button = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  background: #4285f4;
  color: white;
  font-size: 14px;
  cursor: pointer;
  transition: background 0.2s;

  &:hover {
    background: #3367d6;
  }

  &:disabled {
    background: #ccc;
    cursor: not-allowed;
  }
`;

export const LoginButton = () => {
  const { login, isLoading } = useAuth();

  return (
    <Button onClick={login} disabled={isLoading}>
      {isLoading ? 'Loading...' : 'Sign in with Google'}
    </Button>
  );
};