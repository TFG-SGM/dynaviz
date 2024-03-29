import { useParams } from "react-router-dom";
import { useData } from "../../hooks/useData";
import { TestData } from "../../utils/types";
import { TEST_ENDPOINT } from "../../utils/constants";
import { TestButtons } from "../../components/buttons/TestButtons";
import { MouseEventHandler, useState } from "react";
import { BodyPartsButtons } from "../../components/buttons/BodyPartsButtons";
import { ActualChart } from "../../components/elements/ActualChart";
import { TestMenuView } from "../../components/menus/TestMenuView";

interface actual {
  chart: string;
  part1: string;
  part2: string;
}

export function TestContainer() {
  const { testId } = useParams();
  const [test] = useData<TestData>(TEST_ENDPOINT + testId);
  const [actual, setActual] = useState<actual>({
    chart: "line",
    part1: "",
    part2: "",
  });
  const [isViewing, setIsViewing] = useState(false);

  const handleChangeChart: MouseEventHandler<HTMLButtonElement> = (e) => {
    const target = e.target as HTMLElement;
    const activeButton = document.querySelector(".active-chart");
    const activePart1 = document.querySelector(".active-part1");
    const activePart2 = document.querySelector(".active-part2");

    activeButton?.classList.remove("active-chart");
    target.classList.add("active-chart");
    activePart1?.classList.remove("active-part1");
    activePart2?.classList.remove("active-part2");
    setActual(() => ({ chart: target.id, part1: "", part2: "" }));
  };

  const handleChangePart1 = createButtonHandler("part1", setActual);
  const handleChangePart2 = createButtonHandler("part2", setActual);

  if (!test || !test.data) return;

  return (
    <>
      <button
        className="test-details-button"
        onClick={() => setIsViewing(true)}
      >
        Consultar detalles
      </button>

      <div className="test-container">
        {isViewing && (
          <TestMenuView
            test={test}
            handleClean={() => setIsViewing(false)}
          ></TestMenuView>
        )}
        <TestButtons handleChangeChart={handleChangeChart}></TestButtons>
        <div className="body-parts-container">
          {isParts1(actual.chart) && (
            <BodyPartsButtons
              parts={test.data.parts}
              handleChangePart={handleChangePart1}
            ></BodyPartsButtons>
          )}

          {isParts2(actual.chart) && (
            <BodyPartsButtons
              parts={test.data.parts}
              handleChangePart={handleChangePart2}
            ></BodyPartsButtons>
          )}
        </div>
        <ActualChart actual={actual} data={test.data}></ActualChart>
      </div>
    </>
  );
}

function isParts1(chart: string) {
  return (
    chart === "line" ||
    chart === "histogram" ||
    chart == "boxplot1" ||
    chart === "bubble" ||
    chart === "heatmap"
  );
}

function isParts2(chart: string) {
  return chart === "bubble" || chart == "heatmap";
}

const createButtonHandler = (
  part,
  setActual
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
