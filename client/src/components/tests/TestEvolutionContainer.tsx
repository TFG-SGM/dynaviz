import { useData } from "../../hooks/useData";
import { TEST_ENDPOINT, TEST_TYPE_ENDPOINT } from "../../utils/constants";
import { ChangeEvent, MouseEventHandler, useEffect, useState } from "react";
import { EvolutionChart } from "../../components/charts/evolution";
import { TestData, TestPartsData } from "../../utils/types";
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
  const [parts, setParts] = useState<TestPartsData | null>(null);

  useEffect(() => {
    if (typeId === "" || !tests || !tests[0] || !tests[0].data) {
      setParts(null);
    } else {
      if (tests[0].data.parts) {
        setParts(tests[0].data.parts);
      } else {
        setParts(null);
      }
    }
  }, [typeId, tests]);

  const handleChangeChart: MouseEventHandler<HTMLButtonElement> = (e) => {
    const target = e.target as HTMLElement;
    const activeButton = document.querySelector(".active-chart");
    activeButton?.classList.remove("active-chart");
    target.classList.add("active-chart");
    setActual((prevState) => ({ ...prevState, chart: target.id }));
  };

  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.target;
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
