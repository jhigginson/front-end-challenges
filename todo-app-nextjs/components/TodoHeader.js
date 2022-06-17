import Image from "next/image";
import { useContext, useEffect, useState } from "react";
import { colorModeContext } from "../context/ColorModeProvider";

const moonIconPath = "/images/icon-moon.svg";
const sunIconPath = "/images/icon-sun.svg";

export default function TodoHeader(props) {
  const colorCtx = useContext(colorModeContext);
  const [isSunsetting, setIsSunsetting] = useState(false);
  const [isSunrising, setIsSunrising] = useState(false);

  const handleClick = () => {
    setIsSunsetting(true);
  };

  const handleAnimEnd = (event) => {
    if (event.animationName === "sunset") {
      setIsSunsetting(false);
      colorCtx.toggle();
    } else if (event.animationName === "sunrise") {
      setIsSunrising(false);
    }
  };

  useEffect(() => {
    setIsSunrising(true);
  }, [colorCtx.colorMode]);

  return (
    <header>
      <h1>TODO</h1>
      <img alt="Toggle Dark Mode" src={colorCtx.colorMode === "dark" ? sunIconPath : moonIconPath}
        onAnimationEnd={handleAnimEnd}
        className={`dark-mode-toggler${isSunsetting ? " sunset" : ""}${isSunrising ? " sunrise" : ""}`}
        onClick={handleClick} />
    </header>

  );
}