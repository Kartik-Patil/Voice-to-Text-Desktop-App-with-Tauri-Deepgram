import {
  connectDeepgram,
  sendAudio,
  closeDeepgram,
} from "../transcription/deepgram";

let audioContext: AudioContext | null = null;
let processor: ScriptProcessorNode | null = null;
let stream: MediaStream | null = null;

export async function startRecording(
  onTranscript: (text: string) => void
) {
  stream = await navigator.mediaDevices.getUserMedia({ audio: true });

  audioContext = new AudioContext({ sampleRate: 16000 });
  const source = audioContext.createMediaStreamSource(stream);

  processor = audioContext.createScriptProcessor(4096, 1, 1);

  await connectDeepgram(onTranscript);

  processor.onaudioprocess = (event) => {
    const input = event.inputBuffer.getChannelData(0);
    const pcm = floatTo16BitPCM(input);
    sendAudio(pcm);
  };

  source.connect(processor);
  processor.connect(audioContext.destination);
}

export function stopRecording() {
  processor?.disconnect();
  audioContext?.close();
  stream?.getTracks().forEach((t) => t.stop());

  processor = null;
  audioContext = null;
  stream = null;

  closeDeepgram();
}

function floatTo16BitPCM(input: Float32Array): ArrayBuffer {
  const buffer = new ArrayBuffer(input.length * 2);
  const view = new DataView(buffer);

  let offset = 0;
  for (let i = 0; i < input.length; i++, offset += 2) {
    let sample = Math.max(-1, Math.min(1, input[i]));
    view.setInt16(
      offset,
      sample < 0 ? sample * 0x8000 : sample * 0x7fff,
      true
    );
  }

  return buffer;
}