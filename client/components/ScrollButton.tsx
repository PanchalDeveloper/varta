"use client";

import {
  IconDefinition,
  faAngleDoubleUp,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRef, useEffect } from "react";

const ScrollButton = ({
  containerSelector,
  icon = faAngleDoubleUp,
  scrollStartDirection = "top",
  scrollDistance = 125,
}: {
  containerSelector: string;
  icon?: IconDefinition;
  scrollStartDirection?: string;
  scrollDistance?: number;
}) => {
  const btnRef = useRef<HTMLButtonElement>(null);

  const goToTop = () => {
    const container = document?.querySelector(containerSelector);
    if (scrollStartDirection === "bottom") {
      return container?.scrollTo(0, container.scrollHeight);
    }
    container?.scrollTo(0, 0);
  };

  useEffect(() => {
    const container = document?.querySelector(containerSelector);
    let hideScrollBtn = false;

    const checkScrollState = () => {
      if (!container) return;

      switch (scrollStartDirection) {
        case "top":
          hideScrollBtn = container.scrollTop <= scrollDistance;
          break;
        case "bottom":
          hideScrollBtn =
            container.scrollTop + container.clientHeight >=
            container.scrollHeight - scrollDistance;
          break;
        case "top-reverse":
          hideScrollBtn = container.scrollTop >= scrollDistance * -1;
          break;
        default:
          break;
      }

      btnRef.current?.classList.toggle("hidden", hideScrollBtn);
    };

    window?.addEventListener("load", checkScrollState);
    container?.addEventListener("scroll", checkScrollState);

    return () => {
      document?.removeEventListener("load", checkScrollState);
      container?.removeEventListener("scroll", checkScrollState);
    };
  }, []);

  return (
    <button
      className="absolute bottom-3 right-4 hidden cursor-pointer rounded-full bg-slate-100 p-2 text-black drop-shadow-lg dark:bg-slate-800 dark:text-white"
      ref={btnRef}
      onClick={goToTop}
    >
      <FontAwesomeIcon
        icon={icon}
        className="aspect-[3/2] text-gray-500 dark:text-white"
      ></FontAwesomeIcon>
    </button>
  );
};

export default ScrollButton;
