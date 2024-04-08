var ROAD_INFO = new Array();
var AMBIENT_INFO = new Array();
var LEVEL_INFO = new Array();
var ELEMENT_INFO = new Array([],[],[],[],[],[],[],[],[],);
NumberOfLaps = 1;


//////////////////////////////////////// WORLD 1 ///////////////////////////////////////////////
ROAD_INFO[0] = [
    {"roadtype": ROAD.TYPE.STANDARD, "length":ROAD.LENGTH.LONG,     "curve":ROAD.CURVE.EASY },
    {"roadtype": ROAD.TYPE.STANDARD, "length":ROAD.LENGTH.MEDIUM,   "curve":ROAD.CURVE.MEDIUM},
    {"roadtype": ROAD.TYPE.STANDARD, "length":ROAD.LENGTH.MEDIUM,   "curve":-ROAD.CURVE.MEDIUM},
    {"roadtype": ROAD.TYPE.STANDARD, "length":ROAD.LENGTH.LONG,     "curve":-ROAD.CURVE.EASY,           },
    {"roadtype": ROAD.TYPE.STANDARD, "length":ROAD.LENGTH.LONG,                                        },
    {"roadtype": ROAD.TYPE.CURVE_S,  "length":ROAD.LENGTH.LONG,     "curve":ROAD.CURVE.MEDIUM},
    {"roadtype": ROAD.TYPE.STANDARD, "length":ROAD.LENGTH.MEDIUM,   "curve":ROAD.CURVE.HARD},
    {"roadtype": ROAD.TYPE.CURVE_S, "length":ROAD.LENGTH.MEDIUM,    "curve":ROAD.CURVE.MEDIUM},
   

    {"roadtype": ROAD.TYPE.CURVE_S, "length":ROAD.LENGTH.MEDIUM,    "curve":ROAD.CURVE.MEDIUM,          },
    {"roadtype": ROAD.TYPE.STANDARD, "length":ROAD.LENGTH.MEDIUM,   "curve":ROAD.CURVE.HARD},
    {"roadtype": ROAD.TYPE.CURVE_S,  "length":ROAD.LENGTH.LONG,     "curve":ROAD.CURVE.MEDIUM},
    {"roadtype": ROAD.TYPE.STANDARD, "length":ROAD.LENGTH.LONG-2},
    {"roadtype": ROAD.TYPE.STANDARD, "length":ROAD.LENGTH.LONG,     "curve":-ROAD.CURVE.EASY},
    {"roadtype": ROAD.TYPE.STANDARD, "length":ROAD.LENGTH.MEDIUM,   "curve":-ROAD.CURVE.MEDIUM},
    {"roadtype": ROAD.TYPE.STANDARD, "length":ROAD.LENGTH.MEDIUM,   "curve":ROAD.CURVE.MEDIUM},
    {"roadtype": ROAD.TYPE.STANDARD, "length":ROAD.LENGTH.LONG,     "curve":ROAD.CURVE.EASY },
    {"roadtype": ROAD.TYPE.STANDARD, "length":ROAD.LENGTH.LONG,    "curve":ROAD.CURVE.MEDIUM},

   
    {"roadtype": ROAD.TYPE.FINAL, "length":ROAD.LENGTH.LONG-12,      }
]
LEVEL_INFO[0] = {  "time":7, "num_cars":0, "num_laps":NumberOfLaps + 1,
                    "minimap":{x:0,y:0,scale:0.48,rot:-90},
                    "terrain":{ "roadbounds":1.4, "num_lanes":1, "adherence":1, "max_inertia":0.03, 
                                "color": {
                                        "light":  { road: '#6d515f', grass: "#ccdb44", rumble: '#020113', lane: '#020113'  },
                                        "dark":   { road: '#6d515f', grass: "#74c925", rumble: '#8a1515'                }
                                    },
                                    "color_alt": {
                                        "light":  { road: '#6d515f', grass: "#ccdb44", rumble: '#f89058', lane: '#020113'  },
                                        "dark":   { road: '#6d515f', grass: "#74c925", rumble: '#f89058'                }
                                    }
                            }
                };
              
