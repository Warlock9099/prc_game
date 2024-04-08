function CCoinIndicator(iX, iY, oParentContainer) {
    var _oContainer;
    var _oText;
    var _oCoinCountText;
    var _pStartPos;

    this._init = function () {
        _pStartPos = { x: iX, y: iY };

        _oContainer = new createjs.Container();
        _oContainer.x = iX;
        _oContainer.y = iY;
        oParentContainer.addChild(_oContainer);

        var oSpritf = s_oSpriteLibrary.getSprite('star_coin');
        var oBgX = createBitmap(oSpritf);
        oBgX.regX = 150;
        oBgX.regY = -60
        _oContainer.addChild(oBgX);


        var iWidth = 70;
        var iHeight = 70;
        var iTextX = -60;
        var iTextY = 90;
        
        _oCoinCountText = new CTLText(_oContainer,
            iTextX, iTextY - iHeight / 2, iWidth, iHeight,
            80, "left", "#fff", PRIMARY_FONT, 1,
            2, 2,
            sprintf(COIN_COUNT.toString(), 0, 0),
            true, true, false,
            false);
        _oCoinCountText.setStroke(10, "#000");

        
    };

    this.unload = function () {
        oParentContainer.removeChild(_oContainer);
    };

    this.setPosition = function () {
        _oContainer.x = _pStartPos.x;
        _oContainer.y = _pStartPos.y + s_iOffsetY;
    };

    this.refreshCoinCount = function (iCur, iTot) {
        COIN_COUNT++
        _oCoinCountText.refreshText(COIN_COUNT.toString());
    };

    this.resetCoinCount = function (iCur, iTot) {
        COIN_COUNT = '0'
        _oCoinCountText.refreshText(COIN_COUNT);
    };

    this.setVisible = function (bVal) {
        _oContainer.visible = bVal;
    };

    this._init();
}


