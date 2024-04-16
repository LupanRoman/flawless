"use client";
import React from "react";
import ProjectCard from "./projectCard";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import {
  createProjectModalState,
  handleCreateProjectModal,
} from "@/redux/features/handleProjects/handleProjectSlice";

type Props = {
  favoriteProjects: any;
};

function FavoriteProjectsList({ favoriteProjects }: Props) {
  const dispatch = useAppDispatch();
  const createProjectModalValue = useAppSelector(createProjectModalState);
  return (
    <>
      <div className="flex flex-col gap-5">
        <h1 className="text-base font-medium">Favorite projects</h1>
        <div className="flex w-full flex-col flex-wrap items-center gap-3 md:flex-row">
          {favoriteProjects.length <= 0 ? (
            <button
              onClick={() => {
                dispatch(handleCreateProjectModal(!createProjectModalValue));
              }}
            >
              Create project
            </button>
          ) : (
            favoriteProjects.map((favoriteProject: any) => {
              return (
                <>
                  <ProjectCard
                    title={favoriteProject.title}
                    projectID={favoriteProject.id}
                    isFavorite={favoriteProject.favorite}
                    key={favoriteProject.id}
                    deadline={favoriteProject.deadline}
                    renderedIn="favorites"
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

export default FavoriteProjectsList;
