import { createClient } from '@/utils/supabase/server';
import '@app/globals.css';
import { Inter } from 'next/font/google';
import { redirect } from 'next/navigation';

const inter = Inter({ subsets: ['latin'] });

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : 'http://localhost:3000';

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: 'Flawless',
  description: 'Project management tool',
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect('/login');
  }

  return (
    <html lang="en" className={inter.className}>
      <body className="bg-mainBG text-textColor">
        <main className="">{children}</main>
      </body>
    </html>
  );
}
