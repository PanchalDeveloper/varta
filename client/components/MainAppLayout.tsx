"use client";

import { useEffect } from "react";
import Header from "@/components/Header";
import Nav from "@/components/Nav";
import ChatMenu from "@/components/ChatMenu";
import MessageArea from "@/components/MessageArea";
import WelcomeMessage from "@/components/WelcomeMessage";
import { useAppConfigs } from "@/contexts/AppConfigContext";
import { useActiveNavMenu } from "@/contexts/NavMenuContexts";
import { useActiveChatProfile } from "@/contexts/ChatProfilesContexts";

const MainAppLayout = () => {
  const { APP_NAME } = useAppConfigs();

  const activeNavMenu = useActiveNavMenu();
  const activeChatProfile = useActiveChatProfile();

  useEffect(() => {
    let allowPrompt = true;
    let areYouReallySure = false;

    const areYouSure = () => {
      if (!allowPrompt) return;

      if (!areYouReallySure && true) {
        areYouReallySure = true;
        const confMessage = "Are you sure, you want to close this window!?";
        return confMessage;
      }
    };

    window.onbeforeunload = areYouSure;

    return () => {
      window.removeEventListener("beforeunload", areYouSure);
    };
  }, []);

  return (
    <div className="grid h-[100svh] grid-cols-[1fr] grid-rows-[3rem_3.5rem_1fr] place-content-center gap-x-1 px-1 sm:grid-cols-[3rem_1fr] sm:grid-rows-[3rem_1fr]">
      <header className="p-1 sm:col-span-2">
        <Header APP_NAME={APP_NAME} />
      </header>
      <nav className="grid min-w-[2.75rem] overflow-hidden pb-0 sm:pb-1">
        <Nav />
      </nav>
      <div className="grid grid-cols-1 grid-rows-1 place-content-center gap-2 py-1 pt-0 sm:grid-cols-[max(16rem,_8rem_+_16vw)_1fr] sm:pb-2">
        <section
          className={`flex min-w-min justify-center rounded-b-md bg-gray-100 dark:bg-slate-900 sm:rounded-t-md ${
            activeChatProfile ? "hidden sm:flex" : "flex"
          }`}
        >
          <ChatMenu />
        </section>
        <section
          className={`min-w-[20rem] rounded-b-md bg-gray-300 dark:bg-slate-900 sm:rounded-t-md ${
            !activeChatProfile ? "hidden sm:block" : "block"
          }`}
        >
          {activeNavMenu === "chats" && activeChatProfile ? (
            <MessageArea />
          ) : (
            <WelcomeMessage />
          )}
        </section>
      </div>
    </div>
  );
};

export default MainAppLayout;
