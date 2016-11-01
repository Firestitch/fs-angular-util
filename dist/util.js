

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
            synchronous: synchronous
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
         * @name synchronous
         * @param {promise} promise The promise to be used
         * @returns {object} An object that is extened when the promise resolves
         */
		function synchronous(promise) {
			var result = {};
			promise.then(function(data) {
				angular.extend(result,data);
			});
			return result;
		}
    });
})();
