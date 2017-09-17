const choices = ['rock','paper', 'scissors'];

export default class Game {
	constructor (mode = '') {
		// Mode game (human = humanxcomputer | computer = computer1 vs computer2)
		this.mode = mode;
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
	getPlayerByName(name = '') {
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
	 *
	 * @param  {String} [namePlayer1] player one name
	 * @param  {String} [namePlayer2] player two name
	 *
	 * @return {Object || String} The result could be a string, in case of draw
	 * or a Object containing the two players in order of winner
	 */
	computeGame(namePlayer1 = '', namePlayer2 = '') {

		const player1 = this.getPlayerByName(namePlayer1);
		const player2 = this.getPlayerByName(namePlayer2);

		const choice1 = player1.choice;
		const choice2 = player2.choice;

		if (choice1 === choice2) {
			return 'draw';
		}
		if (choice1 === "rock") {
			if (choice2 === "scissors") {
				return { winner: player1, loser: player2};
			} else {
				return { winner: player2, loser: player1};
			}
		}
		if (choice1 === "paper") {
			if (choice2 === "rock") {
				return { winner: player1, loser: player2};
			} else {
				return { winner: player2, loser: player1};
			}
		}
		if (choice1 === "scissors") {
			if (choice2 === "rock") {
				return { winner: player2, loser: player1};
			} else {
				return { winner: player1, loser: player2};
			}
		}
	}

}
