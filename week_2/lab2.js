//Exercise 1: 
console.log('~~~~~~~~~~~Exercise 1~~~~~~~~~~~'); 
const greeter = (myArray, counter) => {
    let greetText = 'Hello ';
    for (let i = 0; i < myArray.length; i++) {
        console.log(greetText + myArray[i]);
    }
}

greeter(['Randy Savage', 'Ric Flair', 'Hulk Hogan'], 3);

//Exercise 2:
console.log('~~~~~~~~~~~Exercise 2~~~~~~~~~~~');
const capitalize = (str) => {
    const [first, ...rest] = str;
    console.log(first.toUpperCase() + rest.join(''));
}

console.log(capitalize('fooBar'));
console.log(capitalize('nodeJs'));

//Exercise 3:
console.log('~~~~~~~~~~~Exercise 3~~~~~~~~~~~');
const colors = ['red', 'green', 'blue'];
const capitalizedColors = colors.map(color => capitalize(color));

console.log(capitalizedColors);

//Exercise 4:
console.log('~~~~~~~~~~~Exercise 4~~~~~~~~~~~');
const values = [1, 60, 34, 30, 20, 5];
const filterLessThanTwenty = values.filter(value => value < 20);

console.log(filterLessThanTwenty);

//Exercise 5:
console.log('~~~~~~~~~~~Exercise 5~~~~~~~~~~~');
var array = [1, 2, 3, 4];
const calculateSum = array.reduce((a, b) => a + b, 0);
const calculateProduct = array.reduce((a, b) => a * b, 1);

console.log(calculateSum);
console.log(calculateProduct);

//Exercise 6:
console.log('~~~~~~~~~~~Exercise 6~~~~~~~~~~~');
class Car {
    constructor(model, year) {
      this.model = model;
      this.year = year;
    }
  
    details() {
      return `Model: ${this.model} Engine ${this.year}`;
    }
  }
  
  class Sedan extends Car {
    constructor(model, year, balance) {
      super(model, year);
      this.balance = balance;
    }
  
    info() {
      return `${this.model} has a balance of $${this.balance.toFixed(2)}`;
    }
  }
  
  const car2 = new Car('Pontiac Firebird', 1976);
  console.log(car2.details());
  
  const sedan = new Sedan('Volvo SD', 2018, 30000);
  console.log(sedan.info());