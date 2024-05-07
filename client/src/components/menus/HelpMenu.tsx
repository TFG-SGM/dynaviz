import { CrossButton } from "../buttons/CrossButton";
import { HelpElement } from "../elements/HelpElement";
import { Overlay } from "../other/Overlay";

interface HelpMenuProps {
  chart: string;
  isEvolution?: boolean;
  handleClean: () => void;
}

export function HelpMenu({
  chart,
  isEvolution = false,
  handleClean,
}: HelpMenuProps) {
  if (isEvolution) chart += "-evolution";
  return (
    <>
      <Overlay></Overlay>
      <dialog open className="help-menu">
        <div className="menu-title">
          <h2>Ayuda</h2>
          <CrossButton handleClean={handleClean}></CrossButton>
        </div>
        <h3>¿Qué hace esta gráfica?</h3>
        <HelpElement chart={chart}></HelpElement>

        <h3>Datos identificados</h3>
        <p>
          <strong>Desplazamiento ideal y real de cada parte del cuerpo:</strong>{" "}
          Se registra el movimiento óptimo y el movimiento real en cada segundo
          del vídeo en los ejes x e y.
        </p>
        <p>
          <strong>Variación entre desplazamiento ideal y real:</strong> Se
          analiza la discrepancia entre el movi- miento deseado y el observado
          en cada parte del cuerpo y en cada segundo del vídeo, en los ejes x e
          y.
        </p>
        <p>
          <strong>Restricción de movimiento por parte del cuerpo:</strong> Se
          asigna un valor del 0 al 100 que representa la limitación de
          movimiento para cada parte del cuerpo. Este cálculo se basa en las
          variaciones de movimiento observadas en los ejes x e y entre todos los
          pacientes, siendo el valor máximo (100) la media de las cinco peores
          situaciones.
        </p>
        <p>
          <strong>Restricción de movimiento total después de la prueba:</strong>{" "}
          Al igual que el dato anterior, se asigna un valor del 0 al 100 que
          indica la restricción de movimiento total tras la prueba. Este valor
          se calcula considerando la media de las restricciones individuales de
          movimiento para cada parte del cuerpo entre todos los pacientes,
          siendo el valor máximo (100) la media de las cinco peores situaciones.
        </p>
      </dialog>
    </>
  );
}
