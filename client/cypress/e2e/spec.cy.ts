describe("Login as doctor", () => {
  it("Login as doctor", () => {
    cy.visit("localhost:5173/");
    cy.get("label").contains("Correo").type("doctor@gmail.com");
    cy.get("label").contains("Contraseña").type("doctor");
    cy.get("button").contains("Iniciar Sesión").click();
    cy.url().should("include", "http://localhost:5173/app/pacientes");
  });
});

describe("Manage patients", () => {
  beforeEach("Login as doctor", () => {
    cy.visit("localhost:5173/");
    cy.get("label").contains("Correo").type("doctor@gmail.com");
    cy.get("label").contains("Contraseña").type("doctor");
    cy.get("button").contains("Iniciar Sesión").click();
    cy.url().should("include", "http://localhost:5173/app/pacientes");
  });

  it("Add new patient", () => {
    cy.contains("Añadir Paciente").click();
    cy.contains("Nuevo Paciente");
    cy.get("label").contains("Nombre").type("Sergio");
    cy.get("label").contains("Apellidos").type("García Muñoz");
    cy.get("label").contains("Edad").type("22");
    cy.get("label").contains("Ciudad").type("Talavera de la Reina");
    cy.get("label").contains("Email").type("sergio.garicia@gmail.com");
    cy.get("label").contains("Teléfono").type("123456789");
    cy.get("label").contains("Peso (kg)").type("61");
    cy.get("label").contains("Altura (cm)").type("181");
    cy.get("label").contains("Ocupación").type("Ingeniero");
    cy.get("label")
      .contains("Nivel de actividad física")
      .within(() => cy.get("select").select("activo"));
    cy.get("label").contains("Años con diagnostico").type("0");
    cy.get(".add-button").click();
    cy.get("h2").last().contains("Sergio García Muñoz");
  });

  it("Add repetitive patient", () => {
    cy.contains("Añadir Paciente").click();
    cy.contains("Nuevo Paciente");
    cy.get("label").contains("Nombre").type("Sergio");
    cy.get("label").contains("Apellidos").type("García Muñoz");
    cy.get("label").contains("Edad").type("22");
    cy.get("label").contains("Ciudad").type("Talavera de la Reina");
    cy.get("label").contains("Email").type("sergio.garicia@gmail.com");
    cy.get("label").contains("Teléfono").type("123456789");
    cy.get("label").contains("Peso (kg)").type("61");
    cy.get("label").contains("Altura (cm)").type("181");
    cy.get("label").contains("Ocupación").type("Ingeniero");
    cy.get("label")
      .contains("Nivel de actividad física")
      .within(() => cy.get("select").select("activo"));
    cy.get("label").contains("Años con diagnostico").type("0");
    cy.get(".add-button").click();
    cy.contains("El correo ya está registrado");
    cy.contains("Error: Paciente no añadido correctamente");
  });

  it("Edit patient", () => {
    cy.get("h2").last().contains("Sergio García Muñoz").click();
    cy.get("button").contains("Editar").click();
    cy.contains("Editar Paciente");
  });

  it("Consult tests of patient", () => {
    cy.get("h2").last().contains("Sergio García Muñoz").click();
    cy.get("button").contains("Pruebas").click();
    cy.contains("Pruebas de Sergio");
  });

  it("Remove patient", () => {
    cy.get("h2").last().contains("Sergio García Muñoz").click();
    cy.contains("Detalles de Paciente");
    cy.get("button").contains("Eliminar").click();
    cy.get("button").contains("Confirmar").click();
    cy.contains("Paciente eliminado correctamente");
  });
});
