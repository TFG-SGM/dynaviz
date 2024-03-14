import { useEffect, useState } from "react";

export function useTestsCount(tests) {
  const [numTests, setNumTests] = useState(0);
  useEffect(() => {
    if (tests) {
      const count = countTests(tests);
      setNumTests(count);
    }
  }, [tests]);

  return [numTests];
}

function countTests(tests) {
  let numTests = 0;
  for (const key in tests) {
    if (typeof tests[key] === "object") {
      numTests += Object.keys(tests[key]).length; // Count keys in nested dictionary
    }
  }

  return numTests;
}
