#!/usr/bin/env node
require('babel-polyfill');
require('babel-register');
global.__DEVELOPMENT__ = process.env.NODE_ENV !== 'production';

if (__DEVELOPMENT__) {
	if (!require('piping')({
			hook: true,
			ignore: /(\/\.|~$|\.json$)/i
		})) {
		return;
	}
}
require('../api/api');