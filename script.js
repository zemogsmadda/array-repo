'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Paul Gonzales',
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
//DISPLAYS THE WITHDRAWALS AND DEPOSITS

const displayMovements = function(movements, sort = false) {

  containerMovements.innerHTML = ``; //REMOVES THE CONTENT OF AN HTML VALUE

  const movs = sort ? movements.slice().sort((a, b) => a - b) : movements;

  movs.forEach(function(mov, i) {

    const type = mov > 0 ? `deposit` : `withdrawal`;

    const html = `
      <div class="movements__row">
        <div class="movements__type movements__type--${type}">${i + 1} ${type}</div>
        <div class="movements__value">${mov}€</div>
      </div>
    `;

    containerMovements.insertAdjacentHTML(`afterbegin`, html); //(POSITION WHERE YOU WANT TO BEGIN, STRING YOU WANT TO INSERT)
  });
}; 
 

/////////////////////////////////////////////////
//COMPUTING USERNAMES

const createUsernames = function (accs) {

  accs.forEach(function(acc){
    acc.username = acc.owner
    .toLowerCase()
    .split(` `)
    .map(name => name[0])
    .join(``);
  })

};
createUsernames(accounts);

const updateUI = function(acc) 
{
  //DISPLAY MOVEMENTS
  displayMovements(acc.movements);

  //DISPLAY BALANCE
  calcDisplayBalance(acc);

  //DISPLAY SUMMARY
  calcDisplaySummary(acc);
};

/////////////////////////////////////////////////
//PRINT THE BALANCE

const calcDisplayBalance = function(acc) {
  acc.balance = acc.movements.reduce((a, b)=> a +b);
  labelBalance.textContent = `${acc.balance}€`;
};

/////////////////////////////////////////////////
//CALCULATE WITHDRAWAL, DEPOSIT, AND INTEREST

const calcDisplaySummary = function(acc) {
  const incomes = acc.movements
    .filter(mov => mov > 0)
    .reduce((a , b) => a + b);
    labelSumIn.textContent = `${incomes}€`;

  const out = acc.movements
    .filter(mov => mov < 0)
    .reduce((a , b) => a + b);
    labelSumOut.textContent = `${Math.abs(out)}€`;

  const interest = acc.movements
    .filter(mov => mov > 0)
    .map(deposit => deposit * acc.interestRate/100)
    .filter((int, i, arr) => {
      return int >= 1;
    })
    .reduce((a, b) => a + b);
    labelSumInterest.textContent = `${interest}€`
}

/////////////////////////////////////////////////
//LOGIN INFO

let currentAccount;

btnLogin.addEventListener(`click`, function(e){
  //PREVENTS FORM FROM SUBMITTING
  e.preventDefault();

  currentAccount = accounts.find(acc => acc.username === inputLoginUsername.value);
  console.log(currentAccount);

  if (currentAccount?.pin === Number(inputLoginPin.value)) {
    //DISPLAY UI AND WELCOME MESSAGE
    labelWelcome.textContent = `Welcome back, ${currentAccount.owner.split( ` `)[0]}`;
    containerApp.style.opacity = 100;

    //CLEAR INPUT FIELDS
    inputLoginUsername.value = inputLoginPin.value =  ``;
    inputLoginPin.blur();
    updateUI(currentAccount);
  }
});

/////////////////////////////////////////////////
//TRANSFER

btnTransfer.addEventListener(`click`, function(e) {
  e.preventDefault();
  const amount = Number(inputTransferAmount.value);
  const receiverAcc = accounts.find(acc => acc.username === inputTransferTo.value);

  inputTransferAmount.value = inputTransferTo.value = ``;

  if(
    amount > 0 && 
    currentAccount.balance >= amount && 
    receiverAcc?.username !== currentAccount.username) 
    {
      //TRANSFER FUNCTIONALITY
      currentAccount.movements.push(-amount);
      receiverAcc.movements.push(amount);

      //UPDATE UI
      updateUI(currentAccount);
    } 
});

/////////////////////////////////////////////////
//LOAN 

btnLoan.addEventListener(`click`, function(e) {
  e.preventDefault();

  const amount = Number(inputLoanAmount.value);

  if(amount > 0 && currentAccount.movements.some(mov => mov >= amount * 0.1)) 
  {
    //ADD MOVEMENT
    currentAccount.movements.push(amount);

    //UPDATE UI
    updateUI(currentAccount);
  };

  inputLoanAmount.value = ``;  
})

