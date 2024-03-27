"use client";
import { createClient } from "@/utils/supabase/client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import BookmarkRoundedIcon from "@mui/icons-material/BookmarkRounded";

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
        <h1 className="text-xl font-medium">Favorite projects</h1>
        <div className="flex w-full flex-col items-center gap-3">
          {favoriteProjectsList.map((favoriteProject: any) => {
            return (
              <>
                <Link href={`/workspace/${favoriteProject.id}/dashboard`}>
                  <div className="relative h-[240px] w-[230px] rounded-[10px] bg-2BG px-5 py-2">
                    <p className="absolute -top-1 right-2">
                      <BookmarkRoundedIcon />
                    </p>
                    <h1 className="text-base font-bold">
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
