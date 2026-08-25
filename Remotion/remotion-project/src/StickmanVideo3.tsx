import React from "react";
import {
  AbsoluteFill,
  Audio,
  Img,
  interpolate,
  Sequence,
  staticFile,
  useCurrentFrame,
} from "remotion";

// Video #3: Why Were Ancient Humans Black?
// Audio Duration: 342.19s (10,265 frames @ 30 FPS)
// Total Scenes: 48 scenes (~213.8 frames / 7.1s per scene)

interface SceneConfig {
  id: string;
  fromFrame: number;
  durationInFrames: number;
}

const TOTAL_AUDIO_FRAMES = 10265;
const NUM_SCENES = 48;
const BASE_SCENE_FRAMES = Math.floor(TOTAL_AUDIO_FRAMES / NUM_SCENES); // 213 frames
const REMAINING_FRAMES = TOTAL_AUDIO_FRAMES - BASE_SCENE_FRAMES * NUM_SCENES; // 41 frames

const SCENES: SceneConfig[] = Array.from({ length: NUM_SCENES }, (_, i) => {
  const numStr = String(i + 1).padStart(2, "0");
  const duration = BASE_SCENE_FRAMES + (i < REMAINING_FRAMES ? 1 : 0);
  const fromFrame = Array.from({ length: i }, (_, k) =>
    BASE_SCENE_FRAMES + (k < REMAINING_FRAMES ? 1 : 0)
  ).reduce((a, b) => a + b, 0);

  return {
    id: numStr,
    fromFrame,
    durationInFrames: duration,
  };
});

const SceneCard: React.FC<{ sceneId: string; durationInFrames: number }> = ({
  sceneId,
  durationInFrames,
}) => {
  const frame = useCurrentFrame();

  const scale = interpolate(
    frame,
    [0, durationInFrames],
    [1.0, 1.08],
    { extrapolateRight: "clamp" }
  );

  const opacity = interpolate(
    frame,
    [0, 10, durationInFrames - 10, durationInFrames],
    [0, 1, 1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  return (
    <AbsoluteFill style={{ backgroundColor: "#0b0f19" }}>
      <Img
        src={staticFile(`video3/${sceneId}.jpg`)}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          transform: `scale(${scale})`,
          opacity,
        }}
      />
    </AbsoluteFill>
  );
};

export const StickmanVideo3Composition: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: "#0b0f19" }}>
      {/* Voiceover Audio Track */}
      <Audio src={staticFile("voiceover.mp3")} />

      {/* 48 Sequential High-Density Scene Images */}
      {SCENES.map((scene) => (
        <Sequence
          key={scene.id}
          from={scene.fromFrame}
          durationInFrames={scene.durationInFrames}
        >
          <SceneCard
            sceneId={scene.id}
            durationInFrames={scene.durationInFrames}
          />
        </Sequence>
      ))}
    </AbsoluteFill>
  );
};
