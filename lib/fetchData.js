var request = require('request');
var db = require('./db.js')
var fs = require('fs');


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
			addContentDB(arrIndex);
		});
}


function addContentDB(arrIndex) {
	fs.openSync('./db/db.out', 'w');

	arrIndex.forEach(function(entry) {
		request(entry[1], function(err, resp, body) {
			var content = {
				'source': entry[1],
				'title': entry[0],
				'content': body
			};
			fs.appendFile('./db/db.out', JSON.stringify(content), function (err) {
				if(err) {
					throw new Error('Error: fetch JSON content '+err);
				}
				console.log(entry[0] +": successfully added to database.");
			});
		});	
	});
}

exports.fetchIndex = fetchIndex;
