import { gql } from "@apollo/client";

export const onExperimentsChange = gql`
  subscription onExperimentsChange {
    my_experiments {
      id
      session_id
      wandb_id
      wandb_url
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
      vessel_label
    }
  }
`;
