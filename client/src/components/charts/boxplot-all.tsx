import ReactECharts from "echarts-for-react";
import { TestSubData } from "../../utils/types";
import { CHART_HEIGHT } from "../../utils/constants";
import { TestService } from "../../services/TestService";

export function BoxPlotAll({
  data,
  actualParts,
}: {
  data: TestSubData;
  actualParts: string[];
}) {
  const variations = Object.keys(data.parts).map((part) => {
    return {
      type: "boxplot",
      data: [TestService.getBoxPlotData(data.parts[part].variations)],
      name: part,
    };
  });
  console.log(variations);

  const option = {
    xAxis: {
      type: "category",
    },
    yAxis: {
      type: "value",
      name: "Desplazamiento",
    },
    tooltip: {
      trigger: "item",
      confine: true,
    },
    series: variations,
    legend: {
      orient: "vertical",
      right: 10,
      top: "center",
    },
  };

  return (
    <ReactECharts
      style={{ height: CHART_HEIGHT }}
      option={option}
    ></ReactECharts>
  );
}
