import "./css/style.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { APP_NAME, APP_DESCRIPTION } from "./Initialize";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: APP_NAME,
  description: APP_DESCRIPTION,
};

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="app styled-scrollbar h-[100svh] max-h-screen max-w-full overflow-auto bg-gray-400 text-slate-900 dark:bg-black dark:text-white">
          {children}
        </div>
      </body>
    </html>
  );
};

export default RootLayout;
