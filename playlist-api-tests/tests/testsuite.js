const playlistTests = require("./playlistTests.js");
var testSuites = [];
function execute(){
	return new Promise(function(resolve, reject){
		var promise = playlistTests.execute();
		promise.then(function(data){
			var item = {
				suite: "Playlist tests",
				results: data
			};
			testSuites.push(item)
		}).then(function(data){
			console.log("Tests completed.");
			resolve(testSuites);
		});
	});
}

module.exports = {
	execute: execute
}