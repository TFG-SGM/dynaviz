import { useEffect, useState } from "react";
import { ACTUAL_USER_ENDPOINT, PATIENT_ENDPOINT } from "../utils/constants";
import { UserData } from "../utils/types";
import { useData } from "./useData";

export function useUserEndpoint(endpoint: string) {
  const [actualUser] = useData<UserData>(ACTUAL_USER_ENDPOINT);
  const [finalEndpoint, setEndpoint] = useState<string | null>(null);

  useEffect(() => {
    if (!actualUser) return;
    if (endpoint !== PATIENT_ENDPOINT) {
      setEndpoint(endpoint);
    } else {
      let patientFilter = "";
      if (actualUser.role === "doctor") {
        patientFilter = `?doctorId=${actualUser._id}`;
      }

      setEndpoint(endpoint + patientFilter);
    }
  }, [actualUser, endpoint]);

  return [finalEndpoint];
}
