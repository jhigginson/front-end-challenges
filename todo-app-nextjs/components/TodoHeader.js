import Image from "next/image";
import { useContext, useState } from "react";
import { colorModeContext } from "../context/ColorModeProvider";

export default function TodoHeader(props) {
  const colorCtx = useContext(colorModeContext);
  const [isSunsetting, setIsSunsetting] = useState(false);
  const [isSunrising, setIsSunrising] = useState(false);

  const handleClick = () => {
    setIsSunsetting(true);
  };

  const handleAnimEnd = () => {
    if(isSunsetting){
      setIsSunsetting(false);
      colorCtx.toggle();
       setTimeout(()=> setIsSunrising(true), 50);
    }else if(isSunrising){
      setIsSunrising(false);
    }
  };

  return (
    <header>
      <h1>TODO</h1>
      <img alt="Toggle Dark Mode" onAnimationEnd={handleAnimEnd} className={`dark-mode-toggler${isSunsetting ? " sunset" : ""}${isSunrising ? " sunrise" : ""}`} onClick={handleClick} />
    </header>

  );
}