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
        DOCTOR_ENDPOINT + test.doctor
      );
      const typeData = await DataService.getData(
        TEST_TYPE_ENDPOINT + test.type
      );

      // Update the test state with the fetched data
      setNewTest({
        ...test,
        doctor: doctorData.name,
        type: typeData.name,
        date: test.date.split("T")[0],
      });
    };

    fetchData();
  }, [test, setTest]);

  return [newTest];
}
