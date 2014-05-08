var fetchData = require('./lib/fetchData.js')
var db = require('./lib/db.js');
var search = require('./lib/search.js');
var server = require('./lib/server.js')

var input = process.argv.slice(2);

if (input == '-fetch') {
	fetchData.fetchDocsNode(function(data) {
		db.setNodeDocsJSON(data);
		console.log("-- Official docs fetched successfuly");

		fetchData.fetchPoweredContent(function(data) {
			db.setUsersContent(data)
			console.log("-- Users content fetched successfuly");

			init_server();

		});
	});
} else {
	init_server();
}




function init_server() {

	fetchData.fetchIndex(function(data) {
		console.log(data);
	});
}

