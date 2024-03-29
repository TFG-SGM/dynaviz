import { MouseEventHandler } from "react";

export function EvolutionButtons({
  handleChangeChart,
}: {
  handleChangeChart: MouseEventHandler<HTMLButtonElement>;
}) {
  return (
    <div className="tests-buttons">
      <button id="line" className="active-chart" onClick={handleChangeChart}>
        Línea
      </button>
      <button id="bar" onClick={handleChangeChart}>
        Barras
      </button>
    </div>
  );
}
