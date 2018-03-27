# cactpot-solver
#### A FFXIV Mini cactpot solver

## Example
```javascript
const CactpotSolver = require('cactpot-solver');

// Initiate a new instance of a cactpot-solver
// You can pass an object which will serve as the options
var solver = new CactpotSolver
({
   // Whether or not the statuses on rows and scratches update when a scratch is changed
   autoUpdating: true,

   // The default value a payout is set to. When its reset it will be reset to this value passed
   defaultPayout:
   {
      '6': 10000,
      '7': 36,
      '8': 720,
      '9': 360,
      '10': 80,
      '11': 252,
      '12': 108,
      '13': 72,
      '14': 54,
      '15': 180,
      '16': 72,
      '17': 180,
      '18': 119,
      '19': 36,
      '20': 306,
      '21': 1080,
      '22': 144,
      '23': 1800,
      '24': 3600
   }
})

// solver.scratchValue(scratchID) Returns the scratch value
// solver.scratchValue(scratchID, newValue) Sets  the scratch value and returns it;
solver.scratchValue(0, 1);
solver.scratchValue(1, 1);
solver.scratchValue(2, 3);
solver.scratchValue(3, 4);

// solver.scratch(scratchID) Returns the instanced Scratch class
console.log(solver.scratch(1).problem); // => true;

solver.scratchValue(1, 2);
console.log(solver.scratch(1).problem); // => false;
console.log(solver.scratch(1).best); // => true;
console.log(solver.row('012').best); // => true;

console.log(solver.payout(6).value); // => 10000;
console.log(solver.payoutValue(6)); // => 10000;
console.log(solver.payoutValue(6, 2)); // => 2;
console.log(solver.payoutValue(6)); // => 2;
```

```javascript
const CactpotSolver = require('cactpot-solver');
var solver = new CactpotSolver();
```

## CactpotSolver Methods
```javascript
const CactpotSolver = require('cactpot-solver');
var solver = new CactpotSolver();

//Methods

solver.payouts() // Returns a Map of the Payouts
solver.payout(id) // Returns a Payout;
solver.payoutValue(id, value) // Returns the value of that Payout. If a value you is passed then it sets that Payout's value.

solver.scratches() // Returns a Map of the Scratches
solver.scratch(id) // Returns a Scratch;
solver.scratchValue(id, value) // Returns the value of that Scratch. If a value you is passed then it sets that Scratch's value.

solver.rows() // Returns a Map of the rows
solver.row(id) // Returns a Row

solver.update() // Used if you have the autoUpdating set to false

solver.reset() // Used to reset the scratches and payouts to their default value;
solver.resetScratches() // Used to reset the scratches to 0;
solver.resetPayouts() // Used to reset the payouts to their deafult value;
```

## Scratch Properties
```javascript
const CactpotSolver = require('cactpot-solver');
var solver = new CactpotSolver();
var scratch = solver.scratch(0);

scratch.value // The value the Scratch is set to. [0-9] are valid values. 0 = unset
scratch.best // If the scrtach is best. Best is true if there are 4 scratches set and the Scratch is apart of the Best row.
scratch.optimal // If the Scratch is optimal. Optimal is true if there isn't enough set scratches to determin the best. So based off of what we know the Scratches with the best potential have optimal set to true.
scratch.problem // If the scratch is a problem. Problems can be if there are duplicate values on different Scratches, or if there are too many values set.

//     Scratch IDs
//
//
//     ╔═══╦═══╦═══╗
//     ║ 0 ║ 1 ║ 2 ║
//     ╠═══╬═══╬═══╣
//     ║ 3 ║ 4 ║ 5 ║
//     ╠═══╬═══╬═══╣
//     ║ 6 ║ 7 ║ 8 ║
//     ╚═══╩═══╩═══╝
```

## Row Properties
```javascript
const CactpotSolver = require('cactpot-solver');
var solver = new CactpotSolver();
var row = solver.row('a'); //or row = solver.row('678'); 

row.x // ScratchID of the first in the row
row.y // ScratchID of the second in the row
row.z // ScratchID of the third in the row
row.mean // The mean of the possibilities
row.low // The lowest number of the possibilities
row.high // the highest number of the possibilities
row.possibilities // An array of the the possible outcomes for that row
row.best // If the row is the best. The best is true when 4 Scratches are set and the row has the highest mean of all the rows;

//     Row IDs
//
//  d    e   f   g    h 
//     ╔═══╦═══╦═══╗
//  c  ║   ║   ║   ║
//     ╠═══╬═══╬═══╣
//  b  ║   ║   ║   ║
//     ╠═══╬═══╬═══╣
//  a  ║   ║   ║   ║
//     ╚═══╩═══╩═══╝
//
// 048  036 147 258  246
//     ╔═══╦═══╦═══╗
// 012 ║   ║   ║   ║
//     ╠═══╬═══╬═══╣
// 345 ║   ║   ║   ║
//     ╠═══╬═══╬═══╣
// 678 ║   ║   ║   ║
//     ╚═══╩═══╩═══╝
```

## Payout Properties
```javascript
const CactpotSolver = require('cactpot-solver');
var solver = new CactpotSolver();
var payout = solver.payout(6);

payout.value // The value of the payout
payout.default // The default of this payouts value. When the payout is reset its value becomes the default
```
