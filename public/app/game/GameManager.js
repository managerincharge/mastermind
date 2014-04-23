'use strict';

angular.module('game')

	.factory('GameManager', [function () {
		
		var gameMgr = {};
		
		// Guess object
		gameMgr.Guess = function (guessNum) {
			this.guessNum = guessNum;
			this.positions = new Array(gameMgr.numPositions);
		};
		gameMgr.Guess.prototype.isValidGuess = function () {
			this.positions.forEach(function (pos) {
				if (!pos) { return false; }
			});
			return true;
		};
		
		gameMgr.GAMES_STATES = {
			GUESSING_INVALID: 'GUESSING INVALID',
			GUESSING_VALID: 'GUESSING VALID',
			SCORING: 'SCORING',
			GAME_WON: 'GAME WON'
		};
		
		gameMgr.COLORS = {
			RED: 'R',
			GREEN: 'G',
			BLUE: 'B',
			YELLOW: 'Y'
		};
		
		gameMgr.numPositions = 4;
		gameMgr.numColors = 4;
		
		gameMgr.newGame = function () {
			gameMgr.gameState = gameMgr.GAMES_STATES.GUESSING_INVALID;
			gameMgr.curGuessNum = 1;
			gameMgr.guesses = [];
			gameMgr.guesses[gameMgr.curGuessNum - 1] = new gameMgr.Guess(1);
		};
				
		gameMgr.scoreGuess = function () {
			if (gameMgr.gameState === gameMgr.GAMES_STATES.GUESSING_INVALID) {
			
				gameMgr.curGuessNum = gameMgr.curGuessNum + 1;
				gameMgr.guesses[gameMgr.curGuessNum - 1] = new gameMgr.Guess(gameMgr.curGuessNum);
				
			}
		};

		return gameMgr;
		
	}]);