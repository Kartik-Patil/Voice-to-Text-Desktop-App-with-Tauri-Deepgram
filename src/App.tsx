import { useState } from "react";
import { startRecording, stopRecording } from "./audio/recorder";

import "./App.css";

function App() {
  const [recording, setRecording] = useState(false);
  const [finalText, setFinalText] = useState("");
  const [partialText, setPartialText] = useState("");
  const [error, setError] = useState<string | null>(null);

  const start = async () => {
    if (recording) return;

    setError(null);
    setPartialText("");

    try {
      await startRecording((text, isFinal) => {
        if (isFinal) {
          setFinalText((prev) => (prev + " " + text).trim());
          setPartialText("");
        } else {
          setPartialText(text);
        }
      });

      setRecording(true);
    } catch (e: any) {
      setError(e.message || "Failed to start recording");
    }
  };

  const stop = () => {
    stopRecording();
    setRecording(false);
  };

  return (
    <div className="container">
      <h1>Voice to Text (Tauri + Deepgram)</h1>

      <button
        onMouseDown={start}
        onMouseUp={stop}
        className={recording ? "recording" : ""}
      >
        {recording ? "Recording..." : "Hold to Talk"}
      </button>

      {error && <p className="error">{error}</p>}

      <textarea
        value={(finalText + " " + partialText).trim()}
        readOnly
        rows={8}
        placeholder="Your transcription will appear here..."
      />
    </div>
  );
}

export default App;
