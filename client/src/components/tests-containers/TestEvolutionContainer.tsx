import { useData } from "../../hooks/useData";
import { TEST_ENDPOINT, TEST_TYPE_ENDPOINT } from "../../utils/constants";
import { ChangeEvent, MouseEventHandler, useState } from "react";
import { EvolutionChart } from "../charts/evolution";
import { TestData, evolutionActual } from "../../utils/types";
import { SelectType } from "../selects/SelectType";
import { BodyPartsButtons } from "../buttons/BodyPartsButtons";
import { EvolutionButtons } from "../buttons/EvolutionButtons";
import { useEvolutionParts } from "../../hooks/useEvolutionParts";
import { HelpMenu } from "../menus/HelpMenu";
import { Interrogation } from "../other/Icons";
import { RadarEvolutionChart } from "../charts/radar-evolution";

export function TestEvolutionContainer({ patientId }: { patientId: string }) {
  const [actual, setActual] = useState<evolutionActual>({
    chart: "line",
    parts: [],
  });
  const [typeId, setTypeId] = useState("");
  const [tests] = useData<TestData[]>(
    TEST_ENDPOINT + "?patientId=" + patientId + "&typeId=" + typeId + "&order=1"
  );
  const [parts] = useEvolutionParts(typeId, tests);
  const [isHelpMenu, setIsHelpMenu] = useState<boolean>(false);

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
    <>
      {isHelpMenu && (
        <HelpMenu
          chart={actual.chart}
          isEvolution={true}
          handleClean={() => setIsHelpMenu(false)}
        ></HelpMenu>
      )}
      <div className="test-evolution-container">
        <div className="evolution-filter">
          <SelectType
            option={"typeId"}
            value={typeId}
            endpoint={TEST_TYPE_ENDPOINT}
            handleChange={handleChange}
          ></SelectType>
          <EvolutionButtons
            handleChangeChart={handleChangeChart}
          ></EvolutionButtons>
        </div>
        {tests.length === 0 ? (
          <p className="empty-text">¡No hay ninguna prueba!</p>
        ) : tests.length === 1 ? (
          <p className="empty-text">¡Solo hay una prueba!</p>
        ) : (
          <>
            {actual.chart !== "radar" && (
              <BodyPartsButtons
                parts={parts}
                handleChangePart={handleChangePart}
              ></BodyPartsButtons>
            )}

            <div className="chart-container">
              <button
                className="help-button"
                onClick={() => setIsHelpMenu(true)}
              >
                <Interrogation></Interrogation>
              </button>
              {actual.chart === "radar" ? (
                <RadarEvolutionChart tests={tests}></RadarEvolutionChart>
              ) : (
                <EvolutionChart tests={tests} actual={actual}></EvolutionChart>
              )}
            </div>
          </>
        )}
      </div>
    </>
  );
}
