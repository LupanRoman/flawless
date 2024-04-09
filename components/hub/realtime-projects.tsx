"use client";
import { createClient } from "@/utils/supabase/client";
import React, { useEffect, useState } from "react";
import FavoriteProjectsList from "./favoriteProjectsList";
import AllProjectsList from "./allProjectsList";

type Props = {
  serverProjects: any;
  favoriteProjects: any;
};

function RealtimeProjects({ serverProjects, favoriteProjects }: Props) {
  const [allProjects, setAllProjects] = useState(serverProjects);
  const [favoriteProjectsList, setFavoriteProjectsList] =
    useState(favoriteProjects);

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
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "Projects" },
        async () => {
          const { data: FavoriteProjects } = await supabase
            .from("Projects")
            .select("*")
            .eq("favorite", true);
          setFavoriteProjectsList(FavoriteProjects);
        },
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [serverProjects]);

  return (
    <>
      <div className="flex flex-col gap-10 px-5 pt-10 md:px-10">
        <FavoriteProjectsList favoriteProjects={favoriteProjectsList} />
        <AllProjectsList projects={allProjects} />
      </div>
    </>
  );
}

export default RealtimeProjects;
