var db = require('./db.js')

var levelup = require('levelup');
//var searchEngine = require('../../json-search/lib/json-search.js');

function test() {
	
	var data = db.getNodeDocsJSON();

}

exports.test = test;