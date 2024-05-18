import { ACTUAL_USER_ENDPOINT } from "../../utils/constants";
import { UsersList } from "./UsersList";

describe("<UsersList />", () => {
  it("render empty list", () => {
    const endpoint = "patient";

    cy.intercept("GET", ACTUAL_USER_ENDPOINT, { body: { role: "doctor" } });
    cy.intercept("GET", endpoint, { body: [] });

    cy.mount(<UsersList endpoint={endpoint}></UsersList>);
    cy.contains("No hay ningún").should("be.visible");
  });

  it("render patient list", () => {
    const endpoint = "patient";

    cy.intercept("GET", ACTUAL_USER_ENDPOINT, { body: { role: "doctor" } });
    cy.intercept("GET", endpoint, {
      body: [{ name: "John" }, { name: "Jane" }],
    });

    cy.mount(<UsersList endpoint={endpoint}></UsersList>);
    cy.get("button").contains("Añadir").should("be.visible");
  });
});
