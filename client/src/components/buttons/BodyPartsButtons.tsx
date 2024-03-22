import { MouseEventHandler } from "react";
import { TestPartsData } from "../../utils/types";

import keyPoints from "../../assets/keyPoints.png";

export function BodyPartsButtons({
  parts,
  handleChangePart,
}: {
  parts: TestPartsData;
  handleChangePart: MouseEventHandler<HTMLButtonElement>;
}) {
  return (
    <div className="body-parts-buttons">
      {Object.keys(parts).map((key) => {
        return (
          <button key={key} id={key} onClick={handleChangePart}>
            {key}
          </button>
        );
      })}
    </div>
  );
}
