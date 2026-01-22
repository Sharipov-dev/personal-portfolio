import type { Metadata } from "next";
import "./globals.css";
import PersonalWebsiteWrapper from "./PersonalWebsiteWrapper";

export const metadata: Metadata = {
  title: "Arthur Sharipov - Pixel Portfolio",
  description: "Welcome to my cozy pixel art developer room! Full-stack developer portfolio showcasing projects and experience in web development, microservices, and modern technologies.",
  icons: {
    icon: '/favicon.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.png" />
      </head>
      <body>
        <PersonalWebsiteWrapper>
          {children}
        </PersonalWebsiteWrapper>
      </body>
    </html>
  );
}
