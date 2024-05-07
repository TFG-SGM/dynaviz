import { useParams } from "react-router-dom";
import { useData } from "../../hooks/useData";
import { TestData, axisData, testActual } from "../../utils/types";
import { TEST_ENDPOINT } from "../../utils/constants";
import { TestButtons } from "../buttons/TestButtons";
import {
  ChangeEvent,
  Dispatch,
  MouseEventHandler,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import { BodyPartsButtons } from "../buttons/BodyPartsButtons";
import { ActualChart } from "../elements/ActualChart";
import { TestMenuView } from "../menus/TestMenuView";
import { HelpMenu } from "../menus/HelpMenu";
import { Interrogation } from "../other/Icons";

export function TestContainer() {
  const { testId } = useParams();
  const [test] = useData<TestData>(TEST_ENDPOINT + testId);
  const [isHelpMenu, setIsHelpMenu] = useData<boolean>(false);
  const [actual, setActual] = useState<testActual>({
    chart: "line",
    axis: "xAxis",
    part1: "",
    part2: "",
  });

  useEffect(() => {
    if (test && test.data) {
      const partsKeys = Object.keys(test.data.parts);
      setActual((prevState) => ({
        ...prevState,
        part1: partsKeys[0],
        part2: partsKeys[1],
      }));

      const firstBodyPartButton = document.querySelector(`.body-part-button1`);
      const secondBodyPartButton = document.querySelector(`.body-part-button2`);
      firstBodyPartButton?.classList.add(`active-part1`);
      secondBodyPartButton?.classList.add(`active-part2`);
    }
  }, [test, actual.chart]);

  const [isViewing, setIsViewing] = useState(false);

  const handleChangeChart: MouseEventHandler<HTMLButtonElement> = (e) => {
    const target = e.target as HTMLElement;

    const activeButton = document.querySelector(".active-chart");
    const activePart1 = document.querySelector(".active-part1");
    const activePart2 = document.querySelector(".active-part2");
    const firstBodyPartButton = document.querySelector(`.body-part-button1`);
    const secondBodyPartButton = document.querySelector(`.body-part-button2`);

    activeButton?.classList.remove("active-chart");
    target.classList.add("active-chart");
    activePart1?.classList.remove("active-part1");
    activePart2?.classList.remove("active-part2");
    firstBodyPartButton?.classList.add(`active-part1`);
    secondBodyPartButton?.classList.add(`active-part2`);

    setActual(() => ({
      chart: target.id,
      axis: "xAxis",
      part1: "",
      part2: "",
    }));
  };

  const handleChangeAxis = (e: ChangeEvent<HTMLSelectElement>) => {
    setActual((prevState) => ({
      ...prevState,
      axis: e.target.value as axisData,
    }));
  };

  const handleChangePart1 = createButtonHandler("part1", setActual);
  const handleChangePart2 = createButtonHandler("part2", setActual);

  if (!test || !test.data) return;

  return (
    <>
      {isHelpMenu && (
        <HelpMenu
          chart={actual.chart}
          handleClean={() => setIsHelpMenu(false)}
        ></HelpMenu>
      )}
      {isViewing && (
        <TestMenuView
          test={test}
          handleClean={() => setIsViewing(false)}
        ></TestMenuView>
      )}
      <button
        className="test-details-button"
        onClick={() => setIsViewing(true)}
      >
        Consultar detalles
      </button>
      <div className="test-container">
        <TestButtons handleChangeChart={handleChangeChart}></TestButtons>
        <div className="body-parts-container">
          {isAxisChart(actual.chart) && (
            <label>
              Selecciona un eje:{" "}
              <select value={actual.axis} onChange={handleChangeAxis}>
                <option value="xAxis">Eje x</option>
                <option value="yAxis">Eje y</option>
              </select>
            </label>
          )}

          {isBodyPartsChart(actual.chart) && (
            <>
              {isCorrelationChart(actual.chart) ? (
                <p>Selecciona dos partes del cuerpo:</p>
              ) : (
                <p>Selecciona una parte del cuerpo:</p>
              )}

              <div>
                <BodyPartsButtons
                  parts={test.data.parts}
                  handleChangePart={handleChangePart1}
                ></BodyPartsButtons>

                {isCorrelationChart(actual.chart) && (
                  <BodyPartsButtons
                    parts={test.data.parts}
                    isPart2={true}
                    handleChangePart={handleChangePart2}
                  ></BodyPartsButtons>
                )}
              </div>
            </>
          )}
        </div>
        <div className="chart-container">
          <button className="help-button" onClick={() => setIsHelpMenu(true)}>
            <Interrogation></Interrogation>
          </button>
          <ActualChart actual={actual} data={test.data}></ActualChart>
        </div>
      </div>
    </>
  );
}

function isAxisChart(chart: string) {
  return (
    chart === "line" ||
    chart === "histogram" ||
    chart === "boxplot1" ||
    chart === "boxplot2" ||
    chart === "bubble" ||
    chart == "heatmap"
  );
}

function isBodyPartsChart(chart: string) {
  return (
    chart === "line" ||
    chart === "histogram" ||
    chart === "boxplot1" ||
    chart === "bubble" ||
    chart == "heatmap"
  );
}

function isCorrelationChart(chart: string) {
  return chart === "bubble" || chart == "heatmap";
}

const createButtonHandler = (
  part: string,
  setActual: Dispatch<SetStateAction<testActual>>
): MouseEventHandler<HTMLButtonElement> => {
  return (e) => {
    const target = e.target as HTMLElement;
    const classButton = target.classList;
    const activeButton = document.querySelector(`.active-${part}`);
    activeButton?.classList.remove(`active-${part}`);

    let newPart = "";
    if (classButton.contains(`active-${part}`)) {
      classButton.remove(`active-${part}`);
    } else {
      classButton.add(`active-${part}`);
      newPart = target.id;
    }

    setActual((prevState) => ({
      ...prevState,
      [part]: newPart,
    }));
  };
};
