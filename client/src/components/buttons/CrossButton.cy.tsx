import { CrossButton } from "./CrossButton";

describe("<CrossButton />", () => {
  it("calls handleClean when clicked", () => {
    const handleClean = cy.stub().as("handleClean");

    cy.mount(<CrossButton handleClean={handleClean} />);

    cy.get(".cross-button").click();
    cy.get("@handleClean").should("have.been.called");
  });

  it("disables button when isDisabled prop is true", () => {
    const handleClean = cy.stub().as("handleClean");

    cy.mount(<CrossButton handleClean={handleClean} isDisabled={true} />);
    cy.get(".cross-button").should("be.disabled");
  });

  it("enables button when isDisabled prop is false", () => {
    const handleClean = cy.stub().as("handleClean");

    cy.mount(<CrossButton handleClean={handleClean} isDisabled={false} />);
    cy.get(".cross-button").should("not.be.disabled");
  });
});
