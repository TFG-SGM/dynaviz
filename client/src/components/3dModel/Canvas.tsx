import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { PaintableModel } from "./PaintableModel";
import { ROTATE_MODE } from "../../utils/constants";
import * as THREE from "three";
import { Stroke } from "../../utils/types";
import { useEffect, useRef } from "react";
import { Downloader3D } from "./Downloader3D";

export function CanvasComponent({
  texture,
  strokesRef,
  saveLocal,
  paint,
  mode,
  selectedColor,
  downloaderRef,
}: CanvasComponentProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = document.querySelector("canvas");
    if (canvas) {
      canvasRef.current = canvas;
    }
  }, []);

  return (
    <>
      <Canvas
        gl={{ preserveDrawingBuffer: true }}
        className="model-canvas"
        camera={{ position: [0, 150, 400], fov: 30 }}
      >
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 5, 5]} />
        <directionalLight position={[-5, -5, -5]} />
        <PaintableModel
          texture={texture}
          strokesRef={strokesRef}
          saveLocal={saveLocal}
          paint={paint}
          mode={mode}
          selectedColor={selectedColor}
        />
        <OrbitControls
          enableDamping={false}
          rotateSpeed={mode === ROTATE_MODE ? 1 : 0}
          target={[0, 100, 0]}
        />
        <Downloader3D ref={downloaderRef} />
      </Canvas>
    </>
  );
}

type CanvasComponentProps = {
  texture: THREE.Texture;
  strokesRef: React.MutableRefObject<Stroke[][]>;
  saveLocal: () => void;
  paint: (u: number, v: number, color: string, size?: number) => void;
  mode: string;
  selectedColor: string;
  downloaderRef: React.RefObject<any>;
};
