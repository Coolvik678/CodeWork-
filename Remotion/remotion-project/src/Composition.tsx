import React from "react";
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";

export const MyComposition: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Smooth entrance spring animation for headline
  const titleSpring = spring({
    frame,
    fps,
    config: { damping: 12, mass: 0.5 },
  });

  const titleScale = interpolate(titleSpring, [0, 1], [0.8, 1]);
  const titleOpacity = interpolate(titleSpring, [0, 1], [0, 1]);

  // Subtitle entrance delay
  const subtitleOpacity = interpolate(frame, [15, 35], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#090d16",
        color: "#ffffff",
        fontFamily: "system-ui, -apple-system, sans-serif",
        justifyContent: "center",
        alignItems: "center",
        display: "flex",
      }}
    >
      {/* Background Subtle Ambient Glow */}
      <div
        style={{
          position: "absolute",
          width: 800,
          height: 800,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(16, 185, 129, 0.15) 0%, rgba(0, 0, 0, 0) 70%)",
          transform: `scale(${1 + Math.sin(frame * 0.05) * 0.05})`,
        }}
      />

      {/* Main Motion Canvas */}
      <div
        style={{
          textAlign: "center",
          opacity: titleOpacity,
          transform: `scale(${titleScale})`,
          zIndex: 1,
        }}
      >
        <div
          style={{
            fontSize: 84,
            fontWeight: 900,
            letterSpacing: "-2px",
            background: "linear-gradient(135deg, #ffffff 0%, #10b981 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            marginBottom: 20,
          }}
        >
          MOTION CANVAS
        </div>

        <div
          style={{
            fontSize: 28,
            fontWeight: 500,
            color: "#94a3b8",
            opacity: subtitleOpacity,
            letterSpacing: "1px",
          }}
        >
          Ready for your new Remotion creations
        </div>
      </div>
    </AbsoluteFill>
  );
};
