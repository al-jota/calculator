//get elements
const display = document.getElementById('display')

const diceButton = document.getElementById('dice');
const equationInput = document.getElementById('equations');
const submitButton = document.getElementById('equals');

const buttons = document.querySelectorAll('.buttons button')



//add event listeners
buttons.forEach(button => {
  button.addEventListener('click', () => {
    if (button.textContent === '=') {
      calculate();
    } else if (button.textContent === 'C') {
      clearDisplay();
    } else {
      appendToDisplay(button.textContent);
    }
  });
});

//functions
function appendToDisplay(value) {
  display.value += value;
}

function clearDisplay() {
  display.value = "";
  equations.value = "";
  clearTimeout(timerId);
  clearTimeout(tryAgainId);
  clearTimeout(resetId);
  clearInterval(equationInputBorder);
  display.classList.remove('incorrect-border', 'correct-border',);
  equationInput.classList.remove('equation-border');
  const countdownSize = '25px';
  diceButton.style.fontSize = countdownSize
  diceButton.textContent = "Roll the Dice!";
}

function calculate() {

  const result = eval(display.value);
  display.value = result;

  display.classList.remove('incorrect-border', 'correct-border');
  equationInput.classList.remove('equation-border');
}



//----------------------------------------------

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// function generateEquation() {
//   const num1 = getRandomInt(1, 12);
//   const num2 = getRandomInt(1, 12);
//   const operator = ['+', '-', '*', '/'][getRandomInt(0, 3)];

//   return `${num1} ${operator} ${num2}`;
// }

function generateEquation() {
  let num1, num2, operator, equation;

  do {
    num1 = getRandomInt(1, 12);
    num2 = getRandomInt(1, 12);
    operator = ['+', '-', '*', '/'][getRandomInt(0, 3)];

    switch (operator) {
      case '+':
        equation = `${num1} ${operator} ${num2}`;
        break;
      case '-':
        if (!(num2 > num1)) {
        equation = `${num1} ${operator} ${num2}`;
        }
        break;
      case '*':
        equation = `${num1} ${operator} ${num2}`;
        break;
      case '/':
        if (num2 !== 0 && num1 % num2 === 0) {
          equation = `${num1} ${operator} ${num2}`;
        }
        break;
      default:
        break;
    }
  } while (typeof equation === 'undefined');

  return equation;
}


function checkAnswer(userAnswer, correctAnswer) {
  return userAnswer === correctAnswer;
}


let timerId, tryAgainId, resetId, equationInputBorder;

function startGame() {

  clearInterval(timerId);
  clearTimeout(tryAgainId);
  clearTimeout(resetId);
  clearInterval(equationInputBorder);
  display.classList.remove('incorrect-border', 'correct-border',);

  display.value = '';
  const equationInput = document.getElementById('equations');
  equationInput.value = ""; 

  equationInputBorder = setInterval(() => {
    equationInput.classList.add('equation-border');
  }, 0);
  
  
  const equation = generateEquation();
  equationInput.value = equation;

  const diceButton = document.getElementById('dice');
  const countdownSize = '45px';

  const countdown = ["⚀", "⚁", "⚂", "⚃", "⚄", "⚅"];
  diceButton.textContent = countdown.join('');

  diceButton.style.fontSize = countdownSize;

 let currentIndex = countdown.length - 1;
 timerId = setInterval(() => {
  if(currentIndex >= 0) {
    countdown[currentIndex] = '';
    diceButton.textContent = countdown.join('');
    currentIndex--;
  } else {
    clearInterval(timerId);
    diceButton.textContent = '';
    equationInput.classList.remove('equation-border');
  }
  }, 2000);



    tryAgainId = setTimeout(() => {
      const countdownSize = '25px';
      diceButton.style.fontSize = countdownSize;
      diceButton.textContent = "Try again.";
    }, 12000);

    resetId = setTimeout(() => {
      clearDisplay();
      document.getElementById('dice');
      clearInterval(equationInputBorder);
      equationInput.classList.remove('equation-border');
    }, 14000);

  
  const submitButton = document.getElementById('equals');

  const submitEventHandler = function() {
    clearTimeout(timerId);
    clearTimeout(tryAgainId);
    clearTimeout(resetId);
    const userAnswer = parseFloat(display.value);
    const correctAnswer = eval(equationInput.value);

    if (checkAnswer(userAnswer, correctAnswer)) {
      display.classList.add('correct-border');
      display.classList.remove('incorrect-border');
    } else {
      display.classList.add('incorrect-border');
      display.classList.remove('correct-border');
    }
   
    submitButton.removeEventListener('click', submitEventHandler);
  };
  submitButton.addEventListener('click', submitEventHandler);
}


