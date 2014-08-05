'use strict';

var httpQueryParse = require('./');
var test = require('tap').test;

test('empty', function( t ){
	var request = {
		url: 'http://localhost/path'
	};

	t.deepEqual(httpQueryParse(request), {}, 'parses correctly');
	t.deepEqual(httpQueryParse(request), {}, 'parses correctly second run');

	t.end();
});

test('flat', function( t ){
	var parsed = { name: 'jean', city: 'boston' };
	var request = {
		url: 'http://localhost/path?name=jean&city=boston'
	};

	t.deepEqual(httpQueryParse(request), parsed, 'parses correctly');
	t.deepEqual(httpQueryParse(request), parsed, 'parses correctly second run');

	t.end();
});

test('mixed', function( t ){
	var parsed = { name: 'brian', age: { month: '5', year: '1991' } };
	var request = {
		url: 'http://localhost/path?name=brian&age[month]=5&age[year]=1991'
	};

	t.deepEqual(httpQueryParse(request), parsed, 'parses correctly');
	t.deepEqual(httpQueryParse(request), parsed, 'parses correctly second run');

	t.end();
});

test('deeply nested', function( t ){
	var parsed = { users: { active: { online: 5 } } };
	var request = {
		url: 'http://localhost/path?users[active][online]=5'
	};

	t.deepEqual(httpQueryParse(request), parsed, 'parses correctly');
	t.deepEqual(httpQueryParse(request), parsed, 'parses correctly second run');

	t.end();
});
