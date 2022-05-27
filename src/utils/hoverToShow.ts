import { State } from "@popperjs/core";

export const hoverToShow = (
  ref: HTMLButtonElement | null,
  tooltip: HTMLDivElement | null,
  arrow: HTMLDivElement | null,
) => {
  const showToolTip = () => {
    tooltip?.setAttribute("data-show", "");
    arrow?.setAttribute("data-show", "");
  };

  const hideToolTip = () => {
    tooltip?.removeAttribute("data-show");
    arrow?.removeAttribute("data-show");
  };
  const showEvents = ["mouseenter", "focus"];
  const hideEvents = ["mouseleave", "blur"];

  showEvents.forEach((event) => {
    ref?.addEventListener(event, showToolTip);
  });

  hideEvents.forEach((event) => {
    ref?.addEventListener(event, hideToolTip);
  });

 
};
