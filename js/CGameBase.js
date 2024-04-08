var CGameBase = function (oData, iLevel) {
    this._bStartGame;
    this._bDamaged;
    this._bCollision;

    this._iStartCountDown;
    this._iTimeElaps;
    this._iLevel;
    this._iScore;
    this._iGameState;
    this._iCurRotationScreenDir;
    this._iCurFrameRotation;
    this._iCurRotation;

    this._aSegments;

    this._oInterface;
    this._oEndPanel = null;
    this._oParent;

    this._oPrevSegment;
    this._oPlayer;
    this._oRoad;

    this._oGrassDrawingLevel;
    this._oRoadDrawingLevel;
    this._oRumbleDrawingLevel;
    this._oLaneDrawingLevel;

    this._oElementContainer;
    this._oHorizon;
    this._iHorizonOffset;

    this._aCars;
    this._aEnemy;
    this._oboost
    this._oLevelBuilder;
    this._oCointSegment = []
    this._oHitParticle;
    this._iLastCountIncreaseTime;
    this.hit_coin;
    this._coinHitAnim;
    s_oGame = this;

    this._init(iLevel);
};

CGameBase.prototype._init = function (iLevel) {

    this._iLevel = iLevel;

    this._aSegments = new Array();

    this._oGameContainer = new createjs.Container();
    this._oGameContainer.x = CANVAS_WIDTH / 2;
    this._oGameContainer.y = CANVAS_HEIGHT;
    this._oGameContainer.regX = CANVAS_WIDTH / 2;
    this._oGameContainer.regY = CANVAS_HEIGHT;
    s_oStage.addChild(this._oGameContainer);

    var iWorldNum = Math.floor(this._iLevel / NUM_TRACKS_PER_WORLD);
    var szPatch = "w" + iWorldNum + "_patch";
    /*
        var oSprite = s_oSpriteLibrary.getSprite(szPatch);
        var oPatch = createBitmap(oSprite);
        this._oGameContainer.addChild(oPatch);
    */
    this._oHorizon = new CHorizon(this._iLevel, this._oGameContainer);

    this._oRoadDrawingContainer = new createjs.Container();
    //this._oRoadDrawingContainer.cache(START_X_ROTATION_VIEW, START_Y_ROTATION_VIEW, WIDTH_ROTATION_VIEW, HEIGHT_ROTATION_VIEW);
    this._oGameContainer.addChild(this._oRoadDrawingContainer);

    this._oGrassDrawingLevel = new createjs.Shape();
    //this._oGrassDrawingLevel.cache(START_X_ROTATION_VIEW, START_Y_ROTATION_VIEW, WIDTH_ROTATION_VIEW, HEIGHT_ROTATION_VIEW);
    //this._oGameContainer.addChild(this._oGrassDrawingLevel);
    this._oRoadDrawingContainer.addChild(this._oGrassDrawingLevel);

    this._oRoadDrawingLevel = new createjs.Shape();
    //this._oRoadDrawingLevel.cache(START_X_ROTATION_VIEW, START_Y_ROTATION_VIEW, WIDTH_ROTATION_VIEW, HEIGHT_ROTATION_VIEW);
    //this._oGameContainer.addChild(this._oRoadDrawingLevel);
    this._oRoadDrawingContainer.addChild(this._oRoadDrawingLevel);


    this._oRumbleDrawingLevel = new createjs.Shape();
    //this._oRumbleDrawingLevel.cache(START_X_ROTATION_VIEW, START_Y_ROTATION_VIEW, WIDTH_ROTATION_VIEW, HEIGHT_ROTATION_VIEW);
    //this._oGameContainer.addChild(this._oRumbleDrawingLevel);
    this._oRoadDrawingContainer.addChild(this._oRumbleDrawingLevel);

    this._oLaneDrawingLevel = new createjs.Shape();
    //this._oLaneDrawingLevel.cache(START_X_ROTATION_VIEW, START_Y_ROTATION_VIEW, WIDTH_ROTATION_VIEW, HEIGHT_ROTATION_VIEW);
    //this._oGameContainer.addChild(this._oLaneDrawingLevel);
    this._oRoadDrawingContainer.addChild(this._oLaneDrawingLevel);

    this._oRumbleStrokeLevel = new createjs.Shape();
    //this._oRumbleStrokeLevel.cache(START_X_ROTATION_VIEW, START_Y_ROTATION_VIEW, WIDTH_ROTATION_VIEW, HEIGHT_ROTATION_VIEW);
    this._oRoadDrawingContainer.addChild(this._oRumbleStrokeLevel);

    /*
    this._oRumbleStrokeLevel = new createjs.Shape();
    this._oRumbleStrokeLevel.cache(START_X_ROTATION_VIEW, START_Y_ROTATION_VIEW, WIDTH_ROTATION_VIEW, HEIGHT_ROTATION_VIEW);
    this._oGameContainer.addChild(this._oRumbleStrokeLevel);
    */

    /*
    var iWorld = Math.floor(this._iLevel/NUM_WORLDS);
    var oSprite = s_oSpriteLibrary.getSprite("fog_"+iWorld);
    var oFog = createBitmap(oSprite);
    oFog.x = 0;
    oFog.y = CANVAS_HEIGHT/2-200;
    this._oGameContainer.addChild(oFog);
    */
    this._oElementContainer = new createjs.Container();
    this._oGameContainer.addChild(this._oElementContainer);

    this._oRoad = new CRoad(this._oRoadDrawingLevel, this._oElementContainer, this._iLevel, this._oRumbleDrawingLevel, this._oGrassDrawingLevel, this._oLaneDrawingLevel, this._oRumbleStrokeLevel);

    this._oPlayer = new CPlayer(CANVAS_WIDTH / 2, CANVAS_HEIGHT - 180, this._oElementContainer);
    this._oPlayer.addEventListener(ON_PLAYER_PASSED_LAP, this.playerLapPassed, this);
    //this._oPlayer.addEventListener(ON_PLAYER_HIT, this._onPlayerHit, this);
    //this._oPlayer.addEventListener(ON_PLAYER_HIT_WHILE_COLLIDED, this._onPlayerHitWhileCollided, this);

    this._aSegments = this._oRoad.getSegments();
    TRACK_LENGTH = this._oRoad.getTrackLength();


    this._oInterface = new CInterface(this._oPlayer);

    var oCursor = this._oPlayer.getCursor();
    this._oInterface.addMiniMapCursor(oCursor, this._oPlayer);

    this._aCars = new Array();
    this._aEnemy = new Array();
    this._oLevelBuilder = new CLevelBuilder(this._oPlayer, this._aCars, this._aEnemy, this._oElementContainer, iLevel);
    // this._oboost = new BoostIndicator(170,780,this._oElementContainer)

    this.resetParams();




    this.refreshButtonPos();

    ////////////////PLACE BEFORE STARTING LANE
    ///NO NEGATIVE NUMBERS, SO LET'S GET LAST SEGMENT, AND SUBTRACT A QTY
    /*
    var iStartPos = 7200;
    this._oPlayer.setPosition(iStartPos*SEGMENT_LENGTH);
    this._oPlayer.setXOffset(-0.4);
    this._oPrevSegment = this._oPlayer.getPlayerSegment();
    */
    this._oHitParticle = new CHitParticle(0, -340, this._oElementContainer);
    if(CAR_BOOST){
        this.fireL = new backFire(0, -340, this._oElementContainer);
        this.fireR = new backFire(0, -340, this._oElementContainer);
    }
    this._coinHitAnim = new CoinHitAnim(0, -340, this._oElementContainer)

};


