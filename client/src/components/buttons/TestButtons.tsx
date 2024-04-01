import { MouseEventHandler } from "react";

export function TestButtons({
  handleChangeChart,
}: {
  handleChangeChart: MouseEventHandler<HTMLButtonElement>;
}) {
  return (
    <div className="charts-buttons">
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
      <button id="boxplot1" onClick={handleChangeChart}>
        Cajas y Bigotes 1
      </button>
      <button id="boxplot2" onClick={handleChangeChart}>
        Cajas y Bigotes 2
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
