
function getKeyType(key) {
  if (["Del", "Reset"].includes(key)) {
    return "func";
  } else if (key === "=") {
    return "eq";
  } else {
    return "num";
  }
}

const Calculator = (props) => {


  return (
    <main className="h-full flex flex-col gap-6">
      <p id="screen"
        className="flex-none bg-screen-b rounded-xl h-[88px] w-full text-4xl text-right pr-6 pt-[26px]">
        399,981
      </p>

      <section id="keypad"
        className="bg-keypad-b rounded-xl h-full w-full grid grid-cols-4 grid-rows-5 gap-y-4 gap-x-3 p-6"
      >
        {['7', '8', '9', 'Del', '4', '5', '6', '+', '1', '2', '3', '-', '.', '0', '/', 'x', 'Reset', '='].map((keyName, index) => {
          const keyType = getKeyType(keyName);
          const isDouble = ['Reset', '='].includes(keyName);
          const textSize = keyType === 'func' ? 'text-lg' : 'text-[32px]'
          return (
          <div key={index} id={`key${keyName}`}
            className={`cursor-pointer flex items-center justify-center rounded-lg bg-${keyType}-key-b text-${keyType}-key-t ${textSize} ${isDouble && 'col-span-2'} shadow-keys shadow-${keyType}-key-sh hover:bg-${keyType}-key-h`}>
            <p className={`pt-2 leading-none ${keyType === 'func' && 'uppercase'}`}>{keyName}</p>
          </div>
        );})} 
      </section>
    </main>
  );
};

export default Calculator;

//shadow-func-key-sh shadow-num-key-sh shadow-eq-key-sh bg-func-key-b bg-eq-key-b bg-num-key-b text-func-key-t text-eq-key-t text-num-key-t hover:bg-num-key-h hover:bg-func-key-h hover:bg-eq-key-h //this is needed for hot-loading in development