import stage from './stage';
import Mediator from './mediator';

export default class Wave extends PIXI.Graphics{
	constructor(options) {
		this.options = options;
		super();
	}

	update() {
		this.options.w++;
		this.options.h++;
		this.alpha -= 0.005;
	}

	render() {
		this.clear();
		this.lineStyle(1, 0xFFFFFF);
		this.drawEllipse(this.options.x, this.options.y, this.options.w, this.options.h);
	}
}

