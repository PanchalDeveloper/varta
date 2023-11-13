import SocketProvider from "@/contexts/SocketContexts";
import NavMenuProvider from "@/contexts/NavMenuContexts";
import ChatProfilesProvider from "@/contexts/ChatProfilesContexts";
import AppConfigsProvider from "@/contexts/AppConfigContext";
import MainAppLayout from "@/components/MainAppLayout";

const Home = () => {
  return (
    <AppConfigsProvider>
      <SocketProvider>
        <NavMenuProvider>
          <ChatProfilesProvider>
            <MainAppLayout />
          </ChatProfilesProvider>
        </NavMenuProvider>
      </SocketProvider>
    </AppConfigsProvider>
  );
};

export default Home;
