class Scratch
{
	constructor(v = 0)
	{
		this.value = v;
		this.optimal = false;
		this.problem = false;
		this.best = false;
	}
	
	reset()
	{
		this.value = 0;
		this.resetStates();
	}

	resetStates()
	{
		this.optimal = false;
		this.problem = false;
		this.best = false;
	}
}

class Row
{
	constructor(x, y, z)
	{
		this.x = x;
		this.y = y;
		this.z = z;
		this.mean = 0;
		this.low = 0;
		this.high = 0;
		this.possibilites = [];
		this.best = false;
	}

	reset()
	{
		this.mean = 0;
		this.low = 0;
		this.high = 0;
		this.possibilites = [];
		this.resetStates();
	}

	resetStates()
	{
		this.best = false;
	}

	updateStats(stats)
	{
		this.mean = stats.mean;
		this.high = stats.high;
		this.low = stats.low;
		this.possibilites = stats.possibilites;
	}
}

class CactpotSolver
{
	constructor()
	{
		this.scratches = new Map();
		this.scratches.set(0, new Scratch());
		this.scratches.set(1, new Scratch());
		this.scratches.set(2, new Scratch());
		this.scratches.set(3, new Scratch());
		this.scratches.set(4, new Scratch());
		this.scratches.set(5, new Scratch());
		this.scratches.set(6, new Scratch());
		this.scratches.set(7, new Scratch());
		this.scratches.set(8, new Scratch());

		this.payouts = new Map();
		this.payouts.set(6, 10000);
		this.payouts.set(7, 36);
		this.payouts.set(8, 720);
		this.payouts.set(9, 360);
		this.payouts.set(10, 80);
		this.payouts.set(11, 252);
		this.payouts.set(12, 108);
		this.payouts.set(13, 72);
		this.payouts.set(14, 54);
		this.payouts.set(15, 180);
		this.payouts.set(16, 72);
		this.payouts.set(17, 180);
		this.payouts.set(18, 119);
		this.payouts.set(19, 36);
		this.payouts.set(20, 306);
		this.payouts.set(21, 1080);
		this.payouts.set(22, 144);
		this.payouts.set(23, 1800);
		this.payouts.set(24, 3600);

		this.rows = new Map();
		this.rows.set('012', new Row(0, 1, 2));
		this.rows.set('345', new Row(3, 4, 5));
		this.rows.set('678', new Row(6, 7, 8));
		this.rows.set('036', new Row(0, 3, 6));
		this.rows.set('147', new Row(1, 4, 7));
		this.rows.set('258', new Row(2, 5, 8));
		this.rows.set('048', new Row(0, 4, 8));
		this.rows.set('246', new Row(2, 4, 6));
	}

	reset()
	{
		this.resetScratches();
		this.resetPayouts();
		this.resetRows();
	}

	resetScratches()
	{
		for (let [key, scratch] of this.scratches)
		{
			scratch.reset();
		}
	}

	resetStates()
	{
		for (let [key, scratch] of this.scratches)
		{
			scratch.resetStates();
		}
		for (let [key, row] of this.rows)
		{
			row.resetStates();
		}
	}

	resetPayouts()
	{
		this.payouts.set(6, 10000);
		this.payouts.set(7, 36);
		this.payouts.set(8, 720);
		this.payouts.set(9, 360);
		this.payouts.set(10, 80);
		this.payouts.set(11, 252);
		this.payouts.set(12, 108);
		this.payouts.set(13, 72);
		this.payouts.set(14, 54);
		this.payouts.set(15, 180);
		this.payouts.set(16, 72);
		this.payouts.set(17, 180);
		this.payouts.set(18, 119);
		this.payouts.set(19, 36);
		this.payouts.set(20, 306);
		this.payouts.set(21, 1080);
		this.payouts.set(22, 144);
		this.payouts.set(23, 1800);
		this.payouts.set(24, 3600);
	}

	resetRows()
	{
		for (let [key, row] of this.rows)
		{
			row.reset();
		}
	}

	getKnownScratchIDs()
	{
		let known = [];
		for (let [key, scratch] of this.scratches)
		{
			if (scratch.value != 0)
			{
				known.push(key);
			}
		}
		return known;
	}

	getUsed()
	{
		let used = [];
		for (let [key, scratch] of this.scratches)
		{
			if (scratch.value != 0) used.push(scratch.value);
		}
		return used;
	}

