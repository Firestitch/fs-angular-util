(function () {
    'use strict';


    /**
     * @ngdoc service
     * @name fs.fsUtil
     * @description A collection of utility functions
     */
    angular.module('fs-angular-util',[])
    .factory('fsUtil', function($location) {
        var service = {
            guid: guid
        };

        return service;

        /**
         * @ngdoc method
         * @name options
         * @methodOf fs.fsUtil
         * @returns {string} A random string
         */
        function guid() {
            return 'xxxxxx'.replace(/[xy]/g, function(c) {
                var r = Math.random()*16|0, v = c === 'x' ? r : (r&0x3|0x8);
                return v.toString(16);
            });
        }

    });
})();