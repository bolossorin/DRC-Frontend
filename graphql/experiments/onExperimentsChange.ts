import { gql } from "@apollo/client";

export const onExperimentsChange = gql`
  subscription onExperimentsChange($region: String!) {
    my_experiments(region: $region) {
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
