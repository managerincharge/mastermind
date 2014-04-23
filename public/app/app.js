'use strict';

angular.module('app', ['ui.router', 'game'])
	.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {

		$stateProvider
			.state('game', {
				url: '/',
				templateUrl: 'app/game/game.html',
				controller: 'GameCtrl'
			});

		$urlRouterProvider.otherwise('/');

	}]);
