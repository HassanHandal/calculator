const toggleElement = document.querySelector('.themes__toggle');
const toggleDarkTheme = () => { toggleElement.classList.toggle('themes__toggle--isActive'); };
const toggleDarkThemeWithEnter = (event) => (event.key === 'Enter') && toggleDarkTheme();
toggleElement.addEventListener('keydown', toggleDarkThemeWithEnter);
toggleElement.addEventListener('click', toggleDarkTheme);
let storedNumber = '';
let currentNumber = '';
let operation = '';
const resultElement = document.querySelector('.calc__result');
const updateScreen = (value) => {
  if (value.length < 18) { resultElement.innerText = !value ? '0' : value; } else {
    alert('screen has no space');
  }
};
const keyElements = document.querySelectorAll('[data-type]');

const numberButtonHandler = (value) => {
  if (value === '.' && currentNumber.includes('.')) return;
  if (value === '0' && currentNumber === '0') return;
  currentNumber += value;
  updateScreen(currentNumber);
};

const resetButtonHandler = () => {
  storedNumber = '';
  currentNumber = '';
  operation = '';
  updateScreen(currentNumber);
};

const deleteButtonHandler = () => {
  if (!currentNumber || currentNumber === '0') return;

  if (currentNumber.length === 1) {
    currentNumber = '';
  } else { currentNumber = currentNumber.substring(0, currentNumber.length - 1); }
  updateScreen(currentNumber);
};
const sum = () => { currentNumber = Number(currentNumber) + Number(storedNumber); };
const minus = () => { currentNumber = Number(currentNumber) - Number(storedNumber); };
const multiple = () => { currentNumber = Number(currentNumber) * Number(storedNumber); };
const divide = () => { currentNumber = Number(currentNumber) / Number(storedNumber); };
const excuteOperation = () => {
  if (currentNumber && operation && storedNumber) {
    if (operation === '+') {
      sum();
    }
    if (operation === '-') {
      minus();
    }
    if (operation === '/') {
      divide();
    }
    if (operation === '*') {
      multiple();
    }
  }
  currentNumber = String(currentNumber);
  updateScreen(currentNumber);
  storedNumber = '';
};

const operationButtonHandler = (x) => {
  if ((!currentNumber && !storedNumber)) return;
  if ((!storedNumber && currentNumber) || (currentNumber && storedNumber)) {
    storedNumber = currentNumber;

    updateScreen(currentNumber);
    currentNumber = '';
    operation = x.dataset.value;
  }
};

const keyElementHandler = (element) => {
  element.addEventListener('click', () => {
    if (element.dataset.type === 'number') {
      numberButtonHandler(element.dataset.value);
    } else if (element.dataset.type === 'operation') {
      switch (element.dataset.value) {
        case 'c':
          resetButtonHandler();
          break;
        case 'Backspace':
          deleteButtonHandler();
          break;
        case 'Enter':
          excuteOperation();
          break;
        default:
          operationButtonHandler(element);
      }
    }
  });
};
keyElements.forEach(keyElementHandler);
// keyboard hover //
const availableNUmbers = ['0', '1', '2', '3', '4', '5', '6', '7', '8'];
const availableOperations = ['+', '-', '*', '/'];
const availableKeys = [...availableNUmbers, ...availableOperations, 'Backspace', 'Enter', 'c'];

const keyboardWithHover = (key) => {
  if (availableKeys.includes(key)) {
    const ele = document.querySelector(`[data-value='${key}']`);
    ele.classList.add('hover');
    ele.click();
    setTimeout(() => ele.classList.remove('hover'), 100);
  }
};
window.addEventListener('keydown', (event) => {
  keyboardWithHover(event.key);
});
