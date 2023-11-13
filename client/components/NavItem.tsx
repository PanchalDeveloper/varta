import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircle, IconDefinition } from "@fortawesome/free-solid-svg-icons";
import {
  NavMenuType,
  useActiveNavMenu,
  useUpdateActiveNavMenu,
} from "@/contexts/NavMenuContexts";
import { ChangeEvent } from "react";
import { Capitalize } from "@/utilities/TextUtilities";

const NavItem = ({
  ItemKey = 1,
  icon = faCircle,
}: {
  ItemKey?: number | string;
  icon?: IconDefinition;
}) => {
  const setActiveNavMenu = useUpdateActiveNavMenu();

  const handleNevMenuChange = (event: ChangeEvent<HTMLInputElement>) => {
    setActiveNavMenu((event.target?.value as NavMenuType) || null); // Update the ActiveNavMenu
  };
  return (
    <>
      <input
        className="nav-item peer hidden aspect-[3/2]"
        type="radio"
        name="nav_item"
        id={`navItem_${ItemKey}`}
        value={ItemKey}
        defaultChecked={ItemKey === "chat"}
        onChange={handleNevMenuChange}
      />
      <label
        htmlFor={`navItem_${ItemKey}`}
        className="flex w-full cursor-pointer items-center justify-center rounded-t-md bg-opacity-10 p-3 peer-checked:bg-slate-300 dark:peer-checked:bg-slate-900 sm:rounded-b-md sm:px-2 "
      >
        <FontAwesomeIcon icon={icon} />
      </label>
    </>
  );
};

export default NavItem;