const startButton = document.getElementById('dice');
startButton.addEventListener('click', startGame);


//--------------------working code below-------------------------

// //get elements
// const display = document.getElementById('display')

// const diceButton = document.getElementById('dice');
// const equationInput = document.getElementById('equations');
// const submitButton = document.getElementById('equals');

// const buttons = document.querySelectorAll('.buttons button')



// //add event listeners
// buttons.forEach(button => {
//   button.addEventListener('click', () => {
//     if (button.textContent === '=') {
//       calculate();
//     } else if (button.textContent === 'C') {
//       clearDisplay();
//     } else {
//       appendToDisplay(button.textContent);
//     }
//   });
// });

// //functions
// function appendToDisplay(value) {
//   display.value += value;
// }

// function clearDisplay() {
//   display.value = "";
//   equations.value = "";
//   clearTimeout(timerId);
//   display.classList.remove('incorrect-border', 'correct-border');
//   diceButton.textContent = "Roll the Dice!";
// }

// function calculate() {

//   const result = eval(display.value);
//   display.value = result;

//   display.classList.remove('incorrect-border');
//   display.classList.remove('correct-border');

// }



// //----------------------------------------------

// // const diceButton = document.getElementById('dice');
// // const equationInput = document.getElementById('equations');
// // const submitButton = document.getElementById('equals');

// function getRandomInt(min, max) {
//   return Math.floor(Math.random() * (max - min + 1)) + min;
// }

// function generateEquation() {
//   const num1 = getRandomInt(1, 12);
//   const num2 = getRandomInt(1, 12);
//   const operator = ['+', '-', '*', '/'][getRandomInt(0, 3)];

//   return `${num1} ${operator} ${num2}`;
// }

// function checkAnswer(userAnswer, correctAnswer) {
//   return userAnswer === correctAnswer;
// }


// let timerId;

// function startGame() {
//   display.value = '';
//   // display.classList.remove('incorrect-border');
//   // display.classList.remove('correct-border');

//   const equationInput = document.getElementById('equations');

//   equationInput.value = "";  
  
//   const equation = generateEquation();
//   equationInput.value = equation;


//   const countdown = ["⚀", "⚁", "⚂", "⚃", "⚄", "⚅"];
//   diceButton.textContent = countdown.join('');

//  let currentIndex = countdown.length - 1;
//  timerId = setInterval(() => {
//   if(currentIndex >= 0) {
//     countdown[currentIndex] = '';
//     diceButton.textContent = countdown.join('');
//     currentIndex--;
//   } else {
//     clearInterval(timerId);
//     diceButton.textContent = '';
//   }
//   }, 2000);



//     tryAgainId = setTimeout(() => {
//       diceButton.textContent = "Try again.";
//     }, 12000);

//     resetId = setTimeout(() => {
//       clearDisplay();
//       document.getElementById('dice');
//     }, 14000);

  
//   const submitButton = document.getElementById('equals');
//   submitButton.addEventListener('click', function() {
//     clearTimeout(timerId);
//     clearTimeout(tryAgainId);
//     clearTimeout(resetId);
//     const userAnswer = parseFloat(display.value);
//     const correctAnswer = eval(equationInput.value);

//     if (checkAnswer(userAnswer, correctAnswer)) {
//       display.classList.add('correct-border');
//       display.classList.remove('incorrect-border');
//     } else {
//       display.classList.add('incorrect-border');
//       display.classList.remove('correct-border');
//     }
    
//   });
// }


// const startButton = document.getElementById('dice');
// startButton.addEventListener('click', startGame);