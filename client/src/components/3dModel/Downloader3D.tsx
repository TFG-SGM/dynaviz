import { forwardRef, useImperativeHandle } from "react";
import jsPDF from "jspdf";
import { useThree } from "@react-three/fiber";
import * as THREE from "three";

export const Downloader3D = forwardRef((_, ref) => {
  const { gl, scene, camera } = useThree();

  useImperativeHandle(ref, () => ({
    async downloadPdfWithViews(patient, date, colors) {
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "px",
        format: [600, 800],
      });

      const marginY = 30;
      const marginX = 20;
      const lineHeight = 20;
      const colorLineHeight = 30;
      const maxWidth = 250;
      const spacingY = 50;
      const spacingX = 20;

      let yPos = marginY;
      let xPos = marginX;

      // region PACIENTE
      pdf.setFontSize(16);
      pdf.text("Información del paciente", marginX, yPos);
      yPos += lineHeight;

      pdf.setFontSize(12);

      pdf.text(`Nombre: ${patient.name} ${patient.surname}`, marginX, yPos);
      yPos += lineHeight;

      pdf.text(`ID de paciente: ${patient.uId}`, marginX, yPos);
      yPos += lineHeight;

      pdf.text(
        `¿Fibromialgia? ${patient.isFibro ? "Sí" : "No"}`,
        marginX,
        yPos
      );
      yPos += lineHeight;

      const dob = new Date(patient.date).toLocaleDateString();
      pdf.text(`Fecha de nacimiento: ${dob}`, marginX, yPos);
      yPos += lineHeight;

      pdf.text(`Ciudad: ${patient.city}`, marginX, yPos);
      yPos += lineHeight;

      pdf.text(`Email: ${patient.email}`, marginX, yPos);
      yPos += lineHeight;

      pdf.text(`Teléfono: ${patient.phone}`, marginX, yPos);
      yPos += lineHeight;

      pdf.text(`Peso: ${patient.weight} kg`, marginX, yPos);
      yPos += lineHeight;

      pdf.text(`Altura: ${patient.height} cm`, marginX, yPos);
      yPos += lineHeight;

      pdf.text(`Nivel de actividad: ${patient.activityLevel}`, marginX, yPos);
      yPos += lineHeight;

      pdf.text(`Años de diagnóstico: ${patient.diagnosisYears}`, marginX, yPos);
      yPos += lineHeight;

      pdf.text(`Ocupación: ${patient.occupation}`, marginX, yPos);

      yPos += lineHeight * 2;
      // endregion

      // region LEYENDA
      pdf.setFontSize(16);
      pdf.text("Leyenda de colores", 20, yPos);

      pdf.setFontSize(12);
      yPos += lineHeight;

      Object.keys(colors).forEach((key) => {
        const colorObj = colors[key];

        // Dibuja un rectángulo con el color
        pdf.setFillColor(colorObj.color);
        pdf.rect(20, yPos - 12, 20, 20, "F"); // "F" para fill (relleno)

        // Escribe la key, descripción e intensidad
        pdf.setTextColor(0, 0, 0);
        pdf.text(key, 50, yPos);
        pdf.text(`Descripción: ${colorObj.description}`, 150, yPos);
        pdf.text(`Intensidad: ${colorObj.intensity}`, 400, yPos);

        yPos += colorLineHeight;

        // Si llegamos al final de la página, agrega página nueva y reinicia yPos
        if (yPos > 780) {
          pdf.addPage();
          yPos = marginY;
        }
      });
      // endregion

      pdf.addPage();
      yPos = marginY;

      // region MODELO
      pdf.setFontSize(16);
      pdf.text("Modelo", 20, yPos);
      yPos += lineHeight / 2;

      pdf.setFontSize(12);
      pdf.text(`Fecha de modelo: ${date}`, 20, yPos);
      yPos += lineHeight * 2;

      const originalPosition = camera.position.clone();
      const views = [
        { name: "Frontal", pos: new THREE.Vector3(0, 150, 400) },
        { name: "Trasera", pos: new THREE.Vector3(0, 150, -400) },
        { name: "Lateral Izquierdo", pos: new THREE.Vector3(400, 150, 0) },
        { name: "Lateral Derecho", pos: new THREE.Vector3(-400, 150, 0) },
        { name: "Superior", pos: new THREE.Vector3(0, 400, 0) },
        { name: "Inferior", pos: new THREE.Vector3(0, -100, 0) },
      ];

      for (let i = 0; i < views.length; i++) {
        const view = views[i];
        camera.position.copy(view.pos);
        camera.lookAt(0, 100, 0);
        gl.render(scene, camera);
        const dataURL = gl.domElement.toDataURL("image/png");

        pdf.text(view.name, xPos, yPos - 10);

        const width = gl.domElement.width;
        const height = gl.domElement.height;
        const scale = maxWidth / width;
        const scaledHeight = height * scale;

        pdf.setDrawColor(0, 0, 0);
        pdf.setLineWidth(1);
        pdf.rect(xPos, yPos, maxWidth, scaledHeight);

        pdf.addImage(dataURL, "PNG", xPos, yPos, maxWidth, scaledHeight);

        if (i % 2 === 0) {
          // Primera columna, movemos a la segunda columna
          xPos += maxWidth + spacingX;
        } else {
          // Segunda columna, bajamos fila y volvemos a la primera columna
          xPos = marginX;
          yPos += scaledHeight + spacingY;
        }
      }
      camera.position.copy(originalPosition);
      camera.lookAt(0, 100, 0);
      // endregion

      pdf.save("modelo_3d.pdf");
    },
  }));

  return null;
});
