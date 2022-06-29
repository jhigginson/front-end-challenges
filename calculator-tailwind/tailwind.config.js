/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme');
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./public/**/*.html"],
  theme: {
    colors: {
      'transparent': 'transparent',
      'current': 'currentColor',
      'main-t': 'var(--main-text)',
      'main-b': 'var(--main-bg)',
      'toggle-b': 'var(--toggle-bg)',
      'keypad-b': 'var(--keypad-bg)',
      'screen-b': 'var(--screen-bg)',
      'toggle': 'var(--toggle-key)',
      'toggle-h': 'var(--toggle-h)',
      'func-key-b': 'var(--func-key-b)',
      'func-key-sh': 'var(--func-key-sh)',
      'func-key-t': 'var(--func-key-t)',
      'func-key-h': 'var(--func-key-h)',
      'eq-key-b': 'var(--eq-key-b)',
      'eq-key-sh': 'var(--eq-key-sh)',
      'eq-key-t': 'var(--eq-key-t)',
      'eq-key-h': 'var(--eq-key-h)',
      'num-key-b': 'var(--num-key-b)',
      'num-key-sh': 'var(--num-key-sh)',
      'num-key-t': 'var(--num-key-t)',
      'num-key-h': 'var(--num-key-h)',
      'white': '#ffffff',

    },
    extend: {
      fontFamily: {
        'sans': ['League Spartan', ...defaultTheme.fontFamily.sans],
      },
      boxShadow: {
        'keys': '0 4px rgba(0, 0, 0, 1)',
      }
    },
    plugins: [],
  }

};
// https://blog.logrocket.com/theming-react-components-tailwind-css/