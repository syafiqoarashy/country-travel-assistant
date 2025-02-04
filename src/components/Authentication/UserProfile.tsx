import { useAuth } from '../../context/AuthContext';
import { useState } from 'react';
import { ProfileContainer, UserInfo, Name, Email, LogoutButton, MobileMenuButton, MobileMenu, MobileUserInfo } from './styles';

export const UserProfile = () => {
  const { user, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  if (!user) return null;

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <ProfileContainer>
      <UserInfo>
        <Name>{user.name}</Name>
        <Email>{user.email}</Email>
      </UserInfo>
      
      <LogoutButton onClick={logout} className="desktop-only">
        Sign Out
      </LogoutButton>

      <MobileMenuButton onClick={toggleMenu} className="mobile-only">
        ⋮
      </MobileMenuButton>

      <MobileMenu isOpen={isMenuOpen}>
        <MobileUserInfo>
          <Name>{user.name}</Name>
          <Email>{user.email}</Email>
        </MobileUserInfo>
        <LogoutButton onClick={logout}>
          Sign Out
        </LogoutButton>
      </MobileMenu>
    </ProfileContainer>
  );
};