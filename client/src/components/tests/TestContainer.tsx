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
  parts: string[];
}

export function TestContainer() {
  const { testId } = useParams();
  const [test] = useData<TestData>(TEST_ENDPOINT + testId);
  const [actual, setActual] = useState<actual>({ chart: "line", parts: [] });
  const [isViewing, setIsViewing] = useState(false);

  const handleChangeChart: MouseEventHandler<HTMLButtonElement> = (e) => {
    const target = e.target as HTMLElement;
    const activeButton = document.querySelector(".active-chart");
    activeButton?.classList.remove("active-chart");
    target.classList.add("active-chart");
    setActual((prevState) => ({ ...prevState, chart: target.id }));
  };

  const handleChangePart: MouseEventHandler<HTMLButtonElement> = (e) => {
    const target = e.target as HTMLElement;
    const classButton = target.classList;

    let newParts: string[] = [];
    if (
      actual.chart === "line" ||
      actual.chart === "histogram" ||
      actual.chart === "boxplot"
    ) {
      const activeButtons = document.querySelectorAll(".active-part");
      activeButtons.forEach((button) => button.classList.remove("active-part"));
    } else {
      newParts = [...actual.parts];
    }

    if (classButton.contains("active-part")) {
      classButton.remove("active-part");
      newParts = newParts.filter((part) => part !== target.id);
    } else {
      classButton.add("active-part");
      newParts.push(target.id);
    }

    setActual((prevState) => ({
      ...prevState,
      parts: newParts,
    }));
  };

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
          <BodyPartsButtons
            parts={test.data.parts}
            handleChangePart={handleChangePart}
          ></BodyPartsButtons>
          {actual.chart === "bubble" ||
            (actual.chart === "heatmap" && (
              <BodyPartsButtons
                parts={test.data.parts}
                handleChangePart={handleChangePart}
              ></BodyPartsButtons>
            ))}
        </div>
        <ActualChart actual={actual} data={test.data}></ActualChart>
      </div>
    </>
  );
}
