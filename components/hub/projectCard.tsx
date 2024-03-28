import Link from "next/link";
import React from "react";
import BookmarkRoundedIcon from "@mui/icons-material/BookmarkRounded";

type Props = {
  title: string;
  projectID: string;
  isFavorite: boolean;
};

function ProjectCard({ title, projectID, isFavorite }: Props) {
  const setToLocal = () => {
    localStorage.setItem("projectID", JSON.stringify(projectID));
  };
  return (
    <>
      <div>
        <Link
          href={`/workspace/${projectID}/dashboard`}
          onClick={() => {
            setToLocal();
          }}
        >
          <div className="relative h-[240px] w-[230px] rounded-[10px] bg-2BG px-5 py-2">
            {isFavorite ? (
              <p className="absolute -top-1 right-2">
                <BookmarkRoundedIcon />
              </p>
            ) : null}
            <h1 className="text-base font-bold">{title}</h1>
          </div>
        </Link>
      </div>
    </>
  );
}

export default ProjectCard;
