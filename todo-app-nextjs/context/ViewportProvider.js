import { useEffect, useState, useContext, createContext } from "react";

const viewportContext = createContext({ width: 0, height: 0 });

export const ViewportProvider = ({ children }) => {
  const [width, setWidth] = useState(1440);
  const [height, setHeight] = useState(810);

  const handleWindowResize = () => {
    setWidth(window.innerWidth);
    setHeight(window.innerHeight);
  }

  useEffect(() => {
    handleWindowResize();
    window.addEventListener("resize", handleWindowResize);
    return () => window.removeEventListener("resize", handleWindowResize);
  }, []);

  return (
    <viewportContext.Provider value={{ width, height }}>
      {children}
    </viewportContext.Provider>
  );
}

export const useViewport = () => {
  const { width, height } = useContext(viewportContext);
  return { width, height };
}