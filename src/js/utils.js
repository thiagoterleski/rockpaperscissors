import Paper from '../assets/paper.svg';
import Scissor from '../assets/scissor.svg';
import Rock from '../assets/rock.svg';

/**
 * Basic counter function
 * @type {Callback} a event for each update
 */
export const Counter = {
	start(defCount = 3, update) {
		let count = defCount
		let interval = setInterval(() => {
			if (count === 0) {
				clearInterval(interval)
			}
			update(count);
			count -= 1;

		}, 500)
	}
}

/**
 * This function was created for load the correct image resource according with choice name
 * @param  {String} [choice=''] choice name
 * @return {resource} SVG element
 */
export const loadImage = (choice = '') => {
	if (choice === 'rock') {
		return Rock;
	} else if (choice === 'paper') {
		return Paper;
	} else {
		return Scissor;
	}
}
