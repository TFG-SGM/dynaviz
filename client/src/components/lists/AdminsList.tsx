import { useState } from "react";
import { useData } from "../../hooks/useData";
import { UsersList } from "./UsersList";
import { ADMIN_ENDPOINT, ADMIN_FIELDS } from "../../utils/constants";
import { UserData } from "../../utils/types";

export function AdminsList() {
  const [admins, setAdmins] = useData<UserData[]>(ADMIN_ENDPOINT);
  const [adminId, setAdminId] = useState<string | null>(null);

  return (
    <UsersList
      users={admins}
      setUsers={setAdmins}
      userId={adminId}
      setUserId={setAdminId}
      endpoint={ADMIN_ENDPOINT}
      fields={ADMIN_FIELDS}
    ></UsersList>
  );
}