/////////////////////////////////////////////////
//CLOSING AN ACCOUNT

btnClose.addEventListener(`click`, function(e) {
  e.preventDefault();


  if (inputCloseUsername.value === currentAccount.username &&
     Number(inputClosePin.value) === currentAccount.pin) 
    {
    const index = accounts
      .findIndex(acc => acc.username === currentAccount.username);

    console.log(index);

    //DELETE ACCOUNT
    accounts.splice(index, 1);

    //HIDE UI
    containerApp.style.opacity = 0;
    }
  
    inputCloseUsername.value = inputClosePin.value = ``;
})

/////////////////////////////////////////////////
//MOVEMENT SORTING

let sorted = false;

btnSort.addEventListener(`click`, function(e){
  e.preventDefault();
  displayMovements(currentAccount.movements, !sorted);
  sorted = !sorted;
})

 
//WHAT I WROTE
// const user = `Steven Thomas Williams`; //STW USERNAME
// const username = user.toLowerCase().split(` `);
// const initials = username.map(function(name){
//     const firstLetter = name.slice(0, 1);
//     return firstLetter;
// });
// const joined = initials.join(``);

// console.log(username);
// console.log(initials);
// console.log(joined);

//WHAT I SHOULDVE WRITTEN
// const user = `Steven Thomas Williams`;
// const username = user
//   .toLowerCase()
//   .split(` `)
//   .map(name => name[0])
//   .join(``);
// console.log(username);

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
/*
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
*/

///////////////////////////////////////
// Coding Challenge #1

/* 
Julia and Kate are doing a study on dogs. So each of them asked 5 dog owners about 
their dog's age, and stored the data into an array (one array for each). For now, they 
are just interested in knowing whether a dog is an adult or a puppy. A dog is an adult 
if it is at least 3 years old, and it's a puppy if it's less than 3 years old.

Create a function 'checkDogs', which accepts 2 arrays of dog's ages ('dogsJulia' and 'dogsKate'),
and does the following things:

1. Julia found out that the owners of the FIRST and the LAST TWO dogs actually have cats,
    not dogs! So create a shallow copy of Julia's array, and remove the cat ages from that 
    copied array (because it's a bad practice to mutate function parameters)

2. Create an array with both Julia's (corrected) and Kate's data

3. For each remaining dog, log to the console whether it's an adult ("Dog number 1 is an adult, and is 5 years old")
     or a puppy ("Dog number 2 is still a puppy 🐶")

4. Run the function for both test datasets

HINT: Use tools from all lectures in this section so far 😉

TEST DATA 1: Julia's data [3, 5, 2, 12, 7], Kate's data [4, 1, 15, 8, 3]
TEST DATA 2: Julia's data [9, 16, 6, 8, 3], Kate's data [10, 5, 6, 1, 4]

GOOD LUCK 😀
*/

// const julia = [3, 5, 2, 12, 7];
// const kate = [4, 1, 15, 8, 3];

// function checkDogs(dogsJulia, dogsKate) {
//   const julia = dogsJulia.slice(1, -2);
  
//   const allDogs = [...julia, ...dogsKate];
//   console.log(allDogs);

//   allDogs.forEach(function(value, key, _){
//     const howOld = value >= 3 ? `an adult` : `a puppy`;
//     console.log(`Dog number ${key + 1} is ${howOld}. Been in this world for ${value} years`);
//   });
// }
// checkDogs(julia, kate);

/////////////////////////////////////////////////
//MAP METHOD
//WILL GIVE US A NEW ARRAY
/*
//FUNCTIONAL PROGRAMMING
const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
const eurToUsd = 1.1;
const movementsUSD = movements.map(function(mov){
  return mov * eurToUsd;
});

console.log(movements);
console.log(movementsUSD);

//SAME THING AS ABOVE 
const movementsUSDfor = [];
for (const mov of movements) movementsUSDfor.push(mov * eurToUsd);
console.log(movementsUSDfor);

//ARROW FUNCTION VERSION
const arrowFunc = movements.map(mov => mov * eurToUsd);
console.log(arrowFunc);

const movementsDescription = movements.map((mov, i) => 
`Movement ${i + 1}: You ${mov > 0 ? `deposited` : `withdrew`} ${Math.abs(mov)}`);

  // if (mov > 0) {
  //   return `Movement ${i + 1}: You deposited ${mov}`;
  // } else {
  //   return `Movement ${i + 1}: You withdrew ${Math.abs(mov)}`
  // }

console.log(movementsDescription);
*/

