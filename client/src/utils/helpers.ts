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
  return date === format(new Date(), "yyyy-MM-dd");
}

export function getLayerName(number: number) {
  return { 0: "Óseo", 1: "Músculo", 2: "Piel" }[number];
}

export function adjustLightDark(hex: string, level: number) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);

  const maxBlend = 0.5; // Incrementado de 0.3 a 0.5
  const midpoint = 5;
  const blendFactor = (Math.abs(level - midpoint) / midpoint) * maxBlend;

  let blendedR, blendedG, blendedB;

  if (level < midpoint) {
    blendedR = Math.round(r + (255 - r) * blendFactor);
    blendedG = Math.round(g + (255 - g) * blendFactor);
    blendedB = Math.round(b + (255 - b) * blendFactor);
  } else if (level > midpoint) {
    const f = 1 - blendFactor;
    blendedR = Math.round(r * f);
    blendedG = Math.round(g * f);
    blendedB = Math.round(b * f);
  } else {
    blendedR = r;
    blendedG = g;
    blendedB = b;
  }

  // Convert to hexadecimal and ensure two digits
  const toHex = (value: number) => value.toString(16).padStart(2, "0");
  return `#${toHex(blendedR)}${toHex(blendedG)}${toHex(blendedB)}`;
}
