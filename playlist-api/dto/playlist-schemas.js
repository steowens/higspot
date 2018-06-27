
var userSchema = {
	"id" : "/User",
	"type" : "object",
	"properties" : {
		"id" : {
			"type" : "string",
			"description" : "The unique user id"
		},
		"name" : {
			"type" : "string",
			"description" : "The user name"
		}
	},
	"required" : [ "name" ]
};


var songsSchema = {
	"id": "/Songs",
	"type": "object",
	"properties": {
		"id": {
			"type": "string"
		},
		"artist": {
			"type": "string"
		},
		"title": {
			"type": "string"
		}
	},
	"required": ["artist", "title" ]
}

var playlistSchema = {
	"id": "/Playlist",
	"type": "object",
	"properties": {
		"id": {
			"type": "string"
		},
		"owner_id": {
			"type": "string"
		},
		"song_ids": {
			"type": "array",
			"items": { "type": "string" },
			"minItems": 1
		},
		"collaborator_ids": {
			"type": "array",
			"items": { "type":"string" }
		},
		"share_status": {
			"type": "string",
			"enum": ["public", "private"],
			"default": "public"
		},
		"collaborative_status": {
			"type":"string",
			"enum": [ "disallowed", "with_permission", "public" ],
			"default": "disallowed"
		}
	},
	"required": ["song_ids"]
}

module.exports = [ userSchema, songsSchema, playlistSchema ];