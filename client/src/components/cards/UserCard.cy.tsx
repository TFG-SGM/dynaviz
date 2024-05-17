import { INITIAL_USER } from "../../utils/constants";
import { UserCard } from "./UserCard";

describe("<UserCard />", () => {
  it("render", () => {
    const userData = {
      ...INITIAL_USER,
      _id: "0001",
      uId: "0001",
      name: "John",
      surname: "Doe",
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
