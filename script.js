//global state & node references
let screenData = '';
let rawResult = lastCalculation = lastBtnPress = null;
let decimalAdded = false;
let lastOperator = lastOperand = currentOperand = null;
const screen = document.querySelector('.screen');

//odin wanted specific functions, I guess to learn about objects? this object will be used to take 2 numbers and an operator, then calculate and return the new value
let calculationHandle = {
	add: (num1,num2)=> {
		return num1 + num2;
	},
	subtract: (num1,num2)=> {
		return num1 - num2;
	},
	multiply: (num1,num2)=> {
		return num1 * num2;
	},
	divide: (num1,num2)=> {
		return num1 / num2;
	},
  //choose which calculation to do, and coerce strings to numbers
	operate: function (num1,oper,num2) { //regular function so 'this' context is the calculationHandle object 
		switch (oper) {
			case '+':
				return this.add(+num1,+num2);
			case '-':
				return this.subtract(+num1,+num2);
			case '*':
				return this.multiply(+num1,+num2);
			case '/':
				return this.divide(+num1,+num2);
		}
	},
}

//display update logic: fully replace data and store the new state. 
const updateScreen = newData=> {
  screen.textContent = newData;
  screenData = newData;
}

//button handling logic. store numbers until an operator or equal button is pressed, then use calculationHandle object.
document.querySelector('.frame').addEventListener('click',e=>{
  e.stopPropagation();
  const pressedBtn = e.target.dataset.id; // ac,=,+,-,/,*,0-9 string
  //send digit presses to screen
  switch (pressedBtn){
    case'ac': //full calculator reset
      updateScreen('');
      rawResult = 0;
      decimalAdded = false;
      lastOperator = lastOperand = currentOperand = lastCalculation = lastBtnPress = null;
      break;
    case'.':
      if ( '+-*/'.includes(lastBtnPress) ){
        break;
      }
      if (!decimalAdded){
        updateScreen(screenData+pressedBtn);
        decimalAdded = true;
      }
      break;
    case'0':case'1':case'2':case'3':case'4':case'5':case'6':case'7':case'8':case'9':
      if ( '+-*/'.includes(lastBtnPress) ){ //overwrite screen if a digit pressed right after an operator and set lastBtnPress correctly
        updateScreen(pressedBtn);
        decimalAdded = false;
        lastBtnPress = pressedBtn;
        break;
      }
      if ( '0123456789'.includes(lastBtnPress) ){ //allow adding digit to screen after another
        updateScreen(screenData+pressedBtn);
        lastBtnPress = pressedBtn;
        break;
      }
      if(lastCalculation){ //if there was a previous calculation, we need to clear it from the screen before adding the new number
        updateScreen('');
      }
      updateScreen(screenData+pressedBtn); //just add the new digit
      break;
    case'+':case'-':case'*':case'/':
      if ( '='.includes(lastBtnPress) ){
        lastCalculation = lastOperand = screen.textContent;
        lastOperator = lastBtnPress = pressedBtn;
        break;
      }
      if (!screenData){
        console.log('oper with no screen data');
        break;
      }
      //check wether to calculate, or just store the operator, last button press, and operand
      if (lastOperator){ //if there is a previous operator set, calculate lastOperand with currentOperand
        currentOperand = screen.textContent;
        rawResult = calculationHandle.operate(lastOperand,lastOperator,currentOperand);
        updateScreen( Number.isInteger(rawResult) ? rawResult : rawResult.toFixed(8) );
        lastCalculation = lastOperand = rawResult;
        lastOperator = lastBtnPress = pressedBtn;
        break;
      }
      lastOperator = lastBtnPress = pressedBtn;
      lastOperand = screenData;
      break;
    case'=':
      //use screen data as current operand
      currentOperand = screen.textContent;
      rawResult = calculationHandle.operate(lastOperand,lastOperator,currentOperand);
      updateScreen( Number.isInteger(rawResult) ? rawResult : rawResult.toFixed(8) );
      lastBtnPress = pressedBtn;
  }
  
})



