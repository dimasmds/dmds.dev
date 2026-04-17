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

  const ai = new GoogleGenAI({ apiKey: API_KEY });

  // Step 1: Generate audiobook narration script
  console.log('\nStep 1: Generating audiobook narration script...');
  const prompt = `Kamu adalah penulis narasi audiobook profesional Bahasa Indonesia. Ubah artikel berikut menjadi naskah narasi audiobook yang siap dibacakan oleh 1 narrator.

ATURAN:
- Bahasa Indonesia yang natural, mengalir, dan enak didengar
- Sifatnya membacakan ulang konten artikel dengan gaya storytelling, bukan membaca mentah
- Boleh menambahkan transisi antar bagian agar mengalir natural
- Jangan tambahkan efek suara atau stage direction — cuma teks yang akan dibacakan
- Pertahankan substansi dan depth artikel aslinya
- Langsung mulai dari narasi, tanpa "Selamat datang" atau pembukaan basa-basi
- Akhiri dengan penutup singkat yang natural

ARTIKEL:
${article.slice(0, 8000)}`;

  const transcriptResp = await ai.models.generateContent({
    model: 'gemini-2.0-flash',
    contents: prompt,
  });
  const transcript = transcriptResp.text;
  console.log(`Narration script generated (${transcript.length} chars)`);
  console.log(`Preview: ${transcript.slice(0, 300)}\n`);

  // Step 2: Generate single-speaker audio (male adult voice)
  console.log('Step 2: Generating audiobook audio (this takes ~2-4 minutes)...');
  const config = {
    temperature: 1,
    responseModalities: ['audio'],
    speechConfig: {
      voiceConfig: {
        prebuiltVoiceConfig: { voiceName: 'Charon' }
      }
    },
  };

  const response = await ai.models.generateContentStream({
    model: 'gemini-2.5-flash-preview-tts',
    config,
    contents: [{ role: 'user', parts: [{ text: `Read the following text aloud in a calm, clear, adult male voice. Speak naturally as an audiobook narrator in Bahasa Indonesia:\n\n${transcript}` }] }],
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
