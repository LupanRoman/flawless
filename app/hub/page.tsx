import AllProjectsList from "@/components/hub/allProjectsList";
import FavoriteProjectsList from "@/components/hub/favoriteProjectsList";
import TopBarHub from "@/components/hub/topBarHub";
import CreateProjectForm from "@/redux/features/handleProjects/createProjectForm";
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
      <div className="relative">
        {/* <pre>{JSON.stringify(Projects, null, 2)}</pre> */}
        <TopBarHub email={user?.email} />
        <CreateProjectForm />
        <div className="flex flex-col gap-10 px-5 pt-10 md:px-10">
          <FavoriteProjectsList serverFavoriteProjects={FavoriteProjects} />
          <AllProjectsList serverProjects={Projects} />
        </div>
      </div>
    </>
  );
}
