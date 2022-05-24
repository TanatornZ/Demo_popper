import { Placement } from "@popperjs/core";
import React, { useState } from "react";
import { usePopper } from "react-popper";
import Select from "react-select";

type Props = {};

function SelectPlacement({}: Props) {
  const [option, setOption] = useState<string>("");
  const [position, setPosition] = useState<Placement>("top");

  const options = [
    { value: "top", label: "top" },
    { value: "right", label: "right" },
    { value: "left", label: "left" },
    { value: "bottom", label: "bottom" },
  ];

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
      {
        name: "preventOverflow",
        options: {
          mainAxis: false, // true by default
        },
      },
    ],
  });

  const showToolTip = () => {
    popperElement?.setAttribute("data-show", "");
  };

  const hideToolTip = () => {
    popperElement?.removeAttribute("data-show");
  };
  const showEvents = ["mouseenter", "focus"];
  const hideEvents = ["mouseleave", "blur"];

  showEvents.forEach((event) => {
    referenceElement?.addEventListener(event, showToolTip);
  });

  hideEvents.forEach((event) => {
    referenceElement?.addEventListener(event, hideToolTip);
  });

  return (
    <div className="mx-auto  flex flex-col ">
      <div className="">
        <p className="text-centertext-white text-xl ">
          select hover possition(react-select)
        </p>
        <Select
          className="mt-5"
          onChange={(e) => {
            const option = e?.value;
            if (option) {
              setOption(option);
              switch (option) {
                case "left":
                  setPosition("left");
                  break;
                case "right":
                  setPosition("right");
                  break;
                case "top":
                  setPosition("top");
                  break;
                case "bottom":
                  setPosition("bottom");
                  break;
              }
            }
          }}
          defaultValue={options[0]}
          options={options}
        />
      </div>
      <button
        className="p-5 rounded-lg bg-red-100 self-center my-12"
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
}

export default SelectPlacement;
