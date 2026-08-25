import os
import glob
from PIL import Image, ImageDraw, ImageFont
import subprocess

def render_mettle_video():
    output_video_path = r"c:\Users\myovi\OneDrive\Desktop\Artificial Intelligence\mettle_focus_ad_15s.mp4"
    frame_dir = r"c:\Users\myovi\OneDrive\Desktop\Artificial Intelligence\temp_video_frames"
    os.makedirs(frame_dir, exist_ok=True)

    img1_path = r"C:\Users\myovi\.gemini\antigravity-ide\brain\560cd1cc-6c03-4d61-ac0e-afc9f0045a7f\scene1_distraction_overload_1785220418251.png"
    img2_path = r"C:\Users\myovi\.gemini\antigravity-ide\brain\560cd1cc-6c03-4d61-ac0e-afc9f0045a7f\scene2_mettle_app_reveal_1785220431997.png"
    logo_path = r"C:\Users\myovi\.gemini\antigravity-ide\brain\560cd1cc-6c03-4d61-ac0e-afc9f0045a7f\mettle_app_logo_1785220107450.png"

    img1 = Image.open(img1_path).resize((1280, 720)).convert("RGB")
    img2 = Image.open(img2_path).resize((1280, 720)).convert("RGB")
    logo = Image.open(logo_path).resize((1280, 720)).convert("RGB")

    fps = 15
    total_seconds = 15
    total_frames = fps * total_seconds

    print(f"Rendering {total_frames} video frames at 30 FPS...")

    for f in range(total_frames):
        t = f / fps
        
        # Scene 1: 0 - 5 seconds
        if t < 5.0:
            alpha = min(1.0, f / (fps * 1.5))
            frame_img = Image.blend(Image.new("RGB", (1280, 720), (7, 9, 14)), img1, alpha)
        # Scene 2: 5 - 10 seconds
        elif t < 10.0:
            blend_ratio = (t - 5.0) / 5.0
            frame_img = Image.blend(img1, img2, blend_ratio)
        # Scene 3: 10 - 15 seconds (Logo Lock & CTA)
        else:
            blend_ratio = min(1.0, (t - 10.0) / 2.0)
            frame_img = Image.blend(img2, logo, blend_ratio)

        frame_filename = os.path.join(frame_dir, f"frame_{f:04d}.png")
        frame_img.save(frame_filename)

    # Use FFmpeg to encode MP4 video
    ffmpeg_cmd = [
        "ffmpeg", "-y",
        "-framerate", "30",
        "-i", os.path.join(frame_dir, "frame_%04d.png"),
        "-c:v", "libx264",
        "-pix_fmt", "yuv420p",
        output_video_path
    ]

    subprocess.run(ffmpeg_cmd, check=True)
    print(f"VIDEO RENDERED SUCCESSFULLY: {output_video_path}")

if __name__ == "__main__":
    render_mettle_video()
