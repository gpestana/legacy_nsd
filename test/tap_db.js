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

		var blobs = [];
		var obj = JSON.parse(doc);


		var docsJSON = _.omit(obj, 
			'source', 'miscs','stability','stabilityText');

		for(var entry in docsJSON) {
			console.log(entry);
			for(var blob in entry) {
				console.log(blob.length);
			}
		}

		console.log(blobs.length);



	}

	t.end();
});


/*
[ -'source',
  -'miscs',
  'globals',
  'vars',
  'methods',
  'modules',
  -'stability',
  -'stabilityText' ]
*/