import Game from '../src/js/game';

describe('Game class check functions', () => {

	const GameClass = new Game();

	it('should have a createPlayer function', () => {
    expect(GameClass.createPlayer).to.be.a('function');
	});
	it('should have a getPlayer function', () => {
    expect(GameClass.getPlayer).to.be.a('function');
	});
	it('should have a getAllPlayers function', () => {
    expect(GameClass.getAllPlayers).to.be.a('function');
	});
	it('should have a setPlayerChoice function', () => {
    expect(GameClass.setPlayerChoice).to.be.a('function');
	});
	it('should have a getRandChoice function', () => {
    expect(GameClass.getRandChoice).to.be.a('function');
	});
	it('should have a computeGame function', () => {
    expect(GameClass.computeGame).to.be.a('function');
	});

});

describe('Game method tests', () => {
	it('should create a player and check if the array players contains the element', () => {
		const GameClass = new Game();
		GameClass.createPlayer('Thiago');
		expect(GameClass.players).to.deep.equal([{'name':'Thiago','choice':''}]);
	});
	it('should create a player and check if the method getAllPlayers contains this element', () => {
		const GameClass = new Game();
		GameClass.createPlayer('Thiago');
		const players = GameClass.getAllPlayers();

		expect(players).to.deep.equal([{'name':'Thiago','choice':''}]);
	});

	describe('Should create a player and set a choice for him', () => {
		const GameClass = new Game();
		GameClass.createPlayer('Thiago');
		GameClass.setPlayerChoice('Thiago', 'rock');

		const players = GameClass.getAllPlayers();
		const player = GameClass.getPlayer('Thiago');

		expect(players).to.deep.equal([player]);

	});

	describe('Should get a random valid choice', () => {
		const GameClass = new Game();
		const choices = ['rock','paper', 'scissors'];
		const choice = GameClass.getRandChoice();

		expect(choices).to.include(choice);

	});


});
