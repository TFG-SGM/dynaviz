import { INITIAL_USER } from "../../utils/constants";
import { UserCard } from "./UserCard";

describe("<UserCard />", () => {
  it("calls setActual with correct parameters when clicked", () => {
    const userData = {
      ...INITIAL_USER,
      _id: "0001",
      uId: "0001",
      name: "Sergio",
      surname: "García Muñoz",
    };

    const setActual = cy.stub().as("setActual");

    cy.mount(<UserCard setActual={setActual} userData={userData} />);

    cy.get(".user-card").click();

    cy.get("@setActual").should("have.been.calledWith", {
      action: "get",
      userId: userData._id,
    });
  });
});
