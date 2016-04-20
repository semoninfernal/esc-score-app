function parseError(error) {
	const body = error.response.body;
	return {
		code: body.code,
		message: body.message,
		errors: body.errors
	};
}

/* function setServerErrors(fields, errors) {

} */

export {
	parseError
};
