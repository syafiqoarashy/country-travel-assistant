import styled from 'styled-components';
import { Outlet } from 'react-router-dom';

const Container = styled.div`
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f5f5f5;
  padding: 1rem;
  
  @media (max-width: 768px) {
    padding: 0.75rem;
  }
`;

const AuthCard = styled.div`
  background: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
  text-align: center;

  @media (max-width: 768px) {
    padding: 1.5rem;
    border-radius: 12px;
    margin: 0.5rem;
  }

  @media (max-width: 480px) {
    padding: 1.25rem;
    border-radius: 8px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
    margin: 0;
  }
`;

export const AuthLayout = () => {
  return (
    <Container>
      <AuthCard>
        <Outlet />
      </AuthCard>
    </Container>
  );
};