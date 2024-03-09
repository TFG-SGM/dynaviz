import ReactECharts from "echarts-for-react";
import { TestService } from "../../services/TestService";
import { TestSubData } from "../../utils/types";

export function Histogram({
  data,
  actualParts,
}: {
  data: TestSubData;
  actualParts: string[];
}) {
  if (actualParts.length !== 1) return <p>Selecciona una parte del cuerpo</p>;

  const uniqueAngles = TestService.getUniqueAngles(data.parts, actualParts[0]);
  const option = {
    xAxis: {
      type: "category",
      data: uniqueAngles,
    },
    yAxis: {
      type: "value",
    },
    tooltip: {
      trigger: "item",
    },
    series: [
      {
        data: TestService.getRealCountAngles(
          data.parts,
          actualParts[0],
          uniqueAngles
        ),
        type: "bar",
      },
      {
        data: TestService.getIdealCountAngles(
          data.parts,
          actualParts[0],
          uniqueAngles
        ),
        type: "bar",
      },
    ],
  };

  return <ReactECharts option={option}></ReactECharts>;
}
