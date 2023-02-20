import { createContext, PropsWithChildren, useCallback, useContext, useState } from "react";

type Context = [string, (value: string) => void];

export const RegionContext = createContext<Context>(null!);
export const useRegion = () => useContext(RegionContext);

export function RegionContextProvider({ initRegion, ...props }: PropsWithChildren<{ initRegion?: string }>) {
  const [region, setRegion] = useState<string>(initRegion ?? "");

  const changeRegion = useCallback((region: string) => {
    setRegion(region);
    localStorage.setItem("region", region);
  }, []);

  return <RegionContext.Provider value={[region, changeRegion]} {...props} />;
}
