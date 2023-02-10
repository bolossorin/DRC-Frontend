import { gql } from '@apollo/client';

export const stopSession = gql`
  mutation stop_session($id: String!) {
    stop_session(id: $id) {
      id
    }
  }
`;