CGameBase.prototype.refreshButtonPos = function () {
    this._oInterface.refreshButtonPos();
    var iOffsetRatio = 0.5;
    this._oGameContainer.y = CANVAS_HEIGHT - s_iOffsetY * iOffsetRatio;

};

CGameBase.prototype.getWorldCameraPos = function () {
    var oZPosition = this._oPlayer.getPosition().z;


    var oBase = this._aSegments[(this.findSegment(oZPosition).index)];

    var baseSegmentPos = oBase.p1.world;
    var iPercent = (oZPosition - baseSegmentPos.z) / SEGMENT_LENGTH;

    var iX = Util.interpolate(oBase.p1.world.x, oBase.p2.world.x, iPercent);
    //WE DON'T NEED Y NOW
    var iY = 0//Util.interpolate(oBase.p1.world.z, oBase.p2.world.z, iPercent);

    ///this._iHorizonOffset SHOULD BE INCREMENTED HERE,
    ///BUT IT'S OK FOR PERFORMANCE IMPROVEMENTS

    return { x: iX + this._iHorizonOffset, y: iY };
};

CGameBase.prototype.playerLapPassed = function () {
    this._iHorizonOffset += this._aSegments[(this._aSegments.length - 1)].p1.world.x;
};


function _onKeyboardUp(evt) {
    evt.preventDefault();
    s_oGame.onKeyUp(evt.keyCode);
}

