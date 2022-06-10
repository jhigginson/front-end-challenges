import { useState, useEffect, createContext } from "react";

export const colorModeContext = createContext({ colorMode: "", toggle: () => { } });


const ColorModeProvider = ({ children }) => {
  const [colorMode, setColorMode] = useState("dark");


  useEffect(() => {
    const mq = window.matchMedia('(prefers-color-scheme: dark)');
    const useDarkMode = mq.matches;
    // console.log(`prefers-color-scheme dark?: ${useDarkMode}`);
    if (useDarkMode) {
      setColorMode("dark");
    } else {
      setColorMode("light");
    }
  }, [])

  const toggleColorMode = () => {
    // console.log(`toggling color mode from ${colorMode}`)
    setColorMode(prev => {
      if (prev === "dark") {
        setColorMode("light");
      } else {
        setColorMode("dark");
      }
    });
  };

  return (
    <colorModeContext.Provider value={{ colorMode: colorMode, toggle: toggleColorMode }}>
      {children}
    </colorModeContext.Provider>
  );
}

export default ColorModeProvider;