goog.provide('CORE.ANIMATE');
goog.require('CORE.PAINT');
goog.require('CORE');
goog.require('INTERFACE');
goog.require('CONFIG');

//todo:
//3d accellerator handling!
//weak map (garbage collection)
//setimmediate observer
//storing values in extra array which is referenced with an ID as property on the dom element => VALUES[element.id]
//shortcuts
//switching metrics (% to px)
//controlling
//effects
//scrolled-based animations
//game engine

/*jslint plusplus:true*/
/*jslint newcap:true*/
/*jslint nomen:true*/
/*jslint vars:true*/
/*jslint white:true*/
/*jslint sub:true*/


//------------------------------------------------------------------------------

/**
 * @interface
 * @param {HTMLElement} obj
 * @param {string} style
 * @param {CSSStyleDeclaration|Object} css
 * @param {number} from
 * @param {number|string} to
 * @param {string} metric
 * @param {number} duration
 * @param {string} easeStr
 * @param {Array.<number>} ease
 * @param {number} RES
 * @param {number} start
 * @param {Function|undefined} callback
 * @param {Function|undefined} step
 * @public
 */
function FATJOB_CLASS(

	//id,
	obj,
	style,
	css,
	from,
	to,
	//val,
	metric,
	//metric_type,
	duration,
	easeStr,
	ease,
	RES,
	start,
	callback,
	step
	//checkkey,
	//DIFF,

){};
/**
 * @param {number} time
 * @this {FATJOB_CLASS}
 * @return {boolean}
 */
FATJOB_CLASS.prototype.animate = function(time){};
/**
 * @param {string} tmp
 * @param {string} to
 */
FATJOB_CLASS.prototype.colorHandler = function(tmp, to){};

//------------------------------------------------------------------------------

/**
 * @interface
 * @public
 */
function FAT_CLASS(){

	/**
	 * @type {boolean}
	 */
	this.isRender;
	/**
	 * @type {boolean}
	 */
	this.EXEC;
};


//------------------------------------------------------------------------------


/**
 * @interface
 * @param {HTMLCanvasElement=} canvas
 * @param {number=} width
 * @param {number=} height
 * @param {boolean=} useOffscreen
 * @public
 */

function FAT_CANVAS_CLASS(

	canvas,
	width,
	height,
	useOffscreen

){};
/**
 * @param {FAT_SHAPE_CLASS} obj
 */
FAT_CANVAS_CLASS.prototype.add = function(obj){};
/**
 * @param {number} time
 */
FAT_CANVAS_CLASS.prototype.render = function(time){};

//------------------------------------------------------------------------------

/**
 * @interface
 * @param {CSSStyleDeclaration} css
 * @param {string} style
 * @param {string|number} val
 * @public
 */
function CSSJOB_CLASS(css, style, val){
	/**
	 * @type {CSSStyleDeclaration|Object}
	 */
	this.css;
	/**
	 * @type {string}
	 */
	this.style;
	/**
	 * @type {string|number}
	 */
	this.val;
};

CSSJOB_CLASS.prototype.set = function(){};

//------------------------------------------------------------------------------

/**
 * @interface
 * @param {number=} x
 * @param {number=} y
 * @param {number=} width
 * @param {number=} height
 * @param {string=} fillStyle
 * @param {number=} lineWidth
 * @param {string=} strokeStyle
 * @param {boolean=} useBuffer
 * @public
 */

function FAT_SHAPE_CLASS(

	x,
	y,
	width,
	height,
	fillStyle,
	lineWidth,
	strokeStyle,
	useBuffer
){};
/**
 * @param {number} x
 * @param {number} y
 */
FAT_SHAPE_CLASS.prototype.moveTo = function(x, y){};
/**
 * @param {number} x
 * @param {number} y
 */
FAT_SHAPE_CLASS.prototype.moveBy = function(x, y){};
/**
 * @param {number} w
 * @param {number} h
 */
FAT_SHAPE_CLASS.prototype.resize = function(w, h){};
/**
 * @param {CanvasRenderingContext2D} context
 */
FAT_SHAPE_CLASS.prototype.draw = function(context){};



/**!
* @preserve FAT v1.2 - Fast Animation Tool
* Copyright (c) 2014-2015 JS Pro Tools, http://jsprotools.com
* Author: Thomas Wilkerling
* Licence: JS Pro Tools Licence
*/

