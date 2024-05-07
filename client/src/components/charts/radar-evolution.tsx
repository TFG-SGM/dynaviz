import ReactECharts from "echarts-for-react";
import { useEffect, useState } from "react";
import { TestData, TestSubData, evolutionActual } from "../../utils/types";
import { CHART_HEIGHT } from "../../utils/constants";

export function RadarEvolutionChart({
  tests,
  actual,
}: {
  tests: TestData[];
  actual: evolutionActual;
}) {
  const [data, setData] = useState<{
    dates: string[];
    restrictionSeries: object;
  }>({
    dates: [],
    restrictionSeries: {},
  });

  useEffect(() => {
    const newDates: string[] = [];
    const newRestrictions: { [key: string]: number[] } = {};

    if (actual.parts.length === 0) {
      newRestrictions["Restricción de movimiento total"] = [];
    } else {
      actual.parts.forEach((part: string) => {
        newRestrictions[part] = [];
      });
    }

    tests.forEach((test) => {
      if (test.data) {
        if (actual.parts.length === 0)
          newRestrictions["Restricción de movimiento total"].push(
            test.data.restriction
          );
        else if (test.data.parts) {
          Object.keys(test.data.parts).forEach((part) => {
            if (part in newRestrictions)
              newRestrictions[part] = [
                ...(newRestrictions[part] ?? []),
                (test.data as TestSubData).parts[part].restriction,
              ];
          });
        }
        newDates.push(test.date.split("T")[0]);
      }
    });

    const restrictionSeries = Object.keys(newRestrictions).map((key) => {
      return {
        data: newRestrictions[key],
        name: key,
      };
    });

    setData({
      dates: newDates,
      restrictionSeries: restrictionSeries,
    });
  }, [tests, actual.parts, actual.chart]);

  const options = data.dates.map((date, index) => {
    return {
      radar: {
        indicator: Object.keys(data.restrictionSeries).map((key) => ({
          name: data.restrictionSeries[key].name,
        })),
        axisName: {
          color: "#444",
        },
      },
      series: [
        {
          name: date,
          data: [
            {
              value: Object.keys(data.restrictionSeries).map(
                (key) => data.restrictionSeries[key].data[index]
              ),
            },
          ],
          type: "radar",
        },
      ],
      tooltip: {
        trigger: "item",
      },
    };
  });

  return (
    <div className="radar-evolution-charts">
      {options.map((option, index) => (
        <div>
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
