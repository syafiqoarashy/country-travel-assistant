import { useState, useMemo } from 'react';
import { useQuery } from '@apollo/client';
import CountryDetail from '../CountryDetail/CountryDetail';
import { GET_COUNTRIES } from '../../graphql/queries';
import type { CountryQueryResponse } from '../../types/country';
import { Container, SearchBar, Controls, FilterContainer, Select, Grid } from './styles';
import { CountryListProps, SortConfig, SortField, SortOrder } from './types/country-list';
import { CountryCard } from './CountryCard';

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