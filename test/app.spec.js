import App from '../src/js/app';

describe('App class check functions', () => {

	const game = document.createElement("div");
	const playHumanButton = document.createElement("button");
	playHumanButton.setAttribute("class", "button big accent play-human-button");
	const playComputerButton = document.createElement("button");
	playComputerButton.setAttribute("class", "button big accent play-computer-button");

	game.appendChild(playHumanButton);
	game.appendChild(playComputerButton);
	const body = document.getElementsByTagName("body")[0];
	body.appendChild(game);

	const AppClass = new App();

	it('should have a createListeners function', () => {
    expect(AppClass.createListeners).to.be.a('function');
	});
	it('should have a showResults function', () => {
    expect(AppClass.showResults).to.be.a('function');
	});
	it('should have a play function', () => {
    expect(AppClass.play).to.be.a('function');
	});
	it('should have a render function', () => {
    expect(AppClass.render).to.be.a('function');
	});



});
