import React, { useState } from "react";
import { usePopper } from "react-popper";

type Props = {};

function Filp({}: Props) {
  const [referenceFlipElement, setReferenceFlipElement] =
    useState<HTMLDivElement | null>(null);

  const [flipToolTip, setFlipToolTip] = useState<HTMLDivElement | null>(null);
  const [arrowFlipElement, setArrowFlipElement] =
    useState<HTMLDivElement | null>(null);

  const { styles, attributes } = usePopper(referenceFlipElement, flipToolTip, {
    placement: "auto",
    modifiers: [
      {
        name: "flip",
        options: {
          allowedAutoPlacements: ["top", "bottom", "right", "left"],
        },
      },
      {
        name: "offset",
        options: {
          offset: [0, 10],
        },
      },
      { name: "arrow", options: { element: arrowFlipElement } },
    ],
  });

  return (
    <div className="w-96 h-96 rounded-lg border-4 border-dotted overflow-auto  bg-white mx-auto mt-24 ">
      <div className="w-[800px] h-[800px] bg-slate-300 flex justify-center items-center">
        <div id="container">
          <div
            id="popcorn"
            aria-describedby="flipTooltip"
            ref={(ref) => setReferenceFlipElement(ref)}
          ></div>
          <div
            id="flipTooltip"
            ref={(ref) => setFlipToolTip(ref)}
            role="tooltip"
            style={styles.popper}
            {...attributes.popper}
          >
            <div>Popcorn</div>
            <div>New Item</div>
            <div
              id="arrow"
              data-popper-arrow
              style={styles.arrow}
              ref={(ref) => setArrowFlipElement(ref)}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Filp;
