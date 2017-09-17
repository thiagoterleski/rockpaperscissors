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
	 * This is a main function for the app, once the user clicked on
	 * button to play (as human, or computer game), this function will be responsible
	 * for start the game.
	 * @param  {String} [mode='human'] player mode
	 */
	play(mode = 'human') {
		if (mode === 'human') {
			console.log('human')
		} else {
			console.log('computer')
		}
	}

	/**
	 * Responsible for render the result content
	 * @return {String} results template
	 */
	showResults() {

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
