import { Placement } from "@popperjs/core";
import React, { useState } from "react";
import { usePopper } from "react-popper";
import { hoverToShow } from "../utils/hoverToShow";

type Props = {
  position: Placement;
};

function BoxPopper({ position }: Props) {
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

  hoverToShow(referenceElement, popperElement, arrowElement);
  return (
    <>
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
    </>
  );
}

export default BoxPopper;
