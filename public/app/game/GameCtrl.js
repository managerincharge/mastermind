'use strict';

angular.module('game')
	
	.controller('GameCtrl', ['$scope', 'GameManager', function ($scope, GameManager) {
		
		$scope.gameMgr = GameManager;
		
		$scope.gameMgr.newGame();
		
	}]);