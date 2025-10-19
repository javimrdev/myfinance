import { Geist, Geist_Mono } from "next/font/google";
import "./../app/globals.css";
import { Topnav } from "@/components/Topnav/Topnav";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const queryClient = new QueryClient();

export const BaseLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <html lang="en">
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          <QueryClientProvider client={queryClient}>
            <Topnav />
            <div className="container mx-auto py-4">{children}</div>
          </QueryClientProvider>
        </body>
      </html>
    </>
  );
};
