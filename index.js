var populateDB = require('./lib/populateDB.js')
var db = require('./lib/db.js');
var search = require('./lib/search.js');
var server = require('./lib/server.js')

var input = process.argv.slice(2);

if (input == '-populate') {
	populateDB.init(function() {
		

		//here, stick with name and URL for the results!
		search.query('fs', 10)
	})
} else {
	init_server();
}


function init_server() {
	console.log("init_server");
}

