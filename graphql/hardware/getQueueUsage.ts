import { gql } from "@apollo/client";

export const getQueueUsage = gql`
  query getQueueUsage($compute_type: ComputeTypeEnum!) {
    queue_usage(compute_type: $compute_type) {
      compute_type
      queue
      free
      used
      total
      users {
        ipa_username
        n_sessions
        slack_id
        profile_picture
      }
    }
  }
`;
