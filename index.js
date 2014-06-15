'use strict';

var qs = require('qs');
var debug = require('debug')('http-query-parse');

module.exports = function( request ) {
	var parsed;

	debug('parsing query string');

	if (request._parsedQuery) {
		parsed = request._parsedQuery;
	} else if (request._query === '') {
		parsed = request._parsedQuery = {};
	} else if (request._query) {
		parsed = request._parsedQuery = qs.parse(request._query);
	} else if (request._parsedUrl) {
		parsed = request._parsedQuery = qs.parse(request._parsedUrl.query);
	} else {
		var qsIdx = request.url.indexOf('?');

		if (~qsIdx) {
			request._pathname = request.url.slice(0, qsIdx);
			request._query = request.url.slice(qsIdx+1);
			parsed = request._parsedQuery = qs.parse(request._query);
		} else {
			request._pathname = request.url;
			request._query = '';
			parsed = request._parsedQuery = {};
		}
	}

	debug('processed query string to %j', parsed);

	return parsed;
};