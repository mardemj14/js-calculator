'use strict';

const displayTextEl = document.querySelector('.display-text');
let displayValue;

const add = (n1, n2) => n1 + n2;
const subtract = (n1, n2) => n1 - n2;
const divide = (n1, n2) => n1 / n2;
const multiply = (n1, n2) => n1 * n2;
const operate = (operator, n1, n2) => operator(n1, n2);
const buttons = document.querySelectorAll('.btn');

function updateDisplay(value) {
  displayTextEl.textContent += value.innerHTML;
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

    if (isNumber) {
      updateDisplay(this);
    }
  });
}
