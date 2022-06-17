import Image from "next/image";
import { useContext, useEffect, useState } from "react";
import { colorModeContext } from "../context/ColorModeProvider";

export default function TodoHeader(props) {
  const colorCtx = useContext(colorModeContext);
  const [isSunsetting, setIsSunsetting] = useState(false);
  const [isSunrising, setIsSunrising] = useState(false);

  const handleClick = () => {
    setIsSunsetting(true);
  };

  const handleAnimEnd = () => {
    if (isSunsetting) {
      console.log("sunset ended");
      setIsSunsetting(false);
      colorCtx.toggle();
    } else if (isSunrising) {
      console.log("sunrise ended");
      setIsSunrising(false);
    }
  };

  useEffect(() => {
    setTimeout(() => setIsSunrising(true), 10);
  }, [colorCtx.colorMode]);

  return (
    <header>
      <h1>TODO</h1>
      <img alt="Toggle Dark Mode" onAnimationEnd={handleAnimEnd} className={`dark-mode-toggler${isSunsetting ? " sunset" : ""}${isSunrising ? " sunrise" : ""}`} onClick={handleClick} />
    </header>

  );
}