/////////////////////////////////////////////////
//FILTER METHOD
/*
const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
const deposits = movements.filter(function(mov){
  return mov > 0;
})
console.log(deposits);
console.log(movements);

const depositsFor = [];
for (const mov of movements) if (mov > 0) depositsFor.push(mov);
console.log(depositsFor);

const withdrawals = movements.filter(function(mov){
  return mov < 0;
})
console.log(withdrawals);
*/

/////////////////////////////////////////////////
//REDUCE METHOD
/*
const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
// a - current value, b - number after a, c - index, d - source
const balance = movements.reduce(function(a, b, c, d){
  console.log( `Iteration ${c + 1}: ${a}`);
  return a + b;
}, 0)
console.log(balance);

//MAXIMUM VALUE 
const max = movements.reduce((acc, mov) => {
  if (acc > mov)
    return acc;
    else
      return mov;
}, movements[0]);
console.log(max);
*/

/////////////////////////////////////////////////
//CODING CHALLENGE 2

/* 
Let's go back to Julia and Kate's study about dogs. This time, they want to convert dog 
ages to human ages and calculate the average age of the dogs in their study.

Create a function 'calcAverageHumanAge', which accepts an arrays of dog's ages ('ages'), 
and does the following things in order:

1. Calculate the dog age in human years using the following formula: if the dog is <= 2 years old,
    humanAge = 2 * dogAge. If the dog is > 2 years old, humanAge = 16 + dogAge * 4.

2. Exclude all dogs that are less than 18 human years old (which is the same as keeping dogs that
    are at least 18 years old)

3. Calculate the average human age of all adult dogs (you should already know from other challenges
    how we calculate averages 😉)

4. Run the function for both test datasets

TEST DATA 1: [5, 2, 4, 1, 15, 8, 3]
TEST DATA 2: [16, 6, 10, 5, 6, 1, 4]

GOOD LUCK 😀
*/
/*
const dogAges = [5, 2, 4, 1, 15, 8, 3];

const calcAverageHumanAge = dogAges.map(function(dogAge){

  if (dogAge <= 2){
    return dogAge * 2;
  } else  {
    return 16 + dogAge * 4;
  }
});

console.log(calcAverageHumanAge);

const legalDogs = calcAverageHumanAge.filter(function(humanAge){
  return humanAge >= 18;
})

console.log(legalDogs);

const avgAges = legalDogs.reduce(function(a, b){
  return a + b;
})
console.log(avgAges / legalDogs.length);
*/

/////////////////////////////////////////////////
//CHAINING METHODS
/*
const eurToUsd = 1.1;
const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
const totals = movements
  .filter(mov => mov > 0)
  .map(mov => mov * eurToUsd)
  .reduce((a, b) => a + b);
console.log(totals);

/////////////////////////////////////////////////
//CODING CHALLENGE 3
*/
/* 
Rewrite the 'calcAverageHumanAge' function from the previous challenge, but this time as an arrow 
function, and using chaining!

TEST DATA 1: [5, 2, 4, 1, 15, 8, 3]
TEST DATA 2: [16, 6, 10, 5, 6, 1, 4]

GOOD LUCK 😀
*/
/*
const dogAges = [5, 2, 4, 1, 15, 8, 3];

const calcAverageHumanAge = dogAges
  .map(age => (age <= 2 ? 2 * age : 16 + age * 4))
  .filter(humanAge => humanAge >= 18)
  .reduce((a, b, c, d) => a + b / d.length, 0); //HAVE TO USE THE ORIGIN ARRAY NOT THE DOG AGES

console.log(calcAverageHumanAge);
*/

/////////////////////////////////////////////////
//FIND METHOD
//DIFFERENT FROM FILTER BASED ON TWO THINGS
  // 1. FILTER RETURNS EVERYTHING THAT SATISFIES THE CONDITION
  // 2. FILTER RETURNS AN ARRAY, FIND ONLY RETURNS THE ELEMENT
/*
const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
const test = movements.find(mov => mov < 0); //WILL LOG THE FIRST VALUE TO SATISFY THIS
console.log(test);

console.log(accounts);

const account = accounts.find(acc => acc.owner === `Jessica Davis`);
console.log(account); 
*/

