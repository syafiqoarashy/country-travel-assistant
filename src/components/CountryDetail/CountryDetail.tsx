import { useQuery } from '@apollo/client';
import styled from 'styled-components';
import type { SingleCountryResponse } from '../../types/country';
import { GET_COUNTRY_DETAIL } from '../../graphql/queries';
import Flag from '../shared/Flag';

const Modal = styled.div`
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

const DetailCard = styled.div`
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

const CloseButton = styled.button`
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

const Header = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 24px;
  gap: 16px;
`;

const StyledFlag = styled(Flag)`
  width: 64px;
  height: 64px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Name = styled.h1`
  margin: 0;
  color: #333;
  font-size: 2rem;
  font-weight: 600;
`;

const Section = styled.div`
  margin: 24px 0;
  padding: 16px;
  background: #f8f9fa;
  border-radius: 8px;
  transition: all 0.2s;

  &:hover {
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  }
`;

const SectionTitle = styled.h2`
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

const Info = styled.p`
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

const InfoLabel = styled.span`
  color: #666;
  font-weight: 500;
`;

const InfoValue = styled.span`
  color: #333;
`;

const List = styled.ul`
  list-style: none;
  padding: 0;
  margin: 8px 0;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 8px;
`;

const ListItem = styled.li`
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

interface CountryDetailProps {
  countryCode: string;
  onClose: () => void;
}

const renderInfo = (label: string, value: string | undefined) => {
  if (!value) return null;
  return (
    <Info>
      <InfoLabel>{label}:</InfoLabel>
      <InfoValue>{value}</InfoValue>
    </Info>
  );
};

const CountryDetail = ({ countryCode, onClose }: CountryDetailProps) => {
  const { loading, error, data } = useQuery<SingleCountryResponse>(
    GET_COUNTRY_DETAIL,
    {
      variables: { code: countryCode },
    }
  );

  if (loading) return (
    <Modal>
      <DetailCard>
        <div style={{ textAlign: 'center', padding: '2rem' }}>
          Loading country details...
        </div>
      </DetailCard>
    </Modal>
  );
  
  if (error) return (
    <Modal>
      <DetailCard>
        <div style={{ textAlign: 'center', padding: '2rem', color: '#dc3545' }}>
          Error: {error.message}
        </div>
      </DetailCard>
    </Modal>
  );

  if (!data?.country) return null;

  const { country } = data;

  return (
    <Modal onClick={() => onClose()}>
      <DetailCard onClick={(e) => e.stopPropagation()}>
        <CloseButton onClick={onClose}>&times;</CloseButton>
        
        <Header>
          <StyledFlag emoji={country.emoji} code={country.code} size="large" />
          <Name>{country.name}</Name>
        </Header>

        <Section>
          <SectionTitle>General Information</SectionTitle>
          {renderInfo('Capital', country.capital)}
          {renderInfo('Currency', country.currency)}
          {renderInfo('Continent', country.continent.name)}
          {renderInfo('Phone Code', country.phone ? `+${country.phone}` : undefined)}
          {renderInfo('Native Name', country.native)}
        </Section>

        <Section>
          <SectionTitle>Languages</SectionTitle>
          <List>
            {country.languages.map((lang) => (
              <ListItem key={lang.code}>
                {lang.name}
                {lang.native && <div style={{ fontSize: '0.9em', color: '#666' }}>{lang.native}</div>}
              </ListItem>
            ))}
          </List>
        </Section>

        {country.states && country.states.length > 0 && (
          <Section>
            <SectionTitle>States/Regions</SectionTitle>
            <List>
              {country.states.map((state) => (
                <ListItem key={state.code}>
                  {state.name}
                </ListItem>
              ))}
            </List>
          </Section>
        )}
      </DetailCard>
    </Modal>
  );
};

export default CountryDetail;