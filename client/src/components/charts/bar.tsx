import ReactECharts from "echarts-for-react";
import { TestService } from "../../services/TestService";
import { TestSubData } from "../../utils/types";

export function BarChart({ data }: { data: TestSubData }) {
  const option = {
    xAxis: {
      type: "category",
      data: TestService.getBodyParts(data.parts),
    },
    yAxis: {
      type: "value",
    },
    series: [
      {
        data: TestService.getBodyPartQuality(data.parts),
        type: "bar",
      },
    ],
    tooltip: {},
  };

  return <ReactECharts option={option}></ReactECharts>;
}
