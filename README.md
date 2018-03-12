# cactpot-solver
A FFXIV Mini cactpot solver

## Usage

```javascript
const cactpot = new require('cactpot-solver');

cactpot.scratches.get(0).value = 1;
cactpot.scratches.get(1).value = 2;
cactpot.scratches.get(2).value = 3;

cactpot.update();
```

## Layout

The id for the scratches when using ``cactpot.scratches.get(id)``
```
                    
    ╔═══╦═══╦═══╗
    ║ 0 ║ 1 ║ 2 ║
    ╠═══╬═══╬═══╣
    ║ 3 ║ 4 ║ 5 ║
    ╠═══╬═══╬═══╣
    ║ 6 ║ 7 ║ 8 ║
    ╚═══╩═══╩═══╝
```
The id for the rows when using ``cactpot.rows.get(id)``
```
048  036 147 258 246
    ╔═══╦═══╦═══╗
012 ║   ║   ║   ║
    ╠═══╬═══╬═══╣
345 ║   ║   ║   ║
    ╠═══╬═══╬═══╣
678 ║   ║   ║   ║
    ╚═══╩═══╩═══╝
```