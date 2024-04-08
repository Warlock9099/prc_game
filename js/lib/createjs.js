/*!
 * @license createjs
 * Visit http://createjs.com/ for documentation, updates and examples.
 *
 * Copyright (c) 2011-2015 gskinner.com, inc.
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 */
(this.createjs = this.createjs || {}),
    (createjs.extend = function (t, e) {
        "use strict";
        function i() {
            this.constructor = t;
        }
        return (i.prototype = e.prototype), (t.prototype = new i());
    }),
    (this.createjs = this.createjs || {}),
    (createjs.promote = function (t, e) {
        "use strict";
        var i = t.prototype,
            s = (Object.getPrototypeOf && Object.getPrototypeOf(i)) || i.__proto__;
        if (s) for (var r in ((i[(e += "_") + "constructor"] = s.constructor), s)) i.hasOwnProperty(r) && "function" == typeof s[r] && (i[e + r] = s[r]);
        return t;
    }),
    (this.createjs = this.createjs || {}),
    (createjs.indexOf = function (t, e) {
        "use strict";
        for (var i = 0, s = t.length; s > i; i++) if (e === t[i]) return i;
        return -1;
    }),
    (this.createjs = this.createjs || {}),
    (function () {
        "use strict";
        function t() {
            throw "UID cannot be instantiated";
        }
        (t._nextID = 0),
            (t.get = function () {
                return t._nextID++;
            }),
            (createjs.UID = t);
    })(),
    (this.createjs = this.createjs || {}),
    (createjs.deprecate = function (t, e) {
        "use strict";
        return function () {
            var i = "Deprecated property or method '" + e + "'. See docs for info.";
            return console && (console.warn ? console.warn(i) : console.log(i)), t && t.apply(this, arguments);
        };
    }),
    (this.createjs = this.createjs || {}),
    (function () {
        "use strict";
        function t(t, e, i) {
            (this.type = t),
                (this.target = null),
                (this.currentTarget = null),
                (this.eventPhase = 0),
                (this.bubbles = !!e),
                (this.cancelable = !!i),
                (this.timeStamp = new Date().getTime()),
                (this.defaultPrevented = !1),
                (this.propagationStopped = !1),
                (this.immediatePropagationStopped = !1),
                (this.removed = !1);
        }
        var e = t.prototype;
        (e.preventDefault = function () {
            this.defaultPrevented = this.cancelable && !0;
        }),
            (e.stopPropagation = function () {
                this.propagationStopped = !0;
            }),
            (e.stopImmediatePropagation = function () {
                this.immediatePropagationStopped = this.propagationStopped = !0;
            }),
            (e.remove = function () {
                this.removed = !0;
            }),
            (e.clone = function () {
                return new t(this.type, this.bubbles, this.cancelable);
            }),
            (e.set = function (t) {
                for (var e in t) this[e] = t[e];
                return this;
            }),
            (e.toString = function () {
                return "[Event (type=" + this.type + ")]";
            }),
            (createjs.Event = t);
    })(),
    (this.createjs = this.createjs || {}),
    (function () {
        "use strict";
        function t() {
            (this._listeners = null), (this._captureListeners = null);
        }
        var e = t.prototype;
        (t.initialize = function (t) {
            (t.addEventListener = e.addEventListener),
                (t.on = e.on),
                (t.removeEventListener = t.off = e.removeEventListener),
                (t.removeAllEventListeners = e.removeAllEventListeners),
                (t.hasEventListener = e.hasEventListener),
                (t.dispatchEvent = e.dispatchEvent),
                (t._dispatchEvent = e._dispatchEvent),
                (t.willTrigger = e.willTrigger);
        }),
            (e.addEventListener = function (t, e, i) {
                var s,
                    r = (s = i ? (this._captureListeners = this._captureListeners || {}) : (this._listeners = this._listeners || {}))[t];
                return r && this.removeEventListener(t, e, i), (r = s[t]) ? r.push(e) : (s[t] = [e]), e;
            }),
            (e.on = function (t, e, i, s, r, n) {
                return (
                    e.handleEvent && ((i = i || e), (e = e.handleEvent)),
                    (i = i || this),
                    this.addEventListener(
                        t,
                        function (t) {
                            e.call(i, t, r), s && t.remove();
                        },
                        n
                    )
                );
            }),
            (e.removeEventListener = function (t, e, i) {
                var s = i ? this._captureListeners : this._listeners;
                if (s) {
                    var r = s[t];
                    if (r)
                        for (var n = 0, a = r.length; a > n; n++)
                            if (r[n] == e) {
                                1 == a ? delete s[t] : r.splice(n, 1);
                                break;
                            }
                }
            }),
            (e.off = e.removeEventListener),
            (e.removeAllEventListeners = function (t) {
                t ? (this._listeners && delete this._listeners[t], this._captureListeners && delete this._captureListeners[t]) : (this._listeners = this._captureListeners = null);
            }),
            (e.dispatchEvent = function (t, e, i) {
                if ("string" == typeof t) {
                    var s = this._listeners;
                    if (!(e || (s && s[t]))) return !0;
                    t = new createjs.Event(t, e, i);
                } else t.target && t.clone && (t = t.clone());
                try {
                    t.target = this;
                } catch (t) {}
                if (t.bubbles && this.parent) {
                    for (var r = this, n = [r]; r.parent; ) n.push((r = r.parent));
                    var a,
                        o = n.length;
                    for (a = o - 1; a >= 0 && !t.propagationStopped; a--) n[a]._dispatchEvent(t, 1 + (0 == a));
                    for (a = 1; o > a && !t.propagationStopped; a++) n[a]._dispatchEvent(t, 3);
                } else this._dispatchEvent(t, 2);
                return !t.defaultPrevented;
            }),
            (e.hasEventListener = function (t) {
                var e = this._listeners,
                    i = this._captureListeners;
                return !!((e && e[t]) || (i && i[t]));
            }),
            (e.willTrigger = function (t) {
                for (var e = this; e; ) {
                    if (e.hasEventListener(t)) return !0;
                    e = e.parent;
                }
                return !1;
            }),
            (e.toString = function () {
                return "[EventDispatcher]";
            }),
            (e._dispatchEvent = function (t, e) {
                var i,
                    s,
                    r = 2 >= e ? this._captureListeners : this._listeners;
                if (t && r && (s = r[t.type]) && (i = s.length)) {
                    try {
                        t.currentTarget = this;
                    } catch (t) {}
                    try {
                        t.eventPhase = 0 | e;
                    } catch (t) {}
                    (t.removed = !1), (s = s.slice());
                    for (var n = 0; i > n && !t.immediatePropagationStopped; n++) {
                        var a = s[n];
                        a.handleEvent ? a.handleEvent(t) : a(t), t.removed && (this.off(t.type, a, 1 == e), (t.removed = !1));
                    }
                }
                2 === e && this._dispatchEvent(t, 2.1);
            }),
            (createjs.EventDispatcher = t);
    })(),
    (this.createjs = this.createjs || {}),
    (function () {
        "use strict";
        function t() {
            throw "Ticker cannot be instantiated.";
        }
        (t.RAF_SYNCHED = "synched"),
            (t.RAF = "raf"),
            (t.TIMEOUT = "timeout"),
            (t.timingMode = null),
            (t.maxDelta = 0),
            (t.paused = !1),
            (t.removeEventListener = null),
            (t.removeAllEventListeners = null),
            (t.dispatchEvent = null),
            (t.hasEventListener = null),
            (t._listeners = null),
            createjs.EventDispatcher.initialize(t),
            (t._addEventListener = t.addEventListener),
            (t.addEventListener = function () {
                return !t._inited && t.init(), t._addEventListener.apply(t, arguments);
            }),
            (t._inited = !1),
            (t._startTime = 0),
            (t._pausedTime = 0),
            (t._ticks = 0),
            (t._pausedTicks = 0),
            (t._interval = 50),
            (t._lastTime = 0),
            (t._times = null),
            (t._tickTimes = null),
            (t._timerId = null),
            (t._raf = !0),
            (t._setInterval = function (e) {
                (t._interval = e), t._inited && t._setupTick();
            }),
            (t.setInterval = createjs.deprecate(t._setInterval, "Ticker.setInterval")),
            (t._getInterval = function () {
                return t._interval;
            }),
            (t.getInterval = createjs.deprecate(t._getInterval, "Ticker.getInterval")),
            (t._setFPS = function (e) {
                t._setInterval(1e3 / e);
            }),
            (t.setFPS = createjs.deprecate(t._setFPS, "Ticker.setFPS")),
            (t._getFPS = function () {
                return 1e3 / t._interval;
            }),
            (t.getFPS = createjs.deprecate(t._getFPS, "Ticker.getFPS"));
        try {
            Object.defineProperties(t, { interval: { get: t._getInterval, set: t._setInterval }, framerate: { get: t._getFPS, set: t._setFPS } });
        } catch (t) {
            console.log(t);
        }
        (t.init = function () {
            t._inited || ((t._inited = !0), (t._times = []), (t._tickTimes = []), (t._startTime = t._getTime()), t._times.push((t._lastTime = 0)), (t.interval = t._interval));
        }),
            (t.reset = function () {
                if (t._raf) {
                    var e = window.cancelAnimationFrame || window.webkitCancelAnimationFrame || window.mozCancelAnimationFrame || window.oCancelAnimationFrame || window.msCancelAnimationFrame;
                    e && e(t._timerId);
                } else clearTimeout(t._timerId);
                t.removeAllEventListeners("tick"), (t._timerId = t._times = t._tickTimes = null), (t._startTime = t._lastTime = t._ticks = t._pausedTime = 0), (t._inited = !1);
            }),
            (t.getMeasuredTickTime = function (e) {
                var i = 0,
                    s = t._tickTimes;
                if (!s || s.length < 1) return -1;
                e = Math.min(s.length, e || 0 | t._getFPS());
                for (var r = 0; e > r; r++) i += s[r];
                return i / e;
            }),
            (t.getMeasuredFPS = function (e) {
                var i = t._times;
                return !i || i.length < 2 ? -1 : ((e = Math.min(i.length - 1, e || 0 | t._getFPS())), 1e3 / ((i[0] - i[e]) / e));
            }),
            (t.getTime = function (e) {
                return t._startTime ? t._getTime() - (e ? t._pausedTime : 0) : -1;
            }),
            (t.getEventTime = function (e) {
                return t._startTime ? (t._lastTime || t._startTime) - (e ? t._pausedTime : 0) : -1;
            }),
            (t.getTicks = function (e) {
                return t._ticks - (e ? t._pausedTicks : 0);
            }),
            (t._handleSynch = function () {
                (t._timerId = null), t._setupTick(), t._getTime() - t._lastTime >= 0.97 * (t._interval - 1) && t._tick();
            }),
            (t._handleRAF = function () {
                (t._timerId = null), t._setupTick(), t._tick();
            }),
            (t._handleTimeout = function () {
                (t._timerId = null),
                    setTimeout(function () {
                        t._setupTick(), t._tick();
                    }, 0);
            }),
            (t._setupTick = function () {
                if (null == t._timerId) {
                    var e = t.timingMode;
                    if (e == t.RAF_SYNCHED || e == t.RAF) {
                        var i = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame;
                        if (i) return (t._timerId = i(e == t.RAF ? t._handleRAF : t._handleSynch)), void (t._raf = !0);
                    }
                    (t._raf = !1), (t._timerId = setTimeout(t._handleTimeout, t._interval));
                }
            }),
            (t._tick = function () {
                var e = t.paused,
                    i = t._getTime(),
                    s = i - t._lastTime;
                if (((t._lastTime = i), t._ticks++, e && (t._pausedTicks++, (t._pausedTime += s)), t.hasEventListener("tick"))) {
                    var r = new createjs.Event("tick");
                    (r.delta = t.maxDelta && s > t.maxDelta ? t.maxDelta : s), (r.paused = e), (r.time = i), (r.runTime = i - t._pausedTime), t.dispatchEvent(r);
                }
                for (t._tickTimes.unshift(t._getTime() - i); t._tickTimes.length > 100; ) t._tickTimes.pop();
                for (t._times.unshift(i); t._times.length > 100; ) t._times.pop();
            });
        var e = window,
            i = e.performance.now || e.performance.mozNow || e.performance.msNow || e.performance.oNow || e.performance.webkitNow;
        (t._getTime = function () {
            return ((i && i.call(e.performance)) || new Date().getTime()) - t._startTime;
        }),
            (createjs.Ticker = t);
    })(),
    (this.createjs = this.createjs || {}),
    (function () {
        "use strict";
        function t(t) {
            (this.readyState = t.readyState), (this._video = t), (this._canvas = null), (this._lastTime = -1), this.readyState < 2 && t.addEventListener("canplaythrough", this._videoReady.bind(this));
        }
        var e = t.prototype;
        (e.getImage = function () {
            if (!(this.readyState < 2)) {
                var t = this._canvas,
                    e = this._video;
                if (
                    (t || (((t = this._canvas = createjs.createCanvas ? createjs.createCanvas() : document.createElement("canvas")).width = e.videoWidth), (t.height = e.videoHeight)), e.readyState >= 2 && e.currentTime !== this._lastTime)
                ) {
                    var i = t.getContext("2d");
                    i.clearRect(0, 0, t.width, t.height), i.drawImage(e, 0, 0, t.width, t.height), (this._lastTime = e.currentTime);
                }
                return t;
            }
        }),
            (e._videoReady = function () {
                this.readyState = 2;
            }),
            (createjs.VideoBuffer = t);
    })(),
    (this.createjs = this.createjs || {}),
    (function () {
        "use strict";
        function t(t, e, i, s, r, n, a, o, h, c, u) {
            this.Event_constructor(t, e, i),
                (this.stageX = s),
                (this.stageY = r),
                (this.rawX = null == h ? s : h),
                (this.rawY = null == c ? r : c),
                (this.nativeEvent = n),
                (this.pointerID = a),
                (this.primary = !!o),
                (this.relatedTarget = u);
        }
        var e = createjs.extend(t, createjs.Event);
        (e._get_localX = function () {
            return this.currentTarget.globalToLocal(this.rawX, this.rawY).x;
        }),
            (e._get_localY = function () {
                return this.currentTarget.globalToLocal(this.rawX, this.rawY).y;
            }),
            (e._get_isTouch = function () {
                return -1 !== this.pointerID;
            });
        try {
            Object.defineProperties(e, { localX: { get: e._get_localX }, localY: { get: e._get_localY }, isTouch: { get: e._get_isTouch } });
        } catch (t) {}
        (e.clone = function () {
            return new t(this.type, this.bubbles, this.cancelable, this.stageX, this.stageY, this.nativeEvent, this.pointerID, this.primary, this.rawX, this.rawY);
        }),
            (e.toString = function () {
                return "[MouseEvent (type=" + this.type + " stageX=" + this.stageX + " stageY=" + this.stageY + ")]";
            }),
            (createjs.MouseEvent = createjs.promote(t, "Event"));
    })(),
    (this.createjs = this.createjs || {}),
    (function () {
        "use strict";
        function t(t, e, i, s, r, n) {
            this.setValues(t, e, i, s, r, n);
        }
        var e = t.prototype;
        (t.DEG_TO_RAD = Math.PI / 180),
            (t.identity = null),
            (e.setValues = function (t, e, i, s, r, n) {
                return (this.a = null == t ? 1 : t), (this.b = e || 0), (this.c = i || 0), (this.d = null == s ? 1 : s), (this.tx = r || 0), (this.ty = n || 0), this;
            }),
            (e.append = function (t, e, i, s, r, n) {
                var a = this.a,
                    o = this.b,
                    h = this.c,
                    c = this.d;
                return (
                    (1 != t || 0 != e || 0 != i || 1 != s) && ((this.a = a * t + h * e), (this.b = o * t + c * e), (this.c = a * i + h * s), (this.d = o * i + c * s)),
                    (this.tx = a * r + h * n + this.tx),
                    (this.ty = o * r + c * n + this.ty),
                    this
                );
            }),
            (e.prepend = function (t, e, i, s, r, n) {
                var a = this.a,
                    o = this.c,
                    h = this.tx;
                return (this.a = t * a + i * this.b), (this.b = e * a + s * this.b), (this.c = t * o + i * this.d), (this.d = e * o + s * this.d), (this.tx = t * h + i * this.ty + r), (this.ty = e * h + s * this.ty + n), this;
            }),
            (e.appendMatrix = function (t) {
                return this.append(t.a, t.b, t.c, t.d, t.tx, t.ty);
            }),
            (e.prependMatrix = function (t) {
                return this.prepend(t.a, t.b, t.c, t.d, t.tx, t.ty);
            }),
            (e.appendTransform = function (e, i, s, r, n, a, o, h, c) {
                if (n % 360)
                    var u = n * t.DEG_TO_RAD,
                        l = Math.cos(u),
                        d = Math.sin(u);
                else (l = 1), (d = 0);
                return (
                    a || o
                        ? ((a *= t.DEG_TO_RAD), (o *= t.DEG_TO_RAD), this.append(Math.cos(o), Math.sin(o), -Math.sin(a), Math.cos(a), e, i), this.append(l * s, d * s, -d * r, l * r, 0, 0))
                        : this.append(l * s, d * s, -d * r, l * r, e, i),
                    (h || c) && ((this.tx -= h * this.a + c * this.c), (this.ty -= h * this.b + c * this.d)),
                    this
                );
            }),
            (e.prependTransform = function (e, i, s, r, n, a, o, h, c) {
                if (n % 360)
                    var u = n * t.DEG_TO_RAD,
                        l = Math.cos(u),
                        d = Math.sin(u);
                else (l = 1), (d = 0);
                return (
                    (h || c) && ((this.tx -= h), (this.ty -= c)),
                    a || o
                        ? ((a *= t.DEG_TO_RAD), (o *= t.DEG_TO_RAD), this.prepend(l * s, d * s, -d * r, l * r, 0, 0), this.prepend(Math.cos(o), Math.sin(o), -Math.sin(a), Math.cos(a), e, i))
                        : this.prepend(l * s, d * s, -d * r, l * r, e, i),
                    this
                );
            }),
            (e.rotate = function (e) {
                e *= t.DEG_TO_RAD;
                var i = Math.cos(e),
                    s = Math.sin(e),
                    r = this.a,
                    n = this.b;
                return (this.a = r * i + this.c * s), (this.b = n * i + this.d * s), (this.c = -r * s + this.c * i), (this.d = -n * s + this.d * i), this;
            }),
            (e.skew = function (e, i) {
                return (e *= t.DEG_TO_RAD), (i *= t.DEG_TO_RAD), this.append(Math.cos(i), Math.sin(i), -Math.sin(e), Math.cos(e), 0, 0), this;
            }),
            (e.scale = function (t, e) {
                return (this.a *= t), (this.b *= t), (this.c *= e), (this.d *= e), this;
            }),
            (e.translate = function (t, e) {
                return (this.tx += this.a * t + this.c * e), (this.ty += this.b * t + this.d * e), this;
            }),
            (e.identity = function () {
                return (this.a = this.d = 1), (this.b = this.c = this.tx = this.ty = 0), this;
            }),
            (e.invert = function () {
                var t = this.a,
                    e = this.b,
                    i = this.c,
                    s = this.d,
                    r = this.tx,
                    n = t * s - e * i;
                return (this.a = s / n), (this.b = -e / n), (this.c = -i / n), (this.d = t / n), (this.tx = (i * this.ty - s * r) / n), (this.ty = -(t * this.ty - e * r) / n), this;
            }),
            (e.isIdentity = function () {
                return 0 === this.tx && 0 === this.ty && 1 === this.a && 0 === this.b && 0 === this.c && 1 === this.d;
            }),
            (e.equals = function (t) {
                return this.tx === t.tx && this.ty === t.ty && this.a === t.a && this.b === t.b && this.c === t.c && this.d === t.d;
            }),
            (e.transformPoint = function (t, e, i) {
                return ((i = i || {}).x = t * this.a + e * this.c + this.tx), (i.y = t * this.b + e * this.d + this.ty), i;
            }),
            (e.decompose = function (e) {
                null == e && (e = {}), (e.x = this.tx), (e.y = this.ty), (e.scaleX = Math.sqrt(this.a * this.a + this.b * this.b)), (e.scaleY = Math.sqrt(this.c * this.c + this.d * this.d));
                var i = Math.atan2(-this.c, this.d),
                    s = Math.atan2(this.b, this.a);
                return (
                    1e-5 > Math.abs(1 - i / s)
                        ? ((e.rotation = s / t.DEG_TO_RAD), this.a < 0 && this.d >= 0 && (e.rotation += e.rotation <= 0 ? 180 : -180), (e.skewX = e.skewY = 0))
                        : ((e.skewX = i / t.DEG_TO_RAD), (e.skewY = s / t.DEG_TO_RAD)),
                    e
                );
            }),
            (e.copy = function (t) {
                return this.setValues(t.a, t.b, t.c, t.d, t.tx, t.ty);
            }),
            (e.clone = function () {
                return new t(this.a, this.b, this.c, this.d, this.tx, this.ty);
            }),
            (e.toString = function () {
                return "[Matrix2D (a=" + this.a + " b=" + this.b + " c=" + this.c + " d=" + this.d + " tx=" + this.tx + " ty=" + this.ty + ")]";
            }),
            (t.identity = new t()),
            (createjs.Matrix2D = t);
    })(),
    (this.createjs = this.createjs || {}),
    (function () {
        "use strict";
        function t(t, e, i, s, r) {
            this.setValues(t, e, i, s, r);
        }
        var e = t.prototype;
        (e.setValues = function (t, e, i, s, r) {
            return (this.visible = null == t || !!t), (this.alpha = null == e ? 1 : e), (this.shadow = i), (this.compositeOperation = s), (this.matrix = r || (this.matrix && this.matrix.identity()) || new createjs.Matrix2D()), this;
        }),
            (e.append = function (t, e, i, s, r) {
                return (this.alpha *= e), (this.shadow = i || this.shadow), (this.compositeOperation = s || this.compositeOperation), (this.visible = this.visible && t), r && this.matrix.appendMatrix(r), this;
            }),
            (e.prepend = function (t, e, i, s, r) {
                return (this.alpha *= e), (this.shadow = this.shadow || i), (this.compositeOperation = this.compositeOperation || s), (this.visible = this.visible && t), r && this.matrix.prependMatrix(r), this;
            }),
            (e.identity = function () {
                return (this.visible = !0), (this.alpha = 1), (this.shadow = this.compositeOperation = null), this.matrix.identity(), this;
            }),
            (e.clone = function () {
                return new t(this.alpha, this.shadow, this.compositeOperation, this.visible, this.matrix.clone());
            }),
            (createjs.DisplayProps = t);
    })(),
    (this.createjs = this.createjs || {}),
    (function () {
        "use strict";
        function t(t, e) {
            this.setValues(t, e);
        }
        var e = t.prototype;
        (e.setValues = function (t, e) {
            return (this.x = t || 0), (this.y = e || 0), this;
        }),
            (e.copy = function (t) {
                return (this.x = t.x), (this.y = t.y), this;
            }),
            (e.clone = function () {
                return new t(this.x, this.y);
            }),
            (e.toString = function () {
                return "[Point (x=" + this.x + " y=" + this.y + ")]";
            }),
            (createjs.Point = t);
    })(),
    (this.createjs = this.createjs || {}),
    (function () {
        "use strict";
        function t(t, e, i, s) {
            this.setValues(t, e, i, s);
        }
        var e = t.prototype;
        (e.setValues = function (t, e, i, s) {
            return (this.x = t || 0), (this.y = e || 0), (this.width = i || 0), (this.height = s || 0), this;
        }),
            (e.extend = function (t, e, i, s) {
                return (
                    (s = s || 0),
                    t + (i = i || 0) > this.x + this.width && (this.width = t + i - this.x),
                    e + s > this.y + this.height && (this.height = e + s - this.y),
                    t < this.x && ((this.width += this.x - t), (this.x = t)),
                    e < this.y && ((this.height += this.y - e), (this.y = e)),
                    this
                );
            }),
            (e.pad = function (t, e, i, s) {
                return (this.x -= e), (this.y -= t), (this.width += e + s), (this.height += t + i), this;
            }),
            (e.copy = function (t) {
                return this.setValues(t.x, t.y, t.width, t.height);
            }),
            (e.contains = function (t, e, i, s) {
                return (i = i || 0), (s = s || 0), t >= this.x && t + i <= this.x + this.width && e >= this.y && e + s <= this.y + this.height;
            }),
            (e.union = function (t) {
                return this.clone().extend(t.x, t.y, t.width, t.height);
            }),
            (e.intersection = function (e) {
                var i = e.x,
                    s = e.y,
                    r = i + e.width,
                    n = s + e.height;
                return (
                    this.x > i && (i = this.x), this.y > s && (s = this.y), this.x + this.width < r && (r = this.x + this.width), this.y + this.height < n && (n = this.y + this.height), i >= r || s >= n ? null : new t(i, s, r - i, n - s)
                );
            }),
            (e.intersects = function (t) {
                return t.x <= this.x + this.width && this.x <= t.x + t.width && t.y <= this.y + this.height && this.y <= t.y + t.height;
            }),
            (e.isEmpty = function () {
                return this.width <= 0 || this.height <= 0;
            }),
            (e.clone = function () {
                return new t(this.x, this.y, this.width, this.height);
            }),
            (e.toString = function () {
                return "[Rectangle (x=" + this.x + " y=" + this.y + " width=" + this.width + " height=" + this.height + ")]";
            }),
            (createjs.Rectangle = t);
    })(),
    (this.createjs = this.createjs || {}),
    (function () {
        "use strict";
        function t(t, e, i, s, r, n, a) {
            t.addEventListener &&
                ((this.target = t),
                (this.overLabel = null == i ? "over" : i),
                (this.outLabel = null == e ? "out" : e),
                (this.downLabel = null == s ? "down" : s),
                (this.play = r),
                (this._isPressed = !1),
                (this._isOver = !1),
                (this._enabled = !1),
                (t.mouseChildren = !1),
                (this.enabled = !0),
                this.handleEvent({}),
                n && (a && ((n.actionsEnabled = !1), n.gotoAndStop && n.gotoAndStop(a)), (t.hitArea = n)));
        }
        var e = t.prototype;
        (e._setEnabled = function (t) {
            if (t != this._enabled) {
                var e = this.target;
                (this._enabled = t),
                    t
                        ? ((e.cursor = "pointer"),
                          e.addEventListener("rollover", this),
                          e.addEventListener("rollout", this),
                          e.addEventListener("mousedown", this),
                          e.addEventListener("pressup", this),
                          e._reset && ((e.__reset = e._reset), (e._reset = this._reset)))
                        : ((e.cursor = null),
                          e.removeEventListener("rollover", this),
                          e.removeEventListener("rollout", this),
                          e.removeEventListener("mousedown", this),
                          e.removeEventListener("pressup", this),
                          e.__reset && ((e._reset = e.__reset), delete e.__reset));
            }
        }),
            (e.setEnabled = createjs.deprecate(e._setEnabled, "ButtonHelper.setEnabled")),
            (e._getEnabled = function () {
                return this._enabled;
            }),
            (e.getEnabled = createjs.deprecate(e._getEnabled, "ButtonHelper.getEnabled"));
        try {
            Object.defineProperties(e, { enabled: { get: e._getEnabled, set: e._setEnabled } });
        } catch (t) {}
        (e.toString = function () {
            return "[ButtonHelper]";
        }),
            (e.handleEvent = function (t) {
                var e,
                    i = this.target,
                    s = t.type;
                "mousedown" == s
                    ? ((this._isPressed = !0), (e = this.downLabel))
                    : "pressup" == s
                    ? ((this._isPressed = !1), (e = this._isOver ? this.overLabel : this.outLabel))
                    : "rollover" == s
                    ? ((this._isOver = !0), (e = this._isPressed ? this.downLabel : this.overLabel))
                    : ((this._isOver = !1), (e = this._isPressed ? this.overLabel : this.outLabel)),
                    this.play ? i.gotoAndPlay && i.gotoAndPlay(e) : i.gotoAndStop && i.gotoAndStop(e);
            }),
            (e._reset = function () {
                var t = this.paused;
                this.__reset(), (this.paused = t);
            }),
            (createjs.ButtonHelper = t);
    })(),
    (this.createjs = this.createjs || {}),
    (function () {
        "use strict";
        function t(t, e, i, s) {
            (this.color = t || "black"), (this.offsetX = e || 0), (this.offsetY = i || 0), (this.blur = s || 0);
        }
        var e = t.prototype;
        (t.identity = new t("transparent", 0, 0, 0)),
            (e.toString = function () {
                return "[Shadow]";
            }),
            (e.clone = function () {
                return new t(this.color, this.offsetX, this.offsetY, this.blur);
            }),
            (createjs.Shadow = t);
    })(),
    (this.createjs = this.createjs || {}),
    (function () {
        "use strict";
        function t(t) {
            this.EventDispatcher_constructor(),
                (this.complete = !0),
                (this.framerate = 0),
                (this._animations = null),
                (this._frames = null),
                (this._images = null),
                (this._data = null),
                (this._loadCount = 0),
                (this._frameHeight = 0),
                (this._frameWidth = 0),
                (this._numFrames = 0),
                (this._regX = 0),
                (this._regY = 0),
                (this._spacing = 0),
                (this._margin = 0),
                this._parseData(t);
        }
        var e = createjs.extend(t, createjs.EventDispatcher);
        (e._getAnimations = function () {
            return this._animations.slice();
        }),
            (e.getAnimations = createjs.deprecate(e._getAnimations, "SpriteSheet.getAnimations"));
        try {
            Object.defineProperties(e, { animations: { get: e._getAnimations } });
        } catch (t) {}
        (e.getNumFrames = function (t) {
            if (null == t) return this._frames ? this._frames.length : this._numFrames || 0;
            var e = this._data[t];
            return null == e ? 0 : e.frames.length;
        }),
            (e.getAnimation = function (t) {
                return this._data[t];
            }),
            (e.getFrame = function (t) {
                var e;
                return this._frames && (e = this._frames[t]) ? e : null;
            }),
            (e.getFrameBounds = function (t, e) {
                var i = this.getFrame(t);
                return i ? (e || new createjs.Rectangle()).setValues(-i.regX, -i.regY, i.rect.width, i.rect.height) : null;
            }),
            (e.toString = function () {
                return "[SpriteSheet]";
            }),
            (e.clone = function () {
                throw "SpriteSheet cannot be cloned.";
            }),
            (e._parseData = function (t) {
                var e, i, s, r;
                if (null != t) {
                    if (((this.framerate = t.framerate || 0), t.images && (i = t.images.length) > 0))
                        for (r = this._images = [], e = 0; i > e; e++) {
                            var n = t.images[e];
                            if ("string" == typeof n) {
                                var a = n;
                                (n = document.createElement("img")).src = a;
                            }
                            r.push(n),
                                n.getContext ||
                                    n.naturalWidth ||
                                    (this._loadCount++,
                                    (this.complete = !1),
                                    (function (t, e) {
                                        n.onload = function () {
                                            t._handleImageLoad(e);
                                        };
                                    })(this, a),
                                    (function (t, e) {
                                        n.onerror = function () {
                                            t._handleImageError(e);
                                        };
                                    })(this, a));
                        }
                    if (null == t.frames);
                    else if (Array.isArray(t.frames))
                        for (this._frames = [], e = 0, i = (r = t.frames).length; i > e; e++) {
                            var o = r[e];
                            this._frames.push({ image: this._images[o[4] ? o[4] : 0], rect: new createjs.Rectangle(o[0], o[1], o[2], o[3]), regX: o[5] || 0, regY: o[6] || 0 });
                        }
                    else
                        (s = t.frames),
                            (this._frameWidth = s.width),
                            (this._frameHeight = s.height),
                            (this._regX = s.regX || 0),
                            (this._regY = s.regY || 0),
                            (this._spacing = s.spacing || 0),
                            (this._margin = s.margin || 0),
                            (this._numFrames = s.count),
                            0 == this._loadCount && this._calculateFrames();
                    var h;
                    if (((this._animations = []), null != (s = t.animations)))
                        for (h in ((this._data = {}), s)) {
                            var c = { name: h },
                                u = s[h];
                            if ("number" == typeof u) r = c.frames = [u];
                            else if (Array.isArray(u))
                                if (1 == u.length) c.frames = [u[0]];
                                else for (c.speed = u[3], c.next = u[2], r = c.frames = [], e = u[0]; e <= u[1]; e++) r.push(e);
                            else {
                                (c.speed = u.speed), (c.next = u.next);
                                var l = u.frames;
                                r = c.frames = "number" == typeof l ? [l] : l.slice(0);
                            }
                            (!0 === c.next || void 0 === c.next) && (c.next = h), (!1 === c.next || (r.length < 2 && c.next == h)) && (c.next = null), c.speed || (c.speed = 1), this._animations.push(h), (this._data[h] = c);
                        }
                }
            }),
            (e._handleImageLoad = function (t) {
                0 == --this._loadCount && (this._calculateFrames(), (this.complete = !0), this.dispatchEvent("complete"));
            }),
            (e._handleImageError = function (t) {
                var e = new createjs.Event("error");
                (e.src = t), this.dispatchEvent(e), 0 == --this._loadCount && this.dispatchEvent("complete");
            }),
            (e._calculateFrames = function () {
                if (!this._frames && 0 != this._frameWidth) {
                    this._frames = [];
                    var t = this._numFrames || 1e5,
                        e = 0,
                        i = this._frameWidth,
                        s = this._frameHeight,
                        r = this._spacing,
                        n = this._margin;
                    t: for (var a = 0, o = this._images; a < o.length; a++)
                        for (var h = o[a], c = h.width || h.naturalWidth, u = h.height || h.naturalHeight, l = n; u - n - s >= l; ) {
                            for (var d = n; c - n - i >= d; ) {
                                if (e >= t) break t;
                                e++, this._frames.push({ image: h, rect: new createjs.Rectangle(d, l, i, s), regX: this._regX, regY: this._regY }), (d += i + r);
                            }
                            l += s + r;
                        }
                    this._numFrames = e;
                }
            }),
            (createjs.SpriteSheet = createjs.promote(t, "EventDispatcher"));
    })(),
    (this.createjs = this.createjs || {}),
    (function () {
        "use strict";
        function t() {
            (this.command = null),
                (this._stroke = null),
                (this._strokeStyle = null),
                (this._oldStrokeStyle = null),
                (this._strokeDash = null),
                (this._oldStrokeDash = null),
                (this._strokeIgnoreScale = !1),
                (this._fill = null),
                (this._instructions = []),
                (this._commitIndex = 0),
                (this._activeInstructions = []),
                (this._dirty = !1),
                (this._storeIndex = 0),
                this.clear();
        }
        var e = t.prototype,
            i = t;
        (t.getRGB = function (t, e, i, s) {
            return null != t && null == i && ((s = e), (i = 255 & t), (e = (t >> 8) & 255), (t = (t >> 16) & 255)), null == s ? "rgb(" + t + "," + e + "," + i + ")" : "rgba(" + t + "," + e + "," + i + "," + s + ")";
        }),
            (t.getHSL = function (t, e, i, s) {
                return null == s ? "hsl(" + (t % 360) + "," + e + "%," + i + "%)" : "hsla(" + (t % 360) + "," + e + "%," + i + "%," + s + ")";
            }),
            (t.BASE_64 = {
                A: 0,
                B: 1,
                C: 2,
                D: 3,
                E: 4,
                F: 5,
                G: 6,
                H: 7,
                I: 8,
                J: 9,
                K: 10,
                L: 11,
                M: 12,
                N: 13,
                O: 14,
                P: 15,
                Q: 16,
                R: 17,
                S: 18,
                T: 19,
                U: 20,
                V: 21,
                W: 22,
                X: 23,
                Y: 24,
                Z: 25,
                a: 26,
                b: 27,
                c: 28,
                d: 29,
                e: 30,
                f: 31,
                g: 32,
                h: 33,
                i: 34,
                j: 35,
                k: 36,
                l: 37,
                m: 38,
                n: 39,
                o: 40,
                p: 41,
                q: 42,
                r: 43,
                s: 44,
                t: 45,
                u: 46,
                v: 47,
                w: 48,
                x: 49,
                y: 50,
                z: 51,
                0: 52,
                1: 53,
                2: 54,
                3: 55,
                4: 56,
                5: 57,
                6: 58,
                7: 59,
                8: 60,
                9: 61,
                "+": 62,
                "/": 63,
            }),
            (t.STROKE_CAPS_MAP = ["butt", "round", "square"]),
            (t.STROKE_JOINTS_MAP = ["miter", "round", "bevel"]);
        var s = createjs.createCanvas ? createjs.createCanvas() : document.createElement("canvas");
        s.getContext && ((t._ctx = s.getContext("2d")), (s.width = s.height = 1)),
            (e._getInstructions = function () {
                return this._updateInstructions(), this._instructions;
            }),
            (e.getInstructions = createjs.deprecate(e._getInstructions, "Graphics.getInstructions"));
        try {
            Object.defineProperties(e, { instructions: { get: e._getInstructions } });
        } catch (t) {}
        (e.isEmpty = function () {
            return !(this._instructions.length || this._activeInstructions.length);
        }),
            (e.draw = function (t, e) {
                this._updateInstructions();
                for (var i = this._instructions, s = this._storeIndex, r = i.length; r > s; s++) i[s].exec(t, e);
            }),
            (e.drawAsPath = function (t) {
                this._updateInstructions();
                for (var e, i = this._instructions, s = this._storeIndex, r = i.length; r > s; s++) !1 !== (e = i[s]).path && e.exec(t);
            }),
            (e.moveTo = function (t, e) {
                return this.append(new i.MoveTo(t, e), !0);
            }),
            (e.lineTo = function (t, e) {
                return this.append(new i.LineTo(t, e));
            }),
            (e.arcTo = function (t, e, s, r, n) {
                return this.append(new i.ArcTo(t, e, s, r, n));
            }),
            (e.arc = function (t, e, s, r, n, a) {
                return this.append(new i.Arc(t, e, s, r, n, a));
            }),
            (e.quadraticCurveTo = function (t, e, s, r) {
                return this.append(new i.QuadraticCurveTo(t, e, s, r));
            }),
            (e.bezierCurveTo = function (t, e, s, r, n, a) {
                return this.append(new i.BezierCurveTo(t, e, s, r, n, a));
            }),
            (e.rect = function (t, e, s, r) {
                return this.append(new i.Rect(t, e, s, r));
            }),
            (e.closePath = function () {
                return this._activeInstructions.length ? this.append(new i.ClosePath()) : this;
            }),
            (e.clear = function () {
                return (
                    (this._instructions.length = this._activeInstructions.length = this._commitIndex = 0),
                    (this._strokeStyle = this._oldStrokeStyle = this._stroke = this._fill = this._strokeDash = this._oldStrokeDash = null),
                    (this._dirty = this._strokeIgnoreScale = !1),
                    this
                );
            }),
            (e.beginFill = function (t) {
                return this._setFill(t ? new i.Fill(t) : null);
            }),
            (e.beginLinearGradientFill = function (t, e, s, r, n, a) {
                return this._setFill(new i.Fill().linearGradient(t, e, s, r, n, a));
            }),
            (e.beginRadialGradientFill = function (t, e, s, r, n, a, o, h) {
                return this._setFill(new i.Fill().radialGradient(t, e, s, r, n, a, o, h));
            }),
            (e.beginBitmapFill = function (t, e, s) {
                return this._setFill(new i.Fill(null, s).bitmap(t, e));
            }),
            (e.endFill = function () {
                return this.beginFill();
            }),
            (e.setStrokeStyle = function (t, e, s, r, n) {
                return this._updateInstructions(!0), (this._strokeStyle = this.command = new i.StrokeStyle(t, e, s, r, n)), this._stroke && (this._stroke.ignoreScale = n), (this._strokeIgnoreScale = n), this;
            }),
            (e.setStrokeDash = function (t, e) {
                return this._updateInstructions(!0), (this._strokeDash = this.command = new i.StrokeDash(t, e)), this;
            }),
            (e.beginStroke = function (t) {
                return this._setStroke(t ? new i.Stroke(t) : null);
            }),
            (e.beginLinearGradientStroke = function (t, e, s, r, n, a) {
                return this._setStroke(new i.Stroke().linearGradient(t, e, s, r, n, a));
            }),
            (e.beginRadialGradientStroke = function (t, e, s, r, n, a, o, h) {
                return this._setStroke(new i.Stroke().radialGradient(t, e, s, r, n, a, o, h));
            }),
            (e.beginBitmapStroke = function (t, e) {
                return this._setStroke(new i.Stroke().bitmap(t, e));
            }),
            (e.endStroke = function () {
                return this.beginStroke();
            }),
            (e.curveTo = e.quadraticCurveTo),
            (e.drawRect = e.rect),
            (e.drawRoundRect = function (t, e, i, s, r) {
                return this.drawRoundRectComplex(t, e, i, s, r, r, r, r);
            }),
            (e.drawRoundRectComplex = function (t, e, s, r, n, a, o, h) {
                return this.append(new i.RoundRect(t, e, s, r, n, a, o, h));
            }),
            (e.drawCircle = function (t, e, s) {
                return this.append(new i.Circle(t, e, s));
            }),
            (e.drawEllipse = function (t, e, s, r) {
                return this.append(new i.Ellipse(t, e, s, r));
            }),
            (e.drawPolyStar = function (t, e, s, r, n, a) {
                return this.append(new i.PolyStar(t, e, s, r, n, a));
            }),
            (e.append = function (t, e) {
                return this._activeInstructions.push(t), (this.command = t), e || (this._dirty = !0), this;
            }),
            (e.decodePath = function (e) {
                for (var i = [this.moveTo, this.lineTo, this.quadraticCurveTo, this.bezierCurveTo, this.closePath], s = [2, 2, 4, 6, 0], r = 0, n = e.length, a = [], o = 0, h = 0, c = t.BASE_64; n > r; ) {
                    var u = e.charAt(r),
                        l = c[u],
                        d = l >> 3,
                        _ = i[d];
                    if (!_ || 3 & l) throw "bad path data (@" + r + "): " + u;
                    var p = s[d];
                    d || (o = h = 0), (a.length = 0), r++;
                    for (var f = 2 + ((l >> 2) & 1), g = 0; p > g; g++) {
                        var m = c[e.charAt(r)],
                            v = m >> 5 ? -1 : 1;
                        (m = ((31 & m) << 6) | c[e.charAt(r + 1)]), 3 == f && (m = (m << 6) | c[e.charAt(r + 2)]), (m = (v * m) / 10), g % 2 ? (o = m += o) : (h = m += h), (a[g] = m), (r += f);
                    }
                    _.apply(this, a);
                }
                return this;
            }),
            (e.store = function () {
                return this._updateInstructions(!0), (this._storeIndex = this._instructions.length), this;
            }),
            (e.unstore = function () {
                return (this._storeIndex = 0), this;
            }),
            (e.clone = function () {
                var e = new t();
                return (
                    (e.command = this.command),
                    (e._stroke = this._stroke),
                    (e._strokeStyle = this._strokeStyle),
                    (e._strokeDash = this._strokeDash),
                    (e._strokeIgnoreScale = this._strokeIgnoreScale),
                    (e._fill = this._fill),
                    (e._instructions = this._instructions.slice()),
                    (e._commitIndex = this._commitIndex),
                    (e._activeInstructions = this._activeInstructions.slice()),
                    (e._dirty = this._dirty),
                    (e._storeIndex = this._storeIndex),
                    e
                );
            }),
            (e.toString = function () {
                return "[Graphics]";
            }),
            (e.mt = e.moveTo),
            (e.lt = e.lineTo),
            (e.at = e.arcTo),
            (e.bt = e.bezierCurveTo),
            (e.qt = e.quadraticCurveTo),
            (e.a = e.arc),
            (e.r = e.rect),
            (e.cp = e.closePath),
            (e.c = e.clear),
            (e.f = e.beginFill),
            (e.lf = e.beginLinearGradientFill),
            (e.rf = e.beginRadialGradientFill),
            (e.bf = e.beginBitmapFill),
            (e.ef = e.endFill),
            (e.ss = e.setStrokeStyle),
            (e.sd = e.setStrokeDash),
            (e.s = e.beginStroke),
            (e.ls = e.beginLinearGradientStroke),
            (e.rs = e.beginRadialGradientStroke),
            (e.bs = e.beginBitmapStroke),
            (e.es = e.endStroke),
            (e.dr = e.drawRect),
            (e.rr = e.drawRoundRect),
            (e.rc = e.drawRoundRectComplex),
            (e.dc = e.drawCircle),
            (e.de = e.drawEllipse),
            (e.dp = e.drawPolyStar),
            (e.p = e.decodePath),
            (e._updateInstructions = function (e) {
                var i = this._instructions,
                    s = this._activeInstructions,
                    r = this._commitIndex;
                if (this._dirty && s.length) {
                    (i.length = r), i.push(t.beginCmd);
                    var n = s.length,
                        a = i.length;
                    i.length = a + n;
                    for (var o = 0; n > o; o++) i[o + a] = s[o];
                    this._fill && i.push(this._fill),
                        this._stroke &&
                            (this._strokeDash !== this._oldStrokeDash && i.push(this._strokeDash),
                            this._strokeStyle !== this._oldStrokeStyle && i.push(this._strokeStyle),
                            e && ((this._oldStrokeStyle = this._strokeStyle), (this._oldStrokeDash = this._strokeDash)),
                            i.push(this._stroke)),
                        (this._dirty = !1);
                }
                e && ((s.length = 0), (this._commitIndex = i.length));
            }),
            (e._setFill = function (t) {
                return this._updateInstructions(!0), (this.command = this._fill = t), this;
            }),
            (e._setStroke = function (t) {
                return this._updateInstructions(!0), (this.command = this._stroke = t) && (t.ignoreScale = this._strokeIgnoreScale), this;
            }),
            ((i.LineTo = function (t, e) {
                (this.x = t), (this.y = e);
            }).prototype.exec = function (t) {
                t.lineTo(this.x, this.y);
            }),
            ((i.MoveTo = function (t, e) {
                (this.x = t), (this.y = e);
            }).prototype.exec = function (t) {
                t.moveTo(this.x, this.y);
            }),
            ((i.ArcTo = function (t, e, i, s, r) {
                (this.x1 = t), (this.y1 = e), (this.x2 = i), (this.y2 = s), (this.radius = r);
            }).prototype.exec = function (t) {
                t.arcTo(this.x1, this.y1, this.x2, this.y2, this.radius);
            }),
            ((i.Arc = function (t, e, i, s, r, n) {
                (this.x = t), (this.y = e), (this.radius = i), (this.startAngle = s), (this.endAngle = r), (this.anticlockwise = !!n);
            }).prototype.exec = function (t) {
                t.arc(this.x, this.y, this.radius, this.startAngle, this.endAngle, this.anticlockwise);
            }),
            ((i.QuadraticCurveTo = function (t, e, i, s) {
                (this.cpx = t), (this.cpy = e), (this.x = i), (this.y = s);
            }).prototype.exec = function (t) {
                t.quadraticCurveTo(this.cpx, this.cpy, this.x, this.y);
            }),
            ((i.BezierCurveTo = function (t, e, i, s, r, n) {
                (this.cp1x = t), (this.cp1y = e), (this.cp2x = i), (this.cp2y = s), (this.x = r), (this.y = n);
            }).prototype.exec = function (t) {
                t.bezierCurveTo(this.cp1x, this.cp1y, this.cp2x, this.cp2y, this.x, this.y);
            }),
            ((i.Rect = function (t, e, i, s) {
                (this.x = t), (this.y = e), (this.w = i), (this.h = s);
            }).prototype.exec = function (t) {
                t.rect(this.x, this.y, this.w, this.h);
            }),
            ((i.ClosePath = function () {}).prototype.exec = function (t) {
                t.closePath();
            }),
            ((i.BeginPath = function () {}).prototype.exec = function (t) {
                t.beginPath();
            }),
            (e = (i.Fill = function (t, e) {
                (this.style = t), (this.matrix = e);
            }).prototype),
            (e.exec = function (t) {
                if (this.style) {
                    t.fillStyle = this.style;
                    var e = this.matrix;
                    e && (t.save(), t.transform(e.a, e.b, e.c, e.d, e.tx, e.ty)), t.fill(), e && t.restore();
                }
            }),
            (e.linearGradient = function (e, i, s, r, n, a) {
                for (var o = (this.style = t._ctx.createLinearGradient(s, r, n, a)), h = 0, c = e.length; c > h; h++) o.addColorStop(i[h], e[h]);
                return (o.props = { colors: e, ratios: i, x0: s, y0: r, x1: n, y1: a, type: "linear" }), this;
            }),
            (e.radialGradient = function (e, i, s, r, n, a, o, h) {
                for (var c = (this.style = t._ctx.createRadialGradient(s, r, n, a, o, h)), u = 0, l = e.length; l > u; u++) c.addColorStop(i[u], e[u]);
                return (c.props = { colors: e, ratios: i, x0: s, y0: r, r0: n, x1: a, y1: o, r1: h, type: "radial" }), this;
            }),
            (e.bitmap = function (e, i) {
                (e.naturalWidth || e.getContext || e.readyState >= 2) && ((this.style = t._ctx.createPattern(e, i || "")).props = { image: e, repetition: i, type: "bitmap" });
                return this;
            }),
            (e.path = !1),
            (e = (i.Stroke = function (t, e) {
                (this.style = t), (this.ignoreScale = e);
            }).prototype),
            (e.exec = function (t) {
                this.style && ((t.strokeStyle = this.style), this.ignoreScale && (t.save(), t.setTransform(1, 0, 0, 1, 0, 0)), t.stroke(), this.ignoreScale && t.restore());
            }),
            (e.linearGradient = i.Fill.prototype.linearGradient),
            (e.radialGradient = i.Fill.prototype.radialGradient),
            (e.bitmap = i.Fill.prototype.bitmap),
            (e.path = !1),
            (e = (i.StrokeStyle = function (t, e, i, s, r) {
                (this.width = t), (this.caps = e), (this.joints = i), (this.miterLimit = s), (this.ignoreScale = r);
            }).prototype),
            (e.exec = function (e) {
                (e.lineWidth = null == this.width ? "1" : this.width),
                    (e.lineCap = null == this.caps ? "butt" : isNaN(this.caps) ? this.caps : t.STROKE_CAPS_MAP[this.caps]),
                    (e.lineJoin = null == this.joints ? "miter" : isNaN(this.joints) ? this.joints : t.STROKE_JOINTS_MAP[this.joints]),
                    (e.miterLimit = null == this.miterLimit ? "10" : this.miterLimit),
                    (e.ignoreScale = null != this.ignoreScale && this.ignoreScale);
            }),
            (e.path = !1),
            ((i.StrokeDash = function (t, e) {
                (this.segments = t), (this.offset = e || 0);
            }).prototype.exec = function (t) {
                t.setLineDash && (t.setLineDash(this.segments || i.StrokeDash.EMPTY_SEGMENTS), (t.lineDashOffset = this.offset || 0));
            }),
            (i.StrokeDash.EMPTY_SEGMENTS = []),
            ((i.RoundRect = function (t, e, i, s, r, n, a, o) {
                (this.x = t), (this.y = e), (this.w = i), (this.h = s), (this.radiusTL = r), (this.radiusTR = n), (this.radiusBR = a), (this.radiusBL = o);
            }).prototype.exec = function (t) {
                var e = (c > h ? h : c) / 2,
                    i = 0,
                    s = 0,
                    r = 0,
                    n = 0,
                    a = this.x,
                    o = this.y,
                    h = this.w,
                    c = this.h,
                    u = this.radiusTL,
                    l = this.radiusTR,
                    d = this.radiusBR,
                    _ = this.radiusBL;
                0 > u && (u *= i = -1),
                    u > e && (u = e),
                    0 > l && (l *= s = -1),
                    l > e && (l = e),
                    0 > d && (d *= r = -1),
                    d > e && (d = e),
                    0 > _ && (_ *= n = -1),
                    _ > e && (_ = e),
                    t.moveTo(a + h - l, o),
                    t.arcTo(a + h + l * s, o - l * s, a + h, o + l, l),
                    t.lineTo(a + h, o + c - d),
                    t.arcTo(a + h + d * r, o + c + d * r, a + h - d, o + c, d),
                    t.lineTo(a + _, o + c),
                    t.arcTo(a - _ * n, o + c + _ * n, a, o + c - _, _),
                    t.lineTo(a, o + u),
                    t.arcTo(a - u * i, o - u * i, a + u, o, u),
                    t.closePath();
            }),
            ((i.Circle = function (t, e, i) {
                (this.x = t), (this.y = e), (this.radius = i);
            }).prototype.exec = function (t) {
                t.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
            }),
            ((i.Ellipse = function (t, e, i, s) {
                (this.x = t), (this.y = e), (this.w = i), (this.h = s);
            }).prototype.exec = function (t) {
                var e = this.x,
                    i = this.y,
                    s = this.w,
                    r = this.h,
                    n = 0.5522848,
                    a = (s / 2) * n,
                    o = (r / 2) * n,
                    h = e + s,
                    c = i + r,
                    u = e + s / 2,
                    l = i + r / 2;
                t.moveTo(e, l), t.bezierCurveTo(e, l - o, u - a, i, u, i), t.bezierCurveTo(u + a, i, h, l - o, h, l), t.bezierCurveTo(h, l + o, u + a, c, u, c), t.bezierCurveTo(u - a, c, e, l + o, e, l);
            }),
            ((i.PolyStar = function (t, e, i, s, r, n) {
                (this.x = t), (this.y = e), (this.radius = i), (this.sides = s), (this.pointSize = r), (this.angle = n);
            }).prototype.exec = function (t) {
                var e = this.x,
                    i = this.y,
                    s = this.radius,
                    r = ((this.angle || 0) / 180) * Math.PI,
                    n = this.sides,
                    a = 1 - (this.pointSize || 0),
                    o = Math.PI / n;
                t.moveTo(e + Math.cos(r) * s, i + Math.sin(r) * s);
                for (var h = 0; n > h; h++) (r += o), 1 != a && t.lineTo(e + Math.cos(r) * s * a, i + Math.sin(r) * s * a), (r += o), t.lineTo(e + Math.cos(r) * s, i + Math.sin(r) * s);
                t.closePath();
            }),
            (t.beginCmd = new i.BeginPath()),
            (createjs.Graphics = t);
    })(),
    (this.createjs = this.createjs || {}),
    (function () {
        "use strict";
        function t() {
            this.EventDispatcher_constructor(),
                (this.alpha = 1),
                (this.cacheCanvas = null),
                (this.bitmapCache = null),
                (this.id = createjs.UID.get()),
                (this.mouseEnabled = !0),
                (this.tickEnabled = !0),
                (this.name = null),
                (this.parent = null),
                (this.regX = 0),
                (this.regY = 0),
                (this.rotation = 0),
                (this.scaleX = 1),
                (this.scaleY = 1),
                (this.skewX = 0),
                (this.skewY = 0),
                (this.shadow = null),
                (this.visible = !0),
                (this.x = 0),
                (this.y = 0),
                (this.transformMatrix = null),
                (this.compositeOperation = null),
                (this.snapToPixel = !0),
                (this.filters = null),
                (this.mask = null),
                (this.hitArea = null),
                (this.cursor = null),
                (this._props = new createjs.DisplayProps()),
                (this._rectangle = new createjs.Rectangle()),
                (this._bounds = null),
                (this._webGLRenderStyle = t._StageGL_NONE);
        }
        var e = createjs.extend(t, createjs.EventDispatcher);
        (t._MOUSE_EVENTS = ["click", "dblclick", "mousedown", "mouseout", "mouseover", "pressmove", "pressup", "rollout", "rollover"]),
            (t.suppressCrossDomainErrors = !1),
            (t._snapToPixelEnabled = !1),
            (t._StageGL_NONE = 0),
            (t._StageGL_SPRITE = 1),
            (t._StageGL_BITMAP = 2);
        var i = createjs.createCanvas ? createjs.createCanvas() : document.createElement("canvas");
        i.getContext && ((t._hitTestCanvas = i), (t._hitTestContext = i.getContext("2d")), (i.width = i.height = 1)),
            (e._getStage = function () {
                for (var t = this, e = createjs.Stage; t.parent; ) t = t.parent;
                return t instanceof e ? t : null;
            }),
            (e.getStage = createjs.deprecate(e._getStage, "DisplayObject.getStage"));
        try {
            Object.defineProperties(e, {
                stage: { get: e._getStage },
                cacheID: {
                    get: function () {
                        return this.bitmapCache && this.bitmapCache.cacheID;
                    },
                    set: function (t) {
                        this.bitmapCache && (this.bitmapCache.cacheID = t);
                    },
                },
                scale: {
                    get: function () {
                        return this.scaleX;
                    },
                    set: function (t) {
                        this.scaleX = this.scaleY = t;
                    },
                },
            });
        } catch (t) {}
        (e.isVisible = function () {
            return !!(this.visible && this.alpha > 0 && 0 != this.scaleX && 0 != this.scaleY);
        }),
            (e.draw = function (t, e) {
                var i = this.bitmapCache;
                return !(!i || e) && i.draw(t);
            }),
            (e.updateContext = function (e) {
                var i = this,
                    s = i.mask,
                    r = i._props.matrix;
                s && s.graphics && !s.graphics.isEmpty() && (s.getMatrix(r), e.transform(r.a, r.b, r.c, r.d, r.tx, r.ty), s.graphics.drawAsPath(e), e.clip(), r.invert(), e.transform(r.a, r.b, r.c, r.d, r.tx, r.ty)), this.getMatrix(r);
                var n = r.tx,
                    a = r.ty;
                t._snapToPixelEnabled && i.snapToPixel && ((n = (n + (0 > n ? -0.5 : 0.5)) | 0), (a = (a + (0 > a ? -0.5 : 0.5)) | 0)),
                    e.transform(r.a, r.b, r.c, r.d, n, a),
                    (e.globalAlpha *= i.alpha),
                    i.compositeOperation && (e.globalCompositeOperation = i.compositeOperation),
                    i.shadow && this._applyShadow(e, i.shadow);
            }),
            (e.cache = function (t, e, i, s, r, n) {
                this.bitmapCache || (this.bitmapCache = new createjs.BitmapCache()), this.bitmapCache.define(this, t, e, i, s, r, n);
            }),
            (e.updateCache = function (t) {
                if (!this.bitmapCache) throw "cache() must be called before updateCache()";
                this.bitmapCache.update(t);
            }),
            (e.uncache = function () {
                this.bitmapCache && (this.bitmapCache.release(), (this.bitmapCache = void 0));
            }),
            (e.getCacheDataURL = function () {
                return this.bitmapCache ? this.bitmapCache.getDataURL() : null;
            }),
            (e.localToGlobal = function (t, e, i) {
                return this.getConcatenatedMatrix(this._props.matrix).transformPoint(t, e, i || new createjs.Point());
            }),
            (e.globalToLocal = function (t, e, i) {
                return this.getConcatenatedMatrix(this._props.matrix)
                    .invert()
                    .transformPoint(t, e, i || new createjs.Point());
            }),
            (e.localToLocal = function (t, e, i, s) {
                return (s = this.localToGlobal(t, e, s)), i.globalToLocal(s.x, s.y, s);
            }),
            (e.setTransform = function (t, e, i, s, r, n, a, o, h) {
                return (
                    (this.x = t || 0),
                    (this.y = e || 0),
                    (this.scaleX = null == i ? 1 : i),
                    (this.scaleY = null == s ? 1 : s),
                    (this.rotation = r || 0),
                    (this.skewX = n || 0),
                    (this.skewY = a || 0),
                    (this.regX = o || 0),
                    (this.regY = h || 0),
                    this
                );
            }),
            (e.getMatrix = function (t) {
                var e = this,
                    i = (t && t.identity()) || new createjs.Matrix2D();
                return e.transformMatrix ? i.copy(e.transformMatrix) : i.appendTransform(e.x, e.y, e.scaleX, e.scaleY, e.rotation, e.skewX, e.skewY, e.regX, e.regY);
            }),
            (e.getConcatenatedMatrix = function (t) {
                for (var e = this, i = this.getMatrix(t); (e = e.parent); ) i.prependMatrix(e.getMatrix(e._props.matrix));
                return i;
            }),
            (e.getConcatenatedDisplayProps = function (t) {
                t = t ? t.identity() : new createjs.DisplayProps();
                var e = this,
                    i = e.getMatrix(t.matrix);
                do {
                    t.prepend(e.visible, e.alpha, e.shadow, e.compositeOperation), e != this && i.prependMatrix(e.getMatrix(e._props.matrix));
                } while ((e = e.parent));
                return t;
            }),
            (e.hitTest = function (e, i) {
                var s = t._hitTestContext;
                s.setTransform(1, 0, 0, 1, -e, -i), this.draw(s);
                var r = this._testHit(s);
                return s.setTransform(1, 0, 0, 1, 0, 0), s.clearRect(0, 0, 2, 2), r;
            }),
            (e.set = function (t) {
                for (var e in t) this[e] = t[e];
                return this;
            }),
            (e.getBounds = function () {
                if (this._bounds) return this._rectangle.copy(this._bounds);
                var t = this.cacheCanvas;
                if (t) {
                    var e = this._cacheScale;
                    return this._rectangle.setValues(this._cacheOffsetX, this._cacheOffsetY, t.width / e, t.height / e);
                }
                return null;
            }),
            (e.getTransformedBounds = function () {
                return this._getBounds();
            }),
            (e.setBounds = function (t, e, i, s) {
                return null == t ? void (this._bounds = t) : void (this._bounds = (this._bounds || new createjs.Rectangle()).setValues(t, e, i, s));
            }),
            (e.clone = function () {
                return this._cloneProps(new t());
            }),
            (e.toString = function () {
                return "[DisplayObject (name=" + this.name + ")]";
            }),
            (e._updateState = null),
            (e._cloneProps = function (t) {
                return (
                    (t.alpha = this.alpha),
                    (t.mouseEnabled = this.mouseEnabled),
                    (t.tickEnabled = this.tickEnabled),
                    (t.name = this.name),
                    (t.regX = this.regX),
                    (t.regY = this.regY),
                    (t.rotation = this.rotation),
                    (t.scaleX = this.scaleX),
                    (t.scaleY = this.scaleY),
                    (t.shadow = this.shadow),
                    (t.skewX = this.skewX),
                    (t.skewY = this.skewY),
                    (t.visible = this.visible),
                    (t.x = this.x),
                    (t.y = this.y),
                    (t.compositeOperation = this.compositeOperation),
                    (t.snapToPixel = this.snapToPixel),
                    (t.filters = null == this.filters ? null : this.filters.slice(0)),
                    (t.mask = this.mask),
                    (t.hitArea = this.hitArea),
                    (t.cursor = this.cursor),
                    (t._bounds = this._bounds),
                    t
                );
            }),
            (e._applyShadow = function (t, e) {
                (e = e || Shadow.identity), (t.shadowColor = e.color), (t.shadowOffsetX = e.offsetX), (t.shadowOffsetY = e.offsetY), (t.shadowBlur = e.blur);
            }),
            (e._tick = function (t) {
                var e = this._listeners;
                e && e.tick && ((t.target = null), (t.propagationStopped = t.immediatePropagationStopped = !1), this.dispatchEvent(t));
            }),
            (e._testHit = function (e) {
                try {
                    var i = e.getImageData(0, 0, 1, 1).data[3] > 1;
                } catch (e) {
                    if (!t.suppressCrossDomainErrors) throw "An error has occurred. This is most likely due to security restrictions on reading canvas pixel data with local or cross-domain images.";
                }
                return i;
            }),
            (e._getBounds = function (t, e) {
                return this._transformBounds(this.getBounds(), t, e);
            }),
            (e._transformBounds = function (t, e, i) {
                if (!t) return t;
                var s = t.x,
                    r = t.y,
                    n = t.width,
                    a = t.height,
                    o = this._props.matrix;
                (o = i ? o.identity() : this.getMatrix(o)), (s || r) && o.appendTransform(0, 0, 1, 1, 0, 0, 0, -s, -r), e && o.prependMatrix(e);
                var h = n * o.a,
                    c = n * o.b,
                    u = a * o.c,
                    l = a * o.d,
                    d = o.tx,
                    _ = o.ty,
                    p = d,
                    f = d,
                    g = _,
                    m = _;
                return (
                    (s = h + d) < p ? (p = s) : s > f && (f = s),
                    (s = h + u + d) < p ? (p = s) : s > f && (f = s),
                    (s = u + d) < p ? (p = s) : s > f && (f = s),
                    (r = c + _) < g ? (g = r) : r > m && (m = r),
                    (r = c + l + _) < g ? (g = r) : r > m && (m = r),
                    (r = l + _) < g ? (g = r) : r > m && (m = r),
                    t.setValues(p, g, f - p, m - g)
                );
            }),
            (e._hasMouseEventListener = function () {
                for (var e = t._MOUSE_EVENTS, i = 0, s = e.length; s > i; i++) if (this.hasEventListener(e[i])) return !0;
                return !!this.cursor;
            }),
            (createjs.DisplayObject = createjs.promote(t, "EventDispatcher"));
    })(),
    (this.createjs = this.createjs || {}),
    (function () {
        "use strict";
        function t() {
            this.DisplayObject_constructor(), (this.children = []), (this.mouseChildren = !0), (this.tickChildren = !0);
        }
        var e = createjs.extend(t, createjs.DisplayObject);
        (e._getNumChildren = function () {
            return this.children.length;
        }),
            (e.getNumChildren = createjs.deprecate(e._getNumChildren, "Container.getNumChildren"));
        try {
            Object.defineProperties(e, { numChildren: { get: e._getNumChildren } });
        } catch (t) {}
        (e.initialize = t),
            (e.isVisible = function () {
                var t = this.cacheCanvas || this.children.length;
                return !!(this.visible && this.alpha > 0 && 0 != this.scaleX && 0 != this.scaleY && t);
            }),
            (e.draw = function (t, e) {
                if (this.DisplayObject_draw(t, e)) return !0;
                for (var i = this.children.slice(), s = 0, r = i.length; r > s; s++) {
                    var n = i[s];
                    n.isVisible() && (t.save(), n.updateContext(t), n.draw(t), t.restore());
                }
                return !0;
            }),
            (e.addChild = function (t) {
                if (null == t) return t;
                var e = arguments.length;
                if (e > 1) {
                    for (var i = 0; e > i; i++) this.addChild(arguments[i]);
                    return arguments[e - 1];
                }
                var s = t.parent,
                    r = s === this;
                return s && s._removeChildAt(createjs.indexOf(s.children, t), r), (t.parent = this), this.children.push(t), r || t.dispatchEvent("added"), t;
            }),
            (e.addChildAt = function (t, e) {
                var i = arguments.length,
                    s = arguments[i - 1];
                if (0 > s || s > this.children.length) return arguments[i - 2];
                if (i > 2) {
                    for (var r = 0; i - 1 > r; r++) this.addChildAt(arguments[r], s + r);
                    return arguments[i - 2];
                }
                var n = t.parent,
                    a = n === this;
                return n && n._removeChildAt(createjs.indexOf(n.children, t), a), (t.parent = this), this.children.splice(e, 0, t), a || t.dispatchEvent("added"), t;
            }),
            (e.removeChild = function (t) {
                var e = arguments.length;
                if (e > 1) {
                    for (var i = !0, s = 0; e > s; s++) i = i && this.removeChild(arguments[s]);
                    return i;
                }
                return this._removeChildAt(createjs.indexOf(this.children, t));
            }),
            (e.removeChildAt = function (t) {
                var e = arguments.length;
                if (e > 1) {
                    for (var i = [], s = 0; e > s; s++) i[s] = arguments[s];
                    i.sort(function (t, e) {
                        return e - t;
                    });
                    var r = !0;
                    for (s = 0; e > s; s++) r = r && this._removeChildAt(i[s]);
                    return r;
                }
                return this._removeChildAt(t);
            }),
            (e.removeAllChildren = function () {
                for (var t = this.children; t.length; ) this._removeChildAt(0);
            }),
            (e.getChildAt = function (t) {
                return this.children[t];
            }),
            (e.getChildByName = function (t) {
                for (var e = this.children, i = 0, s = e.length; s > i; i++) if (e[i].name == t) return e[i];
                return null;
            }),
            (e.sortChildren = function (t) {
                this.children.sort(t);
            }),
            (e.getChildIndex = function (t) {
                return createjs.indexOf(this.children, t);
            }),
            (e.swapChildrenAt = function (t, e) {
                var i = this.children,
                    s = i[t],
                    r = i[e];
                s && r && ((i[t] = r), (i[e] = s));
            }),
            (e.swapChildren = function (t, e) {
                for (var i, s, r = this.children, n = 0, a = r.length; a > n && (r[n] == t && (i = n), r[n] == e && (s = n), null == i || null == s); n++);
                n != a && ((r[i] = e), (r[s] = t));
            }),
            (e.setChildIndex = function (t, e) {
                var i = this.children,
                    s = i.length;
                if (!(t.parent != this || 0 > e || e >= s)) {
                    for (var r = 0; s > r && i[r] != t; r++);
                    r != s && r != e && (i.splice(r, 1), i.splice(e, 0, t));
                }
            }),
            (e.contains = function (t) {
                for (; t; ) {
                    if (t == this) return !0;
                    t = t.parent;
                }
                return !1;
            }),
            (e.hitTest = function (t, e) {
                return null != this.getObjectUnderPoint(t, e);
            }),
            (e.getObjectsUnderPoint = function (t, e, i) {
                var s = [],
                    r = this.localToGlobal(t, e);
                return this._getObjectsUnderPoint(r.x, r.y, s, i > 0, 1 == i), s;
            }),
            (e.getObjectUnderPoint = function (t, e, i) {
                var s = this.localToGlobal(t, e);
                return this._getObjectsUnderPoint(s.x, s.y, null, i > 0, 1 == i);
            }),
            (e.getBounds = function () {
                return this._getBounds(null, !0);
            }),
            (e.getTransformedBounds = function () {
                return this._getBounds();
            }),
            (e.clone = function (e) {
                var i = this._cloneProps(new t());
                return e && this._cloneChildren(i), i;
            }),
            (e.toString = function () {
                return "[Container (name=" + this.name + ")]";
            }),
            (e._tick = function (t) {
                if (this.tickChildren)
                    for (var e = this.children.length - 1; e >= 0; e--) {
                        var i = this.children[e];
                        i.tickEnabled && i._tick && i._tick(t);
                    }
                this.DisplayObject__tick(t);
            }),
            (e._cloneChildren = function (t) {
                t.children.length && t.removeAllChildren();
                for (var e = t.children, i = 0, s = this.children.length; s > i; i++) {
                    var r = this.children[i].clone(!0);
                    (r.parent = t), e.push(r);
                }
            }),
            (e._removeChildAt = function (t, e) {
                if (0 > t || t > this.children.length - 1) return !1;
                var i = this.children[t];
                return i && (i.parent = null), this.children.splice(t, 1), e || i.dispatchEvent("removed"), !0;
            }),
            (e._getObjectsUnderPoint = function (e, i, s, r, n, a) {
                if (!(a = a || 0) && !this._testMask(this, e, i)) return null;
                var o,
                    h = createjs.DisplayObject._hitTestContext;
                n = n || (r && this._hasMouseEventListener());
                for (var c = this.children, u = c.length - 1; u >= 0; u--) {
                    var l = c[u],
                        d = l.hitArea;
                    if (l.visible && (d || l.isVisible()) && (!r || l.mouseEnabled) && (d || this._testMask(l, e, i)))
                        if (!d && l instanceof t) {
                            var _ = l._getObjectsUnderPoint(e, i, s, r, n, a + 1);
                            if (!s && _) return r && !this.mouseChildren ? this : _;
                        } else {
                            if (r && !n && !l._hasMouseEventListener()) continue;
                            var p = l.getConcatenatedDisplayProps(l._props);
                            if (
                                ((o = p.matrix),
                                d && (o.appendMatrix(d.getMatrix(d._props.matrix)), (p.alpha = d.alpha)),
                                (h.globalAlpha = p.alpha),
                                h.setTransform(o.a, o.b, o.c, o.d, o.tx - e, o.ty - i),
                                (d || l).draw(h),
                                !this._testHit(h))
                            )
                                continue;
                            if ((h.setTransform(1, 0, 0, 1, 0, 0), h.clearRect(0, 0, 2, 2), !s)) return r && !this.mouseChildren ? this : l;
                            s.push(l);
                        }
                }
                return null;
            }),
            (e._testMask = function (t, e, i) {
                var s = t.mask;
                if (!s || !s.graphics || s.graphics.isEmpty()) return !0;
                var r = this._props.matrix,
                    n = t.parent;
                (r = n ? n.getConcatenatedMatrix(r) : r.identity()), (r = s.getMatrix(s._props.matrix).prependMatrix(r));
                var a = createjs.DisplayObject._hitTestContext;
                return a.setTransform(r.a, r.b, r.c, r.d, r.tx - e, r.ty - i), s.graphics.drawAsPath(a), (a.fillStyle = "#000"), a.fill(), !!this._testHit(a) && (a.setTransform(1, 0, 0, 1, 0, 0), a.clearRect(0, 0, 2, 2), !0);
            }),
            (e._getBounds = function (t, e) {
                var i = this.DisplayObject_getBounds();
                if (i) return this._transformBounds(i, t, e);
                var s = this._props.matrix;
                (s = e ? s.identity() : this.getMatrix(s)), t && s.prependMatrix(t);
                for (var r = this.children.length, n = null, a = 0; r > a; a++) {
                    var o = this.children[a];
                    o.visible && (i = o._getBounds(s)) && (n ? n.extend(i.x, i.y, i.width, i.height) : (n = i.clone()));
                }
                return n;
            }),
            (createjs.Container = createjs.promote(t, "DisplayObject"));
    })(),
    (this.createjs = this.createjs || {}),
    (function () {
        "use strict";
        function t(t) {
            this.Container_constructor(),
                (this.autoClear = !0),
                (this.canvas = "string" == typeof t ? document.getElementById(t) : t),
                (this.mouseX = 0),
                (this.mouseY = 0),
                (this.drawRect = null),
                (this.snapToPixelEnabled = !1),
                (this.mouseInBounds = !1),
                (this.tickOnUpdate = !0),
                (this.mouseMoveOutside = !1),
                (this.preventSelection = !0),
                (this._pointerData = {}),
                (this._pointerCount = 0),
                (this._primaryPointerID = null),
                (this._mouseOverIntervalID = null),
                (this._nextStage = null),
                (this._prevStage = null),
                this.enableDOMEvents(!0);
        }
        var e = createjs.extend(t, createjs.Container);
        (e._get_nextStage = function () {
            return this._nextStage;
        }),
            (e._set_nextStage = function (t) {
                this._nextStage && (this._nextStage._prevStage = null), t && (t._prevStage = this), (this._nextStage = t);
            });
        try {
            Object.defineProperties(e, { nextStage: { get: e._get_nextStage, set: e._set_nextStage } });
        } catch (t) {}
        (e.update = function (t) {
            if (this.canvas && (this.tickOnUpdate && this.tick(t), !1 !== this.dispatchEvent("drawstart", !1, !0))) {
                createjs.DisplayObject._snapToPixelEnabled = this.snapToPixelEnabled;
                var e = this.drawRect,
                    i = this.canvas.getContext("2d");
                i.setTransform(1, 0, 0, 1, 0, 0),
                    this.autoClear && (e ? i.clearRect(e.x, e.y, e.width, e.height) : i.clearRect(0, 0, this.canvas.width + 1, this.canvas.height + 1)),
                    i.save(),
                    this.drawRect && (i.beginPath(), i.rect(e.x, e.y, e.width, e.height), i.clip()),
                    this.updateContext(i),
                    this.draw(i, !1),
                    i.restore(),
                    this.dispatchEvent("drawend");
            }
        }),
            (e.tick = function (t) {
                if (this.tickEnabled && !1 !== this.dispatchEvent("tickstart", !1, !0)) {
                    var e = new createjs.Event("tick");
                    if (t) for (var i in t) t.hasOwnProperty(i) && (e[i] = t[i]);
                    this._tick(e), this.dispatchEvent("tickend");
                }
            }),
            (e.handleEvent = function (t) {
                "tick" == t.type && this.update(t);
            }),
            (e.clear = function () {
                if (this.canvas) {
                    var t = this.canvas.getContext("2d");
                    t.setTransform(1, 0, 0, 1, 0, 0), t.clearRect(0, 0, this.canvas.width + 1, this.canvas.height + 1);
                }
            }),
            (e.toDataURL = function (t, e) {
                var i,
                    s = this.canvas.getContext("2d"),
                    r = this.canvas.width,
                    n = this.canvas.height;
                if (t) {
                    i = s.getImageData(0, 0, r, n);
                    var a = s.globalCompositeOperation;
                    (s.globalCompositeOperation = "destination-over"), (s.fillStyle = t), s.fillRect(0, 0, r, n);
                }
                var o = this.canvas.toDataURL(e || "image/png");
                return t && (s.putImageData(i, 0, 0), (s.globalCompositeOperation = a)), o;
            }),
            (e.enableMouseOver = function (t) {
                if ((this._mouseOverIntervalID && (clearInterval(this._mouseOverIntervalID), (this._mouseOverIntervalID = null), 0 == t && this._testMouseOver(!0)), null == t)) t = 20;
                else if (0 >= t) return;
                var e = this;
                this._mouseOverIntervalID = setInterval(function () {
                    e._testMouseOver();
                }, 1e3 / Math.min(50, t));
            }),
            (e.enableDOMEvents = function (t) {
                null == t && (t = !0);
                var e,
                    i,
                    s = this._eventListeners;
                if (!t && s) {
                    for (e in s) (i = s[e]).t.removeEventListener(e, i.f, !1);
                    this._eventListeners = null;
                } else if (t && !s && this.canvas) {
                    var r = window.addEventListener ? window : document,
                        n = this;
                    for (e in (((s = this._eventListeners = {}).mouseup = {
                        t: r,
                        f: function (t) {
                            n._handleMouseUp(t);
                        },
                    }),
                    (s.mousemove = {
                        t: r,
                        f: function (t) {
                            n._handleMouseMove(t);
                        },
                    }),
                    (s.dblclick = {
                        t: this.canvas,
                        f: function (t) {
                            n._handleDoubleClick(t);
                        },
                    }),
                    (s.mousedown = {
                        t: this.canvas,
                        f: function (t) {
                            n._handleMouseDown(t);
                        },
                    }),
                    s))
                        (i = s[e]).t.addEventListener(e, i.f, !1);
                }
            }),
            (e.clone = function () {
                throw "Stage cannot be cloned.";
            }),
            (e.toString = function () {
                return "[Stage (name=" + this.name + ")]";
            }),
            (e._getElementRect = function (t) {
                var e;
                try {
                    e = t.getBoundingClientRect();
                } catch (i) {
                    e = { top: t.offsetTop, left: t.offsetLeft, width: t.offsetWidth, height: t.offsetHeight };
                }
                var i = (window.pageXOffset || document.scrollLeft || 0) - (document.clientLeft || document.body.clientLeft || 0),
                    s = (window.pageYOffset || document.scrollTop || 0) - (document.clientTop || document.body.clientTop || 0),
                    r = window.getComputedStyle ? getComputedStyle(t, null) : t.currentStyle,
                    n = parseInt(r.paddingLeft) + parseInt(r.borderLeftWidth),
                    a = parseInt(r.paddingTop) + parseInt(r.borderTopWidth),
                    o = parseInt(r.paddingRight) + parseInt(r.borderRightWidth),
                    h = parseInt(r.paddingBottom) + parseInt(r.borderBottomWidth);
                return { left: e.left + i + n, right: e.right + i - o, top: e.top + s + a, bottom: e.bottom + s - h };
            }),
            (e._getPointerData = function (t) {
                var e = this._pointerData[t];
                return e || (e = this._pointerData[t] = { x: 0, y: 0 }), e;
            }),
            (e._handleMouseMove = function (t) {
                t || (t = window.event), this._handlePointerMove(-1, t, t.pageX, t.pageY);
            }),
            (e._handlePointerMove = function (t, e, i, s, r) {
                if ((!this._prevStage || void 0 !== r) && this.canvas) {
                    var n = this._nextStage,
                        a = this._getPointerData(t),
                        o = a.inBounds;
                    this._updatePointerPosition(t, e, i, s),
                        (o || a.inBounds || this.mouseMoveOutside) &&
                            (-1 === t && a.inBounds == !o && this._dispatchMouseEvent(this, o ? "mouseleave" : "mouseenter", !1, t, a, e),
                            this._dispatchMouseEvent(this, "stagemousemove", !1, t, a, e),
                            this._dispatchMouseEvent(a.target, "pressmove", !0, t, a, e)),
                        n && n._handlePointerMove(t, e, i, s, null);
                }
            }),
            (e._updatePointerPosition = function (t, e, i, s) {
                var r = this._getElementRect(this.canvas);
                (i -= r.left), (s -= r.top);
                var n = this.canvas.width,
                    a = this.canvas.height;
                (i /= (r.right - r.left) / n), (s /= (r.bottom - r.top) / a);
                var o = this._getPointerData(t);
                (o.inBounds = i >= 0 && s >= 0 && n - 1 >= i && a - 1 >= s) ? ((o.x = i), (o.y = s)) : this.mouseMoveOutside && ((o.x = 0 > i ? 0 : i > n - 1 ? n - 1 : i), (o.y = 0 > s ? 0 : s > a - 1 ? a - 1 : s)),
                    (o.posEvtObj = e),
                    (o.rawX = i),
                    (o.rawY = s),
                    (t === this._primaryPointerID || -1 === t) && ((this.mouseX = o.x), (this.mouseY = o.y), (this.mouseInBounds = o.inBounds));
            }),
            (e._handleMouseUp = function (t) {
                this._handlePointerUp(-1, t, !1);
            }),
            (e._handlePointerUp = function (t, e, i, s) {
                var r = this._nextStage,
                    n = this._getPointerData(t);
                if (!this._prevStage || void 0 !== s) {
                    var a = null,
                        o = n.target;
                    s || (!o && !r) || (a = this._getObjectsUnderPoint(n.x, n.y, null, !0)),
                        n.down && (this._dispatchMouseEvent(this, "stagemouseup", !1, t, n, e, a), (n.down = !1)),
                        a == o && this._dispatchMouseEvent(o, "click", !0, t, n, e),
                        this._dispatchMouseEvent(o, "pressup", !0, t, n, e),
                        i ? (t == this._primaryPointerID && (this._primaryPointerID = null), delete this._pointerData[t]) : (n.target = null),
                        r && r._handlePointerUp(t, e, i, s || (a && this));
                }
            }),
            (e._handleMouseDown = function (t) {
                this._handlePointerDown(-1, t, t.pageX, t.pageY);
            }),
            (e._handlePointerDown = function (t, e, i, s, r) {
                this.preventSelection && e.preventDefault(), (null == this._primaryPointerID || -1 === t) && (this._primaryPointerID = t), null != s && this._updatePointerPosition(t, e, i, s);
                var n = null,
                    a = this._nextStage,
                    o = this._getPointerData(t);
                r || (n = o.target = this._getObjectsUnderPoint(o.x, o.y, null, !0)),
                    o.inBounds && (this._dispatchMouseEvent(this, "stagemousedown", !1, t, o, e, n), (o.down = !0)),
                    this._dispatchMouseEvent(n, "mousedown", !0, t, o, e),
                    a && a._handlePointerDown(t, e, i, s, r || (n && this));
            }),
            (e._testMouseOver = function (t, e, i) {
                if (!this._prevStage || void 0 !== e) {
                    var s = this._nextStage;
                    if (!this._mouseOverIntervalID) return void (s && s._testMouseOver(t, e, i));
                    var r = this._getPointerData(-1);
                    if (r && (t || this.mouseX != this._mouseOverX || this.mouseY != this._mouseOverY || !this.mouseInBounds)) {
                        var n,
                            a,
                            o,
                            h = r.posEvtObj,
                            c = i || (h && h.target == this.canvas),
                            u = null,
                            l = -1,
                            d = "";
                        !e && (t || (this.mouseInBounds && c)) && ((u = this._getObjectsUnderPoint(this.mouseX, this.mouseY, null, !0)), (this._mouseOverX = this.mouseX), (this._mouseOverY = this.mouseY));
                        var _ = this._mouseOverTarget || [],
                            p = _[_.length - 1],
                            f = (this._mouseOverTarget = []);
                        for (n = u; n; ) f.unshift(n), d || (d = n.cursor), (n = n.parent);
                        for (this.canvas.style.cursor = d, !e && i && (i.canvas.style.cursor = d), a = 0, o = f.length; o > a && f[a] == _[a]; a++) l = a;
                        for (p != u && this._dispatchMouseEvent(p, "mouseout", !0, -1, r, h, u), a = _.length - 1; a > l; a--) this._dispatchMouseEvent(_[a], "rollout", !1, -1, r, h, u);
                        for (a = f.length - 1; a > l; a--) this._dispatchMouseEvent(f[a], "rollover", !1, -1, r, h, p);
                        p != u && this._dispatchMouseEvent(u, "mouseover", !0, -1, r, h, p), s && s._testMouseOver(t, e || (u && this), i || (c && this));
                    }
                }
            }),
            (e._handleDoubleClick = function (t, e) {
                var i = null,
                    s = this._nextStage,
                    r = this._getPointerData(-1);
                e || ((i = this._getObjectsUnderPoint(r.x, r.y, null, !0)), this._dispatchMouseEvent(i, "dblclick", !0, -1, r, t)), s && s._handleDoubleClick(t, e || (i && this));
            }),
            (e._dispatchMouseEvent = function (t, e, i, s, r, n, a) {
                if (t && (i || t.hasEventListener(e))) {
                    var o = new createjs.MouseEvent(e, i, !1, r.x, r.y, n, s, s === this._primaryPointerID || -1 === s, r.rawX, r.rawY, a);
                    t.dispatchEvent(o);
                }
            }),
            (createjs.Stage = createjs.promote(t, "Container"));
    })(),
    (this.createjs = this.createjs || {}),
    (function () {
        "use strict";
        function t(e, i) {
            if ((this.Stage_constructor(e), void 0 !== i)) {
                if ("object" != typeof i) throw "Invalid options object";
                var s = i.premultiply,
                    r = i.transparent,
                    n = i.antialias,
                    a = i.preserveBuffer,
                    o = i.autoPurge;
            }
            (this.vocalDebug = !1),
                (this._preserveBuffer = a || !1),
                (this._antialias = n || !1),
                (this._transparent = r || !1),
                (this._premultiply = s || !1),
                (this._autoPurge = void 0),
                (this.autoPurge = o),
                (this._viewportWidth = 0),
                (this._viewportHeight = 0),
                (this._projectionMatrix = null),
                (this._webGLContext = null),
                (this._clearColor = { r: 0.5, g: 0.5, b: 0.5, a: 0 }),
                (this._maxCardsPerBatch = t.DEFAULT_MAX_BATCH_SIZE),
                (this._activeShader = null),
                (this._vertices = null),
                (this._vertexPositionBuffer = null),
                (this._uvs = null),
                (this._uvPositionBuffer = null),
                (this._indices = null),
                (this._textureIndexBuffer = null),
                (this._alphas = null),
                (this._alphaBuffer = null),
                (this._textureDictionary = []),
                (this._textureIDs = {}),
                (this._batchTextures = []),
                (this._baseTextures = []),
                (this._batchTextureCount = 8),
                (this._lastTextureInsert = -1),
                (this._batchID = 0),
                (this._drawID = 0),
                (this._slotBlacklist = []),
                (this._isDrawing = 0),
                (this._lastTrackedCanvas = 0),
                (this.isCacheControlled = !1),
                (this._cacheContainer = new createjs.Container()),
                this._initializeWebGL();
        }
        var e = createjs.extend(t, createjs.Stage);
        (t.buildUVRects = function (t, e, i) {
            if (!t || !t._frames) return null;
            void 0 === e && (e = -1), void 0 === i && (i = !1);
            for (var s = -1 != e && i ? e : 0, r = -1 != e && i ? e + 1 : t._frames.length, n = s; r > n; n++) {
                var a = t._frames[n];
                if (!(a.uvRect || a.image.width <= 0 || a.image.height <= 0)) {
                    var o = a.rect;
                    a.uvRect = { t: o.y / a.image.height, l: o.x / a.image.width, b: (o.y + o.height) / a.image.height, r: (o.x + o.width) / a.image.width };
                }
            }
            return t._frames[-1 != e ? e : 0].uvRect || { t: 0, l: 0, b: 1, r: 1 };
        }),
            (t.isWebGLActive = function (t) {
                return t && t instanceof WebGLRenderingContext && "undefined" != typeof WebGLRenderingContext;
            }),
            (t.VERTEX_PROPERTY_COUNT = 6),
            (t.INDICIES_PER_CARD = 6),
            (t.DEFAULT_MAX_BATCH_SIZE = 1e4),
            (t.WEBGL_MAX_INDEX_NUM = Math.pow(2, 16)),
            (t.UV_RECT = { t: 0, l: 0, b: 1, r: 1 });
        try {
            (t.COVER_VERT = new Float32Array([-1, 1, 1, 1, -1, -1, 1, 1, 1, -1, -1, -1])), (t.COVER_UV = new Float32Array([0, 0, 1, 0, 0, 1, 1, 0, 1, 1, 0, 1])), (t.COVER_UV_FLIP = new Float32Array([0, 1, 1, 1, 0, 0, 1, 1, 1, 0, 0, 0]));
        } catch (t) {}
        (t.REGULAR_VARYING_HEADER = "precision mediump float;varying vec2 vTextureCoord;varying lowp float indexPicker;varying lowp float alphaValue;"),
            (t.REGULAR_VERTEX_HEADER = t.REGULAR_VARYING_HEADER + "attribute vec2 vertexPosition;attribute vec2 uvPosition;attribute lowp float textureIndex;attribute lowp float objectAlpha;uniform mat4 pMatrix;"),
            (t.REGULAR_FRAGMENT_HEADER = t.REGULAR_VARYING_HEADER + "uniform sampler2D uSampler[{{count}}];"),
            (t.REGULAR_VERTEX_BODY =
                "void main(void) {gl_Position = vec4((vertexPosition.x * pMatrix[0][0]) + pMatrix[3][0],(vertexPosition.y * pMatrix[1][1]) + pMatrix[3][1],pMatrix[3][2],1.0);alphaValue = objectAlpha;indexPicker = textureIndex;vTextureCoord = uvPosition;}"),
            (t.REGULAR_FRAGMENT_BODY = "void main(void) {vec4 color = vec4(1.0, 0.0, 0.0, 1.0);if (indexPicker <= 0.5) {color = texture2D(uSampler[0], vTextureCoord);{{alternates}}}{{fragColor}}}"),
            (t.REGULAR_FRAG_COLOR_NORMAL = "gl_FragColor = vec4(color.rgb, color.a * alphaValue);"),
            (t.REGULAR_FRAG_COLOR_PREMULTIPLY = "if(color.a > 0.0035) {gl_FragColor = vec4(color.rgb/color.a, color.a * alphaValue);} else {gl_FragColor = vec4(0.0, 0.0, 0.0, 0.0);}"),
            (t.PARTICLE_VERTEX_BODY = t.REGULAR_VERTEX_BODY),
            (t.PARTICLE_FRAGMENT_BODY = t.REGULAR_FRAGMENT_BODY),
            (t.COVER_VARYING_HEADER = "precision mediump float;varying highp vec2 vRenderCoord;varying highp vec2 vTextureCoord;"),
            (t.COVER_VERTEX_HEADER = t.COVER_VARYING_HEADER + "attribute vec2 vertexPosition;attribute vec2 uvPosition;uniform float uUpright;"),
            (t.COVER_FRAGMENT_HEADER = t.COVER_VARYING_HEADER + "uniform sampler2D uSampler;"),
            (t.COVER_VERTEX_BODY = "void main(void) {gl_Position = vec4(vertexPosition.x, vertexPosition.y, 0.0, 1.0);vRenderCoord = uvPosition;vTextureCoord = vec2(uvPosition.x, abs(uUpright - uvPosition.y));}"),
            (t.COVER_FRAGMENT_BODY = "void main(void) {vec4 color = texture2D(uSampler, vRenderCoord);gl_FragColor = color;}"),
            (e._get_isWebGL = function () {
                return !!this._webGLContext;
            }),
            (e._set_autoPurge = function (t) {
                -1 != (t = isNaN(t) ? 1200 : t) && (t = 10 > t ? 10 : t), (this._autoPurge = t);
            }),
            (e._get_autoPurge = function () {
                return Number(this._autoPurge);
            });
        try {
            Object.defineProperties(e, { isWebGL: { get: e._get_isWebGL }, autoPurge: { get: e._get_autoPurge, set: e._set_autoPurge } });
        } catch (t) {}
        (e._initializeWebGL = function () {
            if (this.canvas) {
                if (!this._webGLContext || this._webGLContext.canvas !== this.canvas) {
                    var t = { depth: !1, alpha: this._transparent, stencil: !0, antialias: this._antialias, premultipliedAlpha: this._premultiply, preserveDrawingBuffer: this._preserveBuffer },
                        e = (this._webGLContext = this._fetchWebGLContext(this.canvas, t));
                    if (!e) return null;
                    this.updateSimultaneousTextureCount(e.getParameter(e.MAX_TEXTURE_IMAGE_UNITS)),
                        (this._maxTextureSlots = e.getParameter(e.MAX_COMBINED_TEXTURE_IMAGE_UNITS)),
                        this._createBuffers(e),
                        this._initTextures(e),
                        e.disable(e.DEPTH_TEST),
                        e.enable(e.BLEND),
                        e.blendFuncSeparate(e.SRC_ALPHA, e.ONE_MINUS_SRC_ALPHA, e.ONE, e.ONE_MINUS_SRC_ALPHA),
                        e.pixelStorei(e.UNPACK_PREMULTIPLY_ALPHA_WEBGL, this._premultiply),
                        this._webGLContext.clearColor(this._clearColor.r, this._clearColor.g, this._clearColor.b, this._clearColor.a),
                        this.updateViewport(this._viewportWidth || this.canvas.width, this._viewportHeight || this.canvas.height);
                }
            } else this._webGLContext = null;
            return this._webGLContext;
        }),
            (e.update = function (t) {
                if (this.canvas) {
                    if ((this.tickOnUpdate && this.tick(t), this.dispatchEvent("drawstart"), this.autoClear && this.clear(), this._webGLContext))
                        this._batchDraw(this, this._webGLContext), -1 == this._autoPurge || this._drawID % ((this._autoPurge / 2) | 0) || this.purgeTextures(this._autoPurge);
                    else {
                        var e = this.canvas.getContext("2d");
                        e.save(), this.updateContext(e), this.draw(e, !1), e.restore();
                    }
                    this.dispatchEvent("drawend");
                }
            }),
            (e.clear = function () {
                if (this.canvas)
                    if (t.isWebGLActive(this._webGLContext)) {
                        var e = this._webGLContext,
                            i = this._clearColor,
                            s = this._transparent ? i.a : 1;
                        this._webGLContext.clearColor(i.r * s, i.g * s, i.b * s, s), e.clear(e.COLOR_BUFFER_BIT), this._webGLContext.clearColor(i.r, i.g, i.b, i.a);
                    } else this.Stage_clear();
            }),
            (e.draw = function (e, i) {
                if (e === this._webGLContext && t.isWebGLActive(this._webGLContext)) {
                    var s = this._webGLContext;
                    return this._batchDraw(this, s, i), !0;
                }
                return this.Stage_draw(e, i);
            }),
            (e.cacheDraw = function (e, i, s) {
                if (t.isWebGLActive(this._webGLContext)) {
                    var r = this._webGLContext;
                    return this._cacheDraw(r, e, i, s), !0;
                }
                return !1;
            }),
            (e.protectTextureSlot = function (t, e) {
                if (t > this._maxTextureSlots || 0 > t) throw "Slot outside of acceptable range";
                this._slotBlacklist[t] = !!e;
            }),
            (e.getTargetRenderTexture = function (t, e, i) {
                var s,
                    r = !1,
                    n = this._webGLContext;
                if (
                    (void 0 !== t.__lastRT && t.__lastRT === t.__rtA && (r = !0),
                    r
                        ? (void 0 === t.__rtB ? (t.__rtB = this.getRenderBufferTexture(e, i)) : ((e != t.__rtB._width || i != t.__rtB._height) && this.resizeTexture(t.__rtB, e, i), this.setTextureParams(n)), (s = t.__rtB))
                        : (void 0 === t.__rtA ? (t.__rtA = this.getRenderBufferTexture(e, i)) : ((e != t.__rtA._width || i != t.__rtA._height) && this.resizeTexture(t.__rtA, e, i), this.setTextureParams(n)), (s = t.__rtA)),
                    !s)
                )
                    throw "Problems creating render textures, known causes include using too much VRAM by not releasing WebGL texture instances";
                return (t.__lastRT = s), s;
            }),
            (e.releaseTexture = function (t) {
                var e, i;
                if (t) {
                    if (t.children) for (e = 0, i = t.children.length; i > e; e++) this.releaseTexture(t.children[e]);
                    t.cacheCanvas && t.uncache();
                    var s = void 0;
                    if (void 0 !== t._storeID) {
                        if (t === this._textureDictionary[t._storeID]) return this._killTextureObject(t), void (t._storeID = void 0);
                        s = t;
                    } else if (2 === t._webGLRenderStyle) s = t.image;
                    else if (1 === t._webGLRenderStyle) {
                        for (e = 0, i = t.spriteSheet._images.length; i > e; e++) this.releaseTexture(t.spriteSheet._images[e]);
                        return;
                    }
                    if (void 0 === s) return void (this.vocalDebug && console.log("No associated texture found on release"));
                    this._killTextureObject(this._textureDictionary[s._storeID]), (s._storeID = void 0);
                }
            }),
            (e.purgeTextures = function (t) {
                null == t && (t = 100);
                for (var e = this._textureDictionary, i = e.length, s = 0; i > s; s++) {
                    var r = e[s];
                    r && r._drawID + t <= this._drawID && this._killTextureObject(r);
                }
            }),
            (e.updateSimultaneousTextureCount = function (t) {
                var e = this._webGLContext,
                    i = !1;
                for ((1 > t || isNaN(t)) && (t = 1), this._batchTextureCount = t; !i; )
                    try {
                        (this._activeShader = this._fetchShaderProgram(e)), (i = !0);
                    } catch (t) {
                        if (1 == this._batchTextureCount) throw "Cannot compile shader " + t;
                        (this._batchTextureCount -= 4), this._batchTextureCount < 1 && (this._batchTextureCount = 1), this.vocalDebug && console.log("Reducing desired texture count due to errors: " + this._batchTextureCount);
                    }
            }),
            (e.updateViewport = function (t, e) {
                (this._viewportWidth = 0 | t), (this._viewportHeight = 0 | e);
                var i = this._webGLContext;
                i &&
                    (i.viewport(0, 0, this._viewportWidth, this._viewportHeight),
                    (this._projectionMatrix = new Float32Array([2 / this._viewportWidth, 0, 0, 0, 0, -2 / this._viewportHeight, 1, 0, 0, 0, 1, 0, -1, 1, 0.1, 0])),
                    (this._projectionMatrixFlip = new Float32Array([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0])),
                    this._projectionMatrixFlip.set(this._projectionMatrix),
                    (this._projectionMatrixFlip[5] *= -1),
                    (this._projectionMatrixFlip[13] *= -1));
            }),
            (e.getFilterShader = function (t) {
                t || (t = this);
                var e = this._webGLContext,
                    i = this._activeShader;
                if (t._builtShader) (i = t._builtShader), t.shaderParamSetup && (e.useProgram(i), t.shaderParamSetup(e, this, i));
                else
                    try {
                        (i = this._fetchShaderProgram(e, "filter", t.VTX_SHADER_BODY, t.FRAG_SHADER_BODY, t.shaderParamSetup && t.shaderParamSetup.bind(t))), (t._builtShader = i), (i._name = t.toString());
                    } catch (t) {
                        console && console.log("SHADER SWITCH FAILURE", t);
                    }
                return i;
            }),
            (e.getBaseTexture = function (t, e) {
                var i = Math.ceil(t > 0 ? t : 1) || 1,
                    s = Math.ceil(e > 0 ? e : 1) || 1,
                    r = this._webGLContext,
                    n = r.createTexture();
                return this.resizeTexture(n, i, s), this.setTextureParams(r, !1), n;
            }),
            (e.resizeTexture = function (t, e, i) {
                var s = this._webGLContext;
                s.bindTexture(s.TEXTURE_2D, t), s.texImage2D(s.TEXTURE_2D, 0, s.RGBA, e, i, 0, s.RGBA, s.UNSIGNED_BYTE, null), (t.width = e), (t.height = i);
            }),
            (e.getRenderBufferTexture = function (t, e) {
                var i = this._webGLContext,
                    s = this.getBaseTexture(t, e);
                if (!s) return null;
                var r = i.createFramebuffer();
                return r
                    ? ((s.width = t),
                      (s.height = e),
                      i.bindFramebuffer(i.FRAMEBUFFER, r),
                      i.framebufferTexture2D(i.FRAMEBUFFER, i.COLOR_ATTACHMENT0, i.TEXTURE_2D, s, 0),
                      (r._renderTexture = s),
                      (s._frameBuffer = r),
                      (s._storeID = this._textureDictionary.length),
                      (this._textureDictionary[s._storeID] = s),
                      i.bindFramebuffer(i.FRAMEBUFFER, null),
                      s)
                    : null;
            }),
            (e.setTextureParams = function (t, e) {
                e && this._antialias
                    ? (t.texParameteri(t.TEXTURE_2D, t.TEXTURE_MIN_FILTER, t.LINEAR), t.texParameteri(t.TEXTURE_2D, t.TEXTURE_MAG_FILTER, t.LINEAR))
                    : (t.texParameteri(t.TEXTURE_2D, t.TEXTURE_MIN_FILTER, t.NEAREST), t.texParameteri(t.TEXTURE_2D, t.TEXTURE_MAG_FILTER, t.NEAREST)),
                    t.texParameteri(t.TEXTURE_2D, t.TEXTURE_WRAP_S, t.CLAMP_TO_EDGE),
                    t.texParameteri(t.TEXTURE_2D, t.TEXTURE_WRAP_T, t.CLAMP_TO_EDGE);
            }),
            (e.setClearColor = function (t) {
                var e, i, s, r, n;
                "string" == typeof t
                    ? 0 == t.indexOf("#")
                        ? (4 == t.length && (t = "#" + t.charAt(1) + t.charAt(1) + t.charAt(2) + t.charAt(2) + t.charAt(3) + t.charAt(3)),
                          (e = Number("0x" + t.slice(1, 3)) / 255),
                          (i = Number("0x" + t.slice(3, 5)) / 255),
                          (s = Number("0x" + t.slice(5, 7)) / 255),
                          (r = Number("0x" + t.slice(7, 9)) / 255))
                        : 0 == t.indexOf("rgba(") && ((n = t.slice(5, -1).split(",")), (e = Number(n[0]) / 255), (i = Number(n[1]) / 255), (s = Number(n[2]) / 255), (r = Number(n[3])))
                    : ((e = ((4278190080 & t) >>> 24) / 255), (i = ((16711680 & t) >>> 16) / 255), (s = ((65280 & t) >>> 8) / 255), (r = (255 & t) / 255)),
                    (this._clearColor.r = e || 0),
                    (this._clearColor.g = i || 0),
                    (this._clearColor.b = s || 0),
                    (this._clearColor.a = r || 0),
                    this._webGLContext && this._webGLContext.clearColor(this._clearColor.r, this._clearColor.g, this._clearColor.b, this._clearColor.a);
            }),
            (e.toString = function () {
                return "[StageGL (name=" + this.name + ")]";
            }),
            (e._fetchWebGLContext = function (t, e) {
                var i;
                try {
                    i = t.getContext("webgl", e) || t.getContext("experimental-webgl", e);
                } catch (t) {}
                if (i) (i.viewportWidth = t.width), (i.viewportHeight = t.height);
                else {
                    var s = "Could not initialize WebGL";
                    console.error ? console.error(s) : console.log(s);
                }
                return i;
            }),
            (e._fetchShaderProgram = function (e, i, s, r, n) {
                var a, o;
                switch ((e.useProgram(null), i)) {
                    case "filter":
                        (o = t.COVER_VERTEX_HEADER + (s || t.COVER_VERTEX_BODY)), (a = t.COVER_FRAGMENT_HEADER + (r || t.COVER_FRAGMENT_BODY));
                        break;
                    case "particle":
                        (o = t.REGULAR_VERTEX_HEADER + t.PARTICLE_VERTEX_BODY), (a = t.REGULAR_FRAGMENT_HEADER + t.PARTICLE_FRAGMENT_BODY);
                        break;
                    case "override":
                        (o = t.REGULAR_VERTEX_HEADER + (s || t.REGULAR_VERTEX_BODY)), (a = t.REGULAR_FRAGMENT_HEADER + (r || t.REGULAR_FRAGMENT_BODY));
                        break;
                    default:
                        (o = t.REGULAR_VERTEX_HEADER + t.REGULAR_VERTEX_BODY), (a = t.REGULAR_FRAGMENT_HEADER + t.REGULAR_FRAGMENT_BODY);
                }
                var h = this._createShader(e, e.VERTEX_SHADER, o),
                    c = this._createShader(e, e.FRAGMENT_SHADER, a),
                    u = e.createProgram();
                if ((e.attachShader(u, h), e.attachShader(u, c), e.linkProgram(u), (u._type = i), !e.getProgramParameter(u, e.LINK_STATUS))) throw (e.useProgram(this._activeShader), e.getProgramInfoLog(u));
                if ("filter" === (e.useProgram(u), i))
                    (u.vertexPositionAttribute = e.getAttribLocation(u, "vertexPosition")),
                        e.enableVertexAttribArray(u.vertexPositionAttribute),
                        (u.uvPositionAttribute = e.getAttribLocation(u, "uvPosition")),
                        e.enableVertexAttribArray(u.uvPositionAttribute),
                        (u.samplerUniform = e.getUniformLocation(u, "uSampler")),
                        e.uniform1i(u.samplerUniform, 0),
                        (u.uprightUniform = e.getUniformLocation(u, "uUpright")),
                        e.uniform1f(u.uprightUniform, 0),
                        n && n(e, this, u);
                else {
                    (u.vertexPositionAttribute = e.getAttribLocation(u, "vertexPosition")),
                        e.enableVertexAttribArray(u.vertexPositionAttribute),
                        (u.uvPositionAttribute = e.getAttribLocation(u, "uvPosition")),
                        e.enableVertexAttribArray(u.uvPositionAttribute),
                        (u.textureIndexAttribute = e.getAttribLocation(u, "textureIndex")),
                        e.enableVertexAttribArray(u.textureIndexAttribute),
                        (u.alphaAttribute = e.getAttribLocation(u, "objectAlpha")),
                        e.enableVertexAttribArray(u.alphaAttribute);
                    for (var l = [], d = 0; d < this._batchTextureCount; d++) l[d] = d;
                    (u.samplerData = l), (u.samplerUniform = e.getUniformLocation(u, "uSampler")), e.uniform1iv(u.samplerUniform, l), (u.pMatrixUniform = e.getUniformLocation(u, "pMatrix"));
                }
                return e.useProgram(this._activeShader), u;
            }),
            (e._createShader = function (e, i, s) {
                s = s.replace(/{{count}}/g, this._batchTextureCount);
                for (var r = "", n = 1; n < this._batchTextureCount; n++) r += "} else if (indexPicker <= " + n + ".5) { color = texture2D(uSampler[" + n + "], vTextureCoord);";
                s = (s = s.replace(/{{alternates}}/g, r)).replace(/{{fragColor}}/g, this._premultiply ? t.REGULAR_FRAG_COLOR_PREMULTIPLY : t.REGULAR_FRAG_COLOR_NORMAL);
                var a = e.createShader(i);
                if ((e.shaderSource(a, s), e.compileShader(a), !e.getShaderParameter(a, e.COMPILE_STATUS))) throw e.getShaderInfoLog(a);
                return a;
            }),
            (e._createBuffers = function (e) {
                var i,
                    s,
                    r,
                    n = this._maxCardsPerBatch * t.INDICIES_PER_CARD,
                    a = (this._vertexPositionBuffer = e.createBuffer());
                e.bindBuffer(e.ARRAY_BUFFER, a), (i = 2);
                var o = (this._vertices = new Float32Array(n * i));
                for (s = 0, r = o.length; r > s; s += i) o[s] = o[s + 1] = 0;
                e.bufferData(e.ARRAY_BUFFER, o, e.DYNAMIC_DRAW), (a.itemSize = i), (a.numItems = n);
                var h = (this._uvPositionBuffer = e.createBuffer());
                e.bindBuffer(e.ARRAY_BUFFER, h), (i = 2);
                var c = (this._uvs = new Float32Array(n * i));
                for (s = 0, r = c.length; r > s; s += i) c[s] = c[s + 1] = 0;
                e.bufferData(e.ARRAY_BUFFER, c, e.DYNAMIC_DRAW), (h.itemSize = i), (h.numItems = n);
                var u = (this._textureIndexBuffer = e.createBuffer());
                e.bindBuffer(e.ARRAY_BUFFER, u), (i = 1);
                var l = (this._indices = new Float32Array(n * i));
                for (s = 0, r = l.length; r > s; s++) l[s] = 0;
                e.bufferData(e.ARRAY_BUFFER, l, e.DYNAMIC_DRAW), (u.itemSize = i), (u.numItems = n);
                var d = (this._alphaBuffer = e.createBuffer());
                e.bindBuffer(e.ARRAY_BUFFER, d), (i = 1);
                var _ = (this._alphas = new Float32Array(n * i));
                for (s = 0, r = _.length; r > s; s++) _[s] = 1;
                e.bufferData(e.ARRAY_BUFFER, _, e.DYNAMIC_DRAW), (d.itemSize = i), (d.numItems = n);
            }),
            (e._initTextures = function () {
                (this._lastTextureInsert = -1), (this._textureDictionary = []), (this._textureIDs = {}), (this._baseTextures = []), (this._batchTextures = []);
                for (var t = 0; t < this._batchTextureCount; t++) {
                    var e = this.getBaseTexture();
                    if (((this._baseTextures[t] = this._batchTextures[t] = e), !e)) throw "Problems creating basic textures, known causes include using too much VRAM by not releasing WebGL texture instances";
                }
            }),
            (e._loadTextureImage = function (t, e) {
                var i = e.src;
                i || ((e._isCanvas = !0), (i = e.src = "canvas_" + this._lastTrackedCanvas++));
                var s = this._textureIDs[i];
                void 0 === s && (s = this._textureIDs[i] = this._textureDictionary.length), void 0 === this._textureDictionary[s] && (this._textureDictionary[s] = this.getBaseTexture());
                var r = this._textureDictionary[s];
                if (r)
                    (r._batchID = this._batchID),
                        (r._storeID = s),
                        (r._imageData = e),
                        this._insertTextureInBatch(t, r),
                        (e._storeID = s),
                        e.complete || e.naturalWidth || e._isCanvas ? this._updateTextureImageData(t, e) : e.addEventListener("load", this._updateTextureImageData.bind(this, t, e));
                else {
                    var n = "Problem creating desired texture, known causes include using too much VRAM by not releasing WebGL texture instances";
                    (console.error && console.error(n)) || console.log(n), ((r = this._baseTextures[0])._batchID = this._batchID), (r._storeID = -1), (r._imageData = r), this._insertTextureInBatch(t, r);
                }
                return r;
            }),
            (e._updateTextureImageData = function (t, e) {
                var i = e.width & (e.width - 1) || e.height & (e.height - 1),
                    s = this._textureDictionary[e._storeID];
                t.activeTexture(t.TEXTURE0 + s._activeIndex), t.bindTexture(t.TEXTURE_2D, s), (s.isPOT = !i), this.setTextureParams(t, s.isPOT);
                try {
                    t.texImage2D(t.TEXTURE_2D, 0, t.RGBA, t.RGBA, t.UNSIGNED_BYTE, e);
                } catch (t) {
                    var r = "\nAn error has occurred. This is most likely due to security restrictions on WebGL images with local or cross-domain origins";
                    console.error ? (console.error(r), console.error(t)) : console && (console.log(r), console.log(t));
                }
                (e._invalid = !1),
                    (s._w = e.width),
                    (s._h = e.height),
                    this.vocalDebug &&
                        (i && console.warn("NPOT(Non Power of Two) Texture: " + e.src),
                        (e.width > t.MAX_TEXTURE_SIZE || e.height > t.MAX_TEXTURE_SIZE) && console && console.error("Oversized Texture: " + e.width + "x" + e.height + " vs " + t.MAX_TEXTURE_SIZE + "max"));
            }),
            (e._insertTextureInBatch = function (t, e) {
                if (this._batchTextures[e._activeIndex] !== e) {
                    var i = -1,
                        s = (this._lastTextureInsert + 1) % this._batchTextureCount,
                        r = s;
                    do {
                        if (this._batchTextures[r]._batchID != this._batchID && !this._slotBlacklist[r]) {
                            i = r;
                            break;
                        }
                        r = (r + 1) % this._batchTextureCount;
                    } while (r !== s);
                    -1 === i && ((this.batchReason = "textureOverflow"), this._drawBuffers(t), (this.batchCardCount = 0), (i = s)),
                        (this._batchTextures[i] = e),
                        (e._activeIndex = i),
                        (n = e._imageData) && n._invalid && void 0 !== e._drawID ? this._updateTextureImageData(t, n) : (t.activeTexture(t.TEXTURE0 + i), t.bindTexture(t.TEXTURE_2D, e), this.setTextureParams(t)),
                        (this._lastTextureInsert = i);
                } else {
                    var n = e._imageData;
                    null != e._storeID && n && n._invalid && this._updateTextureImageData(t, n);
                }
                (e._drawID = this._drawID), (e._batchID = this._batchID);
            }),
            (e._killTextureObject = function (t) {
                if (t) {
                    var e = this._webGLContext;
                    if (void 0 !== t._storeID && t._storeID >= 0) {
                        for (var i in ((this._textureDictionary[t._storeID] = void 0), this._textureIDs)) this._textureIDs[i] == t._storeID && delete this._textureIDs[i];
                        t._imageData && (t._imageData._storeID = void 0), (t._imageData = t._storeID = void 0);
                    }
                    void 0 !== t._activeIndex && this._batchTextures[t._activeIndex] === t && (this._batchTextures[t._activeIndex] = this._baseTextures[t._activeIndex]);
                    try {
                        t._frameBuffer && e.deleteFramebuffer(t._frameBuffer), (t._frameBuffer = void 0);
                    } catch (t) {
                        this.vocalDebug && console.log(t);
                    }
                    try {
                        e.deleteTexture(t);
                    } catch (t) {
                        this.vocalDebug && console.log(t);
                    }
                }
            }),
            (e._backupBatchTextures = function (t, e) {
                var i = this._webGLContext;
                this._backupTextures || (this._backupTextures = []), void 0 === e && (e = this._backupTextures);
                for (var s = 0; s < this._batchTextureCount; s++)
                    i.activeTexture(i.TEXTURE0 + s),
                        t ? (this._batchTextures[s] = e[s]) : ((e[s] = this._batchTextures[s]), (this._batchTextures[s] = this._baseTextures[s])),
                        i.bindTexture(i.TEXTURE_2D, this._batchTextures[s]),
                        this.setTextureParams(i, this._batchTextures[s].isPOT);
                t && e === this._backupTextures && (this._backupTextures = []);
            }),
            (e._batchDraw = function (t, e, i) {
                this._isDrawing > 0 && this._drawBuffers(e),
                    this._isDrawing++,
                    this._drawID++,
                    (this.batchCardCount = 0),
                    (this.depth = 0),
                    this._appendToBatchGroup(t, e, new createjs.Matrix2D(), this.alpha, i),
                    (this.batchReason = "drawFinish"),
                    this._drawBuffers(e),
                    this._isDrawing--;
            }),
            (e._cacheDraw = function (t, e, i, s) {
                var r,
                    n = this._activeShader,
                    a = this._slotBlacklist,
                    o = this._maxTextureSlots - 1,
                    h = this._viewportWidth,
                    c = this._viewportHeight;
                this.protectTextureSlot(o, !0);
                var u = e.getMatrix();
                (u = u.clone()).scale(1 / s.scale, 1 / s.scale), (u = u.invert()).translate((-s.offX / s.scale) * e.scaleX, (-s.offY / s.scale) * e.scaleY);
                var l = this._cacheContainer;
                (l.children = [e]),
                    (l.transformMatrix = u),
                    this._backupBatchTextures(!1),
                    i && i.length
                        ? this._drawFilters(e, i, s)
                        : this.isCacheControlled
                        ? (t.clear(t.COLOR_BUFFER_BIT), this._batchDraw(l, t, !0))
                        : (t.activeTexture(t.TEXTURE0 + o),
                          (e.cacheCanvas = this.getTargetRenderTexture(e, s._drawWidth, s._drawHeight)),
                          (r = e.cacheCanvas),
                          t.bindFramebuffer(t.FRAMEBUFFER, r._frameBuffer),
                          this.updateViewport(s._drawWidth, s._drawHeight),
                          (this._projectionMatrix = this._projectionMatrixFlip),
                          t.clear(t.COLOR_BUFFER_BIT),
                          this._batchDraw(l, t, !0),
                          t.bindFramebuffer(t.FRAMEBUFFER, null),
                          this.updateViewport(h, c)),
                    this._backupBatchTextures(!0),
                    this.protectTextureSlot(o, !1),
                    (this._activeShader = n),
                    (this._slotBlacklist = a);
            }),
            (e._drawFilters = function (t, e, i) {
                var s,
                    r = this._webGLContext,
                    n = this._maxTextureSlots - 1,
                    a = this._viewportWidth,
                    o = this._viewportHeight,
                    h = this._cacheContainer,
                    c = e.length;
                r.activeTexture(r.TEXTURE0 + n),
                    (s = this.getTargetRenderTexture(t, i._drawWidth, i._drawHeight)),
                    r.bindFramebuffer(r.FRAMEBUFFER, s._frameBuffer),
                    this.updateViewport(i._drawWidth, i._drawHeight),
                    r.clear(r.COLOR_BUFFER_BIT),
                    this._batchDraw(h, r, !0),
                    r.activeTexture(r.TEXTURE0),
                    r.bindTexture(r.TEXTURE_2D, s),
                    this.setTextureParams(r);
                var u = !1,
                    l = 0,
                    d = e[l];
                do {
                    (this._activeShader = this.getFilterShader(d)),
                        this._activeShader &&
                            (r.activeTexture(r.TEXTURE0 + n),
                            (s = this.getTargetRenderTexture(t, i._drawWidth, i._drawHeight)),
                            r.bindFramebuffer(r.FRAMEBUFFER, s._frameBuffer),
                            r.viewport(0, 0, i._drawWidth, i._drawHeight),
                            r.clear(r.COLOR_BUFFER_BIT),
                            this._drawCover(r, u),
                            r.activeTexture(r.TEXTURE0),
                            r.bindTexture(r.TEXTURE_2D, s),
                            this.setTextureParams(r),
                            (c > 1 || e[0]._multiPass) && (u = !u),
                            (d = null !== d._multiPass ? d._multiPass : e[++l]));
                } while (d);
                this.isCacheControlled
                    ? (r.bindFramebuffer(r.FRAMEBUFFER, null), this.updateViewport(a, o), (this._activeShader = this.getFilterShader(this)), r.clear(r.COLOR_BUFFER_BIT), this._drawCover(r, u))
                    : (u &&
                          (r.activeTexture(r.TEXTURE0 + n),
                          (s = this.getTargetRenderTexture(t, i._drawWidth, i._drawHeight)),
                          r.bindFramebuffer(r.FRAMEBUFFER, s._frameBuffer),
                          (this._activeShader = this.getFilterShader(this)),
                          r.viewport(0, 0, i._drawWidth, i._drawHeight),
                          r.clear(r.COLOR_BUFFER_BIT),
                          this._drawCover(r, !u)),
                      r.bindFramebuffer(r.FRAMEBUFFER, null),
                      this.updateViewport(a, o),
                      (t.cacheCanvas = s));
            }),
            (e._appendToBatchGroup = function (e, i, s, r, n) {
                e._glMtx || (e._glMtx = new createjs.Matrix2D());
                var a = e._glMtx;
                a.copy(s), e.transformMatrix ? a.appendMatrix(e.transformMatrix) : a.appendTransform(e.x, e.y, e.scaleX, e.scaleY, e.rotation, e.skewX, e.skewY, e.regX, e.regY);
                for (var o, h, c, u, l = e.children.length, d = 0; l > d; d++) {
                    var _ = e.children[d];
                    if (_.visible && r)
                        if ((_.cacheCanvas && !n) || (_._updateState && _._updateState(), !_.children)) {
                            this.batchCardCount + 1 > this._maxCardsPerBatch && ((this.batchReason = "vertexOverflow"), this._drawBuffers(i), (this.batchCardCount = 0)), _._glMtx || (_._glMtx = new createjs.Matrix2D());
                            var p = _._glMtx;
                            p.copy(a), _.transformMatrix ? p.appendMatrix(_.transformMatrix) : p.appendTransform(_.x, _.y, _.scaleX, _.scaleY, _.rotation, _.skewX, _.skewY, _.regX, _.regY);
                            var f,
                                g,
                                m,
                                v,
                                T,
                                b,
                                E = _.cacheCanvas && !n;
                            if (2 === _._webGLRenderStyle || E) m = (!n && _.cacheCanvas) || _.image;
                            else {
                                if (1 !== _._webGLRenderStyle) continue;
                                if (null === (v = _.spriteSheet.getFrame(_.currentFrame))) continue;
                                m = v.image;
                            }
                            var y = this._uvs,
                                S = this._vertices,
                                x = this._indices,
                                w = this._alphas;
                            if (m) {
                                if (void 0 === m._storeID) (T = this._loadTextureImage(i, m)), this._insertTextureInBatch(i, T);
                                else {
                                    if (!(T = this._textureDictionary[m._storeID])) {
                                        this.vocalDebug && console.log("Texture should not be looked up while not being stored.");
                                        continue;
                                    }
                                    T._batchID !== this._batchID && this._insertTextureInBatch(i, T);
                                }
                                if (((g = T._activeIndex), 2 === _._webGLRenderStyle || E))
                                    !E && _.sourceRect
                                        ? (_._uvRect || (_._uvRect = {}),
                                          (b = _.sourceRect),
                                          ((f = _._uvRect).t = b.y / m.height),
                                          (f.l = b.x / m.width),
                                          (f.b = (b.y + b.height) / m.height),
                                          (f.r = (b.x + b.width) / m.width),
                                          (o = 0),
                                          (h = 0),
                                          (c = b.width + o),
                                          (u = b.height + h))
                                        : ((f = t.UV_RECT),
                                          E
                                              ? ((o = (b = _.bitmapCache).x + b._filterOffX / b.scale), (h = b.y + b._filterOffY / b.scale), (c = b._drawWidth / b.scale + o), (u = b._drawHeight / b.scale + h))
                                              : ((o = 0), (h = 0), (c = m.width + o), (u = m.height + h)));
                                else if (1 === _._webGLRenderStyle) {
                                    var j = v.rect;
                                    (f = v.uvRect) || (f = t.buildUVRects(_.spriteSheet, _.currentFrame, !1)), (o = -v.regX), (h = -v.regY), (c = j.width - v.regX), (u = j.height - v.regY);
                                }
                                var A = this.batchCardCount * t.INDICIES_PER_CARD,
                                    R = 2 * A;
                                (S[R] = o * p.a + h * p.c + p.tx),
                                    (S[R + 1] = o * p.b + h * p.d + p.ty),
                                    (S[R + 2] = o * p.a + u * p.c + p.tx),
                                    (S[R + 3] = o * p.b + u * p.d + p.ty),
                                    (S[R + 4] = c * p.a + h * p.c + p.tx),
                                    (S[R + 5] = c * p.b + h * p.d + p.ty),
                                    (S[R + 6] = S[R + 2]),
                                    (S[R + 7] = S[R + 3]),
                                    (S[R + 8] = S[R + 4]),
                                    (S[R + 9] = S[R + 5]),
                                    (S[R + 10] = c * p.a + u * p.c + p.tx),
                                    (S[R + 11] = c * p.b + u * p.d + p.ty),
                                    (y[R] = f.l),
                                    (y[R + 1] = f.t),
                                    (y[R + 2] = f.l),
                                    (y[R + 3] = f.b),
                                    (y[R + 4] = f.r),
                                    (y[R + 5] = f.t),
                                    (y[R + 6] = f.l),
                                    (y[R + 7] = f.b),
                                    (y[R + 8] = f.r),
                                    (y[R + 9] = f.t),
                                    (y[R + 10] = f.r),
                                    (y[R + 11] = f.b),
                                    (x[A] = x[A + 1] = x[A + 2] = x[A + 3] = x[A + 4] = x[A + 5] = g),
                                    (w[A] = w[A + 1] = w[A + 2] = w[A + 3] = w[A + 4] = w[A + 5] = _.alpha * r),
                                    this.batchCardCount++;
                            }
                        } else this._appendToBatchGroup(_, i, a, _.alpha * r);
                }
            }),
            (e._drawBuffers = function (e) {
                if (!(this.batchCardCount <= 0)) {
                    this.vocalDebug && console.log("Draw[" + this._drawID + ":" + this._batchID + "] : " + this.batchReason);
                    var i = this._activeShader,
                        s = this._vertexPositionBuffer,
                        r = this._textureIndexBuffer,
                        n = this._uvPositionBuffer,
                        a = this._alphaBuffer;
                    e.useProgram(i),
                        e.bindBuffer(e.ARRAY_BUFFER, s),
                        e.vertexAttribPointer(i.vertexPositionAttribute, s.itemSize, e.FLOAT, !1, 0, 0),
                        e.bufferSubData(e.ARRAY_BUFFER, 0, this._vertices),
                        e.bindBuffer(e.ARRAY_BUFFER, r),
                        e.vertexAttribPointer(i.textureIndexAttribute, r.itemSize, e.FLOAT, !1, 0, 0),
                        e.bufferSubData(e.ARRAY_BUFFER, 0, this._indices),
                        e.bindBuffer(e.ARRAY_BUFFER, n),
                        e.vertexAttribPointer(i.uvPositionAttribute, n.itemSize, e.FLOAT, !1, 0, 0),
                        e.bufferSubData(e.ARRAY_BUFFER, 0, this._uvs),
                        e.bindBuffer(e.ARRAY_BUFFER, a),
                        e.vertexAttribPointer(i.alphaAttribute, a.itemSize, e.FLOAT, !1, 0, 0),
                        e.bufferSubData(e.ARRAY_BUFFER, 0, this._alphas),
                        e.uniformMatrix4fv(i.pMatrixUniform, e.FALSE, this._projectionMatrix);
                    for (var o = 0; o < this._batchTextureCount; o++) {
                        var h = this._batchTextures[o];
                        e.activeTexture(e.TEXTURE0 + o), e.bindTexture(e.TEXTURE_2D, h), this.setTextureParams(e, h.isPOT);
                    }
                    e.drawArrays(e.TRIANGLES, 0, this.batchCardCount * t.INDICIES_PER_CARD), this._batchID++;
                }
            }),
            (e._drawCover = function (e, i) {
                this._isDrawing > 0 && this._drawBuffers(e), this.vocalDebug && console.log("Draw[" + this._drawID + ":" + this._batchID + "] : Cover");
                var s = this._activeShader,
                    r = this._vertexPositionBuffer,
                    n = this._uvPositionBuffer;
                e.clear(e.COLOR_BUFFER_BIT),
                    e.useProgram(s),
                    e.bindBuffer(e.ARRAY_BUFFER, r),
                    e.vertexAttribPointer(s.vertexPositionAttribute, r.itemSize, e.FLOAT, !1, 0, 0),
                    e.bufferSubData(e.ARRAY_BUFFER, 0, t.COVER_VERT),
                    e.bindBuffer(e.ARRAY_BUFFER, n),
                    e.vertexAttribPointer(s.uvPositionAttribute, n.itemSize, e.FLOAT, !1, 0, 0),
                    e.bufferSubData(e.ARRAY_BUFFER, 0, i ? t.COVER_UV_FLIP : t.COVER_UV),
                    e.uniform1i(s.samplerUniform, 0),
                    e.uniform1f(s.uprightUniform, i ? 0 : 1),
                    e.drawArrays(e.TRIANGLES, 0, t.INDICIES_PER_CARD);
            }),
            (createjs.StageGL = createjs.promote(t, "Stage"));
    })(),
    (this.createjs = this.createjs || {}),
    (function () {
        function t(t) {
            this.DisplayObject_constructor(),
                "string" == typeof t ? ((this.image = document.createElement("img")), (this.image.src = t)) : (this.image = t),
                (this.sourceRect = null),
                (this._webGLRenderStyle = createjs.DisplayObject._StageGL_BITMAP);
        }
        var e = createjs.extend(t, createjs.DisplayObject);
        (e.initialize = t),
            (e.isVisible = function () {
                var t = this.image,
                    e = this.cacheCanvas || (t && (t.naturalWidth || t.getContext || t.readyState >= 2));
                return !!(this.visible && this.alpha > 0 && 0 != this.scaleX && 0 != this.scaleY && e);
            }),
            (e.draw = function (t, e) {
                if (this.DisplayObject_draw(t, e)) return !0;
                var i = this.image,
                    s = this.sourceRect;
                if ((i.getImage && (i = i.getImage()), !i)) return !0;
                if (s) {
                    var r = s.x,
                        n = s.y,
                        a = r + s.width,
                        o = n + s.height,
                        h = 0,
                        c = 0,
                        u = i.width,
                        l = i.height;
                    0 > r && ((h -= r), (r = 0)), a > u && (a = u), 0 > n && ((c -= n), (n = 0)), o > l && (o = l), t.drawImage(i, r, n, a - r, o - n, h, c, a - r, o - n);
                } else t.drawImage(i, 0, 0);
                return !0;
            }),
            (e.getBounds = function () {
                var t = this.DisplayObject_getBounds();
                if (t) return t;
                var e = this.image,
                    i = this.sourceRect || e;
                return e && (e.naturalWidth || e.getContext || e.readyState >= 2) ? this._rectangle.setValues(0, 0, i.width, i.height) : null;
            }),
            (e.clone = function (e) {
                var i = this.image;
                i && e && (i = i.cloneNode());
                var s = new t(i);
                return this.sourceRect && (s.sourceRect = this.sourceRect.clone()), this._cloneProps(s), s;
            }),
            (e.toString = function () {
                return "[Bitmap (name=" + this.name + ")]";
            }),
            (createjs.Bitmap = createjs.promote(t, "DisplayObject"));
    })(),
    (this.createjs = this.createjs || {}),
    (function () {
        "use strict";
        function t(t, e) {
            this.DisplayObject_constructor(),
                (this.currentFrame = 0),
                (this.currentAnimation = null),
                (this.paused = !0),
                (this.spriteSheet = t),
                (this.currentAnimationFrame = 0),
                (this.framerate = 0),
                (this._animation = null),
                (this._currentFrame = null),
                (this._skipAdvance = !1),
                (this._webGLRenderStyle = createjs.DisplayObject._StageGL_SPRITE),
                null != e && this.gotoAndPlay(e);
        }
        var e = createjs.extend(t, createjs.DisplayObject);
        (e.initialize = t),
            (e.isVisible = function () {
                var t = this.cacheCanvas || this.spriteSheet.complete;
                return !!(this.visible && this.alpha > 0 && 0 != this.scaleX && 0 != this.scaleY && t);
            }),
            (e.draw = function (t, e) {
                if (this.DisplayObject_draw(t, e)) return !0;
                this._normalizeFrame();
                var i = this.spriteSheet.getFrame(0 | this._currentFrame);
                if (!i) return !1;
                var s = i.rect;
                return s.width && s.height && t.drawImage(i.image, s.x, s.y, s.width, s.height, -i.regX, -i.regY, s.width, s.height), !0;
            }),
            (e.play = function () {
                this.paused = !1;
            }),
            (e.stop = function () {
                this.paused = !0;
            }),
            (e.gotoAndPlay = function (t) {
                (this.paused = !1), (this._skipAdvance = !0), this._goto(t);
            }),
            (e.gotoAndStop = function (t) {
                (this.paused = !0), this._goto(t);
            }),
            (e.advance = function (t) {
                var e = this.framerate || this.spriteSheet.framerate,
                    i = e && null != t ? t / (1e3 / e) : 1;
                this._normalizeFrame(i);
            }),
            (e.getBounds = function () {
                return this.DisplayObject_getBounds() || this.spriteSheet.getFrameBounds(this.currentFrame, this._rectangle);
            }),
            (e.clone = function () {
                return this._cloneProps(new t(this.spriteSheet));
            }),
            (e.toString = function () {
                return "[Sprite (name=" + this.name + ")]";
            }),
            (e._cloneProps = function (t) {
                return (
                    this.DisplayObject__cloneProps(t),
                    (t.currentFrame = this.currentFrame),
                    (t.currentAnimation = this.currentAnimation),
                    (t.paused = this.paused),
                    (t.currentAnimationFrame = this.currentAnimationFrame),
                    (t.framerate = this.framerate),
                    (t._animation = this._animation),
                    (t._currentFrame = this._currentFrame),
                    (t._skipAdvance = this._skipAdvance),
                    t
                );
            }),
            (e._tick = function (t) {
                this.paused || (this._skipAdvance || this.advance(t && t.delta), (this._skipAdvance = !1)), this.DisplayObject__tick(t);
            }),
            (e._normalizeFrame = function (t) {
                t = t || 0;
                var e,
                    i = this._animation,
                    s = this.paused,
                    r = this._currentFrame;
                if (i) {
                    var n = i.speed || 1,
                        a = this.currentAnimationFrame;
                    if (a + t * n >= (e = i.frames.length)) {
                        var o = i.next;
                        if (this._dispatchAnimationEnd(i, r, s, o, e - 1)) return;
                        if (o) return this._goto(o, t - (e - a) / n);
                        (this.paused = !0), (a = i.frames.length - 1);
                    } else a += t * n;
                    (this.currentAnimationFrame = a), (this._currentFrame = i.frames[0 | a]);
                } else if ((r = this._currentFrame += t) >= (e = this.spriteSheet.getNumFrames()) && e > 0 && !this._dispatchAnimationEnd(i, r, s, e - 1) && (this._currentFrame -= e) >= e) return this._normalizeFrame();
                (r = 0 | this._currentFrame), this.currentFrame != r && ((this.currentFrame = r), this.dispatchEvent("change"));
            }),
            (e._dispatchAnimationEnd = function (t, e, i, s, r) {
                var n = t ? t.name : null;
                if (this.hasEventListener("animationend")) {
                    var a = new createjs.Event("animationend");
                    (a.name = n), (a.next = s), this.dispatchEvent(a);
                }
                var o = this._animation != t || this._currentFrame != e;
                return o || i || !this.paused || ((this.currentAnimationFrame = r), (o = !0)), o;
            }),
            (e._goto = function (t, e) {
                if (((this.currentAnimationFrame = 0), isNaN(t))) {
                    var i = this.spriteSheet.getAnimation(t);
                    i && ((this._animation = i), (this.currentAnimation = t), this._normalizeFrame(e));
                } else (this.currentAnimation = this._animation = null), (this._currentFrame = t), this._normalizeFrame();
            }),
            (createjs.Sprite = createjs.promote(t, "DisplayObject"));
    })(),
    (this.createjs = this.createjs || {}),
    (function () {
        "use strict";
        function t(t) {
            this.DisplayObject_constructor(), (this.graphics = t || new createjs.Graphics());
        }
        var e = createjs.extend(t, createjs.DisplayObject);
        (e.isVisible = function () {
            var t = this.cacheCanvas || (this.graphics && !this.graphics.isEmpty());
            return !!(this.visible && this.alpha > 0 && 0 != this.scaleX && 0 != this.scaleY && t);
        }),
            (e.draw = function (t, e) {
                return this.DisplayObject_draw(t, e) || this.graphics.draw(t, this), !0;
            }),
            (e.clone = function (e) {
                var i = e && this.graphics ? this.graphics.clone() : this.graphics;
                return this._cloneProps(new t(i));
            }),
            (e.toString = function () {
                return "[Shape (name=" + this.name + ")]";
            }),
            (createjs.Shape = createjs.promote(t, "DisplayObject"));
    })(),
    (this.createjs = this.createjs || {}),
    (function () {
        "use strict";
        function t(t, e, i) {
            this.DisplayObject_constructor(),
                (this.text = t),
                (this.font = e),
                (this.color = i),
                (this.textAlign = "left"),
                (this.textBaseline = "top"),
                (this.maxWidth = null),
                (this.outline = 0),
                (this.lineHeight = 0),
                (this.lineWidth = null);
        }
        var e = createjs.extend(t, createjs.DisplayObject),
            i = createjs.createCanvas ? createjs.createCanvas() : document.createElement("canvas");
        i.getContext && ((t._workingContext = i.getContext("2d")), (i.width = i.height = 1)),
            (t.H_OFFSETS = { start: 0, left: 0, center: -0.5, end: -1, right: -1 }),
            (t.V_OFFSETS = { top: 0, hanging: -0.01, middle: -0.4, alphabetic: -0.8, ideographic: -0.85, bottom: -1 }),
            (e.isVisible = function () {
                var t = this.cacheCanvas || (null != this.text && "" !== this.text);
                return !!(this.visible && this.alpha > 0 && 0 != this.scaleX && 0 != this.scaleY && t);
            }),
            (e.draw = function (t, e) {
                if (this.DisplayObject_draw(t, e)) return !0;
                var i = this.color || "#000";
                return this.outline ? ((t.strokeStyle = i), (t.lineWidth = 1 * this.outline)) : (t.fillStyle = i), this._drawText(this._prepContext(t)), !0;
            }),
            (e.getMeasuredWidth = function () {
                return this._getMeasuredWidth(this.text);
            }),
            (e.getMeasuredLineHeight = function () {
                return 1.2 * this._getMeasuredWidth("M");
            }),
            (e.getMeasuredHeight = function () {
                return this._drawText(null, {}).height;
            }),
            (e.getBounds = function () {
                var e = this.DisplayObject_getBounds();
                if (e) return e;
                if (null == this.text || "" === this.text) return null;
                var i = this._drawText(null, {}),
                    s = this.maxWidth && this.maxWidth < i.width ? this.maxWidth : i.width,
                    r = s * t.H_OFFSETS[this.textAlign || "left"],
                    n = (this.lineHeight || this.getMeasuredLineHeight()) * t.V_OFFSETS[this.textBaseline || "top"];
                return this._rectangle.setValues(r, n, s, i.height);
            }),
            (e.getMetrics = function () {
                var e = { lines: [] };
                return (e.lineHeight = this.lineHeight || this.getMeasuredLineHeight()), (e.vOffset = e.lineHeight * t.V_OFFSETS[this.textBaseline || "top"]), this._drawText(null, e, e.lines);
            }),
            (e.clone = function () {
                return this._cloneProps(new t(this.text, this.font, this.color));
            }),
            (e.toString = function () {
                return "[Text (text=" + (this.text.length > 20 ? this.text.substr(0, 17) + "..." : this.text) + ")]";
            }),
            (e._cloneProps = function (t) {
                return (
                    this.DisplayObject__cloneProps(t),
                    (t.textAlign = this.textAlign),
                    (t.textBaseline = this.textBaseline),
                    (t.maxWidth = this.maxWidth),
                    (t.outline = this.outline),
                    (t.lineHeight = this.lineHeight),
                    (t.lineWidth = this.lineWidth),
                    t
                );
            }),
            (e._prepContext = function (t) {
                return (t.font = this.font || "10px sans-serif"), (t.textAlign = this.textAlign || "left"), (t.textBaseline = this.textBaseline || "top"), (t.lineJoin = "miter"), (t.miterLimit = 2.5), t;
            }),
            (e._drawText = function (e, i, s) {
                var r = !!e;
                r || ((e = t._workingContext).save(), this._prepContext(e));
                for (var n = this.lineHeight || this.getMeasuredLineHeight(), a = 0, o = 0, h = String(this.text).split(/(?:\r\n|\r|\n)/), c = 0, u = h.length; u > c; c++) {
                    var l = h[c],
                        d = null;
                    if (null != this.lineWidth && (d = e.measureText(l).width) > this.lineWidth) {
                        var _ = l.split(/(\s)/);
                        (l = _[0]), (d = e.measureText(l).width);
                        for (var p = 1, f = _.length; f > p; p += 2) {
                            var g = e.measureText(_[p] + _[p + 1]).width;
                            d + g > this.lineWidth ? (r && this._drawTextLine(e, l, o * n), s && s.push(l), d > a && (a = d), (l = _[p + 1]), (d = e.measureText(l).width), o++) : ((l += _[p] + _[p + 1]), (d += g));
                        }
                    }
                    r && this._drawTextLine(e, l, o * n), s && s.push(l), i && null == d && (d = e.measureText(l).width), d > a && (a = d), o++;
                }
                return i && ((i.width = a), (i.height = o * n)), r || e.restore(), i;
            }),
            (e._drawTextLine = function (t, e, i) {
                this.outline ? t.strokeText(e, 0, i, this.maxWidth || 65535) : t.fillText(e, 0, i, this.maxWidth || 65535);
            }),
            (e._getMeasuredWidth = function (e) {
                var i = t._workingContext;
                i.save();
                var s = this._prepContext(i).measureText(e).width;
                return i.restore(), s;
            }),
            (createjs.Text = createjs.promote(t, "DisplayObject"));
    })(),
    (this.createjs = this.createjs || {}),
    (function () {
        "use strict";
        function t(t, e) {
            this.Container_constructor(),
                (this.text = t || ""),
                (this.spriteSheet = e),
                (this.lineHeight = 0),
                (this.letterSpacing = 0),
                (this.spaceWidth = 0),
                (this._oldProps = { text: 0, spriteSheet: 0, lineHeight: 0, letterSpacing: 0, spaceWidth: 0 }),
                (this._oldStage = null),
                (this._drawAction = null);
        }
        var e = createjs.extend(t, createjs.Container);
        (t.maxPoolSize = 100),
            (t._spritePool = []),
            (e.draw = function (t, e) {
                this.DisplayObject_draw(t, e) || (this._updateState(), this.Container_draw(t, e));
            }),
            (e.getBounds = function () {
                return this._updateText(), this.Container_getBounds();
            }),
            (e.isVisible = function () {
                var t = this.cacheCanvas || (this.spriteSheet && this.spriteSheet.complete && this.text);
                return !!(this.visible && this.alpha > 0 && 0 !== this.scaleX && 0 !== this.scaleY && t);
            }),
            (e.clone = function () {
                return this._cloneProps(new t(this.text, this.spriteSheet));
            }),
            (e.addChild = e.addChildAt = e.removeChild = e.removeChildAt = e.removeAllChildren = function () {}),
            (e._updateState = function () {
                this._updateText();
            }),
            (e._cloneProps = function (t) {
                return this.Container__cloneProps(t), (t.lineHeight = this.lineHeight), (t.letterSpacing = this.letterSpacing), (t.spaceWidth = this.spaceWidth), t;
            }),
            (e._getFrameIndex = function (t, e) {
                var i,
                    s = e.getAnimation(t);
                return s || (t != (i = t.toUpperCase()) || t != (i = t.toLowerCase()) || (i = null), i && (s = e.getAnimation(i))), s && s.frames[0];
            }),
            (e._getFrame = function (t, e) {
                var i = this._getFrameIndex(t, e);
                return null == i ? i : e.getFrame(i);
            }),
            (e._getLineHeight = function (t) {
                var e = this._getFrame("1", t) || this._getFrame("T", t) || this._getFrame("L", t) || t.getFrame(0);
                return e ? e.rect.height : 1;
            }),
            (e._getSpaceWidth = function (t) {
                var e = this._getFrame("1", t) || this._getFrame("l", t) || this._getFrame("e", t) || this._getFrame("a", t) || t.getFrame(0);
                return e ? e.rect.width : 1;
            }),
            (e._updateText = function () {
                var e,
                    i = 0,
                    s = 0,
                    r = this._oldProps,
                    n = !1,
                    a = this.spaceWidth,
                    o = this.lineHeight,
                    h = this.spriteSheet,
                    c = t._spritePool,
                    u = this.children,
                    l = 0,
                    d = u.length;
                for (var _ in r) r[_] != this[_] && ((r[_] = this[_]), (n = !0));
                if (n) {
                    var p = !!this._getFrame(" ", h);
                    p || a || (a = this._getSpaceWidth(h)), o || (o = this._getLineHeight(h));
                    for (var f = 0, g = this.text.length; g > f; f++) {
                        var m = this.text.charAt(f);
                        if (" " != m || p)
                            if ("\n" != m && "\r" != m) {
                                var v = this._getFrameIndex(m, h);
                                null != v &&
                                    (d > l ? (e = u[l]) : (u.push((e = c.length ? c.pop() : new createjs.Sprite())), (e.parent = this), d++),
                                    (e.spriteSheet = h),
                                    e.gotoAndStop(v),
                                    (e.x = i),
                                    (e.y = s),
                                    l++,
                                    (i += e.getBounds().width + this.letterSpacing));
                            } else "\r" == m && "\n" == this.text.charAt(f + 1) && f++, (i = 0), (s += o);
                        else i += a;
                    }
                    for (; d > l; ) c.push((e = u.pop())), (e.parent = null), d--;
                    c.length > t.maxPoolSize && (c.length = t.maxPoolSize);
                }
            }),
            (createjs.BitmapText = createjs.promote(t, "Container"));
    })(),
    (this.createjs = this.createjs || {}),
    (function () {
        "use strict";
        function t(e) {
            var i, s, r, n;
            this.Container_constructor(),
                !t.inited && t.init(),
                e instanceof String || arguments.length > 1 ? ((i = e), (s = arguments[1]), (n = arguments[3]), null == (r = arguments[2]) && (r = -1), (e = null)) : e && ((i = e.mode), (s = e.startPosition), (r = e.loop), (n = e.labels)),
                e || (e = { labels: n }),
                (this.mode = i || t.INDEPENDENT),
                (this.startPosition = s || 0),
                (this.loop = !0 === r ? -1 : r || 0),
                (this.currentFrame = 0),
                (this.paused = e.paused || !1),
                (this.actionsEnabled = !0),
                (this.autoReset = !0),
                (this.frameBounds = this.frameBounds || e.frameBounds),
                (this.framerate = null),
                (e.useTicks = e.paused = !0),
                (this.timeline = new createjs.Timeline(e)),
                (this._synchOffset = 0),
                (this._rawPosition = -1),
                (this._bound_resolveState = this._resolveState.bind(this)),
                (this._t = 0),
                (this._managed = {});
        }
        function e() {
            throw "MovieClipPlugin cannot be instantiated.";
        }
        var i = createjs.extend(t, createjs.Container);
        (t.INDEPENDENT = "independent"),
            (t.SINGLE_FRAME = "single"),
            (t.SYNCHED = "synched"),
            (t.inited = !1),
            (t.init = function () {
                t.inited || (e.install(), (t.inited = !0));
            }),
            (i._getLabels = function () {
                return this.timeline.getLabels();
            }),
            (i.getLabels = createjs.deprecate(i._getLabels, "MovieClip.getLabels")),
            (i._getCurrentLabel = function () {
                return this.timeline.currentLabel;
            }),
            (i.getCurrentLabel = createjs.deprecate(i._getCurrentLabel, "MovieClip.getCurrentLabel")),
            (i._getDuration = function () {
                return this.timeline.duration;
            }),
            (i.getDuration = createjs.deprecate(i._getDuration, "MovieClip.getDuration"));
        try {
            Object.defineProperties(i, { labels: { get: i._getLabels }, currentLabel: { get: i._getCurrentLabel }, totalFrames: { get: i._getDuration }, duration: { get: i._getDuration } });
        } catch (t) {}
        (i.initialize = t),
            (i.isVisible = function () {
                return !!(this.visible && this.alpha > 0 && 0 != this.scaleX && 0 != this.scaleY);
            }),
            (i.draw = function (t, e) {
                return this.DisplayObject_draw(t, e) || (this._updateState(), this.Container_draw(t, e)), !0;
            }),
            (i.play = function () {
                this.paused = !1;
            }),
            (i.stop = function () {
                this.paused = !0;
            }),
            (i.gotoAndPlay = function (t) {
                (this.paused = !1), this._goto(t);
            }),
            (i.gotoAndStop = function (t) {
                (this.paused = !0), this._goto(t);
            }),
            (i.advance = function (e) {
                var i = t.INDEPENDENT;
                if (this.mode === i) {
                    for (var s = this, r = s.framerate; (s = s.parent) && null === r; ) s.mode === i && (r = s._framerate);
                    if (((this._framerate = r), !this.paused)) {
                        var n = null !== r && -1 !== r && null !== e ? e / (1e3 / r) + this._t : 1,
                            a = 0 | n;
                        for (this._t = n - a; a--; ) this._updateTimeline(this._rawPosition + 1, !1);
                    }
                }
            }),
            (i.clone = function () {
                throw "MovieClip cannot be cloned.";
            }),
            (i.toString = function () {
                return "[MovieClip (name=" + this.name + ")]";
            }),
            (i._updateState = function () {
                (-1 === this._rawPosition || this.mode !== t.INDEPENDENT) && this._updateTimeline(-1);
            }),
            (i._tick = function (t) {
                this.advance(t && t.delta), this.Container__tick(t);
            }),
            (i._goto = function (t) {
                var e = this.timeline.resolve(t);
                null != e && ((this._t = 0), this._updateTimeline(e, !0));
            }),
            (i._reset = function () {
                (this._rawPosition = -1), (this._t = this.currentFrame = 0), (this.paused = !1);
            }),
            (i._updateTimeline = function (e, i) {
                var s = this.mode !== t.INDEPENDENT,
                    r = this.timeline;
                s && (e = this.startPosition + (this.mode === t.SINGLE_FRAME ? 0 : this._synchOffset)),
                    0 > e && (e = 0),
                    (this._rawPosition !== e || s) && ((this._rawPosition = e), (r.loop = this.loop), r.setPosition(e, s || !this.actionsEnabled, i, this._bound_resolveState));
            }),
            (i._renderFirstFrame = function () {
                var t = this.timeline,
                    e = t.rawPosition;
                t.setPosition(0, !0, !0, this._bound_resolveState), (t.rawPosition = e);
            }),
            (i._resolveState = function () {
                var t = this.timeline;
                for (var e in ((this.currentFrame = t.position), this._managed)) this._managed[e] = 1;
                for (var i = t.tweens, s = 0, r = i.length; r > s; s++) {
                    var n = i[s],
                        a = n.target;
                    if (a !== this && !n.passive) {
                        var o = n._stepPosition;
                        a instanceof createjs.DisplayObject ? this._addManagedChild(a, o) : this._setState(a.state, o);
                    }
                }
                var h = this.children;
                for (s = h.length - 1; s >= 0; s--) {
                    var c = h[s].id;
                    1 === this._managed[c] && (this.removeChildAt(s), delete this._managed[c]);
                }
            }),
            (i._setState = function (t, e) {
                if (t)
                    for (var i = t.length - 1; i >= 0; i--) {
                        var s = t[i],
                            r = s.t,
                            n = s.p;
                        for (var a in n) r[a] = n[a];
                        this._addManagedChild(r, e);
                    }
            }),
            (i._addManagedChild = function (e, i) {
                e._off || (this.addChildAt(e, 0), e instanceof t && ((e._synchOffset = i), e.mode === t.INDEPENDENT && e.autoReset && !this._managed[e.id] && e._reset()), (this._managed[e.id] = 2));
            }),
            (i._getBounds = function (t, e) {
                var i = this.DisplayObject_getBounds();
                return i || (this.frameBounds && (i = this._rectangle.copy(this.frameBounds[this.currentFrame]))), i ? this._transformBounds(i, t, e) : this.Container__getBounds(t, e);
            }),
            (createjs.MovieClip = createjs.promote(t, "Container")),
            (e.priority = 100),
            (e.ID = "MovieClip"),
            (e.install = function () {
                createjs.Tween._installPlugin(e);
            }),
            (e.init = function (i, s, r) {
                "startPosition" === s && i.target instanceof t && i._addPlugin(e);
            }),
            (e.step = function (t, e, i) {}),
            (e.change = function (t, e, i, s, r, n) {
                return "startPosition" === i ? (1 === r ? e.props[i] : e.prev.props[i]) : void 0;
            });
    })(),
    (this.createjs = this.createjs || {}),
    (function () {
        "use strict";
        function t() {
            throw "SpriteSheetUtils cannot be instantiated";
        }
        var e = createjs.createCanvas ? createjs.createCanvas() : document.createElement("canvas");
        e.getContext && ((t._workingCanvas = e), (t._workingContext = e.getContext("2d")), (e.width = e.height = 1)),
            (t.extractFrame = function (e, i) {
                isNaN(i) && (i = e.getAnimation(i).frames[0]);
                var s = e.getFrame(i);
                if (!s) return null;
                var r = s.rect,
                    n = t._workingCanvas;
                (n.width = r.width), (n.height = r.height), t._workingContext.drawImage(s.image, r.x, r.y, r.width, r.height, 0, 0, r.width, r.height);
                var a = document.createElement("img");
                return (a.src = n.toDataURL("image/png")), a;
            }),
            (t.addFlippedFrames = createjs.deprecate(null, "SpriteSheetUtils.addFlippedFrames")),
            (t.mergeAlpha = createjs.deprecate(null, "SpriteSheetUtils.mergeAlpha")),
            (t._flip = function (e, i, s, r) {
                for (var n = e._images, a = t._workingCanvas, o = t._workingContext, h = n.length / i, c = 0; h > c; c++) {
                    var u = n[c];
                    (u.__tmp = c),
                        o.setTransform(1, 0, 0, 1, 0, 0),
                        o.clearRect(0, 0, a.width + 1, a.height + 1),
                        (a.width = u.width),
                        (a.height = u.height),
                        o.setTransform(s ? -1 : 1, 0, 0, r ? -1 : 1, s ? u.width : 0, r ? u.height : 0),
                        o.drawImage(u, 0, 0);
                    var l = document.createElement("img");
                    (l.src = a.toDataURL("image/png")), (l.width = u.width || u.naturalWidth), (l.height = u.height || u.naturalHeight), n.push(l);
                }
                var d = e._frames,
                    _ = d.length / i;
                for (c = 0; _ > c; c++) {
                    var p = (u = d[c]).rect.clone(),
                        f = { image: (l = n[u.image.__tmp + h * i]), rect: p, regX: u.regX, regY: u.regY };
                    s && ((p.x = (l.width || l.naturalWidth) - p.x - p.width), (f.regX = p.width - u.regX)), r && ((p.y = (l.height || l.naturalHeight) - p.y - p.height), (f.regY = p.height - u.regY)), d.push(f);
                }
                var g = "_" + (s ? "h" : "") + (r ? "v" : ""),
                    m = e._animations,
                    v = e._data,
                    T = m.length / i;
                for (c = 0; T > c; c++) {
                    var b = m[c],
                        E = { name: b + g, speed: (u = v[b]).speed, next: u.next, frames: [] };
                    u.next && (E.next += g);
                    for (var y = 0, S = (d = u.frames).length; S > y; y++) E.frames.push(d[y] + _ * i);
                    (v[E.name] = E), m.push(E.name);
                }
            }),
            (createjs.SpriteSheetUtils = t);
    })(),
    (this.createjs = this.createjs || {}),
    (function () {
        "use strict";
        function t(t) {
            this.EventDispatcher_constructor(),
                (this.maxWidth = 2048),
                (this.maxHeight = 2048),
                (this.spriteSheet = null),
                (this.scale = 1),
                (this.padding = 1),
                (this.timeSlice = 0.3),
                (this.progress = -1),
                (this.framerate = t || 0),
                (this._frames = []),
                (this._animations = {}),
                (this._data = null),
                (this._nextFrameIndex = 0),
                (this._index = 0),
                (this._timerID = null),
                (this._scale = 1);
        }
        var e = createjs.extend(t, createjs.EventDispatcher);
        (t.ERR_DIMENSIONS = "frame dimensions exceed max spritesheet dimensions"),
            (t.ERR_RUNNING = "a build is already running"),
            (e.addFrame = function (e, i, s, r, n) {
                if (this._data) throw t.ERR_RUNNING;
                var a = i || e.bounds || e.nominalBounds;
                return !a && e.getBounds && (a = e.getBounds()), a ? ((s = s || 1), this._frames.push({ source: e, sourceRect: a, scale: s, funct: r, data: n, index: this._frames.length, height: a.height * s }) - 1) : null;
            }),
            (e.addAnimation = function (e, i, s, r) {
                if (this._data) throw t.ERR_RUNNING;
                this._animations[e] = { frames: i, next: s, speed: r };
            }),
            (e.addMovieClip = function (e, i, s, r, n, a) {
                if (this._data) throw t.ERR_RUNNING;
                var o = e.frameBounds,
                    h = i || e.bounds || e.nominalBounds;
                if ((!h && e.getBounds && (h = e.getBounds()), h || o)) {
                    var c,
                        u,
                        l = this._frames.length,
                        d = e.timeline.duration;
                    for (c = 0; d > c; c++) {
                        var _ = o && o[c] ? o[c] : h;
                        this.addFrame(e, _, s, this._setupMovieClipFrame, { i: c, f: r, d: n });
                    }
                    var p = e.timeline._labels,
                        f = [];
                    for (var g in p) f.push({ index: p[g], label: g });
                    if (f.length)
                        for (
                            f.sort(function (t, e) {
                                return t.index - e.index;
                            }),
                                c = 0,
                                u = f.length;
                            u > c;
                            c++
                        ) {
                            for (var m = f[c].label, v = l + f[c].index, T = l + (c == u - 1 ? d : f[c + 1].index), b = [], E = v; T > E; E++) b.push(E);
                            (!a || (m = a(m, e, v, T))) && this.addAnimation(m, b, !0);
                        }
                }
            }),
            (e.build = function () {
                if (this._data) throw t.ERR_RUNNING;
                for (this._startBuild(); this._drawNext(); );
                return this._endBuild(), this.spriteSheet;
            }),
            (e.buildAsync = function (e) {
                if (this._data) throw t.ERR_RUNNING;
                (this.timeSlice = e), this._startBuild();
                var i = this;
                this._timerID = setTimeout(function () {
                    i._run();
                }, 50 - 50 * Math.max(0.01, Math.min(0.99, this.timeSlice || 0.3)));
            }),
            (e.stopAsync = function () {
                clearTimeout(this._timerID), (this._data = null);
            }),
            (e.clone = function () {
                throw "SpriteSheetBuilder cannot be cloned.";
            }),
            (e.toString = function () {
                return "[SpriteSheetBuilder]";
            }),
            (e._startBuild = function () {
                var e = this.padding || 0;
                (this.progress = 0), (this.spriteSheet = null), (this._index = 0), (this._scale = this.scale);
                var i = [];
                this._data = { images: [], frames: i, framerate: this.framerate, animations: this._animations };
                var s = this._frames.slice();
                if (
                    (s.sort(function (t, e) {
                        return t.height <= e.height ? -1 : 1;
                    }),
                    s[s.length - 1].height + 2 * e > this.maxHeight)
                )
                    throw t.ERR_DIMENSIONS;
                for (var r = 0, n = 0, a = 0; s.length; ) {
                    var o = this._fillRow(s, r, a, i, e);
                    if ((o.w > n && (n = o.w), (r += o.h), !o.h || !s.length)) {
                        var h = createjs.createCanvas ? createjs.createCanvas() : document.createElement("canvas");
                        (h.width = this._getSize(n, this.maxWidth)), (h.height = this._getSize(r, this.maxHeight)), (this._data.images[a] = h), o.h || ((n = r = 0), a++);
                    }
                }
            }),
            (e._setupMovieClipFrame = function (t, e) {
                var i = t.actionsEnabled;
                (t.actionsEnabled = !1), t.gotoAndStop(e.i), (t.actionsEnabled = i), e.f && e.f(t, e.d, e.i);
            }),
            (e._getSize = function (t, e) {
                for (var i = 4; Math.pow(2, ++i) < t; );
                return Math.min(e, Math.pow(2, i));
            }),
            (e._fillRow = function (e, i, s, r, n) {
                for (var a = this.maxWidth, o = this.maxHeight - (i += n), h = n, c = 0, u = e.length - 1; u >= 0; u--) {
                    var l = e[u],
                        d = this._scale * l.scale,
                        _ = l.sourceRect,
                        p = l.source,
                        f = Math.floor(d * _.x - n),
                        g = Math.floor(d * _.y - n),
                        m = Math.ceil(d * _.height + 2 * n),
                        v = Math.ceil(d * _.width + 2 * n);
                    if (v > a) throw t.ERR_DIMENSIONS;
                    m > o ||
                        h + v > a ||
                        ((l.img = s), (l.rect = new createjs.Rectangle(h, i, v, m)), (c = c || m), e.splice(u, 1), (r[l.index] = [h, i, v, m, s, Math.round(-f + d * p.regX - n), Math.round(-g + d * p.regY - n)]), (h += v));
                }
                return { w: h, h: c };
            }),
            (e._endBuild = function () {
                (this.spriteSheet = new createjs.SpriteSheet(this._data)), (this._data = null), (this.progress = 1), this.dispatchEvent("complete");
            }),
            (e._run = function () {
                for (var t = 50 * Math.max(0.01, Math.min(0.99, this.timeSlice || 0.3)), e = new Date().getTime() + t, i = !1; e > new Date().getTime(); )
                    if (!this._drawNext()) {
                        i = !0;
                        break;
                    }
                if (i) this._endBuild();
                else {
                    var s = this;
                    this._timerID = setTimeout(function () {
                        s._run();
                    }, 50 - t);
                }
                var r = (this.progress = this._index / this._frames.length);
                if (this.hasEventListener("progress")) {
                    var n = new createjs.Event("progress");
                    (n.progress = r), this.dispatchEvent(n);
                }
            }),
            (e._drawNext = function () {
                var t = this._frames[this._index],
                    e = t.scale * this._scale,
                    i = t.rect,
                    s = t.sourceRect,
                    r = this._data.images[t.img].getContext("2d");
                return (
                    t.funct && t.funct(t.source, t.data),
                    r.save(),
                    r.beginPath(),
                    r.rect(i.x, i.y, i.width, i.height),
                    r.clip(),
                    r.translate(Math.ceil(i.x - s.x * e), Math.ceil(i.y - s.y * e)),
                    r.scale(e, e),
                    t.source.draw(r),
                    r.restore(),
                    ++this._index < this._frames.length
                );
            }),
            (createjs.SpriteSheetBuilder = createjs.promote(t, "EventDispatcher"));
    })(),
    (this.createjs = this.createjs || {}),
    (function () {
        "use strict";
        function t(t) {
            this.DisplayObject_constructor(), "string" == typeof t && (t = document.getElementById(t)), (this.mouseEnabled = !1);
            var e = t.style;
            (e.position = "absolute"),
                (e.transformOrigin = e.WebkitTransformOrigin = e.msTransformOrigin = e.MozTransformOrigin = e.OTransformOrigin = "0% 0%"),
                (this.htmlElement = t),
                (this._oldProps = null),
                (this._oldStage = null),
                (this._drawAction = null);
        }
        var e = createjs.extend(t, createjs.DisplayObject);
        (e.isVisible = function () {
            return null != this.htmlElement;
        }),
            (e.draw = function (t, e) {
                return !0;
            }),
            (e.cache = function () {}),
            (e.uncache = function () {}),
            (e.updateCache = function () {}),
            (e.hitTest = function () {}),
            (e.localToGlobal = function () {}),
            (e.globalToLocal = function () {}),
            (e.localToLocal = function () {}),
            (e.clone = function () {
                throw "DOMElement cannot be cloned.";
            }),
            (e.toString = function () {
                return "[DOMElement (name=" + this.name + ")]";
            }),
            (e._tick = function (t) {
                var e = this.stage;
                e && e !== this._oldStage && (this._drawAction && e.off("drawend", this._drawAction), (this._drawAction = e.on("drawend", this._handleDrawEnd, this)), (this._oldStage = e)), this.DisplayObject__tick(t);
            }),
            (e._handleDrawEnd = function (t) {
                var e = this.htmlElement;
                if (e) {
                    var i = e.style,
                        s = this.getConcatenatedDisplayProps(this._props),
                        r = s.matrix,
                        n = s.visible ? "visible" : "hidden";
                    if ((n != i.visibility && (i.visibility = n), s.visible)) {
                        var a = this._oldProps,
                            o = a && a.matrix,
                            h = 1e4;
                        if (!o || !o.equals(r)) {
                            var c = "matrix(" + ((r.a * h) | 0) / h + "," + ((r.b * h) | 0) / h + "," + ((r.c * h) | 0) / h + "," + ((r.d * h) | 0) / h + "," + ((r.tx + 0.5) | 0);
                            (i.transform = i.WebkitTransform = i.OTransform = i.msTransform = c + "," + ((r.ty + 0.5) | 0) + ")"),
                                (i.MozTransform = c + "px," + ((r.ty + 0.5) | 0) + "px)"),
                                a || (a = this._oldProps = new createjs.DisplayProps(!0, null)),
                                a.matrix.copy(r);
                        }
                        a.alpha != s.alpha && ((i.opacity = "" + ((s.alpha * h) | 0) / h), (a.alpha = s.alpha));
                    }
                }
            }),
            (createjs.DOMElement = createjs.promote(t, "DisplayObject"));
    })(),
    (this.createjs = this.createjs || {}),
    (function () {
        "use strict";
        function t() {
            (this.usesContext = !1), (this._multiPass = null), (this.VTX_SHADER_BODY = null), (this.FRAG_SHADER_BODY = null);
        }
        var e = t.prototype;
        (e.getBounds = function (t) {
            return t;
        }),
            (e.shaderParamSetup = function (t, e, i) {}),
            (e.applyFilter = function (t, e, i, s, r, n, a, o) {
                (n = n || t), null == a && (a = e), null == o && (o = i);
                try {
                    var h = t.getImageData(e, i, s, r);
                } catch (t) {
                    return !1;
                }
                return !!this._applyFilter(h) && (n.putImageData(h, a, o), !0);
            }),
            (e.toString = function () {
                return "[Filter]";
            }),
            (e.clone = function () {
                return new t();
            }),
            (e._applyFilter = function (t) {
                return !0;
            }),
            (createjs.Filter = t);
    })(),
    (this.createjs = this.createjs || {}),
    (function () {
        "use strict";
        function t() {
            (this.width = void 0),
                (this.height = void 0),
                (this.x = void 0),
                (this.y = void 0),
                (this.scale = 1),
                (this.offX = 0),
                (this.offY = 0),
                (this.cacheID = 0),
                (this._filterOffX = 0),
                (this._filterOffY = 0),
                (this._cacheDataURLID = 0),
                (this._cacheDataURL = null),
                (this._drawWidth = 0),
                (this._drawHeight = 0);
        }
        var e = t.prototype;
        (t.getFilterBounds = function (t, e) {
            e || (e = new createjs.Rectangle());
            var i = t.filters,
                s = i && i.length;
            if (0 >= !!s) return e;
            for (var r = 0; s > r; r++) {
                var n = i[r];
                if (n && n.getBounds) {
                    var a = n.getBounds();
                    a && (0 == r ? e.setValues(a.x, a.y, a.width, a.height) : e.extend(a.x, a.y, a.width, a.height));
                }
            }
            return e;
        }),
            (e.toString = function () {
                return "[BitmapCache]";
            }),
            (e.define = function (t, e, i, s, r, n, a) {
                if (!t) throw "No symbol to cache";
                (this._options = a), (this.target = t), (this.width = s >= 1 ? s : 1), (this.height = r >= 1 ? r : 1), (this.x = e || 0), (this.y = i || 0), (this.scale = n || 1), this.update();
            }),
            (e.update = function (e) {
                if (!this.target) throw "define() must be called before update()";
                var i = t.getFilterBounds(this.target),
                    s = this.target.cacheCanvas;
                (this._drawWidth = Math.ceil(this.width * this.scale) + i.width),
                    (this._drawHeight = Math.ceil(this.height * this.scale) + i.height),
                    (s && this._drawWidth == s.width && this._drawHeight == s.height) || this._updateSurface(),
                    (this._filterOffX = i.x),
                    (this._filterOffY = i.y),
                    (this.offX = this.x * this.scale + this._filterOffX),
                    (this.offY = this.y * this.scale + this._filterOffY),
                    this._drawToCache(e),
                    (this.cacheID = this.cacheID ? this.cacheID + 1 : 1);
            }),
            (e.release = function () {
                if (this._webGLCache)
                    this._webGLCache.isCacheControlled ||
                        (this.__lastRT && (this.__lastRT = void 0),
                        this.__rtA && this._webGLCache._killTextureObject(this.__rtA),
                        this.__rtB && this._webGLCache._killTextureObject(this.__rtB),
                        this.target && this.target.cacheCanvas && this._webGLCache._killTextureObject(this.target.cacheCanvas)),
                        (this._webGLCache = !1);
                else {
                    var t = this.target.stage;
                    t instanceof createjs.StageGL && t.releaseTexture(this.target.cacheCanvas);
                }
                (this.target = this.target.cacheCanvas = null), (this.cacheID = this._cacheDataURLID = this._cacheDataURL = void 0), (this.width = this.height = this.x = this.y = this.offX = this.offY = 0), (this.scale = 1);
            }),
            (e.getCacheDataURL = function () {
                var t = this.target && this.target.cacheCanvas;
                return t ? (this.cacheID != this._cacheDataURLID && ((this._cacheDataURLID = this.cacheID), (this._cacheDataURL = t.toDataURL ? t.toDataURL() : null)), this._cacheDataURL) : null;
            }),
            (e.draw = function (t) {
                return !!this.target && (t.drawImage(this.target.cacheCanvas, this.x + this._filterOffX / this.scale, this.y + this._filterOffY / this.scale, this._drawWidth / this.scale, this._drawHeight / this.scale), !0);
            }),
            (e._updateSurface = function () {
                if (!this._options || !this._options.useGL)
                    return (t = this.target.cacheCanvas) || (t = this.target.cacheCanvas = createjs.createCanvas ? createjs.createCanvas() : document.createElement("canvas")), (t.width = this._drawWidth), void (t.height = this._drawHeight);
                if (!this._webGLCache)
                    if ("stage" === this._options.useGL) {
                        if (!this.target.stage || !this.target.stage.isWebGL)
                            throw "Cannot use 'stage' for cache because the object's parent stage is " + (this.target.stage ? "non WebGL." : "not set, please addChild to the correct stage.");
                        (this.target.cacheCanvas = !0), (this._webGLCache = this.target.stage);
                    } else if ("new" === this._options.useGL)
                        (this.target.cacheCanvas = document.createElement("canvas")),
                            (this._webGLCache = new createjs.StageGL(this.target.cacheCanvas, { antialias: !0, transparent: !0, autoPurge: -1 })),
                            (this._webGLCache.isCacheControlled = !0);
                    else {
                        if (!(this._options.useGL instanceof createjs.StageGL)) throw "Invalid option provided to useGL, expected ['stage', 'new', StageGL, undefined], got " + this._options.useGL;
                        (this.target.cacheCanvas = !0), (this._webGLCache = this._options.useGL), (this._webGLCache.isCacheControlled = !0);
                    }
                var t = this.target.cacheCanvas,
                    e = this._webGLCache;
                e.isCacheControlled && ((t.width = this._drawWidth), (t.height = this._drawHeight), e.updateViewport(this._drawWidth, this._drawHeight)),
                    this.target.filters
                        ? (e.getTargetRenderTexture(this.target, this._drawWidth, this._drawHeight), e.getTargetRenderTexture(this.target, this._drawWidth, this._drawHeight))
                        : e.isCacheControlled || e.getTargetRenderTexture(this.target, this._drawWidth, this._drawHeight);
            }),
            (e._drawToCache = function (t) {
                var e = this.target.cacheCanvas,
                    i = this.target,
                    s = this._webGLCache;
                if (s) s.cacheDraw(i, i.filters, this), ((e = this.target.cacheCanvas).width = this._drawWidth), (e.height = this._drawHeight);
                else {
                    var r = e.getContext("2d");
                    t || r.clearRect(0, 0, this._drawWidth + 1, this._drawHeight + 1),
                        r.save(),
                        (r.globalCompositeOperation = t),
                        r.setTransform(this.scale, 0, 0, this.scale, -this._filterOffX, -this._filterOffY),
                        r.translate(-this.x, -this.y),
                        i.draw(r, !0),
                        r.restore(),
                        i.filters && i.filters.length && this._applyFilters(r);
                }
                e._invalid = !0;
            }),
            (e._applyFilters = function (t) {
                var e,
                    i = this.target.filters,
                    s = this._drawWidth,
                    r = this._drawHeight,
                    n = 0,
                    a = i[n];
                do {
                    a.usesContext ? (e && (t.putImageData(e, 0, 0), (e = null)), a.applyFilter(t, 0, 0, s, r)) : (e || (e = t.getImageData(0, 0, s, r)), a._applyFilter(e)), (a = null !== a._multiPass ? a._multiPass : i[++n]);
                } while (a);
                e && t.putImageData(e, 0, 0);
            }),
            (createjs.BitmapCache = t);
    })(),
    (this.createjs = this.createjs || {}),
    (function () {
        "use strict";
        function t(t, e, i) {
            this.Filter_constructor(),
                (this._blurX = t),
                (this._blurXTable = []),
                (this._lastBlurX = null),
                (this._blurY = e),
                (this._blurYTable = []),
                (this._lastBlurY = null),
                this._quality,
                (this._lastQuality = null),
                (this.FRAG_SHADER_TEMPLATE =
                    "uniform float xWeight[{{blurX}}];uniform float yWeight[{{blurY}}];uniform vec2 textureOffset;void main(void) {vec4 color = vec4(0.0);float xAdj = ({{blurX}}.0-1.0)/2.0;float yAdj = ({{blurY}}.0-1.0)/2.0;vec2 sampleOffset;for(int i=0; i<{{blurX}}; i++) {for(int j=0; j<{{blurY}}; j++) {sampleOffset = vRenderCoord + (textureOffset * vec2(float(i)-xAdj, float(j)-yAdj));color += texture2D(uSampler, sampleOffset) * (xWeight[i] * yWeight[j]);}}gl_FragColor = color.rgba;}"),
                (isNaN(i) || 1 > i) && (i = 1),
                this.setQuality(0 | i);
        }
        var e = createjs.extend(t, createjs.Filter);
        (e.getBlurX = function () {
            return this._blurX;
        }),
            (e.getBlurY = function () {
                return this._blurY;
            }),
            (e.setBlurX = function (t) {
                (isNaN(t) || 0 > t) && (t = 0), (this._blurX = t);
            }),
            (e.setBlurY = function (t) {
                (isNaN(t) || 0 > t) && (t = 0), (this._blurY = t);
            }),
            (e.getQuality = function () {
                return this._quality;
            }),
            (e.setQuality = function (t) {
                (isNaN(t) || 0 > t) && (t = 0), (this._quality = 0 | t);
            }),
            (e._getShader = function () {
                var t = this._lastBlurX !== this._blurX,
                    e = this._lastBlurY !== this._blurY,
                    i = this._lastQuality !== this._quality;
                return t || e || i
                    ? ((t || i) && (this._blurXTable = this._getTable(this._blurX * this._quality)),
                      (e || i) && (this._blurYTable = this._getTable(this._blurY * this._quality)),
                      this._updateShader(),
                      (this._lastBlurX = this._blurX),
                      (this._lastBlurY = this._blurY),
                      void (this._lastQuality = this._quality))
                    : this._compiledShader;
            }),
            (e._setShader = function () {
                this._compiledShader;
            });
        try {
            Object.defineProperties(e, { blurX: { get: e.getBlurX, set: e.setBlurX }, blurY: { get: e.getBlurY, set: e.setBlurY }, quality: { get: e.getQuality, set: e.setQuality }, _builtShader: { get: e._getShader, set: e._setShader } });
        } catch (t) {
            console.log(t);
        }
        (e._getTable = function (t) {
            if (1 >= t) return [1];
            for (var e = [], i = Math.ceil(2 * t), s = ((i += i % 2 ? 0 : 1) / 2) | 0, r = -s; s >= r; r++) {
                var n = (r / s) * 4.2;
                e.push((1 / Math.sqrt(2 * Math.PI)) * Math.pow(Math.E, -Math.pow(n, 2) / 4));
            }
            var a = e.reduce(function (t, e) {
                return t + e;
            });
            return e.map(function (t, e, i) {
                return t / a;
            });
        }),
            (e._updateShader = function () {
                if (void 0 !== this._blurX && void 0 !== this._blurY) {
                    var t = this.FRAG_SHADER_TEMPLATE;
                    (t = (t = t.replace(/\{\{blurX\}\}/g, this._blurXTable.length.toFixed(0))).replace(/\{\{blurY\}\}/g, this._blurYTable.length.toFixed(0))), (this.FRAG_SHADER_BODY = t);
                }
            }),
            (e.shaderParamSetup = function (t, e, i) {
                t.uniform1fv(t.getUniformLocation(i, "xWeight"), this._blurXTable),
                    t.uniform1fv(t.getUniformLocation(i, "yWeight"), this._blurYTable),
                    t.uniform2f(t.getUniformLocation(i, "textureOffset"), 2 / (e._viewportWidth * this._quality), 2 / (e._viewportHeight * this._quality));
            }),
            (t.MUL_TABLE = [
                1,
                171,
                205,
                293,
                57,
                373,
                79,
                137,
                241,
                27,
                391,
                357,
                41,
                19,
                283,
                265,
                497,
                469,
                443,
                421,
                25,
                191,
                365,
                349,
                335,
                161,
                155,
                149,
                9,
                278,
                269,
                261,
                505,
                245,
                475,
                231,
                449,
                437,
                213,
                415,
                405,
                395,
                193,
                377,
                369,
                361,
                353,
                345,
                169,
                331,
                325,
                319,
                313,
                307,
                301,
                37,
                145,
                285,
                281,
                69,
                271,
                267,
                263,
                259,
                509,
                501,
                493,
                243,
                479,
                118,
                465,
                459,
                113,
                446,
                55,
                435,
                429,
                423,
                209,
                413,
                51,
                403,
                199,
                393,
                97,
                3,
                379,
                375,
                371,
                367,
                363,
                359,
                355,
                351,
                347,
                43,
                85,
                337,
                333,
                165,
                327,
                323,
                5,
                317,
                157,
                311,
                77,
                305,
                303,
                75,
                297,
                294,
                73,
                289,
                287,
                71,
                141,
                279,
                277,
                275,
                68,
                135,
                67,
                133,
                33,
                262,
                260,
                129,
                511,
                507,
                503,
                499,
                495,
                491,
                61,
                121,
                481,
                477,
                237,
                235,
                467,
                232,
                115,
                457,
                227,
                451,
                7,
                445,
                221,
                439,
                218,
                433,
                215,
                427,
                425,
                211,
                419,
                417,
                207,
                411,
                409,
                203,
                202,
                401,
                399,
                396,
                197,
                49,
                389,
                387,
                385,
                383,
                95,
                189,
                47,
                187,
                93,
                185,
                23,
                183,
                91,
                181,
                45,
                179,
                89,
                177,
                11,
                175,
                87,
                173,
                345,
                343,
                341,
                339,
                337,
                21,
                167,
                83,
                331,
                329,
                327,
                163,
                81,
                323,
                321,
                319,
                159,
                79,
                315,
                313,
                39,
                155,
                309,
                307,
                153,
                305,
                303,
                151,
                75,
                299,
                149,
                37,
                295,
                147,
                73,
                291,
                145,
                289,
                287,
                143,
                285,
                71,
                141,
                281,
                35,
                279,
                139,
                69,
                275,
                137,
                273,
                17,
                271,
                135,
                269,
                267,
                133,
                265,
                33,
                263,
                131,
                261,
                130,
                259,
                129,
                257,
                1,
            ]),
            (t.SHG_TABLE = [
                0,
                9,
                10,
                11,
                9,
                12,
                10,
                11,
                12,
                9,
                13,
                13,
                10,
                9,
                13,
                13,
                14,
                14,
                14,
                14,
                10,
                13,
                14,
                14,
                14,
                13,
                13,
                13,
                9,
                14,
                14,
                14,
                15,
                14,
                15,
                14,
                15,
                15,
                14,
                15,
                15,
                15,
                14,
                15,
                15,
                15,
                15,
                15,
                14,
                15,
                15,
                15,
                15,
                15,
                15,
                12,
                14,
                15,
                15,
                13,
                15,
                15,
                15,
                15,
                16,
                16,
                16,
                15,
                16,
                14,
                16,
                16,
                14,
                16,
                13,
                16,
                16,
                16,
                15,
                16,
                13,
                16,
                15,
                16,
                14,
                9,
                16,
                16,
                16,
                16,
                16,
                16,
                16,
                16,
                16,
                13,
                14,
                16,
                16,
                15,
                16,
                16,
                10,
                16,
                15,
                16,
                14,
                16,
                16,
                14,
                16,
                16,
                14,
                16,
                16,
                14,
                15,
                16,
                16,
                16,
                14,
                15,
                14,
                15,
                13,
                16,
                16,
                15,
                17,
                17,
                17,
                17,
                17,
                17,
                14,
                15,
                17,
                17,
                16,
                16,
                17,
                16,
                15,
                17,
                16,
                17,
                11,
                17,
                16,
                17,
                16,
                17,
                16,
                17,
                17,
                16,
                17,
                17,
                16,
                17,
                17,
                16,
                16,
                17,
                17,
                17,
                16,
                14,
                17,
                17,
                17,
                17,
                15,
                16,
                14,
                16,
                15,
                16,
                13,
                16,
                15,
                16,
                14,
                16,
                15,
                16,
                12,
                16,
                15,
                16,
                17,
                17,
                17,
                17,
                17,
                13,
                16,
                15,
                17,
                17,
                17,
                16,
                15,
                17,
                17,
                17,
                16,
                15,
                17,
                17,
                14,
                16,
                17,
                17,
                16,
                17,
                17,
                16,
                15,
                17,
                16,
                14,
                17,
                16,
                15,
                17,
                16,
                17,
                17,
                16,
                17,
                15,
                16,
                17,
                14,
                17,
                16,
                15,
                17,
                16,
                17,
                13,
                17,
                16,
                17,
                17,
                16,
                17,
                14,
                17,
                16,
                17,
                16,
                17,
                16,
                17,
                9,
            ]),
            (e.getBounds = function (t) {
                var e = 0 | this.blurX,
                    i = 0 | this.blurY;
                if (0 >= e && 0 >= i) return t;
                var s = Math.pow(this.quality, 0.2);
                return (t || new createjs.Rectangle()).pad(i * s + 1, e * s + 1, i * s + 1, e * s + 1);
            }),
            (e.clone = function () {
                return new t(this.blurX, this.blurY, this.quality);
            }),
            (e.toString = function () {
                return "[BlurFilter]";
            }),
            (e._applyFilter = function (e) {
                var i = this._blurX >> 1;
                if (isNaN(i) || 0 > i) return !1;
                var s = this._blurY >> 1;
                if (isNaN(s) || 0 > s) return !1;
                if (0 == i && 0 == s) return !1;
                var r = this.quality;
                (isNaN(r) || 1 > r) && (r = 1), (r |= 0) > 3 && (r = 3), 1 > r && (r = 1);
                var n = e.data,
                    a = 0,
                    o = 0,
                    h = 0,
                    c = 0,
                    u = 0,
                    l = 0,
                    d = 0,
                    _ = 0,
                    p = 0,
                    f = 0,
                    g = 0,
                    m = 0,
                    v = 0,
                    T = 0,
                    b = 0,
                    E = (i + i + 1) | 0,
                    y = (s + s + 1) | 0,
                    S = 0 | e.width,
                    x = 0 | e.height,
                    w = (S - 1) | 0,
                    j = (x - 1) | 0,
                    A = (i + 1) | 0,
                    R = (s + 1) | 0,
                    P = { r: 0, b: 0, g: 0, a: 0 },
                    L = P;
                for (h = 1; E > h; h++) L = L.n = { r: 0, b: 0, g: 0, a: 0 };
                L.n = P;
                var I = { r: 0, b: 0, g: 0, a: 0 },
                    C = I;
                for (h = 1; y > h; h++) C = C.n = { r: 0, b: 0, g: 0, a: 0 };
                C.n = I;
                for (var D = null, M = 0 | t.MUL_TABLE[i], O = 0 | t.SHG_TABLE[i], F = 0 | t.MUL_TABLE[s], N = 0 | t.SHG_TABLE[s]; r-- > 0; ) {
                    d = l = 0;
                    var k = M,
                        B = O;
                    for (o = x; --o > -1; ) {
                        for (_ = A * (m = n[0 | l]), p = A * (v = n[(l + 1) | 0]), f = A * (T = n[(l + 2) | 0]), g = A * (b = n[(l + 3) | 0]), L = P, h = A; --h > -1; ) (L.r = m), (L.g = v), (L.b = T), (L.a = b), (L = L.n);
                        for (h = 1; A > h; h++) (c = (l + ((h > w ? w : h) << 2)) | 0), (_ += L.r = n[c]), (p += L.g = n[c + 1]), (f += L.b = n[c + 2]), (g += L.a = n[c + 3]), (L = L.n);
                        for (D = P, a = 0; S > a; a++)
                            (n[l++] = (_ * k) >>> B),
                                (n[l++] = (p * k) >>> B),
                                (n[l++] = (f * k) >>> B),
                                (n[l++] = (g * k) >>> B),
                                (c = (d + ((c = a + i + 1) < w ? c : w)) << 2),
                                (_ -= D.r - (D.r = n[c])),
                                (p -= D.g - (D.g = n[c + 1])),
                                (f -= D.b - (D.b = n[c + 2])),
                                (g -= D.a - (D.a = n[c + 3])),
                                (D = D.n);
                        d += S;
                    }
                    for (k = F, B = N, a = 0; S > a; a++) {
                        for (_ = (R * (m = n[(l = (a << 2) | 0)])) | 0, p = (R * (v = n[(l + 1) | 0])) | 0, f = (R * (T = n[(l + 2) | 0])) | 0, g = (R * (b = n[(l + 3) | 0])) | 0, C = I, h = 0; R > h; h++)
                            (C.r = m), (C.g = v), (C.b = T), (C.a = b), (C = C.n);
                        for (u = S, h = 1; s >= h; h++) (l = (u + a) << 2), (_ += C.r = n[l]), (p += C.g = n[l + 1]), (f += C.b = n[l + 2]), (g += C.a = n[l + 3]), (C = C.n), j > h && (u += S);
                        if (((l = a), (D = I), r > 0))
                            for (o = 0; x > o; o++)
                                (n[(c = l << 2) + 3] = b = (g * k) >>> B),
                                    b > 0 ? ((n[c] = (_ * k) >>> B), (n[c + 1] = (p * k) >>> B), (n[c + 2] = (f * k) >>> B)) : (n[c] = n[c + 1] = n[c + 2] = 0),
                                    (c = (a + ((c = o + R) < j ? c : j) * S) << 2),
                                    (_ -= D.r - (D.r = n[c])),
                                    (p -= D.g - (D.g = n[c + 1])),
                                    (f -= D.b - (D.b = n[c + 2])),
                                    (g -= D.a - (D.a = n[c + 3])),
                                    (D = D.n),
                                    (l += S);
                        else
                            for (o = 0; x > o; o++)
                                (n[(c = l << 2) + 3] = b = (g * k) >>> B),
                                    b > 0 ? ((b = 255 / b), (n[c] = ((_ * k) >>> B) * b), (n[c + 1] = ((p * k) >>> B) * b), (n[c + 2] = ((f * k) >>> B) * b)) : (n[c] = n[c + 1] = n[c + 2] = 0),
                                    (c = (a + ((c = o + R) < j ? c : j) * S) << 2),
                                    (_ -= D.r - (D.r = n[c])),
                                    (p -= D.g - (D.g = n[c + 1])),
                                    (f -= D.b - (D.b = n[c + 2])),
                                    (g -= D.a - (D.a = n[c + 3])),
                                    (D = D.n),
                                    (l += S);
                    }
                }
                return !0;
            }),
            (createjs.BlurFilter = createjs.promote(t, "Filter"));
    })(),
    (this.createjs = this.createjs || {}),
    (function () {
        "use strict";
        function t(t) {
            this.Filter_constructor(),
                (this.alphaMap = t),
                (this._alphaMap = null),
                (this._mapData = null),
                (this._mapTexture = null),
                (this.FRAG_SHADER_BODY =
                    "uniform sampler2D uAlphaSampler;void main(void) {vec4 color = texture2D(uSampler, vRenderCoord);vec4 alphaMap = texture2D(uAlphaSampler, vTextureCoord);gl_FragColor = vec4(color.rgb, color.a * (alphaMap.r * ceil(alphaMap.a)));}");
        }
        var e = createjs.extend(t, createjs.Filter);
        (e.shaderParamSetup = function (t, e, i) {
            this._mapTexture || (this._mapTexture = t.createTexture()),
                t.activeTexture(t.TEXTURE1),
                t.bindTexture(t.TEXTURE_2D, this._mapTexture),
                e.setTextureParams(t),
                t.texImage2D(t.TEXTURE_2D, 0, t.RGBA, t.RGBA, t.UNSIGNED_BYTE, this.alphaMap),
                t.uniform1i(t.getUniformLocation(i, "uAlphaSampler"), 1);
        }),
            (e.clone = function () {
                var e = new t(this.alphaMap);
                return (e._alphaMap = this._alphaMap), (e._mapData = this._mapData), e;
            }),
            (e.toString = function () {
                return "[AlphaMapFilter]";
            }),
            (e._applyFilter = function (t) {
                if (!this.alphaMap) return !0;
                if (!this._prepAlphaMap()) return !1;
                for (var e = t.data, i = this._mapData, s = 0, r = e.length; r > s; s += 4) e[s + 3] = i[s] || 0;
                return !0;
            }),
            (e._prepAlphaMap = function () {
                if (!this.alphaMap) return !1;
                if (this.alphaMap == this._alphaMap && this._mapData) return !0;
                this._mapData = null;
                var t,
                    e = (this._alphaMap = this.alphaMap),
                    i = e;
                e instanceof HTMLCanvasElement
                    ? (t = i.getContext("2d"))
                    : (((i = createjs.createCanvas ? createjs.createCanvas() : document.createElement("canvas")).width = e.width), (i.height = e.height), (t = i.getContext("2d")).drawImage(e, 0, 0));
                try {
                    var s = t.getImageData(0, 0, e.width, e.height);
                } catch (t) {
                    return !1;
                }
                return (this._mapData = s.data), !0;
            }),
            (createjs.AlphaMapFilter = createjs.promote(t, "Filter"));
    })(),
    (this.createjs = this.createjs || {}),
    (function () {
        "use strict";
        function t(t) {
            this.Filter_constructor(),
                (this.mask = t),
                (this.usesContext = !0),
                (this.FRAG_SHADER_BODY =
                    "uniform sampler2D uAlphaSampler;void main(void) {vec4 color = texture2D(uSampler, vRenderCoord);vec4 alphaMap = texture2D(uAlphaSampler, vTextureCoord);gl_FragColor = vec4(color.rgb, color.a * alphaMap.a);}");
        }
        var e = createjs.extend(t, createjs.Filter);
        (e.shaderParamSetup = function (t, e, i) {
            this._mapTexture || (this._mapTexture = t.createTexture()),
                t.activeTexture(t.TEXTURE1),
                t.bindTexture(t.TEXTURE_2D, this._mapTexture),
                e.setTextureParams(t),
                t.texImage2D(t.TEXTURE_2D, 0, t.RGBA, t.RGBA, t.UNSIGNED_BYTE, this.mask),
                t.uniform1i(t.getUniformLocation(i, "uAlphaSampler"), 1);
        }),
            (e.applyFilter = function (t, e, i, s, r, n, a, o) {
                return !this.mask || (null == a && (a = e), null == o && (o = i), (n = n || t).save(), t == n && ((n.globalCompositeOperation = "destination-in"), n.drawImage(this.mask, a, o), n.restore(), !0));
            }),
            (e.clone = function () {
                return new t(this.mask);
            }),
            (e.toString = function () {
                return "[AlphaMaskFilter]";
            }),
            (createjs.AlphaMaskFilter = createjs.promote(t, "Filter"));
    })(),
    (this.createjs = this.createjs || {}),
    (function () {
        "use strict";
        function t(t, e, i, s, r, n, a, o) {
            this.Filter_constructor(),
                (this.redMultiplier = null != t ? t : 1),
                (this.greenMultiplier = null != e ? e : 1),
                (this.blueMultiplier = null != i ? i : 1),
                (this.alphaMultiplier = null != s ? s : 1),
                (this.redOffset = r || 0),
                (this.greenOffset = n || 0),
                (this.blueOffset = a || 0),
                (this.alphaOffset = o || 0),
                (this.FRAG_SHADER_BODY = "uniform vec4 uColorMultiplier;uniform vec4 uColorOffset;void main(void) {vec4 color = texture2D(uSampler, vRenderCoord);gl_FragColor = (color * uColorMultiplier) + uColorOffset;}");
        }
        var e = createjs.extend(t, createjs.Filter);
        (e.shaderParamSetup = function (t, e, i) {
            t.uniform4f(t.getUniformLocation(i, "uColorMultiplier"), this.redMultiplier, this.greenMultiplier, this.blueMultiplier, this.alphaMultiplier),
                t.uniform4f(t.getUniformLocation(i, "uColorOffset"), this.redOffset / 255, this.greenOffset / 255, this.blueOffset / 255, this.alphaOffset / 255);
        }),
            (e.toString = function () {
                return "[ColorFilter]";
            }),
            (e.clone = function () {
                return new t(this.redMultiplier, this.greenMultiplier, this.blueMultiplier, this.alphaMultiplier, this.redOffset, this.greenOffset, this.blueOffset, this.alphaOffset);
            }),
            (e._applyFilter = function (t) {
                for (var e = t.data, i = e.length, s = 0; i > s; s += 4)
                    (e[s] = e[s] * this.redMultiplier + this.redOffset),
                        (e[s + 1] = e[s + 1] * this.greenMultiplier + this.greenOffset),
                        (e[s + 2] = e[s + 2] * this.blueMultiplier + this.blueOffset),
                        (e[s + 3] = e[s + 3] * this.alphaMultiplier + this.alphaOffset);
                return !0;
            }),
            (createjs.ColorFilter = createjs.promote(t, "Filter"));
    })(),
    (this.createjs = this.createjs || {}),
    (function () {
        "use strict";
        function t(t, e, i, s) {
            this.setColor(t, e, i, s);
        }
        var e = t.prototype;
        (t.DELTA_INDEX = [
            0,
            0.01,
            0.02,
            0.04,
            0.05,
            0.06,
            0.07,
            0.08,
            0.1,
            0.11,
            0.12,
            0.14,
            0.15,
            0.16,
            0.17,
            0.18,
            0.2,
            0.21,
            0.22,
            0.24,
            0.25,
            0.27,
            0.28,
            0.3,
            0.32,
            0.34,
            0.36,
            0.38,
            0.4,
            0.42,
            0.44,
            0.46,
            0.48,
            0.5,
            0.53,
            0.56,
            0.59,
            0.62,
            0.65,
            0.68,
            0.71,
            0.74,
            0.77,
            0.8,
            0.83,
            0.86,
            0.89,
            0.92,
            0.95,
            0.98,
            1,
            1.06,
            1.12,
            1.18,
            1.24,
            1.3,
            1.36,
            1.42,
            1.48,
            1.54,
            1.6,
            1.66,
            1.72,
            1.78,
            1.84,
            1.9,
            1.96,
            2,
            2.12,
            2.25,
            2.37,
            2.5,
            2.62,
            2.75,
            2.87,
            3,
            3.2,
            3.4,
            3.6,
            3.8,
            4,
            4.3,
            4.7,
            4.9,
            5,
            5.5,
            6,
            6.5,
            6.8,
            7,
            7.3,
            7.5,
            7.8,
            8,
            8.4,
            8.7,
            9,
            9.4,
            9.6,
            9.8,
            10,
        ]),
            (t.IDENTITY_MATRIX = [1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1]),
            (t.LENGTH = t.IDENTITY_MATRIX.length),
            (e.setColor = function (t, e, i, s) {
                return this.reset().adjustColor(t, e, i, s);
            }),
            (e.reset = function () {
                return this.copy(t.IDENTITY_MATRIX);
            }),
            (e.adjustColor = function (t, e, i, s) {
                return this.adjustHue(s), this.adjustContrast(e), this.adjustBrightness(t), this.adjustSaturation(i);
            }),
            (e.adjustBrightness = function (t) {
                return 0 == t || isNaN(t) || ((t = this._cleanValue(t, 255)), this._multiplyMatrix([1, 0, 0, 0, t, 0, 1, 0, 0, t, 0, 0, 1, 0, t, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1])), this;
            }),
            (e.adjustContrast = function (e) {
                return (
                    0 == e ||
                        isNaN(e) ||
                        (0 > (e = this._cleanValue(e, 100)) ? (i = 127 + (e / 100) * 127) : (i = 127 * (i = 0 == (i = e % 1) ? t.DELTA_INDEX[e] : t.DELTA_INDEX[e << 0] * (1 - i) + t.DELTA_INDEX[1 + (e << 0)] * i) + 127),
                        this._multiplyMatrix([i / 127, 0, 0, 0, 0.5 * (127 - i), 0, i / 127, 0, 0, 0.5 * (127 - i), 0, 0, i / 127, 0, 0.5 * (127 - i), 0, 0, 0, 1, 0, 0, 0, 0, 0, 1])),
                    this
                );
                var i;
            }),
            (e.adjustSaturation = function (t) {
                if (0 == t || isNaN(t)) return this;
                var e = 1 + ((t = this._cleanValue(t, 100)) > 0 ? (3 * t) / 100 : t / 100),
                    i = 0.3086,
                    s = 0.6094,
                    r = 0.082;
                return this._multiplyMatrix([i * (1 - e) + e, s * (1 - e), r * (1 - e), 0, 0, i * (1 - e), s * (1 - e) + e, r * (1 - e), 0, 0, i * (1 - e), s * (1 - e), r * (1 - e) + e, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1]), this;
            }),
            (e.adjustHue = function (t) {
                if (0 == t || isNaN(t)) return this;
                t = (this._cleanValue(t, 180) / 180) * Math.PI;
                var e = Math.cos(t),
                    i = Math.sin(t),
                    s = 0.213,
                    r = 0.715,
                    n = 0.072;
                return (
                    this._multiplyMatrix([
                        s + e * (1 - s) + i * -s,
                        r + e * -r + i * -r,
                        n + e * -n + i * (1 - n),
                        0,
                        0,
                        s + e * -s + 0.143 * i,
                        r + e * (1 - r) + 0.14 * i,
                        n + e * -n + -0.283 * i,
                        0,
                        0,
                        s + e * -s + -0.787 * i,
                        r + e * -r + i * r,
                        n + e * (1 - n) + i * n,
                        0,
                        0,
                        0,
                        0,
                        0,
                        1,
                        0,
                        0,
                        0,
                        0,
                        0,
                        1,
                    ]),
                    this
                );
            }),
            (e.concat = function (e) {
                return (e = this._fixMatrix(e)).length != t.LENGTH || this._multiplyMatrix(e), this;
            }),
            (e.clone = function () {
                return new t().copy(this);
            }),
            (e.toArray = function () {
                for (var e = [], i = 0, s = t.LENGTH; s > i; i++) e[i] = this[i];
                return e;
            }),
            (e.copy = function (e) {
                for (var i = t.LENGTH, s = 0; i > s; s++) this[s] = e[s];
                return this;
            }),
            (e.toString = function () {
                return "[ColorMatrix]";
            }),
            (e._multiplyMatrix = function (t) {
                var e,
                    i,
                    s,
                    r = [];
                for (e = 0; 5 > e; e++) {
                    for (i = 0; 5 > i; i++) r[i] = this[i + 5 * e];
                    for (i = 0; 5 > i; i++) {
                        var n = 0;
                        for (s = 0; 5 > s; s++) n += t[i + 5 * s] * r[s];
                        this[i + 5 * e] = n;
                    }
                }
            }),
            (e._cleanValue = function (t, e) {
                return Math.min(e, Math.max(-e, t));
            }),
            (e._fixMatrix = function (e) {
                return e instanceof t && (e = e.toArray()), e.length < t.LENGTH ? (e = e.slice(0, e.length).concat(t.IDENTITY_MATRIX.slice(e.length, t.LENGTH))) : e.length > t.LENGTH && (e = e.slice(0, t.LENGTH)), e;
            }),
            (createjs.ColorMatrix = t);
    })(),
    (this.createjs = this.createjs || {}),
    (function () {
        "use strict";
        function t(t) {
            this.Filter_constructor(),
                (this.matrix = t),
                (this.FRAG_SHADER_BODY =
                    "uniform mat4 uColorMatrix;uniform vec4 uColorMatrixOffset;void main(void) {vec4 color = texture2D(uSampler, vRenderCoord);mat4 m = uColorMatrix;vec4 newColor = vec4(0,0,0,0);newColor.r = color.r*m[0][0] + color.g*m[0][1] + color.b*m[0][2] + color.a*m[0][3];newColor.g = color.r*m[1][0] + color.g*m[1][1] + color.b*m[1][2] + color.a*m[1][3];newColor.b = color.r*m[2][0] + color.g*m[2][1] + color.b*m[2][2] + color.a*m[2][3];newColor.a = color.r*m[3][0] + color.g*m[3][1] + color.b*m[3][2] + color.a*m[3][3];gl_FragColor = newColor + uColorMatrixOffset;}");
        }
        var e = createjs.extend(t, createjs.Filter);
        (e.shaderParamSetup = function (t, e, i) {
            var s = this.matrix,
                r = new Float32Array([s[0], s[1], s[2], s[3], s[5], s[6], s[7], s[8], s[10], s[11], s[12], s[13], s[15], s[16], s[17], s[18]]);
            t.uniformMatrix4fv(t.getUniformLocation(i, "uColorMatrix"), !1, r), t.uniform4f(t.getUniformLocation(i, "uColorMatrixOffset"), s[4] / 255, s[9] / 255, s[14] / 255, s[19] / 255);
        }),
            (e.toString = function () {
                return "[ColorMatrixFilter]";
            }),
            (e.clone = function () {
                return new t(this.matrix);
            }),
            (e._applyFilter = function (t) {
                for (
                    var e,
                        i,
                        s,
                        r,
                        n = t.data,
                        a = n.length,
                        o = this.matrix,
                        h = o[0],
                        c = o[1],
                        u = o[2],
                        l = o[3],
                        d = o[4],
                        _ = o[5],
                        p = o[6],
                        f = o[7],
                        g = o[8],
                        m = o[9],
                        v = o[10],
                        T = o[11],
                        b = o[12],
                        E = o[13],
                        y = o[14],
                        S = o[15],
                        x = o[16],
                        w = o[17],
                        j = o[18],
                        A = o[19],
                        R = 0;
                    a > R;
                    R += 4
                )
                    (e = n[R]),
                        (i = n[R + 1]),
                        (s = n[R + 2]),
                        (r = n[R + 3]),
                        (n[R] = e * h + i * c + s * u + r * l + d),
                        (n[R + 1] = e * _ + i * p + s * f + r * g + m),
                        (n[R + 2] = e * v + i * T + s * b + r * E + y),
                        (n[R + 3] = e * S + i * x + s * w + r * j + A);
                return !0;
            }),
            (createjs.ColorMatrixFilter = createjs.promote(t, "Filter"));
    })(),
    (this.createjs = this.createjs || {}),
    (function () {
        "use strict";
        function t() {
            throw "Touch cannot be instantiated";
        }
        (t.isSupported = function () {
            return !!("ontouchstart" in window || (window.navigator.msPointerEnabled && window.navigator.msMaxTouchPoints > 0) || (window.navigator.pointerEnabled && window.navigator.maxTouchPoints > 0));
        }),
            (t.enable = function (e, i, s) {
                return (
                    !!(e && e.canvas && t.isSupported()) &&
                    (e.__touch ||
                        ((e.__touch = { pointers: {}, multitouch: !i, preventDefault: !s, count: 0 }), "ontouchstart" in window ? t._IOS_enable(e) : (window.navigator.msPointerEnabled || window.navigator.pointerEnabled) && t._IE_enable(e)),
                    !0)
                );
            }),
            (t.disable = function (e) {
                e && ("ontouchstart" in window ? t._IOS_disable(e) : (window.navigator.msPointerEnabled || window.navigator.pointerEnabled) && t._IE_disable(e), delete e.__touch);
            }),
            (t._IOS_enable = function (e) {
                var i = e.canvas,
                    s = (e.__touch.f = function (i) {
                        t._IOS_handleEvent(e, i);
                    });
                i.addEventListener("touchstart", s, !1), i.addEventListener("touchmove", s, !1), i.addEventListener("touchend", s, !1), i.addEventListener("touchcancel", s, !1);
            }),
            (t._IOS_disable = function (t) {
                var e = t.canvas;
                if (e) {
                    var i = t.__touch.f;
                    e.removeEventListener("touchstart", i, !1), e.removeEventListener("touchmove", i, !1), e.removeEventListener("touchend", i, !1), e.removeEventListener("touchcancel", i, !1);
                }
            }),
            (t._IOS_handleEvent = function (t, e) {
                if (t) {
                    t.__touch.preventDefault && e.preventDefault && e.preventDefault();
                    for (var i = e.changedTouches, s = e.type, r = 0, n = i.length; n > r; r++) {
                        var a = i[r],
                            o = a.identifier;
                        a.target == t.canvas &&
                            ("touchstart" == s ? this._handleStart(t, o, e, a.pageX, a.pageY) : "touchmove" == s ? this._handleMove(t, o, e, a.pageX, a.pageY) : ("touchend" == s || "touchcancel" == s) && this._handleEnd(t, o, e));
                    }
                }
            }),
            (t._IE_enable = function (e) {
                var i = e.canvas,
                    s = (e.__touch.f = function (i) {
                        t._IE_handleEvent(e, i);
                    });
                void 0 === window.navigator.pointerEnabled
                    ? (i.addEventListener("MSPointerDown", s, !1),
                      window.addEventListener("MSPointerMove", s, !1),
                      window.addEventListener("MSPointerUp", s, !1),
                      window.addEventListener("MSPointerCancel", s, !1),
                      e.__touch.preventDefault && (i.style.msTouchAction = "none"))
                    : (i.addEventListener("pointerdown", s, !1),
                      window.addEventListener("pointermove", s, !1),
                      window.addEventListener("pointerup", s, !1),
                      window.addEventListener("pointercancel", s, !1),
                      e.__touch.preventDefault && (i.style.touchAction = "none")),
                    (e.__touch.activeIDs = {});
            }),
            (t._IE_disable = function (t) {
                var e = t.__touch.f;
                void 0 === window.navigator.pointerEnabled
                    ? (window.removeEventListener("MSPointerMove", e, !1),
                      window.removeEventListener("MSPointerUp", e, !1),
                      window.removeEventListener("MSPointerCancel", e, !1),
                      t.canvas && t.canvas.removeEventListener("MSPointerDown", e, !1))
                    : (window.removeEventListener("pointermove", e, !1), window.removeEventListener("pointerup", e, !1), window.removeEventListener("pointercancel", e, !1), t.canvas && t.canvas.removeEventListener("pointerdown", e, !1));
            }),
            (t._IE_handleEvent = function (t, e) {
                if (t) {
                    t.__touch.preventDefault && e.preventDefault && e.preventDefault();
                    var i = e.type,
                        s = e.pointerId,
                        r = t.__touch.activeIDs;
                    if ("MSPointerDown" == i || "pointerdown" == i) {
                        if (e.srcElement != t.canvas) return;
                        (r[s] = !0), this._handleStart(t, s, e, e.pageX, e.pageY);
                    } else
                        r[s] &&
                            ("MSPointerMove" == i || "pointermove" == i
                                ? this._handleMove(t, s, e, e.pageX, e.pageY)
                                : ("MSPointerUp" == i || "MSPointerCancel" == i || "pointerup" == i || "pointercancel" == i) && (delete r[s], this._handleEnd(t, s, e)));
                }
            }),
            (t._handleStart = function (t, e, i, s, r) {
                var n = t.__touch;
                if (n.multitouch || !n.count) {
                    var a = n.pointers;
                    a[e] || ((a[e] = !0), n.count++, t._handlePointerDown(e, i, s, r));
                }
            }),
            (t._handleMove = function (t, e, i, s, r) {
                t.__touch.pointers[e] && t._handlePointerMove(e, i, s, r);
            }),
            (t._handleEnd = function (t, e, i) {
                var s = t.__touch,
                    r = s.pointers;
                r[e] && (s.count--, t._handlePointerUp(e, i, !0), delete r[e]);
            }),
            (createjs.Touch = t);
    })(),
    (this.createjs = this.createjs || {}),
    (function () {
        "use strict";
        var t = (createjs.EaselJS = createjs.EaselJS || {});
        (t.version = "1.0.0"), (t.buildDate = "Thu, 12 Oct 2017 16:34:10 GMT");
    })(),
    (this.createjs = this.createjs || {}),
    (function () {
        "use strict";
        var t = (createjs.PreloadJS = createjs.PreloadJS || {});
        (t.version = "1.0.0"), (t.buildDate = "Thu, 12 Oct 2017 16:34:05 GMT");
    })(),
    (this.createjs = this.createjs || {}),
    (function () {
        "use strict";
        createjs.proxy = function (t, e) {
            var i = Array.prototype.slice.call(arguments, 2);
            return function () {
                return t.apply(e, Array.prototype.slice.call(arguments, 0).concat(i));
            };
        };
    })(),
    (this.createjs = this.createjs || {}),
    (function () {
        "use strict";
        function t(t, e, i) {
            this.Event_constructor("error"), (this.title = t), (this.message = e), (this.data = i);
        }
        (createjs.extend(t, createjs.Event).clone = function () {
            return new createjs.ErrorEvent(this.title, this.message, this.data);
        }),
            (createjs.ErrorEvent = createjs.promote(t, "Event"));
    })(),
    (this.createjs = this.createjs || {}),
    (function (t) {
        "use strict";
        function e(t, e) {
            this.Event_constructor("progress"), (this.loaded = t), (this.total = null == e ? 1 : e), (this.progress = 0 == e ? 0 : this.loaded / this.total);
        }
        (createjs.extend(e, createjs.Event).clone = function () {
            return new createjs.ProgressEvent(this.loaded, this.total);
        }),
            (createjs.ProgressEvent = createjs.promote(e, "Event"));
    })(window),
    function () {
        function t(e, s) {
            function n(t) {
                if (n[t] !== g) return n[t];
                var e;
                if ("bug-string-char-index" == t) e = "a" != "a"[0];
                else if ("json" == t) e = n("json-stringify") && n("json-parse");
                else {
                    var i,
                        r = '{"a":[1,true,false,null,"\\u0000\\b\\n\\f\\r\\t"]}';
                    if ("json-stringify" == t) {
                        var h = s.stringify,
                            u = "function" == typeof h && T;
                        if (u) {
                            (i = function () {
                                return 1;
                            }).toJSON = i;
                            try {
                                u =
                                    "0" === h(0) &&
                                    "0" === h(new a()) &&
                                    '""' == h(new o()) &&
                                    h(v) === g &&
                                    h(g) === g &&
                                    h() === g &&
                                    "1" === h(i) &&
                                    "[1]" == h([i]) &&
                                    "[null]" == h([g]) &&
                                    "null" == h(null) &&
                                    "[null,null,null]" == h([g, v, null]) &&
                                    h({ a: [i, !0, !1, null, "\0\b\n\f\r\t"] }) == r &&
                                    "1" === h(null, i) &&
                                    "[\n 1,\n 2\n]" == h([1, 2], null, 1) &&
                                    '"-271821-04-20T00:00:00.000Z"' == h(new c(-864e13)) &&
                                    '"+275760-09-13T00:00:00.000Z"' == h(new c(864e13)) &&
                                    '"-000001-01-01T00:00:00.000Z"' == h(new c(-621987552e5)) &&
                                    '"1969-12-31T23:59:59.999Z"' == h(new c(-1));
                            } catch (t) {
                                u = !1;
                            }
                        }
                        e = u;
                    }
                    if ("json-parse" == t) {
                        var l = s.parse;
                        if ("function" == typeof l)
                            try {
                                if (0 === l("0") && !l(!1)) {
                                    var d = 5 == (i = l(r)).a.length && 1 === i.a[0];
                                    if (d) {
                                        try {
                                            d = !l('"\t"');
                                        } catch (t) {}
                                        if (d)
                                            try {
                                                d = 1 !== l("01");
                                            } catch (t) {}
                                        if (d)
                                            try {
                                                d = 1 !== l("1.");
                                            } catch (t) {}
                                    }
                                }
                            } catch (t) {
                                d = !1;
                            }
                        e = d;
                    }
                }
                return (n[t] = !!e);
            }
            e || (e = r.Object()), s || (s = r.Object());
            var a = e.Number || r.Number,
                o = e.String || r.String,
                h = e.Object || r.Object,
                c = e.Date || r.Date,
                u = e.SyntaxError || r.SyntaxError,
                l = e.TypeError || r.TypeError,
                d = e.Math || r.Math,
                _ = e.JSON || r.JSON;
            "object" == typeof _ && _ && ((s.stringify = _.stringify), (s.parse = _.parse));
            var p,
                f,
                g,
                m = h.prototype,
                v = m.toString,
                T = new c(-0xc782b5b800cec);
            try {
                T = -109252 == T.getUTCFullYear() && 0 === T.getUTCMonth() && 1 === T.getUTCDate() && 10 == T.getUTCHours() && 37 == T.getUTCMinutes() && 6 == T.getUTCSeconds() && 708 == T.getUTCMilliseconds();
            } catch (t) {}
            if (!n("json")) {
                var b = "[object Function]",
                    E = "[object Number]",
                    y = "[object String]",
                    S = "[object Array]",
                    x = n("bug-string-char-index");
                if (!T)
                    var w = d.floor,
                        j = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334],
                        A = function (t, e) {
                            return j[e] + 365 * (t - 1970) + w((t - 1969 + (e = +(e > 1))) / 4) - w((t - 1901 + e) / 100) + w((t - 1601 + e) / 400);
                        };
                if (
                    ((p = m.hasOwnProperty) ||
                        (p = function (t) {
                            var e,
                                i = {};
                            return (
                                ((i.__proto__ = null), (i.__proto__ = { toString: 1 }), i).toString != v
                                    ? (p = function (t) {
                                          var e = this.__proto__,
                                              i = t in ((this.__proto__ = null), this);
                                          return (this.__proto__ = e), i;
                                      })
                                    : ((e = i.constructor),
                                      (p = function (t) {
                                          var i = (this.constructor || e).prototype;
                                          return t in this && !(t in i && this[t] === i[t]);
                                      })),
                                (i = null),
                                p.call(this, t)
                            );
                        }),
                    (f = function (t, e) {
                        var s,
                            r,
                            n,
                            a = 0;
                        for (n in (((s = function () {
                            this.valueOf = 0;
                        }).prototype.valueOf = 0),
                        (r = new s())))
                            p.call(r, n) && a++;
                        return (
                            (s = r = null),
                            a
                                ? (f =
                                      2 == a
                                          ? function (t, e) {
                                                var i,
                                                    s = {},
                                                    r = v.call(t) == b;
                                                for (i in t) (r && "prototype" == i) || p.call(s, i) || !(s[i] = 1) || !p.call(t, i) || e(i);
                                            }
                                          : function (t, e) {
                                                var i,
                                                    s,
                                                    r = v.call(t) == b;
                                                for (i in t) (r && "prototype" == i) || !p.call(t, i) || (s = "constructor" === i) || e(i);
                                                (s || p.call(t, (i = "constructor"))) && e(i);
                                            })
                                : ((r = ["valueOf", "toString", "toLocaleString", "propertyIsEnumerable", "isPrototypeOf", "hasOwnProperty", "constructor"]),
                                  (f = function (t, e) {
                                      var s,
                                          n,
                                          a = v.call(t) == b,
                                          o = (!a && "function" != typeof t.constructor && i[typeof t.hasOwnProperty] && t.hasOwnProperty) || p;
                                      for (s in t) (a && "prototype" == s) || !o.call(t, s) || e(s);
                                      for (n = r.length; (s = r[--n]); o.call(t, s) && e(s));
                                  })),
                            f(t, e)
                        );
                    }),
                    !n("json-stringify"))
                ) {
                    var R = { 92: "\\\\", 34: '\\"', 8: "\\b", 12: "\\f", 10: "\\n", 13: "\\r", 9: "\\t" },
                        P = function (t, e) {
                            return ("000000" + (e || 0)).slice(-t);
                        },
                        L = function (t) {
                            for (var e = '"', i = 0, s = t.length, r = !x || s > 10, n = r && (x ? t.split("") : t); s > i; i++) {
                                var a = t.charCodeAt(i);
                                switch (a) {
                                    case 8:
                                    case 9:
                                    case 10:
                                    case 12:
                                    case 13:
                                    case 34:
                                    case 92:
                                        e += R[a];
                                        break;
                                    default:
                                        if (32 > a) {
                                            e += "\\u00" + P(2, a.toString(16));
                                            break;
                                        }
                                        e += r ? n[i] : t.charAt(i);
                                }
                            }
                            return e + '"';
                        },
                        I = function (t, e, i, s, r, n, a) {
                            var o, h, c, u, d, _, m, T, b, x, j, R, C, D, M, O;
                            try {
                                o = e[t];
                            } catch (t) {}
                            if ("object" == typeof o && o)
                                if ("[object Date]" != (h = v.call(o)) || p.call(o, "toJSON")) "function" == typeof o.toJSON && ((h != E && h != y && h != S) || p.call(o, "toJSON")) && (o = o.toJSON(t));
                                else if (o > -1 / 0 && 1 / 0 > o) {
                                    if (A) {
                                        for (d = w(o / 864e5), c = w(d / 365.2425) + 1970 - 1; A(c + 1, 0) <= d; c++);
                                        for (u = w((d - A(c, 0)) / 30.42); A(c, u + 1) <= d; u++);
                                        (d = 1 + d - A(c, u)), (m = w((_ = ((o % 864e5) + 864e5) % 864e5) / 36e5) % 24), (T = w(_ / 6e4) % 60), (b = w(_ / 1e3) % 60), (x = _ % 1e3);
                                    } else (c = o.getUTCFullYear()), (u = o.getUTCMonth()), (d = o.getUTCDate()), (m = o.getUTCHours()), (T = o.getUTCMinutes()), (b = o.getUTCSeconds()), (x = o.getUTCMilliseconds());
                                    o = (0 >= c || c >= 1e4 ? (0 > c ? "-" : "+") + P(6, 0 > c ? -c : c) : P(4, c)) + "-" + P(2, u + 1) + "-" + P(2, d) + "T" + P(2, m) + ":" + P(2, T) + ":" + P(2, b) + "." + P(3, x) + "Z";
                                } else o = null;
                            if ((i && (o = i.call(e, t, o)), null === o)) return "null";
                            if ("[object Boolean]" == (h = v.call(o))) return "" + o;
                            if (h == E) return o > -1 / 0 && 1 / 0 > o ? "" + o : "null";
                            if (h == y) return L("" + o);
                            if ("object" == typeof o) {
                                for (D = a.length; D--; ) if (a[D] === o) throw l();
                                if ((a.push(o), (j = []), (M = n), (n += r), h == S)) {
                                    for (C = 0, D = o.length; D > C; C++) (R = I(C, o, i, s, r, n, a)), j.push(R === g ? "null" : R);
                                    O = j.length ? (r ? "[\n" + n + j.join(",\n" + n) + "\n" + M + "]" : "[" + j.join(",") + "]") : "[]";
                                } else
                                    f(s || o, function (t) {
                                        var e = I(t, o, i, s, r, n, a);
                                        e !== g && j.push(L(t) + ":" + (r ? " " : "") + e);
                                    }),
                                        (O = j.length ? (r ? "{\n" + n + j.join(",\n" + n) + "\n" + M + "}" : "{" + j.join(",") + "}") : "{}");
                                return a.pop(), O;
                            }
                        };
                    s.stringify = function (t, e, s) {
                        var r, n, a, o;
                        if (i[typeof e] && e)
                            if ((o = v.call(e)) == b) n = e;
                            else if (o == S) {
                                a = {};
                                for (var h, c = 0, u = e.length; u > c; h = e[c++], ((o = v.call(h)) == y || o == E) && (a[h] = 1));
                            }
                        if (s)
                            if ((o = v.call(s)) == E) {
                                if ((s -= s % 1) > 0) for (r = "", s > 10 && (s = 10); r.length < s; r += " ");
                            } else o == y && (r = s.length <= 10 ? s : s.slice(0, 10));
                        return I("", (((h = {})[""] = t), h), n, a, r, "", []);
                    };
                }
                if (!n("json-parse")) {
                    var C,
                        D,
                        M = o.fromCharCode,
                        O = { 92: "\\", 34: '"', 47: "/", 98: "\b", 116: "\t", 110: "\n", 102: "\f", 114: "\r" },
                        F = function () {
                            throw ((C = D = null), u());
                        },
                        N = function () {
                            for (var t, e, i, s, r, n = D, a = n.length; a > C; )
                                switch ((r = n.charCodeAt(C))) {
                                    case 9:
                                    case 10:
                                    case 13:
                                    case 32:
                                        C++;
                                        break;
                                    case 123:
                                    case 125:
                                    case 91:
                                    case 93:
                                    case 58:
                                    case 44:
                                        return (t = x ? n.charAt(C) : n[C]), C++, t;
                                    case 34:
                                        for (t = "@", C++; a > C; )
                                            if (32 > (r = n.charCodeAt(C))) F();
                                            else if (92 == r)
                                                switch ((r = n.charCodeAt(++C))) {
                                                    case 92:
                                                    case 34:
                                                    case 47:
                                                    case 98:
                                                    case 116:
                                                    case 110:
                                                    case 102:
                                                    case 114:
                                                        (t += O[r]), C++;
                                                        break;
                                                    case 117:
                                                        for (e = ++C, i = C + 4; i > C; C++) ((r = n.charCodeAt(C)) >= 48 && 57 >= r) || (r >= 97 && 102 >= r) || (r >= 65 && 70 >= r) || F();
                                                        t += M("0x" + n.slice(e, C));
                                                        break;
                                                    default:
                                                        F();
                                                }
                                            else {
                                                if (34 == r) break;
                                                for (r = n.charCodeAt(C), e = C; r >= 32 && 92 != r && 34 != r; ) r = n.charCodeAt(++C);
                                                t += n.slice(e, C);
                                            }
                                        if (34 == n.charCodeAt(C)) return C++, t;
                                        F();
                                    default:
                                        if (((e = C), 45 == r && ((s = !0), (r = n.charCodeAt(++C))), r >= 48 && 57 >= r)) {
                                            for (48 == r && (r = n.charCodeAt(C + 1)) >= 48 && 57 >= r && F(), s = !1; a > C && (r = n.charCodeAt(C)) >= 48 && 57 >= r; C++);
                                            if (46 == n.charCodeAt(C)) {
                                                for (i = ++C; a > i && (r = n.charCodeAt(i)) >= 48 && 57 >= r; i++);
                                                i == C && F(), (C = i);
                                            }
                                            if (101 == (r = n.charCodeAt(C)) || 69 == r) {
                                                for ((43 == (r = n.charCodeAt(++C)) || 45 == r) && C++, i = C; a > i && (r = n.charCodeAt(i)) >= 48 && 57 >= r; i++);
                                                i == C && F(), (C = i);
                                            }
                                            return +n.slice(e, C);
                                        }
                                        if ((s && F(), "true" == n.slice(C, C + 4))) return (C += 4), !0;
                                        if ("false" == n.slice(C, C + 5)) return (C += 5), !1;
                                        if ("null" == n.slice(C, C + 4)) return (C += 4), null;
                                        F();
                                }
                            return "$";
                        },
                        k = function (t) {
                            var e, i;
                            if (("$" == t && F(), "string" == typeof t)) {
                                if ("@" == (x ? t.charAt(0) : t[0])) return t.slice(1);
                                if ("[" == t) {
                                    for (e = []; "]" != (t = N()); i || (i = !0)) i && ("," == t ? "]" == (t = N()) && F() : F()), "," == t && F(), e.push(k(t));
                                    return e;
                                }
                                if ("{" == t) {
                                    for (e = {}; "}" != (t = N()); i || (i = !0))
                                        i && ("," == t ? "}" == (t = N()) && F() : F()), ("," == t || "string" != typeof t || "@" != (x ? t.charAt(0) : t[0]) || ":" != N()) && F(), (e[t.slice(1)] = k(N()));
                                    return e;
                                }
                                F();
                            }
                            return t;
                        },
                        B = function (t, e, i) {
                            var s = U(t, e, i);
                            s === g ? delete t[e] : (t[e] = s);
                        },
                        U = function (t, e, i) {
                            var s,
                                r = t[e];
                            if ("object" == typeof r && r)
                                if (v.call(r) == S) for (s = r.length; s--; ) B(r, s, i);
                                else
                                    f(r, function (t) {
                                        B(r, t, i);
                                    });
                            return i.call(t, e, r);
                        };
                    s.parse = function (t, e) {
                        var i, s;
                        return (C = 0), (D = "" + t), (i = k(N())), "$" != N() && F(), (C = D = null), e && v.call(e) == b ? U((((s = {})[""] = i), s), "", e) : i;
                    };
                }
            }
            return (s.runInContext = t), s;
        }
        var e = "function" == typeof define && define.amd,
            i = { function: !0, object: !0 },
            s = i[typeof exports] && exports && !exports.nodeType && exports,
            r = (i[typeof window] && window) || this,
            n = s && i[typeof module] && module && !module.nodeType && "object" == typeof global && global;
        if ((!n || (n.global !== n && n.window !== n && n.self !== n) || (r = n), s && !e)) t(r, s);
        else {
            var a = r.JSON,
                o = r.JSON3,
                h = !1,
                c = t(
                    r,
                    (r.JSON3 = {
                        noConflict: function () {
                            return h || ((h = !0), (r.JSON = a), (r.JSON3 = o), (a = o = null)), c;
                        },
                    })
                );
            r.JSON = { parse: c.parse, stringify: c.stringify };
        }
        e &&
            define(function () {
                return c;
            });
    }.call(this),
    (function () {
        var t = {
            a: function () {
                return t.el("a");
            },
            svg: function () {
                return t.el("svg");
            },
            object: function () {
                return t.el("object");
            },
            image: function () {
                return t.el("image");
            },
            img: function () {
                return t.el("img");
            },
            style: function () {
                return t.el("style");
            },
            link: function () {
                return t.el("link");
            },
            script: function () {
                return t.el("script");
            },
            audio: function () {
                return t.el("audio");
            },
            video: function () {
                return t.el("video");
            },
            text: function (t) {
                return document.createTextNode(t);
            },
            el: function (t) {
                return document.createElement(t);
            },
        };
        createjs.Elements = t;
    })(),
    (function () {
        var t = {
            ABSOLUTE_PATT: /^(?:\w+:)?\/{2}/i,
            RELATIVE_PATT: /^[.\/]*?\//i,
            EXTENSION_PATT: /\/?[^\/]+\.(\w{1,5})$/i,
            parseURI: function (e) {
                var i = { absolute: !1, relative: !1, protocol: null, hostname: null, port: null, pathname: null, search: null, hash: null, host: null };
                if (null == e) return i;
                var s = createjs.Elements.a();
                for (var r in ((s.href = e), i)) r in s && (i[r] = s[r]);
                var n,
                    a = e.indexOf("?");
                return a > -1 && (e = e.substr(0, a)), t.ABSOLUTE_PATT.test(e) ? (i.absolute = !0) : t.RELATIVE_PATT.test(e) && (i.relative = !0), (n = e.match(t.EXTENSION_PATT)) && (i.extension = n[1].toLowerCase()), i;
            },
            formatQueryString: function (t, e) {
                if (null == t) throw new Error("You must specify data.");
                var i = [];
                for (var s in t) i.push(s + "=" + escape(t[s]));
                return e && (i = i.concat(e)), i.join("&");
            },
            buildURI: function (t, e) {
                if (null == e) return t;
                var i = [],
                    s = t.indexOf("?");
                if (-1 != s) {
                    var r = t.slice(s + 1);
                    i = i.concat(r.split("&"));
                }
                return -1 != s ? t.slice(0, s) + "?" + this.formatQueryString(e, i) : t + "?" + this.formatQueryString(e, i);
            },
            isCrossDomain: function (t) {
                var e = createjs.Elements.a();
                e.href = t.src;
                var i = createjs.Elements.a();
                return (i.href = location.href), "" != e.hostname && (e.port != i.port || e.protocol != i.protocol || e.hostname != i.hostname);
            },
            isLocal: function (t) {
                var e = createjs.Elements.a();
                return (e.href = t.src), "" == e.hostname && "file:" == e.protocol;
            },
        };
        createjs.URLUtils = t;
    })(),
    (function () {
        var t = {
            container: null,
            appendToHead: function (e) {
                t.getHead().appendChild(e);
            },
            appendToBody: function (e) {
                if (null == t.container) {
                    (t.container = document.createElement("div")), (t.container.id = "preloadjs-container");
                    var i = t.container.style;
                    (i.visibility = "hidden"),
                        (i.position = "absolute"),
                        (i.width = t.container.style.height = "10px"),
                        (i.overflow = "hidden"),
                        (i.transform = i.msTransform = i.webkitTransform = i.oTransform = "translate(-10px, -10px)"),
                        t.getBody().appendChild(t.container);
                }
                t.container.appendChild(e);
            },
            getHead: function () {
                return document.head || document.getElementsByTagName("head")[0];
            },
            getBody: function () {
                return document.body || document.getElementsByTagName("body")[0];
            },
            removeChild: function (t) {
                t.parent && t.parent.removeChild(t);
            },
            isImageTag: function (t) {
                return t instanceof HTMLImageElement;
            },
            isAudioTag: function (t) {
                return !!window.HTMLAudioElement && t instanceof HTMLAudioElement;
            },
            isVideoTag: function (t) {
                return !!window.HTMLVideoElement && t instanceof HTMLVideoElement;
            },
        };
        createjs.DomUtils = t;
    })(),
    (function () {
        var t = {
            parseXML: function (t) {
                var e = null;
                try {
                    if (window.DOMParser) e = new DOMParser().parseFromString(t, "text/xml");
                } catch (t) {}
                if (!e)
                    try {
                        ((e = new ActiveXObject("Microsoft.XMLDOM")).async = !1), e.loadXML(t);
                    } catch (t) {
                        e = null;
                    }
                return e;
            },
            parseJSON: function (t) {
                if (null == t) return null;
                try {
                    return JSON.parse(t);
                } catch (t) {
                    throw t;
                }
            },
        };
        createjs.DataUtils = t;
    })(),
    (this.createjs = this.createjs || {}),
    (function () {
        var t = {
            BINARY: "binary",
            CSS: "css",
            FONT: "font",
            FONTCSS: "fontcss",
            IMAGE: "image",
            JAVASCRIPT: "javascript",
            JSON: "json",
            JSONP: "jsonp",
            MANIFEST: "manifest",
            SOUND: "sound",
            VIDEO: "video",
            SPRITESHEET: "spritesheet",
            SVG: "svg",
            TEXT: "text",
            XML: "xml",
        };
        createjs.Types = t;
    })(),
    (this.createjs = this.createjs || {}),
    (function () {
        var t = { POST: "POST", GET: "GET" };
        createjs.Methods = t;
    })(),
    (this.createjs = this.createjs || {}),
    (function () {
        "use strict";
        function t() {
            (this.src = null),
                (this.type = null),
                (this.id = null),
                (this.maintainOrder = !1),
                (this.callback = null),
                (this.data = null),
                (this.method = createjs.Methods.GET),
                (this.values = null),
                (this.headers = null),
                (this.withCredentials = !1),
                (this.mimeType = null),
                (this.crossOrigin = null),
                (this.loadTimeout = i.LOAD_TIMEOUT_DEFAULT);
        }
        var e = (t.prototype = {}),
            i = t;
        (i.LOAD_TIMEOUT_DEFAULT = 8e3),
            (i.create = function (e) {
                if ("string" == typeof e) {
                    var s = new t();
                    return (s.src = e), s;
                }
                if (e instanceof i) return e;
                if (e instanceof Object && e.src) return null == e.loadTimeout && (e.loadTimeout = i.LOAD_TIMEOUT_DEFAULT), e;
                throw new Error("Type not recognized.");
            }),
            (e.set = function (t) {
                for (var e in t) this[e] = t[e];
                return this;
            }),
            (createjs.LoadItem = i);
    })(),
    (function () {
        var t = {
            isBinary: function (t) {
                switch (t) {
                    case createjs.Types.IMAGE:
                    case createjs.Types.BINARY:
                        return !0;
                    default:
                        return !1;
                }
            },
            isText: function (t) {
                switch (t) {
                    case createjs.Types.TEXT:
                    case createjs.Types.JSON:
                    case createjs.Types.MANIFEST:
                    case createjs.Types.XML:
                    case createjs.Types.CSS:
                    case createjs.Types.SVG:
                    case createjs.Types.JAVASCRIPT:
                    case createjs.Types.SPRITESHEET:
                        return !0;
                    default:
                        return !1;
                }
            },
            getTypeByExtension: function (t) {
                if (null == t) return createjs.Types.TEXT;
                switch (t.toLowerCase()) {
                    case "jpeg":
                    case "jpg":
                    case "gif":
                    case "png":
                    case "webp":
                    case "bmp":
                        return createjs.Types.IMAGE;
                    case "ogg":
                    case "mp3":
                    case "webm":
                        return createjs.Types.SOUND;
                    case "mp4":
                    case "webm":
                    case "ts":
                        return createjs.Types.VIDEO;
                    case "json":
                        return createjs.Types.JSON;
                    case "xml":
                        return createjs.Types.XML;
                    case "css":
                        return createjs.Types.CSS;
                    case "js":
                        return createjs.Types.JAVASCRIPT;
                    case "svg":
                        return createjs.Types.SVG;
                    default:
                        return createjs.Types.TEXT;
                }
            },
        };
        createjs.RequestUtils = t;
    })(),
    (this.createjs = this.createjs || {}),
    (function () {
        "use strict";
        function t(t, e, i) {
            this.EventDispatcher_constructor(),
                (this.loaded = !1),
                (this.canceled = !1),
                (this.progress = 0),
                (this.type = i),
                (this.resultFormatter = null),
                (this._item = t ? createjs.LoadItem.create(t) : null),
                (this._preferXHR = e),
                (this._result = null),
                (this._rawResult = null),
                (this._loadedItems = null),
                (this._tagSrcAttribute = null),
                (this._tag = null);
        }
        var e = createjs.extend(t, createjs.EventDispatcher),
            i = t;
        try {
            Object.defineProperties(i, {
                POST: {
                    get: createjs.deprecate(function () {
                        return createjs.Methods.POST;
                    }, "AbstractLoader.POST"),
                },
                GET: {
                    get: createjs.deprecate(function () {
                        return createjs.Methods.GET;
                    }, "AbstractLoader.GET"),
                },
                BINARY: {
                    get: createjs.deprecate(function () {
                        return createjs.Types.BINARY;
                    }, "AbstractLoader.BINARY"),
                },
                CSS: {
                    get: createjs.deprecate(function () {
                        return createjs.Types.CSS;
                    }, "AbstractLoader.CSS"),
                },
                FONT: {
                    get: createjs.deprecate(function () {
                        return createjs.Types.FONT;
                    }, "AbstractLoader.FONT"),
                },
                FONTCSS: {
                    get: createjs.deprecate(function () {
                        return createjs.Types.FONTCSS;
                    }, "AbstractLoader.FONTCSS"),
                },
                IMAGE: {
                    get: createjs.deprecate(function () {
                        return createjs.Types.IMAGE;
                    }, "AbstractLoader.IMAGE"),
                },
                JAVASCRIPT: {
                    get: createjs.deprecate(function () {
                        return createjs.Types.JAVASCRIPT;
                    }, "AbstractLoader.JAVASCRIPT"),
                },
                JSON: {
                    get: createjs.deprecate(function () {
                        return createjs.Types.JSON;
                    }, "AbstractLoader.JSON"),
                },
                JSONP: {
                    get: createjs.deprecate(function () {
                        return createjs.Types.JSONP;
                    }, "AbstractLoader.JSONP"),
                },
                MANIFEST: {
                    get: createjs.deprecate(function () {
                        return createjs.Types.MANIFEST;
                    }, "AbstractLoader.MANIFEST"),
                },
                SOUND: {
                    get: createjs.deprecate(function () {
                        return createjs.Types.SOUND;
                    }, "AbstractLoader.SOUND"),
                },
                VIDEO: {
                    get: createjs.deprecate(function () {
                        return createjs.Types.VIDEO;
                    }, "AbstractLoader.VIDEO"),
                },
                SPRITESHEET: {
                    get: createjs.deprecate(function () {
                        return createjs.Types.SPRITESHEET;
                    }, "AbstractLoader.SPRITESHEET"),
                },
                SVG: {
                    get: createjs.deprecate(function () {
                        return createjs.Types.SVG;
                    }, "AbstractLoader.SVG"),
                },
                TEXT: {
                    get: createjs.deprecate(function () {
                        return createjs.Types.TEXT;
                    }, "AbstractLoader.TEXT"),
                },
                XML: {
                    get: createjs.deprecate(function () {
                        return createjs.Types.XML;
                    }, "AbstractLoader.XML"),
                },
            });
        } catch (t) {}
        (e.getItem = function () {
            return this._item;
        }),
            (e.getResult = function (t) {
                return t ? this._rawResult : this._result;
            }),
            (e.getTag = function () {
                return this._tag;
            }),
            (e.setTag = function (t) {
                this._tag = t;
            }),
            (e.load = function () {
                this._createRequest(),
                    this._request.on("complete", this, this),
                    this._request.on("progress", this, this),
                    this._request.on("loadStart", this, this),
                    this._request.on("abort", this, this),
                    this._request.on("timeout", this, this),
                    this._request.on("error", this, this);
                var t = new createjs.Event("initialize");
                (t.loader = this._request), this.dispatchEvent(t), this._request.load();
            }),
            (e.cancel = function () {
                (this.canceled = !0), this.destroy();
            }),
            (e.destroy = function () {
                this._request && (this._request.removeAllEventListeners(), this._request.destroy()),
                    (this._request = null),
                    (this._item = null),
                    (this._rawResult = null),
                    (this._result = null),
                    (this._loadItems = null),
                    this.removeAllEventListeners();
            }),
            (e.getLoadedItems = function () {
                return this._loadedItems;
            }),
            (e._createRequest = function () {
                this._preferXHR ? (this._request = new createjs.XHRRequest(this._item)) : (this._request = new createjs.TagRequest(this._item, this._tag || this._createTag(), this._tagSrcAttribute));
            }),
            (e._createTag = function (t) {
                return null;
            }),
            (e._sendLoadStart = function () {
                this._isCanceled() || this.dispatchEvent("loadstart");
            }),
            (e._sendProgress = function (t) {
                if (!this._isCanceled()) {
                    var e = null;
                    "number" == typeof t
                        ? ((this.progress = t), (e = new createjs.ProgressEvent(this.progress)))
                        : ((e = t), (this.progress = t.loaded / t.total), (e.progress = this.progress), (isNaN(this.progress) || this.progress == 1 / 0) && (this.progress = 0)),
                        this.hasEventListener("progress") && this.dispatchEvent(e);
                }
            }),
            (e._sendComplete = function () {
                if (!this._isCanceled()) {
                    this.loaded = !0;
                    var t = new createjs.Event("complete");
                    (t.rawResult = this._rawResult), null != this._result && (t.result = this._result), this.dispatchEvent(t);
                }
            }),
            (e._sendError = function (t) {
                !this._isCanceled() && this.hasEventListener("error") && (null == t && (t = new createjs.ErrorEvent("PRELOAD_ERROR_EMPTY")), this.dispatchEvent(t));
            }),
            (e._isCanceled = function () {
                return !(null != window.createjs && !this.canceled);
            }),
            (e.resultFormatter = null),
            (e.handleEvent = function (t) {
                switch (t.type) {
                    case "complete":
                        this._rawResult = t.target._response;
                        var e = this.resultFormatter && this.resultFormatter(this);
                        e instanceof Function ? e.call(this, createjs.proxy(this._resultFormatSuccess, this), createjs.proxy(this._resultFormatFailed, this)) : ((this._result = e || this._rawResult), this._sendComplete());
                        break;
                    case "progress":
                        this._sendProgress(t);
                        break;
                    case "error":
                        this._sendError(t);
                        break;
                    case "loadstart":
                        this._sendLoadStart();
                        break;
                    case "abort":
                    case "timeout":
                        this._isCanceled() || this.dispatchEvent(new createjs.ErrorEvent("PRELOAD_" + t.type.toUpperCase() + "_ERROR"));
                }
            }),
            (e._resultFormatSuccess = function (t) {
                (this._result = t), this._sendComplete();
            }),
            (e._resultFormatFailed = function (t) {
                this._sendError(t);
            }),
            (e.toString = function () {
                return "[PreloadJS AbstractLoader]";
            }),
            (createjs.AbstractLoader = createjs.promote(t, "EventDispatcher"));
    })(),
    (this.createjs = this.createjs || {}),
    (function () {
        "use strict";
        function t(t, e, i) {
            this.AbstractLoader_constructor(t, e, i), (this.resultFormatter = this._formatResult), (this._tagSrcAttribute = "src"), this.on("initialize", this._updateXHR, this);
        }
        var e = createjs.extend(t, createjs.AbstractLoader);
        (e.load = function () {
            this._tag || (this._tag = this._createTag(this._item.src)), (this._tag.preload = "auto"), this._tag.load(), this.AbstractLoader_load();
        }),
            (e._createTag = function () {}),
            (e._createRequest = function () {
                this._preferXHR ? (this._request = new createjs.XHRRequest(this._item)) : (this._request = new createjs.MediaTagRequest(this._item, this._tag || this._createTag(), this._tagSrcAttribute));
            }),
            (e._updateXHR = function (t) {
                t.loader.setResponseType && t.loader.setResponseType("blob");
            }),
            (e._formatResult = function (t) {
                if ((this._tag.removeEventListener && this._tag.removeEventListener("canplaythrough", this._loadedHandler), (this._tag.onstalled = null), this._preferXHR)) {
                    var e = window.URL || window.webkitURL,
                        i = t.getResult(!0);
                    t.getTag().src = e.createObjectURL(i);
                }
                return t.getTag();
            }),
            (createjs.AbstractMediaLoader = createjs.promote(t, "AbstractLoader"));
    })(),
    (this.createjs = this.createjs || {}),
    (function () {
        "use strict";
        var t = function (t) {
                this._item = t;
            },
            e = createjs.extend(t, createjs.EventDispatcher);
        (e.load = function () {}), (e.destroy = function () {}), (e.cancel = function () {}), (createjs.AbstractRequest = createjs.promote(t, "EventDispatcher"));
    })(),
    (this.createjs = this.createjs || {}),
    (function () {
        "use strict";
        function t(t, e, i) {
            this.AbstractRequest_constructor(t), (this._tag = e), (this._tagSrcAttribute = i), (this._loadedHandler = createjs.proxy(this._handleTagComplete, this)), (this._addedToDOM = !1);
        }
        var e = createjs.extend(t, createjs.AbstractRequest);
        (e.load = function () {
            (this._tag.onload = createjs.proxy(this._handleTagComplete, this)), (this._tag.onreadystatechange = createjs.proxy(this._handleReadyStateChange, this)), (this._tag.onerror = createjs.proxy(this._handleError, this));
            var t = new createjs.Event("initialize");
            (t.loader = this._tag),
                this.dispatchEvent(t),
                (this._loadTimeout = setTimeout(createjs.proxy(this._handleTimeout, this), this._item.loadTimeout)),
                (this._tag[this._tagSrcAttribute] = this._item.src),
                null == this._tag.parentNode && (createjs.DomUtils.appendToBody(this._tag), (this._addedToDOM = !0));
        }),
            (e.destroy = function () {
                this._clean(), (this._tag = null), this.AbstractRequest_destroy();
            }),
            (e._handleReadyStateChange = function () {
                clearTimeout(this._loadTimeout);
                var t = this._tag;
                ("loaded" == t.readyState || "complete" == t.readyState) && this._handleTagComplete();
            }),
            (e._handleError = function () {
                this._clean(), this.dispatchEvent("error");
            }),
            (e._handleTagComplete = function () {
                (this._rawResult = this._tag), (this._result = (this.resultFormatter && this.resultFormatter(this)) || this._rawResult), this._clean(), this.dispatchEvent("complete");
            }),
            (e._handleTimeout = function () {
                this._clean(), this.dispatchEvent(new createjs.Event("timeout"));
            }),
            (e._clean = function () {
                (this._tag.onload = null), (this._tag.onreadystatechange = null), (this._tag.onerror = null), this._addedToDOM && null != this._tag.parentNode && this._tag.parentNode.removeChild(this._tag), clearTimeout(this._loadTimeout);
            }),
            (e._handleStalled = function () {}),
            (createjs.TagRequest = createjs.promote(t, "AbstractRequest"));
    })(),
    (this.createjs = this.createjs || {}),
    (function () {
        "use strict";
        function t(t, e, i) {
            this.AbstractRequest_constructor(t), (this._tag = e), (this._tagSrcAttribute = i), (this._loadedHandler = createjs.proxy(this._handleTagComplete, this));
        }
        var e = createjs.extend(t, createjs.TagRequest);
        (e.load = function () {
            var t = createjs.proxy(this._handleStalled, this);
            this._stalledCallback = t;
            var e = createjs.proxy(this._handleProgress, this);
            (this._handleProgress = e),
                this._tag.addEventListener("stalled", t),
                this._tag.addEventListener("progress", e),
                this._tag.addEventListener && this._tag.addEventListener("canplaythrough", this._loadedHandler, !1),
                this.TagRequest_load();
        }),
            (e._handleReadyStateChange = function () {
                clearTimeout(this._loadTimeout);
                var t = this._tag;
                ("loaded" == t.readyState || "complete" == t.readyState) && this._handleTagComplete();
            }),
            (e._handleStalled = function () {}),
            (e._handleProgress = function (t) {
                if (t && !(t.loaded > 0 && 0 == t.total)) {
                    var e = new createjs.ProgressEvent(t.loaded, t.total);
                    this.dispatchEvent(e);
                }
            }),
            (e._clean = function () {
                this._tag.removeEventListener && this._tag.removeEventListener("canplaythrough", this._loadedHandler),
                    this._tag.removeEventListener("stalled", this._stalledCallback),
                    this._tag.removeEventListener("progress", this._progressCallback),
                    this.TagRequest__clean();
            }),
            (createjs.MediaTagRequest = createjs.promote(t, "TagRequest"));
    })(),
    (this.createjs = this.createjs || {}),
    (function () {
        "use strict";
        function t(t) {
            this.AbstractRequest_constructor(t),
                (this._request = null),
                (this._loadTimeout = null),
                (this._xhrLevel = 1),
                (this._response = null),
                (this._rawResponse = null),
                (this._canceled = !1),
                (this._handleLoadStartProxy = createjs.proxy(this._handleLoadStart, this)),
                (this._handleProgressProxy = createjs.proxy(this._handleProgress, this)),
                (this._handleAbortProxy = createjs.proxy(this._handleAbort, this)),
                (this._handleErrorProxy = createjs.proxy(this._handleError, this)),
                (this._handleTimeoutProxy = createjs.proxy(this._handleTimeout, this)),
                (this._handleLoadProxy = createjs.proxy(this._handleLoad, this)),
                (this._handleReadyStateChangeProxy = createjs.proxy(this._handleReadyStateChange, this)),
                this._createXHR(t);
        }
        var e = createjs.extend(t, createjs.AbstractRequest);
        (t.ACTIVEX_VERSIONS = ["Msxml2.XMLHTTP.6.0", "Msxml2.XMLHTTP.5.0", "Msxml2.XMLHTTP.4.0", "MSXML2.XMLHTTP.3.0", "MSXML2.XMLHTTP", "Microsoft.XMLHTTP"]),
            (e.getResult = function (t) {
                return t && this._rawResponse ? this._rawResponse : this._response;
            }),
            (e.cancel = function () {
                (this.canceled = !0), this._clean(), this._request.abort();
            }),
            (e.load = function () {
                if (null != this._request) {
                    null != this._request.addEventListener
                        ? (this._request.addEventListener("loadstart", this._handleLoadStartProxy, !1),
                          this._request.addEventListener("progress", this._handleProgressProxy, !1),
                          this._request.addEventListener("abort", this._handleAbortProxy, !1),
                          this._request.addEventListener("error", this._handleErrorProxy, !1),
                          this._request.addEventListener("timeout", this._handleTimeoutProxy, !1),
                          this._request.addEventListener("load", this._handleLoadProxy, !1),
                          this._request.addEventListener("readystatechange", this._handleReadyStateChangeProxy, !1))
                        : ((this._request.onloadstart = this._handleLoadStartProxy),
                          (this._request.onprogress = this._handleProgressProxy),
                          (this._request.onabort = this._handleAbortProxy),
                          (this._request.onerror = this._handleErrorProxy),
                          (this._request.ontimeout = this._handleTimeoutProxy),
                          (this._request.onload = this._handleLoadProxy),
                          (this._request.onreadystatechange = this._handleReadyStateChangeProxy)),
                        1 == this._xhrLevel && (this._loadTimeout = setTimeout(createjs.proxy(this._handleTimeout, this), this._item.loadTimeout));
                    try {
                        this._item.values ? this._request.send(createjs.URLUtils.formatQueryString(this._item.values)) : this._request.send();
                    } catch (t) {
                        this.dispatchEvent(new createjs.ErrorEvent("XHR_SEND", null, t));
                    }
                } else this._handleError();
            }),
            (e.setResponseType = function (t) {
                "blob" === t && ((t = window.URL ? "blob" : "arraybuffer"), (this._responseType = t)), (this._request.responseType = t);
            }),
            (e.getAllResponseHeaders = function () {
                return this._request.getAllResponseHeaders instanceof Function ? this._request.getAllResponseHeaders() : null;
            }),
            (e.getResponseHeader = function (t) {
                return this._request.getResponseHeader instanceof Function ? this._request.getResponseHeader(t) : null;
            }),
            (e._handleProgress = function (t) {
                if (t && !(t.loaded > 0 && 0 == t.total)) {
                    var e = new createjs.ProgressEvent(t.loaded, t.total);
                    this.dispatchEvent(e);
                }
            }),
            (e._handleLoadStart = function (t) {
                clearTimeout(this._loadTimeout), this.dispatchEvent("loadstart");
            }),
            (e._handleAbort = function (t) {
                this._clean(), this.dispatchEvent(new createjs.ErrorEvent("XHR_ABORTED", null, t));
            }),
            (e._handleError = function (t) {
                this._clean(), this.dispatchEvent(new createjs.ErrorEvent(t.message));
            }),
            (e._handleReadyStateChange = function (t) {
                4 == this._request.readyState && this._handleLoad();
            }),
            (e._handleLoad = function (t) {
                if (!this.loaded) {
                    this.loaded = !0;
                    var e = this._checkError();
                    if (e) return void this._handleError(e);
                    if (((this._response = this._getResponse()), "arraybuffer" === this._responseType))
                        try {
                            this._response = new Blob([this._response]);
                        } catch (t) {
                            if (((window.BlobBuilder = window.BlobBuilder || window.WebKitBlobBuilder || window.MozBlobBuilder || window.MSBlobBuilder), "TypeError" === t.name && window.BlobBuilder)) {
                                var i = new BlobBuilder();
                                i.append(this._response), (this._response = i.getBlob());
                            }
                        }
                    this._clean(), this.dispatchEvent(new createjs.Event("complete"));
                }
            }),
            (e._handleTimeout = function (t) {
                this._clean(), this.dispatchEvent(new createjs.ErrorEvent("PRELOAD_TIMEOUT", null, t));
            }),
            (e._checkError = function () {
                var t = parseInt(this._request.status);
                return t >= 400 && 599 >= t ? new Error(t) : 0 == t && /^https?:/.test(location.protocol) ? new Error(0) : null;
            }),
            (e._getResponse = function () {
                if (null != this._response) return this._response;
                if (null != this._request.response) return this._request.response;
                try {
                    if (null != this._request.responseText) return this._request.responseText;
                } catch (t) {}
                try {
                    if (null != this._request.responseXML) return this._request.responseXML;
                } catch (t) {}
                return null;
            }),
            (e._createXHR = function (t) {
                var e = createjs.URLUtils.isCrossDomain(t),
                    i = {},
                    r = null;
                if (window.XMLHttpRequest) (r = new XMLHttpRequest()), e && void 0 === r.withCredentials && window.XDomainRequest && (r = new XDomainRequest());
                else {
                    for (var n = 0, a = s.ACTIVEX_VERSIONS.length; a > n; n++) {
                        var o = s.ACTIVEX_VERSIONS[n];
                        try {
                            r = new ActiveXObject(o);
                            break;
                        } catch (t) {}
                    }
                    if (null == r) return !1;
                }
                null == t.mimeType && createjs.RequestUtils.isText(t.type) && (t.mimeType = "text/plain; charset=utf-8"),
                    t.mimeType && r.overrideMimeType && r.overrideMimeType(t.mimeType),
                    (this._xhrLevel = "string" == typeof r.responseType ? 2 : 1);
                var h;
                if (
                    ((h = t.method == createjs.Methods.GET ? createjs.URLUtils.buildURI(t.src, t.values) : t.src),
                    r.open(t.method || createjs.Methods.GET, h, !0),
                    e && r instanceof XMLHttpRequest && 1 == this._xhrLevel && (i.Origin = location.origin),
                    t.values && t.method == createjs.Methods.POST && (i["Content-Type"] = "application/x-www-form-urlencoded"),
                    e || i["X-Requested-With"] || (i["X-Requested-With"] = "XMLHttpRequest"),
                    t.headers)
                )
                    for (var c in t.headers) i[c] = t.headers[c];
                for (c in i) r.setRequestHeader(c, i[c]);
                return r instanceof XMLHttpRequest && void 0 !== t.withCredentials && (r.withCredentials = t.withCredentials), (this._request = r), !0;
            }),
            (e._clean = function () {
                clearTimeout(this._loadTimeout),
                    null != this._request.removeEventListener
                        ? (this._request.removeEventListener("loadstart", this._handleLoadStartProxy),
                          this._request.removeEventListener("progress", this._handleProgressProxy),
                          this._request.removeEventListener("abort", this._handleAbortProxy),
                          this._request.removeEventListener("error", this._handleErrorProxy),
                          this._request.removeEventListener("timeout", this._handleTimeoutProxy),
                          this._request.removeEventListener("load", this._handleLoadProxy),
                          this._request.removeEventListener("readystatechange", this._handleReadyStateChangeProxy))
                        : ((this._request.onloadstart = null),
                          (this._request.onprogress = null),
                          (this._request.onabort = null),
                          (this._request.onerror = null),
                          (this._request.ontimeout = null),
                          (this._request.onload = null),
                          (this._request.onreadystatechange = null));
            }),
            (e.toString = function () {
                return "[PreloadJS XHRRequest]";
            }),
            (createjs.XHRRequest = createjs.promote(t, "AbstractRequest"));
    })(),
    (this.createjs = this.createjs || {}),
    (function () {
        "use strict";
        function t(t, e, i) {
            this.AbstractLoader_constructor(),
                (this._plugins = []),
                (this._typeCallbacks = {}),
                (this._extensionCallbacks = {}),
                (this.next = null),
                (this.maintainScriptOrder = !0),
                (this.stopOnError = !1),
                (this._maxConnections = 1),
                (this._availableLoaders = [
                    createjs.FontLoader,
                    createjs.ImageLoader,
                    createjs.JavaScriptLoader,
                    createjs.CSSLoader,
                    createjs.JSONLoader,
                    createjs.JSONPLoader,
                    createjs.SoundLoader,
                    createjs.ManifestLoader,
                    createjs.SpriteSheetLoader,
                    createjs.XMLLoader,
                    createjs.SVGLoader,
                    createjs.BinaryLoader,
                    createjs.VideoLoader,
                    createjs.TextLoader,
                ]),
                (this._defaultLoaderLength = this._availableLoaders.length),
                this.init(t, e, i);
        }
        var e = createjs.extend(t, createjs.AbstractLoader),
            i = t;
        try {
            Object.defineProperties(i, {
                POST: {
                    get: createjs.deprecate(function () {
                        return createjs.Methods.POST;
                    }, "AbstractLoader.POST"),
                },
                GET: {
                    get: createjs.deprecate(function () {
                        return createjs.Methods.GET;
                    }, "AbstractLoader.GET"),
                },
                BINARY: {
                    get: createjs.deprecate(function () {
                        return createjs.Types.BINARY;
                    }, "AbstractLoader.BINARY"),
                },
                CSS: {
                    get: createjs.deprecate(function () {
                        return createjs.Types.CSS;
                    }, "AbstractLoader.CSS"),
                },
                FONT: {
                    get: createjs.deprecate(function () {
                        return createjs.Types.FONT;
                    }, "AbstractLoader.FONT"),
                },
                FONTCSS: {
                    get: createjs.deprecate(function () {
                        return createjs.Types.FONTCSS;
                    }, "AbstractLoader.FONTCSS"),
                },
                IMAGE: {
                    get: createjs.deprecate(function () {
                        return createjs.Types.IMAGE;
                    }, "AbstractLoader.IMAGE"),
                },
                JAVASCRIPT: {
                    get: createjs.deprecate(function () {
                        return createjs.Types.JAVASCRIPT;
                    }, "AbstractLoader.JAVASCRIPT"),
                },
                JSON: {
                    get: createjs.deprecate(function () {
                        return createjs.Types.JSON;
                    }, "AbstractLoader.JSON"),
                },
                JSONP: {
                    get: createjs.deprecate(function () {
                        return createjs.Types.JSONP;
                    }, "AbstractLoader.JSONP"),
                },
                MANIFEST: {
                    get: createjs.deprecate(function () {
                        return createjs.Types.MANIFEST;
                    }, "AbstractLoader.MANIFEST"),
                },
                SOUND: {
                    get: createjs.deprecate(function () {
                        return createjs.Types.SOUND;
                    }, "AbstractLoader.SOUND"),
                },
                VIDEO: {
                    get: createjs.deprecate(function () {
                        return createjs.Types.VIDEO;
                    }, "AbstractLoader.VIDEO"),
                },
                SPRITESHEET: {
                    get: createjs.deprecate(function () {
                        return createjs.Types.SPRITESHEET;
                    }, "AbstractLoader.SPRITESHEET"),
                },
                SVG: {
                    get: createjs.deprecate(function () {
                        return createjs.Types.SVG;
                    }, "AbstractLoader.SVG"),
                },
                TEXT: {
                    get: createjs.deprecate(function () {
                        return createjs.Types.TEXT;
                    }, "AbstractLoader.TEXT"),
                },
                XML: {
                    get: createjs.deprecate(function () {
                        return createjs.Types.XML;
                    }, "AbstractLoader.XML"),
                },
            });
        } catch (t) {}
        (e.init = function (t, e, i) {
            (this.preferXHR = !0),
                (this._preferXHR = !0),
                this.setPreferXHR(t),
                (this._paused = !1),
                (this._basePath = e),
                (this._crossOrigin = i),
                (this._loadStartWasDispatched = !1),
                (this._currentlyLoadingScript = null),
                (this._currentLoads = []),
                (this._loadQueue = []),
                (this._loadQueueBackup = []),
                (this._loadItemsById = {}),
                (this._loadItemsBySrc = {}),
                (this._loadedResults = {}),
                (this._loadedRawResults = {}),
                (this._numItems = 0),
                (this._numItemsLoaded = 0),
                (this._scriptOrder = []),
                (this._loadedScripts = []),
                (this._lastProgress = NaN);
        }),
            (e.registerLoader = function (t) {
                if (!t || !t.canLoadItem) throw new Error("loader is of an incorrect type.");
                if (-1 != this._availableLoaders.indexOf(t)) throw new Error("loader already exists.");
                this._availableLoaders.unshift(t);
            }),
            (e.unregisterLoader = function (t) {
                var e = this._availableLoaders.indexOf(t);
                -1 != e && e < this._defaultLoaderLength - 1 && this._availableLoaders.splice(e, 1);
            }),
            (e.setPreferXHR = function (t) {
                return (this.preferXHR = 0 != t && null != window.XMLHttpRequest), this.preferXHR;
            }),
            (e.removeAll = function () {
                this.remove();
            }),
            (e.remove = function (t) {
                var e = null;
                if (t && !Array.isArray(t)) e = [t];
                else if (t) e = t;
                else if (arguments.length > 0) return;
                var i = !1;
                if (e) {
                    for (; e.length; ) {
                        var s = e.pop(),
                            r = this.getResult(s);
                        for (n = this._loadQueue.length - 1; n >= 0; n--)
                            if ((a = this._loadQueue[n].getItem()).id == s || a.src == s) {
                                this._loadQueue.splice(n, 1)[0].cancel();
                                break;
                            }
                        for (n = this._loadQueueBackup.length - 1; n >= 0; n--)
                            if ((a = this._loadQueueBackup[n].getItem()).id == s || a.src == s) {
                                this._loadQueueBackup.splice(n, 1)[0].cancel();
                                break;
                            }
                        if (r) this._disposeItem(this.getItem(s));
                        else
                            for (var n = this._currentLoads.length - 1; n >= 0; n--) {
                                var a = this._currentLoads[n].getItem();
                                if (a.id == s || a.src == s) {
                                    this._currentLoads.splice(n, 1)[0].cancel(), (i = !0);
                                    break;
                                }
                            }
                    }
                    i && this._loadNext();
                } else {
                    for (var o in (this.close(), this._loadItemsById)) this._disposeItem(this._loadItemsById[o]);
                    this.init(this.preferXHR, this._basePath);
                }
            }),
            (e.reset = function () {
                for (var t in (this.close(), this._loadItemsById)) this._disposeItem(this._loadItemsById[t]);
                for (var e = [], i = 0, s = this._loadQueueBackup.length; s > i; i++) e.push(this._loadQueueBackup[i].getItem());
                this.loadManifest(e, !1);
            }),
            (e.installPlugin = function (t) {
                if (null != t && null != t.getPreloadHandlers) {
                    this._plugins.push(t);
                    var e = t.getPreloadHandlers();
                    if (((e.scope = t), null != e.types)) for (var i = 0, s = e.types.length; s > i; i++) this._typeCallbacks[e.types[i]] = e;
                    if (null != e.extensions) for (i = 0, s = e.extensions.length; s > i; i++) this._extensionCallbacks[e.extensions[i]] = e;
                }
            }),
            (e.setMaxConnections = function (t) {
                (this._maxConnections = t), !this._paused && this._loadQueue.length > 0 && this._loadNext();
            }),
            (e.loadFile = function (t, e, i) {
                if (null != t) this._addItem(t, null, i), !1 !== e ? this.setPaused(!1) : this.setPaused(!0);
                else {
                    var s = new createjs.ErrorEvent("PRELOAD_NO_FILE");
                    this._sendError(s);
                }
            }),
            (e.loadManifest = function (t, e, s) {
                var r = null,
                    n = null;
                if (Array.isArray(t)) {
                    if (0 == t.length) {
                        var a = new createjs.ErrorEvent("PRELOAD_MANIFEST_EMPTY");
                        return void this._sendError(a);
                    }
                    r = t;
                } else if ("string" == typeof t) r = [{ src: t, type: i.MANIFEST }];
                else {
                    if ("object" != typeof t) {
                        a = new createjs.ErrorEvent("PRELOAD_MANIFEST_NULL");
                        return void this._sendError(a);
                    }
                    if (void 0 !== t.src) {
                        if (null == t.type) t.type = i.MANIFEST;
                        else if (t.type != i.MANIFEST) {
                            a = new createjs.ErrorEvent("PRELOAD_MANIFEST_TYPE");
                            this._sendError(a);
                        }
                        r = [t];
                    } else void 0 !== t.manifest && ((r = t.manifest), (n = t.path));
                }
                for (var o = 0, h = r.length; h > o; o++) this._addItem(r[o], n, s);
                !1 !== e ? this.setPaused(!1) : this.setPaused(!0);
            }),
            (e.load = function () {
                this.setPaused(!1);
            }),
            (e.getItem = function (t) {
                return this._loadItemsById[t] || this._loadItemsBySrc[t];
            }),
            (e.getResult = function (t, e) {
                var i = this._loadItemsById[t] || this._loadItemsBySrc[t];
                if (null == i) return null;
                var s = i.id;
                return e && this._loadedRawResults[s] ? this._loadedRawResults[s] : this._loadedResults[s];
            }),
            (e.getItems = function (t) {
                var e = [];
                for (var i in this._loadItemsById) {
                    var s = this._loadItemsById[i],
                        r = this.getResult(i);
                    (!0 !== t || null != r) && e.push({ item: s, result: r, rawResult: this.getResult(i, !0) });
                }
                return e;
            }),
            (e.setPaused = function (t) {
                (this._paused = t), this._paused || this._loadNext();
            }),
            (e.close = function () {
                for (; this._currentLoads.length; ) this._currentLoads.pop().cancel();
                (this._scriptOrder.length = 0), (this._loadedScripts.length = 0), (this.loadStartWasDispatched = !1), (this._itemCount = 0), (this._lastProgress = NaN);
            }),
            (e._addItem = function (t, e, i) {
                var s = this._createLoadItem(t, e, i);
                if (null != s) {
                    var r = this._createLoader(s);
                    null != r &&
                        ("plugins" in r && (r.plugins = this._plugins),
                        (s._loader = r),
                        this._loadQueue.push(r),
                        this._loadQueueBackup.push(r),
                        this._numItems++,
                        this._updateProgress(),
                        ((this.maintainScriptOrder && s.type == createjs.Types.JAVASCRIPT) || !0 === s.maintainOrder) && (this._scriptOrder.push(s), this._loadedScripts.push(null)));
                }
            }),
            (e._createLoadItem = function (t, e, i) {
                var s = createjs.LoadItem.create(t);
                if (null == s) return null;
                var r = "",
                    n = i || this._basePath;
                if (s.src instanceof Object) {
                    if (!s.type) return null;
                    if (e) {
                        r = e;
                        var a = createjs.URLUtils.parseURI(e);
                        null == n || a.absolute || a.relative || (r = n + r);
                    } else null != n && (r = n);
                } else {
                    var o = createjs.URLUtils.parseURI(s.src);
                    o.extension && (s.ext = o.extension), null == s.type && (s.type = createjs.RequestUtils.getTypeByExtension(s.ext));
                    var h = s.src;
                    if (!o.absolute && !o.relative)
                        if (e) {
                            r = e;
                            a = createjs.URLUtils.parseURI(e);
                            (h = e + h), null == n || a.absolute || a.relative || (r = n + r);
                        } else null != n && (r = n);
                    s.src = r + s.src;
                }
                (s.path = r), (void 0 === s.id || null === s.id || "" === s.id) && (s.id = h);
                var c = this._typeCallbacks[s.type] || this._extensionCallbacks[s.ext];
                if (c) {
                    var u = c.callback.call(c.scope, s, this);
                    if (!1 === u) return null;
                    !0 === u || (null != u && (s._loader = u)), null != (o = createjs.URLUtils.parseURI(s.src)).extension && (s.ext = o.extension);
                }
                return (this._loadItemsById[s.id] = s), (this._loadItemsBySrc[s.src] = s), null == s.crossOrigin && (s.crossOrigin = this._crossOrigin), s;
            }),
            (e._createLoader = function (t) {
                if (null != t._loader) return t._loader;
                for (var e = this.preferXHR, i = 0; i < this._availableLoaders.length; i++) {
                    var s = this._availableLoaders[i];
                    if (s && s.canLoadItem(t)) return new s(t, e);
                }
                return null;
            }),
            (e._loadNext = function () {
                if (!this._paused) {
                    this._loadStartWasDispatched || (this._sendLoadStart(), (this._loadStartWasDispatched = !0)),
                        this._numItems == this._numItemsLoaded ? ((this.loaded = !0), this._sendComplete(), this.next && this.next.load && this.next.load()) : (this.loaded = !1);
                    for (var t = 0; t < this._loadQueue.length && !(this._currentLoads.length >= this._maxConnections); t++) {
                        var e = this._loadQueue[t];
                        this._canStartLoad(e) && (this._loadQueue.splice(t, 1), t--, this._loadItem(e));
                    }
                }
            }),
            (e._loadItem = function (t) {
                t.on("fileload", this._handleFileLoad, this),
                    t.on("progress", this._handleProgress, this),
                    t.on("complete", this._handleFileComplete, this),
                    t.on("error", this._handleError, this),
                    t.on("fileerror", this._handleFileError, this),
                    this._currentLoads.push(t),
                    this._sendFileStart(t.getItem()),
                    t.load();
            }),
            (e._handleFileLoad = function (t) {
                (t.target = null), this.dispatchEvent(t);
            }),
            (e._handleFileError = function (t) {
                var e = new createjs.ErrorEvent("FILE_LOAD_ERROR", null, t.item);
                this._sendError(e);
            }),
            (e._handleError = function (t) {
                var e = t.target;
                this._numItemsLoaded++, this._finishOrderedItem(e, !0), this._updateProgress();
                var i = new createjs.ErrorEvent("FILE_LOAD_ERROR", null, e.getItem());
                this._sendError(i), this.stopOnError ? this.setPaused(!0) : (this._removeLoadItem(e), this._cleanLoadItem(e), this._loadNext());
            }),
            (e._handleFileComplete = function (t) {
                var e = t.target,
                    i = e.getItem(),
                    s = e.getResult();
                this._loadedResults[i.id] = s;
                var r = e.getResult(!0);
                null != r && r !== s && (this._loadedRawResults[i.id] = r), this._saveLoadedItems(e), this._removeLoadItem(e), this._finishOrderedItem(e) || this._processFinishedLoad(i, e), this._cleanLoadItem(e);
            }),
            (e._saveLoadedItems = function (t) {
                var e = t.getLoadedItems();
                if (null !== e)
                    for (var i = 0; i < e.length; i++) {
                        var s = e[i].item;
                        (this._loadItemsBySrc[s.src] = s), (this._loadItemsById[s.id] = s), (this._loadedResults[s.id] = e[i].result), (this._loadedRawResults[s.id] = e[i].rawResult);
                    }
            }),
            (e._finishOrderedItem = function (t, e) {
                var i = t.getItem();
                if ((this.maintainScriptOrder && i.type == createjs.Types.JAVASCRIPT) || i.maintainOrder) {
                    t instanceof createjs.JavaScriptLoader && (this._currentlyLoadingScript = !1);
                    var s = createjs.indexOf(this._scriptOrder, i);
                    return -1 != s && ((this._loadedScripts[s] = !0 === e || i), this._checkScriptLoadOrder(), !0);
                }
                return !1;
            }),
            (e._checkScriptLoadOrder = function () {
                for (var t = this._loadedScripts.length, e = 0; t > e; e++) {
                    var i = this._loadedScripts[e];
                    if (null === i) break;
                    if (!0 !== i) {
                        var s = this._loadedResults[i.id];
                        i.type == createjs.Types.JAVASCRIPT && createjs.DomUtils.appendToHead(s);
                        var r = i._loader;
                        this._processFinishedLoad(i, r), (this._loadedScripts[e] = !0);
                    }
                }
            }),
            (e._processFinishedLoad = function (t, e) {
                if ((this._numItemsLoaded++, !this.maintainScriptOrder && t.type == createjs.Types.JAVASCRIPT)) {
                    var i = e.getTag();
                    createjs.DomUtils.appendToHead(i);
                }
                this._updateProgress(), this._sendFileComplete(t, e), this._loadNext();
            }),
            (e._canStartLoad = function (t) {
                if (!this.maintainScriptOrder || t.preferXHR) return !0;
                var e = t.getItem();
                if (e.type != createjs.Types.JAVASCRIPT) return !0;
                if (this._currentlyLoadingScript) return !1;
                for (var i = this._scriptOrder.indexOf(e), s = 0; i > s; ) {
                    if (null == this._loadedScripts[s]) return !1;
                    s++;
                }
                return (this._currentlyLoadingScript = !0), !0;
            }),
            (e._removeLoadItem = function (t) {
                for (var e = this._currentLoads.length, i = 0; e > i; i++)
                    if (this._currentLoads[i] == t) {
                        this._currentLoads.splice(i, 1);
                        break;
                    }
            }),
            (e._cleanLoadItem = function (t) {
                var e = t.getItem();
                e && delete e._loader;
            }),
            (e._handleProgress = function (t) {
                var e = t.target;
                this._sendFileProgress(e.getItem(), e.progress), this._updateProgress();
            }),
            (e._updateProgress = function () {
                var t = this._numItemsLoaded / this._numItems,
                    e = this._numItems - this._numItemsLoaded;
                if (e > 0) {
                    for (var i = 0, s = 0, r = this._currentLoads.length; r > s; s++) i += this._currentLoads[s].progress;
                    t += (i / e) * (e / this._numItems);
                }
                this._lastProgress != t && (this._sendProgress(t), (this._lastProgress = t));
            }),
            (e._disposeItem = function (t) {
                delete this._loadedResults[t.id], delete this._loadedRawResults[t.id], delete this._loadItemsById[t.id], delete this._loadItemsBySrc[t.src];
            }),
            (e._sendFileProgress = function (t, e) {
                if (!this._isCanceled() && !this._paused && this.hasEventListener("fileprogress")) {
                    var i = new createjs.Event("fileprogress");
                    (i.progress = e), (i.loaded = e), (i.total = 1), (i.item = t), this.dispatchEvent(i);
                }
            }),
            (e._sendFileComplete = function (t, e) {
                if (!this._isCanceled() && !this._paused) {
                    var i = new createjs.Event("fileload");
                    (i.loader = e), (i.item = t), (i.result = this._loadedResults[t.id]), (i.rawResult = this._loadedRawResults[t.id]), t.completeHandler && t.completeHandler(i), this.hasEventListener("fileload") && this.dispatchEvent(i);
                }
            }),
            (e._sendFileStart = function (t) {
                var e = new createjs.Event("filestart");
                (e.item = t), this.hasEventListener("filestart") && this.dispatchEvent(e);
            }),
            (e.toString = function () {
                return "[PreloadJS LoadQueue]";
            }),
            (createjs.LoadQueue = createjs.promote(t, "AbstractLoader"));
    })(),
    (this.createjs = this.createjs || {}),
    (function () {
        "use strict";
        function t(t) {
            this.AbstractLoader_constructor(t, !0, createjs.Types.TEXT);
        }
        ((createjs.extend(t, createjs.AbstractLoader), t).canLoadItem = function (t) {
            return t.type == createjs.Types.TEXT;
        }),
            (createjs.TextLoader = createjs.promote(t, "AbstractLoader"));
    })(),
    (this.createjs = this.createjs || {}),
    (function () {
        "use strict";
        function t(t) {
            this.AbstractLoader_constructor(t, !0, createjs.Types.BINARY), this.on("initialize", this._updateXHR, this);
        }
        var e = createjs.extend(t, createjs.AbstractLoader);
        (t.canLoadItem = function (t) {
            return t.type == createjs.Types.BINARY;
        }),
            (e._updateXHR = function (t) {
                t.loader.setResponseType("arraybuffer");
            }),
            (createjs.BinaryLoader = createjs.promote(t, "AbstractLoader"));
    })(),
    (this.createjs = this.createjs || {}),
    (function () {
        "use strict";
        function t(t, e) {
            this.AbstractLoader_constructor(t, e, createjs.Types.CSS),
                (this.resultFormatter = this._formatResult),
                (this._tagSrcAttribute = "href"),
                (this._tag = e ? createjs.Elements.style() : createjs.Elements.link()),
                (this._tag.rel = "stylesheet"),
                (this._tag.type = "text/css");
        }
        var e = createjs.extend(t, createjs.AbstractLoader);
        (t.canLoadItem = function (t) {
            return t.type == createjs.Types.CSS;
        }),
            (e._formatResult = function (t) {
                if (this._preferXHR) {
                    var e = t.getTag();
                    if (e.styleSheet) e.styleSheet.cssText = t.getResult(!0);
                    else {
                        var i = createjs.Elements.text(t.getResult(!0));
                        e.appendChild(i);
                    }
                } else e = this._tag;
                return createjs.DomUtils.appendToHead(e), e;
            }),
            (createjs.CSSLoader = createjs.promote(t, "AbstractLoader"));
    })(),
    (this.createjs = this.createjs || {}),
    (function () {
        "use strict";
        function t(t, e) {
            this.AbstractLoader_constructor(t, e, t.type),
                (this._faces = {}),
                (this._watched = []),
                (this._count = 0),
                (this._watchInterval = null),
                (this._loadTimeout = null),
                (this._injectCSS = void 0 === t.injectCSS || t.injectCSS),
                this.dispatchEvent("initialize");
        }
        var e = createjs.extend(t, createjs.AbstractLoader);
        (t.canLoadItem = function (t) {
            return t.type == createjs.Types.FONT || t.type == createjs.Types.FONTCSS;
        }),
            (t.sampleText = "abcdefghijklmnopqrstuvwxyz ABCDEFGHIJKLMNOPQRSTUVWXYZ"),
            (t._ctx = document.createElement("canvas").getContext("2d")),
            (t._referenceFonts = ["serif", "monospace"]),
            (t.WEIGHT_REGEX = /[- ._]*(thin|normal|book|regular|medium|black|heavy|[1-9]00|(?:extra|ultra|semi|demi)?[- ._]*(?:light|bold))[- ._]*/gi),
            (t.STYLE_REGEX = /[- ._]*(italic|oblique)[- ._]*/gi),
            (t.FONT_FORMAT = { woff2: "woff2", woff: "woff", ttf: "truetype", otf: "truetype" }),
            (t.FONT_WEIGHT = {
                thin: 100,
                extralight: 200,
                ultralight: 200,
                light: 300,
                semilight: 300,
                demilight: 300,
                book: "normal",
                regular: "normal",
                semibold: 600,
                demibold: 600,
                extrabold: 800,
                ultrabold: 800,
                black: 900,
                heavy: 900,
            }),
            (t.WATCH_DURATION = 10),
            (e.load = function () {
                if (this.type == createjs.Types.FONTCSS) {
                    if (!this._watchCSS()) return void this.AbstractLoader_load();
                } else if (this._item.src instanceof Array) this._watchFontArray();
                else {
                    var t = this._defFromSrc(this._item.src);
                    this._watchFont(t), this._injectStyleTag(this._cssFromDef(t));
                }
                (this._loadTimeout = setTimeout(createjs.proxy(this._handleTimeout, this), this._item.loadTimeout)), this.dispatchEvent("loadstart");
            }),
            (e._handleTimeout = function () {
                this._stopWatching(), this.dispatchEvent(new createjs.ErrorEvent("PRELOAD_TIMEOUT"));
            }),
            (e._createRequest = function () {
                return this._request;
            }),
            (e.handleEvent = function (t) {
                switch (t.type) {
                    case "complete":
                        (this._rawResult = t.target._response), (this._result = !0), this._parseCSS(this._rawResult);
                        break;
                    case "error":
                        this._stopWatching(), this.AbstractLoader_handleEvent(t);
                }
            }),
            (e._watchCSS = function () {
                var t = this._item.src;
                return (
                    t instanceof HTMLStyleElement && (this._injectCSS && !t.parentNode && (document.head || document.getElementsByTagName("head")[0]).appendChild(t), (this._injectCSS = !1), (t = "\n" + t.textContent)),
                    -1 !== t.search(/\n|\r|@font-face/i) ? (this._parseCSS(t), !0) : ((this._request = new createjs.XHRRequest(this._item)), !1)
                );
            }),
            (e._parseCSS = function (t) {
                for (var e = /@font-face\s*\{([^}]+)}/g; ; ) {
                    var i = e.exec(t);
                    if (!i) break;
                    this._watchFont(this._parseFontFace(i[1]));
                }
                this._injectStyleTag(t);
            }),
            (e._watchFontArray = function () {
                for (var t, e = this._item.src, i = "", s = e.length - 1; s >= 0; s--) {
                    var r = e[s];
                    (t = "string" == typeof r ? this._defFromSrc(r) : this._defFromObj(r)), this._watchFont(t), (i += this._cssFromDef(t) + "\n");
                }
                this._injectStyleTag(i);
            }),
            (e._injectStyleTag = function (t) {
                if (this._injectCSS) {
                    var e = document.head || document.getElementsByTagName("head")[0],
                        i = document.createElement("style");
                    (i.type = "text/css"), i.styleSheet ? (i.styleSheet.cssText = t) : i.appendChild(document.createTextNode(t)), e.appendChild(i);
                }
            }),
            (e._parseFontFace = function (t) {
                var e = this._getCSSValue(t, "font-family"),
                    i = this._getCSSValue(t, "src");
                return e && i ? this._defFromObj({ family: e, src: i, style: this._getCSSValue(t, "font-style"), weight: this._getCSSValue(t, "font-weight") }) : null;
            }),
            (e._watchFont = function (t) {
                t && !this._faces[t.id] && ((this._faces[t.id] = t), this._watched.push(t), this._count++, this._calculateReferenceSizes(t), this._startWatching());
            }),
            (e._startWatching = function () {
                null == this._watchInterval && (this._watchInterval = setInterval(createjs.proxy(this._watch, this), t.WATCH_DURATION));
            }),
            (e._stopWatching = function () {
                clearInterval(this._watchInterval), clearTimeout(this._loadTimeout), (this._watchInterval = null);
            }),
            (e._watch = function () {
                for (var e = this._watched, i = t._referenceFonts, s = e.length, r = s - 1; r >= 0; r--)
                    for (var n = e[r], a = n.refs, o = a.length - 1; o >= 0; o--) {
                        if (this._getTextWidth(n.family + "," + i[o], n.weight, n.style) != a[o]) {
                            var h = new createjs.Event("fileload");
                            (n.type = "font-family"), (h.item = n), this.dispatchEvent(h), e.splice(r, 1);
                            break;
                        }
                    }
                if (s !== e.length) {
                    h = new createjs.ProgressEvent(this._count - e.length, this._count);
                    this.dispatchEvent(h);
                }
                0 === s && (this._stopWatching(), this._sendComplete());
            }),
            (e._calculateReferenceSizes = function (e) {
                for (var i = t._referenceFonts, s = (e.refs = []), r = 0; r < i.length; r++) s[r] = this._getTextWidth(i[r], e.weight, e.style);
            }),
            (e._defFromSrc = function (e) {
                var i,
                    s = /[- ._]+/g,
                    r = e,
                    n = null;
                -1 !== (i = r.search(/[?#]/)) && (r = r.substr(0, i)), -1 !== (i = r.lastIndexOf(".")) && ((n = r.substr(i + 1)), (r = r.substr(0, i))), -1 !== (i = r.lastIndexOf("/")) && (r = r.substr(i + 1));
                var a = r,
                    o = a.match(t.WEIGHT_REGEX);
                o && ((o = o[0]), (a = a.replace(o, "")), (o = o.replace(s, "").toLowerCase()));
                var h = r.match(t.STYLE_REGEX);
                h && ((a = a.replace(h[0], "")), (h = "italic")), (a = a.replace(s, ""));
                var c = "local('" + r.replace(s, " ") + "'), url('" + e + "')",
                    u = t.FONT_FORMAT[n];
                return u && (c += " format('" + u + "')"), this._defFromObj({ family: a, weight: t.FONT_WEIGHT[o] || o, style: h, src: c });
            }),
            (e._defFromObj = function (t) {
                var e = { family: t.family, src: t.src, style: t.style || "normal", weight: t.weight || "normal" };
                return (e.id = e.family + ";" + e.style + ";" + e.weight), e;
            }),
            (e._cssFromDef = function (t) {
                return "@font-face {\n\tfont-family: '" + t.family + "';\n\tfont-style: " + t.style + ";\n\tfont-weight: " + t.weight + ";\n\tsrc: " + t.src + ";\n}";
            }),
            (e._getTextWidth = function (e, i, s) {
                var r = t._ctx;
                return (r.font = s + " " + i + " 72px " + e), r.measureText(t.sampleText).width;
            }),
            (e._getCSSValue = function (t, e) {
                var i = new RegExp(e + ":s*([^;}]+?)s*[;}]").exec(t);
                return i && i[1] ? i[1] : null;
            }),
            (createjs.FontLoader = createjs.promote(t, "AbstractLoader"));
    })(),
    (this.createjs = this.createjs || {}),
    (function () {
        "use strict";
        function t(t, e) {
            this.AbstractLoader_constructor(t, e, createjs.Types.IMAGE),
                (this.resultFormatter = this._formatResult),
                (this._tagSrcAttribute = "src"),
                createjs.DomUtils.isImageTag(t) ? (this._tag = t) : createjs.DomUtils.isImageTag(t.src) ? (this._tag = t.src) : createjs.DomUtils.isImageTag(t.tag) && (this._tag = t.tag),
                null != this._tag ? (this._preferXHR = !1) : (this._tag = createjs.Elements.img()),
                this.on("initialize", this._updateXHR, this);
        }
        var e = createjs.extend(t, createjs.AbstractLoader);
        (t.canLoadItem = function (t) {
            return t.type == createjs.Types.IMAGE;
        }),
            (e.load = function () {
                if ("" != this._tag.src && this._tag.complete) this._sendComplete();
                else {
                    var t = this._item.crossOrigin;
                    1 == t && (t = "Anonymous"), null == t || createjs.URLUtils.isLocal(this._item) || (this._tag.crossOrigin = t), this.AbstractLoader_load();
                }
            }),
            (e._updateXHR = function (t) {
                (t.loader.mimeType = "text/plain; charset=x-user-defined-binary"), t.loader.setResponseType && t.loader.setResponseType("blob");
            }),
            (e._formatResult = function (t) {
                return this._formatImage;
            }),
            (e._formatImage = function (t, e) {
                var i = this._tag,
                    s = window.URL || window.webkitURL;
                if (this._preferXHR)
                    if (s) {
                        var r = s.createObjectURL(this.getResult(!0));
                        (i.src = r), i.addEventListener("load", this._cleanUpURL, !1), i.addEventListener("error", this._cleanUpURL, !1);
                    } else i.src = this._item.src;
                i.complete
                    ? t(i)
                    : ((i.onload = createjs.proxy(function () {
                          t(this._tag), (i.onload = i.onerror = null);
                      }, this)),
                      (i.onerror = createjs.proxy(function (t) {
                          e(new createjs.ErrorEvent("IMAGE_FORMAT", null, t)), (i.onload = i.onerror = null);
                      }, this)));
            }),
            (e._cleanUpURL = function (t) {
                (window.URL || window.webkitURL).revokeObjectURL(t.target.src);
            }),
            (createjs.ImageLoader = createjs.promote(t, "AbstractLoader"));
    })(),
    (this.createjs = this.createjs || {}),
    (function () {
        "use strict";
        function t(t, e) {
            this.AbstractLoader_constructor(t, e, createjs.Types.JAVASCRIPT), (this.resultFormatter = this._formatResult), (this._tagSrcAttribute = "src"), this.setTag(createjs.Elements.script());
        }
        var e = createjs.extend(t, createjs.AbstractLoader);
        (t.canLoadItem = function (t) {
            return t.type == createjs.Types.JAVASCRIPT;
        }),
            (e._formatResult = function (t) {
                var e = t.getTag();
                return this._preferXHR && (e.text = t.getResult(!0)), e;
            }),
            (createjs.JavaScriptLoader = createjs.promote(t, "AbstractLoader"));
    })(),
    (this.createjs = this.createjs || {}),
    (function () {
        "use strict";
        function t(t) {
            this.AbstractLoader_constructor(t, !0, createjs.Types.JSON), (this.resultFormatter = this._formatResult);
        }
        var e = createjs.extend(t, createjs.AbstractLoader);
        (t.canLoadItem = function (t) {
            return t.type == createjs.Types.JSON;
        }),
            (e._formatResult = function (t) {
                var e = null;
                try {
                    e = createjs.DataUtils.parseJSON(t.getResult(!0));
                } catch (t) {
                    var i = new createjs.ErrorEvent("JSON_FORMAT", null, t);
                    return this._sendError(i), t;
                }
                return e;
            }),
            (createjs.JSONLoader = createjs.promote(t, "AbstractLoader"));
    })(),
    (this.createjs = this.createjs || {}),
    (function () {
        "use strict";
        function t(t) {
            this.AbstractLoader_constructor(t, !1, createjs.Types.JSONP), this.setTag(createjs.Elements.script()), (this.getTag().type = "text/javascript");
        }
        var e = createjs.extend(t, createjs.AbstractLoader);
        (t.canLoadItem = function (t) {
            return t.type == createjs.Types.JSONP;
        }),
            (e.cancel = function () {
                this.AbstractLoader_cancel(), this._dispose();
            }),
            (e.load = function () {
                if (null == this._item.callback) throw new Error("callback is required for loading JSONP requests.");
                if (null != window[this._item.callback]) throw new Error("JSONP callback '" + this._item.callback + "' already exists on window. You need to specify a different callback or re-name the current one.");
                (window[this._item.callback] = createjs.proxy(this._handleLoad, this)),
                    createjs.DomUtils.appendToBody(this._tag),
                    (this._loadTimeout = setTimeout(createjs.proxy(this._handleTimeout, this), this._item.loadTimeout)),
                    (this._tag.src = this._item.src);
            }),
            (e._handleLoad = function (t) {
                (this._result = this._rawResult = t), this._sendComplete(), this._dispose();
            }),
            (e._handleTimeout = function () {
                this._dispose(), this.dispatchEvent(new createjs.ErrorEvent("timeout"));
            }),
            (e._dispose = function () {
                createjs.DomUtils.removeChild(this._tag), delete window[this._item.callback], clearTimeout(this._loadTimeout);
            }),
            (createjs.JSONPLoader = createjs.promote(t, "AbstractLoader"));
    })(),
    (this.createjs = this.createjs || {}),
    (function () {
        "use strict";
        function t(t, e) {
            this.AbstractLoader_constructor(t, e, createjs.Types.MANIFEST), (this.plugins = null), (this._manifestQueue = null);
        }
        var e = createjs.extend(t, createjs.AbstractLoader),
            i = t;
        (i.MANIFEST_PROGRESS = 0.25),
            (i.canLoadItem = function (t) {
                return t.type == createjs.Types.MANIFEST;
            }),
            (e.load = function () {
                this.AbstractLoader_load();
            }),
            (e._createRequest = function () {
                var t = this._item.callback;
                this._request = null != t ? new createjs.JSONPLoader(this._item) : new createjs.JSONLoader(this._item);
            }),
            (e.handleEvent = function (t) {
                switch (t.type) {
                    case "complete":
                        return (this._rawResult = t.target.getResult(!0)), (this._result = t.target.getResult()), this._sendProgress(i.MANIFEST_PROGRESS), void this._loadManifest(this._result);
                    case "progress":
                        return (t.loaded *= i.MANIFEST_PROGRESS), (this.progress = t.loaded / t.total), (isNaN(this.progress) || this.progress == 1 / 0) && (this.progress = 0), void this._sendProgress(t);
                }
                this.AbstractLoader_handleEvent(t);
            }),
            (e.destroy = function () {
                this.AbstractLoader_destroy(), this._manifestQueue.close();
            }),
            (e._loadManifest = function (t) {
                if (t && t.manifest) {
                    var e = (this._manifestQueue = new createjs.LoadQueue(this._preferXHR));
                    e.on("fileload", this._handleManifestFileLoad, this), e.on("progress", this._handleManifestProgress, this), e.on("complete", this._handleManifestComplete, this, !0), e.on("error", this._handleManifestError, this, !0);
                    for (var i = 0, s = this.plugins.length; s > i; i++) e.installPlugin(this.plugins[i]);
                    e.loadManifest(t);
                } else this._sendComplete();
            }),
            (e._handleManifestFileLoad = function (t) {
                (t.target = null), this.dispatchEvent(t);
            }),
            (e._handleManifestComplete = function (t) {
                (this._loadedItems = this._manifestQueue.getItems(!0)), this._sendComplete();
            }),
            (e._handleManifestProgress = function (t) {
                (this.progress = t.progress * (1 - i.MANIFEST_PROGRESS) + i.MANIFEST_PROGRESS), this._sendProgress(this.progress);
            }),
            (e._handleManifestError = function (t) {
                var e = new createjs.Event("fileerror");
                (e.item = t.data), this.dispatchEvent(e);
            }),
            (createjs.ManifestLoader = createjs.promote(t, "AbstractLoader"));
    })(),
    (this.createjs = this.createjs || {}),
    (function () {
        "use strict";
        function t(t, e) {
            this.AbstractMediaLoader_constructor(t, e, createjs.Types.SOUND),
                createjs.DomUtils.isAudioTag(t) || createjs.DomUtils.isAudioTag(t.src) ? (this._tag = t) : createjs.DomUtils.isAudioTag(t.tag) && (this._tag = createjs.DomUtils.isAudioTag(t) ? t : t.src),
                null != this._tag && (this._preferXHR = !1);
        }
        var e = createjs.extend(t, createjs.AbstractMediaLoader);
        (t.canLoadItem = function (t) {
            return t.type == createjs.Types.SOUND;
        }),
            (e._createTag = function (t) {
                var e = createjs.Elements.audio();
                return (e.autoplay = !1), (e.preload = "none"), (e.src = t), e;
            }),
            (createjs.SoundLoader = createjs.promote(t, "AbstractMediaLoader"));
    })(),
    (this.createjs = this.createjs || {}),
    (function () {
        "use strict";
        function t(t, e) {
            this.AbstractMediaLoader_constructor(t, e, createjs.Types.VIDEO),
                createjs.DomUtils.isVideoTag(t) || createjs.DomUtils.isVideoTag(t.src) ? (this.setTag(createjs.DomUtils.isVideoTag(t) ? t : t.src), (this._preferXHR = !1)) : this.setTag(this._createTag());
        }
        var e = t;
        (createjs.extend(t, createjs.AbstractMediaLoader)._createTag = function () {
            return createjs.Elements.video();
        }),
            (e.canLoadItem = function (t) {
                return t.type == createjs.Types.VIDEO;
            }),
            (createjs.VideoLoader = createjs.promote(t, "AbstractMediaLoader"));
    })(),
    (this.createjs = this.createjs || {}),
    (function () {
        "use strict";
        function t(t, e) {
            this.AbstractLoader_constructor(t, e, createjs.Types.SPRITESHEET), (this._manifestQueue = null);
        }
        var e = createjs.extend(t, createjs.AbstractLoader),
            i = t;
        (i.SPRITESHEET_PROGRESS = 0.25),
            (i.canLoadItem = function (t) {
                return t.type == createjs.Types.SPRITESHEET;
            }),
            (e.destroy = function () {
                this.AbstractLoader_destroy(), this._manifestQueue.close();
            }),
            (e._createRequest = function () {
                var t = this._item.callback;
                this._request = null != t ? new createjs.JSONPLoader(this._item) : new createjs.JSONLoader(this._item);
            }),
            (e.handleEvent = function (t) {
                switch (t.type) {
                    case "complete":
                        return (this._rawResult = t.target.getResult(!0)), (this._result = t.target.getResult()), this._sendProgress(i.SPRITESHEET_PROGRESS), void this._loadManifest(this._result);
                    case "progress":
                        return (t.loaded *= i.SPRITESHEET_PROGRESS), (this.progress = t.loaded / t.total), (isNaN(this.progress) || this.progress == 1 / 0) && (this.progress = 0), void this._sendProgress(t);
                }
                this.AbstractLoader_handleEvent(t);
            }),
            (e._loadManifest = function (t) {
                if (t && t.images) {
                    var e = (this._manifestQueue = new createjs.LoadQueue(this._preferXHR, this._item.path, this._item.crossOrigin));
                    e.on("complete", this._handleManifestComplete, this, !0),
                        e.on("fileload", this._handleManifestFileLoad, this),
                        e.on("progress", this._handleManifestProgress, this),
                        e.on("error", this._handleManifestError, this, !0),
                        e.loadManifest(t.images);
                }
            }),
            (e._handleManifestFileLoad = function (t) {
                var e = t.result;
                if (null != e) {
                    var i = this.getResult().images,
                        s = i.indexOf(t.item.src);
                    i[s] = e;
                }
            }),
            (e._handleManifestComplete = function (t) {
                (this._result = new createjs.SpriteSheet(this._result)), (this._loadedItems = this._manifestQueue.getItems(!0)), this._sendComplete();
            }),
            (e._handleManifestProgress = function (t) {
                (this.progress = t.progress * (1 - i.SPRITESHEET_PROGRESS) + i.SPRITESHEET_PROGRESS), this._sendProgress(this.progress);
            }),
            (e._handleManifestError = function (t) {
                var e = new createjs.Event("fileerror");
                (e.item = t.data), this.dispatchEvent(e);
            }),
            (createjs.SpriteSheetLoader = createjs.promote(t, "AbstractLoader"));
    })(),
    (this.createjs = this.createjs || {}),
    (function () {
        "use strict";
        function t(t, e) {
            this.AbstractLoader_constructor(t, e, createjs.Types.SVG),
                (this.resultFormatter = this._formatResult),
                (this._tagSrcAttribute = "data"),
                e ? this.setTag(createjs.Elements.svg()) : (this.setTag(createjs.Elements.object()), (this.getTag().type = "image/svg+xml"));
        }
        var e = createjs.extend(t, createjs.AbstractLoader);
        (t.canLoadItem = function (t) {
            return t.type == createjs.Types.SVG;
        }),
            (e._formatResult = function (t) {
                var e = createjs.DataUtils.parseXML(t.getResult(!0)),
                    i = t.getTag();
                if ((!this._preferXHR && document.body.contains(i) && document.body.removeChild(i), null != e.documentElement)) {
                    var s = e.documentElement;
                    return document.importNode && (s = document.importNode(s, !0)), i.appendChild(s), i;
                }
                return e;
            }),
            (createjs.SVGLoader = createjs.promote(t, "AbstractLoader"));
    })(),
    (this.createjs = this.createjs || {}),
    (function () {
        "use strict";
        function t(t) {
            this.AbstractLoader_constructor(t, !0, createjs.Types.XML), (this.resultFormatter = this._formatResult);
        }
        var e = createjs.extend(t, createjs.AbstractLoader);
        (t.canLoadItem = function (t) {
            return t.type == createjs.Types.XML;
        }),
            (e._formatResult = function (t) {
                return createjs.DataUtils.parseXML(t.getResult(!0));
            }),
            (createjs.XMLLoader = createjs.promote(t, "AbstractLoader"));
    })(),
    (this.createjs = this.createjs || {}),
    (function () {
        var t = (createjs.SoundJS = createjs.SoundJS || {});
        (t.version = "1.0.0"), (t.buildDate = "Thu, 12 Oct 2017 16:34:05 GMT");
    })(),
    (this.createjs = this.createjs || {}),
    (function () {
        "use strict";
        function t() {
            throw "BrowserDetect cannot be instantiated";
        }
        var e = (t.agent = window.navigator.userAgent);
        (t.isWindowPhone = e.indexOf("IEMobile") > -1 || e.indexOf("Windows Phone") > -1),
            (t.isFirefox = e.indexOf("Firefox") > -1),
            (t.isOpera = null != window.opera),
            (t.isChrome = e.indexOf("Chrome") > -1),
            (t.isIOS = (e.indexOf("iPod") > -1 || e.indexOf("iPhone") > -1 || e.indexOf("iPad") > -1) && !t.isWindowPhone),
            (t.isAndroid = e.indexOf("Android") > -1 && !t.isWindowPhone),
            (t.isBlackberry = e.indexOf("Blackberry") > -1),
            (createjs.BrowserDetect = t);
    })(),
    (this.createjs = this.createjs || {}),
    (function () {
        "use strict";
        var t = function () {
                (this.interrupt = null), (this.delay = null), (this.offset = null), (this.loop = null), (this.volume = null), (this.pan = null), (this.startTime = null), (this.duration = null);
            },
            e = (t.prototype = {}),
            i = t;
        (i.create = function (t) {
            if ("string" == typeof t)
                return console && (console.warn || console.log)("Deprecated behaviour. Sound.play takes a configuration object instead of individual arguments. See docs for info."), new createjs.PlayPropsConfig().set({ interrupt: t });
            if (null == t || t instanceof i || t instanceof Object) return new createjs.PlayPropsConfig().set(t);
            if (null == t) throw new Error("PlayProps configuration not recognized.");
        }),
            (e.set = function (t) {
                if (null != t) for (var e in t) this[e] = t[e];
                return this;
            }),
            (e.toString = function () {
                return "[PlayPropsConfig]";
            }),
            (createjs.PlayPropsConfig = i);
    })(),
    (this.createjs = this.createjs || {}),
    (function () {
        "use strict";
        function t() {
            throw "Sound cannot be instantiated";
        }
        function e(t, e) {
            this.init(t, e);
        }
        var i = t;
        (i.INTERRUPT_ANY = "any"),
            (i.INTERRUPT_EARLY = "early"),
            (i.INTERRUPT_LATE = "late"),
            (i.INTERRUPT_NONE = "none"),
            (i.PLAY_INITED = "playInited"),
            (i.PLAY_SUCCEEDED = "playSucceeded"),
            (i.PLAY_INTERRUPTED = "playInterrupted"),
            (i.PLAY_FINISHED = "playFinished"),
            (i.PLAY_FAILED = "playFailed"),
            (i.SUPPORTED_EXTENSIONS = ["mp3", "ogg", "opus", "mpeg", "wav", "m4a", "mp4", "aiff", "wma", "mid"]),
            (i.EXTENSION_MAP = { m4a: "mp4" }),
            (i.FILE_PATTERN = /^(?:(\w+:)\/{2}(\w+(?:\.\w+)*\/?))?([\/.]*?(?:[^?]+)?\/)?((?:[^\/?]+)\.(\w+))(?:\?(\S+)?)?$/),
            (i.defaultInterruptBehavior = i.INTERRUPT_NONE),
            (i.alternateExtensions = []),
            (i.activePlugin = null),
            (i._masterVolume = 1),
            (i._getMasterVolume = function () {
                return this._masterVolume;
            }),
            (i.getVolume = createjs.deprecate(i._getMasterVolume, "Sound.getVolume")),
            (i._setMasterVolume = function (t) {
                if (null != Number(t) && ((t = Math.max(0, Math.min(1, t))), (i._masterVolume = t), !this.activePlugin || !this.activePlugin.setVolume || !this.activePlugin.setVolume(t)))
                    for (var e = this._instances, s = 0, r = e.length; r > s; s++) e[s].setMasterVolume(t);
            }),
            (i.setVolume = createjs.deprecate(i._setMasterVolume, "Sound.setVolume")),
            (i._masterMute = !1),
            (i._getMute = function () {
                return this._masterMute;
            }),
            (i.getMute = createjs.deprecate(i._getMute, "Sound.getMute")),
            (i._setMute = function (t) {
                if (null != t && ((this._masterMute = t), !this.activePlugin || !this.activePlugin.setMute || !this.activePlugin.setMute(t))) for (var e = this._instances, i = 0, s = e.length; s > i; i++) e[i].setMasterMute(t);
            }),
            (i.setMute = createjs.deprecate(i._setMute, "Sound.setMute")),
            (i._getCapabilities = function () {
                return null == i.activePlugin ? null : i.activePlugin._capabilities;
            }),
            (i.getCapabilities = createjs.deprecate(i._getCapabilities, "Sound.getCapabilities")),
            Object.defineProperties(i, { volume: { get: i._getMasterVolume, set: i._setMasterVolume }, muted: { get: i._getMute, set: i._setMute }, capabilities: { get: i._getCapabilities } }),
            (i._pluginsRegistered = !1),
            (i._lastID = 0),
            (i._instances = []),
            (i._idHash = {}),
            (i._preloadHash = {}),
            (i._defaultPlayPropsHash = {}),
            (i.addEventListener = null),
            (i.removeEventListener = null),
            (i.removeAllEventListeners = null),
            (i.dispatchEvent = null),
            (i.hasEventListener = null),
            (i._listeners = null),
            createjs.EventDispatcher.initialize(i),
            (i.getPreloadHandlers = function () {
                return { callback: createjs.proxy(i.initLoad, i), types: ["sound"], extensions: i.SUPPORTED_EXTENSIONS };
            }),
            (i._handleLoadComplete = function (t) {
                var e = t.target.getItem().src;
                if (i._preloadHash[e])
                    for (var s = 0, r = i._preloadHash[e].length; r > s; s++) {
                        var n = i._preloadHash[e][s];
                        if (((i._preloadHash[e][s] = !0), i.hasEventListener("fileload"))) ((t = new createjs.Event("fileload")).src = n.src), (t.id = n.id), (t.data = n.data), (t.sprite = n.sprite), i.dispatchEvent(t);
                    }
            }),
            (i._handleLoadError = function (t) {
                var e = t.target.getItem().src;
                if (i._preloadHash[e])
                    for (var s = 0, r = i._preloadHash[e].length; r > s; s++) {
                        var n = i._preloadHash[e][s];
                        if (((i._preloadHash[e][s] = !1), i.hasEventListener("fileerror"))) ((t = new createjs.Event("fileerror")).src = n.src), (t.id = n.id), (t.data = n.data), (t.sprite = n.sprite), i.dispatchEvent(t);
                    }
            }),
            (i._registerPlugin = function (t) {
                return !!t.isSupported() && ((i.activePlugin = new t()), !0);
            }),
            (i.registerPlugins = function (t) {
                i._pluginsRegistered = !0;
                for (var e = 0, s = t.length; s > e; e++) if (i._registerPlugin(t[e])) return !0;
                return !1;
            }),
            (i.initializeDefaultPlugins = function () {
                return null != i.activePlugin || (!i._pluginsRegistered && !!i.registerPlugins([createjs.WebAudioPlugin, createjs.HTMLAudioPlugin]));
            }),
            (i.isReady = function () {
                return null != i.activePlugin;
            }),
            (i.initLoad = function (t) {
                return "video" == t.type || i._registerSound(t);
            }),
            (i._registerSound = function (t) {
                if (!i.initializeDefaultPlugins()) return !1;
                var s;
                if ((t.src instanceof Object ? ((s = i._parseSrc(t.src)).src = t.path + s.src) : (s = i._parsePath(t.src)), null == s)) return !1;
                (t.src = s.src), (t.type = "sound");
                var r = t.data,
                    n = null;
                if (null != r && (isNaN(r.channels) ? isNaN(r) || (n = parseInt(r)) : (n = parseInt(r.channels)), r.audioSprite))
                    for (var a, o = r.audioSprite.length; o--; )
                        (a = r.audioSprite[o]),
                            (i._idHash[a.id] = { src: t.src, startTime: parseInt(a.startTime), duration: parseInt(a.duration) }),
                            a.defaultPlayProps && (i._defaultPlayPropsHash[a.id] = createjs.PlayPropsConfig.create(a.defaultPlayProps));
                null != t.id && (i._idHash[t.id] = { src: t.src });
                var h = i.activePlugin.register(t);
                return (
                    e.create(t.src, n),
                    null != r && isNaN(r) ? (t.data.channels = n || e.maxPerChannel()) : (t.data = n || e.maxPerChannel()),
                    h.type && (t.type = h.type),
                    t.defaultPlayProps && (i._defaultPlayPropsHash[t.src] = createjs.PlayPropsConfig.create(t.defaultPlayProps)),
                    h
                );
            }),
            (i.registerSound = function (t, e, s, r, n) {
                var a = { src: t, id: e, data: s, defaultPlayProps: n };
                t instanceof Object && t.src && ((r = e), (a = t)), ((a = createjs.LoadItem.create(a)).path = r), null == r || a.src instanceof Object || (a.src = r + a.src);
                var o = i._registerSound(a);
                if (!o) return !1;
                if ((i._preloadHash[a.src] || (i._preloadHash[a.src] = []), i._preloadHash[a.src].push(a), 1 == i._preloadHash[a.src].length))
                    o.on("complete", this._handleLoadComplete, this), o.on("error", this._handleLoadError, this), i.activePlugin.preload(o);
                else if (1 == i._preloadHash[a.src][0]) return !0;
                return a;
            }),
            (i.registerSounds = function (t, e) {
                var i = [];
                t.path && (e ? (e += t.path) : (e = t.path), (t = t.manifest));
                for (var s = 0, r = t.length; r > s; s++) i[s] = createjs.Sound.registerSound(t[s].src, t[s].id, t[s].data, e, t[s].defaultPlayProps);
                return i;
            }),
            (i.removeSound = function (t, s) {
                if (null == i.activePlugin) return !1;
                var r;
                if ((t instanceof Object && t.src && (t = t.src), t instanceof Object ? (r = i._parseSrc(t)) : ((t = i._getSrcById(t).src), (r = i._parsePath(t))), null == r)) return !1;
                for (var n in ((t = r.src), null != s && (t = s + t), i._idHash)) i._idHash[n].src == t && delete i._idHash[n];
                return e.removeSrc(t), delete i._preloadHash[t], i.activePlugin.removeSound(t), !0;
            }),
            (i.removeSounds = function (t, e) {
                var i = [];
                t.path && (e ? (e += t.path) : (e = t.path), (t = t.manifest));
                for (var s = 0, r = t.length; r > s; s++) i[s] = createjs.Sound.removeSound(t[s].src, e);
                return i;
            }),
            (i.removeAllSounds = function () {
                (i._idHash = {}), (i._preloadHash = {}), e.removeAll(), i.activePlugin && i.activePlugin.removeAllSounds();
            }),
            (i.loadComplete = function (t) {
                if (!i.isReady()) return !1;
                var e = i._parsePath(t);
                return (t = e ? i._getSrcById(e.src).src : i._getSrcById(t).src), null != i._preloadHash[t] && 1 == i._preloadHash[t][0];
            }),
            (i._parsePath = function (t) {
                "string" != typeof t && (t = t.toString());
                var e = t.match(i.FILE_PATTERN);
                if (null == e) return !1;
                for (var s = e[4], r = e[5], n = i.capabilities, a = 0; !n[r]; ) if (((r = i.alternateExtensions[a++]), a > i.alternateExtensions.length)) return null;
                return { name: s, src: (t = t.replace("." + e[5], "." + r)), extension: r };
            }),
            (i._parseSrc = function (t) {
                var e = { name: void 0, src: void 0, extension: void 0 },
                    s = i.capabilities;
                for (var r in t)
                    if (t.hasOwnProperty(r) && s[r]) {
                        (e.src = t[r]), (e.extension = r);
                        break;
                    }
                if (!e.src) return !1;
                var n = e.src.lastIndexOf("/");
                return (e.name = -1 != n ? e.src.slice(n + 1) : e.src), e;
            }),
            (i.play = function (t, e) {
                var s = createjs.PlayPropsConfig.create(e),
                    r = i.createInstance(t, s.startTime, s.duration);
                return i._playInstance(r, s) || r._playFailed(), r;
            }),
            (i.createInstance = function (t, s, r) {
                if (!i.initializeDefaultPlugins()) return new createjs.DefaultSoundInstance(t, s, r);
                var n = i._defaultPlayPropsHash[t];
                t = i._getSrcById(t);
                var a = i._parsePath(t.src),
                    o = null;
                return (
                    null != a && null != a.src
                        ? (e.create(a.src), null == s && (s = t.startTime), (o = i.activePlugin.create(a.src, s, r || t.duration)), (n = n || i._defaultPlayPropsHash[a.src]) && o.applyPlayProps(n))
                        : (o = new createjs.DefaultSoundInstance(t, s, r)),
                    (o.uniqueId = i._lastID++),
                    o
                );
            }),
            (i.stop = function () {
                for (var t = this._instances, e = t.length; e--; ) t[e].stop();
            }),
            (i.setDefaultPlayProps = function (t, e) {
                (t = i._getSrcById(t)), (i._defaultPlayPropsHash[i._parsePath(t.src).src] = createjs.PlayPropsConfig.create(e));
            }),
            (i.getDefaultPlayProps = function (t) {
                return (t = i._getSrcById(t)), i._defaultPlayPropsHash[i._parsePath(t.src).src];
            }),
            (i._playInstance = function (t, e) {
                var s = i._defaultPlayPropsHash[t.src] || {};
                if (
                    (null == e.interrupt && (e.interrupt = s.interrupt || i.defaultInterruptBehavior),
                    null == e.delay && (e.delay = s.delay || 0),
                    null == e.offset && (e.offset = t.position),
                    null == e.loop && (e.loop = t.loop),
                    null == e.volume && (e.volume = t.volume),
                    null == e.pan && (e.pan = t.pan),
                    0 == e.delay)
                ) {
                    if (!i._beginPlaying(t, e)) return !1;
                } else {
                    var r = setTimeout(function () {
                        i._beginPlaying(t, e);
                    }, e.delay);
                    t.delayTimeoutId = r;
                }
                return this._instances.push(t), !0;
            }),
            (i._beginPlaying = function (t, i) {
                if (!e.add(t, i.interrupt)) return !1;
                if (!t._beginPlaying(i)) {
                    var s = createjs.indexOf(this._instances, t);
                    return s > -1 && this._instances.splice(s, 1), !1;
                }
                return !0;
            }),
            (i._getSrcById = function (t) {
                return i._idHash[t] || { src: t };
            }),
            (i._playFinished = function (t) {
                e.remove(t);
                var i = createjs.indexOf(this._instances, t);
                i > -1 && this._instances.splice(i, 1);
            }),
            (createjs.Sound = t),
            (e.channels = {}),
            (e.create = function (t, i) {
                return null == e.get(t) && ((e.channels[t] = new e(t, i)), !0);
            }),
            (e.removeSrc = function (t) {
                var i = e.get(t);
                return null != i && (i._removeAll(), delete e.channels[t], !0);
            }),
            (e.removeAll = function () {
                for (var t in e.channels) e.channels[t]._removeAll();
                e.channels = {};
            }),
            (e.add = function (t, i) {
                var s = e.get(t.src);
                return null != s && s._add(t, i);
            }),
            (e.remove = function (t) {
                var i = e.get(t.src);
                return null != i && (i._remove(t), !0);
            }),
            (e.maxPerChannel = function () {
                return s.maxDefault;
            }),
            (e.get = function (t) {
                return e.channels[t];
            });
        var s = e.prototype;
        (s.constructor = e),
            (s.src = null),
            (s.max = null),
            (s.maxDefault = 100),
            (s.length = 0),
            (s.init = function (t, e) {
                (this.src = t), (this.max = e || this.maxDefault), -1 == this.max && (this.max = this.maxDefault), (this._instances = []);
            }),
            (s._get = function (t) {
                return this._instances[t];
            }),
            (s._add = function (t, e) {
                return !!this._getSlot(e, t) && (this._instances.push(t), this.length++, !0);
            }),
            (s._remove = function (t) {
                var e = createjs.indexOf(this._instances, t);
                return -1 != e && (this._instances.splice(e, 1), this.length--, !0);
            }),
            (s._removeAll = function () {
                for (var t = this.length - 1; t >= 0; t--) this._instances[t].stop();
            }),
            (s._getSlot = function (e, i) {
                var s, r;
                if (e != t.INTERRUPT_NONE && null == (r = this._get(0))) return !0;
                for (var n = 0, a = this.max; a > n; n++) {
                    if (null == (s = this._get(n))) return !0;
                    if (s.playState == t.PLAY_FINISHED || s.playState == t.PLAY_INTERRUPTED || s.playState == t.PLAY_FAILED) {
                        r = s;
                        break;
                    }
                    e != t.INTERRUPT_NONE && ((e == t.INTERRUPT_EARLY && s.position < r.position) || (e == t.INTERRUPT_LATE && s.position > r.position)) && (r = s);
                }
                return null != r && (r._interrupt(), this._remove(r), !0);
            }),
            (s.toString = function () {
                return "[Sound SoundChannel]";
            });
    })(),
    (this.createjs = this.createjs || {}),
    (function () {
        "use strict";
        var t = function (t, e, i, s) {
                this.EventDispatcher_constructor(),
                    (this.src = t),
                    (this.uniqueId = -1),
                    (this.playState = null),
                    (this.delayTimeoutId = null),
                    (this._volume = 1),
                    Object.defineProperty(this, "volume", { get: this._getVolume, set: this._setVolume }),
                    (this.getVolume = createjs.deprecate(this._getVolume, "AbstractSoundInstance.getVolume")),
                    (this.setVolume = createjs.deprecate(this._setVolume, "AbstractSoundInstance.setVolume")),
                    (this._pan = 0),
                    Object.defineProperty(this, "pan", { get: this._getPan, set: this._setPan }),
                    (this.getPan = createjs.deprecate(this._getPan, "AbstractSoundInstance.getPan")),
                    (this.setPan = createjs.deprecate(this._setPan, "AbstractSoundInstance.setPan")),
                    (this._startTime = Math.max(0, e || 0)),
                    Object.defineProperty(this, "startTime", { get: this._getStartTime, set: this._setStartTime }),
                    (this.getStartTime = createjs.deprecate(this._getStartTime, "AbstractSoundInstance.getStartTime")),
                    (this.setStartTime = createjs.deprecate(this._setStartTime, "AbstractSoundInstance.setStartTime")),
                    (this._duration = Math.max(0, i || 0)),
                    Object.defineProperty(this, "duration", { get: this._getDuration, set: this._setDuration }),
                    (this.getDuration = createjs.deprecate(this._getDuration, "AbstractSoundInstance.getDuration")),
                    (this.setDuration = createjs.deprecate(this._setDuration, "AbstractSoundInstance.setDuration")),
                    (this._playbackResource = null),
                    Object.defineProperty(this, "playbackResource", { get: this._getPlaybackResource, set: this._setPlaybackResource }),
                    !1 !== s && !0 !== s && this._setPlaybackResource(s),
                    (this.getPlaybackResource = createjs.deprecate(this._getPlaybackResource, "AbstractSoundInstance.getPlaybackResource")),
                    (this.setPlaybackResource = createjs.deprecate(this._setPlaybackResource, "AbstractSoundInstance.setPlaybackResource")),
                    (this._position = 0),
                    Object.defineProperty(this, "position", { get: this._getPosition, set: this._setPosition }),
                    (this.getPosition = createjs.deprecate(this._getPosition, "AbstractSoundInstance.getPosition")),
                    (this.setPosition = createjs.deprecate(this._setPosition, "AbstractSoundInstance.setPosition")),
                    (this._loop = 0),
                    Object.defineProperty(this, "loop", { get: this._getLoop, set: this._setLoop }),
                    (this.getLoop = createjs.deprecate(this._getLoop, "AbstractSoundInstance.getLoop")),
                    (this.setLoop = createjs.deprecate(this._setLoop, "AbstractSoundInstance.setLoop")),
                    (this._muted = !1),
                    Object.defineProperty(this, "muted", { get: this._getMuted, set: this._setMuted }),
                    (this.getMuted = createjs.deprecate(this._getMuted, "AbstractSoundInstance.getMuted")),
                    (this.setMuted = createjs.deprecate(this._setMuted, "AbstractSoundInstance.setMuted")),
                    (this._paused = !1),
                    Object.defineProperty(this, "paused", { get: this._getPaused, set: this._setPaused }),
                    (this.getPaused = createjs.deprecate(this._getPaused, "AbstractSoundInstance.getPaused")),
                    (this.setPaused = createjs.deprecate(this._setPaused, "AbstractSoundInstance.setPaused"));
            },
            e = createjs.extend(t, createjs.EventDispatcher);
        (e.play = function (t) {
            var e = createjs.PlayPropsConfig.create(t);
            return this.playState == createjs.Sound.PLAY_SUCCEEDED ? (this.applyPlayProps(e), void (this._paused && this._setPaused(!1))) : (this._cleanUp(), createjs.Sound._playInstance(this, e), this);
        }),
            (e.stop = function () {
                return (this._position = 0), (this._paused = !1), this._handleStop(), this._cleanUp(), (this.playState = createjs.Sound.PLAY_FINISHED), this;
            }),
            (e.destroy = function () {
                this._cleanUp(), (this.src = null), (this.playbackResource = null), this.removeAllEventListeners();
            }),
            (e.applyPlayProps = function (t) {
                return (
                    null != t.offset && this._setPosition(t.offset),
                    null != t.loop && this._setLoop(t.loop),
                    null != t.volume && this._setVolume(t.volume),
                    null != t.pan && this._setPan(t.pan),
                    null != t.startTime && (this._setStartTime(t.startTime), this._setDuration(t.duration)),
                    this
                );
            }),
            (e.toString = function () {
                return "[AbstractSoundInstance]";
            }),
            (e._getPaused = function () {
                return this._paused;
            }),
            (e._setPaused = function (t) {
                return (!0 !== t && !1 !== t) || this._paused == t || (1 == t && this.playState != createjs.Sound.PLAY_SUCCEEDED) ? void 0 : ((this._paused = t), t ? this._pause() : this._resume(), clearTimeout(this.delayTimeoutId), this);
            }),
            (e._setVolume = function (t) {
                return t == this._volume || ((this._volume = Math.max(0, Math.min(1, t))), this._muted || this._updateVolume()), this;
            }),
            (e._getVolume = function () {
                return this._volume;
            }),
            (e._setMuted = function (t) {
                return !0 === t || !1 === t ? ((this._muted = t), this._updateVolume(), this) : void 0;
            }),
            (e._getMuted = function () {
                return this._muted;
            }),
            (e._setPan = function (t) {
                return t == this._pan || ((this._pan = Math.max(-1, Math.min(1, t))), this._updatePan()), this;
            }),
            (e._getPan = function () {
                return this._pan;
            }),
            (e._getPosition = function () {
                return this._paused || this.playState != createjs.Sound.PLAY_SUCCEEDED || (this._position = this._calculateCurrentPosition()), this._position;
            }),
            (e._setPosition = function (t) {
                return (this._position = Math.max(0, t)), this.playState == createjs.Sound.PLAY_SUCCEEDED && this._updatePosition(), this;
            }),
            (e._getStartTime = function () {
                return this._startTime;
            }),
            (e._setStartTime = function (t) {
                return t == this._startTime || ((this._startTime = Math.max(0, t || 0)), this._updateStartTime()), this;
            }),
            (e._getDuration = function () {
                return this._duration;
            }),
            (e._setDuration = function (t) {
                return t == this._duration || ((this._duration = Math.max(0, t || 0)), this._updateDuration()), this;
            }),
            (e._setPlaybackResource = function (t) {
                return (this._playbackResource = t), 0 == this._duration && this._playbackResource && this._setDurationFromSource(), this;
            }),
            (e._getPlaybackResource = function () {
                return this._playbackResource;
            }),
            (e._getLoop = function () {
                return this._loop;
            }),
            (e._setLoop = function (t) {
                null != this._playbackResource && (0 != this._loop && 0 == t ? this._removeLooping(t) : 0 == this._loop && 0 != t && this._addLooping(t)), (this._loop = t);
            }),
            (e._sendEvent = function (t) {
                var e = new createjs.Event(t);
                this.dispatchEvent(e);
            }),
            (e._cleanUp = function () {
                clearTimeout(this.delayTimeoutId), this._handleCleanUp(), (this._paused = !1), createjs.Sound._playFinished(this);
            }),
            (e._interrupt = function () {
                this._cleanUp(), (this.playState = createjs.Sound.PLAY_INTERRUPTED), this._sendEvent("interrupted");
            }),
            (e._beginPlaying = function (t) {
                return (
                    this._setPosition(t.offset),
                    this._setLoop(t.loop),
                    this._setVolume(t.volume),
                    this._setPan(t.pan),
                    null != t.startTime && (this._setStartTime(t.startTime), this._setDuration(t.duration)),
                    null != this._playbackResource && this._position < this._duration
                        ? ((this._paused = !1), this._handleSoundReady(), (this.playState = createjs.Sound.PLAY_SUCCEEDED), this._sendEvent("succeeded"), !0)
                        : (this._playFailed(), !1)
                );
            }),
            (e._playFailed = function () {
                this._cleanUp(), (this.playState = createjs.Sound.PLAY_FAILED), this._sendEvent("failed");
            }),
            (e._handleSoundComplete = function (t) {
                return (this._position = 0), 0 != this._loop ? (this._loop--, this._handleLoop(), void this._sendEvent("loop")) : (this._cleanUp(), (this.playState = createjs.Sound.PLAY_FINISHED), void this._sendEvent("complete"));
            }),
            (e._handleSoundReady = function () {}),
            (e._updateVolume = function () {}),
            (e._updatePan = function () {}),
            (e._updateStartTime = function () {}),
            (e._updateDuration = function () {}),
            (e._setDurationFromSource = function () {}),
            (e._calculateCurrentPosition = function () {}),
            (e._updatePosition = function () {}),
            (e._removeLooping = function (t) {}),
            (e._addLooping = function (t) {}),
            (e._pause = function () {}),
            (e._resume = function () {}),
            (e._handleStop = function () {}),
            (e._handleCleanUp = function () {}),
            (e._handleLoop = function () {}),
            (createjs.AbstractSoundInstance = createjs.promote(t, "EventDispatcher")),
            (createjs.DefaultSoundInstance = createjs.AbstractSoundInstance);
    })(),
    (this.createjs = this.createjs || {}),
    (function () {
        "use strict";
        var t = function () {
                (this._capabilities = null), (this._loaders = {}), (this._audioSources = {}), (this._soundInstances = {}), (this._volume = 1), this._loaderClass, this._soundInstanceClass;
            },
            e = t.prototype;
        (t._capabilities = null),
            (t.isSupported = function () {
                return !0;
            }),
            (e.register = function (t) {
                var e = this._loaders[t.src];
                return e && !e.canceled
                    ? this._loaders[t.src]
                    : ((this._audioSources[t.src] = !0), (this._soundInstances[t.src] = []), (e = new this._loaderClass(t)).on("complete", this._handlePreloadComplete, this), (this._loaders[t.src] = e), e);
            }),
            (e.preload = function (t) {
                t.on("error", this._handlePreloadError, this), t.load();
            }),
            (e.isPreloadStarted = function (t) {
                return null != this._audioSources[t];
            }),
            (e.isPreloadComplete = function (t) {
                return !(null == this._audioSources[t] || 1 == this._audioSources[t]);
            }),
            (e.removeSound = function (t) {
                if (this._soundInstances[t]) {
                    for (var e = this._soundInstances[t].length; e--; ) {
                        this._soundInstances[t][e].destroy();
                    }
                    delete this._soundInstances[t], delete this._audioSources[t], this._loaders[t] && this._loaders[t].destroy(), delete this._loaders[t];
                }
            }),
            (e.removeAllSounds = function () {
                for (var t in this._audioSources) this.removeSound(t);
            }),
            (e.create = function (t, e, i) {
                this.isPreloadStarted(t) || this.preload(this.register(t));
                var s = new this._soundInstanceClass(t, e, i, this._audioSources[t]);
                return this._soundInstances[t] && this._soundInstances[t].push(s), s.setMasterVolume && s.setMasterVolume(createjs.Sound.volume), s.setMasterMute && s.setMasterMute(createjs.Sound.muted), s;
            }),
            (e.setVolume = function (t) {
                return (this._volume = t), this._updateVolume(), !0;
            }),
            (e.getVolume = function () {
                return this._volume;
            }),
            (e.setMute = function (t) {
                return this._updateVolume(), !0;
            }),
            (e.toString = function () {
                return "[AbstractPlugin]";
            }),
            (e._handlePreloadComplete = function (t) {
                var e = t.target.getItem().src;
                this._audioSources[e] = t.result;
                for (var i = 0, s = this._soundInstances[e].length; s > i; i++) {
                    (this._soundInstances[e][i].playbackResource = this._audioSources[e]), (this._soundInstances[e] = null);
                }
            }),
            (e._handlePreloadError = function (t) {}),
            (e._updateVolume = function () {}),
            (createjs.AbstractPlugin = t);
    })(),
    (this.createjs = this.createjs || {}),
    (function () {
        "use strict";
        function t(t) {
            this.AbstractLoader_constructor(t, !0, createjs.Types.SOUND);
        }
        var e = createjs.extend(t, createjs.AbstractLoader);
        (t.context = null),
            (e.toString = function () {
                return "[WebAudioLoader]";
            }),
            (e._createRequest = function () {
                (this._request = new createjs.XHRRequest(this._item, !1)), this._request.setResponseType("arraybuffer");
            }),
            (e._sendComplete = function (e) {
                t.context.decodeAudioData(this._rawResult, createjs.proxy(this._handleAudioDecoded, this), createjs.proxy(this._sendError, this));
            }),
            (e._handleAudioDecoded = function (t) {
                (this._result = t), this.AbstractLoader__sendComplete();
            }),
            (createjs.WebAudioLoader = createjs.promote(t, "AbstractLoader"));
    })(),
    (this.createjs = this.createjs || {}),
    (function () {
        "use strict";
        function t(t, e, s, r) {
            this.AbstractSoundInstance_constructor(t, e, s, r),
                (this.gainNode = i.context.createGain()),
                (this.panNode = i.context.createPanner()),
                (this.panNode.panningModel = i._panningModel),
                this.panNode.connect(this.gainNode),
                this._updatePan(),
                (this.sourceNode = null),
                (this._soundCompleteTimeout = null),
                (this._sourceNodeNext = null),
                (this._playbackStartTime = 0),
                (this._endedHandler = createjs.proxy(this._handleSoundComplete, this));
        }
        var e = createjs.extend(t, createjs.AbstractSoundInstance),
            i = t;
        (i.context = null),
            (i._scratchBuffer = null),
            (i.destinationNode = null),
            (i._panningModel = "equalpower"),
            (e.destroy = function () {
                this.AbstractSoundInstance_destroy(), this.panNode.disconnect(0), (this.panNode = null), this.gainNode.disconnect(0), (this.gainNode = null);
            }),
            (e.toString = function () {
                return "[WebAudioSoundInstance]";
            }),
            (e._updatePan = function () {
                this.panNode.setPosition(this._pan, 0, -0.5);
            }),
            (e._removeLooping = function (t) {
                this._sourceNodeNext = this._cleanUpAudioNode(this._sourceNodeNext);
            }),
            (e._addLooping = function (t) {
                this.playState == createjs.Sound.PLAY_SUCCEEDED && (this._sourceNodeNext = this._createAndPlayAudioNode(this._playbackStartTime, 0));
            }),
            (e._setDurationFromSource = function () {
                this._duration = 1e3 * this.playbackResource.duration;
            }),
            (e._handleCleanUp = function () {
                this.sourceNode && this.playState == createjs.Sound.PLAY_SUCCEEDED && ((this.sourceNode = this._cleanUpAudioNode(this.sourceNode)), (this._sourceNodeNext = this._cleanUpAudioNode(this._sourceNodeNext))),
                    0 != this.gainNode.numberOfOutputs && this.gainNode.disconnect(0),
                    clearTimeout(this._soundCompleteTimeout),
                    (this._playbackStartTime = 0);
            }),
            (e._cleanUpAudioNode = function (t) {
                if (t) {
                    if ((t.stop(0), t.disconnect(0), createjs.BrowserDetect.isIOS))
                        try {
                            t.buffer = i._scratchBuffer;
                        } catch (t) {}
                    t = null;
                }
                return t;
            }),
            (e._handleSoundReady = function (t) {
                this.gainNode.connect(i.destinationNode);
                var e = 0.001 * this._duration,
                    s = Math.min(0.001 * Math.max(0, this._position), e);
                (this.sourceNode = this._createAndPlayAudioNode(i.context.currentTime - e, s)),
                    (this._playbackStartTime = this.sourceNode.startTime - s),
                    (this._soundCompleteTimeout = setTimeout(this._endedHandler, 1e3 * (e - s))),
                    0 != this._loop && (this._sourceNodeNext = this._createAndPlayAudioNode(this._playbackStartTime, 0));
            }),
            (e._createAndPlayAudioNode = function (t, e) {
                var s = i.context.createBufferSource();
                (s.buffer = this.playbackResource), s.connect(this.panNode);
                var r = 0.001 * this._duration;
                return (s.startTime = t + r), s.start(s.startTime, e + 0.001 * this._startTime, r - e), s;
            }),
            (e._pause = function () {
                (this._position = 1e3 * (i.context.currentTime - this._playbackStartTime)),
                    (this.sourceNode = this._cleanUpAudioNode(this.sourceNode)),
                    (this._sourceNodeNext = this._cleanUpAudioNode(this._sourceNodeNext)),
                    0 != this.gainNode.numberOfOutputs && this.gainNode.disconnect(0),
                    clearTimeout(this._soundCompleteTimeout);
            }),
            (e._resume = function () {
                this._handleSoundReady();
            }),
            (e._updateVolume = function () {
                var t = this._muted ? 0 : this._volume;
                t != this.gainNode.gain.value && (this.gainNode.gain.value = t);
            }),
            (e._calculateCurrentPosition = function () {
                return 1e3 * (i.context.currentTime - this._playbackStartTime);
            }),
            (e._updatePosition = function () {
                (this.sourceNode = this._cleanUpAudioNode(this.sourceNode)), (this._sourceNodeNext = this._cleanUpAudioNode(this._sourceNodeNext)), clearTimeout(this._soundCompleteTimeout), this._paused || this._handleSoundReady();
            }),
            (e._handleLoop = function () {
                this._cleanUpAudioNode(this.sourceNode),
                    (this.sourceNode = this._sourceNodeNext),
                    (this._playbackStartTime = this.sourceNode.startTime),
                    (this._sourceNodeNext = this._createAndPlayAudioNode(this._playbackStartTime, 0)),
                    (this._soundCompleteTimeout = setTimeout(this._endedHandler, this._duration));
            }),
            (e._updateDuration = function () {
                this.playState == createjs.Sound.PLAY_SUCCEEDED && (this._pause(), this._resume());
            }),
            (createjs.WebAudioSoundInstance = createjs.promote(t, "AbstractSoundInstance"));
    })(),
    (this.createjs = this.createjs || {}),
    (function () {
        "use strict";
        function t() {
            this.AbstractPlugin_constructor(),
                (this._panningModel = i._panningModel),
                (this.context = i.context),
                (this.dynamicsCompressorNode = this.context.createDynamicsCompressor()),
                this.dynamicsCompressorNode.connect(this.context.destination),
                (this.gainNode = this.context.createGain()),
                this.gainNode.connect(this.dynamicsCompressorNode),
                (createjs.WebAudioSoundInstance.destinationNode = this.gainNode),
                (this._capabilities = i._capabilities),
                (this._loaderClass = createjs.WebAudioLoader),
                (this._soundInstanceClass = createjs.WebAudioSoundInstance),
                this._addPropsToClasses();
        }
        var e = createjs.extend(t, createjs.AbstractPlugin),
            i = t;
        (i._capabilities = null),
            (i._panningModel = "equalpower"),
            (i.context = null),
            (i._scratchBuffer = null),
            (i._unlocked = !1),
            (i.DEFAULT_SAMPLE_RATE = 44100),
            (i.isSupported = function () {
                var t = createjs.BrowserDetect.isIOS || createjs.BrowserDetect.isAndroid || createjs.BrowserDetect.isBlackberry;
                return !("file:" == location.protocol && !t && !this._isFileXHRSupported()) && (i._generateCapabilities(), null != i.context);
            }),
            (i.playEmptySound = function () {
                if (null != i.context) {
                    var t = i.context.createBufferSource();
                    (t.buffer = i._scratchBuffer), t.connect(i.context.destination), t.start(0, 0, 0);
                }
            }),
            (i._isFileXHRSupported = function () {
                var t = !0,
                    e = new XMLHttpRequest();
                try {
                    e.open("GET", "WebAudioPluginTest.fail", !1);
                } catch (e) {
                    return (t = !1);
                }
                (e.onerror = function () {
                    t = !1;
                }),
                    (e.onload = function () {
                        t = 404 == this.status || 200 == this.status || (0 == this.status && "" != this.response);
                    });
                try {
                    e.send();
                } catch (e) {
                    t = !1;
                }
                return t;
            }),
            (i._generateCapabilities = function () {
                if (null == i._capabilities) {
                    var t = document.createElement("audio");
                    if (null == t.canPlayType) return null;
                    if (null == i.context && ((i.context = i._createAudioContext()), null == i.context)) return null;
                    null == i._scratchBuffer && (i._scratchBuffer = i.context.createBuffer(1, 1, 22050)),
                        i._compatibilitySetUp(),
                        "ontouchstart" in window &&
                            "running" != i.context.state &&
                            (i._unlock(), document.addEventListener("mousedown", i._unlock, !0), document.addEventListener("touchstart", i._unlock, !0), document.addEventListener("touchend", i._unlock, !0)),
                        (i._capabilities = { panning: !0, volume: !0, tracks: -1 });
                    for (var e = createjs.Sound.SUPPORTED_EXTENSIONS, s = createjs.Sound.EXTENSION_MAP, r = 0, n = e.length; n > r; r++) {
                        var a = e[r],
                            o = s[a] || a;
                        i._capabilities[a] = ("no" != t.canPlayType("audio/" + a) && "" != t.canPlayType("audio/" + a)) || ("no" != t.canPlayType("audio/" + o) && "" != t.canPlayType("audio/" + o));
                    }
                    i.context.destination.numberOfChannels < 2 && (i._capabilities.panning = !1);
                }
            }),
            (i._createAudioContext = function () {
                var t = window.AudioContext || window.webkitAudioContext;
                if (null == t) return null;
                var e = new t();
                if (/(iPhone|iPad)/i.test(navigator.userAgent) && e.sampleRate !== i.DEFAULT_SAMPLE_RATE) {
                    var s = e.createBuffer(1, 1, i.DEFAULT_SAMPLE_RATE),
                        r = e.createBufferSource();
                    (r.buffer = s), r.connect(e.destination), r.start(0), r.disconnect(), e.close(), (e = new t());
                }
                return e;
            }),
            (i._compatibilitySetUp = function () {
                if (((i._panningModel = "equalpower"), !i.context.createGain)) {
                    i.context.createGain = i.context.createGainNode;
                    var t = i.context.createBufferSource();
                    (t.__proto__.start = t.__proto__.noteGrainOn), (t.__proto__.stop = t.__proto__.noteOff), (i._panningModel = 0);
                }
            }),
            (i._unlock = function () {
                i._unlocked ||
                    (i.playEmptySound(),
                    "running" == i.context.state &&
                        (document.removeEventListener("mousedown", i._unlock, !0), document.removeEventListener("touchend", i._unlock, !0), document.removeEventListener("touchstart", i._unlock, !0), (i._unlocked = !0)));
            }),
            (e.toString = function () {
                return "[WebAudioPlugin]";
            }),
            (e._addPropsToClasses = function () {
                var t = this._soundInstanceClass;
                (t.context = this.context), (t._scratchBuffer = i._scratchBuffer), (t.destinationNode = this.gainNode), (t._panningModel = this._panningModel), (this._loaderClass.context = this.context);
            }),
            (e._updateVolume = function () {
                var t = createjs.Sound._masterMute ? 0 : this._volume;
                t != this.gainNode.gain.value && (this.gainNode.gain.value = t);
            }),
            (createjs.WebAudioPlugin = createjs.promote(t, "AbstractPlugin"));
    })(),
    (this.createjs = this.createjs || {}),
    (function () {
        "use strict";
        function t() {
            throw "HTMLAudioTagPool cannot be instantiated";
        }
        function e(t) {
            this._tags = [];
        }
        var i = t;
        (i._tags = {}),
            (i._tagPool = new e()),
            (i._tagUsed = {}),
            (i.get = function (t) {
                var e = i._tags[t];
                return null == e ? ((e = i._tags[t] = i._tagPool.get()).src = t) : i._tagUsed[t] ? ((e = i._tagPool.get()).src = t) : (i._tagUsed[t] = !0), e;
            }),
            (i.set = function (t, e) {
                e == i._tags[t] ? (i._tagUsed[t] = !1) : i._tagPool.set(e);
            }),
            (i.remove = function (t) {
                var e = i._tags[t];
                return null != e && (i._tagPool.set(e), delete i._tags[t], delete i._tagUsed[t], !0);
            }),
            (i.getDuration = function (t) {
                var e = i._tags[t];
                return null != e && e.duration ? 1e3 * e.duration : 0;
            }),
            (createjs.HTMLAudioTagPool = t);
        var s = e.prototype;
        (s.constructor = e),
            (s.get = function () {
                var t;
                return null == (t = 0 == this._tags.length ? this._createTag() : this._tags.pop()).parentNode && document.body.appendChild(t), t;
            }),
            (s.set = function (t) {
                -1 == createjs.indexOf(this._tags, t) && ((this._tags.src = null), this._tags.push(t));
            }),
            (s.toString = function () {
                return "[TagPool]";
            }),
            (s._createTag = function () {
                var t = document.createElement("audio");
                return (t.autoplay = !1), (t.preload = "none"), t;
            });
    })(),
    (this.createjs = this.createjs || {}),
    (function () {
        "use strict";
        function t(t, e, i, s) {
            this.AbstractSoundInstance_constructor(t, e, i, s),
                (this._audioSpriteStopTime = null),
                (this._delayTimeoutId = null),
                (this._endedHandler = createjs.proxy(this._handleSoundComplete, this)),
                (this._readyHandler = createjs.proxy(this._handleTagReady, this)),
                (this._stalledHandler = createjs.proxy(this._playFailed, this)),
                (this._audioSpriteEndHandler = createjs.proxy(this._handleAudioSpriteLoop, this)),
                (this._loopHandler = createjs.proxy(this._handleSoundComplete, this)),
                i ? (this._audioSpriteStopTime = 0.001 * (e + i)) : (this._duration = createjs.HTMLAudioTagPool.getDuration(this.src));
        }
        var e = createjs.extend(t, createjs.AbstractSoundInstance);
        (e.setMasterVolume = function (t) {
            this._updateVolume();
        }),
            (e.setMasterMute = function (t) {
                this._updateVolume();
            }),
            (e.toString = function () {
                return "[HTMLAudioSoundInstance]";
            }),
            (e._removeLooping = function () {
                null != this._playbackResource && ((this._playbackResource.loop = !1), this._playbackResource.removeEventListener(createjs.HTMLAudioPlugin._AUDIO_SEEKED, this._loopHandler, !1));
            }),
            (e._addLooping = function () {
                null == this._playbackResource || this._audioSpriteStopTime || (this._playbackResource.addEventListener(createjs.HTMLAudioPlugin._AUDIO_SEEKED, this._loopHandler, !1), (this._playbackResource.loop = !0));
            }),
            (e._handleCleanUp = function () {
                var t = this._playbackResource;
                if (null != t) {
                    t.pause(),
                        (t.loop = !1),
                        t.removeEventListener(createjs.HTMLAudioPlugin._AUDIO_ENDED, this._endedHandler, !1),
                        t.removeEventListener(createjs.HTMLAudioPlugin._AUDIO_READY, this._readyHandler, !1),
                        t.removeEventListener(createjs.HTMLAudioPlugin._AUDIO_STALLED, this._stalledHandler, !1),
                        t.removeEventListener(createjs.HTMLAudioPlugin._AUDIO_SEEKED, this._loopHandler, !1),
                        t.removeEventListener(createjs.HTMLAudioPlugin._TIME_UPDATE, this._audioSpriteEndHandler, !1);
                    try {
                        t.currentTime = this._startTime;
                    } catch (t) {}
                    createjs.HTMLAudioTagPool.set(this.src, t), (this._playbackResource = null);
                }
            }),
            (e._beginPlaying = function (t) {
                return (this._playbackResource = createjs.HTMLAudioTagPool.get(this.src)), this.AbstractSoundInstance__beginPlaying(t);
            }),
            (e._handleSoundReady = function (t) {
                if (4 !== this._playbackResource.readyState) {
                    var e = this._playbackResource;
                    return e.addEventListener(createjs.HTMLAudioPlugin._AUDIO_READY, this._readyHandler, !1), e.addEventListener(createjs.HTMLAudioPlugin._AUDIO_STALLED, this._stalledHandler, !1), (e.preload = "auto"), void e.load();
                }
                this._updateVolume(),
                    (this._playbackResource.currentTime = 0.001 * (this._startTime + this._position)),
                    this._audioSpriteStopTime
                        ? this._playbackResource.addEventListener(createjs.HTMLAudioPlugin._TIME_UPDATE, this._audioSpriteEndHandler, !1)
                        : (this._playbackResource.addEventListener(createjs.HTMLAudioPlugin._AUDIO_ENDED, this._endedHandler, !1),
                          0 != this._loop && (this._playbackResource.addEventListener(createjs.HTMLAudioPlugin._AUDIO_SEEKED, this._loopHandler, !1), (this._playbackResource.loop = !0))),
                    this._playbackResource.play();
            }),
            (e._handleTagReady = function (t) {
                this._playbackResource.removeEventListener(createjs.HTMLAudioPlugin._AUDIO_READY, this._readyHandler, !1),
                    this._playbackResource.removeEventListener(createjs.HTMLAudioPlugin._AUDIO_STALLED, this._stalledHandler, !1),
                    this._handleSoundReady();
            }),
            (e._pause = function () {
                this._playbackResource.pause();
            }),
            (e._resume = function () {
                this._playbackResource.play();
            }),
            (e._updateVolume = function () {
                if (null != this._playbackResource) {
                    var t = this._muted || createjs.Sound._masterMute ? 0 : this._volume * createjs.Sound._masterVolume;
                    t != this._playbackResource.volume && (this._playbackResource.volume = t);
                }
            }),
            (e._calculateCurrentPosition = function () {
                return 1e3 * this._playbackResource.currentTime - this._startTime;
            }),
            (e._updatePosition = function () {
                this._playbackResource.removeEventListener(createjs.HTMLAudioPlugin._AUDIO_SEEKED, this._loopHandler, !1), this._playbackResource.addEventListener(createjs.HTMLAudioPlugin._AUDIO_SEEKED, this._handleSetPositionSeek, !1);
                try {
                    this._playbackResource.currentTime = 0.001 * (this._position + this._startTime);
                } catch (t) {
                    this._handleSetPositionSeek(null);
                }
            }),
            (e._handleSetPositionSeek = function (t) {
                null != this._playbackResource &&
                    (this._playbackResource.removeEventListener(createjs.HTMLAudioPlugin._AUDIO_SEEKED, this._handleSetPositionSeek, !1),
                    this._playbackResource.addEventListener(createjs.HTMLAudioPlugin._AUDIO_SEEKED, this._loopHandler, !1));
            }),
            (e._handleAudioSpriteLoop = function (t) {
                this._playbackResource.currentTime <= this._audioSpriteStopTime ||
                    (this._playbackResource.pause(),
                    0 == this._loop
                        ? this._handleSoundComplete(null)
                        : ((this._position = 0), this._loop--, (this._playbackResource.currentTime = 0.001 * this._startTime), this._paused || this._playbackResource.play(), this._sendEvent("loop")));
            }),
            (e._handleLoop = function (t) {
                0 == this._loop && ((this._playbackResource.loop = !1), this._playbackResource.removeEventListener(createjs.HTMLAudioPlugin._AUDIO_SEEKED, this._loopHandler, !1));
            }),
            (e._updateStartTime = function () {
                (this._audioSpriteStopTime = 0.001 * (this._startTime + this._duration)),
                    this.playState == createjs.Sound.PLAY_SUCCEEDED &&
                        (this._playbackResource.removeEventListener(createjs.HTMLAudioPlugin._AUDIO_ENDED, this._endedHandler, !1),
                        this._playbackResource.addEventListener(createjs.HTMLAudioPlugin._TIME_UPDATE, this._audioSpriteEndHandler, !1));
            }),
            (e._updateDuration = function () {
                (this._audioSpriteStopTime = 0.001 * (this._startTime + this._duration)),
                    this.playState == createjs.Sound.PLAY_SUCCEEDED &&
                        (this._playbackResource.removeEventListener(createjs.HTMLAudioPlugin._AUDIO_ENDED, this._endedHandler, !1),
                        this._playbackResource.addEventListener(createjs.HTMLAudioPlugin._TIME_UPDATE, this._audioSpriteEndHandler, !1));
            }),
            (e._setDurationFromSource = function () {
                (this._duration = createjs.HTMLAudioTagPool.getDuration(this.src)), (this._playbackResource = null);
            }),
            (createjs.HTMLAudioSoundInstance = createjs.promote(t, "AbstractSoundInstance"));
    })(),
    (this.createjs = this.createjs || {}),
    (function () {
        "use strict";
        function t() {
            this.AbstractPlugin_constructor(), (this._capabilities = i._capabilities), (this._loaderClass = createjs.SoundLoader), (this._soundInstanceClass = createjs.HTMLAudioSoundInstance);
        }
        var e = createjs.extend(t, createjs.AbstractPlugin),
            i = t;
        (i.MAX_INSTANCES = 30),
            (i._AUDIO_READY = "canplaythrough"),
            (i._AUDIO_ENDED = "ended"),
            (i._AUDIO_SEEKED = "seeked"),
            (i._AUDIO_STALLED = "stalled"),
            (i._TIME_UPDATE = "timeupdate"),
            (i._capabilities = null),
            (i.isSupported = function () {
                return i._generateCapabilities(), null != i._capabilities;
            }),
            (i._generateCapabilities = function () {
                if (null == i._capabilities) {
                    var t = document.createElement("audio");
                    if (null == t.canPlayType) return null;
                    i._capabilities = { panning: !1, volume: !0, tracks: -1 };
                    for (var e = createjs.Sound.SUPPORTED_EXTENSIONS, s = createjs.Sound.EXTENSION_MAP, r = 0, n = e.length; n > r; r++) {
                        var a = e[r],
                            o = s[a] || a;
                        i._capabilities[a] = ("no" != t.canPlayType("audio/" + a) && "" != t.canPlayType("audio/" + a)) || ("no" != t.canPlayType("audio/" + o) && "" != t.canPlayType("audio/" + o));
                    }
                }
            }),
            (e.register = function (t) {
                var e = createjs.HTMLAudioTagPool.get(t.src),
                    i = this.AbstractPlugin_register(t);
                return i.setTag(e), i;
            }),
            (e.removeSound = function (t) {
                this.AbstractPlugin_removeSound(t), createjs.HTMLAudioTagPool.remove(t);
            }),
            (e.create = function (t, e, i) {
                var s = this.AbstractPlugin_create(t, e, i);
                return (s.playbackResource = null), s;
            }),
            (e.toString = function () {
                return "[HTMLAudioPlugin]";
            }),
            (e.setVolume = e.getVolume = e.setMute = null),
            (createjs.HTMLAudioPlugin = createjs.promote(t, "AbstractPlugin"));
    })(),
    (this.createjs = this.createjs || {}),
    (function () {
        "use strict";
        function t(t) {
            this.EventDispatcher_constructor(),
                (this.ignoreGlobalPause = !1),
                (this.loop = 0),
                (this.useTicks = !1),
                (this.reversed = !1),
                (this.bounce = !1),
                (this.timeScale = 1),
                (this.duration = 0),
                (this.position = 0),
                (this.rawPosition = -1),
                (this._paused = !0),
                (this._next = null),
                (this._prev = null),
                (this._parent = null),
                (this._labels = null),
                (this._labelList = null),
                t &&
                    ((this.useTicks = !!t.useTicks),
                    (this.ignoreGlobalPause = !!t.ignoreGlobalPause),
                    (this.loop = !0 === t.loop ? -1 : t.loop || 0),
                    (this.reversed = !!t.reversed),
                    (this.bounce = !!t.bounce),
                    (this.timeScale = t.timeScale || 1),
                    t.onChange && this.addEventListener("change", t.onChange),
                    t.onComplete && this.addEventListener("complete", t.onComplete));
        }
        var e = createjs.extend(t, createjs.EventDispatcher);
        (e._setPaused = function (t) {
            return createjs.Tween._register(this, t), this;
        }),
            (e.setPaused = createjs.deprecate(e._setPaused, "AbstractTween.setPaused")),
            (e._getPaused = function () {
                return this._paused;
            }),
            (e.getPaused = createjs.deprecate(e._getPaused, "AbstactTween.getPaused")),
            (e._getCurrentLabel = function (t) {
                var e = this.getLabels();
                null == t && (t = this.position);
                for (var i = 0, s = e.length; s > i && !(t < e[i].position); i++);
                return 0 === i ? null : e[i - 1].label;
            }),
            (e.getCurrentLabel = createjs.deprecate(e._getCurrentLabel, "AbstractTween.getCurrentLabel"));
        try {
            Object.defineProperties(e, { paused: { set: e._setPaused, get: e._getPaused }, currentLabel: { get: e._getCurrentLabel } });
        } catch (t) {}
        (e.advance = function (t, e) {
            this.setPosition(this.rawPosition + t * this.timeScale, e);
        }),
            (e.setPosition = function (t, e, i, s) {
                var r = this.duration,
                    n = this.loop,
                    a = this.rawPosition,
                    o = 0,
                    h = 0,
                    c = !1;
                if ((0 > t && (t = 0), 0 === r)) {
                    if (((c = !0), -1 !== a)) return c;
                } else {
                    if (((h = t - (o = (t / r) | 0) * r), (c = -1 !== n && t >= n * r + r) && (t = (h = r) * (o = n) + r), t === a)) return c;
                    !this.reversed != !(this.bounce && o % 2) && (h = r - h);
                }
                (this.position = h),
                    (this.rawPosition = t),
                    this._updatePosition(i, c),
                    c && (this.paused = !0),
                    s && s(this),
                    e || this._runActions(a, t, i, !i && -1 === a),
                    this.dispatchEvent("change"),
                    c && this.dispatchEvent("complete");
            }),
            (e.calculatePosition = function (t) {
                var e = this.duration,
                    i = this.loop,
                    s = 0,
                    r = 0;
                return 0 === e ? 0 : (-1 !== i && t >= i * e + e ? ((r = e), (s = i)) : 0 > t ? (r = 0) : (r = t - (s = (t / e) | 0) * e), !this.reversed != !(this.bounce && s % 2) ? e - r : r);
            }),
            (e.getLabels = function () {
                var t = this._labelList;
                if (!t) {
                    t = this._labelList = [];
                    var e = this._labels;
                    for (var i in e) t.push({ label: i, position: e[i] });
                    t.sort(function (t, e) {
                        return t.position - e.position;
                    });
                }
                return t;
            }),
            (e.setLabels = function (t) {
                (this._labels = t), (this._labelList = null);
            }),
            (e.addLabel = function (t, e) {
                this._labels || (this._labels = {}), (this._labels[t] = e);
                var i = this._labelList;
                if (i) {
                    for (var s = 0, r = i.length; r > s && !(e < i[s].position); s++);
                    i.splice(s, 0, { label: t, position: e });
                }
            }),
            (e.gotoAndPlay = function (t) {
                (this.paused = !1), this._goto(t);
            }),
            (e.gotoAndStop = function (t) {
                (this.paused = !0), this._goto(t);
            }),
            (e.resolve = function (t) {
                var e = Number(t);
                return isNaN(e) && (e = this._labels && this._labels[t]), e;
            }),
            (e.toString = function () {
                return "[AbstractTween]";
            }),
            (e.clone = function () {
                throw "AbstractTween can not be cloned.";
            }),
            (e._init = function (t) {
                (t && t.paused) || (this.paused = !1), t && null != t.position && this.setPosition(t.position);
            }),
            (e._updatePosition = function (t, e) {}),
            (e._goto = function (t) {
                var e = this.resolve(t);
                null != e && this.setPosition(e, !1, !0);
            }),
            (e._runActions = function (t, e, i, s) {
                if (this._actionHead || this.tweens) {
                    var r,
                        n,
                        a,
                        o,
                        h = this.duration,
                        c = this.reversed,
                        u = this.bounce,
                        l = this.loop;
                    if ((0 === h ? ((r = n = a = o = 0), (c = u = !1)) : ((a = t - (r = (t / h) | 0) * h), (o = e - (n = (e / h) | 0) * h)), -1 !== l && (n > l && ((o = h), (n = l)), r > l && ((a = h), (r = l))), i))
                        return this._runActionsRange(o, o, i, s);
                    if (r !== n || a !== o || i || s) {
                        -1 === r && (r = a = 0);
                        var d = e >= t,
                            _ = r;
                        do {
                            var p = _ === r ? a : d ? 0 : h,
                                f = _ === n ? o : d ? h : 0;
                            if ((!c != !(u && _ % 2) && ((p = h - p), (f = h - f)), u && _ !== r && p === f));
                            else if (this._runActionsRange(p, f, i, s || (_ !== r && !u))) return !0;
                            s = !1;
                        } while ((d && ++_ <= n) || (!d && --_ >= n));
                    }
                }
            }),
            (e._runActionsRange = function (t, e, i, s) {}),
            (createjs.AbstractTween = createjs.promote(t, "EventDispatcher"));
    })(),
    (this.createjs = this.createjs || {}),
    (function () {
        "use strict";
        function t(i, s) {
            this.AbstractTween_constructor(s),
                (this.pluginData = null),
                (this.target = i),
                (this.passive = !1),
                (this._stepHead = new e(null, 0, 0, {}, null, !0)),
                (this._stepTail = this._stepHead),
                (this._stepPosition = 0),
                (this._actionHead = null),
                (this._actionTail = null),
                (this._plugins = null),
                (this._pluginIds = null),
                (this._injected = null),
                s && ((this.pluginData = s.pluginData), s.override && t.removeTweens(i)),
                this.pluginData || (this.pluginData = {}),
                this._init(s);
        }
        function e(t, e, i, s, r, n) {
            (this.next = null), (this.prev = t), (this.t = e), (this.d = i), (this.props = s), (this.ease = r), (this.passive = n), (this.index = t ? t.index + 1 : 0);
        }
        function i(t, e, i, s, r) {
            (this.next = null), (this.prev = t), (this.t = e), (this.d = 0), (this.scope = i), (this.funct = s), (this.params = r);
        }
        var s = createjs.extend(t, createjs.AbstractTween);
        (t.IGNORE = {}),
            (t._tweens = []),
            (t._plugins = null),
            (t._tweenHead = null),
            (t._tweenTail = null),
            (t.get = function (e, i) {
                return new t(e, i);
            }),
            (t.tick = function (e, i) {
                for (var s = t._tweenHead; s; ) {
                    var r = s._next;
                    (i && !s.ignoreGlobalPause) || s._paused || s.advance(s.useTicks ? 1 : e), (s = r);
                }
            }),
            (t.handleEvent = function (t) {
                "tick" === t.type && this.tick(t.delta, t.paused);
            }),
            (t.removeTweens = function (e) {
                if (e.tweenjs_count) {
                    for (var i = t._tweenHead; i; ) {
                        var s = i._next;
                        i.target === e && t._register(i, !0), (i = s);
                    }
                    e.tweenjs_count = 0;
                }
            }),
            (t.removeAllTweens = function () {
                for (var e = t._tweenHead; e; ) {
                    var i = e._next;
                    (e._paused = !0), e.target && (e.target.tweenjs_count = 0), (e._next = e._prev = null), (e = i);
                }
                t._tweenHead = t._tweenTail = null;
            }),
            (t.hasActiveTweens = function (e) {
                return e ? !!e.tweenjs_count : !!t._tweenHead;
            }),
            (t._installPlugin = function (e) {
                for (var i = (e.priority = e.priority || 0), s = (t._plugins = t._plugins || []), r = 0, n = s.length; n > r && !(i < s[r].priority); r++);
                s.splice(r, 0, e);
            }),
            (t._register = function (e, i) {
                var s = e.target;
                if (!i && e._paused) {
                    s && (s.tweenjs_count = s.tweenjs_count ? s.tweenjs_count + 1 : 1);
                    var r = t._tweenTail;
                    r ? ((t._tweenTail = r._next = e), (e._prev = r)) : (t._tweenHead = t._tweenTail = e), !t._inited && createjs.Ticker && (createjs.Ticker.addEventListener("tick", t), (t._inited = !0));
                } else if (i && !e._paused) {
                    s && s.tweenjs_count--;
                    var n = e._next,
                        a = e._prev;
                    n ? (n._prev = a) : (t._tweenTail = a), a ? (a._next = n) : (t._tweenHead = n), (e._next = e._prev = null);
                }
                e._paused = i;
            }),
            (s.wait = function (t, e) {
                return t > 0 && this._addStep(+t, this._stepTail.props, null, e), this;
            }),
            (s.to = function (t, e, i) {
                (null == e || 0 > e) && (e = 0);
                var s = this._addStep(+e, null, i);
                return this._appendProps(t, s), this;
            }),
            (s.label = function (t) {
                return this.addLabel(t, this.duration), this;
            }),
            (s.call = function (t, e, i) {
                return this._addAction(i || this.target, t, e || [this]);
            }),
            (s.set = function (t, e) {
                return this._addAction(e || this.target, this._set, [t]);
            }),
            (s.play = function (t) {
                return this._addAction(t || this, this._set, [{ paused: !1 }]);
            }),
            (s.pause = function (t) {
                return this._addAction(t || this, this._set, [{ paused: !0 }]);
            }),
            (s.w = s.wait),
            (s.t = s.to),
            (s.c = s.call),
            (s.s = s.set),
            (s.toString = function () {
                return "[Tween]";
            }),
            (s.clone = function () {
                throw "Tween can not be cloned.";
            }),
            (s._addPlugin = function (t) {
                var e = this._pluginIds || (this._pluginIds = {}),
                    i = t.ID;
                if (i && !e[i]) {
                    e[i] = !0;
                    for (var s = this._plugins || (this._plugins = []), r = t.priority || 0, n = 0, a = s.length; a > n; n++) if (r < s[n].priority) return void s.splice(n, 0, t);
                    s.push(t);
                }
            }),
            (s._updatePosition = function (t, e) {
                var i = this._stepHead.next,
                    s = this.position,
                    r = this.duration;
                if (this.target && i) {
                    for (var n = i.next; n && n.t <= s; ) n = (i = i.next).next;
                    var a = e ? (0 === r ? 1 : s / r) : (s - i.t) / i.d;
                    this._updateTargetProps(i, a, e);
                }
                this._stepPosition = i ? s - i.t : 0;
            }),
            (s._updateTargetProps = function (e, i, s) {
                if (!(this.passive = !!e.passive)) {
                    var r,
                        n,
                        a,
                        o,
                        h = e.prev.props,
                        c = e.props;
                    (o = e.ease) && (i = o(i, 0, 1, 1));
                    var u = this._plugins;
                    t: for (var l in h) {
                        if (((r = (n = h[l]) !== (a = c[l]) && "number" == typeof n ? n + (a - n) * i : i >= 1 ? a : n), u))
                            for (var d = 0, _ = u.length; _ > d; d++) {
                                var p = u[d].change(this, e, l, r, i, s);
                                if (p === t.IGNORE) continue t;
                                void 0 !== p && (r = p);
                            }
                        this.target[l] = r;
                    }
                }
            }),
            (s._runActionsRange = function (t, e, i, s) {
                var r = t > e,
                    n = r ? this._actionTail : this._actionHead,
                    a = e,
                    o = t;
                r && ((a = t), (o = e));
                for (var h = this.position; n; ) {
                    var c = n.t;
                    if ((c === e || (c > o && a > c) || (s && c === t)) && (n.funct.apply(n.scope, n.params), h !== this.position)) return !0;
                    n = r ? n.prev : n.next;
                }
            }),
            (s._appendProps = function (e, i, s) {
                var r,
                    n,
                    a,
                    o,
                    h,
                    c = this._stepHead.props,
                    u = this.target,
                    l = t._plugins,
                    d = i.prev,
                    _ = d.props,
                    p = i.props || (i.props = this._cloneProps(_)),
                    f = {};
                for (r in e)
                    if (e.hasOwnProperty(r) && ((f[r] = p[r] = e[r]), void 0 === c[r])) {
                        if (((o = void 0), l))
                            for (n = l.length - 1; n >= 0; n--)
                                if ((void 0 !== (a = l[n].init(this, r, o)) && (o = a), o === t.IGNORE)) {
                                    delete p[r], delete f[r];
                                    break;
                                }
                        o !== t.IGNORE && (void 0 === o && (o = u[r]), (_[r] = void 0 === o ? null : o));
                    }
                for (r in f) {
                    a = e[r];
                    for (var g, m = d; (g = m) && (m = g.prev); )
                        if (m.props !== g.props) {
                            if (void 0 !== m.props[r]) break;
                            m.props[r] = _[r];
                        }
                }
                if (!1 !== s && (l = this._plugins)) for (n = l.length - 1; n >= 0; n--) l[n].step(this, i, f);
                (h = this._injected) && ((this._injected = null), this._appendProps(h, i, !1));
            }),
            (s._injectProp = function (t, e) {
                (this._injected || (this._injected = {}))[t] = e;
            }),
            (s._addStep = function (t, i, s, r) {
                var n = new e(this._stepTail, this.duration, t, i, s, r || !1);
                return (this.duration += t), (this._stepTail = this._stepTail.next = n);
            }),
            (s._addAction = function (t, e, s) {
                var r = new i(this._actionTail, this.duration, t, e, s);
                return this._actionTail ? (this._actionTail.next = r) : (this._actionHead = r), (this._actionTail = r), this;
            }),
            (s._set = function (t) {
                for (var e in t) this[e] = t[e];
            }),
            (s._cloneProps = function (t) {
                var e = {};
                for (var i in t) e[i] = t[i];
                return e;
            }),
            (createjs.Tween = createjs.promote(t, "AbstractTween"));
    })(),
    (this.createjs = this.createjs || {}),
    (function () {
        "use strict";
        function t(t) {
            var e, i;
            t instanceof Array || (null == t && arguments.length > 1) ? ((e = t), (i = arguments[1]), (t = arguments[2])) : t && ((e = t.tweens), (i = t.labels)),
                this.AbstractTween_constructor(t),
                (this.tweens = []),
                e && this.addTween.apply(this, e),
                this.setLabels(i),
                this._init(t);
        }
        var e = createjs.extend(t, createjs.AbstractTween);
        (e.addTween = function (t) {
            t._parent && t._parent.removeTween(t);
            var e = arguments.length;
            if (e > 1) {
                for (var i = 0; e > i; i++) this.addTween(arguments[i]);
                return arguments[e - 1];
            }
            if (0 === e) return null;
            this.tweens.push(t), (t._parent = this), (t.paused = !0);
            var s = t.duration;
            return t.loop > 0 && (s *= t.loop + 1), s > this.duration && (this.duration = s), this.rawPosition >= 0 && t.setPosition(this.rawPosition), t;
        }),
            (e.removeTween = function (t) {
                var e = arguments.length;
                if (e > 1) {
                    for (var i = !0, s = 0; e > s; s++) i = i && this.removeTween(arguments[s]);
                    return i;
                }
                if (0 === e) return !0;
                var r = this.tweens;
                for (s = r.length; s--; ) if (r[s] === t) return r.splice(s, 1), (t._parent = null), t.duration >= this.duration && this.updateDuration(), !0;
                return !1;
            }),
            (e.updateDuration = function () {
                this.duration = 0;
                for (var t = 0, e = this.tweens.length; e > t; t++) {
                    var i = this.tweens[t],
                        s = i.duration;
                    i.loop > 0 && (s *= i.loop + 1), s > this.duration && (this.duration = s);
                }
            }),
            (e.toString = function () {
                return "[Timeline]";
            }),
            (e.clone = function () {
                throw "Timeline can not be cloned.";
            }),
            (e._updatePosition = function (t, e) {
                for (var i = this.position, s = 0, r = this.tweens.length; r > s; s++) this.tweens[s].setPosition(i, !0, t);
            }),
            (e._runActionsRange = function (t, e, i, s) {
                for (var r = this.position, n = 0, a = this.tweens.length; a > n; n++) if ((this.tweens[n]._runActions(t, e, i, s), r !== this.position)) return !0;
            }),
            (createjs.Timeline = createjs.promote(t, "AbstractTween"));
    })(),
    (this.createjs = this.createjs || {}),
    (function () {
        "use strict";
        function t() {
            throw "Ease cannot be instantiated.";
        }
        (t.linear = function (t) {
            return t;
        }),
            (t.none = t.linear),
            (t.get = function (t) {
                return (
                    -1 > t ? (t = -1) : t > 1 && (t = 1),
                    function (e) {
                        return 0 == t ? e : 0 > t ? e * (e * -t + 1 + t) : e * ((2 - e) * t + (1 - t));
                    }
                );
            }),
            (t.getPowIn = function (t) {
                return function (e) {
                    return Math.pow(e, t);
                };
            }),
            (t.getPowOut = function (t) {
                return function (e) {
                    return 1 - Math.pow(1 - e, t);
                };
            }),
            (t.getPowInOut = function (t) {
                return function (e) {
                    return (e *= 2) < 1 ? 0.5 * Math.pow(e, t) : 1 - 0.5 * Math.abs(Math.pow(2 - e, t));
                };
            }),
            (t.quadIn = t.getPowIn(2)),
            (t.quadOut = t.getPowOut(2)),
            (t.quadInOut = t.getPowInOut(2)),
            (t.cubicIn = t.getPowIn(3)),
            (t.cubicOut = t.getPowOut(3)),
            (t.cubicInOut = t.getPowInOut(3)),
            (t.quartIn = t.getPowIn(4)),
            (t.quartOut = t.getPowOut(4)),
            (t.quartInOut = t.getPowInOut(4)),
            (t.quintIn = t.getPowIn(5)),
            (t.quintOut = t.getPowOut(5)),
            (t.quintInOut = t.getPowInOut(5)),
            (t.sineIn = function (t) {
                return 1 - Math.cos((t * Math.PI) / 2);
            }),
            (t.sineOut = function (t) {
                return Math.sin((t * Math.PI) / 2);
            }),
            (t.sineInOut = function (t) {
                return -0.5 * (Math.cos(Math.PI * t) - 1);
            }),
            (t.getBackIn = function (t) {
                return function (e) {
                    return e * e * ((t + 1) * e - t);
                };
            }),
            (t.backIn = t.getBackIn(1.7)),
            (t.getBackOut = function (t) {
                return function (e) {
                    return --e * e * ((t + 1) * e + t) + 1;
                };
            }),
            (t.backOut = t.getBackOut(1.7)),
            (t.getBackInOut = function (t) {
                return (
                    (t *= 1.525),
                    function (e) {
                        return (e *= 2) < 1 ? e * e * ((t + 1) * e - t) * 0.5 : 0.5 * ((e -= 2) * e * ((t + 1) * e + t) + 2);
                    }
                );
            }),
            (t.backInOut = t.getBackInOut(1.7)),
            (t.circIn = function (t) {
                return -(Math.sqrt(1 - t * t) - 1);
            }),
            (t.circOut = function (t) {
                return Math.sqrt(1 - --t * t);
            }),
            (t.circInOut = function (t) {
                return (t *= 2) < 1 ? -0.5 * (Math.sqrt(1 - t * t) - 1) : 0.5 * (Math.sqrt(1 - (t -= 2) * t) + 1);
            }),
            (t.bounceIn = function (e) {
                return 1 - t.bounceOut(1 - e);
            }),
            (t.bounceOut = function (t) {
                return 1 / 2.75 > t ? 7.5625 * t * t : 2 / 2.75 > t ? 7.5625 * (t -= 1.5 / 2.75) * t + 0.75 : 2.5 / 2.75 > t ? 7.5625 * (t -= 2.25 / 2.75) * t + 0.9375 : 7.5625 * (t -= 2.625 / 2.75) * t + 0.984375;
            }),
            (t.bounceInOut = function (e) {
                return 0.5 > e ? 0.5 * t.bounceIn(2 * e) : 0.5 * t.bounceOut(2 * e - 1) + 0.5;
            }),
            (t.getElasticIn = function (t, e) {
                var i = 2 * Math.PI;
                return function (s) {
                    if (0 == s || 1 == s) return s;
                    var r = (e / i) * Math.asin(1 / t);
                    return -t * Math.pow(2, 10 * (s -= 1)) * Math.sin(((s - r) * i) / e);
                };
            }),
            (t.elasticIn = t.getElasticIn(1, 0.3)),
            (t.getElasticOut = function (t, e) {
                var i = 2 * Math.PI;
                return function (s) {
                    if (0 == s || 1 == s) return s;
                    var r = (e / i) * Math.asin(1 / t);
                    return t * Math.pow(2, -10 * s) * Math.sin(((s - r) * i) / e) + 1;
                };
            }),
            (t.elasticOut = t.getElasticOut(1, 0.3)),
            (t.getElasticInOut = function (t, e) {
                var i = 2 * Math.PI;
                return function (s) {
                    var r = (e / i) * Math.asin(1 / t);
                    return (s *= 2) < 1 ? t * Math.pow(2, 10 * (s -= 1)) * Math.sin(((s - r) * i) / e) * -0.5 : t * Math.pow(2, -10 * (s -= 1)) * Math.sin(((s - r) * i) / e) * 0.5 + 1;
                };
            }),
            (t.elasticInOut = t.getElasticInOut(1, 0.3 * 1.5)),
            (createjs.Ease = t);
    })(),
    (this.createjs = this.createjs || {}),
    (function () {
        "use strict";
        function t() {
            throw "MotionGuidePlugin cannot be instantiated.";
        }
        var e = t;
        (e.priority = 0),
            (e.ID = "MotionGuide"),
            (e.install = function () {
                return createjs.Tween._installPlugin(t), createjs.Tween.IGNORE;
            }),
            (e.init = function (t, i, s) {
                "guide" == i && t._addPlugin(e);
            }),
            (e.step = function (t, i, s) {
                for (var r in s)
                    if ("guide" === r) {
                        var n = i.props.guide,
                            a = e._solveGuideData(s.guide, n);
                        n.valid = !a;
                        var o = n.endData;
                        if ((t._injectProp("x", o.x), t._injectProp("y", o.y), a || !n.orient)) break;
                        var h = void 0 === i.prev.props.rotation ? t.target.rotation || 0 : i.prev.props.rotation;
                        if (((n.startOffsetRot = h - n.startData.rotation), "fixed" == n.orient)) (n.endAbsRot = o.rotation + n.startOffsetRot), (n.deltaRotation = 0);
                        else {
                            var c = void 0 === s.rotation ? t.target.rotation || 0 : s.rotation,
                                u = c - n.endData.rotation - n.startOffsetRot,
                                l = u % 360;
                            switch (((n.endAbsRot = c), n.orient)) {
                                case "auto":
                                    n.deltaRotation = u;
                                    break;
                                case "cw":
                                    n.deltaRotation = ((l + 360) % 360) + 360 * Math.abs((u / 360) | 0);
                                    break;
                                case "ccw":
                                    n.deltaRotation = ((l - 360) % 360) + -360 * Math.abs((u / 360) | 0);
                            }
                        }
                        t._injectProp("rotation", n.endAbsRot);
                    }
            }),
            (e.change = function (t, i, s, r, n, a) {
                var o = i.props.guide;
                if (o && i.props !== i.prev.props && o !== i.prev.props.guide)
                    return ("guide" === s && !o.valid) || "x" == s || "y" == s || ("rotation" === s && o.orient) ? createjs.Tween.IGNORE : void e._ratioToPositionData(n, o, t.target);
            }),
            (e.debug = function (t, i, s) {
                t = t.guide || t;
                var r = e._findPathProblems(t);
                if ((r && console.error("MotionGuidePlugin Error found: \n" + r), !i)) return r;
                var n = t.path,
                    a = n.length;
                for (i.save(), i.lineCap = "round", i.lineJoin = "miter", i.beginPath(), i.moveTo(n[0], n[1]), u = 2; a > u; u += 4) i.quadraticCurveTo(n[u], n[u + 1], n[u + 2], n[u + 3]);
                (i.strokeStyle = "black"), (i.lineWidth = 4.5), i.stroke(), (i.strokeStyle = "white"), (i.lineWidth = 3), i.stroke(), i.closePath();
                var o = s.length;
                if (s && o) {
                    var h = {},
                        c = {};
                    e._solveGuideData(t, h);
                    for (var u = 0; o > u; u++)
                        (h.orient = "fixed"),
                            e._ratioToPositionData(s[u], h, c),
                            i.beginPath(),
                            i.moveTo(c.x, c.y),
                            i.lineTo(c.x + 9 * Math.cos(0.0174533 * c.rotation), c.y + 9 * Math.sin(0.0174533 * c.rotation)),
                            (i.strokeStyle = "black"),
                            (i.lineWidth = 4.5),
                            i.stroke(),
                            (i.strokeStyle = "red"),
                            (i.lineWidth = 3),
                            i.stroke(),
                            i.closePath();
                }
                return i.restore(), r;
            }),
            (e._solveGuideData = function (t, i) {
                var s;
                if ((s = e.debug(t))) return s;
                var r = (i.path = t.path);
                (i.orient = t.orient), (i.subLines = []), (i.totalLength = 0), (i.startOffsetRot = 0), (i.deltaRotation = 0), (i.startData = { ratio: 0 }), (i.endData = { ratio: 1 }), (i.animSpan = 1);
                var n,
                    a,
                    o,
                    h,
                    c,
                    u,
                    l,
                    d,
                    _,
                    p = r.length,
                    f = {};
                for (n = r[0], a = r[1], l = 2; p > l; l += 4) {
                    (o = r[l]), (h = r[l + 1]), (c = r[l + 2]), (u = r[l + 3]);
                    var g = { weightings: [], estLength: 0, portion: 0 },
                        m = n,
                        v = a;
                    for (d = 1; 10 >= d; d++) {
                        e._getParamsForCurve(n, a, o, h, c, u, d / 10, !1, f);
                        var T = f.x - m,
                            b = f.y - v;
                        (_ = Math.sqrt(T * T + b * b)), g.weightings.push(_), (g.estLength += _), (m = f.x), (v = f.y);
                    }
                    for (i.totalLength += g.estLength, d = 0; 10 > d; d++) (_ = g.estLength), (g.weightings[d] = g.weightings[d] / _);
                    i.subLines.push(g), (n = c), (a = u);
                }
                _ = i.totalLength;
                var E = i.subLines.length;
                for (l = 0; E > l; l++) i.subLines[l].portion = i.subLines[l].estLength / _;
                var y = isNaN(t.start) ? 0 : t.start,
                    S = isNaN(t.end) ? 1 : t.end;
                e._ratioToPositionData(y, i, i.startData), e._ratioToPositionData(S, i, i.endData), (i.startData.ratio = y), (i.endData.ratio = S), (i.animSpan = i.endData.ratio - i.startData.ratio);
            }),
            (e._ratioToPositionData = function (t, i, s) {
                var r,
                    n,
                    a,
                    o,
                    h,
                    c = i.subLines,
                    u = 0,
                    l = t * i.animSpan + i.startData.ratio;
                for (n = c.length, r = 0; n > r; r++) {
                    if (u + (o = c[r].portion) >= l) {
                        h = r;
                        break;
                    }
                    u += o;
                }
                void 0 === h && ((h = n - 1), (u -= o));
                var d = c[h].weightings,
                    _ = o;
                for (n = d.length, r = 0; n > r && !(u + (o = d[r] * _) >= l); r++) u += o;
                (h = 4 * h + 2), (a = r / 10 + ((l - u) / o) * 0.1);
                var p = i.path;
                return (
                    e._getParamsForCurve(p[h - 2], p[h - 1], p[h], p[h + 1], p[h + 2], p[h + 3], a, i.orient, s),
                    i.orient && (t >= 0.99999 && 1.00001 >= t && void 0 !== i.endAbsRot ? (s.rotation = i.endAbsRot) : (s.rotation += i.startOffsetRot + t * i.deltaRotation)),
                    s
                );
            }),
            (e._getParamsForCurve = function (t, e, i, s, r, n, a, o, h) {
                var c = 1 - a;
                (h.x = c * c * t + 2 * c * a * i + a * a * r), (h.y = c * c * e + 2 * c * a * s + a * a * n), o && (h.rotation = 57.2957795 * Math.atan2((s - e) * c + (n - s) * a, (i - t) * c + (r - i) * a));
            }),
            (e._findPathProblems = function (t) {
                var e = t.path,
                    i = (e && e.length) || 0;
                if (6 > i || (i - 2) % 4) {
                    var s = "\tCannot parse 'path' array due to invalid number of entries in path. ";
                    return (
                        (s += "There should be an odd number of points, at least 3 points, and 2 entries per point (x & y). "),
                        (s += "See 'CanvasRenderingContext2D.quadraticCurveTo' for details as 'path' models a quadratic bezier.\n\n") + "Only [ " + i + " ] values found. Expected: " + Math.max(4 * Math.ceil((i - 2) / 4) + 2, 6)
                    );
                }
                for (var r = 0; i > r; r++) if (isNaN(e[r])) return "All data in path array must be numeric";
                var n = t.start;
                if (isNaN(n) && void 0 !== n) return "'start' out of bounds. Expected 0 to 1, got: " + n;
                var a = t.end;
                if (isNaN(a) && void 0 !== a) return "'end' out of bounds. Expected 0 to 1, got: " + a;
                var o = t.orient;
                return o && "fixed" != o && "auto" != o && "cw" != o && "ccw" != o ? 'Invalid orientation value. Expected ["fixed", "auto", "cw", "ccw", undefined], got: ' + o : void 0;
            }),
            (createjs.MotionGuidePlugin = t);
    })(),
    (this.createjs = this.createjs || {}),
    (function () {
        "use strict";
        var t = (createjs.TweenJS = createjs.TweenJS || {});
        (t.version = "1.0.0"), (t.buildDate = "Thu, 12 Oct 2017 16:34:05 GMT");
    })();
