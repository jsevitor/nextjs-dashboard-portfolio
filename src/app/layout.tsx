import type { Metadata } from "next";
import { Lexend } from "next/font/google";
import "./globals.css";
import AuthSessionProvider from "@/components/SessionProvider";

const lexendSans = Lexend({
  variable: "--font-lexend-sans",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Portfólio Dashboard",
  description: "Dashboard para gerenciamento de portfólio.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${lexendSans.className} antialiased`}>
        <AuthSessionProvider>
          {/* <SessionInitializer session={session} /> */}
          {children}
        </AuthSessionProvider>
      </body>
    </html>
  );
}
