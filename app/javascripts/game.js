import Pebble from './pebble';
import Background from './background';
import stage from './stage';
import _ from 'underscore';
import Rx from 'Rx';
import Mediator from './mediator';
import waveContainer from './waveContainer';

export default class Game {
	constructor() {
		this.stage = stage;
		this.renderer = PIXI.autoDetectRenderer(1280, 800);
		document.body.appendChild(this.renderer.view);
	}

	start() {
		this.createWaves();
		this.createPebbles();
		this.addMask();
		this.inputs();
		this.animate();

		Rx.config.useNativeEvents = true;
	}

	animate() {
		this.update();
		this.render();
		requestAnimFrame(this.animate.bind(this));
	}

	addMask() {
		var backgound = new Background();
	}

	createPebbles() {
		var container = new PIXI.DisplayObjectContainer();
		var positions = [{x: 200, y: 300},{x: 1000 , y: 350},{x: 600, y: 600}]
		for(let i = 0; i < 3 ; i++){
			container.addChild(new Pebble(positions[i], i));
		}
		stage.addChild(container);
	}

	createWaves() {
		stage.addChild(waveContainer);
	}

	inputs() {
		var inputs = ['deviceorientation', 'keyup', 'mousemove'];
		for(let i = 0; i < 3 ; i++){
			let events = Rx.Observable.fromEvent(window, inputs[i]).map(function (e) {
				return Math.abs(e.beta);
			}).filter(function (beta) {
				return beta > 4;
			}).debounce(100);

			events.forEach( (val) => {
				console.log('input::'+i);
				Mediator.emit('input::'+i, val);
			});
		}
	}

	update() {
		waveContainer.update()
	}

	render() {
		waveContainer.render();
		this.renderer.render(this.stage);
	}
}
