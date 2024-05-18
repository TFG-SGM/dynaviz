import {
  DOCTOR_ENDPOINT,
  PATIENT_ENDPOINT,
  TEST_TYPE_ENDPOINT,
} from "../../utils/constants";
import { Inform } from "./Inform";

describe("<Inform />", () => {
  afterEach("test buttons and titles", () => {
    cy.get("h2").contains("Datos de Prueba").should("be.visible");
    cy.get("h2").contains("Restricciones de Movimiento").should("be.visible");
    cy.get("h2").contains("Gráfica de Barras").should("be.visible");
    cy.get("button").contains("Cancelar").should("be.visible");
    cy.get("button").contains("Exportar").should("be.visible");
    cy.get("button").contains("Cancelar").click();
    cy.get("@handleClean").should("have.been.called");
  });

  it("render with data empty", () => {
    const test = {
      _id: "",
      doctorId: "",
      typeId: "",
      date: "",
      video: { name: "", id: "" },
      patientId: "",
      evaScale: 0,
      data: {
        time: [],
        restriction: 0,
        parts: {},
      },
    };
    const handleClean = cy.stub().as("handleClean");

    const doctor = {
      name: "John",
      surname: "Doe",
    };
    const type = {
      name: "Tipo",
    };
    const patient = {
      name: "Jane",
      surname: "Doe",
    };

    cy.intercept("GET", DOCTOR_ENDPOINT + test.doctorId, { body: doctor });
    cy.intercept("GET", PATIENT_ENDPOINT + test.doctorId, { body: patient });
    cy.intercept("GET", TEST_TYPE_ENDPOINT + test.doctorId, { body: type });

    cy.mount(<Inform test={test} handleClean={handleClean}></Inform>);

    cy.contains(`Prueba de ${patient.name} ${patient.surname}`);
    cy.contains(`Médico: ${doctor.name} ${doctor.surname}`);
    cy.contains(`Tipo: ${type.name}`);
    cy.contains(`Fecha: ${test.date}`);
    cy.contains(`Escala EVA: ${test.evaScale}`);
  });

  it("render with data values", () => {
    const test = {
      _id: "0001",
      doctorId: "0001",
      typeId: "0001",
      date: "2002-04-08",
      video: { name: "", id: "" },
      patientId: "0001",
      evaScale: 5,
      data: {
        time: [],
        restriction: 25,
        parts: {},
      },
    };
    const handleClean = cy.stub().as("handleClean");

    const doctor = {
      name: "John",
      surname: "Doe",
    };
    const type = {
      name: "Tipo",
    };
    const patient = {
      name: "Jane",
      surname: "Doe",
    };

    cy.intercept("GET", DOCTOR_ENDPOINT + test.doctorId, { body: doctor });
    cy.intercept("GET", PATIENT_ENDPOINT + test.doctorId, { body: patient });
    cy.intercept("GET", TEST_TYPE_ENDPOINT + test.doctorId, { body: type });

    cy.mount(<Inform test={test} handleClean={handleClean}></Inform>);

    cy.contains(`Prueba de ${patient.name} ${patient.surname}`);
    cy.contains(`Médico: ${doctor.name} ${doctor.surname}`);
    cy.contains(`Tipo: ${type.name}`);
    cy.contains(`Fecha: ${test.date}`);
    cy.contains(`Escala EVA: ${test.evaScale}`);
  });
});
