import { useState } from "react";
import { startRecording, stopRecording } from "./audio/recorder";
import { writeText } from "@tauri-apps/plugin-clipboard-manager";

import "./App.css";

function App() {
  const [recording, setRecording] = useState(false);
  const [finalText, setFinalText] = useState("");
  const [partialText, setPartialText] = useState("");
  const [error, setError] = useState<string | null>(null);

  const start = async () => {
    setError(null);
    setPartialText("");
    try {
      await startRecording((text, isFinal) => {
        if (isFinal) {
          setFinalText((prev) => prev + " " + text);
          setPartialText("");
        } else {
          setPartialText(text);
        }
      });
      setRecording(true);
    } catch (e: any) {
      setError(e.message);
    }
  };

  const stop = () => {
    stopRecording();
    setRecording(false);
  };

  const copyText = async () => {
    await writeText(finalText.trim());
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

      <button onClick={copyText} disabled={!finalText.trim()}>
        Copy Text
      </button>
    </div>
  );
}

export default App;
