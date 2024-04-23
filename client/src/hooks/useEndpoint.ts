import { useEffect, useState } from "react";
import {
  ACTUAL_USER_ENDPOINT,
  ADMIN_ENDPOINT,
  DOCTOR_ENDPOINT,
} from "../utils/constants";
import { useData } from "./useData";
import { UserData } from "../utils/types";

export function useEndpoint() {
  const [actualUser] = useData<UserData>(ACTUAL_USER_ENDPOINT);
  const [endpoint, setEndpoint] = useState<null | string>(null);

  useEffect(() => {
    if (!actualUser) return;
    setEndpoint(
      actualUser?.role === "doctor" ? DOCTOR_ENDPOINT : ADMIN_ENDPOINT
    );
  }, [actualUser]);

  return [endpoint];
}
