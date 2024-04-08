function CElementAnimated(oData, iXOffset, iSegmentIndex, oParentContainer) {
    CElement.call(this, oData, iXOffset, iSegmentIndex, oParentContainer);
}

CElementAnimated.prototype = Object.create(CElement.prototype);

CElementAnimated.prototype._createElement = function () {
   
    this._aSprites = [];

    
    for (let i = 1; i <= 18; i++) {
        var oSprite = s_oSpriteLibrary.getSprite("coin" + i);
        if (oSprite) {
            this._aSprites.push(createBitmap(oSprite));
        }
    }

    
    this._oElement = this._aSprites[0];
    this._oElement.regX = this._oElement.getBounds().width / 2;
    this._oElement.regY = this._oElement.getBounds().height / 2;
    this._oElement.scaleX = this._oElement.scaleY = 0.07;
    // this._oElement.y = 100;

   
    this._oContainer.addChild(this._oElement);
    createjs.Ticker.loop = true
    createjs.Ticker.framerate = 60;
   
    createjs.Ticker.addEventListener("tick", this._tick.bind(this));
};


CElementAnimated.prototype._tick = function () {
    // Update the animation frame with a looping function
    const frameIndex = Math.floor(createjs.Ticker.getTicks() * 0.4) % this._aSprites.length;
    const newElement = this._aSprites[frameIndex];

    // Update only if a new frame is available
    if (newElement) {
        // Replace the current coin image
        this._oElement.image = newElement.image;
    }
};


