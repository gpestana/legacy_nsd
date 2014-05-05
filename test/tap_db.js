var test = require('tape')
var fetch = require('../lib/db.js')
var fetch = require('../lib/fetchData.js')
var _ = require('underscore')

test('database tests', function(t) {
	var doc;
	
	//setup
	fetch.fetchDocsNode(function(data) {
		doc = data;
		proceed();
	});


	function proceed() {

		

	}



	t.end();
});