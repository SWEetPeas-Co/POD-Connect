// this doc makes color modes a context so that it changes locally

import React, { createContext, useContext, useState } from 'react';

type ColorMode = 'light' | 'dark' | 'colorblind';

type ThemeContextType = {
  mode: ColorMode;                        // current mode var
  setMode: (mode: ColorMode) => void;     // sets mode
  ldMode: 'light' | 'dark';               // ld is light/dark
  setLdMode: (mode: 'light' | 'dark') => void;    // set if light or dark
  colorblindOn: boolean;                          // is colorblind on?
  setColorblindOn: (on: boolean) => void;         // set if colorblind
};

const ThemeContext = createContext<ThemeContextType>({
  mode: 'light',    // default mode is light
  setMode: () => {},
  ldMode: 'light',    // defult is light
  setLdMode: () => {},
  colorblindOn: false,    // default is no colorblind
  setColorblindOn: () => {},
});

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [ldMode, setLdMode] = useState<'light' | 'dark'>('light');
  const [colorblindOn, setColorblindOn] = useState(false);

  const mode: ColorMode = colorblindOn ? 'colorblind' : ldMode;

  // mode is now derived, so setMode just updates the right piece
  const setMode = (m: ColorMode) => {
    if (m === 'colorblind') {
      setColorblindOn(true);
    } else {
      setColorblindOn(false);
      setLdMode(m);
    }
  };

  return (
    <ThemeContext.Provider value={{ mode, setMode, ldMode, setLdMode, colorblindOn, setColorblindOn }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useThemeContext() {
  return useContext(ThemeContext);
}