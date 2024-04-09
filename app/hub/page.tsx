import AllProjectsList from "@/components/hub/allProjectsList";
import FavoriteProjectsList from "@/components/hub/favoriteProjectsList";
import RealtimeProjects from "@/components/hub/realtime-projects";
import TopBarHub from "@/components/hub/topBarHub";
import CreateProjectForm from "@/redux/features/handleProjects/createProjectForm";
import { createClient } from "@/utils/supabase/server";

export default async function Hub() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  // let { data: Projects, error } = await supabase
  //   .from("Projects")
  //   .select("*, Assignees!inner(user_id)")
  //   .eq("Assignees.user_id", user?.id);

  const { data: Projects, error } = await supabase.from("Projects").select("*");
  const { data: FavoriteProjects } = await supabase
    .from("Projects")
    .select("*")
    .eq("favorite", true);

  // console.log(Projects);

  return (
    <>
      <div className="relative">
        <TopBarHub email={user?.email} />
        <CreateProjectForm />
        <RealtimeProjects serverProjects={Projects} favoriteProjects={FavoriteProjects} />
      </div>
    </>
  );
}
