import styled from 'styled-components';
import { Outlet } from 'react-router-dom';
import { UserProfile } from '../../components/Authentication/UserProfile';

const Header = styled.header`
  background-color: #1a1a1a;
  color: white;
  padding: 1rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

const Title = styled.h1`
  margin: 0;
  font-size: 1.5rem;
  
  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

const MainContent = styled.main`
  min-height: calc(100vh - 80px);
  background-color: #f5f5f5;
`;

export const MainLayout = () => {
  return (
    <>
      <Header>
        <Title>Kuasar Country Explorer</Title>
        <UserProfile />
      </Header>
      <MainContent>
        <Outlet />
      </MainContent>
    </>
  );
};
