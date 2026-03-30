import Button from "../components/Button";
import bgVideo from "../assets/wave.mp4";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../AppContext";
import { buoyData } from "../../electron/types/buoyDataType";
import { PacWaveDataError } from "../../electron/errors/errors";
import { inputValidation } from "../page-logic/utils";
import LoadingSpinner from "../components/LoadingSpinner";

function StartPage() {
  const navigate = useNavigate();
  const { setSelectedHeight, setSelectedPeriod } = useAppContext();
  const [arduinoConnected, setArduinoConnected] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

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

  const sendWaveOverIPC = async (data: buoyData) => {
    setSelectedHeight(data.height);
    setSelectedPeriod(data.period);
    const waveProperties = {
      height: data.height,
      period: data.period,
    };
    if (inputValidation(waveProperties)) {
      window.ipcRenderer.invoke("send-wave", waveProperties).then(() => {
        console.log(
          `Sending ${waveProperties.height}ft @ ${waveProperties.period}s`,
        );
        navigate("/wave-read-page");
      });
    }
  };

  /**
   * Get CDIP data via the offical API.
   */
  const getCdipData = async () => {
    console.log("Getting CDIP data");
    setLoading(true);
    return await window.ipcRenderer.invoke("get-wave-data");
  };

  /**
   * Get CDIP data via NFS mount at PacWave's CEOAS based server netwrok.
   */
  const getDriveData = async () => {
    setLoading(true);
    try {
      const data: buoyData = await window.ipcRenderer.invoke("get-drive-data");
      sendWaveOverIPC(data);
    } catch (PacWaveDataError) {
      const data: buoyData = await getCdipData();
      sendWaveOverIPC(data);
    }
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
            <Button
              className={buttonStyles}
              onClick={() => {
                navigate("/wave-selector-page");
              }}
            >
              Make your own wave
            </Button>

            <Button
              // onClick={getCdipData}
              onClick={getDriveData}
              className={buttonStyles}
            >
              {loading ? (
                <div className="flex items-center justify-center">
                  <span className="invisible">See real-time Waves</span>
                  <LoadingSpinner />
                </div>
              ) : (
                <span>See real-time waves</span>
              )}
            </Button>
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
