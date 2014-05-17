var request		= require('request'),
select			= require('JSONSelect'),
natural			= require('natural'),
async 			= require('async'),
_				= require('underscore'),
//seach
natural			= require('natural'),
TfIdf 			= natural.TfIdf,
tfidf 			= new TfIdf()


var rawData;

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
				matchedArr.forEach(function(intRes) {
					intRes.forEach(function(coarseRes) {

						//console.log(entry[0]+" :"+coarseRes.name)
						
						coarsedData.push(
							{'root':entry[1], 
							'name':coarseRes.name,
							'content':coarseRes})
					})
				})
			})
			//end
			if(entry[1] == 'http://nodejs.org/api/stream.json') {
				rawData = coarsedData
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


function query(queryPhrase, nrRes, clbk) {
	var results = []
	tfidf.tfidfs(queryPhrase, function(i, measure, a) {
		results.push([i,measure])
	})
	
	results.sort(function(a,b) {
		return b[1]-a[1]
	})
	
	for(var i = 0; i<nrRes; i++) {
		var nrEntry = results[i][0]
		results.push(rawData[nrEntry])
	}

	clbk(results)
}


exports.addJuiceSearch = addJuiceSearch;
exports.query = query