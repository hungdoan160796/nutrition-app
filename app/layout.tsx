// app/layout.tsx
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import { AuthProvider } from "@/app/providers/AuthProviders";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="bg-[var(--background)] text-[var(--foreground)]">
        <AuthProvider>
        <ThemeProvider>
        <main className="pb-16 max-w-md mx-auto">
          {children}
        </main>
        </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  );
}

