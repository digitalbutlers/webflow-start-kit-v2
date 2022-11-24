import './index.scss';

import { isOddOrEven } from '../../_utilities/index.js';

const initCounter = () => {
	const button = document.querySelector('[data-role="counter-button"]');

	if (!button) return;

	const counter = 0;

	const setCounter = (count) => {
		button.innerHTML = `Count is ${counter} (${isOddOrEven(count)})`;
	};

	button.addEventListener('click', () => setCounter(counter + 1));

	setCounter(0);
};

document.addEventListener('load', initCounter);
