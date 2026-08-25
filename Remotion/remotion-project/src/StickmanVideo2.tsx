import React from "react";
import {
  AbsoluteFill,
  Audio,
  Img,
  Sequence,
  interpolate,
  staticFile,
  useCurrentFrame,
} from "remotion";

interface SceneProps {
  imageName: string;
  durationInFrames: number;
}

const Scene: React.FC<SceneProps> = ({ imageName, durationInFrames }) => {
  const frame = useCurrentFrame();

  // Subtle Ken Burns slow zoom (1.0 -> 1.10)
  const scale = interpolate(frame, [0, durationInFrames], [1.0, 1.1], {
    extrapolateRight: "clamp",
  });

  // Smooth 15-frame fade in and out
  const opacity = interpolate(
    frame,
    [0, 15, durationInFrames - 15, durationInFrames],
    [0, 1, 1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  return (
    <AbsoluteFill style={{ backgroundColor: "#0f172a" }}>
      <AbsoluteFill
        style={{
          transform: `scale(${scale})`,
          opacity,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Img
          src={staticFile(`video2/${imageName}`)}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

export const StickmanVideo2Composition: React.FC = () => {
  // Total duration: 12390 frames (6 minutes 53 seconds / 413 seconds at 30 fps)
  // 22 scenes, each ~563 frames (~18.7s)
  const scenes = Array.from({ length: 22 }, (_, idx) => {
    const numStr = String(idx + 1).padStart(2, "0");
    return {
      imageName: `${numStr}.jpg`,
      durationInFrames: idx === 21 ? 564 : 563,
    };
  });

  let currentStart = 0;

  return (
    <AbsoluteFill style={{ backgroundColor: "#000000" }}>
      {/* 1. Voiceover Narration Audio Track */}
      <Audio src={staticFile("voiceover.mp3")} volume={1.0} />

      {/* 2. Visual Scene Sequence Pipeline */}
      {scenes.map((scene, idx) => {
        const startFrame = currentStart;
        currentStart += scene.durationInFrames;
        return (
          <Sequence
            key={idx}
            from={startFrame}
            durationInFrames={scene.durationInFrames}
          >
            <Scene
              imageName={scene.imageName}
              durationInFrames={scene.durationInFrames}
            />
          </Sequence>
        );
      })}
    </AbsoluteFill>
  );
};