function _onKeyboardDown(evt) {
    if (!evt) {
        evt = window.event;
    }
    evt.preventDefault();

    s_oGame.onKeyDown(evt.keyCode);
}


var boolCount = true
CGameBase.prototype.onKeyUp = function (iKey) {
    

    if (!this._bStartGame) {
        return;
    }

    switch (iKey) {

        // left  
        case KEY_LEFT_A:
        case KEY_LEFT:{
            this._oPlayer.stopLeft();
            if(s_bMobile){
                this._oInterface.clMobBoost()
            }
            break;
        }
        case KEY_UP_W:
        case KEY_UP: {
            if(!this._oInterface.isAutoPilot()){
                this._oPlayer.stopAccelerate();
            }
            break;
        }
        // right  
        case KEY_RIGHT_D:
        case KEY_RIGHT:{
            this._oPlayer.stopRight();
            if(s_bMobile){
                this._oInterface.clMobBoost()
            }
            break;
        }
        case KEY_DOWN_S:
        case KEY_DOWN: {
            this._oPlayer.stopBrake();
            break;
        }
    }
};


CGameBase.prototype.onKeyDown = function (iKey) {
    var playerSegment = this._oPlayer.getPlayerSegment()
 
    if (!this._bStartGame) {
        return;
    }


    switch (iKey) {
        // left  
        case KEY_LEFT_A:
        case KEY_LEFT: {
            if ((playerSegment.curve > 1 || playerSegment.curve < -1) && (boolCount)) {
                if (BOOST_COUNT > 0) {
                    if (BOOST_COUNT < 1) {
                        this.fireL.setVisible(false)
                        this.fireR.setVisible(false)
                    }
                }
                if(!s_bMobile){
                    this._oInterface.refreshBoostCount()
                }else{
                    this._oInterface.mobBoost()
                }
            }
            this._oPlayer.moveLeft();
            
            break;
        }
        case KEY_UP_W:
        case KEY_UP: {
            if(CAR_BOOST){
                this.fireL.play(1050, 1900)
                this.fireR.play(870, 1900)
            }
            this._oPlayer.moveAccelerate();
            break;
        }
        // right  
        case KEY_RIGHT_D:
        case KEY_RIGHT: {
            if ((playerSegment.curve > 1 || playerSegment.curve < -1) && (boolCount)) {
                if (BOOST_COUNT > 0) {
                    if (BOOST_COUNT < 1) {
                        this.fireL.setVisible(false)
                        this.fireR.setVisible(false)
                    }
                }
                if(!s_bMobile){
                    this._oInterface.refreshBoostCount()
                }else{
                    this._oInterface.mobBoost()
                }
            }
            this._oPlayer.moveRight();
            break;
        }
        case KEY_DOWN_S:
        case KEY_DOWN: {
            this._oPlayer.moveBrake();
            this._oInterface.setDisableAuto()
            break;
        }
        case KEY_SPACE: {
            break;
        }
    }
    


};


