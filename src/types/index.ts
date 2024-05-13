export interface CodeMetricsData {
  avg_active_devs_6_months: number;
  avg_fulltime_devs_6_months: number;
  commits_6_months: number;
  contributors: number;
  contributors_6_months: number;
  first_commit_date: Date;
  forks: number;
  issues_closed_6_months: number;
  issues_opened_6_months: number;
  last_commit_date: Date;
  new_contributors_6_months: number;
  project_id: string;
  project_name: string;
  project_slug: string;
  pull_requests_merged_6_months: number;
  pull_requests_opened_6_months: number;
  repositories: number;
  repository_source: string;
  stars: number;
  }
  
  export interface OnchainMetrics {
  active_users: number;
  first_txn_date: Date;
  high_frequency_users: number;
  l2_gas_6_months: number;
  less_active_users: number;
  more_active_users: number;
  multi_project_users: number;
  network: string;
  new_user_count: number;
  num_contracts: number;
  project_id: string;
  project_name: string;
  project_slug: string;
  total_l2_gas: number;
  total_txns: number;
  total_users: number;
  txns_6_months: number;
  users_6_months: number;
  }