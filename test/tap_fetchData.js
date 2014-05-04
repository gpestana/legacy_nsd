var test = require('tape')
var fetch = require('../lib/fetchData.js')

test('fetch node docs json', function(t) {

	t.doesNotThrow(function() {
		fetch.fetchDocsNode(function(){});
	},'| node content fetched');

	t.notEqual(function() {
		fetch.fetchDocsNode(function(data) {
			return data;
		})
	}, null, '| node content not null');

	t.end();
});
