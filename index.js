var populateDB = require('./lib/populateDB.js')
var db = require('./lib/db.js');
var search = require('./lib/search.js');
var server = require('./lib/server.js')

var input = process.argv.slice(2);

if (input == '-populate') {
	populateDB.init(function() {
		init_server();
	});
} else {
	init_server();
}




function init_server() {

	//console.log("procceed...");
	//server.initServer();

	var request = require('request');

	request('http://nodejs.org/api/http.json', function(err, resp, body) {
		if(err) {
			throw new Error('Error: fetch JSON index '+err);
		}

		console.log(typeof JSON.parse(body));
	});

}

