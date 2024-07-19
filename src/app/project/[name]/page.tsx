import { getBigQueryClient } from "@/utils/bigquery";

import Link from "next/link";
import { ArrowLeft } from 'lucide-react';
import { CodeMetricsData, OnchainMetricsData } from "@/types";
import CodeMetrics from "@/components/CodeMetrics";
import NetworkList from "@/components/NetworkList";


interface ProjectDetailsProps {
  params: { name: string };
}

const bigquery = getBigQueryClient();

async function getInitialCodeMetrics(projectName: string) {

  const query = `select *
  from \`oso_production.code_metrics_by_project_v1\`
  where project_name = '${projectName}'
  `;

  

  const options = {
    query: query,
  };

  // Run the query as a job
  const [job] = await bigquery.createQueryJob(options);

  // Wait for the query to finish
  const [rows] = await job.getQueryResults();

  return rows[0] as CodeMetricsData;
}

// OSO Data has some incorrect data..
// so we manually aggregate star and fork metrics to prevent wrong data
//  related GitHub issue: https://github.com/opensource-observer/oso/issues/1781
async function preventWrongMetrics(projectName: string, metrics: CodeMetricsData) {
  const query = `SELECT DISTINCT *
  FROM \`oso_production.int_repo_metrics_by_project\`
  WHERE project_id = (
    SELECT project_id
    FROM \`oso_production.projects_v1\`
    WHERE project_name = '${projectName}'
    LIMIT 1
  );
  `;

  const options = {
    query: query,
  };

  // Run the query as a job
  const [job] = await bigquery.createQueryJob(options);

  // Wait for the query to finish
  const [rows] = await job.getQueryResults();

  // reset values
  metrics.star_count = 0;
  metrics.fork_count = 0;

  // re-calculate values
  rows.forEach((row) => {
    metrics.star_count += row.star_count;
    metrics.fork_count += row.fork_count;
  })

  return metrics;
}

export default async function ProjectDetails({ params }: ProjectDetailsProps ) {
  const { name } = params;
  try {

    const initialCodeMetrics = await getInitialCodeMetrics(name);


    const codeMetrics = await preventWrongMetrics(name, initialCodeMetrics);


    // const onchainMetrics: OnchainMetricsData[] = {} as OnchainMetricsData[];

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
            {/* <NetworkList onchainMetrics={onchainMetrics}/> */}
          </div>
        </section>
      </main>
    )

  } catch (error) {
    console.error('Fetch error:', error)
  }
}
