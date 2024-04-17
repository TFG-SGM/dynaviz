import ReactECharts from "echarts-for-react";
import { TestSubData, axisData } from "../../utils/types";
import { CHART_HEIGHT } from "../../utils/constants";
import { TestService } from "../../services/TestService";

export function BoxPlotAll({
  data,
  axis,
}: {
  data: TestSubData;
  axis: axisData;
}) {
  const variations = Object.keys(data.parts).map((part) => {
    return {
      type: "boxplot",
      data: [TestService.getBoxPlotData(data.parts[part][axis].variations)],
      name: part,
    };
  });

  const option = {
    xAxis: {
      type: "category",
    },
    yAxis: {
      type: "value",
      name: "Variación",
    },
    tooltip: {
      trigger: "item",
      confine: true,
    },
    series: variations,
    legend: {
      top: "bottom",
      orient: "horizontal",
    },
  };

  return (
    <ReactECharts
      style={{ height: CHART_HEIGHT }}
      option={option}
    ></ReactECharts>
  );
}
