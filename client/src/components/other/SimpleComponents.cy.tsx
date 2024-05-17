import { ErrorComponent } from "./ErrorComponent";
import { Footer } from "./Footer";
import { LoadingComponent } from "./LoadingComponent";
import { Overlay } from "./Overlay";

describe("Simple Components", () => {
  it("render ErrorComponent", () => {
    cy.mount(<ErrorComponent error="Error"></ErrorComponent>);
    cy.contains("Error").should("exist");
  });

  it("render LoadingComponent", () => {
    cy.mount(<LoadingComponent message="Cargando"></LoadingComponent>);
    cy.contains("Cargando").should("exist");
  });

  it("render Footer", () => {
    cy.mount(<Footer></Footer>);
    cy.contains("Creado por Sergio García Muñoz").should("exist");
  });

  it("render Overlay", () => {
    cy.mount(<Overlay></Overlay>);
    cy.get(".overlay").should("exist");
  });
});
