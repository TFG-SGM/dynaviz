import { MyAccount } from "./ActualUserView";

describe("<MyAccount />", () => {
  it("renders user data when user is available", () => {
    // Mock user data for testing
    const user = {
      _id: "user123",
      role: "admin",
      name: "John",
      surname: "Doe",
      email: "john@example.com",
    };

    cy.intercept("GET", "auth/user-data", { body: user });

    // Mount the MyAccount component with mock props and user data
    cy.mount(<MyAccount handleClean={() => {}} />);

    // Assert that the user data is rendered
    cy.contains("John Doe").should("exist");
    cy.contains("john@example.com").should("exist");
    cy.contains("Editar").should("exist");
  });

  it("updates user data when 'Editar' button is clicked", () => {
    // Mock user data for testing
    const user = {
      _id: "user123",
      role: "admin",
      name: "John",
      surname: "Doe",
      email: "john@example.com",
    };
    cy.intercept("GET", "auth/user-data", { body: user });

    cy.mount(<MyAccount handleClean={() => {}} />);

    cy.contains("Editar").click();
    cy.contains("Actualizar").should("exist");

    cy.get("input[name='name']").clear().type("Jane");
    cy.get("input[name='surname']").clear().type("Doe");
    cy.get("input[name='email']").clear().type("jane@example.com");
    cy.contains("Guardar cambios").click();

    cy.get("@setUser").should("have.been.calledWith", {
      ...user,
      name: "Jane",
      surname: "Doe",
      email: "jane@example.com",
    });
  });

  // Add more test cases as needed
});
