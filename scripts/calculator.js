'use strict';

const displayTextEl = document.querySelector('.display-text');

let displayValue;
let firstNum;
let currentOperator;
let isRunningTotal = true;

console.log(firstNum);

const add = (n1, n2) => n1 + n2;
const subtract = (n1, n2) => n1 - n2;
const divide = (n1, n2) => n1 / n2;
const multiply = (n1, n2) => n1 * n2;

// rounds to 7 decimal places
const operate = (operator, n1, n2) => Math.round(operator(n1, n2) * 10000000) / 10000000;
const clearDisplay = () => {
  displayTextEl.textContent = '';
};

const buttons = document.querySelectorAll('.btn');

const operator = {
  '+': add,
  x: multiply,
  '-': subtract,
  '/': divide,
};

function updateDisplay(value) {
  displayTextEl.textContent += value;
  displayValue = Number(displayTextEl.textContent);
}

function resetCalculator() {
  clearDisplay();
  firstNum = undefined;
  currentOperator = undefined;
  isRunningTotal = true;
}

for (let i = 0; i < buttons.length; i++) {
  // when a button is pressed
  buttons[i].addEventListener('click', function () {
    // check button type
    const isNumber = this.classList.contains('num');
    const isOperator = this.classList.contains('opt');
    const isEnter = this.classList.contains('ent');
    const isClear = this.classList.contains('clr');
    const isDelete = this.classList.contains('del');

    // if a number button is pressed
    if (isNumber) {
      // prevent entering decimal more than once
      if (this.innerHTML === '.' && displayTextEl.textContent.includes('.')) return;

      // if the current display contains a running total
      // clear the display before updating
      if (!isRunningTotal) {
        clearDisplay();
        updateDisplay(this.innerHTML);
        isRunningTotal = true;
      } else {
        updateDisplay(this.innerHTML);
      }
    }
    // if an operator button is pressed
    else if (isOperator) {
      if (firstNum !== undefined) {
        clearDisplay();
        updateDisplay(operate(operator[currentOperator], firstNum, displayValue));

        firstNum = displayValue;
        currentOperator = this.innerHTML;

        isRunningTotal = false;
      } else {
        firstNum = displayValue;
        currentOperator = this.innerHTML;
        clearDisplay();
      }
    }
    // if the enter button is pressed
    else if (isEnter) {
      clearDisplay();
      updateDisplay(operate(operator[currentOperator], firstNum, displayValue));
      firstNum = undefined;
      isRunningTotal = false;
    }
    // if the clear button is pressed
    else if (isClear) {
      resetCalculator();
    }
    // if the delete button is pressed
    else if (isDelete) {
      const newValue = displayTextEl.textContent.slice(0, -1);
      clearDisplay();
      updateDisplay(newValue);
    }
  });
}
