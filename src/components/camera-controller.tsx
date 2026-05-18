import { OrbitControls } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { useEffect, useRef, type MutableRefObject } from "react";
import * as THREE from "three";
import type { OrbitControls as OrbitControlsImpl } from "three-stdlib";

const lookOffset = new THREE.Vector3(0, 0.8, 0);

type CameraControllerProps = {
  targetRef: MutableRefObject<THREE.Vector3>;
};

export const CameraController = ({ targetRef }: CameraControllerProps) => {
  const { camera } = useThree();
  const controlsRef = useRef<OrbitControlsImpl>(null);
  const previousTargetRef = useRef(new THREE.Vector3());

  useEffect(() => {
    previousTargetRef.current.copy(targetRef.current).add(lookOffset);
    controlsRef.current?.target.copy(previousTargetRef.current);
    controlsRef.current?.update();
  }, [targetRef]);

  useFrame((_, delta) => {
    const controls = controlsRef.current;
    if (!controls || !targetRef.current) return;

    const nextTarget = targetRef.current.clone().add(lookOffset);
    const previousTarget = previousTargetRef.current;
    const movementDelta = nextTarget.clone().sub(previousTarget);

    camera.position.add(movementDelta);
    controls.target.lerp(nextTarget, 1 - Math.exp(-8 * delta));
    previousTarget.copy(nextTarget);
    controls.update();
  });

  return (
    <OrbitControls
      ref={controlsRef}
      enableDamping
      dampingFactor={0.08}
      enablePan={false}
      enableZoom
      minDistance={4}
      maxDistance={15}
      maxPolarAngle={Math.PI / 2.15}
    />
  );
};
