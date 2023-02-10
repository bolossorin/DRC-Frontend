import { gql } from '@apollo/client';

export const dismissNotificationById = gql`
  mutation dismiss_notification($id: UUID!) {
    dismiss_notification(id: $id) {
      id
    }
  }
`;
