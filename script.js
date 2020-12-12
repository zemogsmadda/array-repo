'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES


// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

/////////////////////////////////////////////////
/*
let arr = [`a`, `b`, `c`, `d`, `e`];

//SLICE
//DOES NOT MUTATE THE ARRAY 
console.log(arr.slice(2)); // (3) [C, D, E]
console.log(arr.slice(2, 4)); // (2) [C, D]
console.log(arr.slice(-2)); // (2) [D, E]
console.log(arr.slice(-1)); // (1) [E]
console.log(arr.slice(1, -2)); // (2) [B, C]

console.log(arr.slice()); //WILL PRINT THE ARRAY 
console.log([...arr]); //PERSONAL PREFERENCE IF YOU WANT TO USE THIS OR ABOVE

//SPLICE
//MUTATES THE ARRAY 
arr.splice(-1);
arr.splice(1, 2);
console.log(arr); //ELEMENTS ARE DELETED. OUTPUT = [A, D]

//REVERSE
//MUTATES THE ARRAY 
arr = [`a`, `b`, `c`, `d`, `e`];
const arr2 = [`j`, `i`, `h`, `g`, `f`];
console.log(arr2.reverse()); //COMMON SENSE DUH
console.log(arr2);

//CONCAT 
//PUTS ARRAYS TOGETHER
const letters = arr.concat(arr2);
console.log(letters);
console.log(...arr, ...arr2);

//JOIN
console.log(letters.join(` - `)); //a - b - c - d - e - f - g - h - i - j
*/

/*
//FOR OF
// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
//   for (const move of movements) {
//     if (move > 0) {
//       console.log(`you deposited ${move}`);
//     } else {
//       console.log(`you withdrew ${Math.abs(move)}`);
//     }
// }

//FOR OF INDEXING
const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
  for (const [i, move] of movements.entries()) {
    if (move > 0) {
      console.log(`Movement: ${i + 1} you deposited ${move}`);
    } else {
      console.log(`Movement: ${i + 1} you withdrew ${Math.abs(move)}`);
    }
}

console.log(`------- FOR EACH -------`)

//FOR EACH
// movements.forEach(function(move){
//     if (move > 0) {
//       console.log(`you deposited ${move}`);
//     } else {
//       console.log(`you withdrew ${Math.abs(move)}`);
//     }
// });

//FOR EACH INDEXING 
//CANNOT BREAK OUT OF A FOR EACH LOOP
//WILL RUN THROUGH THE WHOLE ARRAY
movements.forEach(function(move, i, arr){
  if (move > 0) {
    console.log(`Movement: ${i + 1} you deposited ${move}`);
  } else {
    console.log(`Movement: ${i + 1} you withdrew ${Math.abs(move)}`);
  }
});
*/

//MAP
const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);

currencies.forEach(function(value, key, map) {
  console.log(`${key}: ${value}`);
});

//SET
const currenciesUnique = new Set([`USD`, `GBP`, `USD`, `EUR`, `EUR`]);
console.log(currenciesUnique);
// currenciesUnique.forEach(function(value, key, map) {
currenciesUnique.forEach(function(value, _, map) { //USE THROW AWAY VALUE INSTEAD
  console.log(`${value}: ${value}`); //IN SETS, THERE ARE NO KEYS SO THE KEY WOULD EQUAL VALUE
});


