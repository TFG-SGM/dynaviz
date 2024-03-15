import { MouseEventHandler } from "react";
import { TestPartsData } from "../../utils/types";

export function BodyPartsButtons({
  parts,
  handleChangePart,
}: {
  parts: TestPartsData;
  handleChangePart: MouseEventHandler<HTMLButtonElement>;
}) {
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
    </div>
  );
}
