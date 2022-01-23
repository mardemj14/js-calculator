'use strict';

const displayTextEl = document.querySelector('.display-text');

let displayValue;
let firstNum;
let currentOperator;
let isRunningTotal = false;

console.log(firstNum);

const add = (n1, n2) => n1 + n2;
const subtract = (n1, n2) => n1 - n2;
const divide = (n1, n2) => n1 / n2;
const multiply = (n1, n2) => n1 * n2;

// rounds to 3 decimal places
const operate = (operator, n1, n2) => Math.round(operator(n1, n2) * 1000) / 1000;

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
      if (isRunningTotal) {
        displayTextEl.textContent = '';
        updateDisplay(this.innerHTML);
      } else {
        updateDisplay(this.innerHTML);
      }
    }
    // if an operator button is pressed
    else if (isOperator) {
      if (firstNum !== undefined) {
        displayTextEl.textContent = '';
        updateDisplay(operate(operator[currentOperator], firstNum, displayValue));

        firstNum = displayValue;
        currentOperator = this.innerHTML;
        isRunningTotal = true;
      } else {
        firstNum = displayValue;
        currentOperator = this.innerHTML;
        displayTextEl.textContent = '';
      }
    }
    // if the enter button is pressed
    else if (isEnter) {
      displayTextEl.textContent = '';
      updateDisplay(operate(operator[currentOperator], firstNum, displayValue));
      firstNum = undefined;
      isRunningTotal = true;
    }
  });
}
