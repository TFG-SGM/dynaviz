export function HelpElement({ chart }) {
  switch (chart) {
    case "line" || "boxplot1":
      return (
        <>
          <p>
            En esta gráfica se compara el desplazamiento de movimiento entre el
            real y el ideal durante cada segundo del vídeo.
          </p>
          <p>Se puede elegir la parte del cuerpo y el eje.</p>
        </>
      );
    case "bar" || "radar" || "pie" || "treemap":
      return (
        <>
          <p>
            En esta gráfica se compara la restricción de movimiento de todas las
            partes del cuerpo.
          </p>
        </>
      );

    case "histogram":
      return (
        <>
          <p>
            En esta gráfica compara el número de veces que ha tenido una parte
            del cuerpo una variación en concreto.
          </p>
          <p>
            Por ejemplo, si la parte del cuerpo A ha tenido una variación de 10
            respecto al ideal 2 veces durante el vídeo.
          </p>
          <p>Se puede elegir la parte del cuerpo y el eje.</p>
          <p></p>
        </>
      );

    case "boxplot2":
      return (
        <>
          <p>
            En esta gráfica se compara la variación de cada una de las partes
            del cuerpo.
          </p>
          <p>Se puede elegir el eje.</p>
        </>
      );
    case "bubble":
      return (
        <>
          <p>
            En esta gráfica se observa la correlación de variaciones entre dos
            partes del cuerpo.
          </p>
          <p>
            Por ejemplo, cuando la parte del cuerpo A tiene 10 de variación, la
            parte del cuerpo B tiene 20 en el mismo momento de la prueba.
          </p>
          <p>El tamaño del punto indica el número de coincidencias.</p>
          <p>Se puede elegir las partes del cuerpo a comparar y el eje.</p>
        </>
      );
    case "heatmap":
      return (
        <>
          <p>
            En esta gráfica se observa la correlación de variaciones entre dos
            partes del cuerpo.
          </p>
          <p>
            Por ejemplo, cuando la parte del cuerpo A tiene 10 de variación, la
            parte del cuerpo B tiene 20 en el mismo momento de la prueba.
          </p>
          <p>El color indica el número de coincidencias.</p>
          <p>Se puede elegir las partes del cuerpo a comparar y el eje.</p>
        </>
      );
    case "line-evolution":
      return (
        <>
          <p>
            En esta gráfica se observa la restricción de movimiento total de
            todas las pruebas realizadas.
          </p>
          <p>
            Se puede elegir el tipo de prueba. Una vez elegido el tipo, se puede
            comparar la restricción de movimiento individual de cada parte del
            cuerpo.
          </p>
        </>
      );
    case "bar-evolution":
      return (
        <>
          <p>
            En esta gráfica se observa la restricción de movimiento total de
            todas las pruebas realizadas.
          </p>
          <p>
            Se puede elegir el tipo de prueba. Una vez elegido el tipo, se puede
            observar la acumulación de la restricción de movimiento individual
            de cada parte del cuerpo.
          </p>
        </>
      );
    default:
      return;
  }
}
