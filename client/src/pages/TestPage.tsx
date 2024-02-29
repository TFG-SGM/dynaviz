import { useParams } from "react-router-dom";
import { useData } from "../hooks/useData";
import { TestData } from "../utils/types";
import { TEST_ENDPOINT } from "../utils/constants";
import { LoadingComponent } from "../components/other/LoadingComponent";

export function TestPage() {
  const { testId } = useParams();
  const [test] = useData<TestData>(TEST_ENDPOINT + testId);

  if (!test) <LoadingComponent></LoadingComponent>;

  return <h1>{test?.date}</h1>;
}
