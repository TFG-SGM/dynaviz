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
