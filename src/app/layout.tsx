import type { Metadata } from "next";
import { Work_Sans } from "next/font/google";
import "./globals.css";
import PersonalWebsiteWrapper from "./PersonalWebsiteWrapper";

const workSans = Work_Sans({  
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
 });

export const metadata: Metadata = {
  title: "Sharipov - Personal Portfolio",
  description: "Full-stack developer portfolio showcasing projects and experience in web development, microservices, and modern technologies.",
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
      <body className={workSans.className}>
        <PersonalWebsiteWrapper>
          {children}
        </PersonalWebsiteWrapper>
      </body>
    </html>
  );
}
