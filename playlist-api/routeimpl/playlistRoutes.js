const validators = require('../dto/validator.js');
const db = require('../database/inmem.js');
const errors = require('restify-errors');
const assert = require('assert');

function createPlaylist(req, res, next) {
	requestingUser = req.header('Authorization');
	var playlist = req.body;
	if(!playlist){
		var errData = {
		    info: { errorType: 'BAD_REQUEST' }
		};
		return next( new errors.BadRequestError(errData, 'Request missing body'));
	}
	console.log("Adding playlist to db");
	var result = db.addPlaylist(playlist, requestingUser)
		.then(function(result){
			res.json(result);
			next();
		}).catch(function(error){
			console.error(error);
			if(error instanceof assert.AssertionError){
				return next(new errors.BadRequestError({
					cause: error,
				    info: { errorType: 'BAD_REQUEST' }
				}, "Assertion failure."));
			} else {
				return next(error);
			}
		});	
}

function updatePlaylist(req, res, next) {
	requestingUser = req.header('Authorization');
	var playlist = req.body;
	if(!playlist){
		var errData = {
		    info: { errorType: 'BAD_REQUEST' }
		};
		return next( new errors.BadRequestError(errData, 'Request missing body'));
	}
	console.log("Updating playlist in db");
	var result = db.updatePlaylist(req.params.id, playlist, requestingUser)
		.then(function(result){
			res.json(result);
			next();
		}).catch(function(error){
			console.error(error);
			if(error instanceof assert.AssertionError){
				return next(new errors.BadRequestError({
					cause: error,
				    info: { errorType: 'BAD_REQUEST' }
				}, "Assertion failure."));
			} else {
				return next(error);
			}
		});	
}

function deletePlaylist(req, res, next) {
	console.log("Deleting playlist from db");
	requestingUser = req.header('Authorization');
	var result = db.deletePlaylist(req.params.id, requestingUser)
		.then(function(result){
			res.json(result);
			next();
		}).catch(function(error){
			console.error(error);
			if(error instanceof assert.AssertionError){
				return next(new errors.BadRequestError({
					cause: error,
				    info: { errorType: 'BAD_REQUEST' }
				}, "Assertion failure."));
			} else {
				return next(error);
			}
		});	
}

function showAvailablePlaylists(req, res, next){
	requestingUser = req.header('Authorization');
	var result = db.findPlaylists(requestingUser)
	.then(function(result){
		res.json(result);
		next();
	}).catch(function(error){
		console.error(error);
		if(error instanceof assert.AssertionError){
			return next(new errors.BadRequestError({
				cause: error,
			    info: { errorType: 'BAD_REQUEST' }
			}, "Assertion failure."));
		} else {
			return next(error);
		}
	});	
}

module.exports = {
	registerRoutes : function(server) {
		server.post('/playlist', createPlaylist);
		server.put('/playlist/:id', updatePlaylist);
		server.del('/playlist/:id', deletePlaylist);
		server.del('/playlist', showAvailablePlaylists);
	}
};