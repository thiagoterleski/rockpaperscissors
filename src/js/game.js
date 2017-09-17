const choices = ['rock','paper', 'scissors'];

export default class Game {
	constructor () {
		// Mode game (human = humanxcomputer | computer = computer1 vs computer2)
		this.mode = '';
		this.players = [];
	}

	/**
	 * This funciton will create a player object with a intial name
	 * @param  {String} [name='human'] player name
	 */
	createPlayer(name = 'human') {
		this.players.push({
			name,
			choice: ''
		});
	}

	/**
	 * Get player by name
	 * @param  {String} [name=''] player name
	 * @return {object}
	 */
	getPlayer(name = '') {
		return this.players.find((p) => p.name === name)
	}

	/**
	 * Get player by name
	 * @param  {String} [name=''] player name
	 * @return {object}
	 */
	getAllPlayers() {
		return this.players;
	}

	/**
	 * This function is responsible for set a choice for a specific player
	 * @param {String} [name='']   player name
	 * @param {String} [choice=''] choice name, must be one of default game choices
	 */
	setPlayerChoice(name = '', choice = '') {

		if (!name) {
			throw new Error(`invalid player name`);
		}

		if (!choices.includes(choice)) {
			throw new TypeError(`invalid choice name`)
		}

		this.players = this.players.map((p) => {
			if (p.name === name) {
				return { ...p, choice }
			}
			return p
		});
	}

	/**
	 * Randomize a choice value
	 * @return {String} array choices value
	 */
	getRandChoice() {
		return choices[Math.floor(Math.random() * choices.length)]
	}

	/**
	 * This function is responsible for game logic check
	 * the logic is simple and use only a if statements to handle the game rules
	 * this logic could be easly extend if needed
	 * https://en.wikipedia.org/wiki/Rock-paper-scissors-lizard-Spock
	 * @param  {String} [namePlayer1] player one name
	 * @param  {String} [namePlayer2] player two name
	 * @return {Object || String} The result could be a string, in case of draw
	 * or a Object containing the two players in order of winner
	 */
	computeGame(namePlayer1 = '', namePlayer2 = '') {
		console.log(namePlayer1, namePlayer2)
	}

}
