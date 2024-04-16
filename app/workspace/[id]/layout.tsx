import SideBar from "@/components/workspace/sideBar";
import TopBar from "@/components/workspace/topBar";
import ReduxProvider from "@/redux/redux-provider";
import { createClient } from "@/utils/supabase/server";
import "@app/globals.css";
import { Inter } from "next/font/google";
import { redirect } from "next/navigation";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Flawless",
  description: "The fastest way to manage projects with a Flawless workflow",
};

export default async function RootLayout({
  children,
  modal,
}: {
  children: React.ReactNode;
  modal: React.ReactNode;
}) {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user) {
    return redirect('/hub')
  } else if (!user) {
    return redirect("/login");
  }


  return (
    <html lang="en" className={inter.className}>
      <ReduxProvider>
        <body
          className={`relative flex h-[100svh] flex-col bg-mainBG text-textColor md:max-h-[100vh] lg:grid lg:grid-cols-8 lg:grid-rows-10`}
        >
          <div className="lg:col-start-2 lg:col-end-9 lg:row-span-1">
            <TopBar user={user} />
          </div>
          <main className=" px-4 md:px-8 lg:col-start-2 lg:col-end-9 lg:row-start-2 lg:row-end-11">
            {modal}
            {children}
          </main>
          <div className="fixed bottom-0 w-full lg:top-0 lg:col-start-1 lg:col-end-1 lg:row-start-1 lg:row-end-11 lg:w-fit">
            <SideBar />
          </div>
        </body>
      </ReduxProvider>
    </html>
  );
}
