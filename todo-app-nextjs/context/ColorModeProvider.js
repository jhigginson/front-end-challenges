import { useState, useEffect, createContext } from "react";

export const colorModeContext = createContext({ colorMode: "", toggle: () => { } });

const getInitialState = () => {
  let useDarkMode = true;
  if (typeof window !== 'undefined' && localStorage["colorMode"]) {
    useDarkMode = localStorage["colorMode"] === "dark";
  } else if (typeof window !== 'undefined') {
    useDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
  }
  if (useDarkMode) {
    return ("dark");
  } else {
    return ("light");
  }
}

const ColorModeProvider = ({ children }) => {
  const [colorMode, setColorMode] = useState("");

  const toggleColorMode = () => {

    setColorMode(prev => {
      if (prev === "dark") {
        setColorMode("light");
      } else {
        setColorMode("dark");
      }
    });

  };

  useEffect(() => {
    if (colorMode === "") {
      setColorMode(getInitialState());
    }
  }, [])

  useEffect(() => {
    if (colorMode !== "") {
      localStorage.setItem('colorMode', colorMode);
    }
  }, [colorMode]);



  return (
    <colorModeContext.Provider value={{ colorMode: colorMode, toggle: toggleColorMode }}>
      {children}
    </colorModeContext.Provider>
  );
}

export default ColorModeProvider;