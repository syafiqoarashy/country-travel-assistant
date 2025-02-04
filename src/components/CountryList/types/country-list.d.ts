import type { Country } from '../../types/country';

export interface CountryCardProps {
  country: Country;
  onClick: (code: string) => void;
}

export interface CountryListProps {
  onCountrySelect: (country: Country | undefined) => void;
}

export type SortField = 'name' | 'capital' | 'population' | 'continent';
export type SortOrder = 'asc' | 'desc';

export interface SortConfig {
  field: SortField;
  order: SortOrder;
}