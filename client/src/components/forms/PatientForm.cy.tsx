import { PatientData, activityLevel } from "../../utils/types";
import { PatientForm } from "./PatientForm";

describe("<PatientForm />", () => {
  afterEach("label test", () => {
    cy.get("label").contains("Nombre").should("be.visible");
    cy.get("label").contains("Apellidos").should("be.visible");
    cy.get("label").contains("Fecha de nacimiento").should("be.visible");
    cy.get("label").contains("Ciudad").should("be.visible");
    cy.get("label").contains("Email").should("be.visible");
    cy.get("label").contains("Teléfono").should("be.visible");
    cy.get("label").contains("Peso (kg)").should("be.visible");
    cy.get("label").contains("Altura (cm)").should("be.visible");
    cy.get("label").contains("Ocupación").should("be.visible");
    cy.get("label").contains("Nivel de actividad física").should("be.visible");
    cy.get("label").contains("Años con diagnostico").should("be.visible");
    cy.get("label").contains("Tiene fibromialgia").should("be.visible");
    cy.get("label").contains("Médico").should("be.visible");
  });

  it("render with data values empty", () => {
    const data = {
      uId: "",
      _id: "",
      name: "",
      surname: "",
      date: "",
      age: 0,
      city: "",
      email: "",
      phone: "",
      activityLevel: "leve" as activityLevel,
      occupation: "",
      diagnosisYears: 0,
      isFibro: true,
      weight: 0,
      height: 0,
      doctorId: "",
      photo: { id: "", name: "" },
      password: "",
    };
    const setNewData = cy.stub().as("setNewData");
    const error = null;

    cy.mount(
      <PatientForm
        data={data}
        setNewData={setNewData}
        error={error}
      ></PatientForm>
    );

    Object.keys(data).map((key) => {
      if (key === "uId" || key === "_id" || key === "age" || key === "doctorId")
        return;
      if (key === "activityLevel")
        cy.get(`select[name=${key}]`).should("have.value", "leve");
      else if (key === "isFibro")
        cy.get(`input[name=${key}]`).should("have.checked", data[key]);
      else
        cy.get(`input[name=${key}]`).should(
          "have.value",
          data[key as keyof PatientData]
        );
    });
  });

  it("render with data values 1", () => {
    const data = {
      uId: "0001",
      _id: "0001",
      name: "John",
      surname: "Doe",
      date: "2002-04-08",
      age: 22,
      city: "Talavera de la Reina",
      email: "john@gmail.com",
      phone: "123456789",
      activityLevel: "moderado" as activityLevel,
      occupation: "Ingeniero",
      diagnosisYears: 0,
      isFibro: false,
      weight: 60,
      height: 180,
      doctorId: "0001",
      photo: { id: "", name: "" },
      password: "",
    };
    const setNewData = cy.stub().as("setNewData");
    const error = null;

    cy.mount(
      <PatientForm
        data={data}
        setNewData={setNewData}
        error={error}
      ></PatientForm>
    );

    Object.keys(data).map((key) => {
      if (key === "uId" || key === "_id" || key === "age" || key === "doctorId")
        return;
      if (key === "activityLevel")
        cy.get(`select[name=${key}]`).should("have.value", data[key]);
      else if (key === "isFibro")
        cy.get(`input[name=${key}]`).should(
          data[key] ? "be.checked" : "be.not.checked"
        );
      else
        cy.get(`input[name=${key}]`).should(
          "have.value",
          data[key as keyof PatientData]
        );
    });
  });

  it("render with data values 2 and error", () => {
    const data = {
      uId: "0001",
      _id: "0001",
      name: "John",
      surname: "Doe",
      date: "2002-04-08",
      age: -22,
      city: "Talavera de la Reina",
      email: "john@gmail.com",
      phone: "123456789",
      activityLevel: "activo" as activityLevel,
      occupation: "Ingeniero",
      diagnosisYears: 0,
      isFibro: false,
      weight: -60,
      height: -180,
      doctorId: "0001",
      photo: { id: "", name: "" },
      password: "",
    };
    const setNewData = cy.stub().as("setNewData");
    const error = "Error";

    cy.mount(
      <PatientForm
        data={data}
        setNewData={setNewData}
        error={error}
      ></PatientForm>
    );

    Object.keys(data).map((key) => {
      if (key === "uId" || key === "_id" || key === "age" || key === "doctorId")
        return;
      if (key === "activityLevel")
        cy.get(`select[name=${key}]`).should("have.value", data[key]);
      else if (key === "isFibro")
        cy.get(`input[name=${key}]`).should(
          data[key] ? "be.checked" : "be.not.checked"
        );
      else
        cy.get(`input[name=${key}]`).should(
          "have.value",
          data[key as keyof PatientData]
        );
    });
    cy.contains("Error").should("be.visible");
  });
});
