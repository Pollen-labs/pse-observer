// 'use server'

interface ProjectDetailsProps {
  project: string;
}

export default async function ProjectDetails({ project }: ProjectDetailsProps ) {
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
          projectName: project
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
    // console.log('fetched data:', data)
    const codeMetrics = data.code_metrics_by_project[0]
    const onchainMetrics = data.onchain_metrics_by_project[0]
      return (
        <div>
          {Object.entries(codeMetrics).map(([key, value]: [string, any]) => 
            <div key={key}>{`${key}: ${value}`}</div>
          )}
        </div>
      )
    // return (
    //   <div>
    //       <h2 className="text-2xl pt-10 pb-5 underline">Details</h2>
    //       <div className="text-xl font-bold">{display_name}</div>
    //       <p>description:</p>
    //       <li className="pl-5">{description || "no description listed"}</li>
    //       <p>websites:</p>
    //       {websites ?
    //         websites.map((site) => <li key={site.url} className="pl-5">{site.url}</li>)
    //         : <li className="pl-5">no websites listed</li>
    //       }
    //       <p>github:</p>
    //       {github ?
    //         github.map((repo) => <li key={repo.url} className="pl-5">{repo.url}</li>)
    //         : <li className="pl-5">no github listed</li>
    //       }
    //       <div>npm:</div>
    //       {npm ?
    //         npm.map((repo) => <li key={repo.url} className="pl-5">{repo.url}</li>)
    //         : <li className="pl-5">no packages listed</li>
    //       }
    //       <div>blockchain:</div>
    //       {blockchain?.map((address) => 
    //         <div key={address.address} className="pl-5 pb-3">
    //           <li>address: {address.address}</li>
    //           <p className="pl-5">- networks: {address.networks[0]}, {address.networks[1]}</p>
    //           <p className="pl-5">- tags: {address.tags[0]}, {address.tags[1]}</p>
    //         </div>
    //       )}
    //     </div>
    // )
  } catch (error) {
    console.error('Fetch error:', error)
  }
}
// export default function ProjectDetails(project: string) {
// 	// name, display_name, description, websites, github, npm, blockchain

//   return (
//     <div>
//         <h2 className="text-2xl pt-10 pb-5 underline">Details</h2>
//         <div className="text-xl font-bold">{display_name}</div>
//         <p>description:</p>
//         <li className="pl-5">{description || "no description listed"}</li>
//         <p>websites:</p>
//         {websites ?
//           websites.map((site) => <li key={site.url} className="pl-5">{site.url}</li>)
//           : <li className="pl-5">no websites listed</li>
//         }
//         <p>github:</p>
//         {github ?
//           github.map((repo) => <li key={repo.url} className="pl-5">{repo.url}</li>)
//           : <li className="pl-5">no github listed</li>
//         }
//         <div>npm:</div>
//         {npm ?
//           npm.map((repo) => <li key={repo.url} className="pl-5">{repo.url}</li>)
//           : <li className="pl-5">no packages listed</li>
//         }
//         <div>blockchain:</div>
//         {blockchain?.map((address) => 
//           <div key={address.address} className="pl-5 pb-3">
//             <li>address: {address.address}</li>
//             <p className="pl-5">- networks: {address.networks[0]}, {address.networks[1]}</p>
//             <p className="pl-5">- tags: {address.tags[0]}, {address.tags[1]}</p>
//           </div>
//         )}
//       </div>
//   )
// }

