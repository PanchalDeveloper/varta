import Image from "next/image";
import Link from "next/link";
import { useSocketID } from "@/contexts/SocketContexts";

const Header = ({ APP_NAME = "My App" }: { APP_NAME?: string }) => {
  const socketID = useSocketID();

  return (
    <div className="flex items-center justify-between rounded-md">
      <Link className="flex max-w-fit select-none items-center gap-2" href="/">
        <Image
          src="/images/logo-trans.png"
          width={40}
          height={40}
          className="rounded-lg"
          alt="App Logo"
          loading="eager"
        />
        <span className="text-xl font-bold">{APP_NAME}</span>
      </Link>
      <div></div>
      <div>
        <span className="pe-1 text-xs">
          <sub>{socketID && `Socket ID = ${socketID}`}</sub>
        </span>
      </div>
    </div>
  );
};

export default Header;
