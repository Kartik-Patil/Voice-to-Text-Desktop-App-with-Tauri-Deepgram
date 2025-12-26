let socket: WebSocket | null = null;

export async function connectDeepgram(
  onTranscript: (text: string, isFinal: boolean) => void
) {
  const apiKey = import.meta.env.VITE_DEEPGRAM_API_KEY;

  if (!apiKey) {
    throw new Error("Deepgram API key not found");
  }

  socket = new WebSocket(
    "wss://api.deepgram.com/v1/listen?encoding=linear16&sample_rate=16000&punctuate=true",
    ["token", apiKey]
  );

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
    console.error("Deepgram WebSocket error");
  };
}

export function sendAudio(buffer: ArrayBuffer) {
  if (socket && socket.readyState === WebSocket.OPEN) {
    socket.send(buffer);
  }
}

export function closeDeepgram() {
  socket?.close();
  socket = null;
}
