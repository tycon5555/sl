export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <body className="bg-dark text-white">
        {children}
      </body>
    </html>
  );
}
