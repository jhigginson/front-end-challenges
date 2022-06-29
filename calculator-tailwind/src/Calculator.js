import { useReducer } from 'react';

function getKeyType(key) {
  if (["Del", "Reset"].includes(key)) {
    return "func";
  } else if (key === "=") {
    return "eq";
  } else {
    return "num";
  }
}

function strToNum(str) {
  const num = parseFloat(str.replaceAll(',', ''));
  if (isNaN(num)) {
    throw new Error("screen value is NaN");
  }
  return num;
}

const MAX_PRECISION = 12;

function numToScreenStr(num) {
  if (num == null) { return ""; }
  const str = num.toString();
  if (str.length > MAX_PRECISION + 1) {
    return parseFloat(num.toPrecision(MAX_PRECISION)).toLocaleString('en-US');
  }
  return num.toLocaleString('en-US');
}

const initialState = {
  screen: "",
  operation: "",
  total: null,
  clearOnNext: true,
};

function evaluate(operation, first, second) {

  switch (operation) {
    case '':
      return second;
    case '+':
      return first + second;
    case '-':
      return first - second;
    case '/':
      return first / second;
    case 'x':
      return first * second;
    default:
      throw new Error("unexpected operation");
  }
}

function calcReducer(state, action) {
  // console.log(action.type);
  let newState = {};
  switch (action.type) {
    case '.':
      if (state.screen.includes('.') && !state.clearOnNext) {
        newState = { ...state, clearOnNext: false };
        // console.log(newState);
        return newState;
      }
      if (state.screen.length === 0 || state.clearOnNext) {
        newState = { ...state, screen: '0.', clearOnNext: false };
        // console.log(newState);
        return newState;
      }
      newState = { ...state, screen: state.screen + action.type, clearOnNext: false };
      // console.log(newState);
      return newState;
    case '0':
    case '1':
    case '2':
    case '3':
    case '4':
    case '5':
    case '6':
    case '7':
    case '8':
    case '9':
      let newScreen = state.screen;
      if (state.clearOnNext) {
        newScreen = action.type;
      } else if (state.screen.length <= MAX_PRECISION){
          newScreen = state.screen + action.type;
      }
      newState = { ...state, screen: newScreen, clearOnNext: false };
      // console.log(newState);
      return newState;
    case '+':
    case '-':
    case '/':
    case 'x':
      if (state.screen.length === 0) return { ...state };
      const newTot = state.total == null ? strToNum(state.screen) : evaluate(state.operation, state.total, strToNum(state.screen));
      newState = { screen: numToScreenStr(newTot), operation: action.type, total: newTot, clearOnNext: true };
      // console.log(newState);
      return newState;
    case '=':
      if (state.screen.length === 0 || state.clearOnNext) { return { ...state }; };
      const newTotal = evaluate(state.operation, state.total, strToNum(state.screen));
      newState = { screen: numToScreenStr(newTotal), operation: '', total: null, clearOnNext: true };
      // console.log(newState);
      return newState;
    case 'Reset':
      newState = initialState;
      // console.log(newState);
      return newState;
    case 'Del':
      newState = { ...state, screen: state.screen.length > 0 && !state.clearOnNext ? state.screen.slice(0, -1) : state.screen };
      // console.log(newState);
      return newState;
    default:
      throw new Error("Unsupported action type in calcReducer");
  }
}




const Calculator = (props) => {

  const [state, dispatch] = useReducer(calcReducer, initialState);

  return (
    <main className="h-full flex flex-col gap-6 md:mb-12">
      <p id="screen"
        className="flex-none bg-screen-b rounded-xl h-[88px] md:h-[124px] w-full text-4xl md:text-6xl text-right pr-7 pt-[26px] md:pt-[38px]">
        {state.screen === "" ? state.screen : state.screen[state.screen.length - 1] === '.' ? parseFloat(state.screen.slice(0, state.screen.length - 1)).toLocaleString('en-US') + "." : state.screen}
      </p>

      <section id="keypad"
        className="bg-keypad-b rounded-xl h-full w-full grid grid-cols-4 grid-rows-5 gap-y-4 gap-x-3 md:gap-y-7 md:gap-x-6 p-7"
      >
        {['7', '8', '9', 'Del', '4', '5', '6', '+', '1', '2', '3', '-', '.', '0', '/', 'x', 'Reset', '='].map((keyName, index) => {
          const keyType = getKeyType(keyName);
          const isColSpan2 = ['Reset', '='].includes(keyName);
          const textSize = keyType === 'func' ? 'text-md' : 'text-[32px]';
          return (
            <div key={index} id={`key${keyName}`}
              onClick={() =>
                dispatch({ type: keyName })
              }
              className={`cursor-pointer flex items-center justify-center rounded-md md:rounded-xl bg-${keyType}-key-b text-${keyType}-key-t ${textSize} ${isColSpan2 && 'col-span-2'} shadow-keys shadow-${keyType}-key-sh hover:bg-${keyType}-key-h`}>
              <p className={`md:text-5xl pt-2 leading-none ${keyType === 'func' && 'uppercase md:text-[32px]'} select-none`}>{keyName}</p>
            </div>
          );
        })}
      </section>
    </main>
  );
};

export default Calculator;

//shadow-func-key-sh shadow-num-key-sh shadow-eq-key-sh bg-func-key-b bg-eq-key-b bg-num-key-b text-func-key-t text-eq-key-t text-num-key-t hover:bg-num-key-h hover:bg-func-key-h hover:bg-eq-key-h //this is needed for hot-loading in development