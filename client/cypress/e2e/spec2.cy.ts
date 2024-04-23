describe("Admin", () => {
  beforeEach("Login as admin", () => {
    cy.visit("localhost:5173/");
    cy.get("label").contains("Correo").type("admin@gmail.com");
    cy.get("label").contains("Contraseña").type("admin");
    cy.get("button").contains("Iniciar Sesión").click();
    cy.url().should("include", "http://localhost:5173/app");
  });

  it("Consult admins", () => {
    cy.contains("Consultar Administradores").click();
    cy.url().should("include", "http://localhost:5173/app/administradores");
  });

  it("Consult doctors", () => {
    cy.contains("Consultar Médicos").click();
    cy.url().should("include", "http://localhost:5173/app/medicos");
  });

  it("Consult patients", () => {
    cy.contains("Consultar Pacientes").click();
    cy.url().should("include", "http://localhost:5173/app/pacientes");
  });
});
