const methodNames = ['CREATE', 'READ', 'UPDATE', 'DELETE'];
const variantNames = ['', 'SUCCESS', 'FAIL'];

// Take a namespace and return CRUD-constants
function createConstants(namespace) {
	return methodNames.reduce((methods, method) => {
		return Object.assign(methods, variantNames.reduce((methodVariants, variant) => {
			const parts = variant ? [namespace, method, variant] : [namespace, method];
			methodVariants[parts.slice(1).join('_')] = parts.join('_');
			return methodVariants;
		}, methods));
	}, {});
}

export default function createReducer(namespace, initialState = {}) {
	const actions = createConstants(namespace);

	function reducer(state = initialState, action = {}) {
		switch (action.type) {
			// CREATE
			case actions.CREATE:
				return initialState;
			case actions.CREATE_SUCCESS:
				return initialState;
			case actions.CREATE_FAIL:
				return initialState;
			// READ
			case actions.READ:
				return initialState;
			case actions.READ_SUCCESS:
				return initialState;
			case actions.READ_FAIL:
				return initialState;
			case actions.UPDATE:
				return initialState;
			case actions.UPDATE_SUCCESS:
				return initialState;
			case actions.UPDATE_FAIL:
				return initialState;
			default:
				return initialState;
		}
	}

	return {
		actions,
		reducer
	};
}
