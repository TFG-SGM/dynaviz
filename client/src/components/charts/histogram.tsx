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

  const uniqueAngles = TestService.getUniqueMovements(
    data.parts,
    actualParts[0]
  );
  const option = {
    xAxis: {
      type: "category",
      data: uniqueAngles,
    },
    yAxis: {
      type: "value",
    },
    tooltip: {},
    series: [
      {
        data: TestService.getRealCountMovements(
          data.parts,
          actualParts[0],
          uniqueAngles
        ),
        type: "bar",
      },
      {
        data: TestService.getIdealCountMovements(
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
