import App from '../src/js/app';

describe('Game class test', () => {

	const AppClass = new App();

	it('shoude have a showResults function', () => {
    expect(AppClass.showResults).to.be.a('function');
	});
	it('shoude have a play function', () => {
    expect(AppClass.showResults).to.be.a('function');
	});
	it('shoude have a render function', () => {
    expect(AppClass.showResults).to.be.a('function');
	});


});
