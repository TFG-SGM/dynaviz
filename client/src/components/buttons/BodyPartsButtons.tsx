import { MouseEventHandler } from "react";
import { TestPartsData } from "../../utils/types";

import keyPoints from "../../assets/img/keyPoints.png";

export function BodyPartsButtons({
  parts,
  handleChangePart,
}: {
  parts: TestPartsData;
  handleChangePart: MouseEventHandler<HTMLButtonElement>;
}) {
  const handleMouse = (e) => {
    console.log(e);
  };
  return (
    <div>
      {Object.keys(parts).map((key) => {
        return (
          <button key={key} id={key} onClick={handleChangePart}>
            {key}
          </button>
        );
      })}
      <hr></hr>
      <div className="key-points">
        <img src={keyPoints} width="400px" height="400px"></img>
        <svg viewBox="0 0 400 400" onMouseDown={handleMouse}>
          /* rodillas */
          <circle cx="144" cy="280" r="5"></circle>
          <circle cx="270" cy="280" r="5"></circle>
        </svg>
      </div>
    </div>
  );
}
