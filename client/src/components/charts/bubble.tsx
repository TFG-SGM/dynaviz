import ReactECharts from "echarts-for-react";
import { TestService } from "../../services/TestService";
import { TestSubData, axisData } from "../../utils/types";
import { CHART_HEIGHT } from "../../utils/constants";

export function BubbleChart({
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
    xAxis: {
      name: `Var. ${part1}`,
    },
    yAxis: {
      name: `Var. ${part2}`,
    },
    tooltip: {},
    series: [
      {
        data: TestService.getCorrelatedVariations(
          data.parts,
          axis,
          part1,
          part2
        ),
        type: "scatter",
        symbolSize: function (data: number[]) {
          return data[2] * 10;
        },
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
