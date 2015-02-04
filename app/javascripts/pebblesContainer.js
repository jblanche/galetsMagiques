import stage from './stage';
import Wave from './wave';
import Mediator from './mediator';
import _ from 'underscore';

class PebblesContainer extends PIXI.DisplayObjectContainer{
	constructor() {
		super();
		Mediator.on('pebble', (pos) => {
			this.addChild(new Wave(pos));
		});
	}

	update() {
		this.children.forEach((wave) => {
			wave.update();
			if(wave.alpha < 0){
				this.removeChild(wave);
			}
		});
	}

	render() {
		this.children.forEach( (wave) => {
			wave.render();
		});
	}
}

var pebblesContainer = new PebblesContainer();

export default pebblesContainer;
