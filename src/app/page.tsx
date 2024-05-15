import Link from "next/link";
import { CodeMetricsData, OnchainMetrics } from "@/types";
import CodeMetrics from "@/components/CodeMetrics";
import NetworkList from "@/components/NetworkList";

interface Project {
  project_slug: string;
  project_name: string;
}

const collection = 'Gitcoin Grants (Allo)'

export default async function Home() {
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
          query ggetCollectionDetails($collectionName: String!) {
            projects_by_collection(where: {collection_name: {_eq: $collectionName}}) {
              project_name
              project_slug
            }
            code_metrics_by_collection(where: {collection_name: {_eq: $collectionName}}) {
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
              pull_requests_merged_6_months
              pull_requests_opened_6_months
              repositories
              source
              stars
            }
            onchain_metrics_by_collection(where: {collection_name: {_eq: $collectionName}}) {
              active_users
              collection_id
              collection_name
              first_txn_date
              high_frequency_users
              l2_gas_6_months
              less_active_users
              more_active_users
              multi_project_users
              network
              new_users
              num_contracts
              total_l2_gas
              total_projects
              total_txns
              total_users
              txns_6_months
              users_6_months
            }
          }
        `,
        variables: {
          collectionName: collection
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
    const projects = data.projects_by_collection
    const codeMetrics: CodeMetricsData = data.code_metrics_by_collection[0]
    const onchainMetrics: OnchainMetrics[] = data.onchain_metrics_by_collection

    return (
      <main className="p-16">
        <header className="flex flex-col gap-2 items-center">
          <h1 className="text-5xl font-semibold text-center">{collection}</h1>
          <p className="text-xl text-center">Ecosystem Insights from Open Source Observer</p>
        </header>
        <section className="flex gap-36 justify-center pt-16">
          <div className="">
            <h2 className="text-2xl underline pb-8">PROJECT DIRECTORY</h2>
            {projects.map((project: Project) => 
              <Link href={`/project/${project.project_slug}`} key={project.project_name}>
                <li className="max-w-72 truncate hover:underline">{project.project_name}</li>
              </Link>
            )}
          </div>
          <div>
            <h2 className="text-2xl underline pb-8">CODE METRICS</h2>
            <CodeMetrics {...codeMetrics} />
          </div>
          <div>
            <h2 className="text-2xl underline pb-8">ON-CHAIN METRICS</h2>
            <NetworkList onchainMetrics={onchainMetrics}/>
          </div>
        </section>
      </main>
    );
  } catch (error) {
    console.error('Fetch error:', error)
  }
}
