var fetchData = require('./lib/fetchData.js')
var db = require('./lib/db.js');
var search = require('./lib/search.js');

var input = process.argv.slice(2);

if (input == '-dev') {
	fetchData.fetchDocsNode(function(data) {
		db.setNodeDocsJSON(data);
		console.log("-- Official docs fetched successfuly");

		fetchData.fetchPoweredContent(function(data) {
			db.setUsersContent(data)
			console.log("-- Users content fetched successfuly");

			proceed();

		});
	});
} else {
	proceed();
}


function proceed() {
	//triggers
	//start github triggers (webhooks)

	//webpage
	//server webpage!


	//search
	search.test();
}

