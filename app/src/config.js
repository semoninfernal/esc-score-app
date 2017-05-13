const environment = {
	development: {
		isProduction: false
	},
	production: {
		isProduction: true
	}
}[process.env.NODE_ENV || 'development'];

module.exports = Object.assign({
	port: process.env.PORT,
	api: {
		host: (process.env.API_HOST || 'localhost'),
		port: process.env.API_PORT,
		baseUrl: '/api'
	}
}, environment);
