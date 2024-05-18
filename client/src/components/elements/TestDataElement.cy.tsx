import {
  DOCTOR_ENDPOINT,
  PATIENT_ENDPOINT,
  TEST_TYPE_ENDPOINT,
} from "../../utils/constants";
import { TestDataElement } from "./TestDataElement";

describe("<TestDataElement />", () => {
  it("render with data empty with null objects", () => {
    const test = {
      _id: "",
      doctorId: "",
      typeId: "",
      date: "",
      video: { name: "", id: "" },
      patientId: "",
      evaScale: 0,
      data: { time: [180], restriction: 20, parts: {} },
    };

    const { doctorId, typeId, date, patientId, evaScale } = test;

    const doctor = null;
    const type = null;
    const patient = null;

    cy.intercept("GET", DOCTOR_ENDPOINT + doctorId, { body: doctor });
    cy.intercept("GET", TEST_TYPE_ENDPOINT + typeId, { body: type });
    cy.intercept("GET", PATIENT_ENDPOINT + patientId, { body: patient });

    cy.mount(<TestDataElement test={test}></TestDataElement>);

    cy.contains(`Médico: Ninguno`);
    cy.contains(`Tipo: Ninguno`);
    cy.contains(`Fecha: ${date}`);
    cy.contains(`Paciente: Ninguno`);
    cy.contains(`Escala EVA: ${evaScale} / 10`);
    cy.contains(`Restricción de movimiento total: ${test.data.restriction}`);
    cy.contains(`Vídeo:`);
    cy.contains(`Cargando`);
  });

  it("render with data values", () => {
    const test = {
      _id: "0001",
      doctorId: "0001",
      typeId: "0001",
      date: "08-04-2002",
      video: { name: "", id: "" },
      patientId: "0001",
      evaScale: 3,
      data: { time: [180], restriction: 20, parts: {} },
    };

    const { doctorId, typeId, date, patientId, evaScale } = test;

    const doctor = {
      uId: "0001",
      name: "John",
      surname: "Doe",
    };
    const type = { name: "Tipo" };
    const patient = {
      uId: "0001",
      name: "Jane",
      surname: "Doe",
    };

    cy.intercept("GET", DOCTOR_ENDPOINT + doctorId, { body: doctor });
    cy.intercept("GET", TEST_TYPE_ENDPOINT + typeId, { body: type });
    cy.intercept("GET", PATIENT_ENDPOINT + patientId, { body: patient });

    cy.mount(<TestDataElement test={test}></TestDataElement>);

    cy.contains(`Médico: ${doctor.name} ${doctor.surname} (${doctor.uId})`);
    cy.contains(`Tipo: ${type.name}`);
    cy.contains(`Fecha: ${date}`);
    cy.contains(
      `Paciente: ${patient.name} ${patient.surname} (${patient.uId})`
    );
    cy.contains(`Escala EVA: ${evaScale} / 10`);
    cy.contains(`Restricción de movimiento total: ${test.data.restriction}`);
    cy.contains(`Vídeo:`);
    cy.contains(`Cargando`);
  });
});
