import { CodeMetricsData } from "@/types";

export const CodeMetrics: React.FC<CodeMetricsData> = ({
  closed_issue_count_6_months,
  commit_count_6_months,
  contributor_count,
  contributor_count_6_months,
  // display_name,
  event_source,
  first_commit_date,
  fork_count,
  fulltime_developer_average_6_months,
  last_commit_date,
  merged_pull_request_count_6_months,
  new_contributor_count_6_months,
  opened_issue_count_6_months,
  opened_pull_request_count_6_months,
  // project_id,
  // project_name,
  // project_namespace,
  // project_source,
  repository_count,
  star_count,
}) => {
  return (
    <section>
      <li>Repository:</li>
        <p className="pl-5">- source:  {event_source}</p>
        <p className="pl-5">- number of repos:  {repository_count}</p>
        <p className="pl-5">- forks:  {fork_count}</p>
        <p className="pl-5">- stars:  {star_count}</p>
      <li>Contributors:</li>
        <p className="pl-5">- total:  {contributor_count}</p>
        <p className="pl-5">- last 6 months:  {contributor_count_6_months}</p>
        <p className="pl-5">- new in last 6 months:  {new_contributor_count_6_months}</p>
        <p className="pl-5">- avg. full-time devs last 6 months:  {Math.floor(fulltime_developer_average_6_months)}</p>
      <li>Activiy:</li>
        <p className="pl-5">- first commit:  {new Date(first_commit_date).toISOString().split('T')[0]}</p>
        <p className="pl-5">- last commit:  {new Date(last_commit_date).toISOString().split('T')[0]}</p>
        <p className="pl-5">- commits in last 6 months:  {commit_count_6_months}</p>
        <p className="pl-5">- issues opened in last 6 months:  {opened_issue_count_6_months}</p>
        <p className="pl-5">- issues closed in last 6 months:  {closed_issue_count_6_months}</p>
        <p className="pl-5">- PRs opened in last 6 months:  {opened_pull_request_count_6_months}</p>
        <p className="pl-5">- PRs merged in last 6 months:  {merged_pull_request_count_6_months}</p>
    </section>
  )
}

export default CodeMetrics;