CGameBase.prototype.resetParams = function () {
    this._bStartGame = false;
    stopSound(s_aSounds["game_soundtrack"]);

    if (this._iLevel === ((getParamValue('track') - 1 || 0))/*false*/) {
        var oHelpPanel = new CHelpPanel();
    } else {
        this._bStartGame = true;
        stopSound(s_aSounds["menu_soundtrack"]);
        playSound("game_soundtrack", SOUNDTRACK_VOLUME_IN_GAME, true);

        $(s_oMain).trigger("start_level", this._iLevel);

        var oFade = new createjs.Shape();
        oFade.graphics.beginFill("black").drawRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        oFade.alpha = 1;
        s_oStage.addChild(oFade);

        new createjs.Tween.get(oFade).to({ alpha: 0 }, 750).call(function () {
            s_oStage.removeChild(oFade);
        });

    }

    this._iGameState = STATE_GAME_START;
    this._iScore = 0;
    this._iTimeElaps = LEVEL_INFO[this._iLevel].time;
    this._iStartCountDown = START_COUNTDOWN;
    this._iCurRotationScreenDir = 0;
    this._iCurFrameRotation = 0;
    this._iCurRotation = 0;
    this._iHorizonOffset = 0;

    this._oHorizon.restart();


    var iWorld = Math.floor(this._iLevel / NUM_WORLDS);
    var iTrack = this._iLevel % NUM_TRACKS_PER_WORLD;
    this._oInterface.setLevelInfo(iTrack);


    if (!s_bMobile) {
        document.onkeydown = _onKeyboardDown;
        document.onkeyup = _onKeyboardUp;
    }

    this._oPrevSegment = this._oPlayer.getPlayerSegment();
    this._oPlayer.reset();


};

CGameBase.prototype.restartGame = function () {
    $(s_oMain).trigger("show_interlevel_ad");
    $(s_oMain).trigger("restart_level", this._iLevel);

    this.resetParams();
};

CGameBase.prototype.unload = function () {

    this._oInterface.unload();
    if (this._oEndPanel !== null) {
        this._oEndPanel.unload();
    }

    stopSound(s_aSounds["menu_soundtrack"]);
    stopSound(s_aSounds["game_soundtrack"]);
    stopSound(s_aSounds["engine"]);
    stopSound(s_aSounds["brake"]);
    stopSound(s_aSounds["engine_reverse"]);
    stopSound(s_aSounds["engine_stall"]);

    createjs.Tween.removeAllTweens();
    s_oStage.removeAllChildren();
    if(CAR_BOOST){
        this.fireL.unload()
        this.fireR.unload()
    }
    BOOST_COUNT = 0 
    
};

CGameBase.prototype.checkDamage = function () {
    if (this._oPlayer.getCurSpeed() > PLAYER_MIN_SPEED_DAMAGE) {
        ///// WE SHOULD USE A LIMITED TIME OF INVULNERABILITY TO PREVENT MULTIPLE DAMAGE
        this.setPlayerDamage(0, null);
    }
};

CGameBase.prototype.endDamageTime = function () {
    this._bDamaged = false;
};

CGameBase.prototype._countDown = function () {
    this._iStartCountDown -= s_iTimeElaps;
    this._oInterface.refreshCountdown(this._iStartCountDown);
    if (this._iStartCountDown <= 0) {
        this._iStartCountDown = 0;
        this._iGameState = STATE_GAME_RACE;
        this._oInterface.countDownGo();
        var currentTime = new Date();
        START_TIME =  currentTime
        //this._oPlayer.setPlayerAnim("start");
    }
};

CGameBase.prototype.nextLevel = function () {
    s_oGame._iLevel++;
    if (s_oGame._iLevel <= NUM_WORLDS-1) {
        // console.log("LEVEL",s_oGame._iLevel,NUM_WORLDS);
        s_oGame.unload();
        s_oGame._init(s_oGame._iLevel);
        s_oGame._startGame();

    } else {
        s_oGame.gameOver();
    }
};

CGameBase.prototype.trackLose = function () {
    this._iGameState = STATE_GAME_END;
    s_oGame.stopPlayer();

    $(s_oMain).trigger("end_level", this._iLevel);
    $(s_oMain).trigger("show_interlevel_ad");

    var oLosePanel = new CLosePanel(s_oSpriteLibrary.getSprite('msg_box'));
    // oLosePanel.refreshLapText()
    oLosePanel.show(this._iScore);
};

CGameBase.prototype.stopPlayer = function () {
    this._oPlayer.stopAll();

    if (!s_bMobile) {
        document.onkeydown = null;
        document.onkeyup = null;
    }
};

CGameBase.prototype.onExit = function () {
    s_oGame.unload();
    $(s_oMain).trigger("end_session");

    playSound("menu_soundtrack", 1, true);
    this._oInterface.resetCoinCount()
    s_oMain.gotoMenu();
};

