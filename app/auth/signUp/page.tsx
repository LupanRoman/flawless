import React from "react";
import Link from "next/link";
import { headers } from "next/headers";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import Image from "next/image";
import googleIcon from "@/public/google.png";
import signUpBg from "@/public/signUpBg.png";

export default function SignUp({
  searchParams,
}: {
  searchParams: { message: string };
}) {
  const signUp = async (formData: FormData) => {
    "use server";

    const origin = headers().get("origin");
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const supabase = createClient();

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${origin}/auth/callback`,
      },
    });

    if (error) {
      return redirect("/login?message=Could not authenticate user");
    }

    return redirect("/signUp?message=Check email to continue sign in process");
  };

  const signUpWithGoogle = async () => {
    "use server";
    const origin = headers().get("origin");
    const supabase = createClient();

    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `https://flawless-omega.vercel.app/auth/callback`,
      },
    });
    console.log(origin);
    redirect(data.url || "");
  };

  return (
    <>
      <div className="flex h-[100svh] flex-col items-center justify-center bg-2BG/50 md:w-2/5 md:rounded-r-2xl">
        <form action={signUpWithGoogle}>
          <button className="flex items-center gap-6 rounded-lg bg-3BG px-[32px] py-[16px] text-xl font-bold text-textColor">
            <Image
              alt="logo of google"
              width={30}
              height={30}
              src={googleIcon}
            />
            Continue with Google
          </button>
        </form>
        <p className="pb-[40px] pt-[20px] font-semibold text-textColor">or</p>
        <form
          autoComplete="off"
          action={signUp}
          className="flex flex-col gap-3"
        >
          <input
            className="rounded-lg bg-mainBG py-[12px] indent-2 text-base font-semibold outline-none active:bg-mainBG"
            type="email"
            placeholder="Email address"
            name="email"
            required
          />
          <input
            className="rounded-lg bg-mainBG py-[12px] indent-2 text-base font-semibold outline-none active:bg-mainBG"
            type="password"
            placeholder="Password"
            name="password"
            required
          />
          <div className="controls flex flex-col gap-2 pt-[100px]">
            <button className="rounded-lg bg-gradient-to-r from-gradientLeft to-gradientRight py-[10px] text-xl font-bold text-textColor">
              Sign up
            </button>
            <Link href={"/auth/login"}>
              <button className="text-base text-textColor">
                Already have an account ?
                <span className="font-bold"> Log in</span>
              </button>
            </Link>
          </div>
          {searchParams?.message && (
            <p className="bg-foreground/10 text-foreground mt-4 p-4 text-center">
              {searchParams.message}
            </p>
          )}
        </form>
        <Image
          src={signUpBg}
          fill={true}
          style={{ objectFit: "contain" }}
          alt="a background image for esthetics"
          className="absolute -z-50"
        />
      </div>
    </>
  );
}
