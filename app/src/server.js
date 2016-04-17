import Express from 'express';
import path from 'path';
import http from 'http';
import httpProxy from 'http-proxy';
import serveStatic from 'serve-static';
// import favicon from 'serve-favicon';
import config from './config';
import React from 'react';
import ReactDOM from 'react-dom/server';
import { match } from 'react-router';
import { ReduxAsyncConnect, loadOnServer } from 'redux-async-connect';
import { Provider } from 'react-redux';

import Html from 'helpers/html';
import getStatusFromRoutes from 'helpers/getStatusFromRoutes';
import createClient from 'helpers/apiClient';
import createStore from 'redux/createStore';
import getRoutes from 'routes';

const app = new Express();
const server = new http.Server(app);
const proxy = httpProxy.createProxyServer({
	target: `http://localhost:${config.api.port}`
});

app.use(serveStatic(path.join(__dirname, '..', 'static')));
// App.use(favicon(path.join(__dirname, '..', 'static')));

// Register api route
app.use(config.api.baseUrl, (req, res) => {
	proxy.web(req, res);
});

// Register App routes
app.use('*', (req, res) => {
	if (__DEVELOPMENT__) {
		// Do not cache webpack stats: the script file would change since
		// hot module replacement is enabled in the development env
		webpackIsomorphicTools.refresh();
	}

	const client = createClient(req);
	const store = createStore(client);

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
