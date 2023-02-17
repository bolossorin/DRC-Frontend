import { gql } from '@apollo/client';

export const getNotifications = gql`
  query my_notifications($status: [NotificationStatusEnum], $unread_only: Boolean) {
    my_notifications(status: $status, unread_only: $unread_only) {
      id
      is_read
      title
      description
      status
      user_id
      session_id
    }
  }
`;
