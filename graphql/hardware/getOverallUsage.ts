import { gql } from "@apollo/client";

export const getOverallUsage = gql`
  query getOverallUsage($compute_type: ComputeTypeEnum!) {
    overall_usage(compute_type: $compute_type) {
      compute_type
      dead
      used
      free
      total
      live
      total
    }
  }
`;
