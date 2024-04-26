describe("Login as admin", () => {
  it("Login as admin", () => {
    cy.visit("http://localhost:5173/");
    cy.get("label").contains("Correo").type("admin@gmail.com");
    cy.get("label").contains("Contraseña").type("admin");
    cy.get("button").contains("Iniciar Sesión").click();

    cy.url().should("include", "http://localhost:5173/app");
    cy.get("button").contains("Consultar Administradores").should("be.visible");
    cy.get("button").contains("Consultar Médicos").should("be.visible");
    cy.get("button").contains("Consultar Pacientes").should("be.visible");
  });
});

describe("Manage users as admin", () => {
  beforeEach("Login as admin", () => {
    cy.visit("http://localhost:5173/");
    cy.get("label").contains("Correo").type("admin@gmail.com");
    cy.get("label").contains("Contraseña").type("admin");
    cy.get("button").contains("Iniciar Sesión").click();
  });

  it("Consult admins", () => {
    cy.contains("Consultar Administradores").click();

    cy.url().should("include", "http://localhost:5173/app/administradores");
    cy.get("h1").contains("Administradores").should("be.visible");
    cy.get("button").contains("Añadir Administrador").should("be.visible");
  });

  it("Consult doctors", () => {
    cy.contains("Consultar Médicos").click();

    cy.url().should("include", "http://localhost:5173/app/medicos");
    cy.get("h1").contains("Médicos").should("be.visible");
    cy.get("button").contains("Añadir Médico").should("be.visible");
  });

  it("Consult patients", () => {
    cy.contains("Consultar Pacientes").click();

    cy.url().should("include", "http://localhost:5173/app/pacientes");
    cy.get("h1").contains("Pacientes").should("be.visible");
    cy.get("button").contains("Añadir Paciente").should("be.visible");
  });
});
