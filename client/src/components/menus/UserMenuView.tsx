import { useState } from "react";
import { UpdateForm } from "../forms/UpdateForm";

export function UserMenuView({ data, endpoint, setUsers, userId }) {
  const { name, surname, bornDate, address, email, phone } = data;
  const [isUpdate, setIsUpdate] = useState<string | null>(null);

  return (
    <>
      {isUpdate && (
        <UpdateForm
          endpoint={`${endpoint}/${userId}`}
          setActualId={setIsUpdate}
          setData={setUsers}
        ></UpdateForm>
      )}
      <div>
        <p>Nombre: {name}</p>
        <p>Apellidos: {surname}</p>
        <p>Fecha de nacimiento: {bornDate}</p>
        <p>Dirección: {address}</p>
        <p>Email: {email}</p>
        <p>Teléfono: {phone}</p>
      </div>
    </>
  );
}
