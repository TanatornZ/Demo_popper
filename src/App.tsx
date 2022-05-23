import React, { useEffect, useState } from "react";
import { usePopper } from "react-popper";
import "./App.css";
import Select from "react-select";
import { Placement } from "@popperjs/core";

function App() {
  const [option, setOption] = useState<string>("");
  const [position, setPosition] = useState<Placement>("top");

  const options = [
    { value: "top", label: "top" },
    { value: "right", label: "right" },
    { value: "left", label: "left" },
    { value: "bottom", label: "bottom" },
  ];

  useEffect(() => {
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
  }, [option]);

  const [referenceElement, setReferenceElement] =
    useState<HTMLButtonElement | null>(null);
  const [popperElement, setPopperElement] = useState<HTMLDivElement | null>(
    null
  );
  const [arrowElement, setArrowElement] = useState<HTMLDivElement | null>(null);

  const [showPopper, setShowPopper] = useState<boolean>(false);

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
      { name: "arrow", options: { element: arrowElement, padding: 10 } },
    ],
  });

  return (
    <div className="">
      <div className="container w-screen h-screen bg-slate-500 flex flex-col">
        <div className="w-36 h-36 mx-auto mt-12">
          <Select
            onChange={(e) => {
              const option = e?.value;
              if (option) setOption(option);
            }}
            defaultValue={options[0]}
            options={options}
          />
        </div>
        <button
          className="p-5 rounded-lg bg-white self-center"
          ref={(ref) => setReferenceElement(ref)}
          onClick={() => setShowPopper(!showPopper)}
        >
          click to show popper
        </button>
        <p
          className={`p-2 rounded-lg bg-green-400 ${!showPopper && "hidden"}`}
          ref={(ref) => setPopperElement(ref)}
          style={styles.popper}
          {...attributes.popper}
        >
          popper
          <div id='arrow' ref={(ref) => setArrowElement(ref)} style={styles.arrow}  />
        </p>
      </div>
    </div>
  );
}

export default App;
