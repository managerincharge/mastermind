'use strict';

angular.module('game')

	.factory('GameManager', ['$interval', function ($interval) {
		
		var gameMgr = {};
		
		// Guess object
		gameMgr.Guess = function (guessNum) {
			this.guessNum = guessNum;
			this.positions = new Array(parseInt(gameMgr.numPositions));
			this.score = [];
		};
		gameMgr.Guess.prototype.isValidGuess = function () {
			var valid = true,
				i = 0;
			for (i = 0; i < this.positions.length; i++) {
				if (this.positions[i] === undefined) {
					valid = false;
					break;
				}
			}
			return valid;
		};
		
		gameMgr.GAME_STATES = {
			GUESSING: 'GUESSING',
			GAME_WON: 'GAME WON'
		};
		
		gameMgr.SHAPES = [
			'glyphicon-star',
			'glyphicon-plus',
			'glyphicon-heart',
			'glyphicon-minus',
			'glyphicon-stop',
			'glyphicon-bell'
		];
		
		gameMgr.numPositions = 3;
		gameMgr.numShapes = 3;
		
		gameMgr.selectedShapeIndex = 0;
		
		gameMgr.newGame = function () {
			gameMgr.gameState = gameMgr.GAME_STATES.GUESSING;
			gameMgr.curGuessNum = 1;
			gameMgr.guesses = [];
			gameMgr.guesses[gameMgr.curGuessNum - 1] = new gameMgr.Guess(1);
			gameMgr.setCode();
			gameMgr.gameStartTime = undefined;
			gameMgr.stopInterval = undefined;
			gameMgr.elapsedTime = 0;
		};
		
		gameMgr.setCode = function () {
			gameMgr.code = [];
			for (var i = 0; i < gameMgr.numPositions; i++) {
				gameMgr.code[i] = gameMgr.SHAPES[Math.floor(Math.random() * gameMgr.numShapes)];
			}
			console.log(gameMgr.code);
		};
		
		gameMgr.changeShape = function (idx) {
			if (gameMgr.selectedShapeIndex !== idx) {
				gameMgr.selectedShapeIndex = idx;
			}
		};
		
		gameMgr.setShape = function (guess, idx) {
			if (guess.guessNum === gameMgr.curGuessNum) {
				guess.positions[idx] = guess.positions[idx] ? undefined : gameMgr.SHAPES[gameMgr.selectedShapeIndex];
			}
			if (!gameMgr.gameStartTime) {
				gameMgr.gameStartTime = new Date();
				gameMgr.stopInterval = $interval(function () {
					gameMgr.elapsedTime = (new Date() - gameMgr.gameStartTime);
				}, 1000);
			}
		};
				
		gameMgr.scoreGuess = function () {
			var score = [],
				code = gameMgr.code.slice(),
				guess = gameMgr.guesses[gameMgr.curGuessNum - 1].positions,
				i = 0,
				j = 0;
			if (gameMgr.guesses[gameMgr.curGuessNum - 1].positions.join() === gameMgr.code.join()) {
				$interval.cancel(gameMgr.stopInterval);
				gameMgr.gameState = gameMgr.GAME_STATES.WON;
			} else {
				for (i = 0; i < gameMgr.numPositions; i++) {
					for (j = 0; j < code.length; j++) {
						if (guess[i] === code[j]) {
							score.push('glyphicon-resize-horizontal');
							code.splice(j, 1);
							break;
						}
					}
				}
				for (i = 0; i < gameMgr.numPositions; i++) {
					if (guess[i] === gameMgr.code[i]) {
						score.shift();
						score.push('glyphicon-ok');
					}
				}
				shuffleArray(score);
				gameMgr.guesses[gameMgr.curGuessNum - 1].score = score.slice();
				gameMgr.curGuessNum = gameMgr.curGuessNum + 1;
				gameMgr.guesses[gameMgr.curGuessNum - 1] = new gameMgr.Guess(gameMgr.curGuessNum);
			}
		};

		return gameMgr;
		
		function shuffleArray(array) {
			for (var i = array.length - 1; i > 0; i--) {
				var j = Math.floor(Math.random() * (i + 1));
				var temp = array[i];
				array[i] = array[j];
				array[j] = temp;
			}
			return array;
		}
 
		
	}]);