(function(){

    /**
     * @implements {FAT_CLASS}
     * @this {FAT}
     */

    var FAT = {

        EXEC: 0,
        RES: Math.max(screen.width, screen.height),
        raf: window.requestAnimationFrame ? true : false,
        force3D: false,
        isRender: false
    };

	var FAT_EASE = {

        /**
         * @type {function(number, number, number, number):number}
         */
        'easeLinear': function(t, b, c, d) { return (c * (t/d) + b); },

        /**
         * @type {function(number, number, number, number):number}
         */
        'easeOutQuad': function(t, b, c, d) { return (-c *(t/=d)*(t-2) + b); }
	};

    /**
     * @const
     */

    var FAT_EASING = (function(){

        /**
         * @constructor
         * @const
         * @param {number} RES
         */

        function FAT_EASING(RES){

            this.RES = RES;// * (DWCORE.MOBILEDEVICE?1:2);

            /**
              * @const
              * @lends {EASE}
              * @param {string} ease
              * @return {Array.<number>|Int16Array.<number>}
              */
            this.easePrefetch = function(ease) {

                /**
                 * @type {number}
                 * @const
                 */
                var RES = this.RES;

                /**
                 * @type {Array.<number>|Int16Array.<number>}
                 * @const
                 */
                var arr = (typeof Int16Array === 'undefined' ? new Array(RES) : new Int16Array(RES));

                /**
                 * @lends {EASE.easings}
                 */

                var fn_ease = FAT_EASE[ease] || FAT_EASE['easeOutQuad'];

                var i = 0;

                while(i < RES) {

                    arr[i] = (fn_ease(i, 0, 100, RES)/* + 0.1*/) * 10 | 0;
                    i++;
                }

                return arr;
            };

            /**
              * @const
              * @lends {EASE}
              * @param {string} ease
              * @return {Array.<number>}
              */
            this.init = function(ease){

                return (this[ease] || (this[ease] = this.easePrefetch(ease)));
            };
        }

        return new FAT_EASING(Math.max(screen.width, screen.height));

    }());

	function FAT_addEase(key, fn) {

        return (FAT_EASE[key] = fn);
    };

    /* TODO: NEW CONFIG CLASS SHARED AS PROTOTYPE */

    /**
     * @constructor
     * @implements {FATJOB_CLASS}
     * @this {FATJOB}
     */

    function FATJOB(

        //id,
        obj,
        style,
        css,
        from,
        to,
        //val,
        metric,
        //metric_type,
        duration,
        easeStr,
        ease,
        RES,
        //start,
        callback,
        step
    ){

        var _this = this;

        //_this.id = id;
        _this.obj = obj;
        _this.style = style;
        _this.css = css;
        _this.from = from;
        _this.to = to;

        _this.VAL = from;
        _this.metric = metric;
        _this.metric_type = (metric.length === 0 ? 0 : (metric /*.charCodeAt(0) === 37*/ === '%' ? 1 : 2));
        _this.duration = duration;
        _this.easeStr = easeStr;
        _this.ease = ease;
        _this.start = 0;
        _this.callback = callback /*? function(){ callback.call(_this.obj); } :*/;
        _this.step = step;
        _this.checkkey = 'anim_' + style;
        _this.DIFF = (to - from) / 100;
        _this.RES = RES / duration;
        _this.dir = true;
        _this.pause = false;
    }

    FATJOB.prototype.animate = (

    /**
     * @override
     * @this {FATJOB_CLASS}
     * @param {number} time
     * @return {boolean}
     */

    function(/*job,*//*JOB,*/ /*RENDER_STACK,*/ time/*, arr_ease, fn_css*/){

        /**
         * @type {FATJOB_CLASS}
         * @const
         */
        var _this = this;

        var duration    = _this.duration;
        var style       = _this.style;
        var metric_type = _this.metric_type;

        //var _this = this;

        var stamp = Math.max(time - (_this.start || (_this.start = time)), 0);

        if(stamp  < duration){

            //todo: fn_setVal

            if(_this.color) {

                var curValR	= (_this.DIFF_r * _this.ease[(_this.RES * stamp) + 0.5 | 0] + _this.old_r) | 0;
                var curValG	= (_this.DIFF_g * _this.ease[(_this.RES * stamp) + 0.5 | 0] + _this.old_g) | 0;
                var curValB	= (_this.DIFF_b * _this.ease[(_this.RES * stamp) + 0.5 | 0] + _this.old_b) | 0;

                //console.log('#' +  _this.hexArr[curValG] + _this.hexArr[curValB]);

                //if(_this.VAL_r !== curValR || _this.VAL_g !== curValG || _this.VAL_b !== curValB) {

                    //_this.css[style] = '#' + _this.hexArr[(_this.VAL_r = curValR)] + _this.hexArr[_this.VAL_g = curValG] + _this.hexArr[_this.VAL_b = curValB]; //'rgb('+curValR+','+curValG+','+curValB+')';
                    //_this.css[style] = 'rgb('+curValR+','+curValG+','+curValB+')';
                    //_this.fps++;
                //}
            }
            else {


                //var curVal = _this.calc(_this.DIFF, _this.RES, stamp, _this.from);

                var curVal = _this.DIFF * _this.ease[(_this.RES * stamp | 0)] / 10 + _this.from;
                //var curVal = _this.easings[DATA__this[/*ease*/8]](stamp, DATA__this[/*from*/3], DATA__this[/*to*/4] - DATA__this[/*from*/3], duration);

                curVal = (

                    metric_type === 0 ? // --> 0-1

                        ((curVal * 100 + 0.5) | 0) / 100
                        // ---> *0.01 will produce period numbers!
                    :

                        metric_type === 1 ? // --> %

                            ((curVal * 10 + 0.5) | 0) / 10
                        :

                            //(curVal / 2 + 0.5 | 0) * 2
                            curVal + 0.5 | 0
                );


                //if(_this.style != 'opacity') console.log(curVal);
//---->todo new object

                if(_this.VAL !== curVal) {


                    //var old_css_text = _this.css.cssText;

                    //for(var xy = 0; xy < 250; xy++) {

                        //_this.css.cssText = 'color:#fff; border:0; opacity:1; color:#fff; border:0; opacity:1;';   /*getBoundingClientRect()*/;
                        /*
                        _this.css.color= '#fff';
                        _this.css.border= '0';
                        _this.css.opacity= '1';
                        _this.css.color= '#fff';
                        _this.css.border= '0';
                        _this.css.opacity= '1';
                        */
                    //}

                    //_this.css.cssText = old_css_text;
                    //


                    //console.log(_this.obj.scrollLeft);
                    //console.log(_this.obj.offsetLeft);
                    //console.log(_this.obj.clientLeft);

                    //offsetLeft
                    //DATA__this[/*css*/2].cssText += '; ' + style + ': ' + (DATA__this[/*VAL*/5] = curVal) + metric;
                    //DATA__this[/*css*/2].setProperty(style, (DATA__this[/*VAL*/5] = curVal) + metric, '');


                //var css = Object.create(window.getComputedStyle(_this.obj, null));
                //for(var key in _this.css) {

                    //_this.css.removeProperty('color');
                    //_this.css.removeAttribute(key);
                //}
                //console.log(_this.css);

                //var cssValue = Object.create( _this.css.getPropertyCSSValue(style));
                //var cssValue =  _this.css.getPropertyCSSValue(style);
        //console.log(cssValue.cssText);

                //for(var xy = 0; xy < 2500; xy++)  {

                    //cssValue.cssText;
                    //var css = _this.obj.style;
                    //var VAL = _this.css.left;
                //}

                    if(style === 'scrollTop') {

                        _this.obj.scrollTop = _this.VAL = curVal;
                    }
                    else {

                        _this.css[style] = (_this.VAL = curVal) + _this.metric;
                    }
                    //css.ruleIndex[0] = obj.id;
                    //_this.css.rules[0] = '{' + style +':'+ (_this.VAL = curVal) + _this.metric +';}';
                    //console.log(_this.css);
                    //_this.obj.style[style]='';
                     //_this.css.rules[0].cssText='#'+_this.obj.id+'{'+style+':'+((_this.VAL = curVal) + _this.metric)+';}';
                     //console.log(window.getComputedStyle(_this.obj, null));
                    //for(var xy = 0; xy < 2500; xy++) _this.cssText='left:0px';


                //console.log(_this.css[0]);
                    /*
                    var firstsheet=document.styleSheets[1];
                    var therules=firstsheet.cssRules? firstsheet.cssRules: firstsheet.rules;
                    var tmp = therules[1].style;


                    var css = _this.css;
                    var css_len = _this.css.length;
                    */

                    //for(var xy = 0; xy < 2500; xy++) tmp.backgroundColor="yellow";

                    //console.log(_this.runtimeStyle);

    //var fn = removeToInsertLater(_this.obj);


        //fn();
                    //
                    //window.getComputedStyle(_this, null)[style];


                    //DATA__this[/*css*/2][style] = (DATA__this[/*VAL*/5] = curVal) + metric;

                    /*for(var xy = 0; xy < 500; xy++)*/
                    //RENDER_STACK[RENDER_STACK.length] = new _this.CSSPROP(_this.css, style, (_this.VAL = curVal) + metric);

                    //_this.fps++;
                }
            }

            //_this.runs++;

            /* CALL STEP FUNCTION AND PASS CURRENT PROGRESS STATE AS PARAMETER */

            if(_this.step) _this.step(curVal);

            //suggestion:
            //_this.step.call(_this, curVal);
        }
        else {

            //console.log('time elapsed');

            //window.clearInterval(_this.timer);

            //DWCORE_fn.removeArrayVal(this.ANISTACK, _this.id);

            //_CSS(_this.obj, _this.style, _this.to + _this.metric);



            //delete DWCORE.ANISTACK[_this.obj];



            if(_this.step) _this.step(_this.to);

            if(_this.callback){

                //console.log(_this.start);

                var loop_check = _this.start;
                var value_check = _this.VAL;
                //if(callback_len===0) callback_stack = [];
                //callback_stack[callback_len] = stack[i].callback;
                //callback_len++;

                /* CALL COMPLETE FUNCTION AND PASS CURRENT ELEMENT AS {THIS} */

                _this.callback.call(_this.obj);

                /* CHECK AGAINST SELF LOOPING */

                if(_this.start !== loop_check) {

                    //console.log('LOOP FOUND');
                    return false;
                }

                /* CHECK AGAINST STYLE CHANGES IN CALLBACK */

                else if(_this.VAL !== value_check) {

                    _this.obj[_this.checkkey] = '';

                    return true;
                }
            }

            if(_this.color) {

                //if(_this.VAL_r !== _this.color_r || _this.VAL_g !== _this.color_g || _this.VAL_b !== _this.color_b)

                    //_this.css[style] = '#' + _this.hexArr[_this.color_r] + _this.hexArr[_this.color_g] + _this.hexArr[_this.color_b]; //_this.css[style] = 'rgb('+curValR+','+curValG+','+curValB+')';

                    //_this.css[style] = 'rgb('+_this.color_r+','+_this.color_g+','+_this.color_b+')';
            }
            else{

                if(_this.VAL !== _this.to)
                //DATA__this[/*css*/2].cssText += '; ' + style + ': ' + DATA__this[/*to*/4] + metric;
                //DATA__this[/*css*/2].setProperty(style, DATA__this[/*to*/4] + metric, '');

                if(style === 'scrollTop') {

                    _this.obj.scrollTop = _this.to;
                }
                else{

                    _this.css[style] = _this.to + _this.metric;
                }

                //console.log("END");
                //console.log(_this.css[style]);

                //RENDER_STACK[RENDER_STACK.length] = new _this.CSSPROP(_this.css, style, (_this.VAL = _this.to) + metric);

            }

            _this.obj[_this.checkkey] = '';

            //console.log('dupe check false');

            return true;
        }

        return false;
    });

    /**
     * @override
     * @this {FATJOB_CLASS}
     */

    FATJOB.prototype.colorHandler = function(tmp, to){

        var isColor		= false;
        var _this 		= this;

        if(tmp.charCodeAt(0) === 35){ // charCode(35) = '#' ---> color, backgroundColor, borderColor

            var old_r, old_g, old_b;

            isColor = true;

            //if(_this.css.charAt(0) === '#'){

            if(tmp.length === 4){

                old_r = tmp.charAt(1);
                old_g = tmp.charAt(2);
                old_b = tmp.charAt(3);

                old_r = ("0x" + old_r | 0) * 0x11;
                old_g = ("0x" + old_g | 0) * 0x11;
                old_b = ("0x" + old_b | 0) * 0x11;
            }
            else{

                old_r = "0x" + tmp.substring(1, 3) | 0;
                old_g = "0x" + tmp.substring(3, 5) | 0;
                old_b = "0x" + tmp.substring(5, 7) | 0;

                console.log(tmp);
            }
        }
        else if(CORE.count(tmp, 'rgb')){

            var old_r, old_g, old_b;

            var rgba = tmp.split("(")[1].split(")")[0].split(",");

            isColor = true;

            old_r = rgba[0] | 0;
            old_g = rgba[1] | 0;
            old_b = rgba[2] | 0;

            //console.log(old_r);
        }

        if(isColor){

            //-------------

            if(to.charCodeAt(0) === 35){ // charCode(35) = '#' ---> color, backgroundColor, borderColor

                var color_r, color_g, color_b;

                //isColor = true;

                if(to.length === 4){

                    color_r = to.charAt(1);
                    color_g = to.charAt(2);
                    color_b = to.charAt(3);

                    color_r = ("0x" + color_r | 0) * 0x11;
                    color_g = ("0x" + color_g | 0) * 0x11;
                    color_b = ("0x" + color_b | 0) * 0x11;
                }
                else{

                    color_r = "0x" + to.substring(1, 3) | 0;
                    color_g = "0x" + to.substring(3, 5) | 0;
                    color_b = "0x" + to.substring(5, 7) | 0;
                }
            }
            else if(CORE.count(to, 'rgb')){

                var color_r, color_g, color_b;

                //isColor = true;

                rgba = to.split("(")[1].split(")")[0].split(",");

                color_r = rgba[0];
                color_g = rgba[1];
                color_b = rgba[2];
            }

            //-------------

            _this.color_r	= color_r;
            _this.color_g	= color_g;
            _this.color_b	= color_b;
            _this.old_r		= _this.VAL_r = old_r;
            _this.old_g		= _this.VAL_g = old_g;
            _this.old_b		= _this.VAL_b = old_b;
            _this.DIFF_r	= (color_r - old_r) / 100;
            _this.DIFF_g	= (color_g - old_g) / 100;
            _this.DIFF_b	= (color_b - old_b) / 100;

            _this.color		= true;

            /**
             * @lends {FATJOB.prototype}
             * @param {Array.<string>} arr
             * @return {Array.<string>}
             * @const
             */

            _this.constructor.prototype.hexArr = _this.constructor.prototype.hexArr || (

                function(arr){

                    var i = 0;

                    while(i < 256) {

                        var str = i.toString(16).toUpperCase();
                        if(str.length === 1) str = '0' + str;
                        arr[i] = str;
                        i++;
                    }

                    return arr;

                }({})
            );
        }
    };

    /*
     * Stack with Animation Jobs
     * type {Array.<FATJOB_CLASS>}
     */

    var FAT_ANISTACK = [];

    /*
     * Stack with Paint Jobs
     * type {Array.<Function>}
     */
    var FAT_PAINTSTACK = [];

    /*
     * Stack with Timers
     * type {Array.<number>}
     */
    var FAT_TIMERSTACK = [];

    /*
     * Stack with Timers
     * type {Array.<number>}
     */
    var FAT_TIMERINDEX = {};

    /**
     * Stack with CSS Jobs
     * @return {Array.<CSSJOB_CLASS>}
     */
    var FAT_CSSSTACK = [];

    /**
     * Stack with Canvas Render Jobs
     * @return {Array.<FAT_CANVAS_CLASS>}
     */
    var FAT_CANVASSTACK = [];

    /**
     * @constructor
     * @implements {CSSJOB_CLASS}
     */

    function CSSJOB(css, style, val){

        var _this = this;

        _this.css = css;
        _this.style = style;
        _this.val = val;
    }

    CSSJOB.prototype.set = function(){

        var _this = this;

        _this.css[_this.style] = _this.val;
    };


	function FAT_LOOPER(time){


        /* REFERENCE TO THE ANIMATION STACK */

        //var STACK = ANISTACK;

        /* CACHED LOOP VALUE */

        var len = FAT_ANISTACK.length;

        /* CHECK ANIMATION STACK LENGTH FOR REGISTERED JOBS */

        //var callback_len = 0;

        if(len) {


            //DWCORE.FAT.optimizeFramerate(_this.runs, duration);

            /* LOOP OVER ANIMATION JOBS, LIMITED BY MAXSTEPS */

            var i = 0;//lastpos;

            //var RENDER_STACK = _this.RENDER_STACK;
            //var fn_animate = _this.animate;

            //var JOB;
            //var steps=0;


            //while(i < maxsteps){
            while(i < len){ //if(steps++ >= maxsteps) break;

                //if(steps++ >= 2000) break;

                /* CALL ANIMATION PROCESS AND GETS THE FPS VALUE AFTER THE ANIMATION HAS FINISHED */

                //JOB = stack[i];

                if(/*typeof JOB === 'undefined' || JOB === null || JOB.obj === null ||*/ FAT_ANISTACK[i].animate(/*RENDER_STACK,*/ time)  /* || _this.pause*/) {

                    /* ADJUST AND OPTIMIZE FRAMERATE FOR BETTER PERFORMANCE */

                    //_this['SLEEP'] = (fps >= 55 ? 0 : opValues[fps]); //DWCORE.FAT.optimizeFramerate(_this.runs, duration);

                    /* 1. REMOVE JOB: SET THE LAST ITEM IN ANIMATION STACK TO THE CURRENT INDEX */
                    /* 2. ADJUST LOOP VALUES */

                    //STACK[i] = null;
                    FAT_ANISTACK[i] = void 0;

                    len--;
                    FAT_ANISTACK.splice(i, 1);
                }

                /* IMPORTANT {ELSE}: DONT SKIP SHIFTED JOBS */

                else i++;
            }
        }
    };



	function FAT_renderFrames(_time){

        /* CHECK VALUE FOR REGISTERED TIMER */
        /* REQUEST NEXT ANIMATION FRAME */

        FAT.EXEC = CORE.paint(FAT_renderFrames);

        //if(FAT.EXEC) /*FAT.EXEC =*/ cancelFrame(FAT.EXEC);

        /* PUBLIC RENDER SWITCH TO AVOID ADDITIONAL STACKING DURING ANIMATION FRAME PROCESS */

        FAT.isRender = true;

        //todo: time via polyfill?
        _time || (_time = CORE.time['now']());

        /* 2. RENDER CSS STACK IN ORDER */

        var len;

        if(len = FAT_CSSSTACK.length){

            var i = 0, css_job;

            while(i < len){

                FAT_CSSSTACK[i++].set();

                //CSSSTACK[i++].set();
                //css_job = CSSSTACK[i++];//CSSSTACK[i];
                //_CSS(css_job.obj, css_job.style, css_job.val);

                //css_job.css[css_job.style] = css_job.val;
                //if(css_job.css[css_job.style] !== css_job.val) css_job.css[css_job.style] = css_job.val;


                /* CLEAR ALL STORED STYLE VALUES (SYNC) */

                //if(typeof css_job.obj['anim_'+css_job.style] !== 'undefined') css_job.obj['anim_' + css_job.style].VAL = void 0;
                //css_job.obj.fat_css = void 0;

                //i++;
            }

            //while(i--) CSSSTACK.pop();
            //CSSSTACK = ASAP['modules'][FAT_CSSSTACK] = [];
            while(i > 0) FAT_CSSSTACK[--i] = void 0;
            FAT_CSSSTACK.length = 0; // http://jsperf.com/array-destroy/162
        }

        /* 1. EXECUTE PAINT STACK IN ORDER */

        if(len = FAT_PAINTSTACK.length){

            //var len = PAINTSTACK.length;

            //while(i < count){

                //paint_job = PAINTSTACK[i];

                /* PASSING TIME TO PAINT */

                //PAINTSTACK[i++](_time);

                //i++;
            //}

            //while(i--) PAINTSTACK.pop();
            //PAINTSTACK = ASAP['modules'][FAT_PAINTSTACK] = [];
            //while(i) PAINTSTACK[--i] = void 0;
            //PAINTSTACK.length = 0; // http://jsperf.com/array-destroy/162
            while(len--) {

                var tmpObj = FAT_PAINTSTACK.shift();
                if(typeof tmpObj === 'function') tmpObj(_time);
            }
        }

        /* 3. RENDER ANIMATION STACK */

        //var canvasObjects = 0;

        if(FAT_ANISTACK.length){

            FAT_LOOPER(_time);

            if(len = FAT_CANVASSTACK.length){

                /* 4. DRAW CANVAS RENDER FUNCTIONS */

                for(var i = 0; i < len; i++){

                    /* PASSING TIME TO RENDER FUNCTION, RETURNS COUNT */

                    /*canvasObjects +=*/ /** @type {Array.<FAT_CANVAS_CLASS>} */ (FAT_CANVASSTACK)[i]['render'](_time);
                }
            }
        }

        //else FAT.EXEC = false;

        /* FINAL CHECK FOR NEW REQUESTED JOBS (BY PAINT OR ANIMATION CALLBACKS) */

        if(FAT_ANISTACK.length === 0 && FAT_CSSSTACK.length === 0 && FAT_PAINTSTACK.length === 0 /*&& canvasObjects === 0*/) {

            //FAT.EXEC = false;

            //if(FAT.EXEC) {

                FAT.EXEC = CORE.clear(FAT.EXEC);
                //FAT.EXEC = 0;
            //}
        }


        //else{

            //if(!FAT.EXEC) FAT.EXEC = renderFrames(_time);
        //}

        /* SET PUBLIC PROCESS SWITCH TO FALSE */

        FAT.isRender = false;
    };

    /**
     * @param {*} val
     * @returns {boolean}
     */

	var isStr = function(val){

	    return CORE.isType(val, 'string');
    };


    /**
     * @param {Array<(Node|null)>|Node|NodeList|null|string} selector
     * @param {string|Object} style
     * @param {string|number} val
     * @param {boolean=} force
     * @return void
     * @const
     */

    function FAT_CSS(selector, style, val, force){

        /**
         * FALLBACK TO BASIC FUNCTION IF:
         *
         * 1. PARAMETER "FORCE" (SWITCH TO FORCE FALLBACK)
         * 2. NO STYLE SETTER IS GIVEN (2 DIFFERENT PARAMETER STYLES)
         */

        /**
         * The target element which style has to change
         *
         * @type {Array<(Node|null)>|Node|NodeList|null|string}
         */

        var obj = (

            typeof selector === 'string' ?

                CORE.query(selector)
            :
                selector
        );

        if(force || typeof style === 'undefined' || /*val === true ||*/ (typeof val === 'undefined' && isStr(style))) { // --> typeof: val can be "0"

            return CORE.css(obj, style, val);
        }
        else{

            /* PREVENT STACKING DURING ANIMATION FRAME PROCESS */

            if(FAT.isRender) {

                /* PASS DURING ANIMATION RENDER PROCESS */

                CORE.css(obj, style, val);
            }
            else {

                /* ADD TO CSS RENDER STACK */

                /** CSSJOB_CLASS */

                if(isStr(style)){

                    FAT_CSSSTACK[FAT_CSSSTACK.length] = /** @type {CSSJOB_CLASS} */ (new CSSJOB(style === 'scrollTop' ? obj : obj.style, style, val));
                }
                else{

                    //https://jsperf.com/object-keys-vs-for-in-perf
                    var keys = Object.keys(/** @type {!Object} */ (style));

                    var css = obj.style;

                    for(i = 0; i < keys.length; i++) {

                        var tmp_1 = (keys[i] === 'scrollTop' ? obj : css)[keys[i]];
                        var tmp_2 = style[keys[i]];

                        if(/*typeof tmp_1 !== 'undefined' &&*/ tmp_1 !== tmp_2) {

                            FAT_CSSSTACK[FAT_CSSSTACK.length] = /** @type {CSSJOB_CLASS} */ (new CSSJOB(keys[i] === 'scrollTop' ? obj : css, keys[i], tmp_2));

                            //tmp_css[len++] = key;
                            //style[key] = tmp_2;
                        }
                    }
                }


                /* SWITCH: EXECUTION FLAG TO PREVENT MULTIPLE TIMERS */

                if(!FAT.EXEC){

                    /* SET EXECUTION FLAG */

                    //FAT.EXEC = true;

                    /* ASCHRON START TO COLLECT JOBS FIRST */

                    //window.setTimeout(function(){ requestFrame(renderFrames); }, 16);
                    FAT.EXEC = CORE.paint(FAT_renderFrames);
                }
            }



            /**
             * STORE CURRENT STYLE VALUES TO THE OBJECT TO PERFORM BETTER CHANGES IN A ROW
             * ---------------------------------------------------------------------------
             * THIS FEATURE INCREASE PERFORMANCE BY STORING STYLE VALUES IN ORDER OF:
             *
             * 1. STARTING NEW ANIMATIONS
             * 2. CALLBACK LOOPINGS
             * 3. TODO: DOUBLE STYLE CHECK
             * 4. TODO: NOT CHANGED STYLE CHECK
             *
             * THIS FEATURE HAS TO BE EXTENDED/INCLUDED TO THE "PAINT" METHOD
             */

             obj.fat_css || (obj.fat_css = {});

             var str_anim_style;

            /* HANDLE SINGLE STYLE */

            if(isStr(style) /*&& typeof val !== 'undefined'*/) {

                /* UPDATE CURRENT ANIMATIONS */

                //if(FAT.EXEC){

                    str_anim_style = 'anim_' + style;

                    //var FATJOB = obj['anim_' + style];

                    if(obj[str_anim_style]) {

                        /* PERFORMANCE HIT: STORING IS NOT NEEDED DURING ANIMATION ON SAME STYLE */

                        obj[str_anim_style].VAL = parseFloat(val);
                    }
                    //else {


                        /* STORE OR UPDATE SINGLE STYLE VALUE AS PARAMETER OF THE ELEMENT */
                        //TODO: FIX THIS LINE!!!!!!!!!!!!!
                        //else obj.fat_css[style] = parseFloat(val);

                    //}
                //}
                //else{

                    /* STORE OR UPDATE SINGLE STYLE VALUE AS PARAMETER OF THE ELEMENT */

                    //(obj.fat_css || (obj.fat_css = {}))[style] = val;
                //}
            }

            /* HANDLE MULTIPLE STYLES */

            else {

                //if(typeof obj.fat_css === 'undefined'){

                    /* STORE MULTIPLE STYLE VALUES AS PARAMETER OF THE ELEMENT */

                    //obj.fat_css = style;
                //}
                //else {

                    /* UPDATE STORED STYLE VALUES */

                    var keys = Object.keys(/** @type {!Object} */ (style));

                    for(var i = 0; i < keys.length; i++) {

                        var key = keys[i];

                        /* UPDATE CURRENT ANIMATIONS */

                        //if(FAT.EXEC){

                            str_anim_style = 'anim_' + key;

                            //var FATJOB = obj['anim_' + key];

                            if(obj[str_anim_style]) {

                                /* PERFORMANCE HIT: STORING IS NOT NEEDED DURING ANIMATION ON SAME STYLE */

                                obj[str_anim_style].VAL = parseFloat(style[key]);
                            }
                            //else{

                                /* STORE OR UPDATE SINGLE STYLE VALUE AS PARAMETER OF THE ELEMENT */

                            //TODO: FIX THIS LINE!!!!!!!!!!!!!
                            //else obj.fat_css[key] = parseFloat(style[key]);

                            //}
                        //}
                        //else {

                            /* STORE OR UPDATE SINGLE STYLE VALUE AS PARAMETER OF THE ELEMENT */

                            //(obj.fat_css || (obj.fat_css = {}))[key] = style[key];
                        //}
                    }
                //}
            }

            /* UPDATE CURRENT ANIMATIONS */

            /*
            if(FAT.EXEC){

                if(isStr(style)){

                    var FATJOB = obj['anim_' + style];

                    if(typeof FATJOB !== 'undefined') FATJOB.VAL = parseFloat(val);
                }
                else{

                    for(var key in style) {

                        var FATJOB = obj['anim_' + key];

                        if(typeof FATJOB !== 'undefined') FATJOB.VAL = parseFloat(style[key]);
                    }
                }
            }

            else {
            */
        }
    };

    /**
     * @param {Array<Node>|Node|NodeList|null} obj
     * @param {string} style
     * @param {string|number} to
     * @param {number|string|Function=} duration
     * @param {string|Function=} easeStr
     * @param {Function=} callback
     * @param {Function=} step
     * @return void
     */

     function FAT_handleJob(obj, style, to, /*start,*/ duration, easeStr, callback, step){

        /**
         * @type {number}
         * @const
         */
        var RES = FAT.RES;

        /**
         * @type {string}
         * @const
         */
        var checkkey = 'anim_' + style;

        /** @type {FATJOB_CLASS} */
        var cur_job = obj[checkkey];

        if(cur_job) {

            /*
             * ADDON: FAT-CSS-PLUS
             * -------------------
             * GET & CLEAR ALL STORED STYLE VALUES (SYNC)
             */

            var fat_css = obj.fat_css;

            if(fat_css && typeof fat_css[style] !== 'undefined'){ // --> typeof: fat_css[style] can be "0"

                cur_job.VAL = parseFloat(fat_css[style]);

                fat_css[style] = '';
            }
            //else tmp = getStyle(obj, css, style);

            //console.log("CURRENT STYLE");
            //console.log(cur_job.VAL);

            cur_job.from = from = cur_job.VAL/* = cur_job.to*//* = parseFloat(getStyle(cur_job.obj, cur_job.css, cur_job.style))*/;

            cur_job.to = to = isStr(to) ? parseFloat(to) : to;

            //console.log(from);
            //console.log(to);
            cur_job.duration = duration || (duration = 400);
            cur_job.start = 0; // --> reset start time to zero for lazy check

            if(cur_job.easeStr !== easeStr){

                cur_job.easeStr = easeStr;
                //cur_job.ease = void 0;
                cur_job.ease = FAT_EASING.init(easeStr);
            }


            cur_job.DIFF = (to - from) / 100;
            cur_job.RES = RES / duration;


            //cur_job.callback = void 0;
            cur_job.callback = callback /*? function(){ callback.call(this.obj); return void 0; } :*/ || false;

            //cur_job.step = void 0;
            cur_job.step = step || false;

        }
        else {

            var /** @type {CSSStyleDeclaration} */
                css = obj.style || /** @type {CSSStyleDeclaration} */ ({left:0, top:0, width:0, height:0}), // canvas addon + transform addon
                /** @type {string} */
                tmp,
                /** @type {number} */
                len,
                /** @type {number} */
                num,
                /** @type {number} */
                from,
                /** @type {string} */
                metric;

            /*
             * ADDON: FAT-CSS-PLUS
             * -------------------
             * GET & CLEAR ALL STORED STYLE VALUES (SYNC)
             */

            var fat_css = obj.fat_css;

            if(fat_css && typeof fat_css[style] !== 'undefined'){ // --> typeof: fat_css[style] can be "0"

                tmp = '' + fat_css[style];

                fat_css[style] = '';
            }
            else tmp = '' + CORE.getStyle(obj, style);

            if(tmp === 'auto') tmp = '0';

            //console.log("CURRENT STYLE");
            //console.log(tmp);


            //len = tmp.length;

            //var isStr_to = isStr(to);

            //if(isStr_to) {

                //_this.colorHandler(tmp, to);
            //}


            from			= (isStr(tmp) ? parseFloat(tmp) : tmp);
            metric			= tmp.substring((''+from).length); /* + ' !important'*/

/*
            if(isStr_to){

                 num		= parseFloat(to);
            }
            else num		= to;
*/

            tmp			= '' + to;
            to			= (isStr(to) ? parseFloat(to) : to);

            if(metric === '') {

                //len 		= tmp.length;
                metric		= tmp.substring((''+to).length); /* + ' !important'*/
            }


            //var metric_type = metric.length === 0 ? 0 : metric.charCodeAt(0) === 37 ? 1 : 2;



            //var checkkey = JOB.checkkey;



            //if(style === 'opacity' || _this.color)

            //if(len<5000) {

                //http://www.developerdrive.com/2012/03/coding-vendor-prefixes-with-javascript/

                if(!obj.force3D && FAT.force3D){

                    obj.force3D = true;

                    if(obj !== document.body && obj !== document.documentElement){

                        if(typeof css.transform !== 'undefined'){

                            var transform = CORE.getStyle(obj, 'transform');

                            (transform !== 'none' && transform !== '') || (css.backgroundPosition === 'fixed' || css.backgroundAttachment === 'fixed' || ((css.transform = 'translateZ(0)') && /*(css.backfaceVisibility = 'hidden') &&*/ (css.perspective = '1000')))
                        }
                        else if(typeof css.webkitTransform !== 'undefined'){

                            var transform = CORE.getStyle(obj, 'webkitTransform');

                            (transform !== 'none' && transform !== '') || (css.backgroundPosition === 'fixed' || css.backgroundAttachment === 'fixed' || ((css.webkitTransform = 'translateZ(0)') && /*(!css.backgroundImage || css.backgroundImage === '') && (css.webkitBackfaceVisibility = 'hidden') &&*/ (css.webkitPerspective = '1000')))
                        }
                    }
                }

            /* PUSH ANIMATION JOB TO STACK */

            //console.log("new job: "+JOB.id);

            //len = ANISTACK.length;
            /*_this.JOBSTACK[checkkey] =*/

            FAT_ANISTACK[FAT_ANISTACK.length] = obj[checkkey] = /** @type {FATJOB_CLASS} */ (new FATJOB(

                //len,
                obj,
                style,
                css,
                from,
                to,
                //from,
                metric,
                //metric_type,
                duration || 400,
                easeStr,
                FAT_EASING.init(easeStr),
                RES,
                /*start,*/
                callback  || false,
                step || false
                //checkkey,
                //(to - from) / 100,

            ));

            //console.log(obj[checkkey]);

            //ANISTACK.len++;

        }
    };

    /**
     * @param {Array<Node>|Node|NodeList|null} arg1
     * @param {string} arg2
     * @param {string|number} arg3
     * @param {number|string|Function=} arg4
     * @param {string|Function=} arg5
     * @param {Function=} arg6
     * @param {Function=} arg7
     * @constructor
     */

	function FAT_run(/* obj */ arg1, /* style|arr */ arg2, /* to */ arg3, /* duration */ arg4, /* easing */ arg5, /*callback */ arg6, /* step */ arg7){

        if(isStr(arg2)) {

            if(arg4 === 'fast') arg4 = 200;
            else if(arg4 === 'slow') arg4 = 800;

            if(arg5 && isStr(arg5)) {

                FAT_handleJob(arg1, arg2, arg3, /*start,*/ /** @type {number} */ (arg4), /** @type {string} */ (arg5), arg6, arg7);
            }
            else{

                FAT_handleJob(arg1, arg2, arg3, /*start,*/ /** @type {number} */ (arg4), 'easeOutQuad', /** @type {Function|null} */ (arg5), arg6);
            }
        }
        else {

            if(arg3 === 'fast') arg3 = 200;
            else if(arg3 === 'slow') arg3 = 800;

            if(arg4 && isStr(arg4)) {

                //var ease = EASE(arg4);

                for(var key in arg2){

                    //var tmpval = arg2[key];

                    //if(arg2.hasOwnProperty(key)){

                        FAT_handleJob(arg1, key, arg2[key], /*start,*/ /** @type {number} */ (arg3), /** @type {string} */ (arg4), /** @type {Function|null} */ (arg5), arg6);
                        arg5 = null;
                        arg6 = null;
                    //}
                }
            }
            else{

                //var ease = EASE('easeOutQuad');

                for(var key in arg2){

                    //var tmpval = arg2[key];

                    /*if(arg2.hasOwnProperty(key))*/
                    FAT_handleJob(arg1, key, arg2[key], /*start,*/ /** @type {number} */ (arg3), 'easeOutQuad', /** @type {Function|null} */ (arg4), /** @type {Function|null} */ (arg5));
                    arg4 = null;
                    arg5 = null;
                }
            }
        }


        if(!FAT.EXEC){

            //console.log('new timer installed');
            //FAT.EXEC = window.setTimeout(function(){

                FAT.EXEC = CORE.paint(FAT_renderFrames);

            //}, 16);
            //_this.requestFrame();

            //todo: collect first

        }
    };

	function FAT_clearPaint(timer_id){

        //if(timer_id < TIMERSTACK.length) {

            window.clearTimeout(FAT_TIMERSTACK[timer_id]);

            FAT_TIMERSTACK[timer_id] = 0;
        //}

        //TODO: empty it
        //TIMERSTACK.splice(timer_id, 1);
    };



    /**
     * @param {Function} fn
     * @param {number} delay
     * @param {HTMLElement|string|null=} element
     * @param {number=} pos
     * @return {number}
     */

    function FAT_paint(fn, delay, element, pos){

        var len = FAT_TIMERSTACK.length;

        if(element && isStr(element)) {

            pos = FAT_TIMERINDEX[element] || (FAT_TIMERINDEX[element] = len + 1);

            element = '';
        }
        else{

            /* CHECK VISIBLE STATE */

            pos = pos || (element ? element.paint_id || (element.paint_id = len + 1) : len + 1); // --> zero indicates non time out !!!
        }

        /* FILL GAP ON ZERO INDEX */

        if(pos === 1) {

            FAT_TIMERSTACK[0] = 0;
        }

        if(pos < len) {

            if(FAT_TIMERSTACK[pos]) {

                window.clearTimeout(FAT_TIMERSTACK[pos]);

                FAT_TIMERSTACK[pos] = 0;
            }
        }

        /* INSTALL TIMER FOR DELAYED PAINT CALL */

        if(delay > 0){

            //var pos = TIMERSTACK.length;

            FAT_TIMERSTACK[pos] = window.setTimeout(function(){

                /* RECALL PAINT TO CHECK VISIBILITY AFTER DELAY */

                FAT_paint(fn, -1, element, pos);

                //PAINTSTACK[PAINTSTACK.length] = fn;

                //if(FAT.EXEC === false){

                    //console.log('new timer installed');
                    //FAT.EXEC = true;
                    //_this.requestFrame();

                    //todo: collect first
                    //window.setTimeout(requestFrame(renderFrames), 16);
                //}

            }, delay === 1 ? 0 : delay);
        }

        /* DEFAULT PAINT CALL */

        else {

            //TODO: isVisible => isInViewport
            if(element /*&& !isVisible(element)*/) {

                /* SYNC: CLEAR INTERNAL TIMER */

                //if(typeof TIMERSTACK[pos] !== 'undefined')
                //}
                //else delay = 1000;
                //else pos = TIMERSTACK.length;

                //TODO: Collect inactive timers (prevent massive timeout inits)
                FAT_TIMERSTACK[pos] = window.setTimeout(function(){

                    FAT_paint(fn, delay, element, pos);

                }, 1000);

                //return pos;

                //else pos = element.paint_id || (element.paint_id = TIMERSTACK.length);
            }

            else if(delay === -1 && FAT.isRender){

                fn(CORE.time.now());
            }
            else{

                FAT_PAINTSTACK[FAT_PAINTSTACK.length] = fn;

                if(!FAT.EXEC){

                    //FAT.EXEC = true;

                    //console.log('new timer installed');
                    //FAT.EXEC = window.setTimeout(function(){

                        FAT.EXEC = CORE.paint(FAT_renderFrames);

                    //}, 16);
                    //_this.requestFrame();

                    //todo: collect first
                    //window.setTimeout(function(){

                        //requestFrame(renderFrames);

                    //}, 16);
                }
            }
        }

        return pos;
    };

	function FAT_move(

        /* obj */ arg1,
        /* style|arr */ arg2,
        /* to */ arg3,
        /* duration */ arg4,
        /* easing */ arg5,
        /* callback */ arg6,
        /* step */ arg7
    ){


        //window.requestAnimationFrame(

            //function(){

                //todo: performance test pass as argument array!!
                //http://jsperf.com/arguments/19
                //http://jsperf.com/passing-parameters-directly-vs-param-object/7

                var delay;
                var props = isStr(arg2) ? arg4 : arg3;

                if(typeof props === 'object'){

                    //console.log('PROPERTY OBJECT');

                    if(props['duration']) arg4 = props['duration'];
                    if(props['ease']) arg5 = props['ease'];
                    if(props['complete']) arg6 = props['complete'];
                    if(props['step']) arg7 = props['step'];
                    if(props['delay']) delay = props['delay'];

                    //TODO:
                    //if(typeof arg3.queue !== 'undefined') arg4 = arg3.duration;
                    //if(typeof arg3.start !== 'undefined') arg5 = arg3.easing;
                }

                var obj = isStr(arg1) ? CORE.query(arg1) : arg1;
                var style = arg2;

                var transform = (function() {

                         if (typeof style.WebkitTransform !== 'undefined') return "WebkitTransform";
                    else if (typeof style.MozTransform !== 'undefined') return "MozTransform ";
                    else if (typeof style.OTransform !== 'undefined') return "OTransform";
                    else if (typeof style.msTransform !== 'undefined') return "msTransform ";
                    else if (typeof style.WebkitTransform !== 'undefined') return "WebkitTransform";
                    else return "transform";

                })();

                var step = function(){

                    obj.style[transform] = "translate(" + (obj['anim_x'].to - obj['anim_x'].VAL) + "px, " + (obj['anim_y'].to - obj['anim_y'].VAL) + "px)";
                    arg6();
                };


                return FAT_paint(function(){

                    new FAT_run(

                        /* obj */ obj,
                        /* style|arr */ arg2,
                        /* to */ arg3,
                        /* duration */ arg4,
                        /* easing */ arg5,
                        /* callback */ step
                        /* step */
                    );

                }, delay);



                //return void 0
            //}
        //);

        //return void 0;
    };

	CORE.animate = FAT_animate;

    /**
     * @param {Array<(Node|null)>|Node|NodeList|string|null} arg1
     * @param {string|Object} arg2
     * @param {string|number} arg3
     * @param {number|string|Function=} arg4
     * @param {string|Function=} arg5
     * @param {Function=} arg6
     * @param {Function=} arg7
     * @returns {number}
     */

    function FAT_animate(

        /* obj */ arg1,
        /* style|arr */ arg2,
        /* to */ arg3,
        /* duration */ arg4,
        /* easing */ arg5,
        /* callback */ arg6,
        /* step */ arg7
    ){

        //todo: performance test pass as argument array!!
        //http://jsperf.com/arguments/19
        //http://jsperf.com/passing-parameters-directly-vs-param-object/7

        var delay = -1;
        var props = isStr(arg2) ? arg4 : arg3;

        if(Object.prototype.toString.call(props) === '[object Object]'){

            //console.log('PROPERTY OBJECT');

            if(props['duration']) arg4 = props['duration'];
            if(props['ease']) arg5 = props['ease'];
            if(props['complete']) arg6 = props['complete'];
            if(props['step']) arg7 = props['step'];
            if(props['delay']) delay = props['delay'];

            //TODO:
            //if(typeof arg3.queue !== 'undefined') arg4 = arg3.duration;
            //if(typeof arg3.start !== 'undefined') arg5 = arg3.easing;
        }

        return FAT_paint(function(){

            if(typeof arg1 === 'string') arg1 = CORE.query(arg1);
            if(!arg1.length) arg1 = [arg1];

            for(var i = 0; i < arg1.length; i++){

                new FAT_run(

                    /** @type {Node} */ (arg1[i]),
                    /** @type {string} */ (arg2),
                    /* to */ arg3,
                    /* duration */ arg4,
                    /* easing */ arg5,
                    /* callback */ arg6,
                    /* step */ arg7
                );
            }

        }, delay);
    };

}());


