// app/layout.tsx
import "./globals.css";
import BottomNav from "@/components/BottomNav";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-[var(--background)] text-[var(--foreground)]">
        <main className="pb-16 max-w-md mx-auto">
          {children}
        </main>
        <BottomNav />
      </body>
    </html>
  );
}
