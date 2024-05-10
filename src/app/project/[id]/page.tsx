import Link from "next/link";

interface ProjectDetailsProps {
  params: { id: string };
}

export default async function ProjectDetails({ params }: ProjectDetailsProps ) {
  const { id } = params;
  try {
    const response = await fetch('https://opensource-observer.hasura.app/v1/graphql', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.DEVELOPER_API_KEY}`,
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        query: `
          query getProjectDetails($projectName: String!) {
            code_metrics_by_project(where: {project_name: {_eq: $projectName}}) {
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
            onchain_metrics_by_project(where: {project_name: {_eq: $projectName}}) {
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
          projectName: id
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
    const codeMetrics = data.code_metrics_by_project[0]
    const onchainMetrics = data.onchain_metrics_by_project[0]

    return (
      <div>
        <Link href='/'>back to directory</Link>
        {Object.entries(codeMetrics).map(([key, value]: [string, any]) => 
          <div key={key}>{`${key}: ${value}`}</div>
        )}
        {Object.entries(onchainMetrics).map(([key, value]: [string, any]) => 
          <div key={key}>{`${key}: ${value}`}</div>
        )}
      </div>
    )

  } catch (error) {
    console.error('Fetch error:', error)
  }
}