var db = require('./db.js')
var natural = require('natural');


function query(options, callback) {
	var TfIdf = natural.TfIdf;
	var tfidf = new TfIdf();

	var nodeDoc = db.getNodeDocsJSON();
	if(options.both) {
		var usersDoc = db.getUsersContent();
	}

	//add documents. Each document should be a json blob
	tfidf.addDocument("Ol ao meu nome e goncalo");
	tfidf.addDocument("Adeus, o mey e catarina :)");
	tfidf.addDocument(nodeDoc);

	tfidf.tfidfs(options.query, function(i, measure) {
		callback(i, measure)
	});

}

exports.query = query;