"use client";

import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from "react";

export type NavMenuType = "chats" | "calls" | "status" | null;

export const NavMenuContext = createContext<NavMenuType>(null);
export const UpdateNavMenuContext = createContext<
  Dispatch<SetStateAction<NavMenuType>>
>(() => {});

export const useActiveNavMenu = () => useContext(NavMenuContext);
export const useUpdateActiveNavMenu = () => useContext(UpdateNavMenuContext);

export const NavMenuProvider = ({ children }: { children: ReactNode }) => {
  const [activeNavMenu, setActiveNavMenu] = useState<NavMenuType>("chats");

  return (
    <NavMenuContext.Provider value={activeNavMenu}>
      <UpdateNavMenuContext.Provider value={setActiveNavMenu}>
        {children}
      </UpdateNavMenuContext.Provider>
    </NavMenuContext.Provider>
  );
};

export default NavMenuProvider;
