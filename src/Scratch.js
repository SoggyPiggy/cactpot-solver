module.exports = class Scratch
{
	constructor(value = 0)
	{
		this._value;
		this.optimal = false;
		this.problem = false;
		this.best = false;

		this.value = value;
	}

	get value()
	{
		return this._value;
	}
	set value(v)
	{
		let value = Math.round(Number(v));
		if (value < 0) this._value = 0;
		if (value > 9) this._value = 9;
		else this._value = value;
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