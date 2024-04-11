import { MouseEventHandler } from "react";
import { TestPartsData } from "../../utils/types";

export function BodyPartsButtons({
  parts,
  handleChangePart,
  isPart2,
}: {
  parts: TestPartsData | null;
  handleChangePart: MouseEventHandler<HTMLButtonElement>;
  isPart2?: boolean;
}) {
  const buttonClass = !isPart2 ? "body-part-button1" : "body-part-button2";
  if (!parts) return;
  return (
    <div className="body-parts-buttons">
      {Object.keys(parts).map((key, index) => {
        return (
          <button
            className={
              index === 0 && !isPart2
                ? `${buttonClass}`
                : index === 1 && isPart2
                ? `${buttonClass}`
                : ""
            }
            key={key}
            id={key}
            onClick={handleChangePart}
          >
            {key}
          </button>
        );
      })}
    </div>
  );
}
