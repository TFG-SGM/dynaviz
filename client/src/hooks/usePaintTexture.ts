import { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";
import { Colors, Stroke } from "../utils/types";
import { DataService } from "../services/DataService";

export function usePaintTexture({
  patientId,
  colors,
  setColors,
  size = 1024,
  initialColor = "#fff",
}: {
  patientId: string;
  colors: Colors;
  setColors: (colors: Colors) => void;
  size?: number;
  initialColor?: string;
}) {
  const canvasRefs = useRef<HTMLCanvasElement[]>([]);
  const strokesRefs = useRef<Stroke[][]>([]);
  const activeLayers = useRef<Set<number>>(new Set([0]));
  const [visibleLayers, setVisibleLayers] = useState<Set<number>>(
    new Set([0, 1, 2])
  );
  useEffect(() => {
    updateTexture();
  }, [visibleLayers]);

  const texture = useMemo(() => {
    const canvases = Array.from({ length: 3 }, () => {
      const canvas = document.createElement("canvas");
      canvas.width = canvas.height = size;
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.fillStyle = initialColor;
        ctx.fillRect(0, 0, size, size);
      }
      return canvas;
    });
    canvasRefs.current = canvases;
    strokesRefs.current = canvases.map(() => []);
    const tex = new THREE.CanvasTexture(canvases[0]);
    tex.needsUpdate = true;
    return tex;
  }, [initialColor, size]);

  const paint = (u: number, v: number, color: string, size = 10) => {
    activeLayers.current.forEach((layer) => {
      const canvas = canvasRefs.current[layer];
      const ctx = canvas.getContext("2d");
      const x = u * canvas.width;
      const y = (1 - v) * canvas.height; // invert Y
      if (ctx) {
        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.arc(x, y, size, 0, Math.PI * 2);
        ctx.fill();
      }
      strokesRefs.current[layer].push({ u, v, color, size });
    });
    updateTexture();
  };

  const updateTexture = () => {
    const combinedCanvas = document.createElement("canvas");
    combinedCanvas.width = combinedCanvas.height = size;
    const ctx = combinedCanvas.getContext("2d");
    if (ctx) {
      // Establecer un fondo predeterminado (por ejemplo, blanco)
      ctx.fillStyle = initialColor; // Usa el color inicial como fondo
      ctx.fillRect(0, 0, combinedCanvas.width, combinedCanvas.height);

      // Dibujar las capas visibles
      visibleLayers.forEach((layer) => {
        const canvas = canvasRefs.current[layer];
        ctx.globalAlpha = 1.0;
        ctx.globalCompositeOperation = "multiply";
        ctx.drawImage(canvas, 0, 0);
      });
    }
    texture.image = combinedCanvas;
    texture.needsUpdate = true;
  };

  const toggleLayerVisibility = (layer: number) => {
    setVisibleLayers((prev) => {
      const updated = new Set(prev);
      if (updated.has(layer)) {
        updated.delete(layer); // Ocultar capa
      } else {
        updated.add(layer); // Hacer visible la capa
      }
      return updated;
    });
  };

  const clearLayer = (layer: number) => {
    const canvas = canvasRefs.current[layer];
    const ctx = canvas.getContext("2d");
    if (ctx) {
      ctx.fillStyle = initialColor;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    }
    strokesRefs.current[layer] = [];
    updateTexture();
  };

  const reset = () => {
    canvasRefs.current.forEach((canvas, index) => {
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.fillStyle = initialColor;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }
      strokesRefs.current[index] = [];
    });
    updateTexture();
  };

  const setActiveLayers = (layers: number[]) => {
    const validLayers = layers.filter(
      (layer) => layer >= 0 && layer < canvasRefs.current.length
    );
    if (validLayers.length > 0) {
      activeLayers.current = new Set(validLayers);
      updateTexture();
    } else {
      console.error(`Invalid layer indices: ${layers}`);
    }
  };

  const editColor = (colorToEdit: string, newColor: string) => {
    canvasRefs.current.forEach((canvas, layerIndex) => {
      const ctx = canvas.getContext("2d");
      if (ctx) {
        // Actualizar las trazas con el nuevo color
        const updatedStrokes = strokesRefs.current[layerIndex].map((stroke) => {
          if (stroke.color === colorToEdit) {
            return { ...stroke, color: newColor }; // Cambiar el color
          }
          return stroke;
        });

        // Limpiar el lienzo
        ctx.fillStyle = initialColor;
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Redibujar las trazas actualizadas
        updatedStrokes.forEach(({ u, v, color, size }) => {
          const x = u * canvas.width;
          const y = (1 - v) * canvas.height;
          ctx.fillStyle = color;
          ctx.beginPath();
          ctx.arc(x, y, size, 0, Math.PI * 2);
          ctx.fill();
        });

        // Actualizar las trazas de la capa
        strokesRefs.current[layerIndex] = updatedStrokes;
      }
    });
    // Actualizar la textura
    updateTexture();
  };

  const deleteColor = (colorToDelete: string) => {
    canvasRefs.current.forEach((canvas, layerIndex) => {
      const ctx = canvas.getContext("2d");
      if (ctx) {
        // Filtrar las trazas que no coincidan con el color a eliminar
        const remainingStrokes = strokesRefs.current[layerIndex].filter(
          (stroke) => stroke.color !== colorToDelete
        );

        // Limpiar el lienzo
        ctx.fillStyle = initialColor;
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Redibujar las trazas restantes
        remainingStrokes.forEach(({ u, v, color, size }) => {
          const x = u * canvas.width;
          const y = (1 - v) * canvas.height;
          ctx.fillStyle = color;
          ctx.beginPath();
          ctx.arc(x, y, size, 0, Math.PI * 2);
          ctx.fill();
        });

        // Actualizar las trazas de la capa
        strokesRefs.current[layerIndex] = remainingStrokes;
      }
    });

    // Actualizar la textura
    updateTexture();
  };

  const save = async () => {
    try {
      const data = JSON.stringify(strokesRefs.current);
      await DataService.createData("modelPainted", {
        patientId: patientId,
        date: new Date(),
        data: strokesRefs.current,
        colors: colors,
      });
      localStorage.setItem("paintLayers", data);
    } catch (error) {
      console.error("Error saving paint layers:", error);
    }
  };

  const load = async (date = new Date().toISOString().split("T")[0]) => {
    try {
      const data = await DataService.getData(
        `modelPainted/patient/${patientId}/${date}`
      );

      if (data) {
        data.data.forEach((strokes: Stroke[], layerIndex: number) => {
          const canvas = canvasRefs.current[layerIndex];
          const ctx = canvas.getContext("2d");
          if (ctx) {
            ctx.fillStyle = initialColor;
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            strokes.forEach(({ u, v, color, size }: Stroke) => {
              const x = u * canvas.width;
              const y = (1 - v) * canvas.height;
              ctx.fillStyle = color;
              ctx.beginPath();
              ctx.arc(x, y, size, 0, Math.PI * 2);
              ctx.fill();
            });
          }
          strokesRefs.current[layerIndex] = strokes;
        });

        setColors(data.colors);
        updateTexture();
      } else {
        console.error("No saved layers found in localStorage");
      }
    } catch (error) {
      console.error("Error loading paint layers:", error);
      reset();
      setColors({});
    }
  };

  return {
    texture,
    strokesRefs,
    visibleLayers,
    paint,
    clearLayer,
    reset,
    setActiveLayers,
    save,
    load,
    editColor,
    deleteColor,
    toggleLayerVisibility,
  };
}
