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
			isNumeric: isNumeric
        };

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
         * @returns {boolean} The result of the test
         */
        function isEmpty(value) {
            return value===undefined || value===null || value==='' || angular.equals(value, {}) || angular.equals(value, []) || value===0 || value==='0';
        }

        /**
         * @ngdoc method
         * @methodOf fs.fsUtil
         * @name isInt
         * @description Validates that the value is an int
         * @param {mixed} value The value to be tested
         * @returns {boolean} The result of the test
         */
		function isInt(value){
			if(typeof Number != 'undefined') {
				return Number.isInteger(value);
			}

			return value === + value && value === (value|0);
		}

        /**
         * @ngdoc method
         * @methodOf fs.fsUtil
         * @name isNumeric
         * @description Validates if the value is numeric. ie. 2.5, 100,
         * @param {mixed} value The value to be tested
         * @returns {boolean} The result of the test
         */
		function isNumeric(value){
			return !!string(value).match(/^\d+\.?\d*$/);
		}

    });
})();
