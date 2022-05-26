import { Placement, Rect } from "@popperjs/core";
import React, { useEffect, useRef, useState } from "react";
import { usePopper } from "react-popper";
import { hoverToShow } from "../utils/hoverToShow";

type Props = {
  position: Placement;
};

function BoxPopper({ position }: Props) {
  const [referenceElement, setReferenceElement] =
    useState<HTMLButtonElement | null>(null);
  
  const [popperElement, setPopperElement] =
    useState<HTMLElement | null>(null);


  const elementRef = useRef(null);
  const elementPopperRef = useRef(null);
  const elementArrowRef = useRef(null);

  useEffect(() => {
    setReferenceElement(elementRef.current);
    setPopperElement(elementPopperRef.current);

  }, []);



  //popper
  const { styles, attributes } = usePopper(
    referenceElement,
    popperElement,
    {
      placement: position,
      modifiers: [
        {
          name: "offset",
          options: {
            offset: [0, 8],
          },
        },
        {
          name: "arrow",
          options: {
            element: elementArrowRef.current,
            padding: ({popper: popperElement }) => popperElement.offsetWidth / 2
          },
        },
      ],
    }
  );

  hoverToShow(
    elementRef.current,
    elementPopperRef.current,
    elementArrowRef.current
  );

  return (
    <>
      <button
        className="p-5 rounded-lg bg-red-100 self-center my-12"
        ref={elementRef}
        aria-describedby="tooltip"
      >
        Hover to show popper
      </button>
      <div
        id="tooltip"
        role="tooltip"
        ref={elementPopperRef}
        style={styles.popper}
        {...attributes.popper}
      >
        popper
        <div
          id="arrow"
          ref={elementArrowRef}
          style={styles.arrow}
          data-popper-arrow
        ></div>
      </div>
    </>
  );
}

export default BoxPopper;
