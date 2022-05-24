import React, { useState } from "react";
import Downshift, { useSelect } from "downshift";
import { Placement } from "@popperjs/core";
import { usePopper } from "react-popper";

const items = ["top", "right", "bottom", "left"];

export const Ds = () => {
  const [position, setPosition] = useState<Placement>("top");
  const [referenceElement, setReferenceElement] =
    useState<HTMLButtonElement | null>(null);
  const [popperElement, setPopperElement] = useState<HTMLDivElement | null>(
    null
  );
  const [arrowElement, setArrowElement] = useState<HTMLDivElement | null>(null);

  //popper
  const { styles, attributes } = usePopper(referenceElement, popperElement, {
    placement: position,
    modifiers: [
      {
        name: "offset",
        options: {
          offset: [0, 8],
        },
      },
      { name: "arrow", options: { element: arrowElement, padding: 5 } },
    ],
  });

  const showToolTip = () => {
    popperElement?.setAttribute("data-show", "");
    arrowElement?.setAttribute("data-show", "");
  };

  const hideToolTip = () => {
    popperElement?.removeAttribute("data-show");
    arrowElement?.removeAttribute("data-show");
  };
  const showEvents = ["mouseenter", "focus"];
  const hideEvents = ["mouseleave", "blur"];

  showEvents.forEach((event) => {
    referenceElement?.addEventListener(event, showToolTip);
  });

  hideEvents.forEach((event) => {
    referenceElement?.addEventListener(event, hideToolTip);
  });

  const {
    isOpen,
    selectedItem,
    getToggleButtonProps,
    getLabelProps,
    getMenuProps,
    highlightedIndex,
    getItemProps,
  } = useSelect({
    items,
    selectedItem: position,
    onSelectedItemChange: (e) => {
      if (e.selectedItem) {
        switch (e.selectedItem) {
          case "left":
            return setPosition("left");
          case "right":
            return setPosition("right");
          case "top":
            return setPosition("top");

          case "bottom":
            return setPosition("bottom");
        }
      }
    },
  });

  return (
    <div className="mx-auto flex flex-col relative">
      <div className="">
        <label {...getLabelProps()} className="text-xl block">
          Choose an possition (downshift.js)
        </label>
        <button
          type="button"
          {...getToggleButtonProps()}
          className="p-2 mt-5 bg-white rounded-lg w-full"
        >
          {selectedItem || "click to select possition"}
        </button>
        <ul
          {...getMenuProps()}
          className="bg-white mt-2 rounded-lg overflow-hidden absolute  w-full"
        >
          {isOpen &&
            items.map((item, index) => (
              <li
                className=" p-2 text-center cursor-pointer"
                style={
                  highlightedIndex === index
                    ? { backgroundColor: "#bde4ff" }
                    : {}
                }
                key={`${index}`}
                {...getItemProps({ item, index })}
              >
                {item}
              </li>
            ))}
        </ul>
      </div>

     
        <button
          className="p-5 rounded-lg bg-red-100 self-center mx-auto my-12 "
          ref={(ref) => setReferenceElement(ref)}
          aria-describedby="tooltip"
        >
          Hover to show popper
        </button>
        <div
          id="tooltip"
          role="tooltip"
          ref={(ref) => setPopperElement(ref)}
          style={styles.popper}
          {...attributes.popper}
        >
          popper
            <div
              id="arrow"
              ref={(ref) => setArrowElement(ref)}
              style={styles.arrow}
              data-popper-arrow
            ></div>
          </div>
      
    </div>
  );
};