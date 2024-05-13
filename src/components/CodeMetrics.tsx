import { CodeMetricsData } from "@/types";

export const CodeMetrics: React.FC<CodeMetricsData> = ({
  repository_source,
  repositories,
  forks,
  stars,
  contributors,
  contributors_6_months,
  new_contributors_6_months,
  avg_active_devs_6_months,
  avg_fulltime_devs_6_months,
  first_commit_date,
  last_commit_date,
  commits_6_months,
  issues_opened_6_months,
  issues_closed_6_months,
  pull_requests_opened_6_months,
  pull_requests_merged_6_months,
}) => {
  return (
    <section>
      <li>Repository:</li>
        <p className="pl-5">- source:  {repository_source}</p>
        <p className="pl-5">- number of repos:  {repositories}</p>
        <p className="pl-5">- forks:  {forks}</p>
        <p className="pl-5">- stars:  {stars}</p>
      <li>Contributors:</li>
        <p className="pl-5">- total:  {contributors}</p>
        <p className="pl-5">- last 6 months:  {contributors_6_months}</p>
        <p className="pl-5">- new in last 6 months:  {new_contributors_6_months}</p>
        <p className="pl-5">- avg. active devs last 6 months:  {Math.floor(avg_active_devs_6_months)}</p>
        <p className="pl-5">- avg. full-time devs last 6 months:  {Math.floor(avg_fulltime_devs_6_months)}</p>
      <li>Activiy:</li>
        <p className="pl-5">- first commit:  {new Date(first_commit_date).toISOString().split('T')[0]}</p>
        <p className="pl-5">- last commit:  {new Date(last_commit_date).toISOString().split('T')[0]}</p>
        <p className="pl-5">- commits in last 6 months:  {commits_6_months}</p>
        <p className="pl-5">- issues opened in last 6 months:  {issues_opened_6_months}</p>
        <p className="pl-5">- issues closed in last 6 months:  {issues_closed_6_months}</p>
        <p className="pl-5">- PRs opened in last 6 months:  {pull_requests_opened_6_months}</p>
        <p className="pl-5">- PRs merged in last 6 months:  {pull_requests_merged_6_months}</p>
    </section>
  )
}

export default CodeMetrics;