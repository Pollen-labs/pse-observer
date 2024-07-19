import Link from "next/link";
// import { CodeMetricsData, OnchainMetrics } from "@/types";
// import CodeMetrics from "@/components/CodeMetrics";
// import NetworkList from "@/components/NetworkList";

interface Project {
  project_id?: string;
  project_name: string;
}

// const collection = 'octant-01'

export default async function Home() {
  try {
    const projects: Project[] = [
      {project_name: "privacy-scaling-explorations"},
      // PSE active projects
      {project_name: "anon-aadhaar"},
      {project_name: "anonklub"},
      {project_name: "bandada-infra"},
      {project_name: "cursive-team"},
      {project_name: "halo2-privacy-scaling-explorations"},
      {project_name: "maci-privacy-scaling-explorations"},
      {project_name: "zkmopro"},
      {project_name: "sonobe-privacy-scaling-explorations"},
      {project_name: "mpz-privacy-scaling-explorations"},
      {project_name: "greco-privacy-scaling-explorations"},
      {project_name: "semaphore-protocol"},
      {project_name: "summa-dev"},
      {project_name: "tlsnotary"},
      {project_name: "pse-trusted-setup-suite"},
      {project_name: "getwax"},
      {project_name: "zkemail"},
      {project_name: "zk-kit-privacy-scaling-explorations"},
      {project_name: "zkstats"},
      {project_name: "zkevm-privacy-scaling-explorations"},

      // PSE grantee projects
      {project_name: "blockchain-powered-esim"},
      {project_name: "zkp2p"},
      {project_name: "zk-passport"},
      {project_name: "plume-sig"},

      // PSE inactive projects
      {project_name: "unirep"},
      {project_name: "rate-limiting-nullifier"},
      {project_name: "zk-eigentrust-privacy-scaling-explorations"},
      {project_name: "zkopru-network"},
    ];

    
    // const codeMetrics: CodeMetricsData = data.code_metrics_by_collection[0]
    // const onchainMetrics: OnchainMetrics[] = data.onchain_metrics_by_collection

    return (
      <main className="p-16">
        <header className="flex flex-col gap-2 items-center">
          {/* <h1 className="text-5xl font-semibold text-center">{collection}</h1> */}
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
