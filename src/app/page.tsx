import Link from "next/link";
// import { CodeMetricsData, OnchainMetrics } from "@/types";
// import CodeMetrics from "@/components/CodeMetrics";
// import NetworkList from "@/components/NetworkList";

interface Project {
  project_id: string;
  project_name: string;
}

const collection = 'octant-01'

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
          query getCollectionDetails($collectionName: String!) {
            projects_by_collection_v1(where: {collection_name: {_eq: $collectionName}}) {
              project_name
              project_id
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
    const projects = data.projects_by_collection_v1
    // const codeMetrics: CodeMetricsData = data.code_metrics_by_collection[0]
    // const onchainMetrics: OnchainMetrics[] = data.onchain_metrics_by_collection

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
              <Link href={`/project/${project.project_name}`} key={project.project_name}>
                <li className="max-w-72 truncate hover:underline">{project.project_name}</li>
              </Link>
            )}
          </div>
          {/* <div>
            <h2 className="text-2xl underline pb-8">CODE METRICS</h2>
            <CodeMetrics {...codeMetrics} />
          </div>
          <div>
            <h2 className="text-2xl underline pb-8">ON-CHAIN METRICS</h2>
            <NetworkList onchainMetrics={onchainMetrics}/>
          </div> */}
        </section>
      </main>
    );
  } catch (error) {
    console.error('Fetch error:', error)
  }
}
