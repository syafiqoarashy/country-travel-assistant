import { gql } from '@apollo/client';

export const GET_COUNTRIES = gql`
  query GetCountries {
    countries {
      code
      name
      emoji
      capital
      currency
      languages {
        code
        name
        native
      }
      continent {
        code
        name
      }
    }
  }
`;

export const GET_COUNTRY_DETAIL = gql`
  query GetCountry($code: ID!) {
    country(code: $code) {
      code
      name
      native
      phone
      capital
      currency
      emoji
      continent {
        name
        code
      }
      languages {
        code
        name
        native
      }
      states {
        code
        name
      }
    }
  }
`;