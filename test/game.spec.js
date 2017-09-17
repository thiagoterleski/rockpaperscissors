import Game from '../src/js/game';

describe('Game class test', () => {

	const GameClass = new Game();

	it('shoude have a createPlayer function', () => {
    expect(GameClass.createPlayer).to.be.a('function');
	});
	it('shoude have a getPlayer function', () => {
    expect(GameClass.getPlayer).to.be.a('function');
	});
	it('shoude have a createPlayer function', () => {
    expect(GameClass.createPlayer).to.be.a('function');
	});
	it('shoude have a getAllPlayers function', () => {
    expect(GameClass.getAllPlayers).to.be.a('function');
	});
	it('shoude have a setPlayerChoice function', () => {
    expect(GameClass.setPlayerChoice).to.be.a('function');
	});
	it('shoude have a getRandChoice function', () => {
    expect(GameClass.getRandChoice).to.be.a('function');
	});
	it('shoude have a computeGame function', () => {
    expect(GameClass.computeGame).to.be.a('function');
	});

});
