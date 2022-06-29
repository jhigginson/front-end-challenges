import { useEffect, useState } from "react";
import { applyTheme, getInitialTheme } from "./themes/utils";
import ThemeToggle from "./ThemeToggle";
import Calculator from "./Calculator";



function App() {

  const [theme, setTheme] = useState(getInitialTheme());

  useEffect(() => {
    applyTheme(theme);
  }, [theme]);

  const handleThemeChange = (id) => { 
    setTheme(id);
  };

  return (
    <div className="text-main-t mx-auto w-[88%] md:w-2/5 md:min-w-[36rem] h-full flex flex-col">
      <header className="flex-none basis-[101px] md:mt-16 flex items-center justify-between">
        <h1 className="text-3xl pl-2 select-none">calc</h1>
        <ThemeToggle onThemeChange={handleThemeChange} theme={theme} />
        
      </header>
      <Calculator />
      <footer className="text-xs text-main-t mt-3 text-center">
        Challenge by <a href="https://www.frontendmentor.io/challenges/calculator-app-9lteq5N29">Frontend Mentor</a>.
        Coded by <a href="https://github.com/jhigginson/front-end-challenges/tree/main/calculator-tailwind">John Higginson</a>.
      </footer>
    </div>
  );
}

export default App;
