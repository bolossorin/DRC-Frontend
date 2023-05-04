import { gql } from "@apollo/client";

export const onSessionLogsChange = gql`
  subscription onSessionLogsChange($session_id: String) {
    log(session_id: $session_id) {
      session_id
      avg_util_percent
      avg_memory_util_percent
      timestamp
    }
  }
`;
