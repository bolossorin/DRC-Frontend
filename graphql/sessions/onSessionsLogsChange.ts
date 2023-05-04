import { gql } from "@apollo/client";

export const onSessionsLogsChange = gql`
  subscription onSessionsLogsChange($region: String) {
    my_logs(region: $region) {
      session_id
      avg_util_percent
      avg_memory_util_percent
      timestamp
    }
  }
`;
