import { FormatChatText, IsSingleEmoji } from "@/utilities/TextUtilities";
import MessageStatusIcon from "./MessageStatusIcon";
import { ToChatMsgTime } from "@/utilities/DateTimeUtils";
import { ChatMsgType } from "@/contexts/ChatProfilesContexts";

const Message = ({
  msg,
  maxTxtLen = 500,
  originAsPrev = false,
}: {
  msg: ChatMsgType;
  maxTxtLen?: number;
  originAsPrev?: boolean;
}) => {
  const handleReadMoreClick = (e: any) => {
    const readMoreBtn = e.target;
    const msg = readMoreBtn.closest(".chat-msg");
    const msgMoreTxt = msg.querySelector(".more-msg");

    msgMoreTxt.classList.remove("hidden");
    msgMoreTxt.classList.remove("more-msg");
    readMoreBtn.classList.add("hidden");
  };

  return (
    <div
      className={`chat-msg w-full text-sm font-light text-black dark:text-white ${
        msg.type === "send"
          ? "text-end"
          : msg.type === "receive"
          ? "text-start"
          : "text-center"
      } ${originAsPrev ? "pt-0" : "pt-4"}`}
      data-same-prev-origin={originAsPrev}
    >
      <div
        className={`relative inline-block rounded-md p-2 ring-1 ring-slate-700 ring-opacity-20 sm:max-w-[75%] lg:max-w-[50%] ${
          msg.type === "send"
            ? "bg-green-600 bg-opacity-60 dark:bg-emerald-800"
            : msg.type === "receive"
            ? "bg-white dark:bg-slate-800"
            : msg.type === "warn"
            ? "bg-yellow-100 text-yellow-800 "
            : "bg-white dark:bg-slate-800"
        } ${
          msg.type === "send" || msg.type === "receive"
            ? "text-start"
            : "py-1 text-center text-xs font-normal"
        }`}
      >
        <span
          className={`line-clamp-[15] inline select-text whitespace-pre-wrap break-words ${
            msg.type === "send" || msg.type === "receive" ? "pe-[85px]" : ""
          } ${
            IsSingleEmoji(msg.content) // Check if string contains A single Emoji
              ? "text-4xl md:text-6xl"
              : ""
          }`}
        >
          {
            // Hide large text with "Read more" button
            msg.content.length <= maxTxtLen ? (
              FormatChatText(msg.content)
            ) : (
              <>
                {FormatChatText(msg.content).slice(0, maxTxtLen) + "..."}
                <span className="more-msg hidden">
                  {FormatChatText(msg.content).slice(maxTxtLen)}
                </span>
                <br />
                <span
                  className="cursor-pointer pt-1 text-sky-300 underline"
                  onClick={handleReadMoreClick}
                >
                  Read more
                </span>
              </>
            )
          }
        </span>
        {(msg.type === "send" || msg.type === "receive") && (
          <div className="absolute bottom-0.5 right-0.5 px-1">
            <span className="inline select-none whitespace-nowrap text-end text-[10px] text-gray-800 dark:text-gray-400">
              {ToChatMsgTime(msg.dt || new Date())} &ensp;
              {msg.type === "send" && <MessageStatusIcon status="seen" />}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default Message;
