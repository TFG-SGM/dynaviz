import {
  DOCTOR_ENDPOINT,
  PATIENT_ENDPOINT,
  TEST_TYPE_ENDPOINT,
} from "../../utils/constants";
import { TestDataElement } from "./TestDataElement";

describe("<TestDataElement />", () => {
  it("render", () => {
    const test = {
      doctorId: "id",
      typeId: "id",
      date: "01-01-2002",
      video: "",
      patientId: "id",
      evaScale: 3,
      data: { restriction: 20 },
    };

    const { doctorId, typeId, date, patientId, evaScale } = test;

    const doctor = {
      uId: "a",
      name: "doctor",
      surname: "doctor",
    };

    cy.intercept("GET", DOCTOR_ENDPOINT + doctorId, { body: doctor });
    cy.intercept("GET", TEST_TYPE_ENDPOINT + typeId, { body: doctor });
    cy.intercept("GET", PATIENT_ENDPOINT + patientId, { body: doctor });

    cy.mount(<TestDataElement test={test}></TestDataElement>);

    cy.contains(`Médico: ${doctor.name} ${doctor.surname} (${doctor.uId})`);
    cy.contains(`Tipo: ${doctor.name}`);
    cy.contains(`Fecha: ${date}`);
    cy.contains(`Paciente: ${doctor.name} ${doctor.surname} (${doctor.uId})`);
    cy.contains(`Escala EVA: ${evaScale} / 10`);
    cy.contains(`Restricción de movimiento total: ${test.data.restriction}`);
    cy.contains(`Video:`);
    cy.contains(`Cargando`);
  });
});
