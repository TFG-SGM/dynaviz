import { useData } from "../hooks/useData";
import { TEST_TYPE_ENDPOINT } from "./constants";
import { TestType } from "./types";

export async function generateDataTest(type) {
  const [testType] = await useData<TestType>(TEST_TYPE_ENDPOINT + type);
}
/*
{
 tiempo: x,
 probabilidad: %,
 problema total: %, 
 partes cuerpo: {
  piernas: {
   pierna izq: {
    angulos ideales: x,
    angulos reales: x,
    problema: %
   },
   pierna der: {
    angles ideales: x,
    angulos reales: x,
    problema: %
   },
   problema: %
  },
  nariz {
   angulos ideales: x,
   angulos reales: x,
   problema: %
  }
 },
}

Usar funciones map y reduce para añadir datos en gráficas
*/
