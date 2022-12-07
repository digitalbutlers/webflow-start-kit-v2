import Swiper, { Navigation, Pagination, Scrollbar } from 'swiper';

import './index.scss';

// eslint-disable-next-line no-unused-vars
const swiper1 = new Swiper('[data-component-id="swiper-1"] .swiper', {
	modules: [Navigation, Pagination, Scrollbar],

	navigation: {
		nextEl: '[data-component-id="swiper-1"] .swiper-button-next',
		prevEl: '[data-component-id="swiper-1"] .swiper-button-prev',
	},
});
