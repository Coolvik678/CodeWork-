import React from "react";
import { AbsoluteFill, Audio, Img, interpolate, Sequence, staticFile, useCurrentFrame } from "remotion";

interface SceneData {
  id: string;
  imageFile: string;
  startFrame: number;
  durationInFrames: number;
  label: string;
}

// 44 Scenes mapped 100% to exact FFmpeg spoken narration silence pauses in voiceover.mp3 (Total 384s / 11,520 frames at 30 FPS)
const SCENES: SceneData[] = [
  { id: "01", imageFile: "video1/01_[STYLE-_2D_vector_stick_f.jpg", startFrame: 0, durationInFrames: 239, label: "Scene 01" },
  { id: "02", imageFile: "video1/02_[STYLE-_2D_vector_stick_f (1).jpg", startFrame: 239, durationInFrames: 247, label: "Scene 02" },
  { id: "03", imageFile: "video1/03_[STYLE-_2D_vector_stick_f (1).jpg", startFrame: 487, durationInFrames: 298, label: "Scene 03" },
  { id: "04", imageFile: "video1/04_[STYLE-_2D_vector_stick_f.jpg", startFrame: 785, durationInFrames: 130, label: "Scene 04" },
  { id: "05", imageFile: "video1/05_[STYLE-_2D_vector_stick_f.jpg", startFrame: 915, durationInFrames: 340, label: "Scene 05" },
  { id: "06", imageFile: "video1/06_[STYLE-_2D_vector_stick_f (1).jpg", startFrame: 1255, durationInFrames: 250, label: "Scene 06" },
  { id: "07", imageFile: "video1/07_[STYLE-_2D_vector_stick_f.jpg", startFrame: 1505, durationInFrames: 196, label: "Scene 07" },
  { id: "08", imageFile: "video1/08_[STYLE-_2D_vector_stick_f (1).jpg", startFrame: 1701, durationInFrames: 376, label: "Scene 08" },
  { id: "09", imageFile: "video1/09_[STYLE-_2D_vector_stick_f.jpg", startFrame: 2077, durationInFrames: 200, label: "Scene 09" },
  { id: "10", imageFile: "video1/10_[STYLE-_2D_vector_stick_f (2).jpg", startFrame: 2277, durationInFrames: 241, label: "Scene 10" },
  { id: "11", imageFile: "video1/11_[STYLE-_2D_vector_stick_f.jpg", startFrame: 2518, durationInFrames: 219, label: "Scene 11" },
  { id: "12", imageFile: "video1/12_[STYLE-_2D_vector_stick_f (1).jpg", startFrame: 2737, durationInFrames: 210, label: "Scene 12" },
  { id: "13", imageFile: "video1/13_[STYLE-_2D_vector_stick_f (1).jpg", startFrame: 2947, durationInFrames: 581, label: "Scene 13" },
  { id: "14", imageFile: "video1/14_[STYLE-_2D_vector_stick_f.jpg", startFrame: 3528, durationInFrames: 420, label: "Scene 14 (Extended)" },
  { id: "16", imageFile: "video1/16_[STYLE-_2D_vector_stick_f.jpg", startFrame: 3948, durationInFrames: 203, label: "Scene 16" },
  { id: "17", imageFile: "video1/17_[STYLE-_2D_vector_stick_f.jpg", startFrame: 4151, durationInFrames: 156, label: "Scene 17" },
  { id: "18", imageFile: "video1/18_[STYLE-_2D_vector_stick_f (1).jpg", startFrame: 4307, durationInFrames: 302, label: "Scene 18" },
  { id: "19", imageFile: "video1/19_[STYLE-_2D_vector_stick_f.jpg", startFrame: 4609, durationInFrames: 156, label: "Scene 19" },
  { id: "20", imageFile: "video1/20_[STYLE-_2D_vector_stick_f.jpg", startFrame: 4765, durationInFrames: 313, label: "Scene 20" },
  { id: "21", imageFile: "video1/21_[STYLE-_2D_vector_stick_f.jpg", startFrame: 5078, durationInFrames: 189, label: "Scene 21" },
  { id: "22", imageFile: "video1/22_[STYLE-_2D_vector_stick_f.jpg", startFrame: 5267, durationInFrames: 204, label: "Scene 22" },
  { id: "23", imageFile: "video1/24_[STYLE-_2D_vector_stick_f.jpg", startFrame: 5471, durationInFrames: 295, label: "Scene 23" },
  { id: "24", imageFile: "video1/25_[STYLE-_2D_vector_stick_f.jpg", startFrame: 5766, durationInFrames: 212, label: "Scene 24" },
  { id: "25", imageFile: "video1/26_[STYLE-_2D_vector_stick_f.jpg", startFrame: 5978, durationInFrames: 218, label: "Scene 25" },
  { id: "26", imageFile: "video1/27_[STYLE-_2D_vector_stick_f.jpg", startFrame: 6196, durationInFrames: 294, label: "Scene 26" },
  { id: "27", imageFile: "video1/28_[STYLE-_2D_vector_stick_f.jpg", startFrame: 6490, durationInFrames: 168, label: "Scene 27" },
  { id: "28", imageFile: "video1/29_[STYLE-_2D_vector_stick_f.jpg", startFrame: 6658, durationInFrames: 326, label: "Scene 28" },
  { id: "29", imageFile: "video1/30_[STYLE-_2D_vector_stick_f.jpg", startFrame: 6984, durationInFrames: 212, label: "Scene 29" },
  { id: "30", imageFile: "video1/31_[STYLE-_2D_vector_stick_f.jpg", startFrame: 7196, durationInFrames: 277, label: "Scene 30" },
  { id: "31", imageFile: "video1/32_[STYLE-_2D_vector_stick_f.jpg", startFrame: 7473, durationInFrames: 143, label: "Scene 31" },
  { id: "32", imageFile: "video1/33_[STYLE-_2D_vector_stick_f.jpg", startFrame: 7616, durationInFrames: 244, label: "Scene 32" },
  { id: "33", imageFile: "video1/34_[STYLE-_2D_vector_stick_f.jpg", startFrame: 7860, durationInFrames: 284, label: "Scene 33" },
  { id: "34", imageFile: "video1/35_[STYLE-_2D_vector_stick_f.jpg", startFrame: 8144, durationInFrames: 250, label: "Scene 34" },
  { id: "35", imageFile: "video1/36_[STYLE-_2D_vector_stick_f.jpg", startFrame: 8394, durationInFrames: 211, label: "Scene 35" },
  { id: "36", imageFile: "video1/37_[STYLE-_2D_vector_stick_f.jpg", startFrame: 8605, durationInFrames: 260, label: "Scene 36" },
  { id: "37", imageFile: "video1/38_[STYLE-_2D_vector_stick_f.jpg", startFrame: 8865, durationInFrames: 130, label: "Scene 37" },
  { id: "38", imageFile: "video1/39_[STYLE-_2D_vector_stick_f.jpg", startFrame: 8995, durationInFrames: 267, label: "Scene 38" },
  { id: "39", imageFile: "video1/40_[STYLE-_2D_vector_stick_f.jpg", startFrame: 9262, durationInFrames: 249, label: "Scene 39" },
  { id: "40", imageFile: "video1/41_[STYLE-_2D_vector_stick_f.jpg", startFrame: 9511, durationInFrames: 240, label: "Scene 40" },
  { id: "41", imageFile: "video1/42_[STYLE-_2D_vector_stick_f.jpg", startFrame: 9751, durationInFrames: 299, label: "Scene 41" },
  { id: "42", imageFile: "video1/43_[STYLE-_2D_vector_stick_f.jpg", startFrame: 10050, durationInFrames: 250, label: "Scene 42" },
  { id: "43", imageFile: "video1/44_[STYLE-_2D_vector_stick_f.jpg", startFrame: 10300, durationInFrames: 239, label: "Scene 43" },
  { id: "44", imageFile: "video1/45_[STYLE-_2D_vector_stick_f.jpg", startFrame: 10539, durationInFrames: 981, label: "Scene 44" },
];

