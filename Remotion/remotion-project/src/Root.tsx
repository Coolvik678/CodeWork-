import React from "react";
import { Composition } from "remotion";
import { MyComposition } from "./Composition";
import { MettleComposition } from "./MettleComposition";
import { StickmanDocumentaryVideo } from "./StickmanDocumentary";
import { StickmanVideo2Composition } from "./StickmanVideo2";
import { StickmanVideo3Composition } from "./StickmanVideo3";
import "./index.css";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      {/* Video #3: Why Were Ancient Humans Black? (NEW DEFAULT) */}
      <Composition
        id="StickmanVideo3"
        component={StickmanVideo3Composition}
        durationInFrames={10265} // 5m 42s (342.19s) matching voiceover audio track at 30fps
        fps={30}
        width={1920}
        height={1080}
      />

      {/* Video #2: How Did Ancient Humans Become Asian? */}
      <Composition
        id="StickmanVideo2"
        component={StickmanVideo2Composition}
        durationInFrames={12390} // 6m 53s at 30fps
        fps={30}
        width={1920}
        height={1080}
      />

      {/* Video #1: When Did Humans Start Consuming Drugs? */}
      <Composition
        id="StickmanDocumentaryVideo"
        component={StickmanDocumentaryVideo}
        durationInFrames={11520} // 6m 24s at 30fps
        fps={30}
        width={1920}
        height={1080}
      />

      {/* Clean Starter Composition */}
      <Composition
        id="MainComposition"
        component={MyComposition}
        durationInFrames={300}
        fps={30}
        width={1920}
        height={1080}
      />

      {/* Code-based Motion Reference Composition */}
      <Composition
        id="MettleAd"
        component={MettleComposition}
        durationInFrames={450}
        fps={30}
        width={1920}
        height={1080}
      />
    </>
  );
};
