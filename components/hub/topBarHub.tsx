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
      <div className="bg-2BG h-[10vh] rounded-b-[40px] px-5 flex items-center justify-between">
        <h1 className="font-bold text-2xl">Flawless</h1>
        <div className="flex gap-3 items-center md:gap-7">
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
