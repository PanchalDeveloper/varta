"use client";

import { changeViewHelper } from "@/helpers/ComponentViewHelpers";
import ChatMenuItem from "./ChatMenuItem";
import { useEffect } from "react";

const ChatMenu = () => {
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
          {Array.from({ length: 25 }, (_, i) => i + 1).map((j) => (
            <li key={j}>
              <ChatMenuItem ItemKey={j} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ChatMenu;
