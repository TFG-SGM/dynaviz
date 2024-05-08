import ReactECharts from "echarts-for-react";
import { TestData } from "../../utils/types";
import { CHART_HEIGHT } from "../../utils/constants";

export function RadarEvolutionChart({ tests }: { tests: TestData[] }) {
  const processData = tests.map((test) => {
    if (!test.data) return null; // Ensure null is returned for tests without data
    return {
      date: test.date.split("T")[0],
      parts: Object.keys(test.data.parts).map((part) => ({
        name: part,
        restriction: test.data.parts[part].restriction,
      })),
    };
  });

  console.log(processData);

  const options = processData.map((data) => ({
    radar: {
      indicator: data.parts.map((part) => ({ text: part.name, max: 100 })),
      axisName: {
        color: "#444",
      },
    },
    series: [
      {
        name: `Restricciones del ${data.date}`,
        data: [
          {
            value: data.parts.map((part) => part.restriction),
          },
        ],
        type: "radar",
      },
    ],
    tooltip: {
      trigger: "item",
    },
  }));
  return (
    <div className="radar-evolution-charts">
      {options.map((option, index) => (
        <div>
          <h3>{processData[index].date}</h3>
          <ReactECharts
            key={index}
            style={{ height: CHART_HEIGHT }}
            option={option}
            notMerge={true}
          />
        </div>
      ))}
    </div>
  );
}
