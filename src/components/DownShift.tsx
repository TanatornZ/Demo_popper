import React, { useRef, useState } from "react";
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
  const [selectPosition, setSelectPosition] = useState<string>("top");
  const box = useRef<HTMLDivElement | null>(null);

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

  const boxTop = box.current?.offsetTop;

  if (boxTop) {
    window.addEventListener("scroll", () => {
      if (window.scrollY + window.innerHeight - 256 < boxTop) {
        setSelectPosition("bottom");
      } else {
        setSelectPosition("top");
      }
    });
  }

  return (
    <div className="mx-auto flex flex-col ">
      <div className="">
        <label {...getLabelProps()} className="text-xl block">
          Choose an possition (downshift.js)
        </label>
        <div className="relative" ref={box}>
          <button
            type="button"
            {...getToggleButtonProps()}
            className="p-2 mt-5 bg-white rounded-lg w-full"
          >
            {selectedItem || "click to select possition"}
          </button>
          <ul
            {...getMenuProps()}
            className={`mt-2 rounded-lg  overflow-auto  absolute w-full z-10 ${
              selectPosition === "top" ? "top-16" : "bottom-16"
            }`}
            style={isOpen ? { height: "200px", backgroundColor: "#fff" } : {}}
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
      </div>

      <BoxPopper position={position} />
    </div>
  );
};
