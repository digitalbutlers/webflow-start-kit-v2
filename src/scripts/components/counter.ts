import {isOddOrEven} from "../_utilities";


const initCounter = () => {
	const button = document.querySelector('[data-role="counter-button"]')

	if (!button) return;

	let counter = 0

	const setCounter = (count: number) => {
		button.innerHTML = `Count is ${counter} (${isOddOrEven(count)})`
	}

	button.addEventListener('click', () => setCounter(counter + 1))

	setCounter(0)
}

document.addEventListener('load', initCounter)