import { useState, useContext, createContext } from "react";

type AppContextType = {
  waveData: number[];
  setWaveData: React.Dispatch<React.SetStateAction<number[]>>;
};
const AppContext = createContext<AppContextType | null>(null);

export default function ContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [waveData, setWaveData] = useState<number[]>([]);
  return (
    <AppContext.Provider value={{ waveData, setWaveData }}>
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
