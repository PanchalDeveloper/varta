"use client";

import { useEffect, FormEvent, KeyboardEvent } from "react";
import { useSocket } from "@/contexts/SocketContexts";
import Link from "next/link";
import Message from "./Message";
import ScrollButton from "./ScrollButton";
import ProfileCard from "./ProfileCard";
import { FormatChatText } from "@/utilities/TextUtilities";
import {
  ChatMsgType,
  useActiveChatMessages,
  useActiveChatProfile,
  useUpdateActiveChatMessages,
  useUpdateActiveChatProfile,
} from "@/contexts/ChatProfilesContexts";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPaperPlane,
  faAnglesDown,
  faAngleLeft,
} from "@fortawesome/free-solid-svg-icons";

const MessageArea = () => {
  const [activeChatProfile, setActiveChatProfile] = [
    useActiveChatProfile(),
    useUpdateActiveChatProfile(),
  ];
  const [messages, setMessages] = [
    useActiveChatMessages(),
    useUpdateActiveChatMessages(),
  ];

  // Manage Socket Events
  const socket = useSocket();
  useEffect(() => {
    // Send a Message
    socket?.on("send-message", (msg: ChatMsgType) => {
      setMessages((prevMessages) => [...prevMessages, msg]);
    });

    // Display Message
    socket?.on("receive-message", (msg: ChatMsgType) => {
      setMessages((prevMessages) => [...prevMessages, msg]);
    });

    return () => {
      socket?.removeAllListeners();
    };
  }, []);

  const sendMessage = (e: FormEvent<HTMLFormElement> | KeyboardEvent): void => {
    e.preventDefault();
    const msgField = document.getElementById(
      "chatInputBox",
    ) as HTMLInputElement;
    let msg: ChatMsgType = {
      content: FormatChatText(msgField?.value),
      type: "send",
      dt: new Date(),
      status: "sent",
    };

    if (!msgField || !msg?.content) return;

    msgField.value = "";

    socket?.emit("send-message", msg);
  };

  const handleMsgInputKeyDown = (event: KeyboardEvent) => {
    if (window.innerWidth < 640) return; // Check if the device is a small screen device (e.g. Mobile Phone)
    if (event.key === "Enter" && !event.shiftKey) sendMessage(event); // Send Message when clicked Enter fro Keyboard on PC
  };

  //
  const goToMainNav = () => {
    const chatProfiles: NodeListOf<HTMLInputElement> =
      document.querySelectorAll(".chat-profile:checked");
    chatProfiles.forEach((btn) => (btn.checked = false)); // Uncheck all the 'chat-profile' radio buttons

    setActiveChatProfile(null);
  };

  // Message Update Handler
  useEffect(() => {
    document.getElementById("messageArea")?.scrollTo(0, 0); // Scroll to the start of "Message Area"
  }, [messages]);

  // Reverse Chat Messages for "Message Area" as `Flex-Reverse`
  const chatMsgs: ChatMsgType[] = [...messages].reverse();

  return (
    <div className="relative grid h-full grid-cols-1 grid-rows-[4rem_calc(100svh-10.5rem-3.25rem)] justify-center overflow-hidden rounded-lg bg-gray-300 dark:bg-slate-700 sm:grid-rows-[4rem_calc(100svh-10.5rem)]">
      <header className="flex select-none justify-between bg-transparent p-2 drop-shadow-xl dark:bg-slate-900">
        <div className="flex items-center justify-between gap-2">
          <span
            className="cursor-pointer px-1 opacity-40"
            onClick={goToMainNav}
          >
            <FontAwesomeIcon icon={faAngleLeft}></FontAwesomeIcon>
          </span>
          <Link
            className="chat-person"
            href={`#/profile/${activeChatProfile?.id}`}
          >
            <ProfileCard
              head={activeChatProfile?.name}
              headClass="font-bold"
              subHead="click here to view profile"
              imgSize={38}
            />
          </Link>
        </div>
      </header>
      <section className="relative h-full">
        <div
          id="messageArea"
          className="flex h-full select-none flex-col-reverse gap-1 overflow-y-auto scroll-smooth px-3 py-3 sm:px-5"
          tabIndex={-1}
        >
          {chatMsgs.map((msg, index: number) => (
            <Message
              key={index}
              msg={msg}
              originAsPrev={
                index < chatMsgs.length &&
                msg?.type === chatMsgs[index + 1]?.type
              }
            />
          ))}
        </div>
        <ScrollButton
          containerSelector="#messageArea"
          icon={faAnglesDown}
          scrollStartDirection="top-reverse"
        />
      </section>
      <div className="sticky bottom-0 left-0 right-0 rounded-md bg-gray-300 ring-1 ring-slate-500 ring-opacity-30 dark:bg-slate-900 dark:ring-slate-800">
        <form
          id="sendMessageForm"
          onSubmit={sendMessage}
          className="place-center grid grid-cols-[1fr_2.75rem]"
        >
          <textarea
            id="chatInputBox"
            className="scroll-hide h-full resize-none rounded-md border-none bg-transparent p-3 text-black outline-none dark:text-white"
            placeholder="Type a message here..."
            rows={1}
            onKeyDown={handleMsgInputKeyDown}
          ></textarea>
          <button
            type="submit"
            className="rounded-r-md px-2 text-lg outline-none focus-within:bg-black focus-within:text-white hover:bg-black hover:text-white active:bg-gray-800 active:text-white dark:text-white dark:focus-within:bg-white dark:focus-within:text-black dark:hover:bg-white dark:hover:text-black dark:active:bg-gray-300 dark:active:text-black"
          >
            <FontAwesomeIcon icon={faPaperPlane} />
          </button>
        </form>
      </div>
    </div>
  );
};

export default MessageArea;
