import { SelectType } from "./SelectType";

describe("<SelectDoctor />", () => {
  it("renders options based on the provided types", () => {
    const option = "doctor";
    const value = "doctor";
    const endpoint = "/type";
    const handleChange = cy.stub().as("handleChange");
    const isAdding = false;
    const doctors = [
      {
        _id: "0",
        name: "a",
      },
      {
        _id: "0",
        name: "a",
      },
    ];

    cy.intercept("GET", endpoint, { body: doctors }).as("getData");

    cy.mount(
      <SelectType
        option={option}
        value={value}
        endpoint={endpoint}
        handleChange={handleChange}
        isAdding={isAdding}
      ></SelectType>
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
