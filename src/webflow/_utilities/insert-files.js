export const insertScript = ({ parent = document.body, path }) =>
	new Promise((resolve, reject) => {
		const script = document.createElement('script');

		script.addEventListener('load', resolve);
		script.addEventListener('error', reject);

		script.setAttribute('type', 'module');
		script.setAttribute('src', path);

		parent.append(script);
	});

export const insertStyle = ({ parent = document.head, path }) =>
	new Promise((resolve, reject) => {
		const style = document.createElement('link');

		style.addEventListener('load', resolve);
		style.addEventListener('error', reject);

		style.setAttribute('rel', 'stylesheet');
		style.setAttribute('href', path);
		parent.append(style);
	});