AMBIENT_INFO[0] = [

    {"type":AMBIENT.TYPE.FILL_TRACK, "sprite": SPRITES.SECURITY_WALL, "position":3, "repetitionevery": 10, "disposition":AMBIENT.DISPOSITION.PRECISE},
    {"type":AMBIENT.TYPE.FILL_TRACK, "sprite": SPRITES.SECURITY_WALLX, "position":4, "repetitionevery": 20, "disposition":AMBIENT.DISPOSITION.PRECISE},
    
    {"side":AMBIENT.SIDE.CENTER, "sprite": SPRITES.BILLBOARD_ARC_1, "position":0, "segments":[0, 2000], "repetitionevery": 80, "disposition":AMBIENT.DISPOSITION.PRECISE},
    {"side":AMBIENT.SIDE.CENTER, "sprite": SPRITES.BILLBOARD_ARC_0, "position":0, "segments":[0, 1000], "repetitionevery": 133, "disposition":AMBIENT.DISPOSITION.PRECISE},
    {"side":AMBIENT.SIDE.CENTER, "sprite": SPRITES.BILLBOARD_ARC_2, "position":0, "segments":[2200, 3200], "repetitionevery": 154, "disposition":AMBIENT.DISPOSITION.PRECISE},
    {"side":AMBIENT.SIDE.CENTER, "sprite": SPRITES.BILLBOARD_ARC_3, "position":0, "segments":[3200, 4400], "repetitionevery": 50, "disposition":AMBIENT.DISPOSITION.PRECISE},

    {"side":AMBIENT.SIDE.CENTER, "sprite": SPRITES.BILLBOARD_ARC_1, "position":0, "segments":[4600, 7800], "repetitionevery": 30, "disposition":AMBIENT.DISPOSITION.PRECISE},
    {"side":AMBIENT.SIDE.CENTER, "sprite": SPRITES.BILLBOARD_ARC_2, "position":0, "segments":[4800, 5800], "repetitionevery": 80, "disposition":AMBIENT.DISPOSITION.PRECISE},
    {"side":AMBIENT.SIDE.CENTER, "sprite": SPRITES.BILLBOARD_ARC_4, "position":0, "segments":[5000, 7800], "repetitionevery": 135, "disposition":AMBIENT.DISPOSITION.PRECISE},

    {"type":AMBIENT.TYPE.FINISH, "sprite": SPRITES.FINISH},
    {"side":AMBIENT.SIDE.LEFT, "sprite": SPRITES.LSTART_POSITION, "position":-0.54, "segments":[7605,7800], "repetitionevery": 15, "disposition":AMBIENT.DISPOSITION.PRECISE},    
    {"side":AMBIENT.SIDE.RIGHT, "sprite": SPRITES.START_POSITION, "position":-0.58, "segments":[7602,7800], "repetitionevery": 15, "disposition":AMBIENT.DISPOSITION.PRECISE},
    {"side":AMBIENT.SIDE.CENTER, "sprite": SPRITES.COIN, "position":0, "segments":[100, 7600], "repetitionevery": 60, "disposition":AMBIENT.DISPOSITION.PRECISE},

]    

////////////////    
ROAD_INFO[1] = [
    {"roadtype": ROAD.TYPE.STANDARD, "length":ROAD.LENGTH.LONG,     "curve":ROAD.CURVE.EASY },
    {"roadtype": ROAD.TYPE.STANDARD, "length":ROAD.LENGTH.LONG,   "curve":ROAD.CURVE.MEDIUM},
    {"roadtype": ROAD.TYPE.STANDARD, "length":ROAD.LENGTH.LONG,     "curve":-ROAD.CURVE.MEDIUM,           },
    {"roadtype": ROAD.TYPE.STANDARD, "length":ROAD.LENGTH.LONG,                                        },
    {"roadtype": ROAD.TYPE.CURVE_S,  "length":ROAD.LENGTH.LONG,     "curve":ROAD.CURVE.MEDIUM},
    {"roadtype": ROAD.TYPE.STANDARD, "length":ROAD.LENGTH.MEDIUM,   "curve":ROAD.CURVE.HARD},
    {"roadtype": ROAD.TYPE.STANDARD, "length":ROAD.LENGTH.MEDIUM, },

    {"roadtype": ROAD.TYPE.CURVE_S, "length":ROAD.LENGTH.MEDIUM,    "curve":ROAD.CURVE.MEDIUM},
    {"roadtype": ROAD.TYPE.STANDARD, "length":ROAD.LENGTH.LONG,     "curve":-ROAD.CURVE.EASY },
    {"roadtype": ROAD.TYPE.STANDARD, "length":ROAD.LENGTH.EXTRALONG,     "curve":ROAD.CURVE.EASY },
    {"roadtype": ROAD.TYPE.STANDARD, "length":ROAD.LENGTH.MEDIUM,   "curve":ROAD.CURVE.HARD},
    {"roadtype": ROAD.TYPE.STANDARD, "length":ROAD.LENGTH.LONG, },
    {"roadtype": ROAD.TYPE.CURVE_S, "length":ROAD.LENGTH.SHORT,    "curve":-ROAD.CURVE.MEDIUM},
    {"roadtype": ROAD.TYPE.STANDARD, "length":ROAD.LENGTH.EXTRALONG,     "curve":ROAD.CURVE.EASY },
    {"roadtype": ROAD.TYPE.CURVE_S, "length":ROAD.LENGTH.SHORT,   "curve":ROAD.CURVE.MEDIUM  },
    {"roadtype": ROAD.TYPE.STANDARD, "length":ROAD.LENGTH.LONG,     "curve":-ROAD.CURVE.EASY },
    {"roadtype": ROAD.TYPE.STANDARD, "length":ROAD.LENGTH.EXTRALONG, },




   
    {"roadtype": ROAD.TYPE.FINAL, "length":ROAD.LENGTH.LONG-12,      }
]

