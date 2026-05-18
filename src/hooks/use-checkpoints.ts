import { useMemo, useState } from "react";
import { type CheckpointData, type SectionId, sections } from "../data/sections";

export const useCheckpoints = () => {
  const [activeCheckpoint, setActiveCheckpoint] = useState<SectionId | null>(null);

  const checkpoints = useMemo<CheckpointData[]>(
    () =>
      sections.map(({ id, title, position }) => ({
        id,
        title,
        position,
      })),
    [],
  );

  return {
    checkpoints,
    activeCheckpoint,
    setActiveCheckpoint,
  };
};
