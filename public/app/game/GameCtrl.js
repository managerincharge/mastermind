'use strict';

angular.module('game')
	
	.controller('GameCtrl', ['$interval', '$scope', 'GameManager', function ($interval, $scope, GameManager) {
		
		$scope.gameMgr = GameManager;
		
		$scope.gameMgr.newGame();
		
		$scope.$on('$destroy', function () {
			if (angular.isDefined($scope.gameMgr.stopInterval)) {
				$interval.cancel($scope.gameMgr.stopInterval);
				$scope.gameMgr.stopInterval = undefined;
			}
		});
		
	}]);