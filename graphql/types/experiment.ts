export interface IExperiment {
  id: string;
  session_id: string;
  project_name: string;
  experiment_name: string;
  vessel_label: string;
  state: string;
  iter_current: number;
  iter_end: number;
  error_message: string;
  repo_branch: string;
  repo_commit: string;
  repo_url: string;
  run_command: string;
  user_id: string;
  wandb_id: string;
  created_at: string;
  modified_at: string;
}
