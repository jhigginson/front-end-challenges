import {themeOne, themeTwo, themeThree} from "./themes";


export function applyTheme(themeStr) {
  
  localStorage.setItem('theme', themeStr);
  let theme = themeStr === "1" ? themeOne : themeStr === "2" ? themeTwo : themeThree;
  const root = document.documentElement;
  Object.keys(theme).forEach((cssVar) => {
    root.style.setProperty(cssVar, theme[cssVar]);
  });
}

export function getInitialTheme() {
  let theme = "1";
  if (typeof window !== 'undefined' && localStorage["theme"]) {
    theme = localStorage["theme"];
  } else if (typeof window !== 'undefined') {
    theme = window.matchMedia('(prefers-color-scheme: dark)').matches ? "1" : "2";
  }
  // console.log("Initial Theme: ", theme);
  return theme;
}