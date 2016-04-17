import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router, browserHistory } from 'react-router';
import { ReduxAsyncConnect } from 'redux-async-connect';
import useScroll from 'scroll-behavior/lib/useStandardScroll';
import { syncHistoryWithStore } from 'react-router-redux';
import createClient from 'helpers/apiClient';
import createStore from './redux/createStore';

import getRoutes from './routes';

const client = createClient();

const mount = document.getElementById('content');
const store = createStore(client, window.__INITIAL_STATE__);

const history = useScroll(() => browserHistory)();
syncHistoryWithStore(history, store);

const asyncRender = props => (
	<ReduxAsyncConnect {...props} filter={item => !item.deferred} />
);

const component = (
	<Router history={history} render={asyncRender}>
		{getRoutes(store, true)}
	</Router>
);

ReactDOM.render(
	<Provider store={store} key='provider'>
		{component}
	</Provider>,
	mount
);

if (process.env.NODE_ENV !== 'production') {
	window.React = React; // enable debugger

	/* if (!mount || !mount.firstChild || !mount.firstChild.attributes || !mount.firstChild.attributes['data-react-checksum']) {
		console.error('Server-side React render was discarded. Make sure that your initial render does not contain any client-side code.');
	} */
}

if (__DEVTOOLS__ && !window.devToolsExtension) {
	const DevTools = require('./containers/DevTools/DevTools');
	ReactDOM.render(
		<Provider store={store} key='provider'>
			<div>
				{component}
				<DevTools />
			</div>
		</Provider>,
		mount
	);
}