const SingleStickmanScene: React.FC<{ scene: SceneData }> = ({ scene }) => {
  const frame = useCurrentFrame();

  // Ken Burns Effect: Continuous subtle scale zoom from 1.0 to 1.10 over exact sequence duration
  const scale = interpolate(frame, [0, scene.durationInFrames], [1, 1.1], {
    extrapolateRight: "clamp",
    extrapolateLeft: "clamp",
  });

  // 12-frame documentary crossfade opacity
  const opacity = interpolate(frame, [0, 12], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill style={{ backgroundColor: "#000000", overflow: "hidden" }}>
      <div
        style={{
          width: "100%",
          height: "100%",
          transform: `scale(${scale})`,
          opacity,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Img
          src={staticFile(scene.imageFile)}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />
      </div>
    </AbsoluteFill>
  );
};

export const StickmanDocumentaryVideo: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: "#000000" }}>
      {/* Voiceover Audio Anchor: Active and synchronized across entire composition */}
      <Audio src={staticFile("voiceover.mp3")} />

      {/* Sequenced Stickman Documentary Scenes */}
      {SCENES.map((scene) => (
        <Sequence
          key={scene.id}
          from={scene.startFrame}
          durationInFrames={scene.durationInFrames}
          name={scene.label}
        >
          <SingleStickmanScene scene={scene} />
        </Sequence>
      ))}
    </AbsoluteFill>
  );
};
