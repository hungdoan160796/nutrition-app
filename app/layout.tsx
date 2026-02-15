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
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
        <meta name="theme-color" content="#ffffff" />
      </head>
      <body className="bg-[var(--background)] text-[var(--foreground)]">
        <AuthProvider>
        <ThemeProvider>
        <ProfileProvider>
          <main className="pb-16 max-w-md mx-auto px-4 sm:px-0 w-full">
            {children}
          </main>
        </ProfileProvider>
        </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  );
}

