import { gql } from '@apollo/client';

export const dismissNotifications = gql`
  mutation dismiss_all_my_notifications($status: NotificationDismissEnum) {
    dismiss_all_my_notifications(status: $status) {
      id
    }
  }
`;
