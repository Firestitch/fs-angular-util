

(function () {
    'use strict';

    /**
     * @ngdoc service
     * @name fs.fsUtil
     * @description A collection of utility functions
     */
    angular.module('fs-angular-util',[])
    .factory('fsUtil', function() {
        var service = {
            guid: guid,
            round: round,
            resolve: resolve,
            int: int,
            float: float
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
         * @param {decimal} number The number to be rounded
         * @param {integer} precision How many decimal places to round
         * @returns {integer} Rounded number
         */
		function round(number, precision) {
			precision = precision || 0;
		    var factor = Math.pow(10, precision);
		    var tempNumber = number * factor;
		    var roundedTempNumber = Math.round(tempNumber);
		    return roundedTempNumber / factor;
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
         * @param {mixed} value The value to be converted to an float
         * @returns {int} The converted float
         */
		function float(value) {
			var value = parseFloat(value);
			if(isNaN(value)) {
				value = 0;
			}
			return value;
		}
    });
})();
