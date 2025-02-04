import styled from 'styled-components';

export const ProfileContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  
  @media (max-width: 768px) {
    gap: 8px;
  }
  
  @media (max-width: 480px) {
    position: relative;
  }
`;

export const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;

  @media (max-width: 768px) {
    display: none;
  }
`;

export const Name = styled.span`
  font-weight: 500;
  color: white;
  font-size: 14px;
`;

export const Email = styled.span`
  font-size: 12px;
  color: rgba(255, 255, 255, 0.7);
`;

export const LogoutButton = styled.button`
  padding: 4px 8px;
  border: 1px solid rgba(255, 255, 255, 0.6);
  border-radius: 4px;
  background: none;
  color: white;
  font-size: 12px;
  cursor: pointer;
  transition: all 0.2s;
  white-space: nowrap;

  &:hover {
    background: rgba(255, 255, 255, 0.1);
    border-color: white;
  }

  @media (max-width: 480px) {
    padding: 4px 6px;
    font-size: 11px;
  }
`;

export const MobileMenuButton = styled.button`
  display: none;
  background: none;
  border: none;
  color: white;
  padding: 4px;
  cursor: pointer;

  @media (max-width: 768px) {
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

export const MobileMenu = styled.div<{ isOpen: boolean }>`
  display: none;
  position: absolute;
  top: 100%;
  right: 0;
  background: #1a1a1a;
  border-radius: 4px;
  padding: 8px;
  margin-top: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
  z-index: 1000;

  @media (max-width: 768px) {
    display: ${props => props.isOpen ? 'block' : 'none'};
  }
`;

export const MobileUserInfo = styled.div`
  padding: 8px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  margin-bottom: 8px;
  
  ${Name}, ${Email} {
    display: block;
    margin-bottom: 4px;
  }
`;