import { ProjectList } from "@/components/ProjectList";

export default async function Home() {
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
          query {
            projects_by_collection(where: {collection_name: {_eq: "Octant (Epoch 1)"}}) {
              project_name
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

    const data = jsonResponse.data.projects_by_collection
    // console.log('fetched data:', data)
    const projects = data.map((project: { project_name: string }) => project.project_name);
    // console.log(projects)
    return (
      <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <header className="relative z-[-1] flex place-items-center before:absolute before:h-[300px] before:w-full before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-full after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700 before:dark:opacity-10 after:dark:from-sky-900 after:dark:via-[#0141ff] after:dark:opacity-40 sm:before:w-[480px] sm:after:w-[240px] before:lg:h-[360px]">
          <h1 className="text-5xl">OSO for PSE</h1>
        </header>
        <ProjectList projects={projects}/>
      </main>
    );
  } catch (error) {
    console.error('Fetch error:', error)
  }
}
