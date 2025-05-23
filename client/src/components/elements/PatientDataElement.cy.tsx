import { DOCTOR_ENDPOINT } from "../../utils/constants";
import { activityLevel } from "../../utils/types";
import { PatientDataElement } from "./PatientDataElement";

describe("<PatientDataElement />", () => {
  it("render with data empty and doctor null", () => {
    const user = {
      _id: "",
      uId: "",
      name: "",
      surname: "",
      date: "",
      city: "",
      email: "",
      phone: "",
      weight: 0,
      height: 0,
      activityLevel: "leve" as activityLevel,
      occupation: "",
      diagnosisYears: 0,
      isFibro: false,
      doctorId: "",
      photo: { id: "", name: "" },
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
      isFibro,
      doctorId,
    } = user;

    const doctor = null;

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
    cy.contains(
      `Diagnosticado con fibromialgia: ${isFibro ? "Si" : "No"}`
    ).should("exist");
    cy.contains(`Médico asignado: Ninguno`).should("exist");
  });

  it("render with data values 1", () => {
    const user = {
      _id: "0001",
      uId: "0001",
      name: "John",
      surname: "Doe",
      date: "08-04-2002",
      city: "Talavera de la Reina",
      email: "john@gmail.com",
      phone: "12345678",
      weight: 60,
      height: 180,
      activityLevel: "moderado" as activityLevel,
      occupation: "Ingeniero",
      diagnosisYears: 1,
      isFibro: true,
      doctorId: "0001",
      photo: { id: "", name: "" },
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
      isFibro,
      doctorId,
    } = user;

    const doctor = {
      name: "Jane",
      surname: "Doe",
      uId: "0001",
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
    cy.contains(
      `Diagnosticado con fibromialgia: ${isFibro ? "Si" : "No"}`
    ).should("exist");
    cy.contains(
      `Médico asignado: ${doctor.name} ${doctor.surname} (${doctor.uId})`
    ).should("exist");
  });

  it("render with data values 1", () => {
    const user = {
      _id: "0001",
      uId: "0001",
      name: "John",
      surname: "Doe",
      date: "08-04-2002",
      city: "Talavera de la Reina",
      email: "john@gmail.com",
      phone: "12345678",
      weight: -60,
      height: -180,
      activityLevel: "activo" as activityLevel,
      occupation: "Ingeniero",
      diagnosisYears: -1,
      isFibro: true,
      doctorId: "0001",
      photo: { id: "", name: "" },
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
      isFibro,
      doctorId,
    } = user;

    const doctor = {
      name: "Jane",
      surname: "Doe",
      uId: "0001",
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
    cy.contains(
      `Diagnosticado con fibromialgia: ${isFibro ? "Si" : "No"}`
    ).should("exist");
    cy.contains(
      `Médico asignado: ${doctor.name} ${doctor.surname} (${doctor.uId})`
    ).should("exist");
  });
});
