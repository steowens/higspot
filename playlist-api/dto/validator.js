var Validator = require('jsonschema').Validator;
var playlistSchemas = require('./playlist-schemas.js');
const errors = require('restify-errors');
const assert = require('assert');

var validator = new Validator({throwError: false});
const all_schemas = {};

/**
 * Called to register schemas with validator
 * @param v the json schema validator to register 
 * @param schemas the set of schemas to register
 */
function register(v, schemas) {
	var ix = 0;
	for(ix = 0; ix < schemas.length; ix++){
		var schema = schemas[ix];
		v.addSchema(schema, schema.id);
		all_schemas[schema.id] = schema;
		console.log("Registered schema: " + schema.id)
	}
	console.log("Registered " + ix + " schemas");
}

register(validator, playlistSchemas);

/**
 * Locates a registered schema by id, asserts on not found.
 */


function verify(obj, message){
	if(!obj){
		throw new errors.InternalServerError({failureType: 'OBJECT_MISSING'}, message);
	}
}

function getSchema(id){
	var schema = all_schemas[id];
	verify(schema, "Missing schema " + id);
	return schema;
}
/**
 * Called by clients of this module to validate an object against a schema
 * @param id the schema id
 * @param object the object to validate against the schema
 */
function validateObject(id, object){
	return new Promise(function(resolve, reject){
		var schema = null;
		try {
			verify(object, "Missing object arg");
			console.log("validateObject: basic assertions met")
			schema = getSchema(id);
			console.log("validateObject: Schema '" + id + "' found");
		} catch(error){
			reject(error);
		}
		try {
			var result = validator.validate(object, schema);
			console.log(result);
			if(result.valid){
				resolve(result);
			} else {
				reject(new errors.UnprocessableEntityError(JSON.stringify(result.errors)));
			}
		} catch(error){
			reject(error);
		}
	});
}

module.exports = {
	validate: validateObject
};