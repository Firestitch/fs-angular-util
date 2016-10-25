'use strict';


angular.module('app')
  .controller('DemoCtrl', function ($scope, fsUtil) {


    $scope.text = '';

    $scope.submit = function() {
        $scope.text = fsUtil.guid();
    }
});
