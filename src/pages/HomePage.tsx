import { useState } from 'react';
import type { Country } from '../types/country';
import ChatInterface from '../components/ChatInterface/ChatInterface';
import CountryList from '../components/CountryList/CountryList';

export const HomePage = () => {
  const [selectedCountry, setSelectedCountry] = useState<Country | undefined>();

  const handleCountrySelect = (country: Country | undefined) => {
    setSelectedCountry(country);
  };

  return (
    <>
      <CountryList onCountrySelect={handleCountrySelect} />
      <ChatInterface selectedCountry={selectedCountry} />
    </>
  );
};