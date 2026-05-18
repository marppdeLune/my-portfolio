import { Canvas } from "@react-three/fiber";
import { Suspense, useEffect, useMemo } from "react";
import * as THREE from "three";
import { CameraController } from "./camera-controller";
import { Character } from "./character";
import { Checkpoint } from "./checkpoint";
import { Road } from "./road";
import { SkyDecorations } from "./sky-decorations";
import type { CheckpointData, SectionId, Vector3Tuple } from "../data/sections";
import type { ColorMode, SceneTheme } from "../theme";
import { useCharacterMovement } from "../hooks/use-character-movement";
import { useCheckpoints } from "../hooks/use-checkpoints";

type SceneProps = {
  activeSection: SectionId | null;
  targetPosition: Vector3Tuple | null;
  isMoving: boolean;
  colorMode: ColorMode;
  sceneTheme: SceneTheme;
  onCheckpointSelect: (checkpoint: CheckpointData) => void;
  onArrive: () => void;
};

const World = ({
  activeSection,
  targetPosition,
  isMoving,
  colorMode,
  sceneTheme,
  onCheckpointSelect,
  onArrive,
}: SceneProps) => {
  const { checkpoints, activeCheckpoint, setActiveCheckpoint } = useCheckpoints();
  const { characterRef, currentPosition, moveTo } = useCharacterMovement({ onArrive });

  useEffect(() => {
    if (targetPosition) moveTo(targetPosition);
  }, [moveTo, targetPosition]);

  const fog = useMemo(() => new THREE.Fog(sceneTheme.fog, 15, 34), [sceneTheme.fog]);

  return (
    <>
      <fog attach="fog" args={[fog.color, fog.near, fog.far]} />
      <color attach="background" args={[sceneTheme.sky]} />
      <ambientLight intensity={sceneTheme.ambientLight} />
      <directionalLight
        position={[5, 9, 4]}
        intensity={sceneTheme.directionalLight}
        color={sceneTheme.directionalColor}
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
      />
      <SkyDecorations sceneTheme={sceneTheme} />
      <Road checkpoints={checkpoints} sceneTheme={sceneTheme} />
      <Character characterRef={characterRef} colorMode={colorMode} />
      {checkpoints.map((checkpoint) => (
        <Checkpoint
          key={checkpoint.id}
          checkpoint={checkpoint}
          disabled={isMoving}
          isActive={activeSection === checkpoint.id || activeCheckpoint === checkpoint.id}
          sceneTheme={sceneTheme}
          onSelect={(selected) => {
            setActiveCheckpoint(selected.id);
            onCheckpointSelect(selected);
          }}
        />
      ))}
      <CameraController targetRef={currentPosition} />
    </>
  );
};

export const Scene = (props: SceneProps) => {
  return (
    <Canvas shadows camera={{ position: [4.5, 4.2, 7.8], fov: 48 }} dpr={[1, 1.8]}>
      <Suspense fallback={null}>
        <World {...props} />
      </Suspense>
    </Canvas>
  );
};