LEVEL_INFO[1] = {   "time":65000, "num_cars":0, "num_laps":NumberOfLaps + 1,
                    "minimap":{x:0,y:0,scale:0.47,rot:-90},
                    "terrain":{ "roadbounds":1.4, "num_lanes":1, "adherence":1, "max_inertia":0.03, 
                            "color": {
                                "light":  { road: '#6d515f', grass: "#ccdb44", rumble: '#020113', lane: '#020113'  },
                                "dark":   { road: '#6d515f', grass: "#74c925", rumble: '#8a1515'                }
                            },
                            "color_alt": {
                                "light":  { road: '#6d515f', grass: "#ccdb44", rumble: '#f89058', lane: '#020113'  },
                                "dark":   { road: '#6d515f', grass: "#74c925", rumble: '#f89058'                }
                            }
                    }
                };

AMBIENT_INFO[1] = [
    {"type":AMBIENT.TYPE.FILL_TRACK, "sprite": SPRITES.SECURITY_WALL, "position":3, "repetitionevery": 20, "disposition":AMBIENT.DISPOSITION.PRECISE},
    // {"type":AMBIENT.TYPE.FILL_TRACK, "sprite": SPRITES.SECURITY_WALLZ, "position":9, "repetitionevery": 5, "disposition":AMBIENT.DISPOSITION.PRECISE},
    {"side":AMBIENT.SIDE.BOTH, "sprite": SPRITES.SECURITY_WALLY, "segments":[0, 7800], "position":4, "repetitionevery": 50, "disposition":AMBIENT.DISPOSITION.PRECISE},
    // {"type":AMBIENT.TYPE.FILL_TRACK, "sprite": SPRITES.SECURITY_WALLX, "position":7, "repetitionevery": 5, "disposition":AMBIENT.DISPOSITION.PRECISE},
    {"type":AMBIENT.TYPE.FILL_TRACK, "sprite": SPRITES.SECURITY_WALLX, "position":4, "repetitionevery": 20, "disposition":AMBIENT.DISPOSITION.PRECISE},
    
    {"side":AMBIENT.SIDE.CENTER, "sprite": SPRITES.BILLBOARD_ARC_1, "position":0, "segments":[0, 2000], "repetitionevery": 80, "disposition":AMBIENT.DISPOSITION.PRECISE},
    {"side":AMBIENT.SIDE.CENTER, "sprite": SPRITES.BILLBOARD_ARC_0, "position":0, "segments":[0, 1000], "repetitionevery": 133, "disposition":AMBIENT.DISPOSITION.PRECISE},
    {"side":AMBIENT.SIDE.CENTER, "sprite": SPRITES.BILLBOARD_ARC_2, "position":0, "segments":[2200, 3200], "repetitionevery": 154, "disposition":AMBIENT.DISPOSITION.PRECISE},
    {"side":AMBIENT.SIDE.CENTER, "sprite": SPRITES.BILLBOARD_ARC_3, "position":0, "segments":[3200, 4400], "repetitionevery": 50, "disposition":AMBIENT.DISPOSITION.PRECISE},

    {"side":AMBIENT.SIDE.CENTER, "sprite": SPRITES.BILLBOARD_ARC_1, "position":0, "segments":[4600, 7800], "repetitionevery": 30, "disposition":AMBIENT.DISPOSITION.PRECISE},
    {"side":AMBIENT.SIDE.CENTER, "sprite": SPRITES.BILLBOARD_ARC_2, "position":0, "segments":[4800, 5800], "repetitionevery": 80, "disposition":AMBIENT.DISPOSITION.PRECISE},
    {"side":AMBIENT.SIDE.CENTER, "sprite": SPRITES.BILLBOARD_ARC_4, "position":0, "segments":[5000, 7800], "repetitionevery": 135, "disposition":AMBIENT.DISPOSITION.PRECISE},

    {"type":AMBIENT.TYPE.FINISH, "sprite": SPRITES.FINISH},
    {"side":AMBIENT.SIDE.LEFT, "sprite": SPRITES.LSTART_POSITION, "position":-0.54, "segments":[7403,7800], "repetitionevery": 15, "disposition":AMBIENT.DISPOSITION.PRECISE},    
    {"side":AMBIENT.SIDE.RIGHT, "sprite": SPRITES.START_POSITION, "position":-0.58, "segments":[7398,7800], "repetitionevery": 15, "disposition":AMBIENT.DISPOSITION.PRECISE},
    {"side":AMBIENT.SIDE.CENTER, "sprite": SPRITES.COIN, "position":0, "segments":[100, 7300], "repetitionevery": 60, "disposition":AMBIENT.DISPOSITION.PRECISE},
];

