import { gql } from "@apollo/client";

export const onNotificationAdded = gql`
  subscription onNotificationAdded {
    notifications {
      id
      status
      user_id
      title
      description
      is_read
      session_id
    }
  }
`;
