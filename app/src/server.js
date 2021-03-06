import Express from 'express';
import path from 'path';
import http from 'http';
import httpProxy from 'http-proxy';
import serveStatic from 'serve-static';
import cookieParser from 'cookie-parser';
// import favicon from 'serve-favicon';
import config from './config';
import React from 'react';
import ReactDOM from 'react-dom/server';
import { match, createMemoryHistory } from 'react-router';
import { ReduxAsyncConnect, loadOnServer } from 'redux-async-connect';
import { Provider } from 'react-redux';

import Html from 'helpers/html';
import getStatusFromRoutes from 'helpers/getStatusFromRoutes';
import { getAuth } from 'helpers/auth';
import createClient from 'helpers/apiClient';
import createStore from 'redux/createStore';
import getRoutes from 'routes';

const app = new Express();
const server = new http.Server(app);
const targetUrl = `http://${config.api.host}:${config.api.port}`
console.log("Proxy /api to ", targetUrl);
const proxy = httpProxy.createProxyServer({
	target: targetUrl,
	ws: true
});

app.use(cookieParser());

app.use(serveStatic(path.join(__dirname, '..', 'static')));
// App.use(favicon(path.join(__dirname, '..', 'static')));

// Register api route
app.use(config.api.baseUrl, (req, res) => {
	proxy.web(req, res);
});

proxy.on('error', (error, req, res) => {
	let json;
	if (error.code !== 'ECONNRESET') {
		console.error('proxy error', error);
	}
	if (!res.headersSent) {
		res.writeHead(500, {'content-type': 'application/json'});
	}

	json = {error: 'proxy_error', reason: error.message};
	res.end(JSON.stringify(json));
});

// Register App routes
app.use((req, res) => {
	if (__DEVELOPMENT__) {
		// Do not cache webpack stats: the script file would change since
		// hot module replacement is enabled in the development env
		webpackIsomorphicTools.refresh();
	}

	const initialState = {
		auth: {
			token: getAuth(req)
		}
	};

	const client = createClient();
	const store = createStore(client, createMemoryHistory(), initialState);

	function hydrateOnClient() {
		const content = '<!doctype html>\n' +
			ReactDOM.renderToString(<Html assets={webpackIsomorphicTools.assets()} store={store}/>);
		res.send(content);
	}

	if (__DISABLE_SSR__) {
		hydrateOnClient();
		return;
	}

	match({routes: getRoutes(store), location: req.originalUrl}, (error, redirectLocation, renderProps) => {
		if (error) {
			res.status(500);
			hydrateOnClient();
		} else if (redirectLocation) {
			res.redirect(302, redirectLocation.pathname + redirectLocation.search);
		} else if (!renderProps) {
			res.status(500);
			hydrateOnClient();
		} else {
			loadOnServer({...renderProps, store}).then(() => {
				const component = (
					<Provider store={store} key='provider'>
						<ReduxAsyncConnect {...renderProps} />
					</Provider>
				);

				const status = getStatusFromRoutes(renderProps, store);
				if (status) {
					res.status(status);
				}

				res.send('<!doctype html>\n' +
					ReactDOM.renderToString(<Html assets={webpackIsomorphicTools.assets()} component={component} store={store}/>));
			});
		}
	});
});

if (config.port) {
	server.listen(config.port, (err) => {
		if (err) {
			console.error(err);
		}
		// console.info('----\n==> ✅  %s is running, talking to API server on %s.', config.App.title, config.apiPort);
		console.info('==> 💻  Open http://localhost:%s in a browser to view the App.', config.port);
	});
} else {
	console.error('==>     ERROR: No PORT environment variable has been specified');
}
