

const ThemeToggle = (props) => {

  // console.log("checked = ", props.theme)

  let translateX = "";
  if(props.theme === '1'){
    translateX = '-translate-x-6';
  }else if(props.theme === '3'){
    translateX = 'translate-x-6';
  }

  return (
    <form className="grid grid-cols-[1fr_72px] grid-rows-2 w-1/2 text-sm text-center">
      <div className="col-start-2 grid grid-cols-3 items-center select-none">
        <label className="cursor-pointer" htmlFor="theme1">1</label>
        <label className="cursor-pointer" htmlFor="theme2">2</label>
        <label className="cursor-pointer" htmlFor="theme3">3</label>
      </div>
      <h2 className="pr-5 uppercase self-center justify-self-end select-none">Theme</h2>
      <div className="bg-toggle-b grid grid-cols-3 items-center rounded-full h-[26px] relative cursor-pointer group">
        {[1, 2, 3].map((themeNum) => (
          <input key={themeNum}
            className="appearance-none bg-transparent border-none w-full h-full cursor-pointer"
            type="radio"
            id={`theme${themeNum}`}
            name="theme" value={themeNum}
            onChange={(e) => props.onThemeChange(e.target.value)}
            checked={themeNum === parseInt(props.theme)} />
        ))}
        <span className={`absolute w-[18px] h-[18px] mx-auto left-0 right-0 rounded-full bg-toggle group-hover:bg-toggle-h transition-all duration-200 ${translateX}`}></span>
      </div>
    </form>
  );
};


export default ThemeToggle;