var fetchData = require('./lib/fetchData.js')
var db = require('./lib/db.js');
var search = require('./lib/search.js');

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
	//-triggers
	//start github triggers (webhooks)

	//-webpage
	//generate html
	//serve webpage!


	//search (api)
	var options = {
		query: "process node",
		both: false
	}

	search.query(options, function(i, measure) {
		console.log('#'+i+" measure:"+measure);
	});


}

