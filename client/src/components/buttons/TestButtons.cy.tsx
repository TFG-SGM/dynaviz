import { EvolutionButtons } from "./EvolutionButtons";
import { TestButtons } from "./TestButtons";

describe("<TestButtons />", () => {
  it("renders", () => {
    // Render your component
    cy.mount(<TestButtons handleChangeChart={() => {}} />);

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
  });
});

describe("<EvolutionButtons />", () => {
  it("renders", () => {
    // Render your component
    cy.mount(<EvolutionButtons handleChangeChart={() => {}} />);

    // Check if the component renders the test information correctly
    cy.get("button").contains("Líneas").should("exist");
    cy.get("button").contains("Barras").should("exist");
    cy.get("button").contains("Radar").should("exist");
  });
});
