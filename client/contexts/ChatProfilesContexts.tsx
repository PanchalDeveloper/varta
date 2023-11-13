"use client";

import {
  useState,
  useEffect,
  useContext,
  ReactNode,
  createContext,
  Dispatch,
  SetStateAction,
} from "react";

export type ChatProfileType = {
  id: number | string;
  name?: string;
};

export type ChatMsgType = {
  content: string;
  type: "send" | "receive" | "notify" | "warn";
  status?: "sent" | "arrived" | "seen";
  dt?: Date;
};

export const ChatProfilesContext = createContext<ChatProfileType[]>([]);
export const ActiveChatProfileContext = createContext<ChatProfileType | null>(
  null,
);
export const UpdateActiveChatProfileContext = createContext<
  Dispatch<SetStateAction<ChatProfileType | null>>
>(() => {});
export const ChatMessagesContext = createContext<ChatMsgType[]>([]);
export const UpdateChatMessagesContext = createContext<
  Dispatch<SetStateAction<ChatMsgType[]>>
>(() => {});

export const useChatProfiles = () => useContext(ChatProfilesContext);
export const useActiveChatProfile = () => useContext(ActiveChatProfileContext);
export const useUpdateActiveChatProfile = () =>
  useContext(UpdateActiveChatProfileContext);
export const useActiveChatMessages = () => useContext(ChatMessagesContext);
export const useUpdateActiveChatMessages = () =>
  useContext(UpdateChatMessagesContext);

export const ChatProfilesProvider = ({ children }: { children: ReactNode }) => {
  const [chatProfiles, setChatProfiles] = useState<ChatProfileType[]>([]);
  const [activeChatProfile, setActiveChatProfile] =
    useState<ChatProfileType | null>(null);
  const [messages, setMessages] = useState<ChatMsgType[]>([]);

  useEffect(() => {
    const profiles = Array.from({ length: 15 }, (_, i) => {
      return { id: i + 1, name: `Profile ${i + 1}` };
    });

    const messages = Array.from(
      { length: 45 },
      (_, i) =>
        ({
          content: "Message " + (i + 1),
          type: i % 2 ? "send" : "receive",
          status: i % 3 ? "sent" : "seen",
          dt: new Date(),
        }) as ChatMsgType,
    );

    setMessages(messages);
    setChatProfiles(profiles);
  }, []);

  return (
    <ChatProfilesContext.Provider value={chatProfiles}>
      <ActiveChatProfileContext.Provider value={activeChatProfile}>
        <UpdateActiveChatProfileContext.Provider value={setActiveChatProfile}>
          <ChatMessagesContext.Provider value={messages}>
            <UpdateChatMessagesContext.Provider value={setMessages}>
              {children}
            </UpdateChatMessagesContext.Provider>
          </ChatMessagesContext.Provider>
        </UpdateActiveChatProfileContext.Provider>
      </ActiveChatProfileContext.Provider>
    </ChatProfilesContext.Provider>
  );
};

export default ChatProfilesProvider;
