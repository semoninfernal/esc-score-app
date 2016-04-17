import config from 'config';
import superagent from 'superagent';

const methods = ['get', 'post', 'put', 'patch', 'delete'];

function formatUrl(path) {
	const adjustedPath = path[0] !== '/' ? '/' + path : path;
	if (__SERVER__) {
		return `http://localhost:${config.api.port}${adjustedPath}`;
	}
	return `${config.api.baseUrl}${adjustedPath}`;
}

export default function create(req) {
	return methods.reduce((client, method) => {
		return {
			...client,
			[method]: (path, { params, payload } = {}) => new Promise((resolve, reject) => {
				const request = superagent[method](formatUrl(path));

				if (params) {
					request.query(params);
				}

				if (__SERVER__ && req.get('cookie')) {
					request.set('cookie', req.get('cookie'));
				}

				if (payload) {
					request.send(payload);
				}
				request.end((err, { body } = {}) => err ? reject(err || body) : resolve(body));
			})
		};
	}, {});
}
