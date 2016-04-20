function _requiresFetch(state) {
	return !(state && state.loaded && !state.loading);
}

function requiresFetch(...args) {
	return args.every(state => _requiresFetch(state));
}

function _isLoaded(state) {
	return state && state.loaded;
}

function isLoaded(...args) {
	return args.every(state => _isLoaded(state));
}

export {
	requiresFetch,
	isLoaded
};
