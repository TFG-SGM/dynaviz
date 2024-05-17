import { EvolutionButtons } from "./EvolutionButtons";

describe("<EvolutionButtons />", () => {
  it("render", () => {
    // Render your component
    const handleChangeChart = cy.stub().as("handleChangeChart");
    cy.mount(<EvolutionButtons handleChangeChart={handleChangeChart} />);

    // Check if the component renders the test information correctly
    cy.get("button").contains("Líneas").should("exist");
    cy.get("button").contains("Barras").should("exist");
    cy.get("button").contains("Radar").should("exist");
    cy.get(".active-chart").click();
    cy.get("@handleChangeChart").should("have.been.called");
  });
});
