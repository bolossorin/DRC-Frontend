import { gql } from '@apollo/client';

export const getUser = gql`
  query {
    my_user {
      job_title
    }
  }
`;
