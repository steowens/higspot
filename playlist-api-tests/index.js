const testSuite = require('./tests/testsuite.js');

testSuite.execute().then(function(results){
	console.log(JSON.stringify(results, null, '   '));
});

