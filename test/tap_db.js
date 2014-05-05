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

		var obj = JSON.parse(doc);
		console.log(_.keys(obj));

		var i =0;
		for(var key in obj) {
			console.log("-------- #"+key);
			console.log(obj[key]);
			i++;
		}
		console.log('---->'+i);

	}



	t.end();
});