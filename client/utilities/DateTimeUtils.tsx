import { formatDistance, subDays } from "date-fns";

export const ToChatMsgTime = (date: Date): string => {
  const locales = "en-US";
  const options = {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  };
  // @ts-ignore
  const formatter = new Intl.DateTimeFormat(locales, options);

  return formatter?.format(date)?.toLowerCase() || "00:00 am"; // return the formatted date as string
};
