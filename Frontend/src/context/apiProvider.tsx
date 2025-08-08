import React from "react";

// eslint-disable-next-line react-refresh/only-export-components
export const ApiContext = React.createContext({}); // reserved for future

export function ApiProvider({ children }: { children: React.ReactNode }) {
  return <ApiContext.Provider value={{}}>{children}</ApiContext.Provider>;
}
