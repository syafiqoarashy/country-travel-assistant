import { useState, useMemo } from 'react';
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
  padding: 4px 0;
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

const Controls = styled.div`
  display: flex;
  gap: 1rem;
  margin: 1.5rem 0;
  flex-wrap: wrap;
  background: white;
  padding: 1rem;
  border-radius: 12px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);

  @media (max-width: 768px) {
    gap: 0.5rem;
  }
`;

const Select = styled.select`
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 14px;
  color: #333;
  background: white;
  cursor: pointer;
  min-width: 150px;

  &:focus {
    outline: none;
    border-color: #007bff;
    box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.25);
  }

  @media (max-width: 768px) {
    flex: 1;
    min-width: 0;
  }
`;

const FilterContainer = styled.div`
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  flex: 1;

  @media (max-width: 768px) {
    flex-direction: column;
    width: 100%;
  }
`;

interface CountryCardProps {
  country: Country;
  onClick: (code: string) => void;
}

interface CountryListProps {
  onCountrySelect: (country: Country | undefined) => void;
}

type SortField = 'name' | 'capital' | 'population' | 'continent';
type SortOrder = 'asc' | 'desc';

interface SortConfig {
  field: SortField;
  order: SortOrder;
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
  const [selectedContinent, setSelectedContinent] = useState<string>('');
  const [sort, setSort] = useState<SortConfig>({ field: 'name', order: 'asc' });
  const { loading, error, data } = useQuery<CountryQueryResponse>(GET_COUNTRIES);

  const continents = useMemo(() => {
    if (!data?.countries) return [];
    return Array.from(new Set(data.countries.map(country => country.continent.name))).sort();
  }, [data?.countries]);

  const filteredAndSortedCountries = useMemo(() => {
    if (!data?.countries) return [];

    const filtered = data.countries.filter(country => {
      const matchesSearch = 
        country.name.toLowerCase().includes(search.toLowerCase()) ||
        country.continent.name.toLowerCase().includes(search.toLowerCase()) ||
        (country.capital?.toLowerCase().includes(search.toLowerCase())) ||
        (country.currency?.toLowerCase().includes(search.toLowerCase())) ||
        country.languages.some(lang => 
          lang.name.toLowerCase().includes(search.toLowerCase())
        );

      const matchesContinent = selectedContinent ? 
        country.continent.name === selectedContinent : true;

      return matchesSearch && matchesContinent;
    });

    return filtered.sort((a, b) => {
      let comparison = 0;
      switch (sort.field) {
        case 'name':
          comparison = a.name.localeCompare(b.name);
          break;
        case 'capital':
          comparison = (a.capital || '').localeCompare(b.capital || '');
          break;
        case 'continent':
          comparison = a.continent.name.localeCompare(b.continent.name);
          break;
      }
      return sort.order === 'asc' ? comparison : -comparison;
    });
  }, [data?.countries, search, selectedContinent, sort]);

  const handleCountryClick = (code: string) => {
    const country = data?.countries.find(c => c.code === code);
    setSelectedCountry(code);
    onCountrySelect(country);
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
      <Controls>
        <FilterContainer>
          <Select
            value={selectedContinent}
            onChange={(e) => setSelectedContinent(e.target.value)}
          >
            <option value="">All Continents</option>
            {continents.map(continent => (
              <option key={continent} value={continent}>
                {continent}
              </option>
            ))}
          </Select>
          <Select
            value={`${sort.field}-${sort.order}`}
            onChange={(e) => {
              const [field, order] = e.target.value.split('-') as [SortField, SortOrder];
              setSort({ field, order });
            }}
          >
            <option value="name-asc">Name (A-Z)</option>
            <option value="name-desc">Name (Z-A)</option>
            <option value="capital-asc">Capital (A-Z)</option>
            <option value="capital-desc">Capital (Z-A)</option>
            <option value="continent-asc">Continent (A-Z)</option>
            <option value="continent-desc">Continent (Z-A)</option>
          </Select>
        </FilterContainer>
      </Controls>
      <Grid>
        {filteredAndSortedCountries.map((country) => (
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