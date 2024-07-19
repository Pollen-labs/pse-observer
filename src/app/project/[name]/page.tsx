import Link from "next/link";
import { ArrowLeft } from 'lucide-react';
import { getInitialCodeMetrics, preventWrongMetrics } from "@/app/actions";
import CodeMetrics from "@/components/CodeMetrics";


interface ProjectDetailsProps {
  params: { name: string };
}


export default async function ProjectDetails({ params }: ProjectDetailsProps ) {
  const { name } = params;
  try {

    const initialCodeMetrics = await getInitialCodeMetrics(name);
    const codeMetrics = await preventWrongMetrics(name, initialCodeMetrics);
    // const onchainMetrics: OnchainMetricsData[] = {} as OnchainMetricsData[];
    // console.log(codeMetrics);
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

