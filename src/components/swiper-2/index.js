import Swiper, { Navigation, Pagination, Scrollbar } from 'swiper';

import { insertStyles } from '../../_utilities/index.js';
import styles from './index.scss?inline';

insertStyles(styles);

const COMPONENT_SELECTOR = '[data-component-id="swiper-2"]';

// eslint-disable-next-line no-unused-vars
const swiper2 = new Swiper(`${COMPONENT_SELECTOR} .swiper`, {
	modules: [Navigation, Pagination, Scrollbar],

	navigation: {
		nextEl: `${COMPONENT_SELECTOR} .swiper-button-next`,
		prevEl: `${COMPONENT_SELECTOR} .swiper-button-prev`,
	},

	pagination: {
		el: `${COMPONENT_SELECTOR} .swiper-pagination`,
		type: 'bullets',
	},

	scrollbar: {
		el: `${COMPONENT_SELECTOR} .swiper-scrollbar`,
		draggable: true,
	},
});
