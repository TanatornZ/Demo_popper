import { Placement } from "@popperjs/core";
import React, { useState } from "react";
import Select from "react-select";
import { checkPosition } from "../utils/possition";
import BoxPopper from "./BoxPopper";

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

      <BoxPopper position={position} />
    </div>
  );
}

export default SelectPlacement;
