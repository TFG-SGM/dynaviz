import ReactECharts from "echarts-for-react";
import { TestService } from "../../services/TestService";
import { TestSubData } from "../../utils/types";

export function RadarChart({ data }: { data: TestSubData }) {
  const option = {
    radar: {
      indicator: TestService.getBodyPartsForRadial(data.parts),
    },
    series: [
      {
        data: [
          {
            value: TestService.getBodyPartRestriction(data.parts),
          },
        ],
        type: "radar",
      },
    ],
    tooltip: {},
  };

  return <ReactECharts option={option}></ReactECharts>;
}
