import Swiper, { Navigation } from 'swiper';

import { insertStyles } from '../../_utilities/index.js';
import styles from './index.scss?inline';


insertStyles(styles);

const COMPONENT_SELECTOR = '[data-component-id="swiper-1"]';


// eslint-disable-next-line no-unused-vars
const swiper1 = new Swiper(`${COMPONENT_SELECTOR} .swiper`, {
	modules: [Navigation],

	navigation: {
		nextEl: `${COMPONENT_SELECTOR} .swiper-button-next`,
		prevEl: `${COMPONENT_SELECTOR} .swiper-button-prev`,
	},
});

