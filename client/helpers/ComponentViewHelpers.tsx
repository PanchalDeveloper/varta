import { Dispatch, SetStateAction } from "react";

export const changeViewHelper = (
  itemSelector: string,
  setStateFunc: Dispatch<SetStateAction<string>> | Function,
  events: string[] = ["change", "load"],
) => {
  const items = document?.querySelectorAll(itemSelector);

  // Function to change the given "State" (Passed to the EventListenter)
  const setStateVal = () => {
    const checkedItem = document?.querySelector(
      itemSelector + ":checked",
    ) as HTMLInputElement;
    setStateFunc(checkedItem?.value || "");

    console.log(`New value for "${checkedItem?.getAttribute("name")}" =`, {
      id: checkedItem?.id,
      value: checkedItem?.value,
    });
  };

  items?.forEach((item) => {
    events.forEach((event) => {
      if (event !== "load") {
        window.addEventListener(event, setStateVal);
      } else {
        item.addEventListener(event, setStateVal);
      }
    });
  });

  return () => {
    items?.forEach((item) => {
      events.forEach((event) => {
        if (event === "load") {
          window.removeEventListener(event, setStateVal);
        } else {
          item.removeEventListener(event, setStateVal);
        }
      });
    });
  };
};
