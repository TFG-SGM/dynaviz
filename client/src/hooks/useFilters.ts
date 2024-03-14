import { useEffect, useState } from "react";

export function useFilters(filters) {
  const [filtersText, setFiltersText] = useState("");
  useEffect(() => {
    setFiltersText(getFilters(filters));
  }, [filters]);

  return [filtersText];
}

function getFilters(filters) {
  let filtersText = "";
  Object.keys(filters).map((key) => {
    if (filters[key] !== "") filtersText += `&${key}=${filters[key]}`;
  });
  return filtersText;
}
