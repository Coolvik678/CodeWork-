import React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig, spring, interpolate, Sequence } from "remotion";

export const MettleComposition: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <AbsoluteFill style={{ backgroundColor: "#05070f", color: "#ffffff", fontFamily: "system-ui, -apple-system, sans-serif" }}>
      {/* BACKGROUND GRADIENT & NEON GLOW */}
      <AbsoluteFill style={{
        background: "radial-gradient(circle at 50% 40%, rgba(16, 185, 129, 0.15) 0%, rgba(6, 182, 212, 0.08) 40%, #05070f 80%)",
        overflow: "hidden"
      }}>
        {/* Animated Grid Lines */}
        <div style={{
          position: "absolute",
          inset: 0,
          backgroundImage: "radial-gradient(rgba(255, 255, 255, 0.08) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
          transform: `translateY(${frame * 0.5}px)`,
          opacity: 0.4
        }} />
      </AbsoluteFill>

      {/* ===================================================================
          SCENE 1: HOOK - DISTRACTION OVERLOAD TO FOCUS (0s - 3.5s | Frames 0-105)
         =================================================================== */}
      <Sequence from={0} durationInFrames={105}>
        <SceneDistraction frame={frame} fps={fps} />
      </Sequence>

      {/* ===================================================================
          SCENE 2: METTLE APP & LIVE STREAK COUNTER (3.5s - 7.5s | Frames 105-225)
         =================================================================== */}
      <Sequence from={105} durationInFrames={120}>
        <SceneAppReveal frame={frame - 105} fps={fps} />
      </Sequence>

      {/* ===================================================================
          SCENE 3: FOCUS TIMER & ANALYTICS GROWTH (7.5s - 11.5s | Frames 225-345)
         =================================================================== */}
      <Sequence from={225} durationInFrames={120}>
        <SceneAnalytics frame={frame - 225} fps={fps} />
      </Sequence>

      {/* ===================================================================
          SCENE 4: HIGH-IMPACT LOGO LOCK & CTA (11.5s - 15.0s | Frames 345-450)
         =================================================================== */}
      <Sequence from={345} durationInFrames={105}>
        <SceneLogoLock frame={frame - 345} fps={fps} />
      </Sequence>
    </AbsoluteFill>
  );
};

// -----------------------------------------------------------------------------
// SCENE 1: DISTRACTION OVERLOAD
// -----------------------------------------------------------------------------
const SceneDistraction: React.FC<{ frame: number; fps: number }> = ({ frame, fps }) => {
  const scale = spring({ frame, fps, config: { damping: 12 } });
  const opacity = interpolate(frame, [0, 15, 85, 105], [0, 1, 1, 0]);

  // Floating notifications
  const floatY = Math.sin(frame * 0.1) * 15;

  return (
    <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", opacity }}>
      {/* Background Distraction Floating Cards */}
      <div style={{
        position: "absolute",
        top: 200 + floatY,
        left: 250,
        background: "rgba(239, 68, 68, 0.15)",
        border: "1px solid rgba(239, 68, 68, 0.4)",
        padding: "16px 28px",
        borderRadius: 16,
        color: "#fca5a5",
        fontWeight: 600,
        fontSize: 22,
        backdropFilter: "blur(10px)",
        transform: `scale(${scale}) rotate(-5deg)`
      }}>
        ⚠️ 99+ Unread Notifications
      </div>

      <div style={{
        position: "absolute",
        bottom: 240 - floatY,
        right: 280,
        background: "rgba(245, 158, 11, 0.15)",
        border: "1px solid rgba(245, 158, 11, 0.4)",
        padding: "16px 28px",
        borderRadius: 16,
        color: "#fde68a",
        fontWeight: 600,
        fontSize: 22,
        backdropFilter: "blur(10px)",
        transform: `scale(${scale}) rotate(4deg)`
      }}>
        ⏳ Urgent Meeting Request
      </div>

      {/* Main Kinetic Typography */}
      <div style={{
        textAlign: "center",
        transform: `scale(${scale})`,
        zIndex: 10
      }}>
        <div style={{
          fontSize: 76,
          fontWeight: 900,
          letterSpacing: "-2px",
          color: "#94a3b8",
          textTransform: "uppercase",
          textShadow: "0 0 30px rgba(0,0,0,0.8)"
        }}>
          Drowning in Distractions?
        </div>

        <div style={{
          fontSize: 92,
          fontWeight: 900,
          background: "linear-gradient(135deg, #ffffff 0%, #10b981 100%)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          marginTop: 20,
          letterSpacing: "-1px"
        }}>
          FIND YOUR METTLE.
        </div>
      </div>
    </AbsoluteFill>
  );
};

