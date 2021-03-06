const operationButtons = document.querySelectorAll('.operation-button');
const clearButton = document.querySelector('#clear-screen');
const calculateButton = document.querySelector('#calculate');
const inputField = document.querySelector('#calc-string');


operationButtons.forEach(button => button.addEventListener('click', (e) => {
  inputField.value += e.target.innerHTML;
}));

clearButton.addEventListener('click', () => {
  inputField.value = '';
});

calculateButton.addEventListener('click', () => {
  let string = calculator(inputField.value);
  if(string.search(/[()]+/) > -1) {
    alert('Please use proper formatting.');
  } else if(string.search(/[^-\d+.]+/) > -1) {
    alert('You fool, I cannot calculate something like that!');
  } else {
    inputField.value = string;
  }
});

function calculator(string) {
  let tempCalc;
  while(string.search(/[-+*/!()]/) > -1) {
    if(string.search(/\d+\(/) > -1) {
      string = string.replace(/(\d+)(\()/, '$1 * $2');
    } else if(string.search(/\(.*\)/) > -1) {
      tempCalc = (string.match(/\(([^()]*)\)/))[1];
      tempCalc = calculator(tempCalc);
      string = string.replace(/\(([^()]*)\)/, tempCalc);
    } else if(string.search(/\d+!/) > -1) {
      tempCalc = (string.match(/\d+!/))[0];
      tempCalc = operate(tempCalc);
      string = string.replace(/\d+!/, tempCalc);
    } else if(string.search(/-?\d+\.?\d*\s*[*/]\s*-?\d+\.?\d*/) > -1) {
      tempCalc = (string.match(/-?\d+\.?\d*\s*[*/]\s*-?\d+\.?\d*/))[0];
      tempCalc = operate(tempCalc);
      string = string.replace(/-?\d+\.?\d*\s*[*/]\s*-?\d+\.?\d*/, tempCalc);
    } else if(string.search(/-?\d+\.?\d*\s*[-+]\s*-?\d+\.?\d*/) > -1) {
      tempCalc = (string.match(/-?\d+\.?\d*\s*[-+]\s*-?\d+\.?\d*/))[0];
      tempCalc = operate(tempCalc);
      string = string.replace(/-?\d+\.?\d*\s*[-+]\s*-?\d+\.?\d*/, tempCalc);
    } else {
      break;
    }
  }
  if(parseFloat(string) % 1 === 0) {
    return string;
  } else {
    return string = (parseFloat(string)).toFixed(4);
}

function add(a,b) {
  return a + b;
}

function subtract(a,b) {
  return a - b;
}

function multiply(a,b) {
  return a * b;
}

function divide(a,b) {
  return a / b;
}

function factorial(a) {
  if(a == 0){
    return 1;
  } else if(a == 1) {
    return 1;
  } else {
    return a * factorial(a-1);
  }
}

function operate(string) {
  let opr = '';
  let num = [];
  if(string.indexOf('!') > -1){
    return factorial(parseInt(string.trim().slice(0, string.length - 1)));
  } else {
    string = string.replace(/\s*(-?\d+\.?\d*)\s*([-+*/])\s*(-?\d+\.?\d*)\s*/, '$1 $2 $3').split(' ');
    string.forEach(index => {
      if(isNaN(parseInt(index))){
        opr = index;
      } else {
        if(index.indexOf('.') > -1){
          num.push(parseFloat(index));
        } else {
          num.push(parseInt(index));
        }
      }
    });
    switch(opr) {
      case '+':
      return add(num[0], num[1]);
      case '-':
      return subtract(num[0], num[1]);
      case '*':
      return multiply(num[0], num[1]);
      case '/':
      return divide(num[0], num[1]);
      }
    }
  }
}