import { Geist, Geist_Mono } from "next/font/google";
import "./../app/globals.css";
import { Topnav } from "@/components/Topnav/Topnav";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const BaseLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <html lang="en">
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          <Topnav />
          <div className="px-2 lg-px-5">{children}</div>
        </body>
      </html>
    </>
  );
};