// -----------------------------------------------------------------------------
// SCENE 2: APP REVEAL & HABIT STREAK
// -----------------------------------------------------------------------------
const SceneAppReveal: React.FC<{ frame: number; fps: number }> = ({ frame, fps }) => {
  const springVal = spring({ frame, fps, config: { damping: 14 } });
  const streakCount = Math.min(30, Math.floor(interpolate(frame, [15, 90], [1, 30])));
  const opacity = interpolate(frame, [0, 15, 100, 120], [0, 1, 1, 0]);

  return (
    <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", opacity }}>
      {/* Glassmorphism Phone UI Card */}
      <div style={{
        width: 680,
        height: 820,
        background: "rgba(15, 23, 42, 0.75)",
        border: "2px solid rgba(16, 185, 129, 0.4)",
        borderRadius: 36,
        padding: 40,
        backdropFilter: "blur(25px)",
        boxShadow: "0 30px 80px rgba(16, 185, 129, 0.25), inset 0 0 30px rgba(16, 185, 129, 0.1)",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        transform: `scale(${springVal}) translateY(${Math.sin(frame * 0.05) * 10}px)`
      }}>
        {/* Header */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <div style={{ fontSize: 28, fontWeight: 800, color: "#fff" }}>Daily Habit Tracker</div>
            <div style={{ fontSize: 16, color: "#94a3b8", marginTop: 4 }}>Deep Focus Routine</div>
          </div>
          <div style={{
            background: "rgba(16, 185, 129, 0.2)",
            border: "1px solid rgba(16, 185, 129, 0.5)",
            padding: "8px 18px",
            borderRadius: 20,
            color: "#10b981",
            fontWeight: 700,
            fontSize: 16
          }}>
            ACTIVE
          </div>
        </div>

        {/* Live Counter Widget */}
        <div style={{
          background: "rgba(0, 0, 0, 0.4)",
          borderRadius: 24,
          padding: 30,
          textAlign: "center",
          margin: "30px 0",
          border: "1px solid rgba(255, 255, 255, 0.08)"
        }}>
          <div style={{ fontSize: 18, color: "#94a3b8", fontWeight: 600, textTransform: "uppercase", letterSpacing: 2 }}>
            Current Focus Streak
          </div>
          <div style={{
            fontSize: 120,
            fontWeight: 900,
            background: "linear-gradient(135deg, #10b981 0%, #06b6d4 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            lineHeight: 1,
            margin: "10px 0"
          }}>
            {streakCount} <span style={{ fontSize: 36, color: "#fff", WebkitTextFillColor: "#fff" }}>DAYS</span>
          </div>
          <div style={{ color: "#34d399", fontSize: 18, fontWeight: 700 }}>🔥 Unstoppable Consistency</div>
        </div>

        {/* Action Checkboxes */}
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          {["Morning Deep Work (2 Hours)", "Zero Distraction Mode", "Daily Reflection & Review"].map((item, idx) => (
            <div key={idx} style={{
              display: "flex",
              alignItems: "center",
              gap: 16,
              background: "rgba(255, 255, 255, 0.05)",
              padding: "16px 20px",
              borderRadius: 16,
              border: "1px solid rgba(255, 255, 255, 0.08)"
            }}>
              <div style={{
                width: 28,
                height: 28,
                borderRadius: 8,
                background: "#10b981",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#000",
                fontWeight: 900,
                fontSize: 16
              }}>✓</div>
              <span style={{ fontSize: 18, fontWeight: 600, color: "#f8fafc" }}>{item}</span>
            </div>
          ))}
        </div>
      </div>
    </AbsoluteFill>
  );
};

// -----------------------------------------------------------------------------
// SCENE 3: FOCUS TIMER & ANALYTICS
// -----------------------------------------------------------------------------
const SceneAnalytics: React.FC<{ frame: number; fps: number }> = ({ frame, fps }) => {
  const scale = spring({ frame, fps, config: { damping: 14 } });
  const opacity = interpolate(frame, [0, 15, 100, 120], [0, 1, 1, 0]);
  const barHeight1 = interpolate(frame, [10, 60], [10, 85], { extrapolateRight: "clamp" });
  const barHeight2 = interpolate(frame, [20, 70], [10, 95], { extrapolateRight: "clamp" });
  const barHeight3 = interpolate(frame, [30, 80], [10, 100], { extrapolateRight: "clamp" });

  return (
    <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", opacity }}>
      <div style={{
        display: "flex",
        gap: 40,
        alignItems: "center",
        transform: `scale(${scale})`
      }}>
        {/* Left Timer Ring */}
        <div style={{
          width: 480,
          height: 480,
          background: "rgba(15, 23, 42, 0.8)",
          border: "2px solid rgba(6, 182, 212, 0.4)",
          borderRadius: "50%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: "0 0 60px rgba(6, 182, 212, 0.3)",
          position: "relative"
        }}>
          <div style={{ fontSize: 20, color: "#06b6d4", fontWeight: 700, letterSpacing: 3 }}>DEEP FOCUS MODE</div>
          <div style={{ fontSize: 84, fontWeight: 900, color: "#fff", fontFamily: "monospace", margin: "10px 0" }}>
            25:00
          </div>
          <div style={{ fontSize: 16, color: "#94a3b8" }}>Flow State Active</div>
        </div>

        {/* Right Analytics Card */}
        <div style={{
          width: 540,
          background: "rgba(15, 23, 42, 0.8)",
          border: "2px solid rgba(16, 185, 129, 0.4)",
          borderRadius: 30,
          padding: 40,
          boxShadow: "0 20px 50px rgba(0,0,0,0.5)"
        }}>
          <div style={{ fontSize: 24, fontWeight: 800, color: "#fff" }}>Focus & Productivity Analytics</div>
          <div style={{ fontSize: 16, color: "#94a3b8", marginTop: 4 }}>+140% Focus Hours This Month</div>

          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", height: 200, marginTop: 40, padding: "0 20px" }}>
            <div style={{ width: 60, height: `${barHeight1}%`, background: "linear-gradient(to top, #06b6d4, #10b981)", borderRadius: 12 }} />
            <div style={{ width: 60, height: `${barHeight2}%`, background: "linear-gradient(to top, #06b6d4, #10b981)", borderRadius: 12 }} />
            <div style={{ width: 60, height: `${barHeight3}%`, background: "linear-gradient(to top, #06b6d4, #34d399)", borderRadius: 12 }} />
          </div>

          <div style={{
            marginTop: 30,
            background: "rgba(16, 185, 129, 0.15)",
            border: "1px solid rgba(16, 185, 129, 0.3)",
            padding: "16px 20px",
            borderRadius: 16,
            color: "#34d399",
            fontWeight: 700,
            fontSize: 18,
            textAlign: "center"
          }}>
            🏆 Achievement: 30-Day Master Streak!
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};

// -----------------------------------------------------------------------------
// SCENE 4: HIGH IMPACT LOGO LOCK & CTA
// -----------------------------------------------------------------------------
const SceneLogoLock: React.FC<{ frame: number; fps: number }> = ({ frame, fps }) => {
  const scale = spring({ frame, fps, config: { damping: 10 } });

  return (
    <AbsoluteFill style={{ justifyContent: "center", alignItems: "center" }}>
      <div style={{ textAlign: "center", transform: `scale(${scale})` }}>
        {/* Glowing Geometric Logo Icon */}
        <div style={{
          width: 140,
          height: 140,
          background: "linear-gradient(135deg, #10b981 0%, #06b6d4 100%)",
          borderRadius: 36,
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: "0 0 80px rgba(16, 185, 129, 0.6)",
          fontSize: 72,
          fontWeight: 900,
          color: "#000",
          marginBottom: 30
        }}>
          M
        </div>

        <div style={{
          fontSize: 96,
          fontWeight: 900,
          letterSpacing: "-2px",
          color: "#ffffff",
          textTransform: "uppercase",
          textShadow: "0 0 40px rgba(16, 185, 129, 0.5)"
        }}>
          METTLE
        </div>

        <div style={{
          fontSize: 32,
          fontWeight: 600,
          color: "#94a3b8",
          marginTop: 10,
          letterSpacing: 1
        }}>
          Master Your Focus. Build Lasting Habits.
        </div>

        {/* CTA Button */}
        <div style={{
          marginTop: 40,
          background: "linear-gradient(135deg, #10b981, #06b6d4)",
          color: "#000",
          padding: "20px 48px",
          borderRadius: 50,
          fontSize: 26,
          fontWeight: 800,
          display: "inline-block",
          boxShadow: "0 10px 35px rgba(16, 185, 129, 0.4)"
        }}>
          Get Started For Free →
        </div>
      </div>
    </AbsoluteFill>
  );
};
