const validators = require('../dto/validator.js');
const errors = require('restify-errors');
const assert = require('assert');
const util = require('util');

var db = {
	"users" : {
		"nextId" : 8,
		"schemaId": "/User",
		"dataSet" : [ {
			"id" : "1",
			"name" : "Albin Jaye"
		}, {
			"id" : "2",
			"name" : "Dipika Crescentia"
		}, {
			"id" : "3",
			"name" : "Ankit Sacnite"
		}, {
			"id" : "4",
			"name" : "Galenos Neville"
		}, {
			"id" : "5",
			"name" : "Loviise Nagib"
		}, {
			"id" : "6",
			"name" : "Ryo Daiki"
		}, {
			"id" : "7",
			"name" : "Seyyit Nedim"
		} ]
	},
	"playlists" : {
		"nextId" : 4,
		"schemaId": "/Playlist",
		"dataSet" : [ {
			"id" : "1",
			"owner_id" : "2",
			"song_ids" : [ "8", "32" ]
		}, {
			"id" : "2",
			"owner_id" : "3",
			"song_ids" : [ "6", "8", "11" ]
		}, {
			"id" : "3",
			"owner_id" : "7",
			"song_ids" : [ "7", "12", "13", "16", "2" ]
		} ]
	},
	"songs" : {
		"nextId": 40,
		"schemaId": "/Songs",
		"dataSet" : [ {
			"id" : "1",
			"artist" : "Camila Cabello",
			"title" : "Never Be the Same"
		}, {
			"id" : "2",
			"artist" : "Zedd",
			"title" : "The Middle"
		}, {
			"id" : "3",
			"artist" : "The Weeknd",
			"title" : "Pray For Me"
		}, {
			"id" : "4",
			"artist" : "Drake",
			"title" : "God's Plan"
		}, {
			"id" : "5",
			"artist" : "Bebe Rexha",
			"title" : "Meant to Be"
		}, {
			"id" : "6",
			"artist" : "Imagine Dragons",
			"title" : "Whatever It Takes"
		}, {
			"id" : "7",
			"artist" : "Maroon 5",
			"title" : "Wait"
		}, {
			"id" : "8",
			"artist" : "Bazzi",
			"title" : "Mine"
		}, {
			"id" : "9",
			"artist" : "Marshmello",
			"title" : "FRIENDS"
		}, {
			"id" : "10",
			"artist" : "Dua Lipa",
			"title" : "New Rules"
		}, {
			"id" : "11",
			"artist" : "Shawn Mendes",
			"title" : "In My Blood"
		}, {
			"id" : "12",
			"artist" : "Post Malone",
			"title" : "Psycho"
		}, {
			"id" : "13",
			"artist" : "Ariana Grande",
			"title" : "No Tears Left To Cry"
		}, {
			"id" : "14",
			"artist" : "Bruno Mars",
			"title" : "Finesse"
		}, {
			"id" : "15",
			"artist" : "Kendrick Lamar",
			"title" : "All The Stars"
		}, {
			"id" : "16",
			"artist" : "G-Eazy",
			"title" : "Him & I"
		}, {
			"id" : "17",
			"artist" : "Lauv",
			"title" : "I Like Me Better"
		}, {
			"id" : "18",
			"artist" : "NF",
			"title" : "Let You Down"
		}, {
			"id" : "19",
			"artist" : "Dua Lipa",
			"title" : "IDGAF"
		}, {
			"id" : "20",
			"artist" : "Taylor Swift",
			"title" : "Delicate"
		}, {
			"id" : "21",
			"artist" : "Calvin Harris",
			"title" : "One Kiss"
		}, {
			"id" : "22",
			"artist" : "Ed Sheeran",
			"title" : "Perfect"
		}, {
			"id" : "23",
			"artist" : "Meghan Trainor",
			"title" : "No Excuses"
		}, {
			"id" : "24",
			"artist" : "Niall Horan",
			"title" : "On The Loose"
		}, {
			"id" : "25",
			"artist" : "Halsey",
			"title" : "Alone"
		}, {
			"id" : "26",
			"artist" : "Charlie Puth",
			"title" : "Done For Me"
		}, {
			"id" : "27",
			"artist" : "Foster The People",
			"title" : "Sit Next to Me"
		}, {
			"id" : "28",
			"artist" : "Max",
			"title" : "Lights Down Low"
		}, {
			"id" : "29",
			"artist" : "Alice Merton",
			"title" : "No Roots"
		}, {
			"id" : "30",
			"artist" : "5 Seconds Of Summer",
			"title" : "Want You Back"
		}, {
			"id" : "31",
			"artist" : "Camila Cabello",
			"title" : "Havana"
		}, {
			"id" : "32",
			"artist" : "Logic",
			"title" : "Everyday"
		}, {
			"id" : "33",
			"artist" : "Drake",
			"title" : "Nice For What"
		}, {
			"id" : "34",
			"artist" : "Halsey",
			"title" : "Bad At Love"
		}, {
			"id" : "35",
			"artist" : "ZAYN",
			"title" : "Let Me"
		}, {
			"id" : "36",
			"artist" : "Khalid",
			"title" : "Love Lies"
		}, {
			"id" : "37",
			"artist" : "Post Malone",
			"title" : "rockstar"
		}, {
			"id" : "38",
			"artist" : "Rudimental",
			"title" : "These Days"
		}, {
			"id" : "39",
			"artist" : "Liam Payne",
			"title" : "Familiar"
		}, {
			"id" : "40",
			"artist" : "Imagine Dragons",
			"title" : "Thunder"
		} ]
	}
};

