import { useState } from "react";
import { startRecording, stopRecording } from "./audio/recorder";
import "./App.css";

function App() {
  const [recording, setRecording] = useState(false);
  const [text, setText] = useState("");

  const start = async () => {
    setText("");
    await startRecording((t) => {
      setText((prev) => prev + " " + t);
    });
    setRecording(true);
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

      <textarea
        value={text}
        readOnly
        rows={8}
        placeholder="Your transcription will appear here..."
      />
    </div>
  );
}

export default App;
