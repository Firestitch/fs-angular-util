'use strict';


angular.module('app')
  .controller('DemoCtrl', function ($scope, fsUtil, $q) {

    $scope.submit = function() {
        $scope.text = fsUtil.guid();
    }

   	$scope.empty = { 	'undefined': fsUtil.isEmpty(undefined),
	   					'null': fsUtil.isEmpty(null),
	   					'\'\'': fsUtil.isEmpty(''),
	   					'{}': fsUtil.isEmpty({}),
	   					'[]': fsUtil.isEmpty([]),
	   					'0': fsUtil.isEmpty(0),
	   					'\'0\'': fsUtil.isEmpty('0') };


    $scope.resolve = fsUtil.resolve($q(function(resolve) {
    	resolve([1,2,3]);
    }));

    $scope.resolveObject = fsUtil.resolve($q(function(resolve) {
    	resolve({ name: 'bob' });
    }),{});


    $scope.numeric1 = fsUtil.isNumeric('2.6');
    $scope.numeric2 = fsUtil.isNumeric('6.');
    $scope.numeric3 = fsUtil.isNumeric('6.asd');
    $scope.numeric4 = fsUtil.isNumeric('500');

debugger;
});
