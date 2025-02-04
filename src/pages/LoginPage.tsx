import styled from 'styled-components';
import { Navigate } from 'react-router-dom';
import { LoginButton } from '../components/Authentication/LoginButton';
import { useAuth } from '../context/AuthContext';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
`;

const Title = styled.h1`
  color: #333;
  font-size: 1.8rem;
  margin: 0;
`;

const Description = styled.p`
  color: #666;
  margin: 0;
`;

export const LoginPage = () => {
  const { isAuthenticated } = useAuth();

  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return (
    <Container>
      <Title>Welcome to Kuasar Country Explorer</Title>
      <Description>
        Please sign in to explore countries and use our AI-powered travel assistant
      </Description>
      <LoginButton />
    </Container>
  );
};