import { gql } from "@apollo/client";

export const getExperiments = gql`
  query getExperiments($state: [VesselStateEnum], $limit: Int, $offset: Int, $region: String, $text: String) {
    my_experiments(limit: $limit, state: $state, offset: $offset, text: $text, region: $region) {
      id
      project_name
      experiment_name
      vessel_label
      session_id
      state
      iter_current
      iter_end
      error_message
      repo_branch
      repo_commit
      repo_url
      run_command
      user_id
      wandb_id
      wandb_url
      created_at
      modified_at
    }
  }
`;
