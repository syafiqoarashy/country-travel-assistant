import { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import CountryDetail from '../CountryDetail/CountryDetail';
import styled from 'styled-components';
import { GET_COUNTRIES } from '../../graphql/queries';
import type { Country, CountryQueryResponse } from '../../types/country';
import Flag from '../shared/Flag';

const Container = styled.div`
  padding: 20px;
  max-width: 1400px;
  margin: 0 auto;
`;

const SearchBar = styled.input`
  width: 100%;
  padding: 12px;
  margin-bottom: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 16px;
  transition: border-color 0.2s;

  &:focus {
    outline: none;
    border-color: #007bff;
    box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.25);
  }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
  padding: 20px 0;
`;

const Card = styled.div`
  background: white;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s, box-shadow 0.2s;
  cursor: pointer;
  border: 1px solid transparent;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
    border-color: #007bff;
  }
`;

const CountryHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 12px;
`;

const StyledFlag = styled(Flag)`
  flex-shrink: 0;
`;

const Name = styled.h2`
  font-size: 1.5rem;
  margin: 0;
  color: #333;
`;

const Detail = styled.p`
  margin: 8px 0;
  color: #666;
  display: flex;
  justify-content: space-between;
  
  &:not(:last-child) {
    border-bottom: 1px solid #eee;
    padding-bottom: 8px;
  }
`;

const Label = styled.span`
  color: #888;
  font-weight: 500;
`;

const Value = styled.span`
  color: #333;
  text-align: right;
`;

interface CountryCardProps {
  country: Country;
  onClick: (code: string) => void;
}

interface CountryListProps {
  onCountrySelect: (country: Country | undefined) => void;
}

const CountryCard = ({ country, onClick }: CountryCardProps) => (
  <Card onClick={() => onClick(country.code)}>
    <CountryHeader>
      <StyledFlag emoji={country.emoji} code={country.code} size="medium" />
      <Name>{country.name}</Name>
    </CountryHeader>
    {country.capital && (
      <Detail>
        <Label>Capital:</Label>
        <Value>{country.capital}</Value>
      </Detail>
    )}
    {country.currency && (
      <Detail>
        <Label>Currency:</Label>
        <Value>{country.currency}</Value>
      </Detail>
    )}
    <Detail>
      <Label>Continent:</Label>
      <Value>{country.continent.name}</Value>
    </Detail>
    <Detail>
      <Label>Languages:</Label>
      <Value>{country.languages.map(lang => lang.name).join(', ')}</Value>
    </Detail>
  </Card>
);

const CountryList = ({ onCountrySelect }: CountryListProps) => {
  const [search, setSearch] = useState('');
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);
  const { loading, error, data } = useQuery<CountryQueryResponse>(GET_COUNTRIES);

  useEffect(() => {
    if (data?.countries && selectedCountry) {
      const country = data.countries.find(c => c.code === selectedCountry);
      onCountrySelect(country);
    }
  }, [selectedCountry, data?.countries, onCountrySelect]);

  const filteredCountries = data?.countries.filter(country =>
    country.name.toLowerCase().includes(search.toLowerCase()) ||
    country.continent.name.toLowerCase().includes(search.toLowerCase()) ||
    (country.capital?.toLowerCase().includes(search.toLowerCase())) ||
    (country.currency?.toLowerCase().includes(search.toLowerCase())) ||
    country.languages.some(lang => 
      lang.name.toLowerCase().includes(search.toLowerCase())
    )
  );

  const handleCountryClick = (code: string) => {
    setSelectedCountry(code);
  };

  const handleCloseDetail = () => {
    setSelectedCountry(null);
    onCountrySelect(undefined);
  };

  if (loading) return (
    <Container>
      <div style={{ textAlign: 'center', padding: '2rem', color: '#666' }}>
        Loading countries...
      </div>
    </Container>
  );
  
  if (error) return (
    <Container>
      <div style={{ textAlign: 'center', padding: '2rem', color: '#dc3545' }}>
        Error loading countries: {error.message}
      </div>
    </Container>
  );

  return (
    <Container>
      <SearchBar
        type="text"
        placeholder="Search countries by name, capital, continent, currency, or language..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <Grid>
        {filteredCountries?.map((country) => (
          <CountryCard
            key={country.code}
            country={country}
            onClick={handleCountryClick}
          />
        ))}
      </Grid>
      {selectedCountry && (
        <CountryDetail
          countryCode={selectedCountry}
          onClose={handleCloseDetail}
        />
      )}
    </Container>
  );
};

export default CountryList;