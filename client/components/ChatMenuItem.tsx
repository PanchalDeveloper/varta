import ProfileCard from "./ProfileCard";

const ChatMenuItem = ({ ItemKey = 1 }: { ItemKey?: number | string }) => {
  return (
    <>
      <input
        className="chat-profile peer hidden"
        type="radio"
        name="chat_profile"
        id={`chatProfile_${ItemKey}`}
        value={`chatProfile_${ItemKey}`}
        defaultChecked={ItemKey === 1}
      />
      <label
        htmlFor={`chatProfile_${ItemKey}`}
        className="block cursor-pointer rounded-md px-3 py-2 ring-gray-800 ring-opacity-20 peer-checked:bg-gray-300 peer-checked:ring-1 dark:peer-checked:bg-slate-800"
      >
        <ProfileCard
          head={`Person ${ItemKey}`}
          subHead="Recent chat messages will be shown here..."
        />
      </label>
    </>
  );
};

export default ChatMenuItem;
