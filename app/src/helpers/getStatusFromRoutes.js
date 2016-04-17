export default (routeProps, store) => {
	return routeProps.routes.reduce((prev, cur) => {
		const { component } = cur;
		const status = component.getStatus ? component.getStatus(store.getState(), routeProps.params) : null;
		return cur.status || status || prev;
	}, null);
};
