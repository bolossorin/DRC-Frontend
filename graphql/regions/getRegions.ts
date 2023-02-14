import { gql } from "@apollo/client";

export const getRegions = gql`
  query {
    available_regions
  }
`;
