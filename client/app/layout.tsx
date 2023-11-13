import "./css/style.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { config } from "dotenv";

config(); // Get All Environment Variables from '.env' files

const { APP_NAME = "My App", APP_DESCRIPTION = "A NextJS-13 App." } =
  process.env;

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: `${APP_NAME} - Home`,
  applicationName: APP_NAME,
  description: APP_DESCRIPTION,
  authors: [{ name: "Aman Panchal" }],
};

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en" dir="ltr">
      <body className={inter.className}>
        <div className="app styled-scrollbar h-[100svh] max-h-screen max-w-full overflow-auto bg-gray-400 text-slate-900 dark:bg-black dark:text-white">
          {children}
        </div>
      </body>
    </html>
  );
};

export default RootLayout;
