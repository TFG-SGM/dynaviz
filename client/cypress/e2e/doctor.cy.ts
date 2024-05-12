describe("Login as doctor", () => {
  it("Login as doctor", () => {
    cy.visit("http://localhost:5173/");
    cy.get("label").contains("Correo").type("doctor@gmail.com");
    cy.get("label").contains("Contraseña").type("doctor");
    cy.get("button").contains("Iniciar Sesión").click();

    cy.url().should("include", "http://localhost:5173/app/pacientes");
    cy.get("h1").contains("Pacientes").should("be.visible");
    cy.get("button").contains("Añadir Paciente").should("be.visible");
  });
});

describe("Manage patients as doctor", () => {
  beforeEach("Login as doctor", () => {
    cy.visit("http://localhost:5173/");
    cy.get("label").contains("Correo").type("doctor@gmail.com");
    cy.get("label").contains("Contraseña").type("doctor");
    cy.get("button").contains("Iniciar Sesión").click();
  });

  it("Add new patient", () => {
    cy.intercept("POST", "/patient", { statusCode: 202 });
    cy.contains("Añadir Paciente").click();
    cy.contains("Nuevo Paciente");
    cy.get("label").contains("Nombre").type("Sergio");
    cy.get("label").contains("Apellidos").type("García Muñoz");
    cy.get("label").contains("Fecha de nacimiento").type("2002-04-08");
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
    cy.contains("Paciente añadido correctamente").should("be.visible");
  });

  it("Add repetitive patient", () => {
    cy.intercept("DELETE", "/patient", { statusCode: 404 });

    cy.contains("Añadir Paciente").click();
    cy.contains("Nuevo Paciente");
    cy.get("label").contains("Nombre").type("Sergio");
    cy.get("label").contains("Apellidos").type("García Muñoz");
    cy.get("label").contains("Fecha de nacimiento").type("2002-04-08");
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

    cy.contains("El correo ya está registrado").should("be.visible");
    cy.contains("Error: Paciente no añadido correctamente").should(
      "be.visible"
    );
  });

  it("Edit patient", () => {
    cy.get("h2").last().contains("Sergio García Muñoz").click();
    cy.get("button").contains("Editar").click();

    cy.contains("Editar Paciente").should("be.visible");
  });

  it("Consult tests of patient", () => {
    cy.get("h2").last().click();
    cy.get("button").contains("Pruebas").click();

    cy.get("h1").contains("Pruebas de ").should("be.visible");
    cy.get("button").contains("Añadir Pruebas").should("be.visible");
    cy.get("button").contains("Evolución de Paciente").should("be.visible");
  });

  it("Remove patient", () => {
    cy.intercept("DELETE", "/patient", { statusCode: 202 });

    cy.get("h2").last().contains("Sergio García Muñoz").click();
    cy.contains("Detalles de Paciente");
    cy.get("button").contains("Eliminar").click();
    cy.get("button").contains("Confirmar").click();

    cy.contains("Paciente eliminado correctamente").should("be.visible");
  });
});
