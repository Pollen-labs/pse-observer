import Link from "next/link";

interface Project {
  project_slug: string;
  project_name: string;
}

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
          query {
            projects_by_collection(where: {collection_name: {_eq: "Octant (Epoch 1)"}}) {
              project_name
              project_slug
            }
            code_metrics_by_collection(where: {collection_name: {_eq: "Octant (Epoch 1)"}}) {
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
          }
        `
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

    const projects = jsonResponse.data.projects_by_collection
    const metrics = jsonResponse.data.code_metrics_by_collection[0]

    //TODO: get project ids, map names for directory list, ids for params
    // const projectNames = projects.map((project: { project_name: string }) => project.project_name);
    return (
      <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <header className="relative z-[-1] flex place-items-center before:absolute before:h-[300px] before:w-full before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-full after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700 before:dark:opacity-10 after:dark:from-sky-900 after:dark:via-[#0141ff] after:dark:opacity-40 sm:before:w-[480px] sm:after:w-[240px] before:lg:h-[360px]">
          <h1 className="text-5xl">OSO for PSE</h1>
        </header>
        <section className="flex gap-32 pt-20">
          <div className="flex-col">
            <h2 className="text-3xl font-semibold">Project Directory</h2>
            {projects.map((project: Project) => 
              <Link href={`/project/${project.project_slug}`} key={project.project_name}>
                <li className="hover:underline">{project.project_name}</li>
              </Link>
            )}
          </div>
          <div>
            <h2 className="text-3xl font-semibold">Ecosystem Metrics</h2>
            {Object.entries(metrics).map(([key, value]: [string, any]) => 
              <div key={key}>{`${key}: ${value}`}</div>
            )}
          </div>
        </section>
      </main>
    );
  } catch (error) {
    console.error('Fetch error:', error)
  }
}
