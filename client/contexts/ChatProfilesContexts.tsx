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

type ChatProfile = {
  id: number | string;
  name: string;
};

export const ChatProfilesContext = createContext<ChatProfile[]>([]);
export const ChatProfileContext = createContext<ChatProfile | {}>({});
export const UpdateChatProfileContext = createContext<
  Dispatch<SetStateAction<ChatProfile>>
>(() => {});
export const ChatMessagesContext = createContext<string[]>([]);
export const UpdateChatMessagesContext = createContext<
  Dispatch<SetStateAction<string[]>>
>(() => {});

export const useChatProfiles = () => useContext(ChatProfilesContext);
export const useChatProfile = () => useContext(ChatProfileContext);
export const useChatMessages = () => useContext(ChatMessagesContext);
export const useUpdateChatProfile = () => useContext(UpdateChatProfileContext);
export const useUpdateChatMessages = () =>
  useContext(UpdateChatMessagesContext);

const ChatProfilesProvider = ({ children }: { children: ReactNode }) => {
  const [chatProfiles, setChatProfiles] = useState<ChatProfile[]>([]);
  const [chatProfile, setChatProfile] = useState<ChatProfile | {}>({});
  const [messages, setMessages] = useState<string[]>([]);

  useEffect(() => {
    const profiles = Array.from({ length: 15 }, (_, i) => {
      return { id: i + 1, name: `Person ${i + 1}` };
    });

    const messages = Array.from({ length: 45 }, (_, i) => "Message " + (i + 1));

    setMessages(messages);
    setChatProfiles(profiles);
    setChatProfile(profiles[0]);
  }, []);

  return (
    <ChatProfilesContext.Provider value={chatProfiles}>
      <ChatProfileContext.Provider value={chatProfile}>
        <UpdateChatProfileContext.Provider value={setChatProfile}>
          <ChatMessagesContext.Provider value={messages}>
            <UpdateChatMessagesContext.Provider value={setMessages}>
              {children}
            </UpdateChatMessagesContext.Provider>
          </ChatMessagesContext.Provider>
        </UpdateChatProfileContext.Provider>
      </ChatProfileContext.Provider>
    </ChatProfilesContext.Provider>
  );
};

export default ChatProfilesProvider;
