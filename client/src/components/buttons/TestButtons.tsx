import { MouseEventHandler } from "react";

export function TestButtons({
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
      <button id="radar" onClick={handleChangeChart}>
        Radar
      </button>
      <button id="pie" onClick={handleChangeChart}>
        Pastel
      </button>
      <button id="treemap" onClick={handleChangeChart}>
        Mapa de árbol
      </button>
      <button id="histogram" onClick={handleChangeChart}>
        Histograma
      </button>
      <button id="boxplot" onClick={handleChangeChart}>
        Boxplot
      </button>
      <button id="bubble" onClick={handleChangeChart}>
        Burbujas
      </button>
      <button id="heatmap" onClick={handleChangeChart}>
        Mapa de calor
      </button>
    </div>
  );
}
