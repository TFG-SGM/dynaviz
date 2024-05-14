import { useData } from "../../hooks/useData";
import {
  DOCTOR_ENDPOINT,
  PATIENT_ENDPOINT,
  TEST_TYPE_ENDPOINT,
} from "../../utils/constants";
import {
  PatientData,
  TestData,
  TestTypeData,
  UserData,
} from "../../utils/types";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
import { BarChart } from "../charts/bar";
import { useEffect, useState } from "react";
import { CrossButton } from "../buttons/CrossButton";
import { Overlay } from "../other/Overlay";

export function Inform({ test, handleClean }: { test: TestData }) {
  const { doctorId, typeId, date, patientId, evaScale } = test;
  const [doctor] = useData<UserData>(DOCTOR_ENDPOINT + doctorId);
  const [type] = useData<TestTypeData>(TEST_TYPE_ENDPOINT + typeId);
  const [patient] = useData<PatientData>(PATIENT_ENDPOINT + patientId);
  const [parts, setParts] = useState([]);

  useEffect(() => {
    if (!test.data?.parts) return;
    const partsWithRestrictions = Object.keys(test.data.parts).map(
      (partKey) => ({
        partKey: partKey,
        restriction: test.data?.parts[partKey].restriction,
      })
    );

    partsWithRestrictions.sort((a, b) => {
      return b.restriction - a.restriction;
    });

    setParts(partsWithRestrictions);
  }, [test.data?.parts]);

  const exportInform = () => {
    const informDiv = document.querySelector(".inform");

    // Use html2canvas to capture the content of the div as an image
    html2canvas(informDiv).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");

      // Calculate dimensions to fit the image on the PDF
      const imgWidth = 190; // Width of the content area
      const pageHeight = 297; // A4 height in mm
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      let heightLeft = imgHeight;
      let position = 10; // Starting position with margin

      // Create a new jsPDF instance
      const pdf = new jsPDF("p", "mm", "a4");

      // Add the captured image to the PDF
      pdf.addImage(imgData, "PNG", 10, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      // Add new pages if the content exceeds one page
      while (heightLeft >= 0) {
        position = heightLeft - imgHeight + 10; // Adjusting for margin
        pdf.addPage();
        pdf.addImage(imgData, "PNG", 10, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }

      // Save or open the PDF
      pdf.save("inform.pdf");
    });
  };

  if (!test.data) return;
  return (
    <>
      <Overlay></Overlay>
      <dialog open className="inform-dialog">
        <CrossButton handleClean={handleClean}></CrossButton>
        <div className="inform">
          <div className="infomr-part">
            <h1>
              Prueba de {patient?.name} {patient?.surname}
            </h1>
            <hr></hr>
          </div>
          <div className="inform-part">
            <h2>Datos de Prueba</h2>
            <p>
              <strong>Médico:</strong>{" "}
              {doctor ? `${doctor.name} ${doctor.surname}` : "Ninguno"}
            </p>
            <p>
              <strong>Tipo:</strong> {type?.name}
            </p>
            <p>
              <strong>Fecha:</strong> {date.split("T")[0]}
            </p>
            <p>
              <strong>Escala EVA:</strong> {evaScale} / 10
            </p>
            <p>
              <strong>Restricción de movimiento total: </strong>
              {test.data.restriction}
            </p>
          </div>

          <div className="inform-part">
            <h2>Restricciones de Movimiento</h2>

            {parts.map((part) => (
              <p key={part.partKey}>
                <strong>{part.partKey}: </strong> {part.restriction}
              </p>
            ))}
          </div>
          <div className="inform-part">
            <h2>Gráfica de Barras</h2>
            <BarChart data={test.data}></BarChart>
          </div>
        </div>
        <div className="inform-buttons">
          <button onClick={handleClean} className="cancel-button">
            Cancelar
          </button>
          <button onClick={exportInform}>Exportar</button>
        </div>
      </dialog>
    </>
  );
}
