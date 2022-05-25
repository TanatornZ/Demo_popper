import React, { useState } from "react";
import { useSelect } from "downshift";
import { Placement } from "@popperjs/core";
import { checkPosition } from "../utils/possition";
import BoxPopper from "./BoxPopper";

const items = [
  "top",
  "top-start",
  "top-end",
  "right",
  "right-start",
  "right-end",
  "bottom",
  "bottom-start",
  "bottom-end",
  "left",
  "left-start",
  "left-end",
];

export const Ds = () => {
  const [position, setPosition] = useState<Placement>("top");

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
        const pos = checkPosition(e.selectedItem);
        if (pos) setPosition(pos);
      }
    },
  });

  return (
    <div className="mx-auto flex flex-col ">
      <div className="relative">
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
          className="mt-2 rounded-lg  overflow-auto absolute  w-full"
          style={isOpen ? { height: "150px", backgroundColor: "#fff" } : {}}
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

      <BoxPopper position={position} />
    </div>
  );
};
