const Solver = require('./src/Solver');
module.exports = class
{
	constructor(options = {})
	{
		options = options || {};
		if (options.autoUpdate == null) options.autoUpdate = true;
		if (options.defaultPayout == null) options.defaultPayout = {};
		if (options.defaultPayout['6'] == null) options.defaultPayout['6'] = 10000;
		if (options.defaultPayout['7'] == null) options.defaultPayout['7'] = 36;
		if (options.defaultPayout['8'] == null) options.defaultPayout['8'] = 720;
		if (options.defaultPayout['9'] == null) options.defaultPayout['9'] = 360;
		if (options.defaultPayout['10'] == null) options.defaultPayout['10'] = 80;
		if (options.defaultPayout['11'] == null) options.defaultPayout['11'] = 252;
		if (options.defaultPayout['12'] == null) options.defaultPayout['12'] = 108;
		if (options.defaultPayout['13'] == null) options.defaultPayout['13'] = 72;
		if (options.defaultPayout['14'] == null) options.defaultPayout['14'] = 54;
		if (options.defaultPayout['15'] == null) options.defaultPayout['15'] = 180;
		if (options.defaultPayout['16'] == null) options.defaultPayout['16'] = 72;
		if (options.defaultPayout['17'] == null) options.defaultPayout['17'] = 180;
		if (options.defaultPayout['18'] == null) options.defaultPayout['18'] = 119;
		if (options.defaultPayout['19'] == null) options.defaultPayout['19'] = 36;
		if (options.defaultPayout['20'] == null) options.defaultPayout['20'] = 306;
		if (options.defaultPayout['21'] == null) options.defaultPayout['21'] = 1080;
		if (options.defaultPayout['22'] == null) options.defaultPayout['22'] = 144;
		if (options.defaultPayout['23'] == null) options.defaultPayout['23'] = 1800;
		if (options.defaultPayout['24'] == null) options.defaultPayout['24'] = 3600;
		this.options = options;

		this.solver = new Solver(options);
		if (this.options.autoUpdate) this.solver.update();
	}

	payoutValue(id, v)
	{
		let payout = this.payout(id);
		if (v !== undefined)
		{
			let value = Number(v);
			payout.value = value;
			if (this.options.autoUpdate) this.solver.update();
		}
		return payout.value;
	}
	payout(id)
	{
		let payoutID = Number(id);
		return this.solver.payouts.get(payoutID);
	}
	payouts()
	{
		return this.solver.payouts;
	}

	scratchValue(id, v)
	{
		let scratch = this.scratch(id);
		if (v !== undefined)
		{
			let value = Number(v);
			scratch.value = value;
			if (this.options.autoUpdate) this.solver.update();
		}
		return scratch.value;
	}
	scratch(id)
	{
		let scratchID = Number(id);
		return this.solver.scratches.get(scratchID);
	}
	scratches()
	{
		return this.solver.scratches;
	}

	row(id)
	{
		let rowID = id.toString().toLowerCase();
		switch(rowID)
		{
			case 'a': rowID = '678'; break;
			case 'b': rowID = '345'; break;
			case 'c': rowID = '012'; break;
			case 'd': rowID = '048'; break;
			case 'e': rowID = '036'; break;
			case 'f': rowID = '147'; break;
			case 'g': rowID = '258'; break;
			case 'h': rowID = '246'; break;
			default: break;
		}
		return this.solver.rows.get(rowID);
	}
	rows()
	{
		return this.solver.rows;
	}

	update()
	{
		this.solver.update();
	}

	reset()
	{
		this.solver.reset();
		if (this.options.autoUpdate) this.solver.update();
	}
}