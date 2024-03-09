import { useParams } from "react-router-dom";
import { useData } from "../hooks/useData";
import { TestData } from "../utils/types";
import { TEST_ENDPOINT } from "../utils/constants";
import { LoadingComponent } from "../components/other/LoadingComponent";
import { TestButtons } from "../components/tests/TestButtons";
import { MouseEventHandler, useState } from "react";
import { BodyPartsButtons } from "../components/tests/BodyPartsButtons";
import { ActualChart } from "../components/tests/ActualChart";

import "../assets/styles/testButtons.css";

interface actual {
  chart: string;
  parts: string[];
}

export function TestPage() {
  const { testId } = useParams();
  const [test] = useData<TestData>(TEST_ENDPOINT + testId);
  const [actual, setActual] = useState<actual>({ chart: "line", parts: [] });

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

  if (!test) return <LoadingComponent></LoadingComponent>;

  return (
    <>
      <h1>Prueba del {test.date}</h1>
      <TestButtons handleChangeChart={handleChangeChart}></TestButtons>
      <BodyPartsButtons
        parts={test.data.parts}
        handleChangePart={handleChangePart}
      ></BodyPartsButtons>
      <ActualChart actual={actual} data={test.data}></ActualChart>
    </>
  );
}
