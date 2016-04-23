function parseError(error) {
	const { code, message, errors } = error.response.body;
	return {
		code,
		message,
		errors
	};
}

/* function setServerErrors(fields, errors) {

} */

export {
	parseError
};
