import { TestButtons } from "./TestButtons";

describe("<TestButtons />", () => {
  it("render", () => {
    // Render your component
    const handleChangeChart = cy.stub().as("handleChangeChart");
    cy.mount(<TestButtons handleChangeChart={handleChangeChart} />);

    // Check if the component renders the test information correctly
    cy.get("button").contains("Líneas").should("exist");
    cy.get("button").contains("Barras").should("exist");
    cy.get("button").contains("Radar").should("exist");
    cy.get("button").contains("Pastel").should("exist");
    cy.get("button").contains("Mapa de árbol").should("exist");
    cy.get("button").contains("Histograma").should("exist");
    cy.get("button").contains("Cajas y Bigotes 1").should("exist");
    cy.get("button").contains("Cajas y Bigotes 2").should("exist");
    cy.get("button").contains("Burbujas").should("exist");
    cy.get("button").contains("Mapa de calor").should("exist");
    cy.get(".active-chart").click();
    cy.get("@handleChangeChart").should("have.been.called");
  });
});
