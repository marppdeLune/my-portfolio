import * as THREE from "three";
import type { CheckpointData } from "../data/sections";
import type { SceneTheme } from "../theme";

type RoadProps = {
  checkpoints: CheckpointData[];
  sceneTheme: SceneTheme;
};

const roadWidth = 1.35;
const roadHeight = 0.08;

export const Road = ({ checkpoints, sceneTheme }: RoadProps) => {
  const roadSegments = checkpoints.slice(0, -1).map((checkpoint, index) => {
    const start = new THREE.Vector3(...checkpoint.position);
    const end = new THREE.Vector3(...checkpoints[index + 1].position);
    const center = start.clone().lerp(end, 0.5);
    const length = start.distanceTo(end);
    const angle = Math.atan2(end.x - start.x, end.z - start.z);

    return {
      id: `${checkpoint.id}-${checkpoints[index + 1].id}`,
      center,
      length,
      angle,
      start,
      end,
    };
  });

  return (
    <group>
      <mesh rotation-x={-Math.PI / 2} position={[8.8, -0.02, -4.4]} receiveShadow>
        <planeGeometry args={[26, 16]} />
        <meshStandardMaterial color={sceneTheme.ground} roughness={0.92} />
      </mesh>

      {roadSegments.map((segment) => (
        <mesh
          key={segment.id}
          position={[segment.center.x, roadHeight / 2, segment.center.z]}
          rotation-y={segment.angle}
          receiveShadow
        >
          <boxGeometry args={[roadWidth, roadHeight, segment.length + 0.8]} />
          <meshStandardMaterial color={sceneTheme.roadPrimary} roughness={0.78} />
        </mesh>
      ))}

      {roadSegments.flatMap((segment) =>
        Array.from({ length: Math.max(2, Math.floor(segment.length / 1.45)) }, (_, dashIndex) => {
          const progress = (dashIndex + 0.5) / Math.max(2, Math.floor(segment.length / 1.45));
          const point = segment.start.clone().lerp(segment.end, progress);

          return (
            <mesh
              key={`${segment.id}-dash-${dashIndex}`}
              position={[point.x, 0.105, point.z]}
              rotation-y={segment.angle}
            >
              <boxGeometry args={[0.08, 0.025, 0.38]} />
              <meshStandardMaterial color={sceneTheme.pathDot} roughness={0.5} />
            </mesh>
          );
        }),
      )}

      {checkpoints.map((checkpoint, index) => (
        <mesh
          key={checkpoint.id}
          position={[checkpoint.position[0], 0.11, checkpoint.position[2]]}
          rotation-x={-Math.PI / 2}
        >
          <ringGeometry args={[0.5, 0.62, 24]} />
          <meshStandardMaterial color={index === 0 ? "#ffffff" : sceneTheme.pathDot} />
        </mesh>
      ))}
    </group>
  );
};
