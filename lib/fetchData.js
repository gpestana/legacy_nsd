var request = require('request');
var db = require('./db.js')

function fetchDocsNode(callback) {
	var nodeDocsJSON = 'http://nodejs.org/api/all.json';

	request(nodeDocsJSON, function(err, resp, body) {
		if(err) {
			throw new Error('Error: fetch JSON docs '+err);
		}
		callback(body);
	});
}

function fetchPoweredContent(callback) {
	callback();
}	

exports.fetchPoweredContent = fetchPoweredContent
exports.fetchDocsNode = fetchDocsNode;
