"use strict";
const Client = require('node-rest-client-promise').Client;
const assert = require('assert');
const client = new Client();
const endpoint = "http://localhost:8081/playlist";
var testsPassed = [];
var testsFailed = [];
function createDefaultArgs(){
	return {
	    path: {},
	    parameters: {},
	    headers: { 
	    	"Authorization": "1", 
	    	"Content-type": "application/json" 
	    },
	    data: "",
		requestConfig: {
	        timeout: 1000, //request timeout in milliseconds
	        noDelay: true, //Enable/disable the Nagle algorithm
	        keepAlive: true, //Enable/disable keep-alive functionalityidle socket.
	        keepAliveDelay: 1000 //and optionally set the initial delay before the first keepalive probe is sent
	    },
	    responseConfig: {
	        timeout: 1000 //response timeout
	    }
	}
}


function postEmptyBody(){
	const testName = "Post Empty Body to Playlists";
	return new Promise(function(resolve, reject){
		var args = createDefaultArgs();
		var rejection = {
			test: testName,
			reason: null
		}
		client.postPromise(endpoint, args, function (data, response) {		   
			if(response.statusCode != 400){
				rejection.reason = "Bad status code " + response.statusCode + " expected 400";
				reject(rejection);
			}
			if(data.message != "Request missing body"){
				rejection.reason = "Bad reason in response body, expected 'Request missing body'";
				reject(rejection);
			} else {			
				resolve({
					testName: testName,
					responseCode: response.statusCode,
					responseBody: data
				});
			}
		}).catch(function(error){
			rejection.reason = "Unexpected error.";
			rejection.cause = error;
			reject(rejection);
		});
	});
}

function postBadPlaylist(){
	const testName = "Post bad playlist to Playlists";
	return new Promise(function(resolve, reject){
		var args = createDefaultArgs();
		args.data = JSON.stringify( {
		   "email":"steve@doitnext.com",
		   "public-info":{
		      "display_name":"Spongebob",
		      "about":"The author of the app."
		   }
		});
		var rejection = {
			test: testName,
			reason: null
		}
		client.postPromise(endpoint, args, function (data, response) {	
			if(response.statusCode != 400){
				rejection.reason = "Bad status code " + response.statusCode + " expected 400";
				reject(rejection);
			} else if(data.message.indexOf("caused by UnprocessableEntityError") < 0){
				rejection.reason = "Unexpected response message: " + data.message;
				reject(rejection);
			} else {
				resolve({
					testName: testName,
					responseCode: response.statusCode,
					responseBody: data
				});
			}
		}).catch(function(error){
			rejection.reason = "Unexpected error.";
			rejection.cause = error;
			reject(rejection);
		});	
	});
}

function postPlaylistHappyPath(){
	const testName = "Post to Playlists happy path";
	return new Promise(function(resolve, reject){
		var args = createDefaultArgs();
		args.data = JSON.stringify( {
		   "song_ids":[ "1", "3" ]
		});
		var rejection = {
			test: testName,
			reason: null
		}
		client.postPromise(endpoint, args, function (data, response) {	
			if(response.statusCode != 200){
				rejection.reason = "Bad status code " + response.statusCode + " expected 200";
				reject(rejection);
			} else {
				resolve({
					testName: testName,
					responseCode: response.statusCode,
					responseBody: data
				});
			}
		}).catch(function(error){
			rejection.reason = "Unexpected error.";
			rejection.cause = error;
			reject(rejection);
		});	
	});
}

function attemptDeleteByNonOwner(playlistId, ownerId){
	const testName = "Attempt Delete by Non Owner";
	return new Promise(function(resolve, reject){
		var rejection = {
				test: testName,
				reason: null
		};
		var url = endpoint + "/" + playlistId;
		client.deletePromise(url, function(data, response){
			
		}).catch(function(error){
			rejection.reason = "Unexpected error.";
			rejection.cause = error;
			reject(rejection);
		});
	});
}

function handlePassed(data){
	if(data)
		testsPassed.push(data);
}

function handleError(error){
	testsFailed.push(error);
}

function onTestsComplete(resolve){
	var result = {
			testsPassed: testsPassed,
			testsFailed: testsFailed,
			summary: "Tests passed: " + testsPassed.length + ", Tests failed: " + testsFailed.length
	};
	resolve(result);	
}

function execute(){
	return new Promise(async function(resolve, reject){
		var rv = await postEmptyBody().catch(handleError);
		handlePassed(rv);
	
		rv = await postBadPlaylist().catch(handleError);
		handlePassed(rv);
		
		rv = await postPlaylistHappyPath().catch(handleError);
		handlePassed(rv);
		
		onTestsComplete(resolve);	
		 
	});
}

module.exports = {
	execute: execute
};