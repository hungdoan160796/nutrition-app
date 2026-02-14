// app/layout.tsx
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import { AuthProvider } from "@/app/providers/AuthProviders";
import { ProfileProvider } from "@/app/providers/ProfileProvider";

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
        <ProfileProvider>
          <main className="pb-16 max-w-md mx-auto">
            {children}
          </main>
        </ProfileProvider>
        </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  );
}

