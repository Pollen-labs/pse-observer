import Link from "next/link";
import { ArrowLeft } from 'lucide-react';

interface ProjectDetailsProps {
  params: { slug: string };
}

interface CodeMetrics {
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

interface OnchainMetrics {
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

export default async function ProjectDetails({ params }: ProjectDetailsProps ) {
  const { slug } = params;
  try {
    const response = await fetch('https://opensource-observer.hasura.app/v1/graphql', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.OSO_API_KEY}`,
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        query: `
          query getProjectDetails($projectSlug: String!) {
            code_metrics_by_project(where: {project_slug: {_eq: $projectSlug}}) {
              avg_active_devs_6_months
              avg_fulltime_devs_6_months
              commits_6_months
              contributors
              contributors_6_months
              first_commit_date
              forks
              issues_closed_6_months
              issues_opened_6_months
              last_commit_date
              new_contributors_6_months
              project_id
              project_name
              project_slug
              pull_requests_merged_6_months
              pull_requests_opened_6_months
              repositories
              repository_source
              stars
            }
            onchain_metrics_by_project(where: {project_slug: {_eq: $projectSlug}}) {
              active_users
              first_txn_date
              high_frequency_users
              l2_gas_6_months
              less_active_users
              more_active_users
              multi_project_users
              network
              new_user_count
              num_contracts
              project_id
              project_name
              project_slug
              total_l2_gas
              total_txns
              total_users
              txns_6_months
              users_6_months
            }
          }
        `,
        variables: {
          projectSlug: slug
        }
      })
    });

    if (!response.ok) {
      console.error('HTTP error', response.status, await response.text());
      return;
    }

    const jsonResponse = await response.json();
    if (jsonResponse.errors) {
      console.error('GraphQL errors:', jsonResponse.errors);
      return;
    }

    const data = jsonResponse.data
    const {
      project_name,
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
    } = data.code_metrics_by_project[0];

    const {
      active_users,
      first_txn_date,
      high_frequency_users,
      l2_gas_6_months,
      less_active_users,
      more_active_users,
      multi_project_users,
      network,
      new_user_count,
      num_contracts,
      total_l2_gas,
      total_txns,
      total_users,
      txns_6_months,
      users_6_months,
    } = data.onchain_metrics_by_project[0]
    // const codeMetrics = data.code_metrics_by_project[0] as CodeMetrics
    // const onchainMetrics = data.onchain_metrics_by_project[0] as OnchainMetrics

    return (
      <main className="p-10">
        <header>
          <Link href='/' className="flex gap-2">
            <ArrowLeft />
            <p>back to directory</p>
          </Link>
          <h1 className="text-5xl text-center">{project_name}</h1>
        </header>
        <section className="flex justify-center gap-36 pt-16">
          <div className="flex-col items-center justify-center">
            <h2 className="text-2xl underline pb-8">CODE METRICS</h2>
            {/* {Object.entries(codeMetrics).map(([key, value]: [string, any]) => 
              <div key={key}>{`${key}: ${value}`}</div>
            )} */}
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
          </div>
          <div className="flex-col items-center">
            <h2 className="text-2xl underline pb-8">ON-CHAIN METRICS</h2>
            {/* {Object.entries(onchainMetrics).map(([key, value]: [string, any]) => 
              <div key={key}>{`${key}: ${value}`}</div>
            )} */}
            <li>Network:</li>
              <p className="pl-5">- name: {network}</p>
              <p className="pl-5">- number of contracts: {num_contracts}</p>
            <li>Users:</li>
              <p className="pl-5">- total: {total_users}</p>
              <p className="pl-5">- active: {active_users}</p>
              <p className="pl-5">- new: {new_user_count}</p>
              <p className="pl-5">- last 6 months: {users_6_months}</p>
              <p className="pl-5">- less active: {less_active_users}</p>
              <p className="pl-5">- more active: {more_active_users}</p>
              <p className="pl-5">- high frequency: {high_frequency_users}</p>
              <p className="pl-5">- multi-project: {multi_project_users}</p>
            <li>Transactions:</li>
              <p className="pl-5">- first txn date: {first_txn_date}</p>
              <p className="pl-5">- total txns: {total_txns}</p>
              <p className="pl-5">- txns in last 6 months: {txns_6_months}</p>
              <p className="pl-5">- total l2 gas: {total_l2_gas}</p>
              <p className="pl-5">- l2 gas in last 6 months: {l2_gas_6_months}</p>
          </div>
        </section>
      </main>
    )

  } catch (error) {
    console.error('Fetch error:', error)
  }
}