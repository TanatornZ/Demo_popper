import React, { useEffect, useState } from "react";
import { usePopper } from "react-popper";
import "./App.css";
import Select from "react-select";
import { Placement } from "@popperjs/core";
import Filp from "./components/Filp";

function App() {
  const [option, setOption] = useState<string>("");
  const [position, setPosition] = useState<Placement>("top");
  const [showPopper, setShowPopper] = useState<boolean>(false);

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
          offset: [0, 5],
        },
      },
      { name: "arrow", options: { element: arrowElement, padding: 5 } },
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
    <div className=" w-screen h-screen bg-slate-500 flex flex-col">
      <div className="w-48 h-36 mx-auto mt-12">

        <p className='text-center my-3 text-white'>select hover possition</p>
        <Select
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
        className="p-5 rounded-lg bg-red-100 self-center"
        ref={(ref) => setReferenceElement(ref)}
        aria-describedby="tooltip"
      >
        Hover to show popper
      </button>
      <div
        id="tooltip"
        role='tooltip'
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

      <Filp />
    </div>
  );
}

export default App;
