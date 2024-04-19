"use client";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import ProjectCard from "./projectCard";
import {
  createProjectModalState,
  handleCreateProjectModal,
} from "@/redux/features/handleProjects/handleProjectSlice";

type Props = {
  projects: any;
};

function AllProjectsList({ projects }: Props) {
  const dispatch = useAppDispatch();
  const createProjectModalValue = useAppSelector(createProjectModalState);
  return (
    <>
      <div className="flex flex-col gap-5 pb-2">
        <h1 className="text-base font-medium">All projects</h1>
        <div className="flex w-full flex-col flex-wrap items-center gap-3 md:flex-row">
          {projects.length <= 0 ? (
            <button
              onClick={() => {
                dispatch(handleCreateProjectModal(!createProjectModalValue));
              }}
            >
              Create project
            </button>
          ) : (
            projects.map((favoriteProject: any) => {
              return (
                <>
                  <ProjectCard
                    title={favoriteProject.title}
                    projectID={favoriteProject.id}
                    isFavorite={favoriteProject.favorite}
                    key={favoriteProject.id}
                    deadline={favoriteProject.deadline}
                    renderedIn="allProjects"
                  />
                </>
              );
            })
          )}
        </div>
      </div>
    </>
  );
}

export default AllProjectsList;
