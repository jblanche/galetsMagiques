import stage from './stage';

var bgTexture = PIXI.Texture.fromImage("/images/bg2.png");

export default class Background extends PIXI.Sprite{
	constructor() {
		super(bgTexture);

		this.position.x = 0;
		this.position.y = 0;
		stage.addChild(this);
	}

}
