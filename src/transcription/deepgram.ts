let socket: WebSocket | null = null;
let socketReady = false;

export async function connectDeepgram(
  onTranscript: (text: string, isFinal: boolean) => void
): Promise<void> {
  const apiKey = import.meta.env.VITE_DEEPGRAM_API_KEY;

  if (!apiKey) {
    throw new Error("Deepgram API key not found");
  }

  socket = new WebSocket(
    "wss://api.deepgram.com/v1/listen?encoding=linear16&sample_rate=16000&punctuate=true",
    ["token", apiKey]
  );

  socket.onopen = () => {
    socketReady = true;
    console.log("✅ Deepgram WebSocket connected");
  };

  socket.onmessage = (message) => {
    const data = JSON.parse(message.data);

    const transcript =
      data.channel?.alternatives?.[0]?.transcript;
    const isFinal = data.is_final === true;

    if (transcript) {
      onTranscript(transcript, isFinal);
    }
  };

  socket.onerror = () => {
    console.error("❌ Deepgram WebSocket error");
  };

  socket.onclose = () => {
    socketReady = false;
    console.warn("⚠️ Deepgram WebSocket closed");
  };
}

export function sendAudio(buffer: ArrayBuffer) {
  if (socket && socketReady && socket.readyState === WebSocket.OPEN) {
    socket.send(buffer);
  }
}

export function closeDeepgram() {
  if (socket) {
    socket.close();
    socket = null;
    socketReady = false;
  }
}
