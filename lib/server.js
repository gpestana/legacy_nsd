
var express = require('express');
var app = express();
var search = require('./search.js');
var db = require('./db.js');

var PORT = 8000;

function initServer() {

	app.get("/api/search/:query", function(req, res) {
		
		var query = req.params.query;
		//var result = search.query(query, function(){...});

		//response with search
		res.json({
			'route': 'search', 
			'query:': query
		});
	});

	app.get("/api/all.json", function(req, res) {
		
		var content;
		//content = db.fetchAllContent();

		res.json({ 
			'route': 'all.json',
			'content': content 
		});
	});


	app.listen(PORT, function() {
		console.log("listening on "+PORT);
	});

}


exports.initServer = initServer;