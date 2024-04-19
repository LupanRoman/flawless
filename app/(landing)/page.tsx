import NavBar from "@/components/landing/navBar";
import Welcome from "@/components/landing/welcome";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export default async function Index() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user) {
    return redirect("/hub");
  }

  return (
    <>
      <div className="w-full">
        <NavBar />
        <Welcome />
      </div>
    </>
  );
}
