import { CLASSES } from '../_constants/index.js';

const setScrollbarWidth = () => {
	const rootElement = document.documentElement;
	const scrollWidth = window.innerWidth - document.documentElement.clientWidth;

	rootElement.style.setProperty('--js-scrollbar-width', `${scrollWidth}px`);
};

export const isScrollLocked = () => document.body.classList.contains(CLASSES.LOCKED);

export const lockScroll = () => {
	if (isScrollLocked()) {
		return;
	}

	setScrollbarWidth();
	document.body.classList.add(CLASSES.LOCKED);
};

export const unlockScroll = () => {
	document.body.classList.remove(CLASSES.LOCKED);
};

export const toggleScroll = () => (document.body.classList.contains(CLASSES.LOCKED) ? unlockScroll() : lockScroll());
