import { connect as _connect } from 'react-redux';
import { asyncConnect } from 'redux-async-connect';

export default function connect(fetch, selector, actions) {
	return function wrapWithFetchData(WrappedComponent) {
		const ConnectedComponent = _connect(selector, actions)(WrappedComponent);

		return asyncConnect([fetch])(ConnectedComponent);
	};
}
