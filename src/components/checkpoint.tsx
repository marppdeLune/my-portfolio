import { Billboard, Text } from "@react-three/drei";
import type { ThreeEvent } from "@react-three/fiber";
import { useState } from "react";
import type { CheckpointData } from "../data/sections";
import type { SceneTheme } from "../theme";

type CheckpointProps = {
  checkpoint: CheckpointData;
  disabled: boolean;
  isActive: boolean;
  sceneTheme: SceneTheme;
  onSelect: (checkpoint: CheckpointData) => void;
};

export const Checkpoint = ({
  checkpoint,
  disabled,
  isActive,
  sceneTheme,
  onSelect,
}: CheckpointProps) => {
  const [hovered, setHovered] = useState(false);
  const color = hovered || isActive ? sceneTheme.checkpointActive : sceneTheme.checkpoint;

  const handlePointerOver = (event: ThreeEvent<PointerEvent>) => {
    event.stopPropagation();
    setHovered(true);
    document.body.style.cursor = disabled ? "not-allowed" : "pointer";
  };

  return (
    <group position={checkpoint.position}>
      <mesh
        position={[0, 0.35, 0]}
        onClick={(event: ThreeEvent<MouseEvent>) => {
          event.stopPropagation();
          if (!disabled) onSelect(checkpoint);
        }}
        onPointerOver={handlePointerOver}
        onPointerOut={() => {
          setHovered(false);
          document.body.style.cursor = "default";
        }}
        scale={hovered || isActive ? 1.22 : 1}
        castShadow
      >
        <sphereGeometry args={[0.38, 24, 24]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={hovered || isActive ? 1.3 : 0.65}
          roughness={0.25}
        />
      </mesh>
      <mesh rotation-x={-Math.PI / 2} receiveShadow>
        <ringGeometry args={[0.55, 0.72, 32]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.35} />
      </mesh>
      <Billboard position={[0, 1.08, 0]} follow>
        <Text
          color="#f8fafc"
          fontSize={0.22}
          anchorX="center"
          anchorY="middle"
          outlineWidth={0.025}
          outlineColor="#121b2a"
        >
          {checkpoint.title}
        </Text>
      </Billboard>
    </group>
  );
};
