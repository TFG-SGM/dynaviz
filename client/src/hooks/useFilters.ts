import { useEffect, useState } from "react";

export function useFilters(filters: { [key: string]: string }) {
  const [filtersText, setFiltersText] = useState("");
  useEffect(() => {
    const newFilters = getFilters(filters);
    setFiltersText(newFilters);
  }, [filters]);

  return [filtersText];
}

function getFilters(filters: { [key: string]: string }) {
  let filtersText = "";
  Object.keys(filters).map((key: string) => {
    if (filters[key] !== "") filtersText += `&${key}=${filters[key]}`;
  });
  return filtersText;
}
