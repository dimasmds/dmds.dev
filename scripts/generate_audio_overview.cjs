const { GoogleGenAI } = require('@google/genai');
const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const API_KEY = process.argv[2];
const INPUT_FILE = process.argv[3];
const OUTPUT_FILE = process.argv[4] || INPUT_FILE.replace(/\.md$/, '_audio.mp3');

if (!API_KEY || !INPUT_FILE) {
  console.error('Usage: node generate_audio_overview.cjs <api_key> <input.md> [output.mp3]');
  process.exit(1);
}

function parseMimeType(mimeType) {
  const [fileType, ...params] = mimeType.split(';').map(s => s.trim());
  const [_, format] = fileType.split('/');
  const options = { numChannels: 1, sampleRate: 24000, bitsPerSample: 16 };
  if (format?.startsWith('L')) {
    const bits = parseInt(format.slice(1), 10);
    if (!isNaN(bits)) options.bitsPerSample = bits;
  }
  for (const param of params) {
    const [key, value] = param.split('=').map(s => s.trim());
    if (key === 'rate') options.sampleRate = parseInt(value, 10);
  }
  return options;
}

function createWavHeader(dataLength, { numChannels, sampleRate, bitsPerSample }) {
  const byteRate = sampleRate * numChannels * bitsPerSample / 8;
  const blockAlign = numChannels * bitsPerSample / 8;
  const buf = Buffer.alloc(44);
  buf.write('RIFF', 0); buf.writeUInt32LE(36 + dataLength, 4); buf.write('WAVE', 8);
  buf.write('fmt ', 12); buf.writeUInt32LE(16, 16); buf.writeUInt16LE(1, 20);
  buf.writeUInt16LE(numChannels, 22); buf.writeUInt32LE(sampleRate, 24);
  buf.writeUInt32LE(byteRate, 28); buf.writeUInt16LE(blockAlign, 32);
  buf.writeUInt16LE(bitsPerSample, 34); buf.write('data', 36);
  buf.writeUInt32LE(dataLength, 40);
  return buf;
}

async function main() {
  const article = fs.readFileSync(INPUT_FILE, 'utf8');
  const title = article.split('\n').find(l => l.startsWith('#'))?.replace(/^#+\s*/, '') || 'Artikel';

  // Strip markdown syntax for narration
  const plainText = article
    .replace(/^#+\s.*/gm, '')           // headings
    .replace(/!\[.*?\]\(.*?\)/g, '')     // images
    .replace(/\[([^\]]+)\]\(.*?\)/g, '$1') // links
    .replace(/(\*{1,3}|_{1,3})(.*?)\1/g, '$2') // bold/italic
    .replace(/^---+$/gm, '')             // dividers
    .replace(/`(.+?)`/g, '$1')           // inline code
    .replace(/^\s*\n/gm, '')             // extra blank lines
    .trim();

  console.log(`Article: ${title}`);
  console.log(`Length: ${plainText.length} chars`);

  const ai = new GoogleGenAI({ apiKey: API_KEY });

  // Step 1: Generate narration script from full article content
  console.log('\nStep 1: Generating narration script...');
  const prompt = `Kamu adalah penulis narasi audiobook profesional Bahasa Indonesia. Ubah artikel berikut menjadi naskah narasi audiobook yang siap dibacakan oleh 1 narrator.

ATURAN:
- Bahasa Indonesia yang natural, mengalir, dan enak didengar
- Sifatnya membacakan ulang konten artikel dengan gaya storytelling, bukan membaca mentah
- Baca dan pahami SELURUH isi artikel, kemudian buat narasi yang mencakup semua poin pentingnya
- Boleh menambahkan transisi antar bagian agar mengalir natural
- Jangan tambahkan efek suara atau stage direction — cuma teks yang akan dibacakan
- Pertahankan substansi dan depth artikel aslinya
- Langsung mulai dari narasi, tanpa "Selamat datang" atau pembukaan basa-basi
- Akhiri dengan penutup singkat yang natural

ARTIKEL:
${plainText}`;

  const transcriptResp = await ai.models.generateContent({
    model: 'gemini-2.0-flash',
    contents: prompt,
  });
  const transcript = transcriptResp.text;
  console.log(`Narration script generated (${transcript.length} chars)`);
  console.log(`Preview: ${transcript.slice(0, 300)}\n`);

  // Step 2: Generate audio (single male adult narrator)
  console.log('Step 2: Generating audio (this takes ~2-4 minutes)...');

  const response = await ai.models.generateContentStream({
    model: 'gemini-2.5-flash-preview-tts',
    config: {
      temperature: 1,
      responseModalities: ['audio'],
      speechConfig: {
        voiceConfig: { prebuiltVoiceConfig: { voiceName: 'Charon' } }
      },
    },
    contents: [{
      role: 'user',
      parts: [{ text: `Read the following text aloud in a calm, warm, adult male voice. Speak naturally as an audiobook narrator in Bahasa Indonesia, with appropriate pauses between paragraphs:\n\n${transcript}` }],
    }],
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

  const options = parseMimeType(mimeType || 'audio/L16;rate=24000');
  const wavBuffer = Buffer.concat([createWavHeader(rawAudio.length, options), rawAudio]);
  const tmpWav = `/tmp/audio_overview_${Date.now()}.wav`;
  fs.writeFileSync(tmpWav, wavBuffer);

  const outputDir = path.dirname(OUTPUT_FILE);
  if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir, { recursive: true });

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
