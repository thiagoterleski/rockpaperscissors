import { Counter, loadImage } from './utils';
import Game from './game';

export default class App {
	/**
	 * Define the main DOM elements for playing (stage and buttons)
	 */
	constructor() {
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

		return new Promise((resolve) => {
			Counter.start(3, (count) => {
				if (count === 0) {
					return resolve()
				}
				$countdown.innerHTML = `
				<span class="number">
					${count}
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

		const getTextContent = () => {
			if (isDraw) {
				return 'Draw';
			}
			return `${winner.name === 'human' ? 'You' : winner.name} win!`;
		}

		const { winner, loser } = results;
		const getResultClassSufix = () => {
			const randomPosition = ['vertical','horizontal'][Math.round(Math.random())];
			if (isDraw) {
				return `is-draw ${randomPosition}`;
			}
			return `${winner.name}-wins ${randomPosition}`;
		}

		this.$game.innerHTML = `
			<div class="results ${getResultClassSufix()}">
				<div class="player player1">
					<div class="player-content">
						<img src='${loadImage(isDraw ? 'hand' : winner.choice)}' width="400" height="400" />
					</div>
				</div>
				<div class="winner-text">
					${getTextContent()}
				</div>
				<div class="player player2">
					<div class="player-content">
						<img src='${loadImage(isDraw ? 'hand' : loser.choice)}' width="400" height="400" />
					</div>
				</div>
			</div>
		`;

	}

	/**
	 * This is a main function for the app, once the user clicked on
	 * button to play (as human, or computer game), this function will be responsible
	 * for start the game.
	 * @param  {String} [mode='human'] player mode
	 */
	play(mode = 'human') {
		const GameClass = new Game();

		if (mode === 'human') {

			GameClass.createPlayer('human');
			GameClass.createPlayer('computer');

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

			const choiceButtons = document.querySelectorAll("button.choice-button");
			choiceButtons.forEach($button => $button.addEventListener('click',(event) => {
				const $elem = event.currentTarget;
				const humanChoice = $elem.dataset.choice;

				GameClass.setPlayerChoice('human', humanChoice);
				const compChoice = GameClass.getRandChoice()
				GameClass.setPlayerChoice('computer', compChoice);

				const results = GameClass.computeGame('human', 'computer');

				console.log(results)

				this.showCountdown()
					.then(() => {
						this.showResults(results);
				})

			}));

		}
		// Computer VS Computer
		else {

			GameClass.createPlayer('computer1');
			GameClass.createPlayer('computer2');

			const comp1Choice = GameClass.getRandChoice()
			const comp2Choice = GameClass.getRandChoice()

			GameClass.setPlayerChoice('computer1', comp1Choice);
			GameClass.setPlayerChoice('computer2', comp2Choice);

			const results = GameClass.computeGame('computer1', 'computer2');

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
