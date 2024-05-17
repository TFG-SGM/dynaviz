import { DeleteMenu } from "./DeleteMenu";

describe("<DeleteMenu />", () => {
  it("render", () => {
    const handleDelete = cy.stub().as("handleDelete");
    const handleClean = cy.stub().as("handleClean");
    cy.mount(
      <DeleteMenu
        handleDelete={handleDelete}
        handleClean={handleClean}
      ></DeleteMenu>
    );

    cy.get(".overlay").should("exist");
    cy.get(".delete-menu").should("exist");
    cy.contains("¿Estas seguro de eliminar?").should("exist");
    cy.get("button").contains("Cancelar").should("be.visible");
    cy.get("button").contains("Confirmar").should("be.visible");

    cy.get("button").contains("Cancelar").click();
    cy.get("button").contains("Confirmar").click();

    cy.get("@handleDelete").should("have.been.called");
    cy.get("@handleClean").should("have.been.called");
  });
});
