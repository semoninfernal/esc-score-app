import config from 'config';
import { curry } from 'utils/lodash';
import superagent from 'superagent';

const methods = ['get', 'post', 'put', 'patch', 'delete'];

function formatUrl(path) {
	const adjustedPath = path[0] !== '/' ? '/' + path : path;
	if (__SERVER__) {
		return `http://localhost:${config.api.port}${adjustedPath}`;
	}
	return `${config.api.baseUrl}${adjustedPath}`;
}

function setHeaders(request, state) {
	request.set({
		'Authorization': state.auth.token,
		'Content-Type': 'application/json',
		'Accept': 'application/json',

	});
}

export default function create() {
	return methods.reduce((client, method) => {
		return {
			...client,
			[method]: curry((options, getState) => new Promise((resolve, reject) => {
				const { path, params, payload } = options || {};
				const request = superagent[method](formatUrl(path));

				setHeaders(request, getState());

				if (params) {
					request.query(params);
				}

				if (payload) {
					request.send(payload);
				}
				request.end((err, { body } = {}) => err ? reject(err || body) : resolve(body));
			}))
		};
	}, {});
}
