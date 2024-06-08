// LastRouteContext.tsx
import React, { createContext, useState, useContext, ReactNode } from 'react';

interface LastRouteContextType {
  lastRoute: string;
  setLastRoute: (route: string) => void;
}

const LastRouteContext = createContext<LastRouteContextType | undefined>(undefined);

export const LastRouteProvider = ({ children }: { children: ReactNode }) => {
  const [lastRoute, setLastRoute] = useState<string>('/');

  return (
    <LastRouteContext.Provider value={{ lastRoute, setLastRoute }}>
      {children}
    </LastRouteContext.Provider>
  );
};

export const useLastRoute = (): LastRouteContextType => {
  const context = useContext(LastRouteContext);
  if (!context) {
    throw new Error('useLastRoute must be used within a LastRouteProvider');
  }
  return context;
};
