export interface IOverallUsage {
  compute_type: string;
  total: number;
  free: number;
  used: number;
  live: number;
  dead: number;
}

export interface IOverallUsageResponse {
  overall_usage: IOverallUsage;
}

export interface IQueueUsage extends Omit<IOverallUsage, "dead" | "live"> {
  queue: string;
  users: {
    ipa_username: string;
    n_sessions: number;
    profile_picture: string;
    slack_id: string;
  }[];
}

export interface IQueueUsageResponse {
  queue_usage: IQueueUsage[];
}

export interface ISessionOverview {
  user_id: string;
  ipa_username: string;
  profile_picture: string;
  n_sessions: string;
  slack_id: string;
  queues: {
    n_sessions: number;
    queue: string;
  }[];
}

export interface ISessionOverviewResponse {
  session_overview: ISessionOverview[];
}
