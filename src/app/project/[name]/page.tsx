import Link from "next/link";
import { ArrowLeft } from 'lucide-react';
import { CodeMetricsData, OnchainMetricsData } from "@/types";
import CodeMetrics from "@/components/CodeMetrics";
import NetworkList from "@/components/NetworkList";

interface ProjectDetailsProps {
  params: { name: string };
}

export default async function ProjectDetails({ params }: ProjectDetailsProps ) {
  const { name } = params;
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
          query getProjectDetails($projectName: String!) {
            code_metrics_by_project_v1(where: {project_name: {_eq: $projectName}}) { 
              closed_issue_count_6_months
              commit_count_6_months
              contributor_count
              contributor_count_6_months
              display_name
              event_source
              first_commit_date
              fork_count
              fulltime_developer_average_6_months
              last_commit_date
              merged_pull_request_count_6_months
              new_contributor_count_6_months
              opened_issue_count_6_months
              opened_pull_request_count_6_months
              project_id
              project_name
              project_namespace
              project_source
              repository_count
              star_count
            }
            onchain_metrics_by_project_v1(where: {project_name: {_eq: $projectName}}) {
              active_contract_count_90_days
              address_count
              address_count_90_days
              days_since_first_transaction
              display_name
              event_source
              gas_fees_sum
              gas_fees_sum_6_months
              high_activity_address_count_90_days
              low_activity_address_count_90_days
              medium_activity_address_count_90_days
              multi_project_address_count_90_days
              new_address_count_90_days
              project_id
              project_name
              project_namespace
              project_source
              returning_address_count_90_days
              transaction_count
              transaction_count_6_months
            }
          }
        `,
        variables: {
          projectName: name
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
    const codeMetrics: CodeMetricsData = data.code_metrics_by_project_v1[0]
    const onchainMetrics: OnchainMetricsData[] = data.onchain_metrics_by_project_v1

    return (
      <main className="p-10">
        <header>
          <Link href='/' className="flex gap-2">
            <ArrowLeft />
            <p>back to directory</p>
          </Link>
          <h1 className="text-5xl text-center">{codeMetrics.display_name || codeMetrics.project_name}</h1>
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