CGameBase.prototype._onExitHelp = function () {
    this._bStartGame = true;
    stopSound(s_aSounds["menu_soundtrack"]);
    playSound("game_soundtrack", SOUNDTRACK_VOLUME_IN_GAME, true);

    $(s_oMain).trigger("start_level", 1);
};

CGameBase.prototype.gameOver = function () {
    this._oEndPanel = new CEndPanel(s_oSpriteLibrary.getSprite('msg_box'));
    this._oEndPanel.show(this._iScore);
};

CGameBase.prototype.setPause = function () {
    this._bStartGame = false;
    this._oPlayer.stopAll();
};

CGameBase.prototype.setResume = function () {
    s_oGame._bStartGame = true;
};

CGameBase.prototype.update = function () {
    var iDt = 1 / s_iCurFps;
    var playerSegment = this._oPlayer.getPlayerSegment()

     if (BOOST_COUNT == 0) {
        // this._oboost.setVisible(false)
        if(CAR_BOOST){
            this.fireL.setVisible(false)
            this.fireR.setVisible(false)
        }
        this._oInterface.setVisible(2, false)
        this._oInterface.setVisible(1, true)

    } else if (BOOST_COUNT > BOOST_TRIGGER/5 && BOOST_COUNT < (BOOST_TRIGGER/5)*2) {
        this._oInterface.setVisible(1, false)
        this._oInterface.setVisible(2, true)
        this._oInterface.setVisible(3, false)
        this._oInterface.setVisible(4, false)

    } else if (BOOST_COUNT > (BOOST_TRIGGER/5)*3 && BOOST_COUNT < (BOOST_TRIGGER/5)*4) {
        this._oInterface.setVisible(1, false)
        this._oInterface.setVisible(2, false)
        this._oInterface.setVisible(3, true)
        this._oInterface.setVisible(4, false)

    }else if (BOOST_COUNT  > BOOST_TRIGGER-1) {
        this._oInterface.setVisible(1, false)
        this._oInterface.setVisible(2, false)
        this._oInterface.setVisible(3, false)
        this._oInterface.setVisible(4, true)
    }

    switch (this._iGameState) {
        case STATE_GAME_START: {
            if (this._bStartGame) {
                this._countDown();
            }

            break;
        }
        case STATE_GAME_RACE: {
            if (!this._bStartGame) {
                return;
            }
            this._oPlayer.update(iDt);

            this.updateRace(iDt);

            if(!this._oPlayer.isOutOfRoad()){
                if (playerSegment.curve >= 0 && playerSegment.curve < 0.5) {

                    if (BOOST_COUNT == 0) {
                        boolCount = true
                        if(CAR_BOOST){
                            this.fireL.setVisible(false)
                            this.fireR.setVisible(false)
                        }
            
                    }
                    if (BOOST_COUNT > BOOST_TRIGGER-1) {
                        boolCount = false
                        this.fireL.setVisible(true)
                        this.fireR.setVisible(true)
                        this.fireL.play(1050, 1900)
                        this.fireR.play(870, 1900)
                        this._oInterface.resetBoostCount()
                        ROAD_BOUNDS = 0.85
                        if (this._oPlayer.getCurSpeed() + 2000 > 30000) {
                            this._oPlayer.setCurSpeed(30000)
            
                        } else if (this._oPlayer.getCurSpeed() + 2000 < 30000) {
                            this._oPlayer.setCurSpeed(this._oPlayer.getCurSpeed() + 2000)
                            this._oPlayer.setBoostSpeed(this._oPlayer.getBoostSpeed() + 1);
            
                        }
                    } else if (BOOST_COUNT < 1) {
                        boolCount = true
                        ROAD_BOUNDS = 1.4
                    }
                }
            }

            break;
        }
        case STATE_GAME_END: {

            this._oPlayer.update(iDt);
            this._oPlayer.autoPilot();

            this.updateOpponents(iDt);

            break;
        }
    }

    this._oInterface.refreshSpeed(this._oPlayer.getCurSpeed() * PLAYER_SPEED_CONVERSION_RATIO);
    this._oInterface.refreshMiniMap(this._oPlayer.getPlayerSegment().index);


    this._oRoad.update(this._oPlayer.getPosition());

    this._oHorizon.move(this.getWorldCameraPos()/*, this._oRoad.getLastVisibleSegment().clip*/);


    this._bCollision = false;
    ///CHECK COLLISION
    this._checkCollisions();

    this._oPrevSegment = this._oPlayer.getPlayerSegment();
    

    if(TRACK_COMPTD){
        // this._oInterface.setVisible(5,false)
    }
    if(PLAYER_LAP_COMPTD[0]){
        this._oInterface.displayLapTime(LAPS[PLAYER_LAP_COMPTD[1]])
        PLAYER_LAP_COMPTD = [false]
    }
};

