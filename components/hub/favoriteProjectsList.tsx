"use client";
import { createClient } from "@/utils/supabase/client";
import Link from "next/link";
import React, { useEffect, useState } from "react";

type Props = {
  serverFavoriteProjects: any;
};

function FavoriteProjectsList({ serverFavoriteProjects }: Props) {
  const [favoriteProjectsList, setFavoriteProjectsList] = useState(
    serverFavoriteProjects,
  );

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
          setFavoriteProjectsList(Projects);
        },
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [serverFavoriteProjects]);

  return (
    <>
      <div className="flex flex-col gap-5">
        <h1 className="font-medium text-xl">Favorite projects</h1>
        <div className="flex flex-col items-center gap-3 w-full">
          {favoriteProjectsList.map((favoriteProject: any) => {
            return (
              <>
                <Link href={`/workspace/${favoriteProject.id}/dashboard`}>
                  <div className="bg-2BG rounded-[10px] w-[230px] h-[240px] px-5 py-2">
                    <h1 className="font-bold text-base">
                      {favoriteProject.title}
                    </h1>
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

export default FavoriteProjectsList;
