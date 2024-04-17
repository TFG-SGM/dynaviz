import ReactECharts from "echarts-for-react";
import { TestService } from "../../services/TestService";
import { TestSubData, axisData } from "../../utils/types";
import { CHART_HEIGHT } from "../../utils/constants";

export function Heatmap({
  data,
  axis,
  part1,
  part2,
}: {
  data: TestSubData;
  axis: axisData;
  part1: string;
  part2: string;
}) {
  if (part1 === "" || part2 === "") return;

  const option = {
    tooltip: {
      position: "top",
    },
    animation: false,
    grid: {
      height: "50%",
      top: "10%",
    },
    xAxis: {
      name: `Var. ${part1}`,
      type: "category",
    },
    yAxis: {
      name: `Var. ${part2}`,
      type: "category",
    },
    visualMap: {
      min: 0,
      max: 10,
      calculable: true,
      orient: "horizontal",
      left: "center",
      bottom: "15%",
    },
    series: [
      {
        type: "heatmap",
        data: TestService.getCorrelatedVariations(
          data.parts,
          axis,
          part1,
          part2
        ),
      },
    ],
  };

  return (
    <ReactECharts
      style={{ height: CHART_HEIGHT }}
      option={option}
    ></ReactECharts>
  );
}
