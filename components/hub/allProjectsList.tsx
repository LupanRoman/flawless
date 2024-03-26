"use client";

import { createClient } from "@/utils/supabase/client";
import Link from "next/link";
import { useEffect, useState } from "react";

type Props = {
  serverProjects: any;
};

function AllProjectsList({ serverProjects }: Props) {
  const [allProjects, setAllProjects] = useState(serverProjects);

  useEffect(() => {
    const supabase = createClient();
    const channel = supabase
      .channel("*")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "Projects" },
        async () => {
          const { data: Projects } = await supabase
            .from("Projects")
            .select("*");
          setAllProjects(Projects);
        },
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [serverProjects]);

  return (
    <>
      <div className="flex flex-col gap-5">
        <h1 className="font-medium text-xl">All projects</h1>
        <div className="flex flex-col items-center gap-3 w-full">
          {allProjects.map((project: any) => {
            return (
              <>
                <Link href={`/workspace/${project.id}/dashboard`}>
                  <div className="bg-2BG rounded-[10px] w-[230px] h-[240px] px-5 py-2">
                    <h1 className="font-bold text-base">{project.title}</h1>
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
