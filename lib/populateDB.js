var request = require('request');
var db = require('./db.js')
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
			fetchContent(arrIndex);
		});
}


function fetchContent(arrIndex) {
	var indexCount = 0;
	var docs = [];

	async.each(arrIndex, function(entry) {
		request(entry[1], function(err, resp, body) {
			var content = {
				'source': entry[1],
				'title': entry[0],
				'content': body
			};
			
			docs.push(content);

			indexCount+=1;
			if(arrIndex.length == indexCount) {
				addUserPoweredContent(docs);
			}
		});	
	});
}

function addUserPoweredContent(docs) {
	console.log('addUserPoweredContent');
	//fetch user power content from github. Add to docs
	addToDB(docs);
}


function addToDB(data) {
	var dbPath = './db/db.data';
	fs.unlink(dbPath, function(err) {
		if(err) {
			throw new Error('Error: re-init db '+err);
		}
	});
	
	fs.writeFile(dbPath, data, function(err) {
		if(err) {
			throw new Error('Error: writing db to fs '+err);
		}
		
		console.log("db saved successfully");
		callback();
	});

}

exports.init = init;
