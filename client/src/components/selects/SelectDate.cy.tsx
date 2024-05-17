import { TEST_ENDPOINT } from "../../utils/constants";
import { SelectDate } from "./SelectDate";

describe("<SelectDate />", () => {
  it("render", () => {
    const patientId = "0001";
    const value = "";
    const handleChange = cy.stub().as("handleChange");
    const isAdding = true;
    const dates = [
      "2024-05-12T00:00:00Z",
      "2024-05-13T00:00:00Z",
      "2024-05-14T00:00:00Z",
    ];

    cy.intercept(
      "GET",
      TEST_ENDPOINT + `attribute?attribute=date&patientId=${patientId}`,
      {
        body: dates,
      }
    );

    cy.mount(
      <SelectDate
        patientId={patientId}
        value={value}
        handleChange={handleChange}
        isAdding={isAdding}
      />
    );

    cy.get("select[name='date']").should("exist");
    cy.get("select[name='date'] option").should(
      "have.length",
      dates.length + 1
    );

    dates.forEach((date) => {
      cy.get(`select[name='date'] option[value='${date}']`).should("exist");
    });
  });
});
