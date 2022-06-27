import { useEffect, useState } from "react";
import { applyTheme } from "./themes/utils";
import {themeOne, themeTwo, themeThree} from "./themes/themes";
import ThemeToggle from "./ThemeToggle";
import Calculator from "./Calculator";

function App() {

  const [theme, setTheme] = useState("1");

  useEffect(() => {
    if(theme === "1"){
      applyTheme(themeOne);
    }else if(theme === "2"){
      applyTheme(themeTwo);
    }else if(theme === "3"){
      applyTheme(themeThree);
    }
    
  }, [theme]);




  const handleThemeChange = (id) => { 
    setTheme(id);
    console.log(id);
  };

  return (
    <div className="text-main-t mx-auto w-[88%] h-full flex flex-col">
      <header className="flex-none basis-[101px] flex items-center justify-between">
        <h1 className="text-3xl pl-2">calc</h1>
        <ThemeToggle onThemeChange={handleThemeChange} theme={theme} />
        
      </header>
      <Calculator />
      <footer className="text-xs text-main-t mt-3 text-center">
        Challenge by <a href="https://www.frontendmentor.io?ref=challenge" target="_blank">Frontend Mentor</a>.
        Coded by <a href="#">Your Name Here</a>.
      </footer>
    </div>
  );
}

export default App;
