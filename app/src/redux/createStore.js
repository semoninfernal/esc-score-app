import { compose, createStore as _createStore, applyMiddleware } from 'redux';
import reducer from './modules/reducer';
import clientMiddleware from './middleware/clientMiddleware';

export default function createStore(client, initialState) {
	const middleware = [clientMiddleware(client)];

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
			store.replaceReducer(require('./modules/reducer'));
		});
	}

	return store;
}
