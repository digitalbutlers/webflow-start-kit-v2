export const insertStyles = (styles, parent = document.head) => {
	parent.insertAdjacentHTML('beforeend', `<style>${styles}</style>`);
};
