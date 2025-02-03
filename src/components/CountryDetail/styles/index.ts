import { styled } from "styled-components";
import Flag from '../../shared/Flag';

export const Modal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

export const DetailCard = styled.div`
  background: white;
  border-radius: 12px;
  padding: 32px;
  width: 90%;
  max-width: 600px;
  max-height: 90vh;
  overflow-y: auto;
  position: relative;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  animation: slideIn 0.3s ease-out;

  @keyframes slideIn {
    from {
      transform: translateY(20px);
      opacity: 0;
    }
    to {
      transform: translateY(0);
      opacity: 1;
    }
  }
`;

export const CloseButton = styled.button`
  position: absolute;
  top: 16px;
  right: 16px;
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  color: #666;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  transition: all 0.2s;

  &:hover {
    color: #333;
    background-color: #f0f0f0;
  }
`;

export const Header = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 24px;
  gap: 16px;
`;

export const StyledFlag = styled(Flag)`
  width: 64px;
  height: 64px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Name = styled.h1`
  margin: 0;
  color: #333;
  font-size: 2rem;
  font-weight: 600;
`;

export const Section = styled.div`
  margin: 24px 0;
  padding: 16px;
  background: #f8f9fa;
  border-radius: 8px;
  transition: all 0.2s;

  &:hover {
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  }
`;

export const SectionTitle = styled.h2`
  color: #444;
  font-size: 1.2rem;
  margin-bottom: 12px;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 8px;

  &::before {
    content: '';
    display: inline-block;
    width: 4px;
    height: 16px;
    background: #007bff;
    border-radius: 2px;
  }
`;

export const Info = styled.p`
  margin: 12px 0;
  color: #333;
  line-height: 1.6;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 0;
  border-bottom: 1px solid #eee;

  &:last-child {
    border-bottom: none;
  }
`;

export const InfoLabel = styled.span`
  color: #666;
  font-weight: 500;
`;

export const InfoValue = styled.span`
  color: #333;
`;

export const List = styled.ul`
  list-style: none;
  padding: 0;
  margin: 8px 0;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 8px;
`;

export const ListItem = styled.li`
  margin: 4px 0;
  padding: 8px 12px;
  background: white;
  border-radius: 6px;
  border: 1px solid #eee;
  transition: all 0.2s ease;

  &:hover {
    border-color: #007bff;
    transform: translateX(4px);
  }
`;