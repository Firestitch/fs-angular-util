(function () {
    'use strict';

	angular.module('fs-angular-util',['fs-angular-math'])
	.filter('fsUtilRound',function (fsMath) {
  		return function(number,precision) {
  			console.warn('fsUtilRound as been deprecated. Please use filter fsMathRound');
	    	return fsMath.round(number,precision);
	    }
  	})
  	.filter('fsUtilIsEmpty',function (fsUtil) {
  		return function(value) {
	    	return fsUtil.isEmpty(value);
	    }
  	})
  	.filter('fsUtilLength',function (fsUtil) {
  		return function(value) {
	    	return fsUtil.length(value);
	    }
  	})
  	.filter('fsUtilEquals',function (fsUtil) {
  		return function(value1,value2) {
	    	return angular.equals(value1,value2);
	    }
  	});

})();
