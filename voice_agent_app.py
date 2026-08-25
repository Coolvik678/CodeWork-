import asyncio
import os
import gradio as gr
import edge_tts

# Default available neural voices
VOICES = {
    "English (US) - Ava (Female)": "en-US-AvaMultilingualNeural",
    "English (US) - Andrew (Male)": "en-US-AndrewMultilingualNeural",
    "English (US) - Emma (Female)": "en-US-EmmaNeural",
    "English (US) - Guy (Male)": "en-US-GuyNeural",
    "English (UK) - Sonia (Female)": "en-GB-SoniaNeural",
    "English (India) - Neerja (Female)": "en-IN-NeerjaNeural",
    "English (India) - Prabhat (Male)": "en-IN-PrabhatNeural",
}

OUTPUT_FILE = "generated_speech.mp3"

async def text_to_speech_async(text: str, voice_name: str, rate: int, pitch: int) -> str:
    if not text.strip():
        raise ValueError("Please provide text to convert to speech.")

    voice_id = VOICES.get(voice_name, "en-US-AvaMultilingualNeural")
    
    # Format rate and pitch strings for edge-tts
    rate_str = f"{'+' if rate >= 0 else ''}{rate}%"
    pitch_str = f"{'+' if pitch >= 0 else ''}{pitch}Hz"

    communicate = edge_tts.Communicate(text=text, voice=voice_id, rate=rate_str, pitch=pitch_str)
    await communicate.save(OUTPUT_FILE)
    return OUTPUT_FILE

def generate_tts(text: str, voice_name: str, rate: int, pitch: int):
    try:
        audio_path = asyncio.run(text_to_speech_async(text, voice_name, rate, pitch))
        return audio_path, "✅ Audio generated successfully!"
    except Exception as e:
        return None, f"❌ Error: {str(e)}"

# Define Gradio Interface
def create_ui():
    with gr.Blocks(title="Gradio Voice Agent - Text to Speech") as demo:
        gr.Markdown(
            """
            # 🎙️ Gradio Voice Agent (Text-to-Speech)
            Convert text into natural, human-like speech using Microsoft Neural Voices via Edge TTS.
            """
        )

        with gr.Row():
            with gr.Column(scale=2):
                text_input = gr.Textbox(
                    label="Input Text",
                    placeholder="Enter the text you want the voice agent to speak...",
                    lines=6,
                    value="Hello! Welcome to your local Gradio Voice Agent. Type any message here, and I will read it aloud for you."
                )
                
                with gr.Row():
                    voice_dropdown = gr.Dropdown(
                        choices=list(VOICES.keys()),
                        value="English (US) - Ava (Female)",
                        label="Select Voice Persona"
                    )
                
                with gr.Accordion("Audio Settings (Speed & Pitch)", open=False):
                    rate_slider = gr.Slider(minimum=-50, maximum=50, value=0, step=5, label="Speech Rate (%)")
                    pitch_slider = gr.Slider(minimum=-50, maximum=50, value=0, step=5, label="Speech Pitch (Hz)")

                generate_btn = gr.Button("🔊 Generate Speech", variant="primary", size="lg")

            with gr.Column(scale=2):
                audio_output = gr.Audio(label="Generated Voice Output", type="filepath", autoplay=True)
                status_output = gr.Textbox(label="Status", interactive=False)

        # Quick preset examples
        gr.Examples(
            examples=[
                ["Artificial Intelligence is evolving rapidly, creating new possibilities for human collaboration and automation."],
                ["Welcome back! Your local Gradio server is up and running smoothly."],
                ["The quick brown fox jumps over the lazy dog."]
            ],
            inputs=[text_input]
        )

        generate_btn.click(
            fn=generate_tts,
            inputs=[text_input, voice_dropdown, rate_slider, pitch_slider],
            outputs=[audio_output, status_output]
        )

    return demo

if __name__ == "__main__":
    demo = create_ui()
    print("Launching Gradio Voice Agent server on http://127.0.0.1:7860 ...")
    try:
        demo.launch(server_name="127.0.0.1", server_port=7860, share=False)
    except OSError:
        demo.launch(server_name="127.0.0.1", server_port=7861, share=False)
