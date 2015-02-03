import stage from './stage';
import Wave from './wave';
import _ from 'underscore';

var DEFAULTS = {
	w: 140,
	h: 100
}

export default class Pebble extends PIXI.Graphics{
	constructor(options, plug) {
		super();
		this._pos = _.extend({}, DEFAULTS, options);
		this.waves = [];

		this.beginFill(0x333333);
		this.drawEllipse(this._pos.x, this._pos.y, this._pos.w, this._pos.h);

		plug.forEach( (beta) => {
			this.addWave()
			console.log(beta);
			if(beta < 6) {
				console.log('smallFish', beta);
				return;
			}
			if(beta < 8) {
				console.log('normalFish', beta);
				return;
			}
			else {
				console.log('bigFish', beta);
				return;
			}
		})
	}

	addWave() {
		console.log(this.waves.push);
		var wave = new Wave(_.clone(this._pos));
		this.waves.push(wave);
	}
}