///////////////////////////////////////
// FIND INDEX

//INCLUDED IN THE DELETE ACCOUNT FUNCTIONALITY ABOVE

/*
///////////////////////////////////////
// SOME AND EVERY

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
console.log(movements);

//CHECKS FOR EQUALITY
console.log(movements.includes(-130));

//CAN SPECIFY A CONDITION
const anyDeposits = movements.some(mov => mov > 5000)
console.log(anyDeposits);


//EVERY
//WILL RETURN TRUE IF ALL THE ELEMENTS IN THE ARRAY ARE TRUE
console.log(movements.every(mov => mov > 0));
console.log(account4.movements.every(mov => mov > 0));

//SEPARATE CALLBACK
//DRY
const deposit = mov => mov > 0;
console.log(movements.some(deposit));
console.log(movements.every(deposit));
console.log(movements.filter(deposit));
*/

///////////////////////////////////////
// FLAT AND FLATMAP
//FLAT
/*
const arr = [[1, 2, 3], [4, 5, 6], 7, 8];
console.log(arr.flat()); //WILL PRINT EVERYTHING IN ONE ARRAY BUT ONLY ONE 
                          //LAYER OF ARRAY DEEP FOR DEFAULT

const arrDeep = [[1, [2, 3]], [4, [5, 6]], 7, 8];
console.log(arrDeep.flat(2)); //CAN CHANGE THE DEPTH THAT THIS CAN OPERATE

const accountMovements = accounts.map(acc => acc.movements);
console.log(accountMovements);

const allMovements = accountMovements.flat();
console.log(allMovements);

const overallBalance = allMovements.reduce((a, b) => a + b);
console.log(overallBalance);
*/
//FLAT MAP 
//DOES THE MAPPING AND FLAT METHOD AT THE SAME TIME 

///////////////////////////////////////
// SORTING ARRAYS
/*
//STRINGS
const owners = [`Paul`, `Jonas`, `Adam`, `Martha`];
console.log(owners.sort()); //SORTED AND MUTATED THE OWNERS ARRAY INTO ALPHABETICAL ORDER

//NUMBERS
const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
console.log(movements);
//console.log(movements.sort()); //SORTING BASED ON STRINGS BY DEFAULT

//RETURN < 0, A, B (KEEP ORDER)
//RETURN > 0, B, A (SWITCH ORDER)
// movements.sort((a, b) => {
//   if (a > b)
//     return 1;
//   if (a < b)
//     return -1;
// });

movements.sort((a, b) => a - b); //ASCENDING
movements.sort((a, b) => b - a); //DESCENDING

console.log(movements);
*/

///////////////////////////////////////
//MORE WAYS OF CREATING AND FILLING ARRAYS
/*
//TRADITIONAL ARRAY FILLING
const arr = [1, 2, 3, 4, 5, 6, 7];
console.log(new Array(1, 2, 3, 4, 5, 6, 7));

const x = new Array(7);
console.log(x); //OUTPUT CREATES AN ARRAY WITH 7 EMPTY ELEMENTS
                //7 IS THE LENGTH OF THE ARRAY

// x.fill(1);  //[1, 1, 1, 1, 1, 1, 1, 1]
x.fill(1, 3); //[EMPTY X 3, 1, 1, 1, 1]
console.log(x);   

arr.fill(23, 2, 6);
console.log(arr); // [1, 2, 23, 23, 23, 23, 7]

//ARRAY.FROM
const y = Array.from({length: 10}, () => 1);
console.log(y);

const z = Array.from({length: 7}, (_, i) => i + 1);
console.log(z);

labelBalance.addEventListener(`click`, function() {

  const movementsUI = Array.from(document.querySelectorAll(`.movements__value`), 
  el => Number(el.textContent.replace(`€`, ``))
  );
  console.log(movementsUI);

  //WILL HAVE TO DO SEPARATE MAPPING SEQUENCE SO ITS BETTER TO USE THE ONE ABOVE
  const movementsUI2 = [...document.querySelectorAll(`.movements__value`)];
  console.log(movementsUI2);
});
*/

///////////////////////////////////////
// Coding Challenge #4

