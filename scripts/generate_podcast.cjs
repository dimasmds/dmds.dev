const { GoogleGenAI } = require('@google/genai');
const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const API_KEY = process.argv[2];
const INPUT_FILE = process.argv[3];
const OUTPUT_FILE = process.argv[4] || INPUT_FILE.replace(/\.md$/, '_podcast.mp3');

if (!API_KEY || !INPUT_FILE) {
  console.error('Usage: node generate_podcast.cjs <api_key> <input.md> [output.mp3]');
  process.exit(1);
}

function convertToWav(rawData, mimeType) {
  const options = parseMimeType(mimeType);
  const wavHeader = createWavHeader(rawData.length, options);
  const buffer = Buffer.from(rawData, 'base64');
  return Buffer.concat([wavHeader, buffer]);
}

function parseMimeType(mimeType) {
  const [fileType, ...params] = mimeType.split(';').map(s => s.trim());
  const [_, format] = fileType.split('/');
  const options = { numChannels: 1, sampleRate: 24000, bitsPerSample: 16 };

  if (format && format.startsWith('L')) {
    const bits = parseInt(format.slice(1), 10);
    if (!isNaN(bits)) options.bitsPerSample = bits;
  }

  for (const param of params) {
    const [key, value] = param.split('=').map(s => s.trim());
    if (key === 'rate') options.sampleRate = parseInt(value, 10);
  }
  return options;
}

function createWavHeader(dataLength, options) {
  const { numChannels, sampleRate, bitsPerSample } = options;
  const byteRate = sampleRate * numChannels * bitsPerSample / 8;
  const blockAlign = numChannels * bitsPerSample / 8;
  const buffer = Buffer.alloc(44);

  buffer.write('RIFF', 0);
  buffer.writeUInt32LE(36 + dataLength, 4);
  buffer.write('WAVE', 8);
  buffer.write('fmt ', 12);
  buffer.writeUInt32LE(16, 16);
  buffer.writeUInt16LE(1, 20);
  buffer.writeUInt16LE(numChannels, 22);
  buffer.writeUInt32LE(sampleRate, 24);
  buffer.writeUInt32LE(byteRate, 28);
  buffer.writeUInt16LE(blockAlign, 32);
  buffer.writeUInt16LE(bitsPerSample, 34);
  buffer.write('data', 36);
  buffer.writeUInt32LE(dataLength, 40);

  return buffer;
}

async function main() {
  const article = fs.readFileSync(INPUT_FILE, 'utf8');
  const title = article.split('\n').find(l => l.startsWith('#'))?.replace(/^#+\s*/, '') || 'Artikel';

  console.log(`Article: ${title}`);
  console.log(`Length: ${article.length} chars`);

  const prompt = `Kamu adalah produser podcast Bahasa Indonesia. Buatlah transcript podcast berdurasi ~3-4 menit dalam format dialog antara 2 pembawa acara (Raka dan Sinta) yang membahas artikel berikut dengan gaya santai, natural, dan engaging.

ATURAN:
- Bahasa Indonesia yang natural, bukan kaku
- Raka lebih playful, Sinta lebih analitis
- Mereka membahas POINT UTAMA artikel, bukan membaca ulang
- Ada interaksi natural (setuju, menambahkan, bercanda)
- Jangan terlalu panjang, fokus pada 2-3 insight terkuat
- Format: "Raka: ..." dan "Sinta: ..." bergantian
- LANGSUNG mulai dari dialog, tanpa pembukaan basa-basi

ARTIKEL:
${article.slice(0, 8000)}`;

  const ai = new GoogleGenAI({ apiKey: API_KEY });

  // Step 1: Generate transcript
  console.log('\nStep 1: Generating podcast transcript...');
  const transcriptResp = await ai.models.generateContent({
    model: 'gemini-2.0-flash',
    contents: prompt,
  });
  const transcript = transcriptResp.text;
  console.log(`Transcript generated (${transcript.length} chars)`);
  console.log(`Preview: ${transcript.slice(0, 300)}\n`);

  // Step 2: Generate multi-speaker audio
  console.log('Step 2: Generating multi-speaker audio (this takes ~3-5 minutes)...');
  const config = {
    temperature: 1,
    responseModalities: ['audio'],
    speechConfig: {
      multiSpeakerVoiceConfig: {
        speakerVoiceConfigs: [
          {
            speaker: 'Raka',
            voiceConfig: { prebuiltVoiceConfig: { voiceName: 'Kore' } }
          },
          {
            speaker: 'Sinta',
            voiceConfig: { prebuiltVoiceConfig: { voiceName: 'Puck' } }
          },
        ]
      }
    },
  };

  const response = await ai.models.generateContentStream({
    model: 'gemini-2.5-flash-preview-tts',
    config,
    contents: [{ role: 'user', parts: [{ text: `TTS the following conversation:\n${transcript}` }] }],
  });

  const audioChunks = [];
  let mimeType = '';

  for await (const chunk of response) {
    if (!chunk.candidates?.[0]?.content?.parts) continue;
    const inlineData = chunk.candidates[0].content.parts[0]?.inlineData;
    if (inlineData) {
      mimeType = inlineData.mimeType || '';
      audioChunks.push(Buffer.from(inlineData.data || '', 'base64'));
    }
  }

  if (audioChunks.length === 0) {
    console.error('No audio data received!');
    process.exit(1);
  }

  const rawAudio = Buffer.concat(audioChunks);
  console.log(`Raw audio: ${rawAudio.length} bytes, mime: ${mimeType}`);

  // Convert to WAV first, then to MP3
  const wavBuffer = convertToWav(rawAudio.toString('base64'), mimeType || 'audio/L16;rate=24000');
  const tmpWav = `/tmp/podcast_${Date.now()}.wav`;
  fs.writeFileSync(tmpWav, wavBuffer);

  const outputDir = path.dirname(OUTPUT_FILE);
  if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir, { recursive: true });

  // Convert WAV to MP3 using ffmpeg
  execSync(`ffmpeg -i "${tmpWav}" -codec:a libmp3lame -qscale:a 4 "${OUTPUT_FILE}" -y -loglevel error`);
  fs.unlinkSync(tmpWav);

  const fileSize = fs.statSync(OUTPUT_FILE).size;
  console.log(`\nSaved: ${OUTPUT_FILE}`);
  console.log(`Size: ${(fileSize / 1024 / 1024).toFixed(2)} MB`);
}

main().catch(err => {
  console.error('Error:', err.message || err);
  process.exit(1);
});
