export interface CodeMetricsData {
  closed_issue_count_6_months: number;
  commit_count_6_months: number;
  contributor_count: number;
  contributor_count_6_months: number;
  display_name: string;
  event_source: string;
  first_commit_date: Date;
  fork_count: number;
  fulltime_developer_average_6_months: number;
  last_commit_date: Date;
  merged_pull_request_count_6_months: number;
  new_contributor_count_6_months: number;
  opened_issue_count_6_months: number;
  opened_pull_request_count_6_months: number;
  project_id: string;
  project_name: string;
  project_namespace: string;
  project_source: string;
  repository_count: number;
  star_count: number;
}
  
export interface OnchainMetricsData {
  active_contract_count_90_days: number;
  address_count: number;
  address_count_90_days: number;
  days_since_first_transaction: number;
  display_name: string;
  event_source: string;
  gas_fees_sum: number;
  gas_fees_sum_6_months: number;
  high_activity_address_count_90_days: number;
  low_activity_address_count_90_days: number;
  medium_activity_address_count_90_days: number;
  multi_project_address_count_90_days: number;
  new_address_count_90_days: number;
  project_id: string;
  project_name: string;
  project_namespace: string;
  project_source: string;
  returning_address_count_90_days: number;
  transaction_count: number;
  transaction_count_6_months: number;
}