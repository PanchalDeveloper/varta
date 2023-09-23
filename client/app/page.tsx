"use client";

import Header from "@/components/Header";
import ChatMenu from "@/components/ChatMenu";
import Nav from "@/components/Nav";
import ChatArea from "@/components/ChatArea";
import AppHomeMessage from "@/components/AppHomeMessage";
import { SocketProvider } from "@/contexts/SocketContext";
import { useState, useEffect } from "react";
import { changeViewHelper } from "@/helpers/ComponentViewHelpers";

const Home = () => {
  const [navItem, setNavItem] = useState("");
  const [chatProfile, setChatProfile] = useState("");

  useEffect(() => {
    const navMenuClearFunc = changeViewHelper(".nav-item", setNavItem);

    return () => {
      navMenuClearFunc();
    };
  }, []);
  return (
    <div className="grid h-full grid-cols-[1fr] grid-rows-[3rem_3.5rem_1fr] place-content-center sm:grid-cols-[3rem_1fr] sm:grid-rows-[3rem_1fr]">
      <SocketProvider>
        <header className="p-1 sm:col-span-2">
          <Header APP_NAME="Varta" />
        </header>
        <nav className="grid min-w-[2.75rem] overflow-x-auto p-1 pb-0 sm:pb-1">
          <Nav />
        </nav>
        <div className="grid grid-cols-1 grid-rows-1 place-content-center gap-2 pb-2 pe-2 sm:grid-cols-[max(16rem,_8rem_+_16vw)_1fr]">
          <section className="flex min-w-min justify-center rounded-md bg-gray-100 dark:bg-slate-900">
            {navItem === "chat" ? <ChatMenu /> : <></>}
          </section>
          <section className="hidden min-w-[20rem] rounded-md bg-gray-300 dark:bg-slate-900 sm:block">
            {navItem === "chat" ? <ChatArea /> : <AppHomeMessage />}
          </section>
        </div>
      </SocketProvider>
    </div>
  );
};

export default Home;
