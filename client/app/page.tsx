import ChatProfilesProvider from "@/contexts/ChatProfilesContexts";
import MainAreaLayout from "@/components/MainAreaLayout";
import { SocketProvider } from "@/contexts/SocketContexts";

const Home = () => {
  return (
    <SocketProvider>
      <ChatProfilesProvider>
        <MainAreaLayout />
      </ChatProfilesProvider>
    </SocketProvider>
  );
};

export default Home;
