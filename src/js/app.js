import { Counter, loadImage } from './utils';
import Game from './game';

import Paper from '../assets/paper.svg';
import Scissor from '../assets/scissor.svg';
import Rock from '../assets/rock.svg';

export default class App {
	/**
	 * Define the main DOM elements for playing (stage and buttons)
	 */
	constructor() {

		this.currentGame = null;

		this.$game = document.querySelector('.game-content');
		this.$playHumanButton = document.querySelector('.play-human-button');
		this.$playComputerButton = document.querySelector('.play-computer-button');
		this.createListeners();
	}

	/**
	 * Create Listeners for buttons
	 * @return {}
	 */
	createListeners() {
		this.$playHumanButton.addEventListener("click", (event) => {
			event.preventDefault();
			this.play('human');
		})
		this.$playComputerButton.addEventListener("click", (event) => {
			event.preventDefault();
			this.play('computer');
		})
	}

	/**
	 * This function will show an
	 * animated counter on screen before each play
	 */
	showCountdown() {
		this.$game.innerHTML = `
			<div class="countdown">
				<span class="text">
					Let's go!
				</span>
			</div>
		`;

		const $countdown = document.querySelector('.countdown');

		const images = [Paper, Scissor, Rock];

		// Start the countdown and show an animation to user
		// When the count is zero a Promise is resolved,
		// so the application can do next actions and show the results
		return new Promise((resolve) => {
			Counter.start(3, (count) => {
				if (count === 0) {
					return resolve()
				}

				$countdown.innerHTML = `
				<span class="choice">
					<img alt="choice" src="${images[count -1]}" width="64" height="64" />
				</span>
				`;

			});
		})
	}

	/**
	 * This function will display the results content
	 * after the countdown finish
	 * @param  {results} results Game compute function results
	 */
	showResults(results) {

		const isDraw = Boolean(results === 'draw');

		// Little helper to normalize player name
		const normalizeName = (name, sufix = false) => {
			return (name === 'human') ? `you ${(sufix) ? 'wins' : ''}` : `${name}${(sufix) ? 'wins' : ''}`;
		}

		const { winner, loser } = results;

		let template = `
			<div class="winner-text">
				${(isDraw) ? 'Draw' : normalizeName(winner.name, true)}
			</div>
			<div class="results">
				<div class="player player1">
					<div class="player-content">
						<img src='${loadImage(isDraw ? 'hand' : winner.choice)}' width="400" height="400" />
					</div>
				</div>
				<div class="player player2">
					<div class="player-content">
						<img src='${loadImage(isDraw ? 'hand' : loser.choice)}' width="400" height="400" />
					</div>
				</div>
			</div>
			<button type="button" class="button flat button-restart">Restart</button>
		`;

		// If is not a tie, one legend is show on top
		// of page with current players and they choices
		if (!isDraw) {
			template = `
				${template}
				<div class="results-legend">
					<div class="player winner"><b>${normalizeName(winner.name, false)}</b> - ${winner.choice}</div>
					<div class="player loser"><b>${normalizeName(loser.name, false)}</b> - ${loser.choice}</div>
				</div>
			`
		}

		this.$game.innerHTML = template;

		// Create the event listener for restart button
		document.querySelector('.button-restart').addEventListener('click', (event) => {
			event.preventDefault();
			this.restartGame();
		})
	}

	// Play again the game with the current mode selected
	restartGame() {
		this.play(this.currentGame.mode);
	}

	/**
	 * This is a main function for the app, once the user clicked on
	 * button to play (as human, or computer game), this function will be responsible
	 * for start the game.
	 * @param  {String} [mode='human'] player mode
	 */
	play(mode = 'human') {

		this.currentGame = new Game(mode);

		if (mode === 'human') {

			this.currentGame.createPlayer('human');
			this.currentGame.createPlayer('computer');

			const choicesTemplate = `
				<div class="choices">
					<span class="title">Your time!</span>
					<div class="options">
						<button type="button" class="button invisible choice-button" data-choice="paper">
							<img src='${loadImage('paper')}' width="64" height="64" />
						</button>
						<button type="button" class="button invisible choice-button" data-choice="scissors">
							<img src='${loadImage('scissors')}' width="64" height="64" />
						</button>
						<button type="button" class="button invisible choice-button" data-choice="rock">
							<img src='${loadImage('rock')}' width="64" height="64" />
						</button>
					</div>
				</div>
			`;

			this.$game.innerHTML = choicesTemplate;

			// This section will create a listener for each option button
			// and handle the actions for each choice
			const choiceButtons = document.querySelectorAll("button.choice-button");
			choiceButtons.forEach($button => $button.addEventListener('click',(event) => {
				const $elem = event.currentTarget;
				const humanChoice = $elem.dataset.choice;
				// Add the human player choice
				this.currentGame.setPlayerChoice('human', humanChoice);
				// Get a random choice for the computer player
				const compChoice = this.currentGame.getRandChoice()
				this.currentGame.setPlayerChoice('computer', compChoice);

				// Compute the game results
				const results = this.currentGame.computeGame('human', 'computer');

				this.showCountdown()
					.then(() => {
						this.showResults(results);
				})

			}));

		}
		// Computer VS Computer
		else {
			// Add the two players to the game
			this.currentGame.createPlayer('computer1');
			this.currentGame.createPlayer('computer2');

			// Generate two choices and add the choices for each player
			const comp1Choice = this.currentGame.getRandChoice()
			const comp2Choice = this.currentGame.getRandChoice()

			this.currentGame.setPlayerChoice('computer1', comp1Choice);
			this.currentGame.setPlayerChoice('computer2', comp2Choice);

			// Compute the game results
			const results = this.currentGame.computeGame('computer1', 'computer2');

			this.showCountdown()
				.then(() => {
					this.showResults(results);
			})
		}
	}

	/**
	 * A initial function that will be called
	 * @return {html} template for game stage
	 */
	render() {

		const welcome = `
			<span class="message">
				Choose a mode to play
			</span>
		`;

		this.$game.innerHTML = welcome;
	}

}
