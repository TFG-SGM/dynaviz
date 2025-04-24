import { useMemo, useRef } from "react";
import * as THREE from "three";
import { Stroke } from "../utils/types";

export function usePaintTexture({ size = 1024, initialColor = "#ffffff" }) {
  const canvasRefs = useRef<HTMLCanvasElement[]>([]);
  const strokesRefs = useRef<Stroke[][]>([]);
  const activeLayer = useRef(0);

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

  const paint = (u: number, v: number, color = "red", size = 10) => {
    const canvas = canvasRefs.current[activeLayer.current];
    const ctx = canvas.getContext("2d");
    const x = u * canvas.width;
    const y = (1 - v) * canvas.height; // invert Y
    if (ctx) {
      ctx.fillStyle = color;
      ctx.beginPath();
      ctx.arc(x, y, size, 0, Math.PI * 2);
      ctx.fill();
    }
    strokesRefs.current[activeLayer.current].push({ u, v, color, size });
    updateTexture();
  };

  const updateTexture = () => {
    const combinedCanvas = document.createElement("canvas");
    combinedCanvas.width = combinedCanvas.height = size;
    const ctx = combinedCanvas.getContext("2d");
    if (ctx) {
      ctx.clearRect(0, 0, combinedCanvas.width, combinedCanvas.height);

      canvasRefs.current.forEach((canvas) => {
        ctx.globalAlpha = 1.0;
        ctx.globalCompositeOperation = "multiply";
        ctx.drawImage(canvas, 0, 0);
      });
    }
    texture.image = combinedCanvas;
    texture.needsUpdate = true;
  };

  const clearLayer = (layer: number) => {
    const canvas = canvasRefs.current[layer];
    const ctx = canvas.getContext("2d");
    if (ctx) {
      ctx.fillStyle = initialColor;
      ctx.fillRect(0, 0, size, size);
    }
    strokesRefs.current[layer] = [];
    updateTexture();
  };

  const clearAllLayers = () => {
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

  const setActiveLayer = (layer: number) => {
    if (layer >= 0 && layer < canvasRefs.current.length) {
      activeLayer.current = layer;
    } else {
      console.error(`Invalid layer index: ${layer}`);
    }
  };

  const save = () => {
    const data = JSON.stringify(strokesRefs.current);
    localStorage.setItem("paintLayers", data);
  };

  const load = () => {
    const data = localStorage.getItem("paintLayers");
    if (data) {
      const parsedLayers = JSON.parse(data);
      parsedLayers.forEach((strokes: Stroke[], layerIndex: number) => {
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
      updateTexture();
    } else {
      console.error("No saved layers found in localStorage");
    }
  };

  return {
    texture,
    strokesRefs,
    activeLayer,
    paint,
    clearLayer,
    clearAllLayers,
    setActiveLayer,
    save,
    load,
  };
}
