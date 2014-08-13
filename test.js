'use strict';

var httpQueryParse = require('./');
var getPathname = require('http-get-pathname');
var parseurl = require('parseurl');
var pluckKeys = require('pluck-keys');
var test = require('tap').test;

test('empty', function( t ){
	var request = {
		url: '/path'
	};

	t.deepEqual(httpQueryParse(request), {}, 'parses correctly');
	t.deepEqual(httpQueryParse(request), {}, 'parses correctly second run');

	t.end();
});

test('flat', function( t ){
	var parsed = { name: 'jean', city: 'boston' };
	var request = {
		url: '/path?name=jean&city=boston'
	};

	t.deepEqual(httpQueryParse(request), parsed, 'parses correctly');
	t.deepEqual(httpQueryParse(request), parsed, 'parses correctly second run');

	t.end();
});

test('mixed', function( t ){
	var parsed = { name: 'brian', age: { month: '5', year: '1991' } };
	var request = {
		url: '/path?name=brian&age[month]=5&age[year]=1991'
	};

	t.deepEqual(httpQueryParse(request), parsed, 'parses correctly');
	t.deepEqual(httpQueryParse(request), parsed, 'parses correctly second run');

	t.end();
});

test('deeply nested', function( t ){
	var parsed = { users: { active: { online: 5 } } };
	var request = {
		url: '/path?users[active][online]=5'
	};

	t.deepEqual(httpQueryParse(request), parsed, 'parses correctly');
	t.deepEqual(httpQueryParse(request), parsed, 'parses correctly second run');

	t.end();
});

test('in conjunction with http-get-pathname', function( t ){
	var parsed = { name: 'jean', city: 'boston' };

	t.test('before', function( t ){
		var request = {
			url: '/path?name=jean&city=boston'
		};

		t.equal(getPathname(request), 'path', '(superfluous test - only for development)');
		t.deepEqual(httpQueryParse(request), parsed, 'parses correctly');
		t.deepEqual(httpQueryParse(request), parsed, 'parses correctly second run');
		t.end();
	});

	t.test('after', function( t ){
		var request = {
			url: '/path?name=jean&city=boston'
		};

		t.deepEqual(httpQueryParse(request), parsed, 'parses correctly');
		t.deepEqual(httpQueryParse(request), parsed, 'parses correctly second run');
		t.equal(getPathname(request), 'path', '(superfluous test - only for development)');
		t.end();
	});

	t.test('with empty query', function( t ){
		var request = {
			url: '/path'
		};

		t.equal(getPathname(request), 'path', '(superfluous test - only for development)');
		t.deepEqual(httpQueryParse(request), {}, 'parses correctly');
		t.deepEqual(httpQueryParse(request), {}, 'parses correctly second run');
		t.end();
	});

	t.end();
});

test('in conjunction with parseurl ', function( t ){
	var request = {
		url: '/path?name=jean&city=boston'
	};
	var parsed = { name: 'jean', city: 'boston' };
	var parseurlParsed = {
		search: '?name=jean&city=boston',
		query: 'name=jean&city=boston',
		pathname: '/path',
		path: '/path?name=jean&city=boston',
		href: '/path?name=jean&city=boston',
	};

	t.deepEqual(pluckKeys(Object.keys(parseurlParsed), parseurl(request)), parseurlParsed, 'parseurl is returning what we expect');
	t.deepEqual(pluckKeys(Object.keys(parseurlParsed), request._parsedUrl), parseurlParsed, 'parseurl has cached it\'s result as expected');

	request.url = null;

	t.deepEqual(httpQueryParse(request), parsed, 'parses correctly');

	t.end();
});
