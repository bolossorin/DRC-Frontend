import { gql } from "@apollo/client";

export const getSessionOverview = gql`
  query getSessionOverview($compute_type: ComputeTypeEnum!) {
    session_overview(compute_type: $compute_type) {
      user_id
      ipa_username
      profile_picture
      n_sessions
      slack_id
      queues {
        n_sessions
        queue
      }
    }
  }
`;
