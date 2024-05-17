import { SelectType } from "./SelectType";

describe("<SelectDoctor />", () => {
  it("render", () => {
    const option = "type";
    const value = "type";
    const endpoint = "/type";
    const handleChange = cy.stub().as("handleChange");
    const isAdding = false;
    const doctors = [
      {
        _id: "0001",
        name: "",
      },
      {
        _id: "0002",
        name: "a",
      },
    ];

    cy.intercept("GET", endpoint, { body: doctors });

    cy.mount(
      <SelectType
        option={option}
        value={value}
        endpoint={endpoint}
        handleChange={handleChange}
        isAdding={isAdding}
      ></SelectType>
    );

    cy.get("select[name='type']").should("exist");
    cy.get("select[name='type'] option").should(
      "have.length",
      doctors.length + 1
    );
    doctors.forEach((doctor) => {
      cy.get(`select[name='type'] option[value='${doctor._id}']`).should(
        "exist"
      );
    });
  });
});
