import { Counter, loadImage } from './utils';
import Game from './game';

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

		// Little helper to normalize player name
		const normalizeName = (name) => {
			return (name === 'human') ? 'you' : name;
		}

		const { winner, loser } = results;

		let template = `
			<div class="winner-text">
				${(isDraw) ? 'Draw' : normalizeName(winner.name) + ' wins'}
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

		if (!isDraw) {
			template = `
				${template}
				<div class="results-legend">
					<div class="player winner"><b>${normalizeName(winner.name)}</b> - ${winner.choice}</div>
					<div class="player loser"><b>${normalizeName(loser.name)}</b> - ${loser.choice}</div>
				</div>
			`
		}

		this.$game.innerHTML = template;

		document.querySelector('.button-restart').addEventListener('click', (event) => {
			event.preventDefault();
			this.restartGame();
		})
	}

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

			const choiceButtons = document.querySelectorAll("button.choice-button");
			choiceButtons.forEach($button => $button.addEventListener('click',(event) => {
				const $elem = event.currentTarget;
				const humanChoice = $elem.dataset.choice;

				this.currentGame.setPlayerChoice('human', humanChoice);
				const compChoice = this.currentGame.getRandChoice()
				this.currentGame.setPlayerChoice('computer', compChoice);

				const results = this.currentGame.computeGame('human', 'computer');

				console.log(results)

				this.showCountdown()
					.then(() => {
						this.showResults(results);
				})

			}));

		}
		// Computer VS Computer
		else {

			this.currentGame.createPlayer('computer1');
			this.currentGame.createPlayer('computer2');

			const comp1Choice = this.currentGame.getRandChoice()
			const comp2Choice = this.currentGame.getRandChoice()

			this.currentGame.setPlayerChoice('computer1', comp1Choice);
			this.currentGame.setPlayerChoice('computer2', comp2Choice);

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
