"use client";

import { useState, useEffect } from "react";
import { changeViewHelper } from "@/helpers/ComponentViewHelpers";
import Header from "@/components/Header";
import ChatMenu from "@/components/ChatMenu";
import Nav from "@/components/Nav";
import MessageArea from "@/components/MainAreaLayout";
import AppHomeMessage from "@/components/AppHomeMessage";
import {
  useChatProfiles,
  useChatProfile,
  useUpdateChatProfile,
} from "@/contexts/ChatProfilesContexts";

const MainAreaLayout = () => {
  const [navItem, setNavItem] = useState("chat");
  const chatProfiles = useChatProfiles();
  const [currChatProfile, setCurrChatProfile] = [
    useChatProfile(),
    useUpdateChatProfile(),
  ];

  // useEffect(() => {
  //   const navMenuClearFunc = changeViewHelper(".nav-item", setNavItem);
  //   const chatMenuClearFunc = changeViewHelper(
  //     ".chat-profile",
  //     (id: number | string) => {
  //       const newChatProfile = chatProfiles.filter(
  //         (x) => `chatProfile_${x.id}` === id,
  //       )[0];
  //       console.log("Setting currProfile = ", newChatProfile);
  //       setCurrChatProfile(newChatProfile);
  //       console.log("new currProfile val = ", currChatProfile);
  //     },
  //   );

  //   return () => {
  //     navMenuClearFunc();
  //     chatMenuClearFunc();
  //   };
  // }, []);
  return (
    <div className="grid h-full grid-cols-[1fr] grid-rows-[3rem_3.5rem_1fr] place-content-center sm:grid-cols-[3rem_1fr] sm:grid-rows-[3rem_1fr]">
      <header className="p-1 sm:col-span-2">
        <Header APP_NAME="Varta" />
      </header>
      <nav className="grid min-w-[2.75rem] overflow-hidden p-1 pb-0 sm:pb-1">
        <Nav />
      </nav>
      <div className="grid grid-cols-1 grid-rows-1 place-content-center gap-2 p-1 pt-0 sm:grid-cols-[max(16rem,_8rem_+_16vw)_1fr] sm:pb-2 sm:pe-2">
        <section className="flex min-w-min justify-center rounded-b-md bg-gray-100 dark:bg-slate-900 sm:rounded-t-md">
          {navItem === "chat" ? <ChatMenu /> : <></>}
        </section>
        <section className="hidden min-w-[20rem] rounded-md bg-gray-300 dark:bg-slate-900 sm:block">
          {navItem === "chat" ? <MessageArea /> : <AppHomeMessage />}
        </section>
      </div>
    </div>
  );
};

export default MainAreaLayout;
