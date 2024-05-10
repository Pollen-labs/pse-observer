// 'use client'
import ProjectDetails from "./ProjectDetails";
import { Project } from "oss-directory";
import { URL as OSSURL } from "oss-directory";
import { BlockchainAddress } from "oss-directory/dist/types/blockchain-address";
// import { useState } from "react";

interface ProjectListProps {
  projects: string[];
}

export function ProjectList({ projects }: ProjectListProps) {
  // const [selectedProject, setSelectedProject] = useState('Gitcoin')
  // const project: string = projects.filter((project) => project === selectedProject)[0]
  const project: string = projects.filter((project) => project === "Gitcoin")[0]

  return (
    <section className="flex justify-around">
      <div>
        <h2 className="text-2xl pt-10 pb-5 underline">Octant 01</h2>
        {projects.map((project) => 
        <div
          key={project}
          // className={`cursor-pointer ${project === selectedProject ? 'underline' : ''}`}
          // onClick={() => {
          //   setSelectedProject(project)
          // }}
        >
          {project}
        </div>
        )}
      </div>
      <ProjectDetails project={project} />
    </section>
  )
}

export default ProjectList;