function removeItem(collection, id){
	var dataset = collection.dataSet;
	for(var x = 0; x < dataset.length; x++){
		if(dataset[x].id === id){
			dataset.splice(x, 1);
			return x;
		}
	}
	return -1;
}

function findItemByProperty(collection, propertyName, matchValue){
	var dataset = collection.dataSet;
	for(var x = 0; x < dataset.length; x++){
		if(dataset[x][propertyName] === matchValue){
			return dataset[x];
		}
	}
	return null;
}

function findAllItemsByProperty(collection, propertyName, matchValue, result){
	var dataset = collection.dataSet;
	for(var x = 0; x < dataset.length; x++){
		if(dataset[x][propertyName] === matchValue){
			result.id = dataset[x];
		}
	}
}

function verifySongIds(song_ids){
	for(var x = 0; x < song_ids.length; x++){
		var song_id = song_ids[x];
		assert(findItemByProperty(db.songs, "id", song_id), 
				"Song id " + song_id + " not found in songs.");	
	}	
}

function addPlaylist(playlist, requestingUser) {
	var myPromise = new Promise(function(resolve, reject){
		var collection = db.playlists;
	
		var validate_promise = validators.validate(collection.schemaId, playlist)
			.then(function(result){
				console.log("Playlist validated against schema " + collection.schemaId);
				assert(findItemByProperty(db.users, "id", requestingUser), "Missing user with id: " + requestingUser);
				console.log("Found ownerID in users");
				verifySongIds(playlist.song_ids);
				console.log("Found all songs from playlist in songs.");
				playlist.id = "" + collection.nextId;
				playlist.owner_id = requestingUser;
				collection.nextId++;
				collection.dataSet.push(playlist);
				resolve(playlist);
			})
			.catch(function(error){
				if(error instanceof errors.UnprocessableEntityError){
					reject(error);
				} else {
					reject(new errors.BadRequestError(error));
				}
			});
	});
	return myPromise;
}

function updatePlaylist(id, playlist, requestingUser) {
	var myPromise = new Promise(function(resolve, reject){
		var collection = db.playlists;
	
		var validate_promise = validators.validate(collection.schemaId, playlist)
			.then(function(result){
				console.log("Playlist validated against schema " + collection.schemaId);
				
				var existing = findItemByProperty(db.playlists, "id", id);
				assert(existing, "No playlist with id: " + id);
				
				assert(findItemByProperty(db.users, "id", requestingUser));
				console.log("Found ownerID in users");
				
				assert(existing.owner_id === requestingUser, "Requester is not owner of this playlist.");
				
				verifySongIds(playlis.song_ids);
				console.log("Found all songs from playlist in songs.");
				
				Object.keys(existing).forEach(function(key) { delete existing[key]; });
				Object.keys(playlist).forEach(function(key) { existing[key] = playlist[key]; });
				existing.id = id;
				existing.owner_id = requestingUser;
				resolve(existing);
			})
			.catch(function(error){
				reject(new errors.BadRequestError(error));
			});
	});
	return myPromise;
}

function deletePlaylist(id, requestingUser) {
	console.log("Attempt to delete playlist '" + id + "' by requesting user '" + requestingUser + "'");
	var myPromise = new Promise(function(resolve, reject){
		var collection = db.playlists;
		var existing = findItemByProperty(db.playlists, "id", id);
		if(!existing){
			console.log("Current playlists: " + JSON.stringify(db.playlists));
			reject(new errors.NotFoundError("No playlist with id: " + id));
			return;
		}
		if(existing.owner_id != requestingUser){
			reject(new errors.ForbiddenError("Permission to delete playlist denied."));
			return;
		};
		resolve(removeItem(collection, id));
	});
	return myPromise;
}

function deletePlaylist(id, requestingUser) {
	console.log("Attempt to delete playlist '" + id + "' by requesting user '" + requestingUser + "'");
	var myPromise = new Promise(function(resolve, reject){
		var collection = db.playlists;
		var existing = findItemByProperty(db.playlists, "id", id);
		if(!existing){
			console.log("Current playlists: " + JSON.stringify(db.playlists));
			reject(new errors.NotFoundError("No playlist with id: " + id));
			return;
		}
		console.log("owner_id.type = " + typeof(existing.owner_id));
		console.log("requestingUser.type = " + typeof(requestingUser));
		if(!(existing.owner_id == requestingUser)){
			console.warn(
				util.format("Permission to delete playlist %s with owner %s denied to user %s",
				id, existing.owner_id, requestingUser));
			reject(new errors.ForbiddenError("Permission to delete playlist denied."));
			return;
		};
		resolve(removeItem(collection, id));
	});
	return myPromise;
}

function findPlaylists(requestingUser){
	var result = {};
	findAllItemsByProperty(db.playlists, "owner_id", requestingUser, result);
	findAllItemsByProperty(db.playlists, "share_status", "public", result);
	return result;
}

function findPlaylistById(requestingUser, playlistId){
	var playlist = findItemByProperty(db.playlists, "id", playlistId, result);
	if(playlist.share_status == "public" || playlist.owner_id == playlistId){
		return playlist;
	}
	return null;
}


module.exports = {
	db: db,
	addPlaylist: addPlaylist,
	updatePlaylist: updatePlaylist, 
	deletePlaylist: deletePlaylist,
	findItemByProperty: findItemByProperty,
	findPlaylistById: findPlaylistById
}