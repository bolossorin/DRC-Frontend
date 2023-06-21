import { gql } from "@apollo/client";

export const onExperimentChange = gql`
  subscription onExperimentChange($session_id: String!) {
    my_session_experiments(session_id: $session_id) {
      id
      session_id
      wandb_id
      pid
      state
      iter_current
      iter_end
      repo_url
      repo_branch
      repo_commit
      run_command
      error_message
      experiment_name
      project_name
      user_id
      created_at
      modified_at
    }
  }
`;
