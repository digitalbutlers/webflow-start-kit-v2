/**
 * This is a component script file.
 * Import all the scripts and component styles (optional) you need here.
 * Please, do not import libraries styles here, use index.scss file instead.
 * */

import { insertStyles, isOddOrEven, sayHello } from '../../_utilities/index.js';
import styles from './index.scss?inline';

insertStyles(styles);

const COMPONENT_SELECTOR = '[data-component-id="counter"]';

sayHello('counter.js');

const initCounter = () => {
	const button = document.querySelector(`${COMPONENT_SELECTOR} [data-role="counter-button"]`);

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
