import { UserDataElement } from "./UserDataElement";

describe("<MyAccount />", () => {
  it("render", () => {
    // Mock user data for testing
    const user = {
      _id: "0",
      uId: "0001",
      name: "Sergio",
      surname: "García",
      date: "08-04-2002",
      city: "Talavera",
      email: "sergio@gmail.com",
      phone: "123456789",
      photo: { id: "", name: "" },
      password: "123",
    };

    // Mount the MyAccount component with mock props and user data
    cy.mount(<UserDataElement user={user} />);

    // Assert that the user data is rendered
    cy.contains(`uID: ${user.uId}`).should("exist");
    cy.contains(`Nombre: ${user.name}`).should("exist");
    cy.contains(`Apellidos: ${user.surname}`).should("exist");
    cy.contains(`Fecha de nacimiento: ${user.date}`).should("exist");
    cy.contains("Edad: ").should("exist");
    cy.contains(`Ciudad: ${user.city}`).should("exist");
    cy.contains(`Email: ${user.email}`).should("exist");
    cy.contains(`Teléfono: ${user.phone}`).should("exist");
  });
});
