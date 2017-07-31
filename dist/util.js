(function () {
    'use strict';

	angular.module('fs-angular-util',['fs-angular-math'])
	.filter('fsUtilRound',function (fsMath) {
  		return function(number,precision) {
  			console.warn('fsUtilRound as been deprecated. Please use filter fsMathRound');
	    	return fsMath.round(number,precision);
	    }
  	});

})();



(function () {
    'use strict';

    /**
     * @ngdoc service
     * @name fs.fsUtil
     * @description A collection of utility functions
     */
    angular.module('fs-angular-util')
    .factory('fsUtil', function(fsMath) {
        var service = {
            guid: guid,
            round: round,
            resolve: resolve,
            int: int,
            float: float,
            string: string,
            isEmpty: isEmpty,
			isInt: isInt,
			isNumeric: isNumeric,
			isObject: isObject,
			isArray: isArray,
			isString: isString,
			isClass: isClass,
			isBoolean: isBoolean,
			interval: interval,
			value: value,
			clearInterval: clearInterval,
			throttle: throttle,
			debounce: debounce,
			KEY_CANCEL: 3,
			KEY_HELP: 6,
			KEY_BACKSPACE: 8,
			KEY_TAB: 9,
			KEY_CLEAR: 12,
			KEY_RETURN: 13,
			KEY_ENTER: 14,
			KEY_SHIFT: 16,
			KEY_CONTROL: 17,
			KEY_ALT: 18,
			KEY_PAUSE: 19,
			KEY_CAPS_LOCK: 20,
			KEY_ESCAPE: 27,
			KEY_SPACE: 32,
			KEY_PAGE_UP: 33,
			KEY_PAGE_DOWN: 34,
			KEY_END: 35,
			KEY_HOME: 36,
			KEY_LEFT: 37,
			KEY_UP: 38,
			KEY_RIGHT: 39,
			KEY_DOWN: 40,
			KEY_PRINTSCREEN: 44,
			KEY_INSERT: 45,
			KEY_DELETE: 46,
			KEY_0: 48,
			KEY_1: 49,
			KEY_2: 50,
			KEY_3: 51,
			KEY_4: 52,
			KEY_5: 53,
			KEY_6: 54,
			KEY_7: 55,
			KEY_8: 56,
			KEY_9: 57,
			KEY_SEMICOLON: 59,
			KEY_EQUALS: 61
        },
        intervals = {};

        return service;

        /**
         * @ngdoc method
         * @methodOf fs.fsUtil
         * @name guid
         * @returns {string} A random string
         */
        function guid() {
            return 'xxxxxx'.replace(/[xy]/g, function(c) {
                var r = Math.random()*16|0, v = c === 'x' ? r : (r&0x3|0x8);
                return v.toString(16);
            });
        }

        /**
         * @ngdoc method
         * @methodOf fs.fsUtil
         * @name round
         * @description This method has been deprecated. Please use fsMath.round()
         * @deprecated
         * @param {decimal} number The number to be rounded
         * @param {integer} precision How many decimal places to round
         * @returns {integer} Rounded number
         */
		function round(number, precision) {
			console.warn('fsUtil.round() as been deprecated. Please use filter fsMath.round()');
			return fsMath.round(number,precision);
		}

        /**
         * @ngdoc method
         * @methodOf fs.fsUtil
         * @name resolve
         * @param {promise} promise The promise to be used
         * @param {object|array} defaults The default value/object type for the resolved value
         * @returns {object} An object that is extened when the promise resolves
         */
		function resolve(promise,defaults) {
			defaults = defaults || [];
			var result = defaults;
			promise.then(function(data) {
				angular.extend(result,data);
			});
			return result;
		}

        /**
         * @ngdoc method
         * @methodOf fs.fsUtil
         * @name int
         * @param {mixed} value The value to be converted to an integer
         * @returns {int} The converted int
         */
		function int(value) {
			var value = parseInt(value);
			if(isNaN(value)) {
				value = 0;
			}
			return value;
		}


        /**
         * @ngdoc method
         * @methodOf fs.fsUtil
         * @name float
         * @param {mixed} value The value to be converted to a float
         * @returns {int} The converted float
         */
		function float(value) {
			var value = parseFloat(value);
			if(isNaN(value)) {
				value = 0;
			}
			return value;
		}


        /**
         * @ngdoc method
         * @methodOf fs.fsUtil
         * @name string
         * @param {mixed} value The value to be converted to a string
         * @returns {string} The converted string
         */
  		function string(string) {

  			if(string===null || string===undefined)
  				string = '';

  			return string.toString();
  		}

        /**
         * @ngdoc method
         * @methodOf fs.fsUtil
         * @name isEmpty
         * @description Tests if the value is undefined, null, '', {}, [], 0, '0'
         * @param {mixed} value The value to be tested.
         * @param {object} options Options
         * @param {boolean} options.zero When true '0' or 0 is not considered an empty value
         * @returns {boolean} The result of the test
         */
        function isEmpty(value,options) {
        	options = options || {};
            return 	value===undefined ||
            		value===null ||
            		value==='' ||
            		(isObject(value) && (value.constructor.name=='Object' && !Object.keys(value).length)) ||
            		angular.equals(value, []) ||
            		(!options.zero && (value===0 || value==='0'));
        }

        /**
         * @ngdoc method
         * @methodOf fs.fsUtil
         * @name isInt
         * @description Validates that the value is an int
         * @param {mixed} value The value to be tested
         * @param {boolean} [type=false] Also match the type
         * @returns {boolean} The result of the test
         */
		function isInt(value,type) {
			var int = !!string(value).match(/^\d+$/);

			if(!int)
				return false;

			if(type)
				return Number.isInteger(value);

			return true;
		}

        /**
         * @ngdoc method
         * @methodOf fs.fsUtil
         * @name isObject
         * @description Validates that the value is strictly an object and not an array
         * @param {mixed} value The value to be tested
         * @returns {boolean} The result of the test
         */
		function isObject(value) {
			return value!==null && typeof value === 'object' && !isArray(value);
		}


        /**
         * @ngdoc method
         * @methodOf fs.fsUtil
         * @name isString
         * @description Validates that the value is a string
         * @param {mixed} value The value to be tested
         * @returns {boolean} The result of the test
         */
		function isString(value) {
			return typeof value === 'string' || value instanceof String;
		}

		/**
         * @ngdoc method
         * @methodOf fs.fsUtil
         * @name isArray
         * @description Validates that the value is strictly an array and not an object
         * @param {mixed} value The value to be tested
         * @returns {boolean} The result of the test
         */
		function isArray(value) {
			return value instanceof Array;
		}


        /**
         * @ngdoc method
         * @methodOf fs.fsUtil
         * @name isNumeric
         * @description Validates that the value is a number
         * @param {mixed} value The value to be tested
         * @returns {boolean} The result of the test
         */
		function isNumeric(value) {
			return string(value).length && !!string(value).match(/^-?\d*\.?\d*$/);
		}

        /**
         * @ngdoc method
         * @methodOf fs.fsUtil
         * @name isClass
         * @description Validates that the value is a string
         * @param {mixed} value The value to be tested
         * @param {class|string} cls The class to test against
         * @returns {boolean} The result of the test
         */
		function isClass(value,cls) {

			if(isObject(value)) {

				if(isString(cls)) {

					if(value.constructor) {
						if(value.constructor.name===cls) {
							return true;
						}
					}

				} else {

					if(value instanceof cls) {
						return true;
					}
				}
			}

			return false;
		}

        /**
         * @ngdoc method
         * @methodOf fs.fsUtil
         * @name isBoolean
         * @description Validates that the value is a boolean
         * @param {mixed} value The value to be tested
         * @param {class|string} cls The class to test against
         * @returns {boolean} The result of the test
         */
		function isBoolean(value) {
			return value===true || value===false;
		}

        /**
         * @ngdoc method
         * @methodOf fs.fsUtil
         * @name value
         * @description Returns the key value of the object
         * @param {object} object The object to search
         * @param {string} key The key to search by
         * @param {object} def The default value if the key value doesn't not exist
         */
		function value(object,key,def) {

			if(isObject(object) || isArray(object)) {

				if(object.hasOwnProperty(key)) {
					return object[key];
				}
			}

			return def;
		}

        /**
         * @ngdoc method
         * @methodOf fs.fsUtil
         * @name interval
         * @description Runs a function over and over based on a delay
         * @param {function} fn The function to be ran
         * @param {int} delay The delay in milliseconds before running the next function
         * @param {string} name The name of the interval
         */
		function interval(fn,delay,name) {
			var instance = setInterval(fn,delay);

			if(name) {
				intervals[name] = instance;
			}

			return function() {
				window.clearInterval(instance);
			}
		}

        /**
         * @ngdoc method
         * @methodOf fs.fsUtil
         * @name clearInterval
         * @description Runs a function over and over based on a delay
         * @param {string} name The name of the interval to be cleared
         */
		function clearInterval(name) {

			var instance = intervals[name];

			if(instance) {
				window.clearInterval(instance);
			}
		}

        /**
         * @ngdoc method
         * @methodOf fs.fsUtil
         * @name throttle
         * @description Throttles a function call
         * @param {function} func The callback function
         * @param {integer} wait The time in ms that will block any new requests
         */
		function throttle(func, wait) {
		    var waiting = false;                  // Initially, we're not waiting
		    return function () {               // We return a throttled function
		        if (!waiting) {                   // If we're not waiting
		            func.call();           // Execute users function
		            waiting = true;               // Prevent future invocations
		            setTimeout(function () {   // After a period of time
		                waiting = false;          // And allow future invocations
		            }, wait);
		        }
		    }
		}

        /**
         * @ngdoc method
         * @methodOf fs.fsUtil
         * @name debounce
         * @description Returns a function, that, as long as it continues to be invoked, will not be triggered. The function will be called after it stops being called for N milliseconds.
         * @param {function} func The callback function
         * @param {integer} wait The time in ms that will block any new requests
         * @param {boolean} immediate When true triggers the function on the leading edge, instead of the trailing.
         */
		function debounce(func, wait, immediate) {
			var timeout;
			return function() {
				var context = this, args = arguments;
				var later = function() {
					timeout = null;
					if (!immediate) func.apply(context, args);
				};
				var callNow = immediate && !timeout;
				clearTimeout(timeout);
				timeout = setTimeout(later, wait);
				if (callNow) func.apply(context, args);
			};
		}
    });
})();
