var request = require('request');
var db = require('./db.js');
var search = require('./search.js');
var fs = require('fs');
var async = require('async');
var _ = require('underscore');


var callback;

// fecthIndex -> addContentDB -> addUserPoweredContent -> addToDB -> emit(done).

function init(clbk) {
	//callback = clbk;
	fetchIndex(clbk);
}

function fetchIndex(clbk) {
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
			search.addJuiceSearch(arrIndex, clbk);
		});
}

exports.init = init;