////////////////
ROAD_INFO[2] = [
    {"roadtype": ROAD.TYPE.STANDARD, "length":ROAD.LENGTH.LONG,     "curve":-ROAD.CURVE.EASY,           },
    {"roadtype": ROAD.TYPE.STANDARD, "length":ROAD.LENGTH.LONG,                                        },
    {"roadtype": ROAD.TYPE.CURVE_S,  "length":ROAD.LENGTH.LONG,     "curve":ROAD.CURVE.MEDIUM},
    {"roadtype": ROAD.TYPE.STANDARD, "length":ROAD.LENGTH.MEDIUM,   "curve":ROAD.CURVE.HARD},
    {"roadtype": ROAD.TYPE.CURVE_S, "length":ROAD.LENGTH.MEDIUM,    "curve":ROAD.CURVE.MEDIUM},
   

    {"roadtype": ROAD.TYPE.CURVE_S, "length":ROAD.LENGTH.MEDIUM,    "curve":ROAD.CURVE.MEDIUM,          },
    {"roadtype": ROAD.TYPE.STANDARD, "length":ROAD.LENGTH.MEDIUM,   "curve":ROAD.CURVE.HARD},
    {"roadtype": ROAD.TYPE.STANDARD, "length":ROAD.LENGTH.LONG,     "curve":ROAD.CURVE.EASY,           },
    {"roadtype": ROAD.TYPE.STANDARD, "length":ROAD.LENGTH.MEDIUM, },
    {"roadtype": ROAD.TYPE.STANDARD, "length":ROAD.LENGTH.LONG,     "curve":ROAD.CURVE.MEDIUM,           },
    {"roadtype": ROAD.TYPE.STANDARD, "length":ROAD.LENGTH.SHORT,   "curve":-ROAD.CURVE.HARD},
    {"roadtype": ROAD.TYPE.STANDARD, "length":ROAD.LENGTH.LONG,     "curve":-ROAD.CURVE.EASY,           },
    {"roadtype": ROAD.TYPE.STANDARD, "length":ROAD.LENGTH.LONG,     "curve":ROAD.CURVE.EASY,           },
    {"roadtype": ROAD.TYPE.STANDARD, "length":ROAD.LENGTH.MEDIUM,   "curve":-ROAD.CURVE.MEDIUM},
    {"roadtype": ROAD.TYPE.STANDARD, "length":ROAD.LENGTH.LONG,     "curve":ROAD.CURVE.MEDIUM,           },
    {"roadtype": ROAD.TYPE.STANDARD, "length":ROAD.LENGTH.MEDIUM,  "curve":ROAD.CURVE.EASY, },


   
    {"roadtype": ROAD.TYPE.FINAL, "length":ROAD.LENGTH.LONG-12,      }
]
LEVEL_INFO[2] = {   "time":70000, "num_cars":0, "num_laps":NumberOfLaps + 1,
                    "minimap":{x:0,y:0,scale:0.48,rot:0},
                    "terrain":{ "roadbounds":1.4, "num_lanes":1, "adherence":1, "max_inertia":0.03, 
                            "color": {
                                "light":  { road: '#6d515f', grass: "#ccdb44", rumble: '#020113', lane: '#020113'  },
                                "dark":   { road: '#6d515f', grass: "#74c925", rumble: '#8a1515'                }
                            },
                            "color_alt": {
                                "light":  { road: '#6d515f', grass: "#ccdb44", rumble: '#f89058', lane: '#020113'  },
                                "dark":   { road: '#6d515f', grass: "#74c925", rumble: '#f89058'                }
                            }
                    }
                };
