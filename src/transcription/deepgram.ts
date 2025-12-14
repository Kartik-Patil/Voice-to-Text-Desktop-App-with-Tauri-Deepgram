let socket: WebSocket | null = null;

export async function connectDeepgram(
  onTranscript: (text: string) => void
) {
  const apiKey = import.meta.env.VITE_DEEPGRAM_API_KEY;

  if (!apiKey) {
    console.error("Deepgram API key not found");
    return;
  }

  socket = new WebSocket(
    "wss://api.deepgram.com/v1/listen?encoding=linear16&sample_rate=16000&punctuate=true",
    ["token", apiKey]
  );

  socket.onopen = () => {
    console.log("Connected to Deepgram");
  };

  socket.onmessage = (message) => {
    const data = JSON.parse(message.data);
    const transcript =
      data.channel?.alternatives?.[0]?.transcript;

    if (transcript) {
      onTranscript(transcript);
    }
  };

  socket.onerror = (err) => {
    console.error("Deepgram WebSocket error", err);
  };

  socket.onclose = () => {
    console.log("Deepgram connection closed");
  };
}

export function sendAudio(buffer: ArrayBuffer) {
  if (socket && socket.readyState === WebSocket.OPEN) {
    socket.send(buffer);
  }
}

export function closeDeepgram() {
  if (socket) {
    socket.close();
    socket = null;
  }
}
