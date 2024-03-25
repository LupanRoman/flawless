import '@app/globals.css';
export const metadata = {
  title: 'Flawless',
  description: 'Project management tool',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
