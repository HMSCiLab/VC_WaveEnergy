import Button from "../components/Button";
import { Link } from "react-router-dom";
import bgVideo from "../assets/wave.mp4";
import { useEffect, useState } from "react";

function StartPage() {
  const [arduinoConnected, setArduinoConnected] = useState<boolean>(false);

  useEffect(() => {
    async function getInitStatus() {
      const status = await window.ipcRenderer.invoke("arduino-status");
      setArduinoConnected(status.connected);
    }
    getInitStatus();

    window.ipcRenderer.on("arduino-connected", () => {
      console.log("Arduino connected!");
      setArduinoConnected(true);
    });

    window.ipcRenderer.on("arduino-disconnected", () => {
      console.log("Arduino disconnected!");
      setArduinoConnected(false);
    });
  }, []);

  const onClick = (whichButton: String) => {
    console.log(whichButton);
  };

  const getCdipData = async () => {
    const data = await window.ipcRenderer.invoke("get-wave-data");
    console.log(data);
  };

  const buttonStyles: string =
    "bg-gradient-to-b from-[#fed9b7]/95 via-[#fed9b7]/85 to-[#fdfcdc]/80 text-gray-700 rounded-full drop-shadow-xl/25 font-bold tracking-wider active:from-[#f07167]/80 active:to-[#fed9b7]/80 active:scale-95 px-6 py-4 sm:px-8 sm:py-5 md:px-10 md:py-6 lg:px-8 lg:py-10 text-lg sm:text-2xl md:text-3xl lg:text-4xl whitespace-pre-line";

  return (
    // Main container
    <div className="relative flex flex-col h-screen overflow-hidden justify-end items-center">
      <video
        className="absolute inset-0 w-full h-full object-cover"
        autoPlay
        loop
        muted
        playsInline
        aria-hidden="true"
      >
        <source src={bgVideo} type="video/mp4" />
      </video>
      {/* Button container */}
      <div className="flex w-full max-w-6xl flex-col sm:flex-row items-center justify-center gap-6 sm:gap-8 md:gap-12 lg:gap-36 pb-70 sm:pb-12 md:pb-16 lg:pb-70 px-4 z-10">
        {arduinoConnected && (
          <>
            <Link to="/wave-selector-page">
              <Button
                text={"Make your own\nwave"}
                onClick={onClick}
                styles={buttonStyles}
              />
            </Link>

            <Button
              text={"See real-time\nwaves"}
              onClick={getCdipData}
              styles={buttonStyles}
            />
          </>
        )}
        {!arduinoConnected && (
          <h1 className="text-4xl text-black">Arduino not connected!</h1>
        )}
      </div>
    </div>
  );
}

export default StartPage;
