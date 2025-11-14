import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import WaveSelectorPage from "./components/WaveSelectorPage.tsx";
import WaveReadPage from "./components/WaveReadPage.tsx";
import ContextProvider from "./components/util-components/AppContext.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ContextProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/wave-selector-page" element={<WaveSelectorPage />} />
          <Route path="/wave-read-page" element={<WaveReadPage />} />
        </Routes>
      </BrowserRouter>
    </ContextProvider>
  </React.StrictMode>
);

// Use contextBridge
window.ipcRenderer.on("main-process-message", (_event, message) => {
  console.log(message);
});
