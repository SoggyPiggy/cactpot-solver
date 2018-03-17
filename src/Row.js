module.exports = class Row
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