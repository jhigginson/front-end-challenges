import Image from "next/image";
import { useContext } from "react";
import { colorModeContext } from "../context/ColorModeProvider";

export default function TodoHeader(props) {
  const colorCtx = useContext(colorModeContext);

  return (
    <header>
      <h1>TODO</h1>
      <img alt="Toggle Dark Mode" className="dark-mode-toggler" onClick={colorCtx.toggle}/>
    </header>
    
  );
}