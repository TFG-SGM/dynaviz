import { DeleteUserButton } from "./DeleteUserButton";
import { DataService } from "../../services/DataService";
import { AxiosError } from "axios";

describe("<DeleteUserButton />", () => {
  it("deletes a user when clicked", () => {
    const endpoint = "/patient";
    const setUsers = cy.stub().as("setUsers");
    const setError = cy.stub().as("setError");
    const setActual = cy.stub().as("setActual");

    cy.stub(DataService, "deleteData").resolves("1");

    cy.mount(
      <DeleteUserButton
        endpoint={endpoint}
        setUsers={setUsers}
        setError={setError}
        setActual={setActual}
      />
    );

    cy.get(".delete-button").click();

    cy.wrap(DataService.deleteData).should("be.calledWith", endpoint);
    cy.get("@setUsers").should("have.been.called");
    cy.get("@setError").should("not.have.been.called");
    cy.get("@setActual").should("have.been.calledWith", {
      action: "",
      userId: "",
    });
  });

  it("handles error when deletion fails", () => {
    const endpoint = "/patient";
    const setUsers = cy.stub().as("setUsers");
    const setError = cy.stub().as("setError");
    const setActual = cy.stub().as("setActual");

    cy.stub(DataService, "deleteData").rejects(new AxiosError());

    cy.mount(
      <DeleteUserButton
        endpoint={endpoint}
        setUsers={setUsers}
        setError={setError}
        setActual={setActual}
      />
    );

    cy.get(".delete-button").click();

    cy.wrap(DataService.deleteData).should("be.calledWith", endpoint);
    cy.get("@setUsers").should("not.have.been.called");
    cy.get("@setActual").should("not.have.been.called");

    /* Assert setError is called with the expected error message
    cy.get("@setError").should(
      "have.been.calledWith",
      "Error al eliminar. Fake error message"
    );
    */
  });
});
