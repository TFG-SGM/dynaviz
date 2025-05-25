import { forwardRef, useImperativeHandle } from "react";
import jsPDF from "jspdf";
import { useThree } from "@react-three/fiber";
import * as THREE from "three";
import { Colors, PatientData } from "../../utils/types";

export const Downloader3D = forwardRef((_, ref) => {
  const { gl, scene, camera } = useThree();

  useImperativeHandle(ref, () => ({
    async downloadPdfWithViews(
      patient: PatientData,
      date: string,
      colors: Colors
    ) {
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "px",
        format: [600, 800],
      });

      const marginY = 40;
      const marginX = 30;
      const lineHeight = 22;
      const maxWidth = 250;
      const spacingY = 50;
      const spacingX = 30;

      let yPos = marginY;
      let xPos = marginX;

      // Utilidad para títulos destacados
      const drawSectionTitle = (text: string) => {
        pdf.setFontSize(16);
        pdf.setTextColor(40, 40, 40);
        pdf.setFont("helvetica", "bold");
        pdf.text(text, marginX, yPos);
        yPos += 6;
        pdf.setDrawColor(100, 100, 100);
        pdf.setLineWidth(0.5);
        pdf.line(marginX, yPos, 580, yPos);
        yPos += lineHeight;
      };

      // region PACIENTE
      drawSectionTitle("Información del paciente");

      pdf.setFontSize(12);
      pdf.setFont("helvetica", "normal");
      pdf.setTextColor(60, 60, 60);

      const addPatientInfo = (label: string, value: string) => {
        pdf.text(`${label}: ${value}`, marginX, yPos);
        yPos += lineHeight;
      };

      addPatientInfo("Nombre", `${patient.name} ${patient.surname}`);
      addPatientInfo("ID de paciente", patient.uId as string);
      addPatientInfo("¿Fibromialgia?", patient.isFibro ? "Sí" : "No");
      addPatientInfo(
        "Fecha de nacimiento",
        new Date(patient.date).toLocaleDateString()
      );
      addPatientInfo("Ciudad", patient.city);
      addPatientInfo("Email", patient.email);
      addPatientInfo("Teléfono", patient.phone);
      addPatientInfo("Peso", `${patient.weight} kg`);
      addPatientInfo("Altura", `${patient.height} cm`);
      addPatientInfo("Nivel de actividad", patient.activityLevel);
      addPatientInfo("Años de diagnóstico", patient.diagnosisYears.toString());
      addPatientInfo("Ocupación", patient.occupation);

      yPos += lineHeight;
      // endregion

      // region LEYENDA
      if (Object.keys(colors).length > 0) {
        drawSectionTitle("Leyenda de colores");

        const pageWidth = pdf.internal.pageSize.getWidth();
        const boxPadding = 15;
        const usableWidth = pageWidth - boxPadding * 2;
        Object.keys(colors).forEach((key) => {
          const { color, description, intensity } = colors[key];

          const descFontSize = 10;
          const showDescription = description && description.trim().length > 0;
          const descLines = showDescription
            ? pdf.splitTextToSize(description, usableWidth - 35)
            : [];
          const descHeight = showDescription
            ? descLines.length * (descFontSize + 1)
            : 0;
          const boxHeight = 40 + descHeight;

          // Fondo
          pdf.setFillColor(245, 245, 245);
          pdf.roundedRect(
            boxPadding,
            yPos - 20,
            usableWidth,
            boxHeight,
            6,
            6,
            "F"
          );

          // Color box
          pdf.setFillColor(color);
          pdf.rect(boxPadding + 10, yPos - 10, 16, 16, "F");

          // Nombre del color
          pdf.setFontSize(12);
          pdf.setFont("helvetica", "bold");
          pdf.setTextColor(0, 0, 0);
          pdf.text(key, boxPadding + 35, yPos + 2);

          // Intensidad (alineada a la derecha)
          pdf.setFontSize(10);
          pdf.setFont("helvetica", "normal");
          pdf.text(
            `Intensidad: ${intensity}`,
            boxPadding + usableWidth - 80,
            yPos + 2
          );

          // Descripción
          if (showDescription) {
            pdf.setFontSize(descFontSize);
            pdf.setTextColor(60, 60, 60);
            pdf.text(`Descripción:`, boxPadding + 35, yPos + 16);
            pdf.text(descLines, boxPadding + 35, yPos + 30);
          }

          yPos += boxHeight + 10;

          if (yPos > 760) {
            pdf.addPage();
            yPos = marginY;
          }
        });
      }
      // endregion

      // region MODELO
      pdf.addPage();
      yPos = marginY;
      drawSectionTitle("Modelo");

      pdf.setFont("helvetica", "normal");
      pdf.setFontSize(12);
      pdf.text(`Fecha de modelo: ${date}`, marginX, yPos);
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

        pdf.setFontSize(12);
        pdf.text(view.name, xPos, yPos - 10);

        const width = gl.domElement.width;
        const height = gl.domElement.height;
        const scale = maxWidth / width;
        const scaledHeight = height * scale;

        pdf.setDrawColor(180);
        pdf.setLineWidth(0.8);
        pdf.rect(xPos, yPos, maxWidth, scaledHeight);

        pdf.addImage(dataURL, "PNG", xPos, yPos, maxWidth, scaledHeight);

        if (i % 2 === 0) {
          xPos += maxWidth + spacingX;
        } else {
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
