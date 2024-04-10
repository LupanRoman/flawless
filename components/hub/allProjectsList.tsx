"use client";
import ProjectCard from "./projectCard";

type Props = {
  projects: any;
};

function AllProjectsList({ projects }: Props) {
  return (
    <>
      <div className="flex flex-col gap-5 pb-2">
        <h1 className="text-lg font-medium">All projects</h1>
        <div className="flex w-full flex-col flex-wrap items-center gap-3 md:flex-row">
          {projects.map((project: any) => {
            return (
              <>
                <ProjectCard
                  title={project.title}
                  projectID={project.id}
                  isFavorite={project.favorite}
                  key={project.id}
                  deadline={project.deadline}
                  renderedIn="all"
                />
              </>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default AllProjectsList;
