const Scratch = require('./Scratch');
const Row = require('./Row');
const Payout = require('./Payout');

class CactpotSolver
{
	constructor(options)
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
		this.payouts.set(6, new Payout(options.defaultPayout['6']));
		this.payouts.set(7, new Payout(options.defaultPayout['7']));
		this.payouts.set(8, new Payout(options.defaultPayout['8']));
		this.payouts.set(9, new Payout(options.defaultPayout['9']));
		this.payouts.set(10, new Payout(options.defaultPayout['10']));
		this.payouts.set(11, new Payout(options.defaultPayout['11']));
		this.payouts.set(12, new Payout(options.defaultPayout['12']));
		this.payouts.set(13, new Payout(options.defaultPayout['13']));
		this.payouts.set(14, new Payout(options.defaultPayout['14']));
		this.payouts.set(15, new Payout(options.defaultPayout['15']));
		this.payouts.set(16, new Payout(options.defaultPayout['16']));
		this.payouts.set(17, new Payout(options.defaultPayout['17']));
		this.payouts.set(18, new Payout(options.defaultPayout['18']));
		this.payouts.set(19, new Payout(options.defaultPayout['19']));
		this.payouts.set(20, new Payout(options.defaultPayout['20']));
		this.payouts.set(21, new Payout(options.defaultPayout['21']));
		this.payouts.set(22, new Payout(options.defaultPayout['22']));
		this.payouts.set(23, new Payout(options.defaultPayout['23']));
		this.payouts.set(24, new Payout(options.defaultPayout['24']));

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
		for (let [key, payout] of this.payouts)
		{
			payout.reset();
		}
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
		let possibilities = [];
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
					let value = Number(this.payouts.get(x + y + z).value);
					total += value;
					if (value < low) low = value;
					if (value > high) high = value;
					possibilities.push(value);
				}
			}
		}
		possibilities = possibilities.sort(function (a, b) { return a - b; });
		return { mean: total / iteration, low, high, possibilities };
	}

	validateScratches()
	{
		let passed = true;
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
		}
		return passed
	}

	findOptimal()
	{
		let rawIDs = [];
		let optimal = -Infinity;
		let optimalIDs = [0, 2, 6, 8, 4];
		for (let [key, row] of this.rows)
		{
			if (row.mean >= optimal)
			{
				if (row.mean > optimal) rawIDs = [];
				rawIDs.push(row.x);
				rawIDs.push(row.y);
				rawIDs.push(row.z);
				optimal = row.mean;
			}
		}
		let scratchIDs = [];
		for (let v of rawIDs)
		{
			if (!scratchIDs.includes(v))
			{
				scratchIDs.push(v);
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
			else if (count >= 4) this.findBest();
			else this.findOptimal();
		}
	}
}
module.exports = CactpotSolver;