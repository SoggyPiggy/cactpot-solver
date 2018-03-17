module.exports = class Scratch
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