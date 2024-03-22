import { useData } from "../../hooks/useData";
import { TEST_ENDPOINT, TEST_TYPE_ENDPOINT } from "../../utils/constants";
import { ChangeEvent, MouseEventHandler, useState } from "react";
import { EvolutionChart } from "../../components/charts/evolution";
import { TestData } from "../../utils/types";
import { SelectType } from "../selects/SelectType";
import { BodyPartsButtons } from "../buttons/BodyPartsButtons";
import { EvolutionButtons } from "../buttons/EvolutionButtons";

interface actual {
  chart: string;
  parts: string[];
}

export function TestEvolutionContainer() {
  const [actual, setActual] = useState<actual>({ chart: "line", parts: [] });
  const [typeId, setTypeId] = useState("");
  const [tests] = useData<TestData[]>(
    TEST_ENDPOINT + "?patientId=" + "&typeId=" + typeId
  );

  const handleChangeChart: MouseEventHandler<HTMLButtonElement> = (e) => {
    const target = e.target as HTMLElement;
    const activeButton = document.querySelector(".active-chart");
    activeButton?.classList.remove("active-chart");
    target.classList.add("active-chart");
    setActual((prevState) => ({ ...prevState, chart: target.id }));
  };

  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.target;

    setTypeId(value);
  };

  if (!tests) return;

  return (
    <div className="test-evolution-container">
      <SelectType
        option={"typeId"}
        value={typeId}
        endpoint={TEST_TYPE_ENDPOINT}
        handleChange={handleChange}
      ></SelectType>

      <EvolutionButtons
        handleChangeChart={handleChangeChart}
      ></EvolutionButtons>

      <div className="body-parts-buttons">
        <button>Part1</button>
        <button>Part2</button>
        <button>Part3</button>
      </div>
      {/*
      <BodyPartsButtons
        parts={test.data.parts}
        handleChangePart={handleChangePart}
      ></BodyPartsButtons>
      */}

      <EvolutionChart tests={tests} chartType={actual.chart}></EvolutionChart>
    </div>
  );
}
