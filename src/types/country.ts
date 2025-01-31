export interface Language {
    code: string;
    name: string;
    native: string;
    rtl?: boolean;
  }
  
  export interface Continent {
    code: string;
    name: string;
  }
  
  export interface State {
    code: string;
    name: string;
  }
  
  export interface Country {
    code: string;
    name: string;
    native?: string;
    phone?: string;
    continent: Continent;
    capital?: string;
    currency?: string;
    languages: Language[];
    emoji: string;
    emojiU?: string;
    states: State[];
  }
  
  export interface CountryFilterInput {
    code?: string;
    continent?: string;
    currency?: string;
    name?: string;
  }
  
  export interface CountryQueryResponse {
    countries: Country[];
  }
  
  export interface SingleCountryResponse {
    country: Country;
  }