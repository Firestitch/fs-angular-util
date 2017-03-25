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
			interval: interval,
			clearInterval: clearInterval,
			throttle: throttle,
			debounce: debounce
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
