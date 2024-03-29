import { useEffect } from "react";
import { TEST_TYPES } from "../utils/constants";
import { useData } from "./useData";

export function useParts(endpoint) {
  const [finalEndpoint, setFinalEndpoint] = useState(endpoint);
  const [testType, setTestType] = useData(TEST_TYPES);
}
