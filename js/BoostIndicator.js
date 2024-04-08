function BoostIndicator(iX, iY, oParentContainer) {
    var  boostTank;
    var _boostContainer1;
    var _boostContainer2;
    var _boostContainer3;
    var _boostContainer4;
    var _boostContainer;
    var _lapTimeContainer;
    var _pStartPos;
    var _LapTimeText;
    var m_interval;

    this._init = function () {
        _pStartPos = { x: iX, y: iY };

        

        _boostContainer = new createjs.Container();
        boostTank = new CBoostTankAnim(iX-90,iY+130,oParentContainer)
        _boostContainer.x = iX - 100;
        _boostContainer.y = iY + 160;
        oParentContainer.addChild(_boostContainer)
        
        _boostContainer1 = new createjs.Container();
        _boostContainer1.x = iX + 5;
        _boostContainer1.y = iY + 128;
        oParentContainer.addChild(_boostContainer1)
        var bSpritf = s_oSpriteLibrary.getSprite('boost1');
        var btX = createBitmap(bSpritf)
        btX.regX = 320;
        btX.regY = 10
        btX.scale = 0.78
        _boostContainer1.addChild(btX)
        _boostContainer1.visible = true
        
        _boostContainer = new createjs.Container();
        _boostContainer.x = iX - 90;
        _boostContainer.y = iY + 130;
        oParentContainer.addChild(_boostContainer)

        _boostContainer2 = new createjs.Container()
        boostTank.boostQ(iX-200,iY+100,_boostContainer2)
        _boostContainer2.x = iX - 75;
        _boostContainer2.y = iY + 110;
        oParentContainer.addChild(_boostContainer2)
        _boostContainer2.visible = false

        _boostContainer3 = new createjs.Container()
        boostTank.boostH(iX-200,iY+100,_boostContainer3)
        _boostContainer3.x = iX - 75;
        _boostContainer3.y = iY + 110;
        oParentContainer.addChild(_boostContainer3)
        _boostContainer3.visible = false

        _boostContainer4 = new createjs.Container()
        _boostContainer4.x = iX + 5;
        _boostContainer4.y = iY + 130;
        oParentContainer.addChild(_boostContainer4)
        var bSpritf4 = s_oSpriteLibrary.getSprite('boost4');
        var btX4 = createBitmap(bSpritf4)
        btX4.regX = 320;
        btX4.regY = 10
        btX4.scale = 0.78
        _boostContainer4.addChild(btX4)
        _boostContainer4.visible = false

    };

    this.unload = function () {
        oParentContainer.removeChild(_boostContainer2);
        oParentContainer.removeChild(_boostContainer3);
        oParentContainer.removeChild(_boostContainer4);
    };

    this.setPosition = function () {
        _lapTimeContainer.x = _pStartPos.x;
        _lapTimeContainer.y = _pStartPos.y + s_iOffsetY;
    };

    this.refreshBoostCount = function (iCur, iTot) {
        if (BOOST_COUNT == BOOST_TRIGGER) {
            return
        }
        BOOST_COUNT++
    };
    var interval;
    var callCount = true
    this.resetBoostCount = function (iCur, iTot) {
        var count = 1000;
        if (callCount) {
            if (BOOST_COUNT > 15) {
                callCount = false
                interval = setInterval(() => {
                    BOOST_COUNT--

                    if (BOOST_COUNT < 1) {
                        BOOST_COUNT = 0
                        clearInterval(interval)
                        callCount = true
                        return
                    }

                }, 30)

            } else if (BOOST_COUNT < 1) {
                callCount = true
                clearInterval(interval)
            }
        }
    };


    this.mobBoost = function(){
        BOOST_COUNT++
        m_interval = setInterval(()=>{
            BOOST_COUNT++
        },200)
    }
    this.clMobBoost = function(){
        clearInterval(m_interval)
    } 

    this.setVisible = function (num, bool) {
        var containers = [_boostContainer1, _boostContainer2, _boostContainer3, _boostContainer4,_lapTimeContainer]
        containers[num - 1].visible = bool
    }
    this.displayLapTime = function(lap,container){
        
        _lapTimeContainer = new createjs.Container()
        _lapTimeContainer.x = iX - 90;
        _lapTimeContainer.y = iY + 130
        oParentContainer.addChild(_lapTimeContainer)
        container.addChild(_lapTimeContainer)
        var multiY = 70*PLAYER_LAP_COMPTD[1]
        var iWidth = 400;
        var iHeight = 70;
        iTextX =10;
        iTextY =10+multiY;
         _LapTimeText = new CTLText(_lapTimeContainer,
            iTextX , iTextY , iWidth, iHeight,
            60, "left", "#fff", PRIMARY_FONT, 1,
            2, 2,
            sprintf(`lap ${PLAYER_LAP_COMPTD[1]+1} :   ${lap}`, 0, 0),
            true, true, false,
            false);
            _LapTimeText.setStroke(10, "#000");
            setTimeout(()=>{
                _LapTimeText.setAlpha(0.5)
            },2000)
       
        
    }
    this.unloadBoostCount = function(){
        BOOST_COUNT = 0
    }

    // this._init();
}
