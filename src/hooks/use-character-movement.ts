import { useCallback, useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import type { Vector3Tuple } from "../data/sections";

const ARRIVAL_DISTANCE = 0.05;

type UseCharacterMovementOptions = {
  initialPosition?: Vector3Tuple;
  onArrive?: () => void;
};

export const useCharacterMovement = ({
  initialPosition = [0, 0, 1.6],
  onArrive,
}: UseCharacterMovementOptions = {}) => {
  const characterRef = useRef<THREE.Group>(null);
  const targetRef = useRef(new THREE.Vector3(...initialPosition));
  const currentPosition = useRef(new THREE.Vector3(...initialPosition));
  const movingRef = useRef(false);
  const [isMoving, setIsMoving] = useState(false);

  const moveTo = useCallback((position: Vector3Tuple) => {
    targetRef.current.set(position[0], position[1], position[2]);
    movingRef.current = true;
    setIsMoving(true);
  }, []);

  useFrame((_, delta) => {
    if (!characterRef.current || !movingRef.current) return;

    const target = targetRef.current;
    const character = characterRef.current;
    const position = character.position;
    const previous = currentPosition.current.copy(position);
    const next = position.clone().lerp(target, 1 - Math.exp(-3.8 * delta));

    position.copy(next);
    currentPosition.current.copy(next);

    const direction = target.clone().sub(previous);
    direction.y = 0;

    if (direction.lengthSq() > 0.0001) {
      const desiredRotation = Math.atan2(direction.x, direction.z);
      character.rotation.y = THREE.MathUtils.lerp(
        character.rotation.y,
        desiredRotation,
        1 - Math.exp(-8 * delta),
      );
    }

    if (position.distanceTo(target) < ARRIVAL_DISTANCE) {
      position.copy(target);
      currentPosition.current.copy(target);
      movingRef.current = false;
      setIsMoving(false);
      onArrive?.();
    }
  });

  return {
    characterRef,
    currentPosition,
    isMoving,
    moveTo,
  };
};
