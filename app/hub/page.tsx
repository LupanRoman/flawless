import AllProjectsList from "@/components/hub/allProjectsList";
import FavoriteProjectsList from "@/components/hub/favoriteProjectsList";
import TopBarHub from "@/components/hub/topBarHub";
import { createClient } from "@/utils/supabase/server";

export default async function Hub() {
  const supabase = createClient();
  let { data: Projects, error } = await supabase.from("Projects").select("*");
  let { data: FavoriteProjects } = await supabase
    .from("Projects")
    .select("*")
    .eq("favorite", true);

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <>
      <div>
        {/* <pre>{JSON.stringify(Projects, null, 2)}</pre> */}
        <TopBarHub email={user?.email} />
        <div className="px-5 md:px-10 pt-10 flex flex-col gap-10">
          <FavoriteProjectsList serverFavoriteProjects={FavoriteProjects} />
          <AllProjectsList serverProjects={Projects} />
        </div>
      </div>
    </>
  );
}
