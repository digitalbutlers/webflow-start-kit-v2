/**
 * This file is connected to all the pages.
 * Import scripts and styles you want to use globally here.
 * */

import './main.scss';

import { CUSTOM_EVENTS } from './_constants/index.js';
import { sayHello } from './_utilities/index.js';

sayHello('main.js');

window.addEventListener(CUSTOM_EVENTS.FILES_LOAD, () => {
	// eslint-disable-next-line no-console
	console.log('CUSTOM FILES LOADED');
});
