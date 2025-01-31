import { ApolloProvider } from '@apollo/client';
import { client } from './services/apollo/client';
import CountryList from './components/CountryList/CountryList';
import ChatInterface from './components/ChatInterface/ChatInterface';
import styled from 'styled-components';
import { useState } from 'react';
import type { Country } from './types/country';

const AppContainer = styled.div`
  min-height: 100vh;
  background-color: #f5f5f5;
`;

const Header = styled.header`
  background-color: #1a1a1a;
  color: white;
  padding: 1rem 2rem;
  text-align: center;
`;

const Title = styled.h1`
  margin: 0;
  font-size: 2rem;
`;

function App() {
  const [selectedCountry, setSelectedCountry] = useState<Country | undefined>();

  return (
    <ApolloProvider client={client}>
      <AppContainer>
        <Header>
          <Title>Kuasar Country Explorer</Title>
        </Header>
        <CountryList onCountrySelect={setSelectedCountry} />
        <ChatInterface selectedCountry={selectedCountry} />
      </AppContainer>
    </ApolloProvider>
  );
}

export default App;