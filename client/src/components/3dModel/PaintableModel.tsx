import { useGLTF } from "@react-three/drei";
import { Mesh } from "three";
import * as THREE from "three";
import { useEffect, useRef } from "react";
import { ThreeEvent } from "@react-three/fiber";
import { DRAWING_MODE } from "../../utils/constants";
import { Stroke } from "../../utils/types";

export function PaintableModel({
  texture,
  strokesRef,
  paint,
  mode,
  selectedColor,
}: PaintableModelProps) {
  const { scene } = useGLTF("/male.glb");
  console.log("selectColor", selectedColor);

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
    isPainting.current = true;
    if (e.uv) {
      const { x: u, y: v } = e.uv;
      paint(u, v, selectedColor);
    }
  };

  const handlePointerMove = (e: ThreeEvent<PointerEvent>) => {
    if (!isPainting.current || !e.uv || e.button === 2) return;
    const { x: u, y: v } = e.uv;
    paint(u, v, selectedColor);
  };

  return (
    <>
      <primitive
        object={scene}
        onPointerDown={
          mode === DRAWING_MODE && selectedColor !== "" && handlePointerDown
        }
        onPointerMove={
          mode === DRAWING_MODE && selectedColor !== "" && handlePointerMove
        }
      />
    </>
  );
}

type PaintableModelProps = {
  texture: THREE.Texture;
  strokesRef: React.MutableRefObject<Stroke[][]>; // Updated to match multiple layers
  paint: (u: number, v: number, color: string, size?: number) => void;
  mode: string;
  selectedColor: string;
};
