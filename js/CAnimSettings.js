function CAnimSettings(){
    
    this._init = function(){
        this._initCharactersAnims();
        this._initShadowsAnims();
        this._initHitParticle();
        this._backFireAnim();
        this._coinHitAnim();
        this._boostAnimQ()
        this._boostAnimH()
    };
    
    this._initCharactersAnims = function(){
        s_aSpriteSheetCharacters = new Array()

        for(var i=0; i<s_aFileName.length; i++){
            var aSprites = new Array();
            for(var j=0; j<5; j++){
                aSprites.push( s_oSpriteLibrary.getSprite(s_aFileName[i]+'_'+j) );
            }
            

            var oData = this._getCarSpriteData(aSprites);

            s_aSpriteSheetCharacters[i] = new createjs.SpriteSheet(oData);
        }
    };

    this._initShadowsAnims = function(){
        var aSprites = new Array();
        for(var j=0; j<5; j++){
            aSprites.push( s_oSpriteLibrary.getSprite("car_shadow_"+j) );
        }
        
        var oData = this._getCarSpriteData(aSprites);

        s_oSpriteSheetShadows = new createjs.SpriteSheet(oData);  
    };
    
    this._initHitParticle = function(){
        var aFrames = new Array();
        var aSprites = new Array();
        for(var n=0; n<30; n++){
            var oSprite = s_oSpriteLibrary.getSprite("hit_contact_"+n);
            var iWidth = oSprite.width;
            var iHeight = oSprite.height;
            aSprites.push(oSprite);
            aFrames.push([0, 0, iWidth, iHeight, n, iWidth/2, iHeight/2])
        }


        var oData = {   
                        framerate:100,
                        images: aSprites,
                        // width, height & registration point of each sprite
                        frames: aFrames,
                        animations: {
                            stop:[30,30],
                            start:[0,29,"stop"],
                            idle:[0,29]
                                    }
                   };
                   
        s_oSpriteSheetHitParticle = new createjs.SpriteSheet(oData);
    };
    this._backFireAnim = function(){
        var aFrames = new Array();
        var aSprites = new Array();
        for(var n=0; n<13; n++){
            var oSprite = s_oSpriteLibrary.getSprite("backfire"+n);
            var iWidth = oSprite.width;
            var iHeight = oSprite.height;
            aSprites.push(oSprite);
            aFrames.push([0, 0, iWidth, iHeight, n, iWidth/2, iHeight/2])
        }


        var oData = {   
                        framerate:100,
                        images: aSprites,
                        frames: aFrames,
                        animations: {
                            stop:[0,0],
                            start:[0,1,"start"],
                            idle:[0,29]
                                    }
                   };
                   
        s_oSpriteSheetFireParticle = new createjs.SpriteSheet(oData);
    }
    this._coinHitAnim = function(){
        var aFrames = new Array();
        var aSprites = new Array();
        for(var n=0; n<11; n++){
            var oSprite = s_oSpriteLibrary.getSprite("coinHit"+n);
            var iWidth = oSprite.width;
            var iHeight = oSprite.height;
            aSprites.push(oSprite);
            aFrames.push([0, 0, iWidth, iHeight, n, iWidth/2, iHeight/2])
        }


        var oData = {   
                        framerate:100,
                        images: aSprites,
                        // width, height & registration point of each sprite
                        frames: aFrames,
                        animations: {
                            stop:[0,0],
                            start:[0,20,"start"],
                            idle:[0,29]
                                    }
                   };
                   
        s_oSpriteSheetCoinHitParticle = new createjs.SpriteSheet(oData);
    }
    this._boostAnimQ = function(){
        var aFrames = new Array();
        var aSprites = new Array();
        for(var n=1; n<4; n++){
            var oSprite = s_oSpriteLibrary.getSprite("b"+n);
            var iWidth = oSprite.width;
            var iHeight = oSprite.height;
            aSprites.push(oSprite);
            aFrames.push([0, 0, iWidth, iHeight, n, iWidth/2, iHeight/2])
        }


        var oData = {   
                        framerate:2,
                        images: aSprites,
                        // width, height & registration point of each sprite
                        frames: aFrames,
                        animations: {
                            stop:[0,0],
                            start:[0,1,"start"],
                            // idle:[0,2]
                                    }
                   };
                   
        s_oSpriteSheetQBoostParticle = new createjs.SpriteSheet(oData);
    }
    this._boostAnimH = function(){
        var aFrames = new Array();
        var aSprites = new Array();
        for(var n=1; n<4; n++){
            var oSprite = s_oSpriteLibrary.getSprite("t"+n);
            var iWidth = oSprite.width;
            var iHeight = oSprite.height;
            oSprite.scale = 0.2
            aSprites.push(oSprite);
            aFrames.push([0, 0, iWidth, iHeight, n, iWidth/2, iHeight/2])
        }


        var oData = {   
                        framerate:2,
                        images: aSprites,
                        // width, height & registration point of each sprite
                        frames: aFrames,
                        animations: {
                            stop:[0,0],
                            start:[0,1,"start"],
                            // idle:[0,2]
                                    }
                   };
                   
        s_oSpriteSheetHBoostParticle = new createjs.SpriteSheet(oData);
    }
    
    this._getCarSpriteData = function(aSprites){
        var aFrames = new Array();
            for(var n=0; n<aSprites.length; n++){
                var oSprite = aSprites[n];
                var iWidth = oSprite.width;
                var iHeight = oSprite.height;
                aFrames.push([0, 0, iWidth, iHeight, n, iWidth/2, iHeight])
            }
            
            
            var oData = {   
                            images: aSprites,
                            // width, height & registration point of each sprite
                            frames: aFrames,
                            animations: {   center:[0], right_0:[1], right_1:[2],
                                            left_0:[3], left_1:[4], 
                                            
                                            
                                        }
                       };
                   
        return oData;
    };
    
    this._init();
}


var s_aSpriteSheetCharacters;
var s_oSpriteSheetWheelsMask;
var s_oSpriteSheetShadows;
var s_oSpriteSheetHitParticle;
var s_oSpriteSheetFireParticle;
var s_oSpriteSheetQBoostParticle;
var s_oSpriteSheetHBoostParticle;
var s_oSpriteSheetCoinHitParticle;