CGameBase.prototype._checkCollisions = function () {
    var iPlayerSegment = this._oPlayer.getPlayerSegment().index;
    iPlayerSegment += PLAYER_COLLISION_FRONT_DISTANCE;

    var aSegmentsToCheck = new Array();
    for (var i = this._oPrevSegment.index; i <= iPlayerSegment; i++) {
        var iIndex = i % this._aSegments.length;
        aSegmentsToCheck.push(this._aSegments[iIndex]);
    }

    ////THIS ITERATION PREVENT ENEMY PIERCING ON ELEMENT, LIKE A CCD
    for (var i = 0; i < aSegmentsToCheck.length; i++) {
        var segment = aSegmentsToCheck[i];

        this._checkEnemiesCollision(segment);
       (COIN_BOOL &&  this._checkCoinCollision(segment));
    }
};

CGameBase.prototype._checkCoinCollision = function (segment) {
    if (this._oPlayer.isOutOfRoad()) {
        return;
    };

    const filteredCoinSegment = segment.elements?.filter((e)=> e.name === 'coin')

    for (var n = 0; n < filteredCoinSegment?.length; n++) {
        var oElement = filteredCoinSegment[n].source;

        var bOverlap = Util.overlap(this._oPlayer.getPosition().x, this._oPlayer.getPlayerWidth(), oElement.getCollisor().center, oElement.getCollisor().width, 1);
        if (bOverlap && filteredCoinSegment[n].name === 'coin') {
            const coinSegment = this._oCointSegment?.find((e) => e === filteredCoinSegment[n].source._iSegmentIndex)
            if (coinSegment) {
                return;
            }
            this._coinHitAnim.setVisible(true)
            this._oInterface.refreshCoinCount();
            this._oCointSegment.push(filteredCoinSegment[n].source._iSegmentIndex)
            this._coinHitAnim.play(980, 1900)
            setTimeout(() => {
                this._coinHitAnim.setVisible(false)
            }, 200);

            // #coin boost
            // if(Math.round(this._oPlayer.getCurSpeed()) < this._oPlayer.getMaxSpeed()){
            //     this._oPlayer.setCurSpeed(this._oPlayer.getCurSpeed() + 500);
            //     this._oPlayer.setBoostSpeed(this._oPlayer.getBoostSpeed() + 1);
            //     this._oInterface.refreshBoostCount()
            //     _iLastCountIncreaseTime = Date.now();
            //     this._oInterface.setBoostVisible(true)
            //     setInterval(checkBoostSpeedReset.bind(this), 1000);
            // }
            break;
        }
    }
}

function checkBoostSpeedReset() {
    var currentTime = Date.now();
    var elapsedTime = currentTime - _iLastCountIncreaseTime;

    // If 2 seconds have passed without count increase, reset boost speed to 0
    if (elapsedTime >= 2000) {
        this._oPlayer.setBoostSpeed(0)
        this._oInterface.refreshBoostCount()
        this._oInterface.setBoostVisible(false)
    }
}

CGameBase.prototype._checkAmbientCollision = function (segment) {
    if (!this._oPlayer.isOutOfRoad()) {
        return;
    };

    for (var n = 0; n < segment.elements.length; n++) {
        var oElement = segment.elements[n].source;

        var bOverlap = Util.overlap(this._oPlayer.getPosition().x, this._oPlayer.getPlayerWidth(), oElement.getCollisor().center, oElement.getCollisor().width, 1);
        if (bOverlap) {

            this.checkDamage();
            this._oPlayer.setCurSpeed(PLAYER_ACCELERATION);

            var oSegment = this._oPlayer.getPlayerSegment();

            this._oPlayer.setPosition(Util.increase(oSegment.p1.world.z, -PLAYER_Z_FROMCAMERA, TRACK_LENGTH));

            this._bCollision = true;
            this._oPlayer.stopEngineSound();

            break;
        }
    }
};

