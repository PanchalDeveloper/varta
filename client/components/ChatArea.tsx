"use client";

import { FormEvent, useState, KeyboardEvent } from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane, faAnglesDown } from "@fortawesome/free-solid-svg-icons";
import Message from "./Message";
import { FormatChatText } from "@/helpers/TextFormatter";
import ScrollButton from "./ScrollButton";
import ProfileCard from "./ProfileCard";

const ChatArea = () => {
  const [messages, setMessages] = useState<string[]>(() =>
    Array.from({ length: 45 }, (_, i) => "Message " + (i + 1)),
  );

  const sendMessage = (e: FormEvent<HTMLFormElement> | KeyboardEvent): void => {
    e.preventDefault();
    const msgField = document.getElementById(
      "chatInputBox",
    ) as HTMLInputElement;
    let msg = FormatChatText(msgField?.value);

    if (!msgField || !msg) return;

    msgField.value = "";

    setMessages((prevMessages: Array<string>) => [...prevMessages, msg]);
  };

  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.ctrlKey && event.key === "Enter") sendMessage(event);
  };
  return (
    <div className="grid h-full grid-cols-1 grid-rows-[4rem_calc(100vh-7.5rem-3rem)_3rem] justify-center overflow-hidden rounded-lg bg-gray-300 dark:bg-slate-700">
      <header className="flex select-none justify-between bg-gray-300 p-2 drop-shadow-xl dark:bg-slate-900">
        <Link
          className="chat-person flex items-center justify-center gap-2"
          href={"/#person-1"}
        >
          <ProfileCard
            head={"Persone 1"}
            headClass="font-bold"
            subHead="click here to view profile"
            imgSize={38}
          />
        </Link>
      </header>
      <section className="relative h-full">
        <div
          id="messageArea"
          className="flex h-full select-none flex-col-reverse gap-1 overflow-y-auto scroll-smooth px-5 py-3"
          tabIndex={-1}
        >
          {[...messages].reverse().map((msg: string, index: number) => (
            <Message
              key={index}
              type={
                index % 2 == 0 ? "send" : index % 3 == 0 ? "warn" : "receive"
              }
              content={msg.trim()}
            />
          ))}
        </div>
        <ScrollButton
          containerSelector="#messageArea"
          icon={faAnglesDown}
          scrollStartDirection="top-reverse"
        />
      </section>
      <div className="rounded-md bg-gray-300 ring-1 ring-slate-500 ring-opacity-30 dark:bg-slate-900 dark:ring-slate-800">
        <form
          id="sendMessageForm"
          onSubmit={sendMessage}
          className="place-center grid grid-cols-[1fr_2.75rem]"
        >
          <textarea
            id="chatInputBox"
            className="h-full resize-none rounded-md border-none bg-transparent p-3 text-black outline-none dark:text-white"
            placeholder="Type a message here..."
            rows={1}
            onKeyDown={handleKeyDown}
          ></textarea>
          <button
            type="submit"
            className="rounded-r-md px-2 text-lg outline-none focus-within:bg-black focus-within:text-white hover:bg-black hover:text-white dark:text-white dark:focus-within:bg-white dark:focus-within:text-black dark:hover:bg-white dark:hover:text-black"
          >
            <FontAwesomeIcon icon={faPaperPlane} />
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChatArea;
