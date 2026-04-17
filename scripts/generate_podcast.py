#!/usr/bin/env python3
"""Generate podcast-style audio from a blog post using Gemini TTS API."""

import json
import os
import sys

from google import genai
from google.genai import types

CONFIG_PATH = os.path.expanduser("~/.config/gemini/credentials.json")
PYTHON_BIN = os.path.expanduser("~/.venv/hermes/bin/python3")

def load_api_key():
    with open(CONFIG_PATH) as f:
        return json.load(f)["api_key"]

def generate_transcript(client, article_text, article_title):
    """Step 1: Generate podcast transcript from article."""
    print(f"Generating podcast transcript for: {article_title}")
    
    response = client.models.generate_content(
        model="gemini-2.5-flash",
        contents=f"""Kamu adalah produser podcast Bahasa Indonesia. Buatlah transcript podcast berdurasi ~3-4 menit dalam format dialog antara 2 pembawa acara (Raka dan Sinta) yang membahas artikel berikut dengan gaya santai, natural, dan engaging. 

ATURAN:
- Bahasa Indonesia yang natural, bukan kaku
- Raka lebih playful, Sinta lebih analitis
- Mereka membahas POINT UTAMA artikel, bukan membaca ulang
- Ada interaksi natural (setuju, menambahkan, bercanda)
- Jangan terlalu panjang, fokus pada 2-3 insight terkuat
- Format: "Raka: ..." dan "Sinta: ..." bergantian
- LANGSUNG mulai dari dialog, tanpa pembukaan basa-basi

ARTIKEL:
{article_text[:8000]}""",
    )
    
    transcript = response.text
    print(f"Transcript generated ({len(transcript)} chars)")
    return transcript

def generate_audio(client, transcript):
    """Step 2: Generate multi-speaker audio from transcript."""
    print("Generating multi-speaker audio...")
    
    response = client.models.generate_content(
        model="gemini-2.5-flash-preview-tts",
        contents=transcript,
        config=types.GenerateContentConfig(
            response_modalities=["AUDIO"],
            speech_config=types.SpeechConfig(
                multi_speaker_voice_config=types.MultiSpeakerVoiceConfig(
                    speaker_voice_configs=[
                        types.SpeakerVoiceConfig(
                            speaker="Raka",
                            voice_config=types.VoiceConfig(
                                prebuilt_voice_config=types.PrebuiltVoiceConfig(
                                    voice_name="Kore",
                                )
                            )
                        ),
                        types.SpeakerVoiceConfig(
                            speaker="Sinta",
                            voice_config=types.VoiceConfig(
                                prebuilt_voice_config=types.PrebuiltVoiceConfig(
                                    voice_name="Puck",
                                )
                            )
                        ),
                    ]
                )
            )
        )
    )
    
    audio_data = response.candidates[0].content.parts[0].inline_data.data
    print(f"Audio generated ({len(audio_data)} bytes)")
    return audio_data

def save_pcm_as_wav(pcm_data, output_path, sample_rate=24000, channels=1, sample_width=2):
    """Save raw PCM data as WAV file."""
    import wave
    with wave.open(output_path, 'wb') as wf:
        wf.setnchannels(channels)
        wf.setsampwidth(sample_width)
        wf.setframerate(sample_rate)
        wf.writeframes(pcm_data)
    return os.path.getsize(output_path)

def main():
    if len(sys.argv) < 2:
        print("Usage: python generate_podcast.py <markdown_file> [output_file]")
        sys.exit(1)
    
    md_path = sys.argv[1]
    
    # Determine output path
    if len(sys.argv) >= 3:
        output_path = sys.argv[2]
    else:
        base = os.path.splitext(md_path)[0]
        output_path = f"{base}_podcast.wav"
    
    # Read article
    with open(md_path) as f:
        article = f.read()
    
    article_title = "Unknown"
    for line in article.split('\n'):
        if line.startswith('#'):
            article_title = line.lstrip('#').strip()
            break
    
    print(f"Article: {article_title}")
    print(f"Article length: {len(article)} chars")
    
    # Initialize client
    api_key = load_api_key()
    client = genai.Client(api_key=api_key)
    
    # Step 1: Generate transcript
    transcript = generate_transcript(client, article, article_title)
    print(f"\n--- Transcript Preview ---\n{transcript[:500]}\n---\n")
    
    # Step 2: Generate audio
    audio_data = generate_audio(client, transcript)
    
    # Step 3: Save
    file_size = save_pcm_as_wav(audio_data, output_path)
    print(f"\nSaved: {output_path}")
    print(f"Size: {file_size / 1024 / 1024:.2f} MB")

if __name__ == "__main__":
    main()
