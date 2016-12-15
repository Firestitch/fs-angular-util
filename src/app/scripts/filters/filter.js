(function () {
    'use strict';

  	/**
     * @ngdoc filter
     * @name fs.filter:fsUtilRound
     * @param {number} number The number to be rounded
	 */
	angular.module('fs-angular-util',[])
	.filter('fsUtilRound',function (fsUtil) {
  		return function(number,precision) {
	    	return fsUtil.round(number,precision);
	    }
  	});

})();