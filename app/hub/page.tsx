import AllProjectsList from "@/components/hub/allProjectsList";
import FavoriteProjectsList from "@/components/hub/favoriteProjectsList";
import RealtimeProjects from "@/components/hub/realtime-projects";
import TopBarHub from "@/components/hub/topBarHub";
import CreateProjectForm from "@/redux/features/handleProjects/createProjectForm";
import { createClient } from "@/utils/supabase/server";

export default async function Hub() {
  const supabase = createClient();
  let { data: Projects, error } = await supabase.from("Projects").select("*");

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <>
      <div className="relative">
        <TopBarHub email={user?.email} />
        <CreateProjectForm />
        <div>
          <RealtimeProjects serverProjects={Projects} />
        </div>
      </div>
    </>
  );
}
