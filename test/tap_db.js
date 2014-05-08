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
			'source','stability','stabilityText');


		var arr = [];
		_.keys(docsJSON).forEach(function(i) {
			
			_.values(docsJSON[i]).forEach(function(j) {
				arr.push(j);
			});
		});



		arr.forEach(function(entry) {
			console.log(entry.name);
		});

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