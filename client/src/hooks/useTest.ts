import { useEffect, useState } from "react";
import { DataService } from "../services/DataService";
import { useData } from "./useData";
import {
  DOCTOR_ENDPOINT,
  TEST_ENDPOINT,
  TEST_TYPE_ENDPOINT,
} from "../utils/constants";
import { TestData } from "../utils/types";

export function useTest(endpoint: string) {
  const [test, setTest] = useData<TestData>(TEST_ENDPOINT + endpoint);
  const [newTest, setNewTest] = useState<TestData | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      if (!test) return;
      const doctorData = await DataService.getData(
        DOCTOR_ENDPOINT + test.doctorId
      );
      const typeData = await DataService.getData(
        TEST_TYPE_ENDPOINT + test.typeId
      );

      // Update the test state with the fetched data
      setNewTest({
        ...test,
        doctorId: doctorData.name,
        typeId: typeData.name,
        date: test.date.split("T")[0],
      });
    };

    fetchData();
  }, [test, setTest]);

  return [newTest];
}
