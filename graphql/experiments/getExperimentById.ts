import { gql } from "@apollo/client";

export const getExperimentById = gql`
  query getExperimentById($session_id: String) {
    my_experiments(session_id: $session_id) {
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
