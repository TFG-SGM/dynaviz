import { EmptyListComponent } from "../other/EmptyListComponent";
import { LoadingComponent } from "../other/LoadingComponent";

export function TestsList({ tests }) {
  return (
    <>
      <button>Añadir prueba</button>
      {!tests ? (
        <LoadingComponent></LoadingComponent>
      ) : tests.length === 0 ? (
        <EmptyListComponent></EmptyListComponent>
      ) : (
        <>
          <button>Consultar evolución</button>
          <p>Tests...</p>
        </>
      )}
    </>
  );
}
