function CBoostTankAnim(iX, iY, oParentContainer) {

    var _oContainer;
    var _oDamageSprite;

    this.boostQ = function (iX, iY, oParentContainer) {

        _oContainer = new createjs.Container();
        _oContainer.x = iX;
        _oContainer.y = iY;
        oParentContainer.addChild(_oContainer);

        _oDamageSprite = createSprite(s_oSpriteSheetQBoostParticle, "start", 0, 0, 0, 0);
        _oContainer.addChild(_oDamageSprite);

    };
    this.boostH = function(iX, iY, oParentContainer){
        _oContainer = new createjs.Container();
        _oContainer.x = iX
        _oContainer.y = iY
        oParentContainer.addChild(_oContainer);

        _oDamageSprite = createSprite(s_oSpriteSheetHBoostParticle, "start", 0, 0, 0, 0);
        _oContainer.addChild(_oDamageSprite);
    }

    this.unload = function () {
        oParentContainer.removeChild(_oContainer);
    };

    this.play = function (iX, iY) {
        playSound("crash", 1, false);

        _oDamageSprite.x = iX;
        _oDamageSprite.y = iY;

        _oDamageSprite.gotoAndPlay("start");
    };
    this.setVisible = function (bool) {
        _oContainer.visible = bool
    }

}


