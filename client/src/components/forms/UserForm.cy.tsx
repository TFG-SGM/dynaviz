import { UserData } from "../../utils/types";
import { UserForm } from "./UserForm";

describe("<UserForm /> without password", () => {
  afterEach("label test", () => {
    cy.get("label").contains("Nombre*").should("be.visible");
    cy.get("label").contains("Apellidos*").should("be.visible");
    cy.get("label").contains("Fecha de nacimiento*").should("be.visible");
    cy.get("label").contains("Ciudad*").should("be.visible");
    cy.get("label").contains("Email*").should("be.visible");
    cy.get("label").contains("Teléfono*").should("be.visible");
    cy.get("label").contains("Foto").should("be.visible");
  });

  it("render with data empty", () => {
    const data = {
      uId: "",
      _id: "",
      password: "",
      name: "",
      surname: "",
      date: "",
      age: 0,
      city: "",
      email: "",
      phone: "",
      photo: { id: "", name: "" },
      role: "",
      prevPhoto: "",
      isPhotoChanged: false,
    };
    const setNewData = cy.stub().as("setNewData");
    const isPass = false;
    const error = null;

    cy.mount(
      <UserForm
        data={data}
        setNewData={setNewData}
        isPass={isPass}
        error={error}
      ></UserForm>
    );

    Object.keys(data).map((key) => {
      if (isInvalidKey(key)) return;

      cy.get(`input[name=${key}]`).should(
        "have.value",
        data[key as keyof UserData]
      );
    });
  });

  it("render with data values and error", () => {
    const data = {
      uId: "0001",
      _id: "0001",
      password: "1234",
      name: "John",
      surname: "Doe",
      date: "2002-04-08",
      age: 22,
      city: "Talavera de la Reina",
      email: "john@gmail.com",
      phone: "123456789",
      photo: { id: "", name: "" },
      role: "",
      prevPhoto: "",
      isPhotoChanged: false,
    };
    const setNewData = cy.stub().as("setNewData");
    const isPass = false;
    const error = "Error";

    cy.mount(
      <UserForm
        data={data}
        setNewData={setNewData}
        isPass={isPass}
        error={error}
      ></UserForm>
    );

    Object.keys(data).map((key) => {
      if (isInvalidKey(key)) return;

      cy.get(`input[name=${key}]`).should(
        "have.value",
        data[key as keyof UserData]
      );
    });
    cy.contains("Error").should("be.visible");
  });
});

describe("<UserForm /> with password", () => {
  afterEach("label test", () => {
    cy.get("label").contains("Nombre*").should("be.visible");
    cy.get("label").contains("Apellidos*").should("be.visible");
    cy.get("label").contains("Fecha de nacimiento*").should("be.visible");
    cy.get("label").contains("Ciudad*").should("be.visible");
    cy.get("label").contains("Email*").should("be.visible");
    cy.get("label").contains("Teléfono*").should("be.visible");
    cy.get("label").contains("Foto").should("be.visible");
    cy.get("label").contains("Contraseña*").should("be.visible");
  });

  it("render with data empty", () => {
    const data = {
      uId: "",
      _id: "",
      password: "",
      name: "",
      surname: "",
      date: "",
      age: 0,
      city: "",
      email: "",
      phone: "",
      photo: { id: "", name: "" },
      role: "",
      prevPhoto: "",
      isPhotoChanged: false,
    };
    const setNewData = cy.stub().as("setNewData");
    const isPass = true;
    const error = null;

    cy.mount(
      <UserForm
        data={data}
        setNewData={setNewData}
        isPass={isPass}
        error={error}
      ></UserForm>
    );

    Object.keys(data).map((key) => {
      if (isInvalidKey(key)) return;

      cy.get(`input[name=${key}]`).should(
        "have.value",
        data[key as keyof UserData]
      );
    });
    cy.get(`input[name=password]`).should("have.value", data.password);
  });

  it("render with data values and error", () => {
    const data = {
      uId: "0001",
      _id: "0001",
      password: "1234",
      name: "John",
      surname: "Doe",
      date: "2002-04-08",
      age: 22,
      city: "Talavera de la Reina",
      email: "john@gmail.com",
      phone: "123456789",
      photo: { id: "", name: "" },
      role: "",
      prevPhoto: "",
      isPhotoChanged: false,
    };
    const setNewData = cy.stub().as("setNewData");
    const isPass = true;
    const error = "Error";

    cy.mount(
      <UserForm
        data={data}
        setNewData={setNewData}
        isPass={isPass}
        error={error}
      ></UserForm>
    );

    Object.keys(data).map((key) => {
      if (isInvalidKey(key)) return;

      cy.get(`input[name=${key}]`).should(
        "have.value",
        data[key as keyof UserData]
      );
    });
    cy.get(`input[name=password]`).should("have.value", data.password);
    cy.contains("Error").should("be.visible");
  });
});

function isInvalidKey(key: string) {
  return (
    key === "uId" ||
    key === "_id" ||
    key === "photo" ||
    key === "password" ||
    key === "age" ||
    key === "role" ||
    key === "prevPhoto" ||
    key === "isPhotoChanged"
  );
}
