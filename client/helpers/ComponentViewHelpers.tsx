import { Dispatch, SetStateAction } from "react";

export const changeViewHelper = (
  itemSelector: string,
  stateSetFunc: Dispatch<SetStateAction<string>>,
  events: string[] = ["change", "load"],
) => {
  const items = document?.querySelectorAll(itemSelector);

  console.log(`Added EventListeners for `, items);

  // Function to change the given "State" (Passed to the EventListenter)
  const setStateVal = () => {
    const checkedItem = document?.querySelector(
      itemSelector + ":checked",
    ) as HTMLInputElement;
    stateSetFunc(checkedItem?.value || "");
    console.log(`New value for ${checkedItem?.id} ==`, checkedItem?.value);
  };

  items?.forEach((item) => {
    events.forEach((event) => {
      if (event === "load") {
        window.addEventListener(event, setStateVal);
        return;
      }
      item.addEventListener(event, setStateVal);
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
