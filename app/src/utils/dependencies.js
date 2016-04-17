export function isLoaded(...args) {
	return args.every(state => {
		return state && state.loaded && !state.loading;
	});
}