AMBIENT_INFO[2] = [
    {"type":AMBIENT.TYPE.FILL_TRACK, "sprite": SPRITES.SECURITY_WALL, "position":3, "repetitionevery": 20, "disposition":AMBIENT.DISPOSITION.PRECISE},
    // {"type":AMBIENT.TYPE.FILL_TRACK, "sprite": SPRITES.SECURITY_WALLZ, "position":9, "repetitionevery": 5, "disposition":AMBIENT.DISPOSITION.PRECISE},
    {"side":AMBIENT.SIDE.BOTH, "sprite": SPRITES.SECURITY_WALLY, "segments":[0, 6800], "position":4, "repetitionevery": 50, "disposition":AMBIENT.DISPOSITION.PRECISE},
    // {"type":AMBIENT.TYPE.FILL_TRACK, "sprite": SPRITES.SECURITY_WALLX, "position":7, "repetitionevery": 5, "disposition":AMBIENT.DISPOSITION.PRECISE},
    {"type":AMBIENT.TYPE.FILL_TRACK, "sprite": SPRITES.SECURITY_WALLX, "position":4, "repetitionevery": 20, "disposition":AMBIENT.DISPOSITION.PRECISE},
    
    {"side":AMBIENT.SIDE.CENTER, "sprite": SPRITES.BILLBOARD_ARC_1, "position":0, "segments":[0, 2000], "repetitionevery": 80, "disposition":AMBIENT.DISPOSITION.PRECISE},
    {"side":AMBIENT.SIDE.CENTER, "sprite": SPRITES.BILLBOARD_ARC_0, "position":0, "segments":[0, 1000], "repetitionevery": 133, "disposition":AMBIENT.DISPOSITION.PRECISE},
    {"side":AMBIENT.SIDE.CENTER, "sprite": SPRITES.BILLBOARD_ARC_2, "position":0, "segments":[2200, 3200], "repetitionevery": 154, "disposition":AMBIENT.DISPOSITION.PRECISE},
    {"side":AMBIENT.SIDE.CENTER, "sprite": SPRITES.BILLBOARD_ARC_3, "position":0, "segments":[3200, 4400], "repetitionevery": 50, "disposition":AMBIENT.DISPOSITION.PRECISE},

    {"side":AMBIENT.SIDE.CENTER, "sprite": SPRITES.BILLBOARD_ARC_1, "position":0, "segments":[4600, 6800], "repetitionevery": 30, "disposition":AMBIENT.DISPOSITION.PRECISE},
    {"side":AMBIENT.SIDE.CENTER, "sprite": SPRITES.BILLBOARD_ARC_2, "position":0, "segments":[4800, 6800], "repetitionevery": 80, "disposition":AMBIENT.DISPOSITION.PRECISE},
    {"side":AMBIENT.SIDE.CENTER, "sprite": SPRITES.BILLBOARD_ARC_4, "position":0, "segments":[5000, 6800], "repetitionevery": 135, "disposition":AMBIENT.DISPOSITION.PRECISE},

    {"type":AMBIENT.TYPE.FINISH, "sprite": SPRITES.FINISH},
    {"side":AMBIENT.SIDE.LEFT, "sprite": SPRITES.LSTART_POSITION, "position":-0.53, "segments":[5902,6300], "repetitionevery": 15, "disposition":AMBIENT.DISPOSITION.PRECISE},    
    {"side":AMBIENT.SIDE.RIGHT, "sprite": SPRITES.START_POSITION, "position":-0.58, "segments":[5899,6300], "repetitionevery": 15, "disposition":AMBIENT.DISPOSITION.PRECISE},
    {"side":AMBIENT.SIDE.CENTER, "sprite": SPRITES.COIN, "position":0, "segments":[100, 6000], "repetitionevery": 60, "disposition":AMBIENT.DISPOSITION.PRECISE},
]
ROAD_INFO[3] = [
    {"roadtype": ROAD.TYPE.STANDARD, "length":ROAD.LENGTH.LONG,     "curve":ROAD.CURVE.MEDIUM },
    {"roadtype": ROAD.TYPE.STANDARD, "length":ROAD.LENGTH.MEDIUM,   "curve":ROAD.CURVE.MEDIUM},
    {"roadtype": ROAD.TYPE.STANDARD, "length":ROAD.LENGTH.MEDIUM},

    {"roadtype": ROAD.TYPE.STANDARD, "length":ROAD.LENGTH.MEDIUM,   "curve":-ROAD.CURVE.HARD},
    {"roadtype": ROAD.TYPE.STANDARD, "length":ROAD.LENGTH.MEDIUM,     "curve":-ROAD.CURVE.MEDIUM,           },
    {"roadtype": ROAD.TYPE.STANDARD, "length":ROAD.LENGTH.MEDIUM,                                        },
    {"roadtype": ROAD.TYPE.CURVE_S,  "length":ROAD.LENGTH.SHORT,     "curve":ROAD.CURVE.HARD},
    {"roadtype": ROAD.TYPE.STANDARD, "length":ROAD.LENGTH.MEDIUM,   "curve":ROAD.CURVE.HARD},
    {"roadtype": ROAD.TYPE.CURVE_S, "length":ROAD.LENGTH.MEDIUM,    "curve":ROAD.CURVE.MEDIUM},
   

    {"roadtype": ROAD.TYPE.CURVE_S, "length":ROAD.LENGTH.MEDIUM,    "curve":ROAD.CURVE.MEDIUM,          },
    {"roadtype": ROAD.TYPE.STANDARD, "length":ROAD.LENGTH.MEDIUM,   "curve":ROAD.CURVE.HARD},
    {"roadtype": ROAD.TYPE.STANDARD, "length":ROAD.LENGTH.MEDIUM,                                        },
    {"roadtype": ROAD.TYPE.CURVE_S, "length":ROAD.LENGTH.MEDIUM,    "curve":ROAD.CURVE.MEDIUM,          },
    {"roadtype": ROAD.TYPE.STANDARD, "length":ROAD.LENGTH.LONG,     "curve":ROAD.CURVE.EASY },
    {"roadtype": ROAD.TYPE.STANDARD, "length":ROAD.LENGTH.SHORT,   "curve":ROAD.CURVE.HARD},
    {"roadtype": ROAD.TYPE.STANDARD, "length":ROAD.LENGTH.LONG,     "curve":ROAD.CURVE.MEDIUM },
    {"roadtype": ROAD.TYPE.STANDARD, "length":ROAD.LENGTH.MEDIUM,     "curve":-ROAD.CURVE.MEDIUM },
    {"roadtype": ROAD.TYPE.STANDARD, "length":ROAD.LENGTH.LONG,     "curve":-ROAD.CURVE.EASY },
    {"roadtype": ROAD.TYPE.STANDARD, "length":ROAD.LENGTH.MEDIUM,                                        },


   
    {"roadtype": ROAD.TYPE.FINAL, "length":ROAD.LENGTH.LONG-12,      }
]
LEVEL_INFO[3] = {   "time":70000, "num_cars":0, "num_laps":NumberOfLaps + 1,
                    "minimap":{x:0,y:0,scale:0.54,rot:-90},
                    "terrain":{ "roadbounds":1.4, "num_lanes":1, "adherence":1, "max_inertia":0.03, 
                                "color": {
                                        "light":  { road: '#6d515f', grass: "#ccdb44", rumble: '#020113', lane: '#020113'  },
                                        "dark":   { road: '#6d515f', grass: "#74c925", rumble: '#8a1515'                }
                                    },
                                    "color_alt": {
                                        "light":  { road: '#6d515f', grass: "#ccdb44", rumble: '#f89058', lane: '#020113'  },
                                        "dark":   { road: '#6d515f', grass: "#74c925", rumble: '#f89058'                }
                                    }
                            }
                };
              