/* 
Julia and Kate are still studying dogs, and this time they are studying if dogs are eating too much or too little.
Eating too much means the dog's current food portion is larger than the recommended portion, and eating too little is the opposite.
Eating an okay amount means the dog's current food portion is within a range 10% above and 10% below the recommended portion (see hint).

1. Loop over the array containing dog objects, and for each dog, calculate the recommended food portion and add it to the object as a new property.
    Do NOT create a new array, simply loop over the array. Forumla: recommendedFood = weight ** 0.75 * 28. 
    (The result is in grams of food, and the weight needs to be in kg)

2. Find Sarah's dog and log to the console whether it's eating too much or too little. HINT: Some dogs have multiple owners, so you first need to find Sarah
    in the owners array, and so this one is a bit tricky (on purpose) 🤓

3. Create an array containing all owners of dogs who eat too much ('ownersEatTooMuch') and an array with all owners of dogs who eat too little ('ownersEatTooLittle').

4. Log a string to the console for each array created in 3., like this: "Matilda and Alice and Bob's dogs eat too much!" and "Sarah and John and Michael's dogs eat too little!"

5. Log to the console whether there is any dog eating EXACTLY the amount of food that is recommended (just true or false)

6. Log to the console whether there is any dog eating an OKAY amount of food (just true or false)

7. Create an array containing the dogs that are eating an OKAY amount of food (try to reuse the condition used in 6.)

8. Create a shallow copy of the dogs array and sort it by recommended food portion in an ascending order (keep in mind that the portions are inside the array's objects)

HINT 1: Use many different tools to solve these challenges, you can use the summary lecture to choose between them 😉
HINT 2: Being within a range 10% above and below the recommended portion means: current > (recommended * 0.90) && current < (recommended * 1.10). Basically, the current portion should be between 90% and 110% of the recommended portion.

TEST DATA:
const dogs = [
  { weight: 22, curFood: 250, owners: ['Alice', 'Bob'] },
  { weight: 8, curFood: 200, owners: ['Matilda'] },
  { weight: 13, curFood: 275, owners: ['Sarah', 'John'] },
  { weight: 32, curFood: 340, owners: ['Michael'] }
];

GOOD LUCK 😀
*/

/*
//1
const dogs = [
  { weight: 22, curFood: 250, owners: ['Alice', 'Bob'] },
  { weight: 8, curFood: 200, owners: ['Matilda'] },
  { weight: 13, curFood: 275, owners: ['Sarah', 'John'] },
  { weight: 32, curFood: 340, owners: ['Michael'] }
];

dogs.forEach(function(value, key, map){

  const dogsRecommended = Math.floor(Number(Object.values(value)[0] ** 0.75 * 28));
  dogs[key].recommendedFood = dogsRecommended;  

});


//2
const dogSarah = dogs.find(function(dog, _, __){
  
  return dog.owners.includes(`Sarah`);

});

const curSarah = dogSarah.curFood;
const recSarah = dogSarah.recommendedFood;

if (curSarah > recSarah) {
  console.log(`Sarahs dog is eating too much`);
} else {
  console.log(`Sarahs dog is eating too little`);
}

//3
const ownersEatTooLittle = dogs
.filter(function(dogs) {
  return dogs.curFood < dogs.recommendedFood 
})
.map(function(dogs){
  return dogs.owners;
})
.flat();

const ownersEatTooMuch = dogs
.filter(function(dogs) {
  return dogs.curFood > dogs.recommendedFood 
})
.map(function(dogs){
  return dogs.owners;
})
.flat();

console.log(ownersEatTooLittle);
console.log(ownersEatTooMuch);

//4
const tooMuch = ownersEatTooMuch.join(` `);
console.log(`The owner's that feed too much are ${tooMuch}`);

const tooLittle = ownersEatTooLittle.join(` `);
console.log(`The owner's that feed too little are ${tooLittle}`);

//5 
const exactAmount = dogs
.map(function(dogs){
  return dogs;
})
.includes(function(dogs){
  return dogs.curFood === dogs.dogsRecommended;
})
console.log(exactAmount);

//6
const eatingOkay = dogs
.map(function(dogs){
  return dogs;
})
.some(function(dogs){
  return dogs.curFood > (dogs.recommendedFood * 0.90) && dogs.curFood < (dogs.recommendedFood * 1.10);
})
console.log(eatingOkay);

//7 FUCK THIS QUESTION

//8 
const dogsCopy = dogs
.slice()
.sort(function(a, b) {
  return a.recommendedFood - b.recommendedFood; //ASCENDING
  // return b.recommendedFood - a.recommendedFood; //DESCENDING
})
console.log(dogsCopy);
*/