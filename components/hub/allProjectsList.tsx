"use client";
import Link from "next/link";

type Props = {
  projects: any;
};

function AllProjectsList({ projects }: Props) {
  return (
    <>
      <div className="flex flex-col gap-5 pb-10">
        <h1 className="text-xl font-medium">All projects</h1>
        <div className="flex w-full flex-col items-center gap-3">
          {projects.map((project: any) => {
            return (
              <>
                <Link href={`/workspace/${project.id}/dashboard`}>
                  <div className="h-[240px] w-[230px] rounded-[10px] bg-2BG px-5 py-2">
                    <h1 className="text-base font-bold">{project.title}</h1>
                  </div>
                </Link>
              </>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default AllProjectsList;
