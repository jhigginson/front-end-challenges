import { useContext } from 'react';
import { viewportContext } from "../context/ViewportProvider"


const useViewport = () => {
  const { width, height } = useContext(viewportContext);
  return { width, height };
}