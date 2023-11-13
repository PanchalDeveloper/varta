"use client";

import { useActiveNavMenu } from "@/contexts/NavMenuContexts";
import ChatMenuItem from "./ChatMenuItem";
import { useChatProfiles } from "@/contexts/ChatProfilesContexts";

const ChatMenu = () => {
  const chatProfiles = useChatProfiles();
  const activeNavMenu = useActiveNavMenu();
  return (
    <div className="grid h-full basis-full select-none grid-cols-1 grid-rows-[minmax(0px,_5rem)_calc(100svh-5rem-4rem-3rem)] content-between justify-center overflow-hidden sm:grid-rows-[minmax(0px,_5rem)_calc(100svh-5rem-4rem)]">
      <header className="plcae-content-between grid grid-rows-[0.8fr_0.2fr] border-b border-gray-400 border-opacity-40 px-2 py-3 drop-shadow-sm">
        <div className="flex items-center justify-between gap-2">
          <h3 className="px-2 text-xl font-bold capitalize">{activeNavMenu}</h3>
          <span>Sort & Filter</span>
        </div>
      </header>
      <div className="scroll-gutter w-full scroll-m-32 overflow-y-auto p-2">
        <ul tabIndex={-1}>
          {chatProfiles.map((profile, i) => (
            <li key={i}>
              <ChatMenuItem
                cardSubHead={
                  activeNavMenu === "chats"
                    ? "Recent chat messages will be shown here..."
                    : activeNavMenu === "calls"
                    ? "Recent calls will be shown here..."
                    : activeNavMenu === "status"
                    ? "click here to see the status."
                    : ""
                }
                cardHead={profile?.name}
                ItemKey={profile?.id}
              />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ChatMenu;
