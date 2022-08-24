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

const calcStates = {
  start: 0,
  first_arg: 1,
  first_arg_float: 2,
  operation: 3,
  second_arg: 4,
  second_arg_float: 5,
  equals: 6,
};

const initialState = {
  state: calcStates.start,
  display: "",
  operation: "",
  firstArg: 0,
  secondArg: 0,
};

function evaluate(operation, first, second) {

  switch (operation) {
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

const keyClass = {
  NUM: 0,
  DOT: 1,
  OP: 2,
  EQ: 3,
  RES: 4,
  DEL: 5,
};

const getKeyClass = (key) => {
  switch (key) {
    case '.':
      return keyClass.DOT;
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
      return keyClass.NUM;
    case '+':
    case '-':
    case '/':
    case 'x':
      return keyClass.OP;
    case '=':
      return keyClass.EQ;
    case 'Reset':
      return keyClass.RES;
    case 'Del':
      return keyClass.DEL
    default:
      return undefined;
  }
}

function calcReducer(state, action) {
  const keyCl = getKeyClass(action.type);

  if (keyCl === keyClass.RES) { //always reset state to start if reset is pressed
    return initialState;
  }

  switch (state.state) {
    case calcStates.start:
      if (keyCl === keyClass.DOT) {
        return { ...state, state: calcStates.first_arg_float, display: "0." };
      }
      if (keyCl === keyClass.NUM) {
        return { ...state, state: calcStates.first_arg, display: action.type };
      }
      break;
    case calcStates.first_arg:
      if (keyCl === keyClass.DEL) {
        if (state.display.length === 1) {
          return initialState;
        }
        return { ...state, display: state.display.slice(0, -1) };
      }
      if (keyCl === keyClass.NUM) {
        return { ...state, display: state.display + action.type };
      }
      if (keyCl === keyClass.DOT) {
        return { ...state, state: calcStates.first_arg_float, display: state.display + '.' };
      }
      if (keyCl === keyClass.OP) {
        return { ...state, state: calcStates.operation, operation: action.type, firstArg: parseFloat(state.display), display: parseFloat(state.display).toString() };
      }
      break;
    case calcStates.first_arg_float:
      if (keyCl === keyClass.DEL) {
        return { ...state, display: state.display.slice(0, -1), state: state.display.at(-1) === '.' ? calcStates.first_arg : state.state };
      }
      if (keyCl === keyClass.NUM) {
        return { ...state, display: state.display + action.type };
      }
      if (keyCl === keyClass.OP) {
        return { ...state, state: calcStates.operation, operation: action.type, firstArg: parseFloat(state.display) };
      }
      break;
    case calcStates.operation:
      if (keyCl === keyClass.DEL){
        if(state.display.length === 1) return initialState;
        let newDisp = state.display.slice(0, -1);
        return { ...state, state: newDisp.includes('.') ? calcStates.first_arg_float : calcStates.first_arg, display: newDisp };
      }
      if (keyCl === keyClass.NUM) {
        return { ...state, state: calcStates.second_arg, display: action.type };
      }
      if (keyCl === keyClass.DOT) {
        return { ...state, state: calcStates.second_arg_float, display: "0." };
      }
      if (keyCl === keyClass.OP) {
        return { ...state, operation: action.type };
      }
      break;
    case calcStates.second_arg:
      if (keyCl === keyClass.DEL) {
        if (state.display.length === 1) {
          return { ...state, state: calcStates.operation, display: "" };
        }
        return { ...state, display: state.display.slice(0, -1) };
      }
      if (keyCl === keyClass.NUM) {
        return { ...state, display: state.display + action.type };
      }
      if (keyCl === keyClass.EQ) {
        return { ...state, state: calcStates.equals, secondArg: parseFloat(state.display), display: evaluate(state.operation, state.firstArg, parseFloat(state.display)).toString() };
      }
      if (keyCl === keyClass.OP) {
        let total = evaluate(state.operation, state.firstArg, parseFloat(state.display));
        return { ...state, state: calcStates.operation, display: total.toString(), operation: action.type, firstArg: total }
      }
      if (keyCl === keyClass.DOT) {
        return { ...state, state: calcStates.second_arg_float, display: state.display + '.', };
      }
      break;
    case calcStates.second_arg_float:
      if (keyCl === keyClass.DEL) {
        return { ...state, display: state.display.slice(0, -1), state: state.display.at(-1) === '.' ? calcStates.second_arg : state.state };
      }
      if (keyCl === keyClass.NUM) {
        return { ...state, display: state.display + action.type };
      }
      if (keyCl === keyClass.OP) {
        let total = evaluate(action.type, state.firstArg, parseFloat(state.display));
        return { ...state, state: calcStates.operation, display: total.toString(), operation: action.type, firstArg: total };
      }
      if (keyCl === keyClass.EQ) {
        return { ...state, state: calcStates.equals, secondArg: parseFloat(state.display), display: evaluate(state.operation, state.firstArg, parseFloat(state.display)).toString() };
      }
      break;
    case calcStates.equals:
      if (keyCl === keyClass.EQ) {
        return { ...state, display: evaluate(state.operation, parseFloat(state.display), state.secondArg).toString() };
      }
      if (keyCl === keyClass.NUM) {
        return { ...state, state: calcStates.first_arg, display: action.type };
      }
      if (keyCl === keyClass.OP) {
        return { ...state, state: calcStates.operation, operation: action.type, firstArg: parseFloat(state.display) };
      }
      if (keyCl === keyClass.DOT) {
        return { ...state, state: calcStates.first_arg_float, display: "0." };
      }
      break;
    default:
      return { ...state };
  }
  return { ...state };
}




const Calculator = (props) => {

  const [state, dispatch] = useReducer(calcReducer, initialState);

  return (
    <main className="h-full flex flex-col gap-6 md:mb-12">
      <p id="screen"
        className="flex-none bg-screen-b rounded-xl h-[88px] md:h-[124px] w-full text-4xl md:text-6xl text-right pr-7 pt-[26px] md:pt-[38px]">
        {state.display}
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