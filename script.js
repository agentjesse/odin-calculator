//global state & node references
const calcFrame = document.querySelector('.frame');

let calculator = {
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
  testStateVal: null,
	//string format '1+2' =turns into=> ['1','+','2']
  //regular function so 'this' context is the calculator object 
	operate: function (inputStr) {
    this.testStateVal = 'poop'
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
    
	}
}

console.log( calculator.operate('2*3') )
console.log( calculator.testStateVal )




