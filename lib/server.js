var http = require('http');

var PORT = 8000;

function initServer() {

	var server = http.createServer();
	
	server.on('request', function(req, res) {
		res.writeHead(200, {'Content-type': 'text/plain'});
		res.write("hello");
		res.end();
	});

	server.listen(PORT);
}


exports.initServer = initServer;