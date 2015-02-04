import stage from './stage';
import Wave from './wave';
import Mediator from './mediator';
import _ from 'underscore';

var DEFAULTS = {
	w: 140,
	h: 100
}

export default class Pebble extends PIXI.Graphics{
	constructor(options, input) {
		super();
		this._pos = _.extend({}, DEFAULTS, options);
		this.waves = [];

		this.beginFill(0x333333);
		this.drawEllipse(this._pos.x, this._pos.y, this._pos.w, this._pos.h);
		Mediator.on('input::'+input, (beta) => {
			this.addWave()
		})
	}

	addWave() {
		Mediator.emit('pebble', _.clone(this._pos));
	}
}
