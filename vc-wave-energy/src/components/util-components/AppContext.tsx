import React, { useState, useContext, createContext } from "react";

type AppContextType = {
  waveData: number[];
  setWaveData: React.Dispatch<React.SetStateAction<number[]>>;

  selectedHeight: number;
  setSelectedHeight: React.Dispatch<React.SetStateAction<number>>;
  selectedPeriod: number;
  setSelectedPeriod: React.Dispatch<React.SetStateAction<number>>;
};
const AppContext = createContext<AppContextType | null>(null);

export default function ContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [waveData, setWaveData] = useState<number[]>([]);
  const [selectedHeight, setSelectedHeight] = useState<number>(0);
  const [selectedPeriod, setSelectedPeriod] = useState<number>(0);
  return (
    <AppContext.Provider
      value={{
        waveData,
        setWaveData,
        selectedHeight,
        setSelectedHeight,
        selectedPeriod,
        setSelectedPeriod,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within <ContextProvider>");
  }
  return context;
}
