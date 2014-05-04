var nodeDocsJSON = null;
var userPoweredContent = null;

function setNodeDocsJSON(data) {
	nodeDocsJSON = data;
}

function getNodeDocsJSON() {
	return nodeDocsJSON;
}

function setUsersContent(data) {
	userPoweredContent = data;
}

function getUsersContent(data) {
	return userPoweredContent;
}

exports.getNodeDocsJSON = getNodeDocsJSON;
exports.setNodeDocsJSON = setNodeDocsJSON;
exports.getUsersContent = getUsersContent;
exports.setUsersContent = setUsersContent;
