import { LineChart } from "../charts/line";
import { BarChart } from "../charts/bar";
import { RadarChart } from "../charts/radar";
import { PieChart } from "../charts/pie";
import { Histogram } from "../charts/histogram";
import { BubbleChart } from "../charts/bubble";
import { Heatmap } from "../charts/heatmap";
import { TestSubData } from "../../utils/types";
import { BoxPlot1 } from "../charts/boxplot1";

interface ActualChartProps {
  actual: { chart: string; parts: string[] };
  data: TestSubData;
}

export function ActualChart({ actual, data }: ActualChartProps) {
  const { chart, parts } = actual;
  switch (chart) {
    case "line":
      return <LineChart data={data} actualParts={parts} />;
    case "bar":
      return <BarChart data={data} />;
    case "radar":
      return <RadarChart data={data} />;
    case "pie":
      return <PieChart type="pie" data={data} />;
    case "treemap":
      return <PieChart type="treemap" data={data} />;
    case "histogram":
      return <Histogram data={data} actualParts={parts}></Histogram>;
    case "boxplot":
      return <BoxPlot1 data={data} actualParts={parts}></BoxPlot1>;
    case "bubble":
      return <BubbleChart data={data} actualParts={parts}></BubbleChart>;
    case "heatmap":
      return <Heatmap data={data} actualParts={parts}></Heatmap>;
    default:
      return <p>Cargando...</p>;
  }
}
