const validators = require('../dto/validator.js');

var playlist = {
	owner_id: "2",
	song_ids: [ "1", "4"]
}

var result = validators.validate("/Playlist", playlist).catch(function(error){
	console.log("Error: " + JSON.stringify(error));
});
console.log(JSON.stringify(result));