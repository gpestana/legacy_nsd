var request		= require('request'),
select			= require('JSONSelect'),
natural			= require('natural'),
async 			= require('async'),
_				= require('underscore'),
//seach
natural			= require('natural'),
TfIdf 			= natural.TfIdf,
tfidf 			= new TfIdf()


var total = 0;

/*
granularity:

+- modules
+	- properties
	- functions
+	- methods
+	- classes
		- properties
		- methods
+		- events
(more: https://github.com/joyent/node/tree/master/tools/doc)

index: [source, name, obj];

*/

function addJuiceSearch(indexArr, clbk) {
	var coarsedData = []
	var types = ['modules', 'properties', 'methods', 'classes', 
	'events']

	async.each(indexArr, function(entry) {
		request(entry[1], function(err, data) {
			var obj =  JSON.parse(data.body)

			types.forEach(function(type) {
				var matchedArr = select.match('.'+type, obj)
				matchedArr.forEach(function(coarse) {
					coarsedData.push(coarse);
				})
			})
			//end
			if(entry[1] == 'http://nodejs.org/api/stream.json') {
				addToSearchIndex(coarsedData, clbk)
			}
		})
	})
}


function addToSearchIndex(data, clbk) {
	data.forEach(function(entry) {
		tfidf.addDocument(JSON.stringify(entry))
	})
	clbk()
}


function query(queryPhrase, nrRes) {
	var results = []
	tfidf.tfidfs(queryPhrase, function(i, measure) {
		console.log('document #' + i + ' is ' + measure);
		results.push([i,measure])
	})
	
	results.sort(function(a,b) {
		return b[1]-a[1]
	})

	console.log(results.slice(0,nrRes))
}

exports.addJuiceSearch = addJuiceSearch;
exports.query = query