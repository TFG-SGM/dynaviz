import { useParams } from "react-router-dom";
import { useData } from "../../hooks/useData";
import { TestData } from "../../utils/types";
import { TEST_ENDPOINT } from "../../utils/constants";
import { LoadingComponent } from "../../components/other/LoadingComponent";
import { TestButtons } from "../../components/buttons/TestButtons";
import { MouseEventHandler, useState } from "react";
import { BodyPartsButtons } from "../../components/buttons/BodyPartsButtons";
import { ActualChart } from "../../components/elements/ActualChart";

import "../../assets/styles/testButtons.css";
import { TestMenuView } from "../../components/menus/TestMenuView";

interface actual {
  chart: string;
  parts: string[];
}

export function TestPage() {
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
    let newParts = [...actual.parts];

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

  if (!test || !test.data) return <LoadingComponent></LoadingComponent>;

  return (
    <>
      {isViewing && (
        <TestMenuView
          test={test}
          handleClean={() => setIsViewing(false)}
        ></TestMenuView>
      )}
      <h1>Prueba de Paciente</h1>
      <button onClick={() => setIsViewing(true)}>Consultar detalles</button>
      <TestButtons handleChangeChart={handleChangeChart}></TestButtons>
      <BodyPartsButtons
        parts={test.data.parts}
        handleChangePart={handleChangePart}
      ></BodyPartsButtons>
      <ActualChart actual={actual} data={test.data}></ActualChart>
    </>
  );
}
