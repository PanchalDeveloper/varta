import { ChangeEvent } from "react";
import ProfileCard from "./ProfileCard";
import {
  useChatProfiles,
  useUpdateActiveChatProfile,
} from "@/contexts/ChatProfilesContexts";

const ChatMenuItem = ({
  cardHead = "Profile 1",
  cardSubHead = "",
  ItemKey = 1,
}: {
  cardHead?: string;
  cardSubHead?: string;
  ItemKey?: number | string;
}) => {
  const chatProfiles = useChatProfiles();
  const setActiveChatProfile = useUpdateActiveChatProfile();

  const handleChatProfileChange = (event: ChangeEvent<HTMLInputElement>) => {
    setActiveChatProfile(
      chatProfiles.filter(
        (x) => event.target.value === `ChatProfile_${x.id}`,
      )[0],
    ); // Update the ActiveChatProfile
  };

  return (
    <>
      <input
        className="chat-profile peer hidden"
        type="radio"
        name="chat_profile"
        id={`ChatProfile_${ItemKey}`}
        value={`ChatProfile_${ItemKey}`}
        onChange={handleChatProfileChange}
      />
      <label
        htmlFor={`ChatProfile_${ItemKey}`}
        className="block cursor-pointer rounded-md px-3 py-2 ring-gray-800 ring-opacity-20 peer-checked:bg-gray-300 peer-checked:ring-1 dark:peer-checked:bg-slate-800"
      >
        <ProfileCard head={cardHead} subHead={cardSubHead} />
      </label>
    </>
  );
};

export default ChatMenuItem;
