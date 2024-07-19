'use server'

import { getBigQueryClient } from "@/utils/bigquery";
import { CodeMetricsData, Project } from "@/types";

import { mkConfig, generateCsv, download } from "export-to-csv";


const bigquery = getBigQueryClient();


export async function getInitialCodeMetrics(projectName: string) {

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
export async function preventWrongMetrics(projectName: string, metrics: CodeMetricsData) {
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


export async function processCSV(projectNames: string[]) {
  const csvConfig = mkConfig({ useKeysAsHeaders: true });
  
  const data = await prepareData(projectNames);
  
  const csv = generateCsv(csvConfig)(data);

  return csv;
  }

  function transformMetricsToString(metrics: CodeMetricsData): { [key: string]: string } {
    const transformedMetrics: { [key: string]: string } = {};
    for (const key in metrics) {
      if (Object.prototype.hasOwnProperty.call(metrics, key)) {
        if (key === "first_commit_date" || key === "last_commit_date") {
            transformedMetrics[key] = String(metrics[key as keyof CodeMetricsData]?.value);
        } else {
            transformedMetrics[key] = String(metrics[key as keyof CodeMetricsData]);
        }
        
      }
    }
    return transformedMetrics;
  }
  
  async function prepareData(projectNames: string[]) {
    const projectMetrics: { [key: string]: string; }[] = [];
  
    await Promise.all(projectNames.map(async (projectName: string) => {
      const initialCodeMetrics = await getInitialCodeMetrics(projectName);
      const codeMetrics = await preventWrongMetrics(projectName, initialCodeMetrics);
      const transformedMetrics = transformMetricsToString(codeMetrics);
      projectMetrics.push(transformedMetrics);
    }));
  
    return projectMetrics;
  }
