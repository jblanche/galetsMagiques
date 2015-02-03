import stage from './stage';

export default class Wave extends PIXI.Graphics{
	constructor(options) {
		this.options = options;
		super();
		stage.addChild(this);
		console.log('stage');
		this.animate();
	}

	animate() {
		this.update();
		this.render();
		requestAnimFrame(this.animate.bind(this));
	}

	update() {
		this.options.w++;
		this.options.h++;
	}

	render() {
		this.clear();
		this.lineStyle(1, 0xFF0000);
		this.drawEllipse(this.options.x, this.options.y, this.options.w, this.options.h);
	}
}
