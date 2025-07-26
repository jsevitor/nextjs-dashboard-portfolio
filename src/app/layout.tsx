import type { Metadata } from "next";
import { Lexend } from "next/font/google";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import AuthSessionProvider from "@/components/SessionProvider";
import SessionInitializer from "@/components/SessionInitializer";
import "./globals.css";
import { Toaster } from "sonner";

const lexendSans = Lexend({
  variable: "--font-lexend-sans",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Portfólio Dashboard",
  description: "Dashboard para gerenciamento de portfólio.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession(authOptions);
  return (
    <html lang="en">
      <head>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.13.1/font/bootstrap-icons.min.css"
        />
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/devicon.min.css"
        />
      </head>
      <body className={`${lexendSans.className} antialiased`}>
        <AuthSessionProvider>
          <SessionInitializer session={session} />
          {children}
        </AuthSessionProvider>
        <Toaster richColors position="top-right" />
      </body>
    </html>
  );
}
