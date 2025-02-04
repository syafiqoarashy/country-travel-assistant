import { Language } from "../../types/country";
import { Card, CountryHeader, StyledFlag, Name, Detail, Label, Value } from "./styles";
import { CountryCardProps } from "./types/country-list";

export const CountryCard = ({ country, onClick }: CountryCardProps) => (
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
      <Value>{country.languages.map((language: Language) => language.name).join(', ')}</Value>
    </Detail>
  </Card>
);