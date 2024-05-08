import { MouseEventHandler } from "react";

export function EvolutionButtons({
  handleChangeChart,
}: {
  handleChangeChart: MouseEventHandler<HTMLButtonElement>;
}) {
  return (
    <div className="charts-buttons">
      <button id="line" className="active-chart" onClick={handleChangeChart}>
        Líneas
      </button>
      <button id="bar" onClick={handleChangeChart}>
        Barras
      </button>
      <button id="radar" onClick={handleChangeChart}>
        Radar
      </button>
    </div>
  );
}