AMBIENT_INFO[3] = [
   
    {"type":AMBIENT.TYPE.FILL_TRACK, "sprite": SPRITES.SECURITY_WALL, "position":3, "repetitionevery": 20, "disposition":AMBIENT.DISPOSITION.PRECISE},
    // {"type":AMBIENT.TYPE.FILL_TRACK, "sprite": SPRITES.SECURITY_WALLZ, "position":9, "repetitionevery": 10, "disposition":AMBIENT.DISPOSITION.PRECISE},
    {"side":AMBIENT.SIDE.BOTH, "sprite": SPRITES.SECURITY_WALLY, "segments":[0, 7800], "position":4, "repetitionevery": 50, "disposition":AMBIENT.DISPOSITION.PRECISE},
    // {"type":AMBIENT.TYPE.FILL_TRACK, "sprite": SPRITES.SECURITY_WALLX, "position":7, "repetitionevery": 5, "disposition":AMBIENT.DISPOSITION.PRECISE},
    {"type":AMBIENT.TYPE.FILL_TRACK, "sprite": SPRITES.SECURITY_WALLX, "position":4, "repetitionevery": 10, "disposition":AMBIENT.DISPOSITION.PRECISE},
    
    {"side":AMBIENT.SIDE.CENTER, "sprite": SPRITES.BILLBOARD_ARC_1, "position":0, "segments":[100,2000], "repetitionevery": 80, "disposition":AMBIENT.DISPOSITION.PRECISE},

    {"side":AMBIENT.SIDE.CENTER, "sprite": SPRITES.BILLBOARD_ARC_0, "position":0, "segments":[300,5000], "repetitionevery": 133, "disposition":AMBIENT.DISPOSITION.PRECISE},
    {"side":AMBIENT.SIDE.CENTER, "sprite": SPRITES.BILLBOARD_ARC_2, "position":0, "segments":[500, 2200], "repetitionevery": 154, "disposition":AMBIENT.DISPOSITION.PRECISE},

    {"side":AMBIENT.SIDE.CENTER, "sprite": SPRITES.BILLBOARD_ARC_3, "position":0, "segments":[2000, 4400], "repetitionevery": 50, "disposition":AMBIENT.DISPOSITION.PRECISE},

    {"side":AMBIENT.SIDE.CENTER, "sprite": SPRITES.BILLBOARD_ARC_1, "position":0, "segments":[4600, 7800], "repetitionevery": 30, "disposition":AMBIENT.DISPOSITION.PRECISE},
    {"side":AMBIENT.SIDE.CENTER, "sprite": SPRITES.BILLBOARD_ARC_2, "position":0, "segments":[4800, 5800], "repetitionevery": 80, "disposition":AMBIENT.DISPOSITION.PRECISE},
    {"side":AMBIENT.SIDE.CENTER, "sprite": SPRITES.BILLBOARD_ARC_4, "position":0, "segments":[5000, 8800], "repetitionevery": 135, "disposition":AMBIENT.DISPOSITION.PRECISE},

    {"type":AMBIENT.TYPE.FINISH, "sprite": SPRITES.FINISH},
    {"side":AMBIENT.SIDE.LEFT, "sprite": SPRITES.LSTART_POSITION, "position":-0.53, "segments":[5393,5700], "repetitionevery": 15, "disposition":AMBIENT.DISPOSITION.PRECISE},    
    {"side":AMBIENT.SIDE.RIGHT, "sprite": SPRITES.START_POSITION, "position":-0.58, "segments":[5389,5700], "repetitionevery": 15, "disposition":AMBIENT.DISPOSITION.PRECISE},
    {"side":AMBIENT.SIDE.CENTER, "sprite": SPRITES.COIN, "position":0, "segments":[100,5300], "repetitionevery": 60, "disposition":AMBIENT.DISPOSITION.PRECISE},
    
]

