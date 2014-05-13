var request		= require('request'),
select			= require('JSONSelect'),
natural			= require('natural'),
async 			= require('async'),
_				= require('underscore');


var total = 0;

/*
granularity:

- modules
	- properties
	- functions
	- methods
	- classes
		- properties
		- methods
		- events
(more: https://github.com/joyent/node/tree/master/tools/doc)

index: [source, name, obj];

*/
function addJuiceSearch(indexArr) {
	//for each entry in index:
	async.each(indexArr, function(entry) {
		request(entry[1], function(err, data) {
			var obj =  JSON.parse(data.body);

			var filtered = [];
			var juice = [];

			var modulesArr = select.match('.modules', obj);
			filtered.push(modulesArr);
			var propertiesArr = select.match('.properties', obj);
			filtered.push(propertiesArr);
			//nada ?
			var functionsArr = select.match('.functions', obj);
			filtered.push(functionsArr);
			var methodsArr = select.match('.methods', obj);
			filtered.push(methodsArr);
			var classesArr = select.match('.classes', obj);
			filtered.push(classesArr);
			var eventsArr = select.match('.events', obj);
			filtered.push(eventsArr);


			async.each(filtered, function(entry) {
				async.each(entry, function(fineGrain) {
					juice.push(fineGrain);
				});
			});

			console.log("modules "+modulesArr.length);
			console.log("properties "+propertiesArr.length);
			console.log("functions "+functionsArr.length);
			console.log("methods "+methodsArr.length);
			console.log("classes "+classesArr.length);
			console.log("events "+eventsArr.length);

			console.log(">> "+juice.length);
			total = total + juice.length;
			console.log("TOTAL: "+total);
		});
	});
}




function query(options, callback) {
	var TfIdf = natural.TfIdf;
	var tfidf = new TfIdf();

	var nodeDoc = db.getNodeDocsJSON();
	if(options.both) {
		var usersDoc = db.getUsersContent();
	}

	//add documents. Each document should be a string
	tfidf.addDocument("Ol ao meu nome e goncalo");
	tfidf.addDocument("Adeus, o mey e catarina :)");
	tfidf.addDocument(nodeDoc);

	tfidf.tfidfs(options.query, function(i, measure) {
		callback(i, measure)
	});

}

exports.query = query;
exports.addJuiceSearch = addJuiceSearch;