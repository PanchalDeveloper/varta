import { useSocketID } from "@/contexts/SocketContext";

const AppInfo = () => {
  const socketID = useSocketID();

  return (
    <div className="flex h-full flex-col items-center justify-center">
      <h1 className="mb-3 text-center text-lg font-bold">
        Welcome to Varta! [Client]
      </h1>
      <p>Socket ID = {socketID}</p>
    </div>
  );
};

export default AppInfo;
