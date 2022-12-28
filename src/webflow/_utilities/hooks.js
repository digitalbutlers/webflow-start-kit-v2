import { CUSTOM_EVENTS } from '../../../config.js';

export const onCustomFilesLoad = () => {
	const loadEvent = new Event(CUSTOM_EVENTS.FILES_LOAD);
	window.dispatchEvent(loadEvent);
};
export const onCustomFilesError = () => {
	// eslint-disable-next-line no-console
	console.error('Custom files failed to load. Check errors above.');
};
