import { useData } from "../../hooks/useData";
import { TEST_ENDPOINT, TEST_TYPE_ENDPOINT } from "../../utils/constants";
import { ChangeEvent, MouseEventHandler, useState } from "react";
import { EvolutionChart } from "../../components/charts/evolution";
import { TestData, evolutionActual } from "../../utils/types";
import { SelectType } from "../selects/SelectType";
import { BodyPartsButtons } from "../buttons/BodyPartsButtons";
import { EvolutionButtons } from "../buttons/EvolutionButtons";
import { useEvolutionParts } from "../../hooks/useEvolutionParts";

export function TestEvolutionContainer({ patientId }: { patientId: string }) {
  const [actual, setActual] = useState<evolutionActual>({
    chart: "line",
    parts: [],
  });
  const [typeId, setTypeId] = useState("");
  const [tests] = useData<TestData[]>(
    TEST_ENDPOINT + "?patientId=" + patientId + "&typeId=" + typeId
  );
  const [parts] = useEvolutionParts(typeId, tests);

  const handleChangeChart: MouseEventHandler<HTMLButtonElement> = (e) => {
    const target = e.target as HTMLElement;
    const activeButton = document.querySelector(".active-chart");
    activeButton?.classList.remove("active-chart");
    target.classList.add("active-chart");
    setActual((prevState) => ({ ...prevState, chart: target.id }));
  };

  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.target;
    const activeParts = document.querySelectorAll(".active-part");
    activeParts.forEach((part) => part.classList.remove("active-part"));
    setActual((prevState) => ({
      ...prevState,
      parts: [],
    }));
    setTypeId(value);
  };

  const handleChangePart: MouseEventHandler<HTMLButtonElement> = (e) => {
    const target = e.target as HTMLElement;
    const classButton = target.classList;

    const newParts = [...actual.parts];

    const partId = target.id;

    const partIndex = newParts.indexOf(partId);

    if (partIndex !== -1) {
      classButton.remove("active-part");
      newParts.splice(partIndex, 1); // Remove the part from newParts
    } else {
      classButton.add("active-part");
      newParts.push(partId);
    }

    setActual((prevState) => ({
      ...prevState,
      parts: newParts,
    }));
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

      <BodyPartsButtons
        parts={parts}
        handleChangePart={handleChangePart}
      ></BodyPartsButtons>

      <EvolutionChart tests={tests} actual={actual}></EvolutionChart>
    </div>
  );
}
