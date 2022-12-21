import { lockScroll, unlockScroll, toggleScroll, insertStyles } from '../../_utilities/index.js';
import styles from './index.scss?inline';

insertStyles(styles);

const COMPONENT_SELECTOR = '[data-component-id="scroll-control-panel"]';

const initScrollControlPanel = () => {
	const lockButton = document.querySelector(`${COMPONENT_SELECTOR} [data-action="lock-scroll"]`);
	const unlockButton = document.querySelector(`${COMPONENT_SELECTOR} [data-action="unlock-scroll"]`);
	const toggleButton = document.querySelector(`${COMPONENT_SELECTOR} [data-action="toggle-scroll"]`);

	lockButton.addEventListener('click', lockScroll);
	unlockButton.addEventListener('click', unlockScroll);
	toggleButton.addEventListener('click', toggleScroll);
};

initScrollControlPanel();
