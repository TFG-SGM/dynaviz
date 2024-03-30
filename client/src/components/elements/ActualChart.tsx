import { LineChart } from "../charts/line";
import { BarChart } from "../charts/bar";
import { RadarChart } from "../charts/radar";
import { PieChart } from "../charts/pie";
import { Histogram } from "../charts/histogram";
import { BubbleChart } from "../charts/bubble";
import { Heatmap } from "../charts/heatmap";
import { TestSubData, testActual } from "../../utils/types";
import { BoxPlot } from "../charts/boxplot";
import { BoxPlotAll } from "../charts/boxplot-all";

interface ActualChartProps {
  actual: testActual;
  data: TestSubData;
}

export function ActualChart({ actual, data }: ActualChartProps) {
  const { chart, part1, part2 } = actual;
  switch (chart) {
    case "line":
      return <LineChart data={data} part={part1} />;
    case "bar":
      return <BarChart data={data} />;
    case "radar":
      return <RadarChart data={data} />;
    case "pie":
      return <PieChart type="pie" data={data} />;
    case "treemap":
      return <PieChart type="treemap" data={data} />;
    case "histogram":
      return <Histogram data={data} part={part1}></Histogram>;
    case "boxplot1":
      return <BoxPlot data={data} part={part1}></BoxPlot>;
    case "boxplot2":
      return <BoxPlotAll data={data}></BoxPlotAll>;
    case "bubble":
      return (
        <BubbleChart data={data} part1={part1} part2={part2}></BubbleChart>
      );
    case "heatmap":
      return <Heatmap data={data} part1={part1} part2={part2}></Heatmap>;
    default:
      return;
  }
}
