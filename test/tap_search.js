var test 	= require('tape'),
search 		= require('../lib/search.js'),
populateDB	= require('../lib/populateDB.js'),
request		= require('request')


var rawData;

test('search engine', function(t) {

	setUp(function(arrIndex, rawObj) {

		search.addJuiceSearch(arrIndex, function(treatedData) {
			t.equal(JSON.stringify(rawObj).length, JSON.stringify(treatedData).length, 
				'| addJuiceSearch eating chunks')
		})
	
	})

	t.end()
})



function setUp(clbk) {
	var title = ['http']
	var arrIndex = []
	title.forEach(function(titleEntry) {
		arrIndex.push([titleEntry, 'http://nodejs.org/api/'+title+".json"])
	})

	request('http://nodejs.org/api/'+title+".json", function(err, rsp, body) {

		clbk(arrIndex, JSON.parse(body))
	})

}