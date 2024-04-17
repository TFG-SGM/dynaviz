import ReactECharts from "echarts-for-react";
import { TestService } from "../../services/TestService";
import { TestSubData, axisData } from "../../utils/types";
import { CHART_HEIGHT } from "../../utils/constants";

export function Histogram({
  data,
  axis,
  part,
}: {
  data: TestSubData;
  axis: axisData;
  part: string;
}) {
  if (part === "") return;

  const uniqueVariations = TestService.getUniqueVariations(
    data.parts,
    axis,
    part
  );
  const option = {
    xAxis: {
      name: "Variación",
      type: "category",
      data: uniqueVariations,
    },
    yAxis: {
      name: "Número de veces",
      type: "value",
    },
    tooltip: {},
    series: [
      {
        data: TestService.getVariationsCount(
          data.parts,
          axis,
          part,
          uniqueVariations
        ),
        type: "bar",
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
