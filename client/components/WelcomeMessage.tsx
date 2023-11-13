import { useAppConfigs } from "@/contexts/AppConfigContext";
import Image from "next/image";

const WelcomeMessage = () => {
  const { APP_NAME, APP_DESCRIPTION } = useAppConfigs();
  return (
    <div className="flex h-full flex-col items-center justify-center p-4">
      <Image
        src={"/images/logo-hr.png"}
        height={250}
        width={280}
        alt="App Logo"
        className="max-h-[35svh] w-auto pb-3"
        loading="eager"
      />
      <h1 className="mb-3 text-center text-xl font-semibold">
        Welcome to <strong>{APP_NAME}</strong>!
      </h1>
      <p className="mb-3 line-clamp-2 text-center text-xs font-medium text-gray-600 dark:text-gray-300 sm:text-sm">
        {APP_DESCRIPTION}
      </p>
    </div>
  );
};

export default WelcomeMessage;
