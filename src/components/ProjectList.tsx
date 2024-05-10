// 'use client'
import ProjectDetails from "./ProjectDetails";
import { Project } from "oss-directory";
import { URL as OSSURL } from "oss-directory";
import { BlockchainAddress } from "oss-directory/dist/types/blockchain-address";
// import { useState } from "react";

interface ProjectListProps {
  projects: string[];
}

// interface IProjects {
// 	// projects: Project[];
//   project_name: string;
// }

// interface IProject {
// 	name: string;
//   display_name: string;
//   description?: string;
//   websites?: OSSURL[];
//   github?: OSSURL[];
//   npm?: OSSURL[];
//   blockchain?: BlockchainAddress[];
// }

// export const ProjectDetails: React.FC<IProject> = ({
// 	name, display_name, description, websites, github, npm, blockchain
// }) => {
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

export function ProjectList({ projects }: ProjectListProps) {
  // const [selectedProject, setSelectedProject] = useState('Protocol Guild')
  const project: string = projects.filter((project) => project === "Gitcoin")[0]
  // const project: string = projects.filter((project) => project === selectedProject)[0]


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
      {/* <ProjectDetails 
        name={project.name} 
        display_name={project.display_name}
        description={project.description}
        websites={project.websites}
        github={project.github}
        npm={project.npm}
        blockchain={project.blockchain}
      /> */}
    </section>
  )
}

export default ProjectList;