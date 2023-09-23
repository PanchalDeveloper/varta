import MessageStatusIcon from "./MessageStatusIcon";

const Message = ({
  content,
  type = "send",
  prevOriginSame = false,
  status = "seen",
}: {
  content: string;
  type?: "send" | "receive" | "notify" | "warn";
  status?: "sent" | "arrived" | "seen";
  prevOriginSame?: boolean;
}) => {
  return (
    <div
      className={`chat-msg w-full text-sm font-medium text-black dark:text-white ${
        type === "send"
          ? "text-end"
          : type === "receive"
          ? "text-start"
          : "text-center"
      } ${prevOriginSame === true ? "pt-0" : "pt-4"}`}
    >
      <div
        className={`relative inline-block max-w-[90%] rounded-md p-2 ring-1 ring-slate-700 ring-opacity-20 ${
          type === "send"
            ? "bg-green-600 bg-opacity-60 dark:bg-emerald-800"
            : type === "receive"
            ? "bg-white dark:bg-slate-800"
            : type === "warn"
            ? "bg-yellow-100 text-yellow-800 "
            : "bg-white dark:bg-slate-800"
        } ${
          type === "send" || type === "receive"
            ? "text-start"
            : "py-1 text-center text-xs font-normal"
        }`}
      >
        <span
          className={`line-clamp-[15] inline select-text whitespace-pre-wrap ${
            type === "send" || type === "receive" ? "pe-[85px]" : ""
          } ${
            content.length === 2 && /\p{Extended_Pictographic}/u.test(content) // Check if string contains A single Emoji
              ? "text-4xl md:text-6xl"
              : ""
          }`}
        >
          {content}
        </span>
        {(type === "send" || type === "receive") && (
          <div className="absolute bottom-0.5 right-0.5 px-1">
            <span className="inline select-none whitespace-nowrap text-[10px] text-gray-800 dark:text-gray-400">
              00:00 am &ensp;
              <MessageStatusIcon
                className={`inline ${
                  status === "seen" ? "text-blue-500" : "text-gray-600"
                }`}
              />
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default Message;
