import Pebble from './pebble';
import Background from './background';
import stage from './stage';
import _ from 'underscore';
import Rx from 'Rx';

export default class Game {
	constructor() {
		this.stage = stage;
		this.renderer = PIXI.autoDetectRenderer(1280, 800);
		document.body.appendChild(this.renderer.view);
		console.log(this.stage, this.renderer)
	}

	start() {
		this.createPebbles();
		this.createWaves();
		this.addMask();
		this.animate();

		Rx.config.useNativeEvents = true;
	}

	addMask() {
		var backgound = new Background();
	}

	createPebbles() {
		var container = new PIXI.DisplayObjectContainer();
		var positions = [{x: 200, y: 300},{x: 1000 , y: 350},{x: 600, y: 600}]
		var inputs = ['deviceorientation', 'keyup', 'mousemouve'];
		for(let i = 0; i < 3 ; i++){
			let events = Rx.Observable.fromEvent(window, inputs[i]).map(function (e) {
				return Math.abs(e.beta);
			}).filter(function (beta) {
				return beta > 4;
			}).throttle(40);
			container.addChild(new Pebble(positions[i], events));
		}
		stage.addChild(container);
	}

	createWaves() {
		var container = new PIXI.DisplayObjectContainer();
		stage.addChild(container);
	}

	animate() {
		this.inputs();
		this.update();
		this.render();
		requestAnimFrame(this.animate.bind(this));
	}

	inputs() {
		// window.addEventListener("deviceorientation", this.handleOrientation, true);
	}

	handleOrientation(event) {
		var absolute = event.absolute;
		var alpha    = event.alpha;
		var beta     = event.beta;
		var gamma    = event.gamma;
		//console.log(absolute, alpha, beta, gamma);
	}

	update() {
		// update positions
		//this.pebble.update()
	}

	render() {
		this.renderer.render(this.stage);
	}
}
