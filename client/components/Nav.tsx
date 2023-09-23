import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCirclePlay,
  faMessage,
  faPhone,
  faRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";
import NavItem from "./NavItem";
import Link from "next/link";

const Nav = () => {
  const navMenuList = [
    { value: "chat", icon: faMessage },
    { value: "call", icon: faPhone },
    { value: "status", icon: faCirclePlay },
  ];

  return (
    <div className="flex items-center justify-between gap-24 rounded-md text-3xl sm:flex-col sm:pb-2 sm:text-xl">
      <ul className="flex flex-auto sm:block">
        {navMenuList.map((item, i) => (
          <li key={i} className="basis-full sm:pt-3">
            <NavItem ItemKey={i + 1} ItemVal={item.value} icon={item.icon} />
          </li>
        ))}
      </ul>
      <ul className="hidden sm:block">
        <li className="px-2 sm:pt-3">
          <Link href={"/#logout"}>
            <FontAwesomeIcon
              icon={faRightFromBracket}
              className="cursor-pointer"
            />
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Nav;
