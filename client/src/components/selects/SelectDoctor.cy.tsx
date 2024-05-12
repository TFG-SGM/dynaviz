import { SelectDoctor } from "./SelectDoctor";

describe("<SelectDoctor />", () => {
  it("renders options based on the provided doctos", () => {
    const option = "doctor";
    const value = "doctor";
    const endpoint = "/doctor";
    const handleChange = cy.stub().as("handleChange");
    const isAdding = false;
    const doctors = [
      {
        _id: "0",
        name: "a",
        surname: "a",
      },
      {
        _id: "0",
        name: "a",
        surname: "a",
      },
    ];

    cy.intercept("GET", endpoint, { body: doctors }).as("getData");

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
