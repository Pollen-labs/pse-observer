import Link from "next/link";
import { ArrowLeft } from 'lucide-react';
import CodeMetrics from "@/components/CodeMetrics";
import NetworkList from "@/components/NetworkList";

interface ProjectDetailsProps {
  params: { slug: string };
}

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
    const codeMetrics: CodeMetricsData = data.code_metrics_by_project[0]
    const onchainMetrics: OnchainMetrics[] = data.onchain_metrics_by_project

    return (
      <main className="p-10">
        <header>
          <Link href='/' className="flex gap-2">
            <ArrowLeft />
            <p>back to directory</p>
          </Link>
          <h1 className="text-5xl text-center">{codeMetrics.project_name}</h1>
        </header>
        <section className="flex justify-center gap-36 pt-16">
          <div className="flex-col items-center justify-center">
            <h2 className="text-2xl underline pb-8">CODE METRICS</h2>
            <CodeMetrics {...codeMetrics} />
          </div>
          <div className="flex-col items-center justify-center">
            <h2 className="text-2xl underline pb-8">ON-CHAIN METRICS</h2>
            <NetworkList onchainMetrics={onchainMetrics}/>
          </div>
        </section>
      </main>
    )

  } catch (error) {
    console.error('Fetch error:', error)
  }
}