CGameBase.prototype._checkEnemiesCollision = function (segment) {
    var oEnemy;
    var iEnemyW;
    for (var n = 0; n < segment.enemy.length; n++) {

        oEnemy = segment.enemy[n];
        iEnemyW = oEnemy.getSpriteBounds().width * SPRITES.ANIMATED.SCALE;

        var bOverlapXCondition = Util.overlap(this._oPlayer.getPosition().x, this._oPlayer.getPlayerWidth(), oEnemy.getOffset(), iEnemyW, 0.6);

        var bStateCondition = oEnemy.getState() !== STATE_RUNNER_DEATH && oEnemy.getState() !== STATE_RUNNER_HURTED;

        if (bOverlapXCondition && bStateCondition) {
            var bSpeedToCheckDamage = this._oPlayer.getCurSpeed() - oEnemy.getSpeed() > PLAYER_MIN_SPEED_DAMAGE;
            if (bSpeedToCheckDamage) {

                this.checkDamage();
                this._oPlayer.setCurSpeed(oEnemy.getSpeed() * (oEnemy.getSpeed() / this._oPlayer.getCurSpeed()));

                this._bCollision = true;
                this._oPlayer.stopEngineSound();

               



                break;
            } else {
                var iRelativeXPos = this.getRelativeEnemyPosToPlayer(oEnemy);
                var iRelativeZPos = this.getRelativeEnemyZPosToPlayer(oEnemy);

                oEnemy.lateralCollision(iRelativeXPos);
                this._oPlayer.lateralCollision(iRelativeXPos, oEnemy);


                this.setPlayerDamage(0, iRelativeXPos, iRelativeZPos);

                return;
            }
        }
    }
};



CGameBase.prototype.getRelativeEnemyPosToPlayer = function (oEnemy) {
    var oXPosition = this._oPlayer.getPosition().x;
    var iRelativeXPos = oEnemy.getOffset() - oXPosition;

    return iRelativeXPos;
};

CGameBase.prototype.getRelativeEnemyZPosToPlayer = function (oEnemy) {
    var oZPosition = this._oPlayer.getPosition().z;
    var iRelativeZPos = oEnemy.getZ() - oZPosition;

    return iRelativeZPos;
};

CGameBase.prototype.setPlayerDamage = function (iAmount, iRelativeXPos, iRelativeZ) {
    if (this._bDamaged) {
        return;
    }
    this._bDamaged = true;

    this._oPlayer.damageAnim(iRelativeXPos, iRelativeZ);

    var oTremble = new CTremble(s_oStage, 250, 20, 5);
};

CGameBase.prototype.playerCollide = function () {
    return this._bCollision;
};

CGameBase.prototype.rumbleCondition = function (segment) {
    return segment.curve > 1 || segment.curve < -1;
};


CGameBase.prototype.findSegment = function (z) {
    return this._oRoad.findSegment(z);
};

CGameBase.prototype.getSegments = function () {
    return this._aSegments;
};

CGameBase.prototype.getValidSegment = function (iIndex) {
    //LOOKBEHIND FUNCTION HAVE PROBLEMS, SO WE USING THIS FUNCTION
    var iStartIndex = iIndex % this._aSegments.length;
    var oSegment;
    if (iStartIndex > 0) {
        oSegment = this._aSegments[iStartIndex];
    } else {
        ////END OF TRACK
        var iNewStartIndex = this._aSegments.length + iStartIndex - 1;
        oSegment = this._aSegments[iNewStartIndex];
    }

    return oSegment;
};
CGameBase.prototype.displayLapTime = function(lap){
    this._oInterface.displayLapTime(lap)
}
CGameBase.prototype.getPlayer = function () {
    return this._oPlayer;
};
CGameBase.prototype.autoAcceleration = function () {
    this._oPlayer.autoAcceleration()
};
