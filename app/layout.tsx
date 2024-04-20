import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import SideNav from "@/app/ui/sidenav";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    template: "%s | Watch or Die",
    default: "Watch or Die",
  },
  description: "Website about movies and dying for not seeing them :)",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>
        <div className="flex h-screen flex-col md:flex-row md:overflow-hidden">
          <div className="w-full flex-none md:w-64">
            <SideNav></SideNav>
          </div>
          <div className="flex-grow p-2 md:overflow-y-auto md:p-2">
            {children}
          </div>
        </div>
      </body>
    </html>
  );
}
