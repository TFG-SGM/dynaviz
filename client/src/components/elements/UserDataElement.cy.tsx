import { UserDataElement } from "./UserDataElement";

describe("<MyAccount />", () => {
  it("render with data empty", () => {
    const user = {
      _id: "",
      uId: "",
      name: "",
      surname: "",
      date: "",
      city: "",
      email: "",
      phone: "",
      photo: { id: "", name: "" },
      password: "",
    };

    cy.mount(<UserDataElement user={user} />);

    cy.contains(`uID: ${user.uId}`).should("exist");
    cy.contains(`Nombre: ${user.name}`).should("exist");
    cy.contains(`Apellidos: ${user.surname}`).should("exist");
    cy.contains(`Fecha de nacimiento: ${user.date}`).should("exist");
    cy.contains("Edad: ").should("exist");
    cy.contains(`Ciudad: ${user.city}`).should("exist");
    cy.contains(`Email: ${user.email}`).should("exist");
    cy.contains(`Teléfono: ${user.phone}`).should("exist");
  });

  it("render with data values", () => {
    const user = {
      _id: "0001",
      uId: "0001",
      name: "John",
      surname: "Doe",
      date: "08-04-2002",
      city: "Talavera de la Reina",
      email: "john@gmail.com",
      phone: "123456789",
      photo: { id: "", name: "" },
      password: "1234",
    };

    cy.mount(<UserDataElement user={user} />);

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
