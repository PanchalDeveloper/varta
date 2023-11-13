export const Capitalize = (str: string): string =>
  str[0].toUpperCase() + str.slice(1).toLowerCase;

export const FormatChatText = (str: string) => {
  str = str?.trim();
  return str;
};

export const IsSingleEmoji = (str: string): boolean =>
  str.length === 2 && /\p{Extended_Pictographic}/u.test(str);
