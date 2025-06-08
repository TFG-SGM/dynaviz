import { useGLTF } from "@react-three/drei";
import { Mesh } from "three";
import * as THREE from "three";
import { useEffect, useRef } from "react";
import { ThreeEvent } from "@react-three/fiber";
import { DRAWING_MODE } from "../../utils/constants";
import { Stroke } from "../../utils/types";
import { toast } from "sonner";

export function PaintableModel({
  texture,
  strokesRef,
  saveLocal,
  paint,
  mode,
  selectedColor,
}: PaintableModelProps) {
  const { scene } = useGLTF("/male.glb");
  const mesh = scene.children[0] as Mesh;

  mesh.material = new THREE.MeshStandardMaterial({ map: texture });

  const isPainting = useRef(false);

  useEffect(() => {
    const handleMouseUp = () => {
      isPainting.current = false;
    };
    window.addEventListener("mouseup", handleMouseUp);
    return () => window.removeEventListener("mouseup", handleMouseUp);
  }, [strokesRef]);

  const handlePointerDown = (e: ThreeEvent<PointerEvent>) => {
    e.stopPropagation();
    if (e.button === 2) return;
    if (selectedColor === "") {
      toast.warning("Selecciona un color antes de pintar");
      return;
    }
    saveLocal();
    isPainting.current = true;
    if (e.uv) {
      const { x: u, y: v } = e.uv;
      paint(u, v, selectedColor);
    }
  };

  const handlePointerMove = (e: ThreeEvent<PointerEvent>) => {
    if (!isPainting.current || !e.uv || e.button === 2) return;
    if (selectedColor === "") {
      toast.warning("Selecciona un color antes de pintar");
      return;
    }
    const { x: u, y: v } = e.uv;
    paint(u, v, selectedColor);
  };

  return (
    <>
      <primitive
        object={scene}
        onPointerDown={mode === DRAWING_MODE && handlePointerDown}
        onPointerMove={mode === DRAWING_MODE && handlePointerMove}
      />
    </>
  );
}

type PaintableModelProps = {
  texture: THREE.Texture;
  strokesRef: React.MutableRefObject<Stroke[][]>;
  saveLocal: () => void;
  paint: (u: number, v: number, color: string, size?: number) => void;
  mode: string;
  selectedColor: string;
};
