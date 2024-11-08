import ReduxProvider from "@/redux/redux-provider";
import "@app/globals.css";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Flawless",
  description: "A project management tool",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.className}>
      <ReduxProvider>
        <body className="bg-mainBG text-textColor">{children}</body>
      </ReduxProvider>
    </html>
  );
}
