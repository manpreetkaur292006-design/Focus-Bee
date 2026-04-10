import React from "react";

const Buttons = () => {
  return (
    <>
      <div id="keys" class="calculator-keys">
        <button onclick="clearDisplay()" class="operator-btn">
          c
        </button>
        <button onclick="appendToDisplay('/')" class="operator-btn">
          ÷
        </button>
        <button onclick="appendToDisplay('*')" class="operator-btn">
          x
        </button>
        <button onclick="deleteLast()" class="operator-btn">
          ⬅️
        </button>

        <button onclick="appendToDisplay('7')">7</button>
        <button onclick="appendToDisplay('8')">8</button>
        <button onclick="appendToDisplay('9')">9</button>
        <button onclick="appendToDisplay('-')" class="operator-btn">
          -
        </button>

        <button onclick="appendToDisplay('4')">4</button>
        <button onclick="appendToDisplay('5')">5</button>
        <button onclick="appendToDisplay('6')">6</button>
        <button onclick="appendToDisplay('+')" class="operator-btn">
          +
        </button>

        <button onclick="appendToDisplay('1')">1</button>
        <button onclick="appendToDisplay('2')">2</button>
        <button onclick="appendToDisplay('3')">3</button>
        <button onclick="calculate()" class="equals-btn">
          =
        </button>
        <button onclick="appendToDisplay('0')" class="zero-btn">
          0
        </button>
        <button onclick="appendToDisplay('.')">.</button>
      </div>
    </>
  );
};

export default Buttons;
