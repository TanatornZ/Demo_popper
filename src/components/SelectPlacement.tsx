import { Placement } from "@popperjs/core";
import React, { useState } from "react";
import { usePopper } from "react-popper";
import Select from "react-select";
import { hoverToShow } from "../utils/hoverToShow";
import { checkPosition } from "../utils/possition";

type Props = {};

function SelectPlacement({}: Props) {
  const [option, setOption] = useState<string>("");
  const [position, setPosition] = useState<Placement>("top");

  const options = [
    { value: "top", label: "top" },
    { value: "top-start", label: "top-start" },
    { value: "top-end", label: "top-end" },
    { value: "right", label: "right" },
    { value: "right-start", label: "right-start" },
    { value: "right-end", label: "right-end" },
    { value: "left-end", label: "left-end" },
    { value: "left-start", label: "left-start" },
    { value: "left", label: "left" },
    { value: "bottom", label: "bottom" },
    { value: "bottom-start", label: "bottom-start" },
    { value: "bottom-end", label: "bottom-end" },
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

  hoverToShow(referenceElement, popperElement, arrowElement);

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
              const pos = checkPosition(option);
              if (pos) setPosition(pos);
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
