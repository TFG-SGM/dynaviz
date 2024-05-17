import { DOCTOR_ENDPOINT } from "../../utils/constants";
import { PatientDataElement } from "./PatientDataElement";

describe("<PatientDataElement />", () => {
  it("render", () => {
    const user = {
      _id: "_id",
      uId: "001",
      name: "Patient",
      surname: "Patient",
      date: "02-01-2015",
      city: "San Francisco",
      email: "sergio@gmail.com",
      phone: "12345678",
      weight: 20,
      height: 20,
      activityLevel: "active",
      occupation: "a",
      diagnosisYears: 1,
      isFibro: true,
      doctorId: "12",
    };

    const {
      uId,
      name,
      surname,
      date,
      city,
      email,
      phone,
      weight,
      height,
      activityLevel,
      occupation,
      diagnosisYears,
      doctorId,
    } = user;

    const doctor = {
      name: "doctor",
      surname: "doctor",
      uId: "001",
    };

    cy.intercept("GET", DOCTOR_ENDPOINT + doctorId, {
      body: doctor,
    });

    cy.mount(<PatientDataElement user={user}></PatientDataElement>);
    cy.contains(`uID: ${uId}`).should("exist");
    cy.contains(`Nombre: ${name}`).should("exist");
    cy.contains(`Apellidos: ${surname}`).should("exist");
    cy.contains(`Fecha de nacimiento: ${date}`).should("exist");
    cy.contains(`Edad: `).should("exist");
    cy.contains(`Ciudad: ${city}`).should("exist");
    cy.contains(`Email: ${email}`).should("exist");
    cy.contains(`Teléfono: ${phone}`).should("exist");
    cy.contains(`Peso: ${weight} kg`).should("exist");
    cy.contains(`Altura: ${height} cm`).should("exist");
    cy.contains(`Actividad física: ${activityLevel}`).should("exist");
    cy.contains(`Ocupación: ${occupation}`).should("exist");
    cy.contains(`Años con diagnostico: ${diagnosisYears}`).should("exist");
    cy.contains(`Diagnosticado con fibromialgia: Si`).should("exist");
    cy.contains(
      `Médico asignado: ${doctor.name} ${doctor.surname} (${doctor.uId})`
    ).should("exist");
  });
});
