var request		= require('request'),
JSONStream		= require('JSONStream'),
_				= require('underscore');



/*how to do this:
	- fetch json data
	- create stream for each object to index (methods, events, classes, ect..)

fs.createReadStream(fileName).pipe(stream1);
fs.createReadStream(fileName).pipe(stream2);	

	- pipe streams in parsers
	- add search metadata (path should be enough)
	- index data for search
*/


//modules->methods
var stream1 = JSONStream.parse('modules.*.methods');
var stream2 = JSONStream.parse('modules.*.classes.*.methods');

request('http://nodejs.org/api/http.json')
	.pipe(stream1);

stream1.on('data', function(data) {
	console.log("stream1");
	console.log(_.keys(data));
});

stream2.on('data', function(data) {
	console.log("stream2");
	console.log(_.keys(data));
});

stream2.on('root', function(root, count) {
	if(!count) {
		console.log("stream2 no data");
	}
});
