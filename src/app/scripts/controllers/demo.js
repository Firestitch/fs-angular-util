'use strict';


angular.module('app')
  .controller('DemoCtrl', function ($scope, fsUtil, $q) {


    $scope.text = '';

    $scope.submit = function() {
        $scope.text = fsUtil.guid();
    }

    $scope.resolve = fsUtil.resolve($q(function(resolve) {
    	resolve([1,2,3]);
    }));


    $scope.resolveObject = fsUtil.resolve($q(function(resolve) {
    	resolve({ name: 'bob' });
    }),{});

});
