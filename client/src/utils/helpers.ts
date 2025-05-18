import { format } from "date-fns";

export function updateDataHelper<T extends { _id: string }>(
  prevState: T[] | null,
  updatedData: T
) {
  if (!prevState) return [updatedData];

  const index = prevState.findIndex((user: T) => user._id === updatedData._id);
  const updatedState = [...prevState];
  updatedState[index] = updatedData;
  return updatedState;
}

export function getUserType(endpoint: string) {
  return {
    "admin/": "Administrador",
    "doctor/": "Médico",
    "patient/": "Paciente",
  }[endpoint];
}

export function calculateAge(date: string): number {
  const birthDate = new Date(date);
  const currentDate = new Date();
  const yearsDiff = currentDate.getFullYear() - birthDate.getFullYear();

  // Check if the birthday has occurred this year already
  const hasBirthdayOccurred =
    currentDate.getMonth() > birthDate.getMonth() ||
    (currentDate.getMonth() === birthDate.getMonth() &&
      currentDate.getDate() >= birthDate.getDate());

  // If birthday hasn't occurred yet this year, subtract 1 from age
  const age = hasBirthdayOccurred ? yearsDiff : yearsDiff - 1;

  return age;
}

export function isToday(date: string) {
  console.log(new Date());
  return date === format(new Date(), "yyyy-MM-dd");
}

export function getLayerName(number: number) {
  return { 0: "Interno", 1: "Musculo", 2: "Piel" }[number];
}
