import React from "react";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import CreateProjectBtn from "@/redux/features/handleProjects/createProjectBtn";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
type Props = {
  email: string | undefined;
};

function TopBarHub({ email }: Props) {
  const signOut = async () => {
    "use server";
    const supabase = createClient();
    const { error } = await supabase.auth.signOut();
    redirect("/auth/login");
  };

  return (
    <>
      <div className="flex h-[10vh] items-center justify-between rounded-b-[40px] bg-2BG px-5 md:px-10">
        <h1 className="text-2xl font-bold">Flawless</h1>
        <div className="flex items-center gap-3 md:gap-7">
          {/* <button>{email}</button> */}
          <CreateProjectBtn />
          <form action={signOut}>
            <button>
              <LogoutRoundedIcon />
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default TopBarHub;
