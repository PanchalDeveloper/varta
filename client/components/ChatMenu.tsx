"use client";

import ChatMenuItem from "./ChatMenuItem";
import { useEffect } from "react";
import { changeViewHelper } from "@/helpers/ComponentViewHelpers";
import {
  useChatProfile,
  useChatProfiles,
  useUpdateChatProfile,
} from "@/contexts/ChatProfilesContexts";

const ChatMenu = () => {
  const chatProfiles = useChatProfiles();
  const [currChatProfile, setCurrChatProfile] = [
    useChatProfile(),
    useUpdateChatProfile(),
  ];

  useEffect(() => {
    const chatMenuClearFunc = changeViewHelper(
      ".chat-profile",
      (id: number | string) => {
        const newChatProfile = chatProfiles.filter(
          (x) => `chatProfile_${x.id}` === id,
        )[0];
        console.log("Setting currProfile = ", newChatProfile);
        setCurrChatProfile(newChatProfile);
        console.log("new currProfile val = ", currChatProfile);
      },
    );

    return () => {
      chatMenuClearFunc();
    };
  }, []);

  return (
    <div className="grid basis-full select-none grid-cols-1 grid-rows-[minmax(0px,_5rem)_calc(100svh-5rem-4rem-3rem)] content-between justify-center overflow-hidden rounded-md sm:grid-rows-[minmax(0px,_5rem)_calc(100svh-5rem-4rem)]">
      <header className="plcae-content-between grid grid-rows-[0.8fr_0.2fr] border-b border-gray-400 border-opacity-40 px-2 py-3 drop-shadow-sm">
        <div className="flex items-center justify-between gap-2">
          <h3 className="px-2 text-xl font-bold capitalize">Chats</h3>
          <span>Sort & Filter</span>
        </div>
      </header>
      <div className="scroll-gutter w-full scroll-m-32 overflow-y-auto p-2">
        <ul tabIndex={-1}>
          {chatProfiles
            .map((x) => x.id)
            .map((key) => (
              <li key={key}>
                <ChatMenuItem ItemKey={key} />
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
};

export default ChatMenu;
