import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { PaintableModel } from "./PaintableModel";
import { ROTATE_MODE } from "../../utils/constants";
import * as THREE from "three";
import { Stroke } from "../../utils/types";

export function CanvasComponent({
  texture,
  strokesRef,
  paint,
  mode,
  selectedColor,
}: CanvasComponentProps) {
  return (
    <Canvas
      className="model-canvas"
      camera={{ position: [0, 150, 400], fov: 50 }}
    >
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 5, 5]} />
      <directionalLight position={[-5, -5, -5]} />
      <PaintableModel
        texture={texture}
        strokesRef={strokesRef}
        paint={paint}
        mode={mode}
        selectedColor={selectedColor}
      />
      <OrbitControls
        enableDamping={false}
        rotateSpeed={mode === ROTATE_MODE ? 1 : 0}
        target={[0, 100, 0]}
      />
    </Canvas>
  );
}

type CanvasComponentProps = {
  texture: THREE.Texture;
  strokesRef: React.MutableRefObject<Stroke[][]>;
  paint: (u: number, v: number, color: string, size?: number) => void;
  mode: string;
  selectedColor: string;
};