ROAD_INFO[4] = [    
    {"roadtype": ROAD.TYPE.STANDARD, "length":ROAD.LENGTH.SHORT,                                        },

    // {"roadtype": ROAD.TYPE.STANDARD, "length":ROAD.LENGTH.LONG,     "curve":ROAD.CURVE.EASY },
    {"roadtype": ROAD.TYPE.STANDARD, "length":ROAD.LENGTH.MEDIUM,   "curve":-ROAD.CURVE.MEDIUM},
    {"roadtype": ROAD.TYPE.STANDARD, "length":ROAD.LENGTH.MEDIUM,   "curve":-ROAD.CURVE.MEDIUM},
    {"roadtype": ROAD.TYPE.STANDARD, "length":ROAD.LENGTH.LONG,     "curve":ROAD.CURVE.EASY,           },
    {"roadtype": ROAD.TYPE.STANDARD, "length":ROAD.LENGTH.LONG,                                        },
    {"roadtype": ROAD.TYPE.CURVE_S,  "length":ROAD.LENGTH.MEDIUM,     "curve":ROAD.CURVE.MEDIUM},
    {"roadtype": ROAD.TYPE.STANDARD, "length":ROAD.LENGTH.MEDIUM,   "curve":ROAD.CURVE.HARD},
    {"roadtype": ROAD.TYPE.CURVE_S, "length":ROAD.LENGTH.MEDIUM,    "curve":ROAD.CURVE.MEDIUM},
   

    {"roadtype": ROAD.TYPE.CURVE_S, "length":ROAD.LENGTH.MEDIUM,    "curve":ROAD.CURVE.MEDIUM,          },
    {"roadtype": ROAD.TYPE.CURVE_S, "length":ROAD.LENGTH.MEDIUM,    "curve":ROAD.CURVE.MEDIUM,          },
    {"roadtype": ROAD.TYPE.CURVE_S, "length":ROAD.LENGTH.MEDIUM,    "curve":ROAD.CURVE.HARD,          },
    {"roadtype": ROAD.TYPE.STANDARD, "length":ROAD.LENGTH.EXTRALONG,     "curve":ROAD.CURVE.EASY,           },
    {"roadtype": ROAD.TYPE.STANDARD, "length":ROAD.LENGTH.EXTRALONG,     "curve":ROAD.CURVE.EASY,           },
    {"roadtype": ROAD.TYPE.STANDARD, "length":ROAD.LENGTH.MEDIUM,           },

    

   
    {"roadtype": ROAD.TYPE.FINAL, "length":ROAD.LENGTH.LONG-12,      }
]




    LEVEL_INFO[4] = {   "time":70000, "num_cars":0, "num_laps":NumberOfLaps + 1,
                        "minimap":{x:10,y:10,scale:0.50,rot:320},
                        "terrain":{ "roadbounds":1.4, "num_lanes":1, "adherence":1, "max_inertia":0.03, 
                                "color": {
                                    "light":  { road: '#6d515f', grass: "#ccdb44", rumble: '#020113', lane: '#020113'  },
                                    "dark":   { road: '#6d515f', grass: "#74c925", rumble: '#8a1515'                }
                                },
                                "color_alt": {
                                    "light":  { road: '#6d515f', grass: "#ccdb44", rumble: '#f89058', lane: '#020113'  },
                                    "dark":   { road: '#6d515f', grass: "#74c925", rumble: '#f89058'                }
                                }
                        }
                    };
    AMBIENT_INFO[4] = [
       
        {"type":AMBIENT.TYPE.FILL_TRACK, "sprite": SPRITES.SECURITY_WALL, "position":3, "repetitionevery": 20, "disposition":AMBIENT.DISPOSITION.PRECISE},
        // {"type":AMBIENT.TYPE.FILL_TRACK, "sprite": SPRITES.SECURITY_WALLZ, "position":9, "repetitionevery": 5, "disposition":AMBIENT.DISPOSITION.PRECISE},
        {"side":AMBIENT.SIDE.BOTH, "sprite": SPRITES.SECURITY_WALLY, "segments":[0, 7800], "position":4, "repetitionevery": 50, "disposition":AMBIENT.DISPOSITION.PRECISE},
        // {"type":AMBIENT.TYPE.FILL_TRACK, "sprite": SPRITES.SECURITY_WALLX, "position":7, "repetitionevery": 5, "disposition":AMBIENT.DISPOSITION.PRECISE},
        {"type":AMBIENT.TYPE.FILL_TRACK, "sprite": SPRITES.SECURITY_WALLX, "position":4, "repetitionevery": 10, "disposition":AMBIENT.DISPOSITION.PRECISE},
        
        {"side":AMBIENT.SIDE.CENTER, "sprite": SPRITES.BILLBOARD_ARC_1, "position":0, "segments":[0, 2000], "repetitionevery": 80, "disposition":AMBIENT.DISPOSITION.PRECISE},
        {"side":AMBIENT.SIDE.CENTER, "sprite": SPRITES.BILLBOARD_ARC_0, "position":0, "segments":[0, 1000], "repetitionevery": 133, "disposition":AMBIENT.DISPOSITION.PRECISE},
        {"side":AMBIENT.SIDE.CENTER, "sprite": SPRITES.BILLBOARD_ARC_2, "position":0, "segments":[2200, 3200], "repetitionevery": 154, "disposition":AMBIENT.DISPOSITION.PRECISE},
        {"side":AMBIENT.SIDE.CENTER, "sprite": SPRITES.BILLBOARD_ARC_3, "position":0, "segments":[3200, 4400], "repetitionevery": 50, "disposition":AMBIENT.DISPOSITION.PRECISE},
    
        {"side":AMBIENT.SIDE.CENTER, "sprite": SPRITES.BILLBOARD_ARC_1, "position":0, "segments":[4600, 6800], "repetitionevery": 30, "disposition":AMBIENT.DISPOSITION.PRECISE},
        {"side":AMBIENT.SIDE.CENTER, "sprite": SPRITES.BILLBOARD_ARC_2, "position":0, "segments":[4800, 6800], "repetitionevery": 80, "disposition":AMBIENT.DISPOSITION.PRECISE},
        {"side":AMBIENT.SIDE.CENTER, "sprite": SPRITES.BILLBOARD_ARC_4, "position":0, "segments":[5000, 6800], "repetitionevery": 135, "disposition":AMBIENT.DISPOSITION.PRECISE},
    
        {"type":AMBIENT.TYPE.FINISH, "sprite": SPRITES.FINISH},
        {"side":AMBIENT.SIDE.LEFT, "sprite": SPRITES.LSTART_POSITION, "position":-0.54, "segments":[6292,6500], "repetitionevery": 15, "disposition":AMBIENT.DISPOSITION.PRECISE},    
        {"side":AMBIENT.SIDE.RIGHT, "sprite": SPRITES.START_POSITION, "position":-0.58, "segments":[6289,6500], "repetitionevery": 15, "disposition":AMBIENT.DISPOSITION.PRECISE},
        {"side":AMBIENT.SIDE.CENTER, "sprite": SPRITES.COIN, "position":0, "segments":[100, 6300], "repetitionevery": 60, "disposition":AMBIENT.DISPOSITION.PRECISE},
    ]


////////////////