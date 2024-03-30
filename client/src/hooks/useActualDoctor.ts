import { Dispatch, SetStateAction, useEffect } from "react";
import { useData } from "./useData";
import { UserData } from "../utils/types";
import { ACTUAL_USER_ENDPOINT } from "../utils/constants";

export function useActualDoctor<T>(setNewData: Dispatch<SetStateAction<T>>) {
  const [actualUser] = useData<UserData>(ACTUAL_USER_ENDPOINT);

  useEffect(() => {
    if (!actualUser) return;
    setNewData((prevState) => ({ ...prevState, doctorId: actualUser._id }));
  }, [actualUser, setNewData]);
}
