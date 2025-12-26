# 🗣️ Voice-to-Text Desktop App (Tauri + React + Deepgram)


Demo link: [https://youtu.be/ekxqVYuQw2g]

A cross-platform desktop application that converts real-time voice input into text using Deepgram’s speech-to-text API.  
Built with **Tauri v2**, **React**, and **TypeScript**.

This project is a **functional clone of Wispr Flow**, focusing on the **core voice-to-text workflow** rather than pixel-perfect UI replication.



---

## 🚀 Features

- 🎙️ **Push-to-Talk Voice Input**
  - Hold a button to start recording
  - Release to stop recording
- 🎧 **Microphone Access & Audio Capture**
  - Captures live audio from the system microphone
- ⚡ **Real-Time Transcription**
  - Streams audio to Deepgram using WebSockets
  - Low-latency speech-to-text conversion
- 📝 **Live Transcription Display**
  - Transcribed text appears instantly in the UI
- 🎛️ **Recording State Feedback**
  - Visual feedback when recording is active
- 🖥️ **Cross-Platform Desktop App**
  - Runs on Windows, macOS, and Linux using Tauri

---

## 🧱 Tech Stack

### Desktop Framework
- **Tauri v2**
  - Lightweight native desktop runtime
  - Smaller bundle size and better performance than Electron

### Frontend
- **React**
- **TypeScript**
- **Vite** for fast development and builds

### Speech-to-Text
- **Deepgram WebSocket API**
  - Real-time transcription
  - Linear16 PCM audio streaming

---

## 📁 Project Structure

```
wispr-flow-clone/
├── .env
├── index.html
├── package.json
├── vite.config.ts
├── tsconfig.json
├── src/
│   ├── main.tsx
│   ├── App.tsx
│   ├── App.css
│   ├── audio/
│   │   └── recorder.ts
│   └── transcription/
│       └── deepgram.ts
└── src-tauri/
    ├── Cargo.toml
    ├── build.rs
    ├── tauri.conf.json
    └── src/
        ├── main.rs
        └── lib.rs
```

---

## ⚙️ Setup Instructions

### 1️⃣ Prerequisites

- Node.js (v18+)
- Rust (stable)
- Tauri CLI
- Deepgram account

### 2️⃣ Clone the Repository

```bash
git clone https://github.com/your-username/wispr-flow-clone.git
cd wispr-flow-clone
```

### 3️⃣ Install Dependencies

```bash
npm install
```

### 4️⃣ Configure Environment Variables

Create a `.env` file in the project root:

```env
VITE_DEEPGRAM_API_KEY=dg_your_deepgram_api_key_here
```

Restart the dev server after creating this file.

### 5️⃣ Run the Desktop App

```bash
npm run tauri dev
```

---

## 🧠 Architecture & Design Decisions

### Separation of Concerns

- UI Layer (`App.tsx`)
- Audio Capture (`audio/recorder.ts`)
- Transcription Service (`transcription/deepgram.ts`)
- Desktop Shell (Tauri backend)

### Audio Processing

- Web Audio API
- 16kHz Linear PCM audio format

### Microphone Permissions

Microphone access is handled at the operating system level, as is standard for native desktop applications built with Tauri. No browser-style permission popup is shown.


### Why WebSockets

- Real-time transcription
- Low latency
- Suitable for dictation workflows

---

## ⚠️ Known Limitations

- No global keyboard shortcuts
- No clipboard auto-paste
- No system tray mode
- Uses deprecated ScriptProcessorNode
- Minimal UI styling

---

## 🔮 Future Improvements

- Global push-to-talk shortcut
- Clipboard integration
- System tray support
- AudioWorklet upgrade
- Desktop installers

## 🎥 Demo Video

A short screen recording demonstrating:
- Push-to-talk recording
- Live transcription
- End-to-end workflow



---

## 📜 License

MIT License
