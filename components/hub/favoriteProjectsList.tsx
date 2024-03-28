"use client";
import React from "react";
import ProjectCard from "./projectCard";

type Props = {
  favoriteProjects: any;
};

function FavoriteProjectsList({ favoriteProjects }: Props) {
  return (
    <>
      <div className="flex flex-col gap-5">
        <h1 className="text-xl font-medium">Favorite projects</h1>
        <div className="flex w-full flex-col flex-wrap items-center gap-3 md:flex-row">
          {favoriteProjects.map((favoriteProject: any) => {
            return (
              <>
                <ProjectCard
                  title={favoriteProject.title}
                  projectID={favoriteProject.id}
                  isFavorite={favoriteProject.favorite}
                  key={favoriteProject.id}
                />
              </>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default FavoriteProjectsList;
