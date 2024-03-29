import { Dispatch, FormEvent, SetStateAction, useState } from "react";
import { UserData, actual } from "../../utils/types";

interface UsersCard {
  setActual: Dispatch<SetStateAction<actual>>;
  userData: UserData;
}

export function UserCard({ setActual, userData }: UsersCard) {
  const { _id, name, surname } = userData;

  const handleView = (e: FormEvent) => {
    const { target } = e;
    const userId = (target as HTMLButtonElement).getAttribute("data-user-id");

    setActual({
      action: "get",
      userId,
    });
  };

  return (
    <h2 className="user-card" data-user-id={_id} onClick={handleView}>
      {name} {surname}
    </h2>
  );
}
