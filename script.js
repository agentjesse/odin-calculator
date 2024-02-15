//global state & node references
const screen = document.querySelector('.screen');
let screenData = '';
let decimalAdded = false;

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
	//string format '1+2' =turns into=> ['1','+','2']
  //regular function so 'this' context is the calculationHandle object 
	operate: function (inputStr) {
		//isNaN(item) answers: "is the item NaN when used in a number context (coercion)"?
		//below checks if an item in the array coerces to NaN, and returns the item (i.e. the operator), or the coerced number.
		const [num1, oper, num2] = inputStr.split('').map( item=> isNaN(item) ? item : +item );
		switch (oper) {
			case '+':
				return this.add(num1,num2).toFixed(6);
			case '-':
				return this.subtract(num1,num2).toFixed(6);
			case '*':
				return this.multiply(num1,num2).toFixed(6);
			case '/':
				return this.divide(num1,num2).toFixed(6);
		}
	},
  //state variables. need to keep track of last calculation for display and processing.
  lastCalc: null,
}
console.log( `calculationHandle test: 2*3= `, calculationHandle.operate('2*3') ) //test with SINGLE INTEGERS and an operand

//display update logic: fully replace data annd store the state
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
    case '.':
      if (!decimalAdded){
        updateScreen(screenData+pressedBtn);
        decimalAdded = true;
      }
      break;
    case '0':case '1':case '2':case '3':case '4':case '5':case '6':case '7':case '8':case '9':
      updateScreen(screenData+pressedBtn);
  }
  
})



