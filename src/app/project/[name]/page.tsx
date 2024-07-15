import Link from "next/link";
import { ArrowLeft } from 'lucide-react';
import { CodeMetricsData, OnchainMetricsData } from "@/types";
import CodeMetrics from "@/components/CodeMetrics";
import NetworkList from "@/components/NetworkList";

import { BigQuery }  from '@google-cloud/bigquery';

interface ProjectDetailsProps {
  params: { name: string };
}

async function query(projectName: string) {

  const query = `select *
  from \`oso_production.code_metrics_by_project_v1\`
  where project_name = '${projectName}'
  `;



const bigquery = new BigQuery();

  const options = {
    query: query,
  };

  // Run the query as a job
  const [job] = await bigquery.createQueryJob(options);
  console.log(`Job ${job.id} started.`);

  // Wait for the query to finish
  const [rows] = await job.getQueryResults();

  return rows[0];
}

export default async function ProjectDetails({ params }: ProjectDetailsProps ) {
  const { name } = params;
  try {
    const response = await query(name);
    console.log("res: " + JSON.stringify(response));


    const codeMetrics: CodeMetricsData = response as CodeMetricsData;
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
