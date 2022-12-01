/**
 * This is a component script file.
 * Import all the scripts and component styles (optional) you need here.
 * */


import './index.scss';

import { isOddOrEven } from '../../_utilities/index.js';

const initCounter = () => {
	const button = document.querySelector('[data-role="counter-button"]');

	if (!button) return;

	let counter = 0;

	const setCounter = (count) => {
		button.dataset.counterState = isOddOrEven(count);
		button.innerHTML = `Count is ${counter} (${isOddOrEven(count)})`;
	};

	button.addEventListener('click', () => {
		counter += 1;
		setCounter(counter);
	});

	setCounter(counter);
};

initCounter();
