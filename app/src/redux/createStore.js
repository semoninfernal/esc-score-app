import { compose, createStore as _createStore, applyMiddleware } from 'redux';
import { routerMiddleware } from 'react-router-redux';
import reducer from './modules/reducer';
import clientMiddleware from './middleware/clientMiddleware';
import authMiddleware from './middleware/authMiddleware';
import networkMiddleware from './middleware/networkMiddleware';

export default function createStore(client, history, initialState) {
	// TODO we might not need the router middleware, it's only used by dispatched location actions from react-router-redux
	const middleware = [clientMiddleware(client), authMiddleware, networkMiddleware, routerMiddleware(history)];

	let finalCreateStore;
	if (__DEVELOPMENT__ && __CLIENT__ && __DEVTOOLS__) {
		const { persistState } = require('redux-devtools');
		const DevTools = require('../containers/DevTools/DevTools');
		finalCreateStore = compose(
			applyMiddleware(...middleware),
			window.devToolsExtension ? window.devToolsExtension() : DevTools.instrument(),
			persistState(window.location.href.match(/[?&]debug_session=([^&]+)\b/))
		)(_createStore);
	} else {
		finalCreateStore = applyMiddleware(...middleware)(_createStore);
	}

	const store = finalCreateStore(reducer, initialState);

	if (__DEVELOPMENT__ && module.hot) {
		module.hot.accept('./modules/reducer', () => {
			store.replaceReducer(require('./modules/reducer').default);
		});
	}

	return store;
}
