var request = require('request');
var db = require('./db.js');
var search = require('./search.js');
var fs = require('fs');
var async = require('async');
var _ = require('underscore');


var callback;

// fecthIndex -> addContentDB -> addUserPoweredContent -> addToDB -> emit(done).

function init(clbk) {
	callback = clbk;
	fetchIndex();
}

function fetchIndex() {
	var nodeDocsJSON = 'http://nodejs.org/api/index.json';

	request(nodeDocsJSON, function(err, resp, body) {
		if(err) {
			throw new Error('Error: fetch JSON index '+err);
		}

		var arrIndex = [];
		var allContent = [];
		var obj = JSON.parse(body);

		for(var i=0; i<obj.desc.length; i++) {
			if(obj.desc[i].type == 'text') {
				
				var entry = obj.desc[i].text;

				var title = entry.substring(
					entry.lastIndexOf("[")+1,entry.lastIndexOf("]"));
				var url = entry.substring(
					entry.lastIndexOf("(")+1,entry.lastIndexOf("."));
					
					arrIndex.push([title, 'http://nodejs.org/api/'+url+".json"]);
				}
			}
			search.addJuiceSearch(arrIndex);
		});
}


function fetchContent(arrIndex) {
	var indexCount = 0;
	var docs = [];

	console.log(arrIndex);

	async.each(arrIndex, function(entry) {
		request(entry[1], function(err, resp, body) {
			var content = {
				'source': entry[1],
				'title': entry[0],
				'content': body
			};
			docs.push(content);
		});	
	});
}


function search() {
	var natural = require('natural');
	var TfIdf = natural.TfIdf;
	var tfidf = new TfIdf();
	var query = "process";

	for(entry in docs) {
		tfidf.addDocument(JSON.stringify(docs[entry]));
	}

	tfidf.addDocument("lololol entry process");

	tfidf.tfidfs(query, function(i, measure) {
		//console.log(i +": "+ measure);
	});

}

exports.init = init;
