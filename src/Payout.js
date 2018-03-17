module.exports = class Payout
{
	constructor(value = 0)
	{
		this._value;
		this.value = value;
		this.default = value;
	}

	get value()
	{
		return this._value;
	}
	set value(v)
	{
		this._value = Number(v);
	}

	reset()
	{
		this.value = this.default;
	}
}