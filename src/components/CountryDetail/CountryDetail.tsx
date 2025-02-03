import { useQuery } from '@apollo/client';
import type { SingleCountryResponse } from '../../types/country';
import { GET_COUNTRY_DETAIL } from '../../graphql/queries';
import { Modal, DetailCard, CloseButton, Header, StyledFlag, Name, Section, SectionTitle, List, ListItem } from './styles';
import { CountryDetailProps } from './types/country-detail';
import { renderInfo } from './RenderInfo';

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