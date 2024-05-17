import { SelectDoctor } from "./SelectDoctor";

describe("<SelectDoctor />", () => {
  it("render", () => {
    const option = "doctor";
    const value = "doctor";
    const endpoint = "/doctor";
    const handleChange = cy.stub().as("handleChange");
    const isAdding = false;
    const doctors = [
      {
        _id: "0001",
        name: "John",
        surname: "Doe",
      },
      {
        _id: "0002",
        name: "Jane",
        surname: "Doe",
      },
    ];

    cy.intercept("GET", endpoint, { body: doctors });

    cy.mount(
      <SelectDoctor
        option={option}
        value={value}
        endpoint={endpoint}
        handleChange={handleChange}
        isAdding={isAdding}
      ></SelectDoctor>
    );

    cy.get("select[name='doctor']").should("exist");
    cy.get("select[name='doctor'] option").should(
      "have.length",
      doctors.length + 1
    );
    doctors.forEach((doctor) => {
      cy.get(`select[name='doctor'] option[value='${doctor._id}']`).should(
        "exist"
      );
    });
  });
});