	getUnused()
	{
		let unused = [1, 2, 3, 4, 5, 6, 7, 8, 9];
		let used = this.getUsed();
		for (let i = 0; i < unused.length; i++)
		{
			if (used.includes(unused[i]))
			{
				unused.splice(i, 1);
				i--;
			}
		}
		return unused;
	}

	getScratchValues(x)
	{
		let value = this.scratches.get(x).value;
		if (value == 0)
		{
			return this.getUnused();
		}
		return [value];
	}

	processRow(a, b, c)
	{
		let arrayX = this.getScratchValues(a);
		let arrayY = this.getScratchValues(b);
		let arrayZ = this.getScratchValues(c);
		let iteration = 0;
		let total = 0;
		let low = Infinity;
		let high = -Infinity;
		let possibilites = [];
		let combinations = [];
		for (let x of arrayX)
		{
			for (let y of arrayY)
			{
				for (let z of arrayZ)
				{
					if (x == y || x == z || y == z) continue;
					let combination = [x, y, z].sort() + '';
					if (combinations.includes(combination)) continue;
					combinations.push(combination);
					iteration++;
					let value = this.payouts.get(x + y + z);
					total += value;
					if (value < low) low = value;
					if (value > high) high = value;
					possibilites.push(value);
				}
			}
		}
		possibilites = possibilites.sort(function(a, b){return a - b;});
		return {mean: total / iteration, low, high, possibilites};
	}

	validateScratches()
	{
		let passed = true;
		let toomuch = false;
		if (this.getUsed().length > 4) toomuch = true;
		for (let [xKey, xItem] of this.scratches)
		{
			for (let [yKey, yValue] of this.scratches)
			{
				if (xKey == yKey) continue;
				if (xItem.value == 0 || yValue.value == 0) continue;
				if (xItem.value == yValue.value)
				{
					xItem.problem = true;
					xItem.problem = true;
					passed = false;
				}
			}
			if (xItem.value != 0 && toomuch)
			{
				xItem.problem = true;
				passed = false;
			}
		}
		return passed
	}

	findOptimal()
	{
		let scratchIDs = [];
		let optimal = -Infinity;
		let optimalIDs = [0, 2, 6, 8, 4];
		for (let [key, row] of this.rows)
		{
			if (row.mean >= optimal)
			{
				if (row.mean > optimal) scratchIDs = [];
				scratchIDs.push(row.x);
				scratchIDs.push(row.y);
				scratchIDs.push(row.z);
			}
		}
		let known = this.getKnownScratchIDs();
		for (let i = 0; i < scratchIDs.length; i++)
		{
			if (known.includes(scratchIDs[i]))
			{
				scratchIDs.splice(i, 1);
				i--;
			}
		}
		let hasOptimals = false;
		for (let v of scratchIDs)
		{
			if (optimalIDs.includes(v))
			{
				hasOptimals = true;
				break;
			}
		}
		if (hasOptimals)
		{
			for (let i = 0; i < scratchIDs.length; i++)
			{
				if (!optimalIDs.includes(scratchIDs[i]))
				{
					scratchIDs.splice(i, 1);
					i--;
				}
			}
	}
		for (let v of scratchIDs)
		{
			let scratch = this.scratches.get(v);
			scratch.optimal = true;
		}
	}

	findBest()
	{
		let rowIDs = [];
		let best = -Infinity;
		for (let [key, row] of this.rows)
		{
			if (row.mean > best)
			{
				rowIDs = [];
				rowIDs.push(key);
				best = row.mean;
			}
			else if (row.mean == best) rowIDs.push(key);
		}
		for (let v of rowIDs)
		{
			let row = this.rows.get(v);
			row.best = true;
			this.scratches.get(row.x).best = true;
			this.scratches.get(row.y).best = true;
			this.scratches.get(row.z).best = true;
		}
	}

	updateRows()
	{
		for (let [key, row] of this.rows)
		{
			let stats = this.processRow(row.x, row.y, row.z);
			row.updateStats(stats);
		}
	}

	update()
	{
		this.resetStates();
		if (this.validateScratches())
		{
			this.updateRows();
			let count = this.getUsed().length;
			if (count == 0) return;
			else if (count == 4) this.findBest();
			else this.findOptimal();
		}
	}
}
module.exports = CactpotSolver;