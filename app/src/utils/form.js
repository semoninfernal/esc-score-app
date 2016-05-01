import { parseError } from './network';

function submitHandler(action, cb) {
	return (values, dispatch) => {
		return new Promise((resolve, reject) => {
			dispatch(action(values))
			.then(response => {
				if (response.error) {
					const error = parseError(response.error);

					reject({
						...error.errors,
						_error: error.message
					});
				} else {
					resolve(response);
					if (typeof cb === 'function') {
						cb();
					}
				}
			});
		});
	};
}

export {
	submitHandler
};
